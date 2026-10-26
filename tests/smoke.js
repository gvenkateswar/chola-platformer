// Smoke test for Chola: Tides of Bronze. Run: node tests/smoke.js [path/to/index.html]
// Plays all three levels by scripted input (a bot that reads game state), no game hooks needed.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const FILM = process.argv.includes('--film');   // also save filmstrips to tests/out/film/ (rope swing, landed cut)
const HTML = path.resolve(process.argv.slice(2).find((a) => !a.startsWith('--')) || path.join(__dirname, '..', 'index.html'));
const OUT = path.join(__dirname, 'out');
// Level 1 is 8,800 px with a climb section, so its limit is longer than levels 2 and 3 (about 5,500 px).
// Game seconds allowed per level (the clock is simulated): 20 s plus twice the time the bare run to the goal
// takes at top speed (385 px/s). The bot needs about 1.4x to 1.8x the bare run on level 1 to 3 (climbs,
// swings, fights), so this leaves roughly 15 to 40 percent of slack.
const limitFor = (goalX) => 20 + 2 * goalX / 385;
// What each level's run must have used, so a green run proves the pieces work and were not walked around.
const NEEDED = [
  { keys: ['handover', 'pole', 'rope', 'plank', 'push', 'leap'], text: 'handover, pole, rope, plank, block push, gate leap' },
  { keys: ['bounce', 'bale', 'gangplank', 'mast', 'marked', 'swing', 'leap'], text: 'awning bounce, bale, gangplank, mast, marked rope, pumped swing, gate leap' },
  { keys: ['vine', 'marked', 'wade', 'slide', 'sway', 'swing', 'sword', 'cuts', 'kills', 'telegraph', 'shieldKill'],
    text: 'vine swing, marked vine, wading, mud slide, sway walkway, sword drawn, fighters cut and defeated, telegraph read, shield-bearer defeated' },
];
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
  // --film: the page freezes the clock and asks for frames; the test steps it a few frames at a time
  const FILM_DIR = path.join(OUT, 'film');
  const handleFilm = async (req) => {
    fs.mkdirSync(FILM_DIR, { recursive: true });
    const files = [];
    for (let i = 0; i < req.total; i++) {
      await page.evaluate(() => { window.__fullRender = true; window.__realRender(); window.__fullRender = false; });
      const f = path.join(FILM_DIR, `${req.name}-${String(i).padStart(2, '0')}.png`);
      await page.screenshot({ path: f }); files.push(f);
      if (i < req.total - 1) {
        await page.evaluate((n) => { window.__steps = n; }, req.spacing);
        await page.waitForFunction(() => window.__steps === 0, null, { polling: 30 });
      }
    }
    let ok = true;
    if (req.name === 'cut-s1') ok = await page.evaluate(() => level.guards[0].hp < window.__filmHp0);   // did the cut land?
    await page.evaluate((retry) => { window.__filmReq = null; if (retry) window.__film.cutDone = false; window.__paused = false; }, !ok);
    if (!ok) { files.forEach((f) => fs.unlinkSync(f)); console.log('INFO film: cut did not land, waiting for the next one'); return; }
    const sheet = path.join(FILM_DIR, `${req.name}-sheet.png`);
    const cols = req.total / 2;
    const py = `
import sys
from PIL import Image, ImageDraw
out, cols = sys.argv[1], int(sys.argv[2]); files = sys.argv[3:]
w, h = 480, 270
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * w, rows * h), (20, 20, 20))
for i, f in enumerate(files):
    im = Image.open(f).convert('RGB').resize((w, h))
    ImageDraw.Draw(im).text((8, 6), str(i), fill=(255, 255, 255))
    sheet.paste(im, ((i % cols) * w, (i // cols) * h))
sheet.save(out)`;
    require('child_process').execFileSync('python3', ['-I', '-c', py, sheet, String(cols), ...files]);
    console.log(`INFO film saved: ${sheet} (${req.total} frames, ${req.spacing} frames apart)`);
  };
  const snap = () => page.evaluate(() => ({
    state, levelIdx, x: player.x, y: player.y, vy: player.vy, lane: player.lane,
    ground: player.onGround, jumps: player.jumps, hp: player.hp, deaths,
    coins: coinsTaken, gx: level ? level.goal.x : 0, t: time,
  }));
  const shot = async (n) => {
    await page.evaluate(() => { window.__paused = true; });   // freeze the clock, draw one full frame
    await sleep(60);
    await page.evaluate(() => { if (window.__realRender) { window.__fullRender = true; window.__realRender(); window.__fullRender = false; } });
    await page.screenshot({ path: path.join(OUT, n + '.png') });
    await page.evaluate(() => { window.__paused = false; });
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
  // The clock is simulated: every animation frame advances the game by exactly 1/60 s and runs the
  // bot first, so a run is deterministic and does not depend on how fast this machine draws.
  await page.evaluate(() => {
    window.__fake = performance.now(); window.__paused = false;
    const later = window.setTimeout.bind(window);
    window.requestAnimationFrame = (cb) => {
      later(function tick() {
        if (window.__paused) { if (window.__steps > 0) window.__steps--; else return later(tick, 5); }
        window.__fake += 1000 / 60;
        if (window.__botStep) window.__botStep();
        cb(window.__fake);
      }, 0);
      return 0;
    };
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

  const FIRST = +(process.env.START_LEVEL || 0);   // dev aid: begin at level n (0-2) via the game's own queueLevel
  if (FIRST > 0) await page.evaluate((n) => queueLevel(n), FIRST);
  for (let L = FIRST; L < 3; L++) {
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
      // if we just keep walking off this edge, do we land on something before the kill line?
      const walkOffLands = (p) => {
        let x = p.x, y = p.y, vy = 0, air = false;
        for (let i = 0; i < 180; i++) {
          x += 385 / 60;
          if (!air) air = !plats.some(([bx, by, bw, , l]) => (l ?? 1) === p.lane && x >= bx && x <= bx + bw && Math.abs(by - y) <= 1);
          if (air) {
            const py = y; vy += 2300 / 60; y += vy / 60;
            if (y > level.killY) return false;
            for (const [bx, by, bw, , l] of plats) {
              if ((l ?? 1) === p.lane && x >= bx && x <= bx + bw && py <= by + 1 && y >= by) return true;
            }
          }
        }
        return true;
      };
      const anyBelow = (lane, x, y) => groundAt(lane, x, y, 1e5);
      // a block that should keep being pushed: it can still roll right and a tall wall stands beyond it
      const blocks = level.blocks || [];
      const pushable = (q, y) => {
        const b = blocks.find(k => k.p === q);
        return !!b && q[0] < b.x1 - 1 && plats.some(w => w !== q && w[5] !== 'block' && w[5] !== 'plank' &&
          (w[4] ?? 1) === (q[4] ?? 1) && w[0] >= q[0] + q[2] && w[0] < q[0] + q[2] + 600 && y - w[1] >= 150);
      };
      // a ledge or wall ahead that needs a jump; taller ones need an earlier take-off
      const wallAhead = (lane, x, y) => plats.some((q) => {
        const [bx, by, , , l] = q;
        const h = y - by;
        return (l ?? 1) === lane && h > 20 && h < 260 && bx > x + 10 && bx < x + (h <= 130 ? 80 : 185) && !pushable(q, y);
      });
      const linkAt = (x, a, b) => links.find(k => x >= k.x - 10 && x <= k.x + k.w + 10 &&
        ((k.a === a && k.b === b) || (k.a === b && k.b === a)));
      // same rule the game uses: a gate link under the player and footing in the target lane
      const canShift = (p, target) => !!linkAt(p.x, p.lane, target) && plats.some(([bx, by, bw, , ln]) =>
        ln === target && p.x > bx - 6 && p.x < bx + bw + 6 && by > p.y - 150 && by < p.y + 250);
      // platform graph for the lane planner
      const nodes = plats.filter(q => !['awning', 'block', 'bale'].includes(q[5]));
      const nodeOf = (lane, x, y) => nodes.find(q => (q[4] ?? 1) === lane && x >= q[0] - 6 && x <= q[0] + q[2] + 6 && Math.abs(q[1] - y) <= 4) || null;
      const edgesOf = (A) => {
        const la = A[4] ?? 1, out = [];
        for (const B of nodes) {
          if (B === A) continue;
          const lb = B[4] ?? 1;
          if (la === lb) {
            const hopRight = B[0] >= A[0] + A[2] - 60 && B[0] <= A[0] + A[2] + 230 && B[1] >= A[1] - 170 && B[1] <= A[1] + 400;
            const stepUp = B[0] > A[0] && B[0] < A[0] + A[2] && B[1] < A[1] && B[1] >= A[1] - 170;
            if (hopRight || stepUp) out.push(B);
          } else if (Math.abs(la - lb) === 1) {
            const lo = Math.max(A[0], B[0] - 6), hi = Math.min(A[0] + A[2], B[0] + B[2] + 6);
            const gate = links.some(k => ((k.a === la && k.b === lb) || (k.a === lb && k.b === la)) && k.x + k.w + 14 >= lo && k.x - 14 <= hi);
            if (gate && B[1] > A[1] - 150 && B[1] < A[1] + 250) out.push(B);
          }
        }
        return out;
      };
      const bfs = (A, goal) => {
        const prev = new Map([[A, null]]), queue = [A];
        while (queue.length) {
          const n = queue.shift();
          if (n === goal) { const path = []; for (let c = n; c; c = prev.get(c)) path.unshift(c); return path; }
          for (const m of edgesOf(n)) if (!prev.has(m)) { prev.set(m, n); queue.push(m); }
        }
        return null;
      };
      window.__falls = []; window.__log = [];
      const trail = [], hpSeen = new Map(), raiseSeen = new Set();
      // would a full jump from here, holding right, catch this rope or vine in flight? (its swing is advanced the same way the game does)
      const jumpGrabs = (o) => {
        const p = player, T = TUNE, dt = 1 / 60;
        let x = p.x, y = p.y, vx = p.vx, vy = -830, ang = o.ang, angV = o.angV, tt = 0;
        const W2 = Math.pow(2 * Math.PI / T.ROPE_PERIOD, 2);
        for (let i = 0; i < 80; i++) {
          tt += dt;
          vx = Math.min(385, vx + 2600 * dt); vy += 2300 * dt;
          if (tt > 0.38 && vy < -300) vy = -300;
          x += vx * dt; y += vy * dt;
          if (o.vine) {
            const w = 2 * Math.PI / T.ROPE_PERIOD, A = T.VINE_AMP * Math.PI / 180;
            const amp = Math.sqrt(ang * ang + (angV / w) * (angV / w));
            angV += (-W2 * Math.sin(ang) + (amp < A ? Math.sign(angV || 1) * T.VINE_DRIVE : 0)) * dt; ang += angV * dt;
          } else {
            const idle = Math.asin(Math.min(1, T.ROPE_SWAY / o.len)) * Math.sin((time + tt) * 2 * Math.PI / T.ROPE_PERIOD);
            angV += ((idle - ang) * W2 - angV * T.ROPE_SETTLE) * dt; ang += angV * dt;
          }
          const hy = y - T.HANG_HANDS;
          const rx = o.x + (Math.min(hy, o.ay + o.len) - o.ay) * Math.tan(ang);
          if (vy > -200 && Math.abs(x - rx) < T.GRAB_X && y > o.ay && hy < o.ay + o.len + T.ROPE_SLACK) return true;
        }
        return false;
      };
      // would a full jump from here, holding right, come down on this awning?
      const landsOnAwning = (aw) => {
        const p = player, dt = 1 / 60;
        let x = p.x, y = p.y, vx = p.vx, vy = -830, tt = 0;
        for (let i = 0; i < 120; i++) {
          tt += dt; vx = Math.min(385, vx + 2600 * dt); vy += 2300 * dt;
          if (tt > 0.38 && vy < -300) vy = -300;
          const py = y; x += vx * dt; y += vy * dt;
          if (vy > 0 && py <= aw[1] + 0.5 && y >= aw[1]) return x + 13 > aw[0] + 10 && x - 13 < aw[0] + aw[2] - 10;
        }
        return false;
      };
      let ropeWait = null, plan = null, ropeT0 = null, curDir = 1, downDown = false;
      // hold right, left or neither (the run keys cancel each other when both are down)
      const setDir = (d) => {
        if (d === curDir) return;
        press('ArrowRight', d === 1); press('ArrowLeft', d === -1); curDir = d;
      };
      // if he lets go of this rope now (and holds right), where does the arc come down? [x, platform] or null
      const swingLanding = (c, allowWade) => {
        const o = c.o, T = TUNE, r = c.r, lane = player.lane;
        const v = r * o.angV * T.ROPE_RELEASE_GAIN;
        let x = o.x + r * Math.sin(o.ang), y = o.ay + r * Math.cos(o.ang) + T.HANG_HANDS;
        let vx = v * Math.cos(o.ang), vy = -v * Math.sin(o.ang) + (o.vine ? T.VINE_RELEASE_VY : T.ROPE_RELEASE_VY);
        const liftV = Math.min(0, -v * Math.sin(o.ang));
        let overV = Math.abs(vx), tt = 0;
        const dt = 1 / 60;
        for (let i = 0; i < 300; i++) {
          tt += dt;
          vx += 2600 * dt; overV = Math.max(0, overV - T.AIR_KEEP * dt);
          const cap = Math.max(385, overV); vx = Math.max(-cap, Math.min(cap, vx));
          vy = Math.min(1200, vy + 2300 * dt);
          if (tt > 0.38 && vy < -300 + liftV) vy = -300 + liftV;
          const px = x, py = y; x += vx * dt; y += vy * dt;
          if (vy > 0) for (const q of nodes) {
            if (q[5] === 'wade' && !allowWade) continue;
            if ((q[4] ?? 1) === lane && x >= q[0] + 30 && x <= q[0] + q[2] - 30 && py <= q[1] + 1 && y >= q[1] && x > o.x + 80) return [Math.round(x), q[0]];
          }
          if (y > level.killY) return null;
        }
        return null;
      };
      let upDown = false, lastShift = 0, jumpAt = -1e9, lastAtk = 0, atkUp = -1, spaceDown = false, sx = -1, st = time * 1000;
      press('ArrowRight', true);
      // what the run actually exercised, so a green run proves the traversal pieces were used
      const cov = window.__cov = { pole: 0, rope: 0, plank: 0, leap: 0, push: 0, handover: 0, falls: 0, cuts: 0, kills: 0, telegraph: 0,
        bounce: 0, bale: 0, gangplank: 0, slide: 0, mast: 0, ladder: 0, vine: 0, marked: 0, swing: 0, wade: 0, sway: 0, shieldKill: 0 };
      let prevVy = 0, prevSlope = null, prevWade = false, prevSway = false; let prev = { climb: null, plank: false, leap: false, hp: 3 }; const pushedBlocks = new Set();
      window.__botStep = () => {
        const p = player, now = time * 1000;   // game time, so timers do not depend on frame rate
        if (state !== 'play') { window.__botStep = null; press('ArrowRight', false); press(' ', false); return; }
        if (p.climb && !prev.climb) {
          cov[p.climb.kind]++;
          if (p.climb.kind === 'pole' && (p.climb.o.kind === 'mast' || p.climb.o.kind === 'line')) cov.mast++;
          if (p.climb.kind === 'pole' && p.climb.o.kind === 'ladder') cov.ladder++;
          if (p.climb.kind === 'rope' && p.climb.o.vine) cov.vine++;
        }
        if (p.vy < -950 && prevVy >= -950 && !p.climb && plats.some(q => q[5] === 'awning' && (q[4] ?? 1) === p.lane && p.x > q[0] - 20 && p.x < q[0] + q[2] + 20 && Math.abs(p.y - q[1]) < 25)) cov.bounce++;   // an awning bounce (a jump is -830)
        prevVy = p.vy;
        if (p.leap && p.leap.moving && !prev.leap) cov.marked++;
        if (p.onSlope && p.onSlope !== prevSlope) cov[p.onSlope.kind === 'mud' ? 'slide' : 'gangplank']++;
        prevSlope = p.onSlope;
        if (p.inWater && !prevWade) cov.wade++;
        prevWade = !!p.inWater;
        const onSway = !!(p.onGround && p.groundPl && p.groundPl[5] === 'sway');
        if (onSway && !prevSway) cov.sway++;
        prevSway = onSway;
        if (p.onPlank && !prev.plank) cov.plank++;
        if (p.leap && !prev.leap) cov.leap++;
        if (p.scene && !prev.scene) cov.handover++;
        if (p.fadeT > 0 && !prev.fade) { cov.falls++; (window.__falls = window.__falls || []).push([Math.round(p.x), Math.round(p.y), p.lane, trail.filter((_, i) => i % 6 === 0).map(a => a.join(':')).join(' ')]); }
        trail.push([Math.round(p.x), Math.round(p.y), p.lane, p.onGround ? 1 : 0]); if (trail.length > 120) trail.shift();
        for (const b of level.blocks || []) if (b.p[0] !== (b.bale ? b.sx : b.x0) && !pushedBlocks.has(b)) { pushedBlocks.add(b); cov[b.bale ? 'bale' : 'push']++; }
        prev = { climb: p.climb, plank: p.onPlank, leap: !!p.leap, scene: !!p.scene, fade: p.fadeT > 0 };
        const jump = (why) => { (window.__log = window.__log || []).push([why, Math.round(p.x), Math.round(p.y), Math.round(p.vy), p.jumps]); if (spaceDown) press(' ', false); press(' ', true); spaceDown = true; jumpAt = now; };
        if (spaceDown && now - jumpAt > 380) { press(' ', false); spaceDown = false; }
        if (atkUp > 0 && now > atkUp) { press('j', false); atkUp = -1; }
        const logit = (...a) => (window.__log = window.__log || []).push(a);
        // ink-wash return to the banner: nothing to do until it ends
        if (p.fadeT > 0 || p.leap) { st = now; return; }   // the gate leap ignores input for 0.5 s
        // the sword handover scene: skip it with J once it has run a moment
        if (p.scene) {
          st = now;
          if (p.scene.t > 0.3 && now - lastAtk > 300) { logit('skip-handover', Math.round(p.x)); press('j', true); atkUp = now + 60; lastAtk = now; }
          return;
        }
        if (!p.climb) { ropeT0 = null; if (curDir !== 1) setDir(1); if (downDown) { press('ArrowDown', false); downDown = false; } }
        // on a pole or rope: climb up if a ledge above lies ahead (always on a pole), then jump off toward the goal
        if (p.climb) {
          st = now;
          const c = p.climb, o = c.o;
          if (c.kind === 'rope') {
            if (ropeT0 === null) ropeT0 = now;
            if (o.toLane !== null) {              // marked rope: ↑ (toward the far lane) swings across
              if (now - lastShift > 300) { const key = o.toLane < p.lane ? 'ArrowUp' : 'ArrowDown'; logit('marked', Math.round(p.x), Math.round(p.y)); press(key, true); press(key, false); lastShift = now; }
              return;
            }
            // --film: on level 1's first rope keep pumping (no release) until the swing is big, measure one
            // full period between two east-most points, then freeze the clock and ask the test to take 8 frames
            const F = window.__film;
            if (F && F.rope && !F.ropeDone && levelIdx === 0 && o === level.ropes[0]) {
              const R = F.rs || (F.rs = { amp: 0, t: [], pv: 0 });
              R.amp = Math.max(R.amp, Math.abs(o.ang));
              if (R.amp >= 0.5 && R.pv > 0 && o.angV <= 0) {
                R.t.push(time);
                if (R.t.length === 2) {
                  F.ropeDone = true;
                  window.__filmReq = { name: 'rope1', total: 8, spacing: Math.max(1, Math.round((R.t[1] - R.t[0]) * 60 / 8)) };
                  window.__paused = true;
                }
              }
              R.pv = o.angV;
              if (now - ropeT0 > 12000) F.ropeDone = true;
              setDir(Math.abs(o.angV) < 0.15 ? 1 : Math.sign(o.angV));
              const low = c.r < o.len - 14; if (low !== downDown) { press('ArrowDown', low); downDown = low; }
              return;
            }
            if (now - ropeT0 < 14000) {           // a free rope or vine: pump the swing, let go when the arc lands on footing
              const hit = swingLanding(c, now - ropeT0 > 9000);
              if (hit) { cov.swing++; if (downDown) { press('ArrowDown', false); downDown = false; } logit('swing-release', Math.round(p.x), Math.round(p.y), +o.ang.toFixed(2), +o.angV.toFixed(2), hit[0], hit[1]); setDir(1); press('ArrowUp', false); upDown = false; jump('swing'); return; }
              // slide to the bottom of the rope first (more arm, more speed), pumping all the while
              const low = c.r < o.len - 14;
              if (low !== downDown) { press('ArrowDown', low); downDown = low; }
              setDir(Math.abs(o.angV) < 0.15 ? 1 : Math.sign(o.angV));
              return;
            }
          }
          const lo = c.kind === 'pole' ? o.top : o.ay + 60;
          const ledgeAhead = plats.some(q => (q[4] ?? 1) === p.lane && q[5] !== 'block' && q[0] + q[2] > p.x + 60 && q[0] < p.x + 700 && q[1] < p.y - 40);
          if ((c.kind === 'pole' || ledgeAhead) && p.y > lo + 3) {
            if (!upDown) { press('ArrowUp', true); upDown = true; }
          } else {
            if (upDown) { press('ArrowUp', false); upDown = false; }
            if (now - jumpAt > 300) { logit('climb-off-' + c.kind, Math.round(p.x), Math.round(p.y)); jump('climb-off'); }
          }
          return;
        }
        // a Srivijayan fighter ahead in this lane: fight him (levels 3). A fighter who has seen us advances,
        // raises his weapon for 0.5 s (the telegraph), thrusts for 0.15 s, then recovers for 0.7 s. A cut
        // landing at any time stops his attack and puts him in recovery; two cuts defeat him. A shield-bearer
        // blocks cuts from the front except in recovery, so we stay out of his thrust and cut after it.
        const foe = level.guards.find(g => g.type !== 'guard' && !g.dead && g.mode !== 'kneel' && g.lane === p.lane &&
          Math.abs(p.y - g.y) <= 90 && g.x - p.x > -20 && g.x - p.x < 330);
        for (const g of level.guards) {
          if (g.type === 'guard') continue;
          const was = hpSeen.get(g); if (was !== undefined && g.hp < was) { cov.cuts++; if (g.hp <= 0) { cov.kills++; if (g.type === 'shield') cov.shieldKill++; } if (raiseSeen.has(g) && g.atk === 'recover') cov.telegraph++; }
          hpSeen.set(g, g.hp);
        }
        if (foe) {
          const gap = foe.x - p.x, shield = foe.type === 'shield', atk = foe.mode === 'engage' ? foe.atk : null;
          if (atk === 'raise') raiseSeen.add(foe);
          // Numbers (TUNE): fighters walk in at 180 px/s and halt 60 px away; his thrust reaches 83 px past his
          // center (hero center 96 px away is safe); the cut is live 0.085 to 0.16 s into the swing and reaches
          // 77 px center to center, and the hero keeps sliding about 25 to 35 px during the swing.
          let d = 1;
          if (shield) {
            // let him close and raise, step back out of the thrust, then rush in during his recovery
            if (atk === 'recover') d = 1;
            else if (atk === 'raise' || atk === 'thrust') d = gap < 110 ? -1 : 0;
            else d = gap > 170 ? 1 : 0;
          }
          setDir(d);
          if (gap <= 100 && gap > -10 && p.attackT <= 0 && now - lastAtk > 250 && (!shield || atk === 'recover')) {
            logit('cut', Math.round(p.x), Math.round(gap), foe.type, atk);
            press('j', true); atkUp = now + 60; lastAtk = now;
            const F = window.__film;   // --film: the first cut on fighter S1, from the press on, 10 frames 3 apart
            if (F && F.cut && !F.cutDone && levelIdx === 2 && foe === level.guards[0]) {
              F.cutDone = true; window.__filmHp0 = foe.hp;
              window.__filmReq = { name: 'cut-s1', total: 10, spacing: 3 };
              window.__paused = true;
            }
          }
          st = now;
          return;
        }
        // walking up to a pole whose top lies well above our feet: hold up beside it to grab it
        const pole = (level.poles || []).find(o => o.lane === p.lane && o.x > p.x - 20 && o.x < p.x + 110 &&
          o.top < p.y - 100 && Math.abs(o.bot - p.y) < 40);
        if (p.onGround && pole) { if (!upDown) { press('ArrowUp', true); upDown = true; logit('pole-up', Math.round(p.x)); } }
        else if (upDown) { press('ArrowUp', false); upDown = false; }
        // crossing a lane-1 gap: plan a path over the platforms of all three lanes (hops across small gaps,
        // lane changes at gates) to the next lane-1 footing, and take a lane change when the plan asks for it
        let wantFar = false;
        const here = p.onGround ? nodeOf(p.lane, p.x, p.y) : null;
        if (!plan && p.lane === 1 && here && groundAt(1, p.x + 130, p.y, 300) === null) {
          const nxt = nodes.filter(q => (q[4] ?? 1) === 1 && q[0] > p.x + 120).sort((a, b) => a[0] - b[0])[0];
          if (nxt && bfs(here, nxt)) { plan = { dest: nxt }; logit('plan', Math.round(p.x), Math.round(nxt[0])); }
        }
        if (plan && here) {
          if ((here[4] ?? 1) === 1 && here[0] >= plan.dest[0]) plan = null;
          else {
            const path = bfs(here, plan.dest);
            if (!path) plan = null;
            else if (path.length > 1 && (path[1][4] ?? 1) !== (here[4] ?? 1)) {
              const tl = path[1][4] ?? 1, B = path[1];
              // the gate must be under us AND the footing we land on must be the planned platform
              if (canShift(p, tl) && p.x > B[0] - 6 && p.x < B[0] + B[2] + 6 && B[1] > p.y - 150 && B[1] < p.y + 250) {
                wantFar = true;
                if (now - lastShift > 350) { logit('shift', Math.round(p.x), p.lane, tl); const key = tl < p.lane ? 'ArrowUp' : 'ArrowDown'; press(key, true); press(key, false); lastShift = now; }
              }
            }
          }
        }
        // off the main lane with no plan running: step back to lane 1 where lane-1 footing runs on ahead
        if (!plan && p.lane !== 1 && here && canShift(p, 1) && groundAt(1, p.x + 20, p.y, 400) !== null && groundAt(1, p.x + 150, p.y, 400) !== null) {
          wantFar = true;
          if (now - lastShift > 350) { logit('back', Math.round(p.x), p.lane); const key = p.lane > 1 ? 'ArrowUp' : 'ArrowDown'; press(key, true); press(key, false); lastShift = now; }
        }
        if (p.onGround && now - jumpAt > 250 && !wantFar) {
          // a tall wall ahead with an awning in front of it: jump so the arc comes down on the awning (it bounces)
          const awn = plats.find(q => q[5] === 'awning' && (q[4] ?? 1) === p.lane && q[0] + q[2] > p.x + 20 && q[0] < p.x + 260 && Math.abs(q[1] - p.y) < 120 &&
            plats.some(w => w[5] !== 'awning' && w[5] !== 'plank' && (w[4] ?? 1) === p.lane && w[0] >= q[0] && w[0] < q[0] + q[2] + 420 && p.y - w[1] >= 180));
          // a marked rope hangs just past a ledge: walk straight off the end onto it (a jump would carry over it)
          const mrope = (level.ropes || []).find(o => o.toLane !== null && o.lane === p.lane && o.x > p.x && o.x < p.x + 120 && groundAt(p.lane, o.x, p.y, 0) === null);
          if (mrope) { st = now; }
          else if (awn) { if (landsOnAwning(awn)) { jump('awning'); logit('awning', Math.round(p.x), awn[0]); } }   // else keep walking toward it
          else {
          // at the end of a ledge, with a free rope or vine ahead: jump when the arc will catch it, else wait a moment
          const edgeNear = groundAt(p.lane, p.x + 50, p.y, 0) === null;
          const rope = edgeNear && (level.ropes || []).find(o => o.lane === p.lane && o.toLane === null && o.x > p.x + 30 && o.x < p.x + 330);
          if (rope && ropeWait === null) ropeWait = now;
          if (!rope) ropeWait = null;
          if (rope && jumpGrabs(rope)) { jump('rope-grab'); logit('rope-grab', Math.round(p.x), rope.x); ropeWait = null; }
          else if (rope && now - ropeWait < 4000) { setDir(0); st = now; }
          else {
          const ahead = groundAt(p.lane, p.x + 45, p.y, 120);
          // stepping off a ledge with a higher ledge in reach ahead: jump for it rather than drop
          const climb = ahead !== null && ahead > p.y + 30 && plats.some(([bx, by, , , l]) =>
            (l ?? 1) === p.lane && bx > p.x + 10 && bx < p.x + 260 && by < p.y - 10 && by > p.y - 200);
          // the ledge ahead drops away and plain walking off it would miss the next footing: jump
          const shortDrop = groundAt(p.lane, p.x + 45, p.y, 0) === null && !walkOffLands(p);
          if (ahead === null || climb || shortDrop || wallAhead(p.lane, p.x, p.y)) jump(shortDrop ? 'edge' : 'ground');
          }
          }
        } else if (!p.onGround && p.vy > 50 && p.jumps === 1 && now - jumpAt > 200) {
          if (!landsOn(p.lane, p) || wallAhead(p.lane, p.x, p.y)) jump('air');
        }
        if (levelIdx >= 2 && now - lastAtk > 400 && level.guards.some(g => !g.dead && g.lane === p.lane && Math.abs(g.x - p.x) < 85)) {
          press('j', true); atkUp = now + 60; lastAtk = now;
        }
        if (Math.abs(p.x - sx) > 15) { sx = p.x; st = now; }
        else if (now - st > 1500 && p.onGround) { jump('stuck'); st = now; }
      };
    });
    const start = Date.now();
    let done = false, midShot = false;
    if (FILM) await page.evaluate(() => { window.__film = window.__film || { rope: true, cut: true }; });
    const t0g = s.t;   // game seconds
    const limitS = limitFor(s.gx);
    let lastT = s.t, lastTick = Date.now(), stalled = false;
    while (s.t - t0g < limitS) {
      await sleep(process.env.TRACE ? 40 : 100);
      if (FILM) { const req = await page.evaluate(() => window.__filmReq || null); if (req) await handleFilm(req); }
      s = await snap();
      if (s.t !== lastT) { lastT = s.t; lastTick = Date.now(); }
      else if (Date.now() - lastTick > 6000) { stalled = true; break; }   // the game loop died (a thrown error)
      if (process.env.TRACE) console.log(JSON.stringify([Math.round(s.x), Math.round(s.y), s.lane, s.ground, s.hp]));
      if (s.state !== 'play') { done = true; break; }
      if (!midShot && s.x > s.gx * 0.5) { midShot = true; await shot(`l${L + 1}-mid`); }
    }
    const cov = await page.evaluate(() => Object.assign(window.__cov, { sword: level && level.swordDrawn ? 1 : 0 }));
    console.log(`INFO ${name} exercised: ` + Object.entries(cov).map(([k, v]) => `${k} ${v}`).join(', '));
    const falls = await page.evaluate(() => window.__falls || []);
    if (falls.length) console.log(`INFO ${name} returns to banner at (x,y,lane,trail): ` + JSON.stringify(falls));
    if (done) {
      const need = NEEDED[L];
      const miss = need.keys.filter((k) => !cov[k]);
      miss.length === 0 ? pass(`${name} pieces exercised (${need.text})`)
                        : fail(`${name} pieces exercised`, 'never used: ' + miss.join(', '));
    }
    if (process.env.TRACE || process.env.LOGS) console.log('LOG ' + JSON.stringify(await page.evaluate(() => window.__log)));
    await page.evaluate(() => { window.__botStep = null; });
    for (const k of ['ArrowRight', ' ', 'j']) await page.keyboard.up(k).catch(() => {});
    s = await snap();
    const secs = (s.t - t0g).toFixed(1);   // game seconds
    if (done) {
      const nextOk = L < 2 ? s.state === 'inter' && s.levelIdx === L + 1 : s.state === 'end';
      nextOk ? pass(`${name} completed by script (${secs} game s, ${s.deaths} deaths so far)`)
             : fail(`${name} completed`, `state=${s.state} levelIdx=${s.levelIdx}`);
      await shot(`l${L + 1}-complete`);
    } else {
      fail(`${name} completed by script`, `${stalled ? 'game loop stopped, ' : ''}timeout after ${secs} game s at x=${Math.round(s.x)} of goal ${s.gx}, lane ${s.lane}, deaths ${s.deaths}`);
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
