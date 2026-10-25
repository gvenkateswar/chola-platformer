// Smoke test for Chola: Tides of Bronze. Run: node tests/smoke.js [path/to/index.html]
// Plays all three levels by scripted input (a bot that reads game state), no game hooks needed.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const HTML = path.resolve(process.argv[2] || path.join(__dirname, '..', 'index.html'));
const OUT = path.join(__dirname, 'out');
const LEVEL_TIMEOUT_MS = 35000;
fs.mkdirSync(OUT, { recursive: true });

let failed = 0;
const pass = (n) => console.log(`PASS ${n}`);
const fail = (n, why) => { failed++; console.log(`FAIL ${n}: ${why}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const t0 = Date.now();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [], warnings = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') {
      // resource-load errors are reported by the asset check below, not here
      if (!/Failed to load resource/.test(m.text())) errors.push('console.error: ' + m.text());
    } else if (m.type() === 'warning') warnings.push(m.text());
  });

  const missing = new Set();
  page.on('requestfailed', (r) => missing.add(path.basename(r.url())));
  const snap = () => page.evaluate(() => ({
    state, levelIdx, x: player.x, y: player.y, vy: player.vy, lane: player.lane,
    ground: player.onGround, jumps: player.jumps, hp: player.hp, deaths,
    coins: coinsTaken, gx: level ? level.goal.x : 0,
  }));
  const shot = async (n) => {
    await page.evaluate(() => { window.__fullRender = true; });
    await sleep(350);   // let a couple of full frames draw
    await page.screenshot({ path: path.join(OUT, n + '.png') });
    await page.evaluate(() => { window.__fullRender = false; });
  };

  // --- load + title
  await page.goto('file://' + HTML);
  await sleep(800);
  const title = await page.evaluate(() => ({ s: state, vis: !document.getElementById('titleScreen').hidden }));
  title.s === 'title' && title.vis ? pass('title screen shown') : fail('title screen shown', JSON.stringify(title));
  await shot('00-title');

  // Headless software rendering runs the game at ~10 fps (slow motion). Draw only every 20th
  // frame while the bot plays so the run takes real-game time; render() still runs throughout,
  // and a throw inside it still kills the loop and is caught as a page error.
  await page.evaluate(() => {
    const realRender = render; let n = 0;
    window.__realRender = realRender;
    render = () => { if (window.__fullRender || ++n % 20 === 0) realRender(); };
  });
  await page.click('#startBtn');
  let s = await snap();
  s.state === 'inter' ? pass('start button opens level 1 intro') : fail('start button opens level 1 intro', 'state=' + s.state);

  const keysDown = new Set();
  const hold = async (k, on) => {
    if (on && !keysDown.has(k)) { keysDown.add(k); await page.keyboard.down(k); }
    if (!on && keysDown.has(k)) { keysDown.delete(k); await page.keyboard.up(k); }
  };
  const tap = async (k) => { await page.keyboard.down(k); await sleep(40); await page.keyboard.up(k); };

  for (let L = 0; L < 3; L++) {
    const name = `level ${L + 1}`;
    await page.click('#interBtn');
    await sleep(150);
    s = await snap();
    if (s.state !== 'play' || s.levelIdx !== L) { fail(name + ' loads', `state=${s.state} levelIdx=${s.levelIdx}`); break; }
    pass(name + ' loads');
    await shot(`l${L + 1}-start`);

    if (process.env.DEV_TELEPORT && L === +(process.env.DEV_LEVEL || 0)) { const [tx, ty] = process.env.DEV_TELEPORT.split(',').map(Number); await page.evaluate(([x, y]) => { player.x = x; player.y = y; cam.x = x - 400; }, [tx, ty]); }
    // The bot runs inside the page at ~60 Hz and presses keys with real KeyboardEvents.
    await page.evaluate(() => {
      const press = (key, on) => window.dispatchEvent(new KeyboardEvent(on ? 'keydown' : 'keyup', { key, bubbles: true }));
      const plats = level.platforms, links = level.links;
      const groundAt = (lane, x, y, down = 0) => {
        let best = null;
        for (const [bx, by, bw, , l] of plats) {
          if ((l ?? 1) !== lane || x < bx || x > bx + bw) continue;
          if (by >= y - 12 && by <= y + down && (best === null || by < best)) best = by;
        }
        return best;
      };
      // will a no-more-jumps arc, holding right at full speed, land on a platform top?
      const landsOn = (lane, p) => {
        let x = p.x, y = p.y, vy = p.vy;
        for (let i = 0; i < 90; i++) {
          const py = y; x += 385 / 60; vy += 2300 / 60; y += vy / 60;
          for (const [bx, by, bw, , l] of plats) {
            if ((l ?? 1) === lane && x >= bx && x <= bx + bw && py <= by + 1 && y >= by) return true;
          }
        }
        return false;
      };
      const anyBelow = (lane, x, y) => groundAt(lane, x, y, 1e5);
      // a ledge or wall ahead that needs a jump; taller ones need an earlier take-off
      const wallAhead = (lane, x, y) => plats.some(([bx, by, bw, , l]) => {
        const h = y - by;
        return (l ?? 1) === lane && h > 20 && h < 260 && bx > x + 10 && bx < x + (h <= 130 ? 80 : 185);
      });
      const linkAt = (x, a, b) => links.find(k => x >= k.x - 10 && x <= k.x + k.w + 10 &&
        ((k.a === a && k.b === b) || (k.a === b && k.b === a)));
      // same rule the game uses: a gate link under the player and footing in the target lane
      const canShift = (p, target) => !!linkAt(p.x, p.lane, target) && plats.some(([bx, by, bw, , ln]) =>
        ln === target && p.x > bx - 6 && p.x < bx + bw + 6 && by > p.y - 150 && by < p.y + 250);
      let lastShift = 0, jumpAt = -1e9, lastAtk = 0, atkUp = -1, spaceDown = false, sx = -1, st = time * 1000;
      press('ArrowRight', true);
      window.__bot = setInterval(() => {
        const p = player, now = time * 1000;   // game time, so timers do not depend on frame rate
        if (state !== 'play') { clearInterval(window.__bot); press('ArrowRight', false); press(' ', false); return; }
        const jump = (why) => { (window.__log = window.__log || []).push([why, Math.round(p.x), Math.round(p.y), Math.round(p.vy), p.jumps]); if (spaceDown) press(' ', false); press(' ', true); spaceDown = true; jumpAt = now; };
        if (spaceDown && now - jumpAt > 380) { press(' ', false); spaceDown = false; }
        if (atkUp > 0 && now > atkUp) { press('j', false); atkUp = -1; }
        // take the far lane across a lane-1 gap, come back to lane 1 afterwards
        let wantFar = false;
        if (p.lane === 1 && p.onGround && groundAt(1, p.x + 130, p.y, 300) === null && canShift(p, 0)) {
          const nxt = Math.min(...plats.filter(q => (q[4] ?? 1) === 1 && q[0] > p.x + 120).map(q => q[0]), 1e9);
          wantFar = plats.some(q => q[4] === 0 && q[0] <= p.x + 20 && q[0] + q[2] >= nxt - 10);
        }
        if (now - lastShift > 350 && p.onGround) {
          if (wantFar) { (window.__log = window.__log || []).push(['up', Math.round(p.x), Math.round(p.y), p.lane, p.shiftCool]); press('ArrowUp', true); press('ArrowUp', false); lastShift = now; }
          else if (p.lane === 0 && groundAt(1, p.x + 20, p.y, 400) !== null && groundAt(1, p.x + 150, p.y, 400) !== null && canShift(p, 1)) {
            press('ArrowDown', true); press('ArrowDown', false); lastShift = now;
          }
        }
        if (p.onGround && now - jumpAt > 250 && !wantFar) {
          const ahead = groundAt(p.lane, p.x + 45, p.y, 120);
          // stepping off a ledge with a higher ledge in reach ahead: jump for it rather than drop
          const climb = ahead !== null && ahead > p.y + 30 && plats.some(([bx, by, , , l]) =>
            (l ?? 1) === p.lane && bx > p.x + 10 && bx < p.x + 260 && by < p.y - 10 && by > p.y - 200);
          if (ahead === null || climb || wallAhead(p.lane, p.x, p.y)) jump('ground');
        } else if (!p.onGround && p.vy > 50 && p.jumps === 1 && now - jumpAt > 200) {
          if (!landsOn(p.lane, p) || wallAhead(p.lane, p.x, p.y)) jump('air');
        }
        if (now - lastAtk > 400 && level.guards.some(g => !g.dead && g.lane === p.lane && Math.abs(g.x - p.x) < 85)) {
          press('j', true); atkUp = now + 60; lastAtk = now;
        }
        if (Math.abs(p.x - sx) > 15) { sx = p.x; st = now; }
        else if (now - st > 1500 && p.onGround) { jump('stuck'); st = now; }
      }, 16);
    });
    const start = Date.now();
    let done = false, midShot = false;
    while (Date.now() - start < LEVEL_TIMEOUT_MS) {
      await sleep(process.env.TRACE ? 40 : 150);
      s = await snap();
      if (process.env.TRACE) console.log(JSON.stringify([Math.round(s.x), Math.round(s.y), s.lane, s.ground, s.hp]));
      if (s.state !== 'play') { done = true; break; }
      if (!midShot && s.x > s.gx * 0.5) { midShot = true; await shot(`l${L + 1}-mid`); }
    }
    if (process.env.TRACE) console.log('LOG ' + JSON.stringify(await page.evaluate(() => window.__log)));
    await page.evaluate(() => { clearInterval(window.__bot); });
    for (const k of ['ArrowRight', ' ', 'j']) await page.keyboard.up(k).catch(() => {});
    s = await snap();
    const secs = ((Date.now() - start) / 1000).toFixed(1);
    if (done) {
      const nextOk = L < 2 ? s.state === 'inter' && s.levelIdx === L + 1 : s.state === 'end';
      nextOk ? pass(`${name} completed by script (${secs}s, ${s.deaths} deaths so far)`)
             : fail(`${name} completed`, `state=${s.state} levelIdx=${s.levelIdx}`);
      await shot(`l${L + 1}-complete`);
    } else {
      fail(`${name} completed by script`, `timeout after ${secs}s at x=${Math.round(s.x)} of goal ${s.gx}, lane ${s.lane}, deaths ${s.deaths}`);
      await shot(`l${L + 1}-timeout`);
      break;
    }
  }

  s = await snap();
  if (s.state === 'end') {
    const vis = await page.evaluate(() => !document.getElementById('endScreen').hidden);
    vis ? pass('end screen shown after level 3') : fail('end screen shown after level 3', 'hidden');
    await shot('99-end');
  }

  // Missing PNGs fall back to procedural art by design (ASSETS.md), so they
  // are listed as warnings, not failures.
  missing.size === 0 ? pass('all referenced assets load')
                     : warnings.push('assets using procedural fallback: ' + [...missing].join(', '));
  errors.length === 0 ? pass('no page errors or console errors')
                      : fail('no page errors or console errors', errors.slice(0, 5).join(' | '));
  warnings.forEach((w) => console.log('WARN ' + w));
  await browser.close();
  console.log(`${failed ? 'RESULT FAIL' : 'RESULT PASS'} in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.log('FAIL harness: ' + e.message); process.exit(1); });
