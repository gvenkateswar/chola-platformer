// Smoke test for Chola: Tides of Bronze. Run: node tests/smoke.js [path/to/index.html]
// Plays all three levels by scripted input (a bot that reads game state). The map, pause and paid-hint
// checks read window.__test (docs/NOTES.md, build/systems).
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
  { keys: ['handover', 'pole', 'rope', 'plank', 'push', 'leap', 'named'], text: 'handover, pole, rope, plank, block push, gate leap, a named kasu' },
  { keys: ['bounce', 'bale', 'gangplank', 'mast', 'marked', 'swing', 'leap', 'named'], text: 'awning bounce, bale, gangplank, mast, marked rope, pumped swing, gate leap, a named kasu' },
  { keys: ['vine', 'marked', 'wade', 'slide', 'sway', 'swing', 'sword', 'cuts', 'kills', 'telegraph', 'shieldKill', 'parry', 'named'],
    text: 'vine swing, marked vine, wading, mud slide, sway walkway, sword drawn, fighters cut and defeated, telegraph read, shield-bearer defeated, a parry landed, a named kasu' },
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

  // runs stay identical: the map persists in localStorage (TUNE.KEEP_MAP), so start every run with it empty
  await page.addInitScript(() => { try { localStorage.clear(); } catch (e) {} });
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
  // --- voyage map, strip, pause and paid-hint checks (hooks: window.__test, docs/NOTES.md build/systems)
  const T = (fn, arg) => page.evaluate(fn, arg);
  // the coastline is drawn: COAST rings exist, and ink lies on (within 2 px of) most coast vertices on the canvas
  const mapDrawn = (id) => T((id) => {
    const cv = document.getElementById(id), g = cv.getContext('2d');
    const d = g.getImageData(0, 0, cv.width, cv.height).data;
    const dark = (x, y) => { for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      const i = ((y + dy) * cv.width + x + dx) * 4; if (d[i] + d[i + 1] + d[i + 2] < 300 && d[i + 3] > 200) return true; } return false; };
    let n = 0, hit = 0;
    for (const r of COAST.rings) for (let i = 0; i < r.length; i += 2) {
      const x = Math.round(r[i]), y = Math.round(r[i + 1]);
      if (x < 40 || x > cv.width - 40 || y < 40 || y > 560 || i % 8) continue;   // off the edges and clear of the strip
      n++; if (dark(x, y)) hit++;
    }
    let ink = 0; for (let i = 0; i < d.length; i += 4) if (d[i] + d[i + 1] + d[i + 2] < 300 && d[i + 3] > 200) ink++;
    return { rings: COAST.rings.length, verts: n, hit, ink, frac: n ? hit / n : 0 };
  }, id);
  const waitFor = async (fn, ms) => { const end = Date.now() + ms; let v; while (Date.now() < end) { v = await T(fn); if (v) return v; await sleep(50); } return v; };
  const mapState = () => T(() => window.__test.map());

  const interChecks = async (L) => {
    const m0 = await mapState();
    if (L === 0) {
      !m0.visible && m0.legs === 0 ? pass('level 1 card: no map, strip empty') : fail('level 1 card: no map, strip empty', JSON.stringify(m0));
      return;
    }
    if (L === 1) {
      // DESIGN §6: line 1 fills in on finishing level 1; the level 2 card opens the map and sails it
      m0.visible && m0.legs === 1 && m0.legsShown === 0 ? pass('level 2 card opens the map with strip line 1 to sail')
        : fail('level 2 card opens the map with strip line 1 to sail', JSON.stringify(m0));
      const m1 = await waitFor(() => window.__test.map().legsShown >= 1 && window.__test.map(), 4000);
      m1 && m1.legsShown === 1 && !m1.sailing ? pass('strip line 1 written in on the level 2 card') : fail('strip line 1 written in on the level 2 card', JSON.stringify(m1 || await mapState()));
    } else {
      // DESIGN §6: lines 3 and 4 fill in on the level 3 card, leg by leg, about 2 s each
      const seq = [m0.legsShown];
      const tEnd = Date.now() + 9000;
      while (Date.now() < tEnd) { const m = await mapState(); if (m.legsShown !== seq[seq.length - 1]) seq.push(m.legsShown); if (m.legsShown >= 4 && !m.sailing) break; await sleep(50); }
      const steps = seq.every((v, i) => i === 0 || v === seq[i - 1] + 1);
      m0.visible && m0.legs === 4 && m0.legsShown <= 2 && seq[seq.length - 1] === 4 && steps
        ? pass(`level 3 card sails the strip leg by leg to line 4 (lines shown ${seq.join(' > ')})`)
        : fail('level 3 card sails the strip leg by leg to line 4', `start ${JSON.stringify(m0)}, lines shown ${seq.join(' > ')}`);
      if (m0.legsShown < 2) console.log(`INFO level 3 card: strip line 2 was still bare on arrival (legsShown ${m0.legsShown}), so it sails here too; DESIGN §6 has it filled on leaving the quay`);
    }
    await sleep(200);   // let a frame draw after the last leg
    const md = await mapDrawn('interMap');
    md.rings > 0 && md.frac > 0.6 ? pass(`level ${L + 1} card map draws the coastline (${md.rings} rings, ink on ${md.hit}/${md.verts} sampled vertices)`)
      : fail(`level ${L + 1} card map draws the coastline`, JSON.stringify(md));
    await page.screenshot({ path: path.join(OUT, `l${L + 1}-card-map.png`), fullPage: false });
  };

  // pause (Esc), the map from the pause screen (M), back (Esc), resume (P); the world must hold still while paused
  const pauseChecks = async (L) => {
    await page.keyboard.press('Escape');
    let q = await T(() => ({ p: window.__test.paused(), vis: !document.getElementById('pauseScreen').hidden, title: document.getElementById('pauseTitle').textContent, t: time, x: player.x }));
    q.p && q.vis && q.title === (await T(() => level.name)) ? pass('Esc opens the pause screen') : fail('Esc opens the pause screen', JSON.stringify(q));
    await T(() => { window.__paused = false; });   // let the clock run: game time and the hero must not move
    await page.keyboard.down('ArrowRight'); await sleep(400); await page.keyboard.up('ArrowRight');
    const q2 = await T(() => ({ t: time, x: player.x, frames: window.__fake }));
    await T(() => { window.__paused = true; });
    q2.t === q.t && q2.x === q.x ? pass('the world holds still while paused') : fail('the world holds still while paused', `time ${q.t} > ${q2.t}, x ${q.x} > ${q2.x}`);
    await T(() => { window.__paused = false; });
    await page.keyboard.press('m');
    await sleep(300);
    let st = await T(() => state);
    if (st === 'card') {   // the first map view opens the pilot's card (SCRIPT §4a); Esc goes back to the map
      const title = await T(() => document.getElementById('cardTitle').textContent);
      console.log(`INFO map from the pause screen opened a card first: "${title}"`);
      await page.keyboard.press('Escape'); await sleep(300); st = await T(() => state);
    }
    const mm = await mapState();
    st === 'map' && mm.visible ? pass('M on the pause screen opens the voyage map') : fail('M on the pause screen opens the voyage map', `state=${st} ${JSON.stringify(mm)}`);
    const md = await mapDrawn('mapCanvas');
    md.rings > 0 && md.frac > 0.6 ? pass(`pause-screen map draws the coastline (ink on ${md.hit}/${md.verts} sampled vertices)`) : fail('pause-screen map draws the coastline', JSON.stringify(md));
    await page.screenshot({ path: path.join(OUT, `l${L + 1}-pause-map.png`) });
    await page.keyboard.press('Escape'); await sleep(150);
    q = await T(() => ({ s: state, p: window.__test.paused(), vis: !document.getElementById('pauseScreen').hidden }));
    q.s === 'play' && q.p && q.vis ? pass('Esc on the map returns to the pause screen') : fail('Esc on the map returns to the pause screen', JSON.stringify(q));
    await T(() => { window.__paused = true; });
    await page.keyboard.press('p');
    // resumeGame sets last = performance.now(); the test clock runs on window.__fake, so line them up again
    q = await T(() => { last = window.__fake; return { p: window.__test.paused(), vis: !document.getElementById('pauseScreen').hidden, s: state }; });
    !q.p && !q.vis && q.s === 'play' ? pass('P resumes play') : fail('P resumes play', JSON.stringify(q));
  };

  // paid hint lamps (DESIGN §6, DECISIONS 30): lit from the level's start once bought, and drawn
  const lampStart = async (L) => {
    const who = L === 1 ? "boatman's" : "pilot's", good = L === 1 ? 'boatman' : 'pilot';
    const h = await T((good) => {
      let calls = 0; const real = drawHintLamp; drawHintLamp = (...a) => { calls++; return real(...a); };
      window.__fullRender = true; window.__realRender(); window.__fullRender = false;
      drawHintLamp = real;
      const had = RUN.goods[good]; delete RUN.goods[good]; const unbought = !!hintLit(); if (had) RUN.goods[good] = had;   // not bought: no lamp
      return Object.assign(window.__test.hint() || {}, { calls, unbought });
    }, good);
    h.lit && !h.out && h.calls > 0 && h.unbought === false ? pass(`level ${L + 1}: the ${who} lamp burns at (${h.x}, ${h.y}) once bought`)
      : fail(`level ${L + 1}: the ${who} lamp burns once bought`, JSON.stringify(h));
  };
  const lampEnd = async (L) => {
    const who = L === 1 ? "boatman's" : "pilot's";
    const h = await T(() => Object.assign(window.__test.hint() || {}, { outAt: window.__hintOutX }));
    h.out && !h.lit ? pass(`level ${L + 1}: the ${who} lamp goes out when its target is taken (at x ${h.outAt})`)
      : fail(`level ${L + 1}: the ${who} lamp goes out when its target is taken`, JSON.stringify(h));
  };

  for (let L = FIRST; L < 3; L++) {
    const name = `level ${L + 1}`;
    await interChecks(L);
    // freeze the test clock across the load, so every run starts the level on the same frame and game time
    // ropes and vines take their phase from `time` (also at load), so pin it per level before the load:
    // the menus run on wall time, which varies from run to run
    await T((t) => { window.__paused = true; time = t; window.__hintOutX = undefined; }, 1000 * (L + 1) + (+process.env.TIME_SHIFT || 0));   // TIME_SHIFT: dev aid
    await page.click('#interBtn');
    s = await snap();
    if (s.state !== 'play' || s.levelIdx !== L) { fail(name + ' loads', `state=${s.state} levelIdx=${s.levelIdx}`); break; }
    pass(name + ' loads');
    if (L === 0) await pauseChecks(L);
    if (L > 0) await lampStart(L);
    s = await snap();

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
      const trail = [], hpSeen = new Map(), raiseSeen = new Set(), seenNamed = new Set(), parrySeen = new Set();
      // would a full jump from here, holding right, catch this rope or vine in flight? (its swing is advanced the same way the game does)
      const jumpGrabs = (o) => {
        const p = player, T = TUNE, dt = 1 / 60;
        let x = p.x, y = p.y, vx = p.vx, vy = -830, ang = o.ang, angV = o.angV, tt = 0;
        const W2 = T.ROPE_GRAVITY / o.len, wN = Math.sqrt(W2);   // DECISIONS 25: the period follows length (a free rope uses its full length)
        for (let i = 0; i < 80; i++) {
          tt += dt;
          vx = Math.min(385, vx + 2600 * dt); vy += 2300 * dt;
          if (tt > 0.38 && vy < -300) vy = -300;
          x += vx * dt; y += vy * dt;
          if (o.vine) {
            const w = wN, A = T.VINE_AMP * Math.PI / 180;
            const amp = Math.sqrt(ang * ang + (angV / w) * (angV / w));
            angV += (-W2 * Math.sin(ang) + (amp < A ? Math.sign(angV || 1) * T.VINE_DRIVE : 0)) * dt; ang += angV * dt;
          } else {
            const idle = Math.asin(Math.min(1, T.ROPE_SWAY / o.len)) * Math.sin((time + tt) * wN);
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
      let vineT0 = null, vineDone = false, vineJumpAt = -1e9, errand = null, retreating = false, ropeWait = null, plan = null, ropeT0 = null, curDir = 1, downDown = false;
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
          // solid ledges, as the game resolves them: sideways first (at the old height), then the head
          for (const q of plats) {
            if ((q[4] ?? 1) !== lane || ['awning', 'wade', 'plank'].includes(q[5])) continue;
            const ph = player.h, ov = (cx, cy) => cx + 13 > q[0] && cx - 13 < q[0] + q[2] && cy > q[1] && cy - ph < q[1] + q[3];
            if (ov(x, py) && py > q[1] + 0.5) { x = px; vx = 0; }
            if (vy < 0 && ov(x, y)) { y = q[1] + q[3] + ph; vy = 0; }
          }
          if (vy > 0) for (const q of nodes) {
            if (q[5] === 'wade' && !allowWade) continue;
            if (q[1] - o.ay > 330 && !allowWade) continue;   // a drop to the canyon floor is not the way on (rope 1 must reach the ledge)
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
        bounce: 0, bale: 0, gangplank: 0, slide: 0, mast: 0, ladder: 0, vine: 0, marked: 0, swing: 0, wade: 0, sway: 0, shieldKill: 0, parry: 0, named: 0 };
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
        if (level.paidHint && level.paidHint.out && window.__hintOutX === undefined) window.__hintOutX = Math.round(p.x);
        if (levelIdx === 2 && p.climb && p.climb.o.vine && Math.abs(p.climb.o.x - 1620) < 2) vineDone = true;
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
        if (prev.climb && !p.climb) (window.__log = window.__log || []).push(['released', Math.round(p.x), Math.round(p.y), Math.round(p.vx), Math.round(p.vy)]);
        prev = { climb: p.climb, plank: p.onPlank, leap: !!p.leap, scene: !!p.scene, fade: p.fadeT > 0 };
        const jump = (why) => { (window.__log = window.__log || []).push([why, Math.round(p.x), Math.round(p.y), Math.round(p.vy), p.jumps]); if (spaceDown) press(' ', false); press(' ', true); spaceDown = true; jumpAt = now; };
        if (spaceDown && now - jumpAt > 380) { press(' ', false); spaceDown = false; }
        if (atkUp > 0 && now > atkUp) { press('j', false); atkUp = -1; }
        const logit = (...a) => (window.__log = window.__log || []).push([...a, 't' + Math.round(time % 1000)]);
        // ink-wash return to the banner: nothing to do until it ends
        if (p.fadeT > 0 || p.leap) { st = now; return; }   // the gate leap ignores input for 0.5 s
        // the sword handover scene: skip it with J once it has run a moment
        // (ruling 32: one line per press; the first press is Enter, the rest J, and each press must advance one line)
        if (p.scene) {
          st = now;
          const H = window.__ho || (window.__ho = { presses: 0, lines: [] });
          if (H.lines[H.lines.length - 1] !== (p.scene.line || 0)) H.lines.push(p.scene.line || 0);
          if (p.scene.t > 0.3 && now - lastAtk > 300) {
            logit('skip-handover', Math.round(p.x), p.scene.line || 0);
            if (H.presses === 0) { press('Enter', true); press('Enter', false); } else { press('j', true); atkUp = now + 60; }
            H.presses++; lastAtk = now;
          }
          return;
        }
        if (!p.climb) { ropeT0 = null; if (curDir !== 1) setDir(1); if (downDown) { press('ArrowDown', false); downDown = false; } }
        // flew past the goal (a swing release can overshoot it): walk back to it along this lane
        if (!p.climb && p.onGround && p.lane === 1 && p.x > level.goal.x + 45 && Math.abs(p.y - level.goal.y) < 80) { setDir(-1); st = now; return; }
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
            // a named kasu hangs on this rope's line (level 3's nk5 at the D5 vine's top grip, LEVEL-3 §9):
            // climb to the grip that puts the body over it, and do not let go until it is taken
            const onRope = level.coins.find(k => k.kind === 'named' && !k.taken && k.lane === p.lane && Math.abs(k.x - o.x) < 20 && k.y > o.ay && k.y < o.ay + o.len);
            if (onRope && now - ropeT0 < 14000) {
              const want = Math.max(10, Math.min(o.len, onRope.y - o.ay - 22));   // body center (feet - 28) on the coin
              const high = c.r > want + 6, low = c.r < want - 6;
              if (high !== upDown) { press('ArrowUp', high); upDown = high; }
              if (low !== downDown) { press('ArrowDown', low); downDown = low; }
              if (!window.__ropeCoinLogged) { window.__ropeCoinLogged = 1; logit('rope-coin', onRope.nk, Math.round(c.r), Math.round(want)); }
              setDir(Math.abs(o.angV) < 0.15 ? 1 : Math.sign(o.angV));
              return;
            }
            if (now - ropeT0 < 14000) {           // a free rope or vine: pump the swing, let go when the arc lands on footing
              const hit = swingLanding(c, now - ropeT0 > 12000);
              if (hit) { cov.swing++; if (downDown) { press('ArrowDown', false); downDown = false; } logit('swing-release', Math.round(p.x), Math.round(p.y), +o.ang.toFixed(2), +o.angV.toFixed(2), hit[0], hit[1]); setDir(1); press('ArrowUp', false); upDown = false; jump('swing'); return; }
              // slide to the bottom of the rope first (more arm, more speed), pumping all the while
              // (builder's finding: under the length-based period a short grip, 160 px or less, gets rope 1's swing
              // up to the ledge; the other ropes are fine at the bottom)
              const want = levelIdx === 0 ? Math.min(160, o.len) : (levelIdx === 2 && Math.abs(o.x - 1620) < 2) ? 70 : o.len;   // the D5 vine: a short grip puts the feet at ledge height
              const low = c.r < want - 10, high = c.r > want + 10 && want < o.len;
              if (low !== downDown) { press('ArrowDown', low); downDown = low; }
              if (high !== upDown) { press('ArrowUp', high); upDown = high; }
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
        for (const k of Object.keys(RUN.found)) if (RUN.found[k] && NAMED[k].level === levelIdx && !seenNamed.has(k)) { seenNamed.add(k); cov.named++; logit('named', k, Math.round(p.x)); }
        for (const g of level.guards) {
          if (g.type === 'guard') continue;
          if (g.parried && !parrySeen.has(g)) { parrySeen.add(g); cov.parry++; }
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
            if (atk === 'recover' || atk === 'stun') d = 1;
            else if (atk === 'raise' && foe.atkKind === 'thrust' && gap > 0 && gap < 105) d = 0;   // hold still and parry his thrust
            else if (atk === 'raise' || atk === 'thrust') d = gap < 110 ? -1 : 0;
            else d = gap > 170 ? 1 : 0;
          }
          setDir(d);
          // the parry (DECISIONS 24): press J while his thrust is raised, 3 to 6 frames before the strike (window: 7 before to 3 after)
          if (shield && atk === 'raise' && foe.atkKind === 'thrust' && gap > 0 && gap < 105 && foe.atkT * 60 <= 6 && foe.atkT * 60 >= 2 &&
              p.parryCool <= 0 && p.attackT <= 0 && now - lastAtk > 250) {
            logit('parry-press', Math.round(p.x), Math.round(gap), +(foe.atkT * 60).toFixed(1));
            press('j', true); atkUp = now + 60; lastAtk = now;
          }
          if (gap <= 100 && gap > -10 && p.attackT <= 0 && now - lastAtk > 250 && (!shield || atk === 'recover' || atk === 'stun')) {
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
        const foot1 = (x) => plats.some(([bx, by, bw, , l]) => (l ?? 1) === 1 && x >= bx && x <= bx + bw && by > p.y - 150 && by < p.y + 400);
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
        const onErrand = errand && errand.c && errand.phase >= 1 && errand.phase < 3;   // the errand steps back by itself
        if (!plan && !onErrand && p.lane !== 1 && here && canShift(p, 1) && foot1(p.x + 20) && (foot1(p.x + 150) || level.goal.x - p.x < 400)) {
          wantFar = true;
          if (now - lastShift > 350) { logit('back', Math.round(p.x), p.lane); const key = p.lane > 1 ? 'ArrowUp' : 'ArrowDown'; press(key, true); press(key, false); lastShift = now; }
        }
        // the detour errand: a named kasu on a side-lane deck beside a gate we pass anyway (level 2's stern lantern).
        // At the gate, step into that lane, walk to the coin, then walk back to the gate and step down again.
        if (p.onGround && !p.climb) {
          if (!errand) {
            errand = { phase: 0, c: null, k: null };
            for (const c of level.coins) {
              if (c.kind !== 'named' || c.taken || c.lane === 1 || Math.abs(c.lane - 1) !== 1) continue;
              const k = links.find(l => ((l.a === 1 && l.b === c.lane) || (l.b === 1 && l.a === c.lane)) && Math.abs(l.x + l.w / 2 - c.x) < 250);
              const deck = plats.find(q => (q[4] ?? 1) === c.lane && c.x > q[0] && c.x < q[0] + q[2] && q[1] - c.y < 90 && q[1] - c.y > -10);
              if (k && deck && (!errand.c || c.x < errand.c.x)) { errand.c = c; errand.k = k; }
            }
          }
          const E = errand;
          if (E.c && E.phase === 0 && p.lane === 1 && p.x > E.k.x + 12 && p.x < E.k.x + E.k.w - 12 && canShift(p, E.c.lane)) {
            logit('errand-in', Math.round(p.x), E.c.nk); press(E.c.lane < 1 ? 'ArrowUp' : 'ArrowDown', true); press(E.c.lane < 1 ? 'ArrowUp' : 'ArrowDown', false); E.phase = 1; lastShift = now;
          } else if (E.c && E.phase === 1 && p.lane === E.c.lane) {
            st = now;
            if (E.c.taken) E.phase = 2;
            else { setDir(Math.sign(E.c.x - p.x) || 1); return; }
          }
          if (E.c && E.phase === 2) {
            st = now;
            if (p.lane !== 1) {
              const mid = E.k.x + E.k.w / 2;
              if (canShift(p, 1) && Math.abs(p.x - mid) < E.k.w / 2 - 12 && now - lastShift > 350) { logit('errand-out', Math.round(p.x)); press(E.c.lane < 1 ? 'ArrowDown' : 'ArrowUp', true); press(E.c.lane < 1 ? 'ArrowDown' : 'ArrowUp', false); lastShift = now; E.phase = 3; }
              else { setDir(Math.sign(mid - p.x) || 1); return; }
            }
          }
        }
        // level 3's first detour (D5): off the mud, grab the extra vine at x 1620 and swing to the roots, where the named kasu lies
        if (levelIdx === 2 && p.onGround && p.lane === 1 && p.x > 1480 && p.x < 1900 && Math.abs(p.y - 480) < 3 && !p.climb && !vineDone) {
          const v = (level.ropes || []).find(o => Math.abs(o.x - 1620) < 2 && o.lane === 1);
          if (vineT0 === null) vineT0 = now;
          if (v && now - vineT0 < 25000) {
            st = now;
            if (jumpGrabs(v) && now - jumpAt > 400) { logit('errand-vine', Math.round(p.x)); vineJumpAt = now; jump('errand-vine'); return; }
            if (p.x > 1585) setDir(-1);        // the swing carried him past it: walk back west of the vine and run at it
            else { setDir(1); }
            if (p.x > 1585 || jumpGrabs(v) === false) return;
          }
        }
        // a dead end in a side lane (the detour decks): walk back to the gate we came by and step down to lane 1
        if (p.lane === 1 || p.climb) retreating = false;
        if (retreating && p.onGround) { setDir(-1); st = now; return; }
        if (levelIdx === 1 && !plan && p.lane !== 1 && p.onGround && here && !wantFar && groundAt(p.lane, p.x + 45, p.y, 0) === null &&
            !plats.some(q => (q[4] ?? 1) === p.lane && q[5] !== 'awning' && q[0] > p.x && q[0] < p.x + 450 && q[1] > p.y - 220 && q[1] < p.y + 300) &&
            !(level.ropes || []).some(o => o.lane === p.lane && o.x > p.x && o.x < p.x + 400) &&
            links.some(k => ((k.a === 1 && k.b === p.lane) || (k.b === 1 && k.a === p.lane)) && k.x < p.x + 40 && k.x > p.x - 800)) {
          retreating = true; setDir(-1); st = now; return;
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
          const climb = ahead !== null && ahead > p.y + 30 && plats.some(([bx, by, , , l, kd]) =>
            (l ?? 1) === p.lane && kd !== 'awning' && bx > p.x + 10 && bx < p.x + 260 && by < p.y - 10 && by > p.y - 200);
          // the ledge ahead drops away and plain walking off it would miss the next footing: jump
          const shortDrop = groundAt(p.lane, p.x + 45, p.y, 0) === null && !walkOffLands(p);
          if (ahead === null || climb || shortDrop || wallAhead(p.lane, p.x, p.y)) jump(shortDrop ? 'edge' : 'ground');
          }
          }
        } else if (!p.onGround && p.vy > 50 && p.jumps === 1 && now - jumpAt > 200 && !(levelIdx === 2 && !vineDone && now - vineJumpAt < 1500 && p.x < 1850)) {
          if (!landsOn(p.lane, p) || wallAhead(p.lane, p.x, p.y)) jump('air');
        }
        if (levelIdx >= 2 && now - lastAtk > 400 && level.guards.some(g => !g.dead && g.lane === p.lane && Math.abs(g.x - p.x) < 85)) {
          press('j', true); atkUp = now + 60; lastAtk = now;
        }
        if (Math.abs(p.x - sx) > 15) { sx = p.x; st = now; }
        else if (now - st > 1500 && p.onGround) { jump('stuck'); st = now; }
      };
    });
    await shot(`l${L + 1}-start`);   // also starts the clock again
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
    if (done && L === 0) {   // ruling 32: the handover advances one line per press, so three presses skip it
      const H = await T(() => ({ ho: window.__ho || null, n: HANDOVER_LINES.length }));
      H.ho && H.ho.presses === H.n && H.ho.lines.join(',') === [...Array(H.n).keys()].join(',')
        ? pass(`handover skipped in ${H.n} presses, one line each (Enter, then J)`)
        : fail('handover skipped in three presses, one line each', JSON.stringify(H));
    }
    if (done && L > 0) await lampEnd(L);
    if (process.env.TRACE || process.env.LOGS) console.log('LOG ' + JSON.stringify(await page.evaluate(() => window.__log)));
    await page.evaluate(() => { window.__botStep = null; });
    for (const k of ['ArrowRight', ' ', 'j']) await page.keyboard.up(k).catch(() => {});
    s = await snap();
    const secs = (s.t - t0g).toFixed(1);   // game seconds
    if (done) {
      if (L < 2) {   // a port scene follows levels 1 and 2: check it, then leave by its button
        const port = await page.evaluate(() => ({ s: state, vis: !document.getElementById('portScreen').hidden, key: portKey }));
        port.s === 'port' && port.vis ? pass(`${name} followed by a port scene (${port.key})`) : fail(`${name} followed by a port scene`, JSON.stringify(port));
        if (port.s === 'port') {
          const m = await mapState();
          const want = 1;   // DESIGN §6: line 1 on finishing level 1; line 2 only on leaving the quay
          m.legs === want ? pass(`strip at the ${port.key} port: ${m.legs} line(s) filled`) : fail(`strip at the ${port.key} port`, `legs ${m.legs}, want ${want}`);
          // buy the paid hint (by its button when the purse allows, else through the hook)
          const good = L === 0 ? 'boatman' : 'pilot';
          const how = await T((good) => { const b = document.getElementById('buy_' + good);
            if (b && !b.disabled && RUN.purse >= TUNE.PRICE_LAMPS) { b.click(); return 'bought with ' + TUNE.PRICE_LAMPS + ' copper'; }
            window.__test.give(good); return 'given by hook (purse ' + RUN.purse + ')'; }, good);
          console.log(`INFO ${good} at the ${port.key}: ${how}`);
          await page.click('#portBtn'); await sleep(100); s = await snap();
        }
      }
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
