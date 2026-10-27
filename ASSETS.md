# Painted Asset Kit — Chola: Tides of Bronze

Owner: art-director. Readers: sprite-artist, builder (and Gaurav). Fourth
edition, 2026-10-25, after DECISIONS.md 17 (palette) and 19 (cut-out
animation); third edition revised against `docs/RESEARCH.md` (second draft),
`docs/VISION.md` (third draft), `docs/DECISIONS.md` 3, 6 and 7, the
creative-director's and level-designer's notes in `docs/NOTES.md`,
`docs/levels/LEVEL-1.md` to `LEVEL-3.md` section 7, `docs/DESIGN.md`
sections 4 and 6, and the design-critic's review
(`docs/reviews/assets-review-2026-10-25.md`).

The game looks for PNG files in `chola-platformer/assets/` using the exact
filenames below. Any file that is missing falls back to the built-in procedural
art, so you can add assets one at a time and the game keeps working at every step.

## Style sheet

**Palettes** (DECISIONS.md 17). Sky stops run from top to horizon.

| | Thanjavur | Nagapattinam | Kadaram |
|---|---|---|---|
| Sky | `#7A5F34` `#C2954A` `#E3BC6A` `#F2D894` | `#2F5E6E` `#5E8F94` `#A9C4B4` `#E6D9A8` | `#2E3A52` `#4F6A6A` `#86A08A` `#C9D3B0` |
| Far | `#B08A52` | `#7FA3A0` | `#6F8C7C` |
| Mid | `#7A5530` | `#3E6A6C` | `#355A45` |
| Near | `#4A3220` | `#21393C` | `#1C3326` |
| Shadow | `#2A1A10` | `#13222A` | `#101C1A` |
| Light | `#F6E2A8` | `#F1E3B4` | `#E4EAC8` |
| Accent | plantain green `#6E8B3D` | turmeric `#DDB02F` | indigo `#4B5E9A` |

Shared: crimson `#B5342A`, ink `#2B2520`, skin bronze `#A86A3C`, gold `#C9A24A`.

**Rules of the look.**

1. Each place has its own natural color, and one red runs through all three.
2. Depth by value: far is light and soft, mid is finished, near is dark and simple. Haze touches only the far plane, lightly.
3. The brush shows: dry-brush, blooms, bleeding edges, matte gouache. No photo-realism, no 3D render.

**Crimson rule.** "Crimson means Chola; nothing else gets it" (VISION.md pillar 1, kept by DECISIONS.md 17). Crimson is the only red: no other red, red-orange, rust, terracotta, or pink in any level. Brick is painted umber-ochre.

**Contrast rule.** On a 0 to 100 value scale, darkest shadow 10 to 15, brightest light 88 to 92, near lane under 30, far plane 60 to 80. A result that reads as one mid-grey in grayscale is regenerated.

**Characters face right.** The engine flips them.

## Color grade for the builder

`index.html` draws the sky, haze, mist, and procedural art in code. These values map onto the three level objects (`sky:` arrays at about lines 406, 453, 501) and `render()`. Replace field for field; fields marked *new* replace a hardcoded value.

| Field | Level 1 Thanjavur | Level 2 Nagapattinam | Level 3 Kadaram |
|---|---|---|---|
| `sky` (stops 0, .42, .72, 1) | `'#7A5F34','#C2954A','#E3BC6A','#F2D894'` | `'#2F5E6E','#5E8F94','#A9C4B4','#E6D9A8'` | `'#2E3A52','#4F6A6A','#86A08A','#C9D3B0'` |
| `sun.c` | `#FFF0C4` | `#FFF3D0` | `#F2F6DA` |
| `fogHaze` (was alpha .34 / .32 / .36) | `rgba(236,206,140,0.16)` | `rgba(190,214,206,0.14)` | `rgba(184,204,178,0.20)` |
| *new* `mist` color for `drawMist`, with the two call alphas (was `236,226,198` at .10 / .07) | `240,220,170` at .05 / .03 | `214,230,224` at .05 / .03 | `210,224,204` at .12 / .07 |
| `pal = mkPal(top, face, side)` | `'#D2A85E','#9C6E3C','#5A3A1E'` | `'#C8B48A','#7C6E55','#3E3A33'` | `'#9DAA7C','#5E6B4A','#2E3A2C'` |
| *new* `pal.ink`, the shadow tint (was `rgba(46,32,22,0.55)`) | `rgba(42,26,14,0.60)` | `rgba(18,34,42,0.55)` | `rgba(16,28,30,0.60)` |
| `palFront` / `palBack` `dimPal` amounts (was -22 / +10) | -40 / +16 | -40 / +16 | -40 / +16 |
| `grade`, the light tint (was alpha .05) | `rgba(160,110,30,0.07)` | `rgba(40,110,120,0.07)` | `rgba(40,60,110,0.07)` |
| *new* `vig`, vignette edge (was `rgba(30,20,10,0.45)`) | `rgba(34,20,8,0.50)` | `rgba(10,26,34,0.48)` | `rgba(10,20,28,0.52)` |
| *new* `rays`, `drawRays` color (was `255,240,200` at .14) | `rgba(255,228,160,0.20)` | `rgba(255,240,205,0.15)` | `rgba(226,240,210,0.10)` |
| `motes` | `#F6E2A8` | `#E8F0E6` | `#DDE8B0` |
| *new* `farCol`, `drawFarLayer` silhouettes | `rgba(122,90,48,0.45)` | `rgba(80,118,118,0.42)` | `rgba(60,96,80,0.45)` |
| *new* `midCol`, `drawMidLayer` silhouettes | `rgba(58,36,18,0.70)` | `rgba(28,52,56,0.68)` | `rgba(24,44,32,0.70)` |
| `banners` (wall streamers) | `false` | `false` | `false` |

Haze is roughly halved; depth now comes from the wider `palFront` / `palBack` spread and the darker near lane. Textures (slots 4, 5, 23) are drawn under the `pal` tint, so one file serves every level.

**Other reds in the code that break the crimson rule** (builder task): `AWNINGS` (line 1034) holds red-brown `#8A4A3A` and plum `#6E4664`; use `'#E6D9A8','#3F5A80','#DDB02F','#7FA3A0'` (undyed, indigo, turmeric, sea-grey). Stall goods `#9A4A34` (line 1160) become `#7C6E55`. Pennant and flag `#A8402F` (lines 1098, 1244) and guard cloth `#8C2F22` (lines 1462, 1541) become `#B5342A`. Wall banners `rgba(150,44,34,…)` go with `banners:false`. The gate arrow (line 1221) uses `181,52,42` and is off in level 3 (DECISIONS.md 7). Bursts at lines 705 and 751 and the hurt flash `rgba(140,30,20,…)` become black ink (DESIGN.md section 4, violence rule).

## Workflow

1. Copy any block below into the image generator, whole (the sprite-artist
   uses Canva, DECISIONS.md 6). Each block is self-contained: style,
   dimensions, PNG requirements, and filename are all inside it.
2. Download the result, rename it to the filename stated at the end of the
   block (convert to `.png` if the download is `.webp`), and drop it in
   `assets/`.
3. Open `chola-platformer/index.html` in a browser to see it in the game.
4. Characters: each is one rig sheet (slots 37 to 39), generated once;
   the hero is cut from the existing `hero_idle.png`. See Cut-out rigs
   (DECISIONS.md 19). Per-pose slots are superseded.
5. Transparency: the first hero set came back on an opaque dark vignette
   despite the prompt. Check every character PNG for a transparent
   background and remove the background in an editor if the generator
   ignored the request.

The claude.ai artifact build cannot load these files and keeps the procedural
look; the painted version shows when the game runs from the repo, locally or on
GitHub Pages.

---

## 1 · `l1_far.png` — Thanjavur backdrop

```
Generate this image: a wide painted background for a 2.5D side-scrolling video game. Dawn over Thanjavur, capital of the Chola kingdom, 1010 CE. The Brihadisvara temple dominates the middle distance: a steep pyramidal granite vimana of thirteen diminishing storeys rising to an octagonal cupola and a single square capstone with a small gilded finial, standing inside a long walled rectangular courtyard with a low pillared cloister along the wall. On the east side of the courtyard, two low gateway towers stand in line, each a plain rectangular block with a barrel-vaulted roof, both well under half the vimana's height. The vimana is the only tall structure in the picture; no other towers, no fort wall, no moat. The architecture is rendered as layered watercolor silhouettes that fade into a light morning haze: the nearest stone deep umber, the farthest softened against a bright gold sky. A pale, hazy sun disc in the upper right with soft god-rays. A line of palm crowns and low flat city rooftops runs along the bottom edge. One tiny crimson flag on a tall flagstaff inside the courtyard is the only saturated accent; no banners or streamers hang on any wall.

Composition rules: horizon line in the lower third of the frame; the bottom 25% of the image stays simple, dark, and low-contrast so game platforms drawn in front of it stay readable; no object of interest at the exact left or right edge, and both edges must close in similar tone and value so the image can repeat sideways.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Thanjavur palette, warm gold with deep umber shadows: sky from deep amber #7A5F34 at the top through #C2954A and #E3BC6A to a bright gold horizon #F2D894; far stone in hazy gold #B08A52; middle distance in burnt umber #7A5530; near silhouettes in deep umber #4A3220; darkest shadow #2A1A10; brightest light #F6E2A8; a small accent of plantain-leaf green #6E8B3D in the palm crowns. Strong value contrast: the darkest shadows are truly dark and the brightest light truly bright; haze is light and only on the farthest plane. Crimson #B5342A appears only on the one flag and is the only red in the picture: no other red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes and watercolor blooms, matte gouache finish, painterly soft edges, cinematic side-lighting. The mood of a stealth-action side-scroller set in medieval South India. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a landscape image, 1536×1024 pixels, as a PNG file. I will save this file as: l1_far.png
```

## 2 · `l2_far.png` — Nagapattinam harbor backdrop

```
Generate this image: a wide painted background for a 2.5D side-scrolling video game. Late golden afternoon over Nagapattinam, the main eastern port of the Chola kingdom, circa 1020 CE. A calm sea horizon in the lower third of the frame on a flat sandy coast with no cliffs or hills. The water is crowded with anchored medieval Indian Ocean merchant ships: broad, beamy wooden hulls with high curved prows and no stern castles, the planks visibly stitched edge to edge with cord, one or two masts each carrying a square or canted rectangular sail of woven matting, furled or half-furled, with rigging lines. No triangular lateen sails. Small catamarans and dugout canoes move between the ships. The ships are painted as layered grey-teal and deep blue-green silhouettes receding into a light blue-green sea haze. Behind the quay on the right, a tall square plastered brick tower with a tiered top, a Buddhist monastery tower, stands among thatched sheds and palms. Along the bottom edge, hints of a busy quay: piling posts, coiled rope, stacked cloth bales and rice baskets, all in deep shadow. A low hazy sun on the left throws a broken golden path across the water; gulls appear as tiny ink flecks. One crimson pennant on the nearest mast is the only saturated accent.

Composition rules: horizon in the lower third; the bottom 25% of the image stays simple, dark, and low-contrast so game platforms drawn in front of it stay readable; no object of interest at the exact left or right edge, and both edges must close in similar tone and value so the image can repeat sideways.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Nagapattinam palette, blue-green sea and sky: sky from deep sea-teal #2F5E6E at the top through #5E8F94 and #A9C4B4 to a warm golden horizon band #E6D9A8 around the low sun; sea in blue-green #3E6A6C darkening to #21393C near the quay; far ships in soft grey-teal #7FA3A0; quay silhouettes in deep blue-black #21393C; darkest shadow #13222A; brightest light #F1E3B4 on the sun path; a small accent of turmeric yellow #DDB02F on a few cargo bales. Strong value contrast: the darkest shadows are truly dark and the brightest light truly bright; haze is light and only on the farthest plane. Crimson #B5342A appears only on the one pennant and is the only red in the picture: no other red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes and watercolor blooms, matte gouache finish, painterly soft edges, cinematic side-lighting. The mood of a stealth-action side-scroller set on the medieval South Indian coast. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a landscape image, 1536×1024 pixels, as a PNG file. I will save this file as: l2_far.png
```

## 3 · `l3_far.png` — Kedah shore backdrop

```
Generate this image: a wide painted background for a 2.5D side-scrolling video game. Monsoon morning on the coast of Kedah in the kingdom of Srivijaya, Malay peninsula, 1025 CE. A flat mangrove river plain under low cloud: a wide calm estuary in the lower third of the frame with mist lying over the water, mangrove trees on arched roots along both banks, and thatched wooden houses on stilts standing over the river edge, some with small boats tied beneath. On the near bank, low square brick shrines on stepped plinths, and one tall tiered brick tower plastered white, half veiled in mist. Far behind everything, a single forested mountain rises in blue-green wash, its summit lost in cloud. Light rain falls in thin diagonal strokes on the left. A pale white-green sun glows in the upper right behind thin cloud. Nipa palm fronds and mangrove branches frame the very bottom edge in deep shadow. No steep jungle ridges, no stupas, no bell-shaped domes, no Borobudur. Nothing in the picture is red except one tiny crimson pennant on the mast of a single foreign ship anchored far out at the river mouth; that pennant is the only saturated accent.

Composition rules: horizon in the lower third; the bottom 25% of the image stays simple, dark, and low-contrast so game platforms drawn in front of it stay readable; no object of interest at the exact left or right edge, and both edges must close in similar tone and value so the image can repeat sideways.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Kadaram palette, jungle greens and indigo: sky from deep indigo #2E3A52 at the top through #4F6A6A and #86A08A to a pale misty horizon #C9D3B0; far mountain in blue-green #6F8C7C; mangroves, shrines, and stilt houses in jungle green #355A45; near silhouettes in deep green #1C3326; darkest shadow #101C1A, a green-black; brightest light #E4EAC8 on the water; a small accent of indigo #4B5E9A in the sky reflected on the river. Brick is weathered umber-ochre with moss, never red. The mist lies over the water but the shrines and houses stay readable. Strong value contrast: the darkest shadows are truly dark and the brightest light truly bright; haze is light and only on the farthest plane. Crimson #B5342A appears only on the one far pennant and is the only red in the picture: no other red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes and watercolor blooms, matte gouache finish, painterly soft edges, cinematic side-lighting. The mood of an action side-scroller set in medieval maritime Southeast Asia. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a landscape image, 1536×1024 pixels, as a PNG file. I will save this file as: l3_far.png
```

## 4 · `tex_stone.png` — granite block texture

```
Generate this image: a perfectly seamless, tileable texture of newly dressed granite temple masonry, hand-painted. Courses of large rectangular blocks in warm grey-brown stone, staggered joints, fine chisel marks and a few small chips, thin watercolor staining and faint moss shadow in the mortar lines. No paint or lacquer traces on the stone; no red anywhere in this texture. Even, directionless lighting: no cast shadows from any single direction, no vignette, no darkening at the edges. All four edges must tile seamlessly with themselves. Flat frontal view, no perspective.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Thanjavur palette with strong contrast: granite in light #C9A46A, mid stone #8A6A44, deepest mortar shadow #2A1A10, a faint plantain-green #6E8B3D moss in a few joints. No red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes and watercolor blooms, matte gouache finish, painterly soft edges. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a square image, 1024×1024 pixels, as a PNG file, seamlessly tileable on all four edges. I will save this file as: tex_stone.png
```

## 5 · `tex_wood.png` — sewn-plank deck texture

```
Generate this image: a perfectly seamless, tileable texture of weathered teak ship planking from a medieval Indian Ocean sewn-plank hull, hand-painted. Horizontal planks of warm brown wood with visible grain painted in dry-brush strokes. Along every plank edge runs a zigzag seam of dark coir cord stitched through small drilled holes, and a few round wooden dowel ends show in the plank faces. No iron nails, no nail heads, no metal fittings of any kind. Salt staining, small gaps of deep shadow between planks, and a rope-worn patch or two. No red anywhere in this texture. Even, directionless lighting: no cast shadows from any single direction, no vignette, no darkening at the edges. All four edges must tile seamlessly with themselves. Flat frontal view, no perspective.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Teak palette with strong contrast: wood in light #B48A58, mid wood #8A6743, deep shadow gaps #241810, coir seams near-black #1E1610. No red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes and watercolor blooms, matte gouache finish, painterly soft edges. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a square image, 1024×1024 pixels, as a PNG file, seamlessly tileable on all four edges. I will save this file as: tex_wood.png
```

---

### Consistency note: the hero (slots 6 to 10)

**Superseded** by Cut-out rigs (DECISIONS.md 19); kept for reference.

Generate slot 6 (`hero_idle.png`) first and approve it before the rest.
Pass the approved idle image as a reference when generating slots 7 to 10
so the face, sash, and sword match. All five use one sword form, the
straight double-edged blade, so the poses agree; a forward-curved blade
widening toward the tip is also period (RESEARCH.md section 5) but do not
mix the two across poses. Check each result for: straight blade, bare
feet, no sandal straps, transparent background. The first kit's five hero
PNGs failed on all three and are superseded (DECISIONS.md 6).

Silhouette: topknot, bare chest, two long sash tails, sword at the hip,
nothing in the hands. The guard carries a tall spear and a round shield;
the Srivijayan carries a short sword low and nothing on his back.

## 6 · `hero_idle.png` — the hero, standing (generate this one first)

**Superseded** (DECISIONS.md 19): the hero is rigged from the existing `hero_idle.png`; see Cut-out rigs. Do not generate. The character paragraph is the target for the single-image edit.

```
Generate this image: a full-body 2D video-game character on a fully transparent background.

The character: Ilamaran, a young Tamil soldier of the Chola fleet, athletic build, warm bronze-brown skin, modeled on Chola bronze sculpture and temple relief carvings. He is bare-chested in the classical South Indian style, with a gold-trimmed leather cross-belt over the chest. He wears a white cotton veshti pleated from waist to knee and tucked up in the warrior's kachcham style, bound by a wide crimson cotton waist-sash, plain woven cotton with a narrow gold-thread border, whose two long tails trail behind him. His long hair is tied in a high warrior's topknot (kudumi) bound with a thin gold band. Gold hoop earrings, gold armlets on both upper arms, a bronze bangle at each wrist. His feet are bare: no sandals, no straps, no footwear of any kind. At his left hip hangs a straight, broad, double-edged sword in a plain wooden scabbard: the blade about the length of his arm, parallel-edged with a spear-point tip, a short bronze grip and a flat round disc pommel, as on Chola bronzes of Durga and Bhairava. IMPORTANT: the blade is straight, never a curved talwar, scimitar, or katana. No hood, no cloak, no armor, no European assassin styling: his head, chest, arms, and feet are bare.

The pose: standing alert in relaxed profile, FACING RIGHT, knees slightly bent, hands loose and ready. Full body visible from head to feet with roughly 5% empty margin all around; feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette with the crimson sash as the strongest accent (#B5342A). Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: hero_idle.png
```

## 7 · `hero_run_a.png` — the hero, run stride A

**Superseded** (DECISIONS.md 19): the hero is rigged from the existing `hero_idle.png`; see Cut-out rigs. Do not generate. The character paragraph is the target for the single-image edit.

```
Generate this image: a full-body 2D video-game character on a fully transparent background.

The character: Ilamaran, a young Tamil soldier of the Chola fleet, athletic build, warm bronze-brown skin, modeled on Chola bronze sculpture and temple relief carvings. He is bare-chested in the classical South Indian style, with a gold-trimmed leather cross-belt over the chest. He wears a white cotton veshti pleated from waist to knee and tucked up in the warrior's kachcham style, bound by a wide crimson cotton waist-sash, plain woven cotton with a narrow gold-thread border, whose two long tails trail behind him. His long hair is tied in a high warrior's topknot (kudumi) bound with a thin gold band. Gold hoop earrings, gold armlets on both upper arms, a bronze bangle at each wrist. His feet are bare: no sandals, no straps, no footwear of any kind. At his left hip hangs a straight, broad, double-edged sword in a plain wooden scabbard: the blade about the length of his arm, parallel-edged with a spear-point tip, a short bronze grip and a flat round disc pommel, as on Chola bronzes of Durga and Bhairava. IMPORTANT: the blade is straight, never a curved talwar, scimitar, or katana. No hood, no cloak, no armor, no European assassin styling: his head, chest, arms, and feet are bare.

The pose: a full sprint in profile, FACING RIGHT: right leg extended far forward, left leg trailing bent behind, torso leaning into the run, both crimson sash tails streaming horizontally behind him, veshti pleats pressed back by the motion, arms pumping, the scabbarded sword swinging at his hip. Full body visible with roughly 5% empty margin; bare feet near the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette with the crimson sash as the strongest accent (#B5342A). Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: hero_run_a.png
```

## 8 · `hero_run_b.png` — the hero, run stride B

**Superseded** (DECISIONS.md 19): the hero is rigged from the existing `hero_idle.png`; see Cut-out rigs. Do not generate. The character paragraph is the target for the single-image edit.

```
Generate this image: a full-body 2D video-game character on a fully transparent background.

The character: Ilamaran, a young Tamil soldier of the Chola fleet, athletic build, warm bronze-brown skin, modeled on Chola bronze sculpture and temple relief carvings. He is bare-chested in the classical South Indian style, with a gold-trimmed leather cross-belt over the chest. He wears a white cotton veshti pleated from waist to knee and tucked up in the warrior's kachcham style, bound by a wide crimson cotton waist-sash, plain woven cotton with a narrow gold-thread border, whose two long tails trail behind him. His long hair is tied in a high warrior's topknot (kudumi) bound with a thin gold band. Gold hoop earrings, gold armlets on both upper arms, a bronze bangle at each wrist. His feet are bare: no sandals, no straps, no footwear of any kind. At his left hip hangs a straight, broad, double-edged sword in a plain wooden scabbard: the blade about the length of his arm, parallel-edged with a spear-point tip, a short bronze grip and a flat round disc pommel, as on Chola bronzes of Durga and Bhairava. IMPORTANT: the blade is straight, never a curved talwar, scimitar, or katana. No hood, no cloak, no armor, no European assassin styling: his head, chest, arms, and feet are bare.

The pose: the opposite moment of a sprint stride in profile, FACING RIGHT: left leg planted under the body taking his weight, right leg folded and swinging through, arms in the opposite pumping position, sash tails swinging lower behind him, the scabbarded sword at his hip. Full body visible with roughly 5% empty margin; bare feet near the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette with the crimson sash as the strongest accent (#B5342A). Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: hero_run_b.png
```

## 9 · `hero_jump.png` — the hero, airborne

**Superseded** (DECISIONS.md 19): the hero is rigged from the existing `hero_idle.png`; see Cut-out rigs. Do not generate. The character paragraph is the target for the single-image edit.

```
Generate this image: a full-body 2D video-game character on a fully transparent background.

The character: Ilamaran, a young Tamil soldier of the Chola fleet, athletic build, warm bronze-brown skin, modeled on Chola bronze sculpture and temple relief carvings. He is bare-chested in the classical South Indian style, with a gold-trimmed leather cross-belt over the chest. He wears a white cotton veshti pleated from waist to knee and tucked up in the warrior's kachcham style, bound by a wide crimson cotton waist-sash, plain woven cotton with a narrow gold-thread border, whose two long tails trail behind him. His long hair is tied in a high warrior's topknot (kudumi) bound with a thin gold band. Gold hoop earrings, gold armlets on both upper arms, a bronze bangle at each wrist. His feet are bare: no sandals, no straps, no footwear of any kind. At his left hip hangs a straight, broad, double-edged sword in a plain wooden scabbard: the blade about the length of his arm, parallel-edged with a spear-point tip, a short bronze grip and a flat round disc pommel, as on Chola bronzes of Durga and Bhairava. IMPORTANT: the blade is straight, never a curved talwar, scimitar, or katana. No hood, no cloak, no armor, no European assassin styling: his head, chest, arms, and feet are bare.

The pose: airborne mid-leap in profile, FACING RIGHT: knees tucked, bare feet drawn up, body arched slightly forward, arms spread for balance, the veshti pleats and both crimson sash tails billowing upward behind him, the scabbarded sword lifting at his hip. Centered in the frame with clear empty space below the feet.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette with the crimson sash as the strongest accent (#B5342A). Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: hero_jump.png
```

## 10 · `hero_attack.png` — the hero, sword cut

**Superseded** (DECISIONS.md 19): the hero is rigged from the existing `hero_idle.png`; see Cut-out rigs. Do not generate. The character paragraph is the target for the single-image edit.

```
Generate this image: a full-body 2D video-game character on a fully transparent background.

The character: Ilamaran, a young Tamil soldier of the Chola fleet, athletic build, warm bronze-brown skin, modeled on Chola bronze sculpture and temple relief carvings. He is bare-chested in the classical South Indian style, with a gold-trimmed leather cross-belt over the chest. He wears a white cotton veshti pleated from waist to knee and tucked up in the warrior's kachcham style, bound by a wide crimson cotton waist-sash, plain woven cotton with a narrow gold-thread border, whose two long tails trail behind him. His long hair is tied in a high warrior's topknot (kudumi) bound with a thin gold band. Gold hoop earrings, gold armlets on both upper arms, a bronze bangle at each wrist. His feet are bare: no sandals, no straps, no footwear of any kind. His sword is drawn and in his right hand: a straight, broad, double-edged blade about the length of his arm, parallel-edged with a spear-point tip, a short bronze grip and a flat round disc pommel, as on Chola bronzes of Durga and Bhairava; the empty plain wooden scabbard hangs at his left hip. IMPORTANT: the blade is straight, never a curved talwar, scimitar, or katana. No hood, no cloak, no armor, no European assassin styling: his head, chest, arms, and feet are bare.

The pose: mid sword-cut in profile, FACING RIGHT: the straight blade sweeping forward at shoulder height in his right hand, a faint pale arc of motion behind the blade, weight on the front foot, veshti and sash swinging with the strike. Full body visible with roughly 5% empty margin; bare feet near the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette with the crimson sash as the strongest accent (#B5342A). Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: hero_attack.png
```

---

### Consistency note: the Chola guard (slots 11 and 12)

**Superseded** by Cut-out rigs (DECISIONS.md 19); kept for reference.

Generate slot 11 (`guard_walk_a.png`) first and pass it as a reference for
slot 12. He appears only in levels 1 and 2 as an obstacle to avoid
(DECISIONS.md 3), so he is read at a glance from a distance: the tall
upright spear and the round shield on his back are his silhouette. The
quilted jacket gives him a heavier outline than the bare-chested hero
without putting metal on him. Check: no plates, no helmet, bare feet,
crimson only on the head cloth and waist cloth, transparent background.

## 11 · `guard_walk_a.png` — Chola gate guard, stride A

**Superseded** by slot 37 `rig_guard.png` (DECISIONS.md 19). Kept for reference; do not generate.

```
Generate this image: a full-body 2D video-game enemy character on a fully transparent background.

The character: a Chola gate guard of the king's bodyguard, Thanjavur, 1010 CE. Stocky and vigilant, heavier than a young man, with a thick mustache and warm brown skin, modeled on figures in Chola temple relief. He wears a sleeveless quilted cotton jacket, undyed off-white, stitched in vertical padded channels, over a short white cotton dhoti wrapped to the knee. A crimson cotton cloth is bound tight around his waist over the jacket, and a crimson cotton head cloth is wrapped as a low turban with a knot at the side. Bare feet, no footwear of any kind. A bronze bangle on one wrist, small gold ear studs. A round shield of ox-hide stretched over wicker, with a plain iron boss at its center, is slung on his back. He holds a long spear (vel) upright in his right hand: a plain wooden shaft taller than he is, tipped with a leaf-shaped iron head. IMPORTANT: no metal armor of any kind, no lamellar plates, no mail, no helmet, no plume, no sword; his arms, legs, and feet are bare.

The pose: mid-patrol stride in profile, FACING RIGHT: right leg forward taking his weight, left leg pushing off behind, spear upright, shield square on his back. Full body visible with roughly 5% empty margin; bare feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette; his crimson head cloth and waist cloth (#B5342A) are the strongest accent, and the only red on him. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: guard_walk_a.png
```

## 12 · `guard_walk_b.png` — Chola gate guard, stride B

**Superseded** by slot 37 `rig_guard.png` (DECISIONS.md 19). Kept for reference; do not generate.

```
Generate this image: a full-body 2D video-game enemy character on a fully transparent background.

The character: a Chola gate guard of the king's bodyguard, Thanjavur, 1010 CE. Stocky and vigilant, heavier than a young man, with a thick mustache and warm brown skin, modeled on figures in Chola temple relief. He wears a sleeveless quilted cotton jacket, undyed off-white, stitched in vertical padded channels, over a short white cotton dhoti wrapped to the knee. A crimson cotton cloth is bound tight around his waist over the jacket, and a crimson cotton head cloth is wrapped as a low turban with a knot at the side. Bare feet, no footwear of any kind. A bronze bangle on one wrist, small gold ear studs. A round shield of ox-hide stretched over wicker, with a plain iron boss at its center, is slung on his back. He holds a long spear (vel) upright in his right hand: a plain wooden shaft taller than he is, tipped with a leaf-shaped iron head. IMPORTANT: no metal armor of any kind, no lamellar plates, no mail, no helmet, no plume, no sword; his arms, legs, and feet are bare.

The pose: the opposite patrol stride in profile, FACING RIGHT: left leg forward and planted, right leg trailing behind, spear still upright, the hide shield on his back catching a touch of rim light. Full body visible with roughly 5% empty margin; bare feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette; his crimson head cloth and waist cloth (#B5342A) are the strongest accent, and the only red on him. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: guard_walk_b.png
```

---

## 13 · `gate.png` — the lamplit crossing gate

```
Generate this image: a free-standing stone gateway on a fully transparent background, straight-on front view, for use as a 2D video-game prop.

The structure: a plain South Indian doorway of two weathered granite pillars, square in section with a simple lotus band carved near the top of each, carrying a single straight granite lintel laid flat across them. No curve to the lintel, no upswept ends, no arch. A narrow crimson cotton pennant hangs from the center of the lintel, swaying slightly. At the base of each pillar stands a small bronze standing lamp, a slim stem on a round foot with one burning wick, casting a warm glow on the stone around it. No niches in the pillars, no paint or lacquer on the stone. The whole structure fills the frame height with small margins, and the pillar bases end cleanly at the bottom edge. Nothing behind the structure.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette: warm beige #D9C69A, umber #6B4E33, olive-grey shadows, with the crimson pennant (#B5342A) as the strongest accent. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: gate.png
```

## 14 · `l1_mid.png` — Thanjavur mid-parallax band (advanced, attempt last)

```
Generate this image: a sparse horizontal band of palm trunks and palm crowns occupying ONLY the bottom half of the frame, painted as dark umber silhouettes with soft watercolor edges, for use as a parallax layer in a 2D video game. Nothing at all in the top half of the image; it must stay fully transparent. Left and right edges similar in density so the band can repeat sideways.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Thanjavur palette: deep umber #4A3220 silhouettes with a thin warm gold rim light #E3BC6A along one edge, darkest #2A1A10. No red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes, matte gouache finish. No text, no watermark, no signature, no border.

Output: a landscape image, 1536×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: l1_mid.png
```

## 15 · `l2_mid.png` — Nagapattinam mid-parallax band (advanced)

```
Generate this image: a sparse horizontal band of wooden dock pilings with coiled rope and hanging fishing nets occupying ONLY the bottom half of the frame, painted as dark blue-green silhouettes with soft watercolor edges, for use as a parallax layer in a 2D video game. Nothing at all in the top half of the image; it must stay fully transparent. Left and right edges similar in density so the band can repeat sideways.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Nagapattinam palette: deep blue-black #21393C silhouettes with a thin pale sea-green rim light #A9C4B4 along one edge, darkest #13222A. No red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes, matte gouache finish. No text, no watermark, no signature, no border.

Output: a landscape image, 1536×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: l2_mid.png
```

## 16 · `l3_mid.png` — Kedah mid-parallax band (advanced)

```
Generate this image: a sparse horizontal band of mangrove trees standing on arched prop roots, nipa palm fronds, and the posts of a stilt walkway over water, occupying ONLY the bottom half of the frame, painted as dark jungle-green silhouettes with soft watercolor edges, for use as a parallax layer in a 2D video game. Nothing at all in the top half of the image; it must stay fully transparent. Left and right edges similar in density so the band can repeat sideways.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Kadaram palette: deep green #1C3326 silhouettes with a thin pale green rim light #86A08A along one edge, darkest #101C1A. No red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes, matte gouache finish. No text, no watermark, no signature, no border.

Output: a landscape image, 1536×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: l3_mid.png
```

---

### Consistency note: the Srivijayan fighter (slots 17 and 18)

**Superseded** by Cut-out rigs (DECISIONS.md 19); kept for reference.

Generate slot 17 (`srivijayan_walk_a.png`) first and pass it as a reference
for slot 18. He is the only enemy in level 3 and the first person the hero
ever draws a sword on (DECISIONS.md 3), so he gets the same care as the
hero: a face of his own, ornament, and a weapon a kingdom's soldier would
carry. His color is indigo (#4B5E9A), a real Southeast Asian dye and the
one cool note in a warm kit, which is how the eye tells him from the Chola
figures before it reads any detail. Silhouette: head cloth knotted flat,
bare chest, short sword held low, a loose cloth end swinging at the front,
nothing on his back. Check every result for red: there must be none on him,
not on cord, border, or jewelry.

## 17 · `srivijayan_walk_a.png` — Srivijayan fighter, stride A

**Superseded** by slot 39 `rig_srivijayan.png` (DECISIONS.md 19). Kept for reference; do not generate.

```
Generate this image: a full-body 2D video-game enemy character on a fully transparent background.

The character: a Malay fighter of Kadaram in the kingdom of Srivijaya, 1025 CE, lean and quick, a soldier of a kingdom with temples and a fleet. He has a watchful, individual face, warm brown skin, and long black hair tied up under a head cloth of ochre-yellow cotton knotted flat at the side of the head. He is bare-chested. He wears a wrapped waist cloth in deep indigo blue, woven with a fine ochre check and a narrow ochre border, wrapped to the knee with one loose end hanging at the front. Bare feet, no footwear of any kind. A plain bronze bangle at each wrist, small gold ear studs, a thin gold band on one upper arm. He carries a short straight sword, blade about the length of his forearm with a plain wooden grip, held low in his right hand with the point toward the ground; no scabbard visible, no shield. IMPORTANT: absolutely no red or crimson anywhere on him, not on cloth, cord, border, or jewelry. No kris or wavy blade, no feathers, no mask, no tusks, no tattoos, no bone ornament, no "savage" styling of any kind.

The pose: a wary advancing stride in profile, FACING RIGHT: right leg forward taking his weight, left leg behind, knees bent low, torso turned slightly toward the viewer, sword held low and ready in the right hand, left hand open at his side, the loose cloth end swinging forward. Full body visible with roughly 5% empty margin; bare feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette: warm bronze skin, umber shadows, ochre head cloth; his indigo waist cloth (#4B5E9A) is the strongest accent, and there is no red on him. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: srivijayan_walk_a.png
```

## 18 · `srivijayan_walk_b.png` — Srivijayan fighter, stride B

**Superseded** by slot 39 `rig_srivijayan.png` (DECISIONS.md 19). Kept for reference; do not generate.

```
Generate this image: a full-body 2D video-game enemy character on a fully transparent background.

The character: a Malay fighter of Kadaram in the kingdom of Srivijaya, 1025 CE, lean and quick, a soldier of a kingdom with temples and a fleet. He has a watchful, individual face, warm brown skin, and long black hair tied up under a head cloth of ochre-yellow cotton knotted flat at the side of the head. He is bare-chested. He wears a wrapped waist cloth in deep indigo blue, woven with a fine ochre check and a narrow ochre border, wrapped to the knee with one loose end hanging at the front. Bare feet, no footwear of any kind. A plain bronze bangle at each wrist, small gold ear studs, a thin gold band on one upper arm. He carries a short straight sword, blade about the length of his forearm with a plain wooden grip, held low in his right hand with the point toward the ground; no scabbard visible, no shield. IMPORTANT: absolutely no red or crimson anywhere on him, not on cloth, cord, border, or jewelry. No kris or wavy blade, no feathers, no mask, no tusks, no tattoos, no bone ornament, no "savage" styling of any kind.

The pose: the opposite moment of the wary advancing stride in profile, FACING RIGHT: left leg forward and planted, right leg trailing behind, knees still bent low, torso turned slightly toward the viewer, sword held low in the right hand with the blade angled a little forward, the loose cloth end swinging back. Full body visible with roughly 5% empty margin; bare feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette: warm bronze skin, umber shadows, ochre head cloth; his indigo waist cloth (#4B5E9A) is the strongest accent, and there is no red on him. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: srivijayan_walk_b.png
```

---

---

## Prop formats (slots 19 to 36)

The level documents (`docs/levels/LEVEL-1.md` to `LEVEL-3.md`, section 7)
request slots 19 to 34; DECISIONS.md 7 adds the level 3 gate (35) and
DESIGN.md section 6 the kasu (36). They come in four kinds, and the kind
sets the size:

| Kind | Slots | Size | Notes |
|---|---|---|---|
| Tileable texture | 23 | 1024×1024, opaque, tiles on all edges | Applied by the engine through `texPat` like slots 4 and 5. |
| Point prop | 19, 20, 21, 27, 29, 34, 35, 36 | Stated per block, transparent | Drawn at an anchor; the bottom edge of the image is the ground. |
| Character pose | 22, 30 to 33 | 1024×1536, transparent, FACING RIGHT | Same rules as slots 6 to 18. |
| Wide piece | 24, 25, 26, 28 | 1536×1024, transparent | The builder places these by hand. **Builder note required before generation:** the builder confirms, in `docs/NOTES.md`, the pixel height at which each piece is drawn and where its walkable surface must sit, or the result will not fit the platform rectangles in the level files. Each block below states where the walkable surface is as a fraction of image height so the builder can scale. |

No crimson on any prop in level 3 (slots 26 to 35), on the Srivijayan
fighter, or on the kasu. Crimson appears on props only where VISION.md
section 5 lists it: the kodi (19).

## 19 · `kodi.png` — crimson kodi banner on a staff (checkpoints)

```
Generate this image: a tall banner on a staff, on a fully transparent background, straight-on side view, for use as a 2D video-game prop.

The object: a Chola tiger flag (kodi). A slim dark wooden flagstaff, taller than a man, with a small bronze finial at the top. From near the top hangs a long narrow crimson cotton pennant, pointed at its free end, streaming to the right as if in a light wind. On the crimson field, a seated tiger painted in pale gold ink, simple and emblematic, as on a Chola copper-plate seal; no shield shape, no border, no lettering. The staff's foot ends cleanly at the bottom edge of the image, centered. Nothing else in the picture.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette: umber #6B4E33 staff, old gold tiger, with the crimson pennant (#B5342A) as the strongest accent. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 512×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: kodi.png
```

The engine dims the unlit state; generate the lit (full crimson) flag only.

## 20 · `lamp.png` — standing bronze lamp

```
Generate this image: a small standing oil lamp on a fully transparent background, straight-on side view, for use as a 2D video-game prop.

The object: a South Indian bronze standing lamp of the eleventh century: a round stepped foot, a slim turned stem about knee height, and a shallow round bowl at the top with one lit wick at its lip, the flame small and warm with a soft glow around it. The bronze is dark and dull with worn highlights, no ornament beyond simple turned rings on the stem. No niche, no wall, no crimson. The foot ends cleanly at the bottom edge of the image, centered.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Thanjavur palette with strong contrast: dark bronze #4A3220 in shadow, brass highlights #E3BC6A, flame glow #F6E2A8. No red, red-orange, or rust, not even in the flame. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 512×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: lamp.png
```

## 21 · `nandi.png` — monolithic Nandi (far plane, level 1 goal)

```
Generate this image: a large stone bull statue on a fully transparent background, side view, for use as a far-plane 2D video-game prop.

The object: a monolithic granite Nandi, the seated bull of Shiva, lying with its legs folded beneath it, head turned slightly toward the viewer, carved with a plain collar of bells and a hump, on a low plain granite plinth. New-cut stone of 1010 CE, warm grey-brown, no paint, no pavilion or canopy over it, no pillars around it, no crimson. The statue FACES LEFT, toward the sanctum behind the player. The plinth base ends cleanly at the bottom edge of the image.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Thanjavur palette softened for a far plane: hazy gold stone #B08A52 in light, burnt umber #7A5530 in shadow, slightly hazy edges, lower contrast than a near object. No red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a landscape image, 1536×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: nandi.png
```

Nandi faces left on purpose: it is a backdrop object, never flipped, and
it looks toward the sanctum. No pavilion: the Nandi hall at Thanjavur is
Nayak work (RESEARCH.md section 7, later halls).

## 22 · `guard_reach.png` — Chola gate guard, the catch

**Superseded** by slot 37 `rig_guard.png` (DECISIONS.md 19); the reach is an arm rotation. Kept for reference; do not generate.

```
Generate this image: a full-body 2D video-game enemy character on a fully transparent background.

The character: a Chola gate guard of the king's bodyguard, Thanjavur, 1010 CE. Stocky and vigilant, heavier than a young man, with a thick mustache and warm brown skin, modeled on figures in Chola temple relief. He wears a sleeveless quilted cotton jacket, undyed off-white, stitched in vertical padded channels, over a short white cotton dhoti wrapped to the knee. A crimson cotton cloth is bound tight around his waist over the jacket, and a crimson cotton head cloth is wrapped as a low turban with a knot at the side. Bare feet, no footwear of any kind. A bronze bangle on one wrist, small gold ear studs. A round shield of ox-hide stretched over wicker, with a plain iron boss at its center, is slung on his back. He holds a long spear (vel) upright in his right hand: a plain wooden shaft taller than he is, tipped with a leaf-shaped iron head. IMPORTANT: no metal armor of any kind, no lamellar plates, no mail, no helmet, no plume, no sword; his arms, legs, and feet are bare.

The pose: the catch, in profile, FACING RIGHT: both arms reaching forward at shoulder height with open hands, the spear tucked under the right arm with its shaft angled back, weight on the front foot, torso leaning forward, mouth open in a shout. Full body visible with roughly 5% empty margin; bare feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette; his crimson head cloth and waist cloth (#B5342A) are the strongest accent, and the only red on him. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: guard_reach.png
```

Pass slot 11 as the reference image. The engine flips him, so the catch
lands from either side.

## 23 · `bales.png` — stacked bales and baskets texture (the `stall` skin)

```
Generate this image: a perfectly seamless, tileable texture of port cargo stacked into a wall, hand-painted, flat frontal view. Rows of cloth bales wrapped in undyed cotton and bound with coir cord, woven rice baskets with lids, rounded clay jars, and a few pepper sacks, packed tight with small shadow gaps between them. Undyed cloth, cane, and clay only; no green, no striped awnings, no red anywhere. Even, directionless lighting: no cast shadows from any single direction, no vignette, no darkening at the edges. All four edges must tile seamlessly with themselves. No perspective.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Nagapattinam palette with strong contrast: undyed cloth #E6D9A8 in light, cane and coir #B59A62, clay #9C8A66, deep blue-black #13222A in the gaps. No red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes and watercolor blooms, matte gouache finish, painterly soft edges. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a square image, 1024×1024 pixels, as a PNG file, seamlessly tileable on all four edges. I will save this file as: bales.png
```

The engine's painted `stall` awnings (green and striped) go when this
loads; VISION.md pillar 1 rejects them.

## 24 · `dugout.png` — dugout canoe platform (wide piece)

```
Generate this image: a moored dugout canoe on a fully transparent background, straight-on side view, for use as a 2D video-game platform.

The object: a long narrow dugout canoe hollowed from a single log, dark weathered wood, the gunwale running straight and level across the full width of the image at about 40% of the image height from the top, the hull curving down beneath it to a rounded bottom, a short upswept prow at the right end, a coil of coir rope and a wooden paddle laid inside. Still water is not shown; the hull ends cleanly with empty space below. No sail, no outrigger, no red anywhere.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Nagapattinam palette with strong contrast: dark wood #4A3A2A, lit wood #B48A58 along the gunwale, blue-black shadow #13222A, a touch of sea-teal #5E8F94 reflected under the hull. No red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a landscape image, 1536×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: dugout.png
```

Walkable surface: the gunwale, at 40% of image height from the top.

## 25 · `hull.png` — sewn-plank hull side with sail and gangplank (wide piece)

```
Generate this image: the side of a moored medieval Indian Ocean merchant ship on a fully transparent background, straight-on side view, for use as a wide 2D video-game set piece.

The object: a broad, beamy wooden hull seen from the quay, its planks visibly stitched edge to edge with zigzag seams of dark coir cord and fastened with wooden dowels, no iron nails or fittings, a high curved prow at the right, no stern castle. The deck rail runs level across the image at about 45% of the image height from the top. One mast rises from the deck with a yard carrying a furled sail of woven matting; a few rigging lines. A plank gangplank slopes from the deck rail down to the left toward the quay, its lower end at the bottom edge of the image. A single crimson pennant at the masthead is the only red in the picture. Water is not shown; the hull ends cleanly with empty space beneath.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Nagapattinam palette with strong contrast: dark wood #4A3A2A, lit wood #B48A58, undyed matting #E6D9A8, blue-black shadow #13222A, a touch of sea-teal #5E8F94 reflected under the hull. Crimson #B5342A appears only on the masthead pennant and is the only red in the picture: no other red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a landscape image, 1536×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: hull.png
```

Walkable surfaces: the deck rail at 45% of image height, and the
gangplank. Used for ship 1 and the closing ship in level 2.

## 26 · `stilt_walk.png` — stilt walkway and porch (wide piece)

```
Generate this image: a wooden walkway on stilts with the porch of a stilt house, on a fully transparent background, straight-on side view, for use as a wide 2D video-game set piece in a Malay river village of 1025 CE.

The object: a plank walkway of split timber lashed with rattan cord, running level across the full width of the image at about 55% of the image height from the top, carried on slim timber stilts that run down to the bottom edge. At the right third, the walkway meets the raised porch of a small house on taller stilts: a plank floor, a low railing, and a steep thatched roof of nipa palm, the house wall of woven bamboo matting. A clay water jar and a fish trap stand on the porch. Everything is unpainted wood, thatch, and cane; no crimson, no red anywhere. Water is not shown; the stilts end cleanly at the bottom edge.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Kadaram palette with strong contrast: weathered timber #6B5A3E, thatch #C9C08A in light, jungle-green #355A45 moss and shadow, green-black #101C1A deepest shadow, pale light #E4EAC8. No red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a landscape image, 1536×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: stilt_walk.png
```

Walkable surfaces: the walkway at 55% of image height and the porch floor
above it.

## 27 · `candi.png` — brick candi on a stepped plinth

```
Generate this image: a small brick shrine on a fully transparent background, straight-on front view, for use as a 2D video-game prop in Kedah, Malay peninsula, 1025 CE.

The object: a small square Buddhist shrine (candi) of the Bujang Valley type: a stepped plinth of three low terraces in laterite and brick, a short flight of steps up the front, and on top a plain square brick cella with a single dark doorway and a low tiered roof, the brick weathered and patched with moss, the plaster mostly gone. No stupa dome, no bell shape, no tall spire, no Borobudur, no crimson, no red anywhere. The lowest step ends cleanly at the bottom edge of the image, centered.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Kadaram palette with strong contrast: weathered brick and laterite in umber-ochre #8A6A44, never red; jungle-green #355A45 moss; green-black #101C1A shadow; pale light #E4EAC8. No red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a square image, 1024×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: candi.png
```

## 28 · `palisade.png` — timber palisade with carved gateway (wide piece)

```
Generate this image: a timber fortification wall with a carved gateway, on a fully transparent background, straight-on front view, for use as a wide 2D video-game set piece: the war gate of a Malay kingdom's river port, 1025 CE.

The object: a palisade of heavy upright timber posts, sharpened at the top, lashed with rattan, running the full width of the image. At the center, a gateway: two thick carved timber posts and a carved wooden lintel with gilded relief of lotus and scroll, a pair of small bronze bells hanging beneath the lintel, the passage through it open and empty, its floor at the bottom edge of the image. The gateway stands taller than the wall. Wood, gilt, and bronze only; no crimson, no red anywhere, no stone, no stupas.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Kadaram palette with strong contrast: dark timber #4A3E2C, gilt #C9A24A on the carving, dark bronze bells, jungle-green #355A45 in shadow, green-black #101C1A deepest. No red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a landscape image, 1536×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: palisade.png
```

This is the inscription's "jeweled wicket-gate" (RESEARCH.md 3.3) and
closes all three lanes; the builder draws it across depths and confirms
the height before generation.

## 29 · `gong.png` — bronze gong on a frame

```
Generate this image: a hanging bronze gong on a fully transparent background, straight-on front view, for use as a 2D video-game prop in a Malay river port, 1025 CE.

The object: a round bronze gong with a raised central boss, hung by cord from a plain timber frame of two posts and a crossbar, with a cloth-headed wooden beater leaning against one post. The bronze is dark with a worn gold shine on the boss and rim. Wood and bronze only; no crimson, no red anywhere. The frame's feet end cleanly at the bottom edge of the image, centered.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Kadaram palette with strong contrast: dark bronze #3E3424, gold shine #C9A24A on boss and rim, timber #6B5A3E, green-black #101C1A shadow. No red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a square image, 1024×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: gong.png
```

---

### Consistency note: the Srivijayan fighter, combat poses (slots 30 to 33)

**Superseded** by Cut-out rigs (DECISIONS.md 19); kept for reference.

Pass slot 17 (`srivijayan_walk_a.png`) as the reference image for all
four. The character paragraph is slot 17's, verbatim except for where
the sword hand sits, which each pose sets. Slot 32, the
shield-bearer, adds one thing: an oblong hide shield held forward in the
left hand. That shield is the variant's silhouette change and the only
one; do not redress him, change his cloth, or add ornament. The shield is
oblong, not round, so he never reads as the Chola guard. No ink effects in
the sprites; the engine draws the telegraph flare, the hit splash, and the
wash-out. Check every result for red: none.

## 30 · `srivijayan_raise.png` — Srivijayan fighter, raise (telegraph)

**Superseded** by slot 39 `rig_srivijayan.png` (DECISIONS.md 19). Kept for reference; do not generate.

```
Generate this image: a full-body 2D video-game enemy character on a fully transparent background.

The character: a Malay fighter of Kadaram in the kingdom of Srivijaya, 1025 CE, lean and quick, a soldier of a kingdom with temples and a fleet. He has a watchful, individual face, warm brown skin, and long black hair tied up under a head cloth of ochre-yellow cotton knotted flat at the side of the head. He is bare-chested. He wears a wrapped waist cloth in deep indigo blue, woven with a fine ochre check and a narrow ochre border, wrapped to the knee with one loose end hanging at the front. Bare feet, no footwear of any kind. A plain bronze bangle at each wrist, small gold ear studs, a thin gold band on one upper arm. He carries a short straight sword, blade about the length of his forearm with a plain wooden grip, held in his right hand; no scabbard visible, no shield. IMPORTANT: absolutely no red or crimson anywhere on him, not on cloth, cord, border, or jewelry. No kris or wavy blade, no feathers, no mask, no tusks, no tattoos, no bone ornament, no "savage" styling of any kind.

The pose: the moment before a thrust, in profile, FACING RIGHT: feet planted wide, knees bent, the sword drawn back high beside his right ear with the point aimed forward, left arm extended forward for balance, torso coiled. No motion lines, no glow, no effects. Full body visible with roughly 5% empty margin; bare feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette: warm bronze skin, umber shadows, ochre head cloth; his indigo waist cloth (#4B5E9A) is the strongest accent, and there is no red on him. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: srivijayan_raise.png
```

## 31 · `srivijayan_thrust.png` — Srivijayan fighter, thrust

**Superseded** by slot 39 `rig_srivijayan.png` (DECISIONS.md 19). Kept for reference; do not generate.

```
Generate this image: a full-body 2D video-game enemy character on a fully transparent background.

The character: a Malay fighter of Kadaram in the kingdom of Srivijaya, 1025 CE, lean and quick, a soldier of a kingdom with temples and a fleet. He has a watchful, individual face, warm brown skin, and long black hair tied up under a head cloth of ochre-yellow cotton knotted flat at the side of the head. He is bare-chested. He wears a wrapped waist cloth in deep indigo blue, woven with a fine ochre check and a narrow ochre border, wrapped to the knee with one loose end hanging at the front. Bare feet, no footwear of any kind. A plain bronze bangle at each wrist, small gold ear studs, a thin gold band on one upper arm. He carries a short straight sword, blade about the length of his forearm with a plain wooden grip, held in his right hand; no scabbard visible, no shield. IMPORTANT: absolutely no red or crimson anywhere on him, not on cloth, cord, border, or jewelry. No kris or wavy blade, no feathers, no mask, no tusks, no tattoos, no bone ornament, no "savage" styling of any kind.

The pose: a full lunging thrust in profile, FACING RIGHT: right arm fully extended forward at chest height with the straight blade pointing dead ahead, front leg deep in a lunge, back leg straight, torso low and driving forward, left arm swept back, the loose cloth end streaming behind. No motion lines, no glow, no effects. Full body visible with roughly 5% empty margin; bare feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette: warm bronze skin, umber shadows, ochre head cloth; his indigo waist cloth (#4B5E9A) is the strongest accent, and there is no red on him. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: srivijayan_thrust.png
```

## 32 · `srivijayan_shield_walk.png` — Srivijayan shield-bearer, walk

**Superseded** by slot 39 `rig_srivijayan.png` (DECISIONS.md 19). Kept for reference; do not generate.

```
Generate this image: a full-body 2D video-game enemy character on a fully transparent background.

The character: a Malay fighter of Kadaram in the kingdom of Srivijaya, 1025 CE, lean and quick, a soldier of a kingdom with temples and a fleet. He has a watchful, individual face, warm brown skin, and long black hair tied up under a head cloth of ochre-yellow cotton knotted flat at the side of the head. He is bare-chested. He wears a wrapped waist cloth in deep indigo blue, woven with a fine ochre check and a narrow ochre border, wrapped to the knee with one loose end hanging at the front. Bare feet, no footwear of any kind. A plain bronze bangle at each wrist, small gold ear studs, a thin gold band on one upper arm. He carries a short straight sword, blade about the length of his forearm with a plain wooden grip, held low in his right hand; no scabbard visible. In his left hand he holds a tall oblong shield of ox-hide stretched over a wooden frame, plain and undecorated, held forward in front of his chest and covering him from shoulder to thigh. IMPORTANT: absolutely no red or crimson anywhere on him, not on cloth, cord, border, shield, or jewelry. No kris or wavy blade, no feathers, no mask, no tusks, no tattoos, no bone ornament, no "savage" styling of any kind.

The pose: a wary advancing stride in profile, FACING RIGHT: right leg forward taking his weight, left leg behind, knees bent low, the oblong shield held forward and square to the viewer's right, the sword low behind it, the loose cloth end swinging forward. Full body visible with roughly 5% empty margin; bare feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette: warm bronze skin, umber shadows, ochre head cloth, umber hide shield; his indigo waist cloth (#4B5E9A) is the strongest accent, and there is no red on him. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: srivijayan_shield_walk.png
```

The shield in this block carries into slot 39, drawn as a separate part.

## 33 · `srivijayan_kneel.png` — Srivijayan fighter, kneel (before the wash-out)

**Superseded** by slot 39 `rig_srivijayan.png` (DECISIONS.md 19). Kept for reference; do not generate.

```
Generate this image: a full-body 2D video-game enemy character on a fully transparent background.

The character: a Malay fighter of Kadaram in the kingdom of Srivijaya, 1025 CE, lean and quick, a soldier of a kingdom with temples and a fleet. He has a watchful, individual face, warm brown skin, and long black hair tied up under a head cloth of ochre-yellow cotton knotted flat at the side of the head. He is bare-chested. He wears a wrapped waist cloth in deep indigo blue, woven with a fine ochre check and a narrow ochre border, wrapped to the knee with one loose end hanging at the front. Bare feet, no footwear of any kind. A plain bronze bangle at each wrist, small gold ear studs, a thin gold band on one upper arm. He carries a short straight sword, blade about the length of his forearm with a plain wooden grip; no scabbard visible, no shield. IMPORTANT: absolutely no red or crimson anywhere on him, not on cloth, cord, border, or jewelry. No kris or wavy blade, no feathers, no mask, no tusks, no tattoos, no bone ornament, no "savage" styling of any kind. No wounds, no blood, no damage of any kind on him.

The pose: down on one knee in profile, FACING RIGHT: right knee on the ground, left foot planted forward, the sword point resting on the ground in his lowered right hand, his left hand raised open toward the viewer's right with the palm out, head bowed a little, face calm. No motion lines, no glow, no effects. Full body visible with roughly 5% empty margin; the grounded knee and foot at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette: warm bronze skin, umber shadows, ochre head cloth; his indigo waist cloth (#4B5E9A) is the strongest accent, and there is no red on him. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: srivijayan_kneel.png
```

The wash-out to paper is the engine's 1.5 s fade (DESIGN.md section 4);
the sprite is solid.

## 34 · `root_knot.png` — mangrove root knot platform

```
Generate this image: a knot of mangrove roots on a fully transparent background, straight-on side view, for use as a 2D video-game platform.

The object: a dense tangle of arched mangrove prop roots rising from the bottom edge of the image, interlaced and crusted with mud and small barnacles, forming at the top a rough but level mound of packed mud and root about as wide as the image, its top surface at about 35% of the image height from the top. A few nipa fronds and a strand of weed hang from one side. Water is not shown; the roots end cleanly at the bottom edge. No crimson, no red anywhere.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Kadaram palette with strong contrast: dark root #2E2A1E, wet mud #5E5A3E, jungle-green #355A45 fronds, green-black #101C1A shadow, pale light #E4EAC8 on the mound top. No red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a landscape image, 1536×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: root_knot.png
```

Walkable surface: the mound top at 35% of image height.

## 35 · `gate_l3.png` — the level 3 crossing gate (timber, no pennant)

```
Generate this image: a free-standing timber gateway on a fully transparent background, straight-on front view, for use as a 2D video-game prop in a Malay river village, 1025 CE.

The structure: a plain doorway of two upright timber posts, squared and weathered grey-brown, carrying a single straight timber lintel laid flat across them, lashed at the joints with rattan cord. No carving, no curve to the lintel, no arch, no doors. Nothing hangs from the lintel: no pennant, no banner, no cloth, no bells. At the base of each post stands a small bronze standing lamp, a slim stem on a round foot with one burning wick, casting a warm glow on the wood around it. No crimson, no red anywhere in the picture. The whole structure fills the frame height with small margins, and the post bases end cleanly at the bottom edge. Nothing behind the structure.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Kadaram palette with strong contrast: weathered timber #6B5A3E, green-black #101C1A shadow, lamp glow #F6E2A8 as the strongest accent. No red, red-orange, rust, terracotta, or pink anywhere. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: gate_l3.png
```

Same dimensions as slot 13 so `drawGate` scales it the same way. The lamp
is what announces a gate (DESIGN.md section 4, DECISIONS.md 7); the
engine's crimson arrow over gates is disabled in level 3 (builder task).

## 36 · `kasu.png` — gold kasu coin

```
Generate this image: a single gold coin on a fully transparent background, face-on, for use as a small 2D video-game pickup.

The object: a thick round coin of pale, low-fineness gold, about 20 mm across, with an irregular, slightly lumpy edge as on a hand-struck medieval coin. On its face, a simple standing figure of a king in a dhoti, in low relief, with a tall lamp stand beside him; the design is worn and soft, with no legible lettering of any kind. The gold is pale and dull, not bright yellow, with a warm shadow on the lower rim. No crimson, no red. The coin fills about 85% of the frame, centered.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted parchment palette: pale old gold, warm beige #D9C69A highlight, umber #6B4E33 shadow. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a square image, 256×256 pixels, as a PNG file with a fully transparent background. I will save this file as: kasu.png
```

One face only: the engine spins the coin by scaling it, so the reverse
(seated figure with conch, RESEARCH.md section 6) is never seen.

---

## Cut-out rigs (DECISIONS.md 19)

Characters are animated by cutting one painted image into parts and
rotating them in code. No character is generated pose by pose again. Slots
6 to 12, 17, 18, 22, and 30 to 33 are superseded and kept only as reference.

### Hero part map: `assets/hero_idle.png` (1024×1536)

Measured on the existing file. Coordinates are pixels, origin top left.
"Back" is the limb on the image's left (away from the camera), "front" the
one on the right. The figure stands in three-quarter view facing right.

| Part | Cut region (x1, y1 – x2, y2) | Pivot (x, y) | Parent |
|---|---|---|---|
| Pelvis (root) | 500, 520 – 760, 660 | 620, 620 | none |
| Torso | 430, 270 – 780, 600 | 620, 600 (waist) | pelvis |
| Head with topknot and neck | 540, 10 – 760, 330 | 640, 300 (neck base) | torso |
| Back upper arm | 400, 320 – 500, 560 | 470, 345 (shoulder) | torso |
| Back forearm and hand | 330, 520 – 430, 830 | 385, 540 (elbow) | back upper arm |
| Front upper arm | 710, 370 – 830, 590 | 740, 390 (shoulder) | torso |
| Front forearm and hand | 770, 560 – 900, 850 | 790, 565 (elbow) | front upper arm |
| Veshti | 430, 600 – 840, 1090 | 620, 630 | pelvis |
| Sash tails | 40, 600 – 560, 1260 | 520, 630 | pelvis |
| Back thigh | 420, 680 – 560, 1060 | 530, 700 (hip) | pelvis |
| Back shin and foot | 300, 1030 – 520, 1510 | 470, 1045 (knee) | back thigh |
| Front thigh | 640, 680 – 800, 1080 | 700, 700 (hip) | pelvis |
| Front shin and foot | 700, 1050 – 970, 1460 | 760, 1065 (knee) | front thigh |
| Scabbard and hilt | 720, 520 – 890, 975 | 745, 640 (belt) | pelvis |

Ankles, if the builder wants a foot roll: back 400, 1320; front 790, 1330.

**Draw order, back to front:** sash tails, back upper arm, back forearm,
back thigh, back shin, front thigh, front shin, torso, pelvis, veshti,
head, scabbard, front upper arm, front forearm. The veshti covers both
thighs, so the thighs need only rough cuts; the knees sit at the veshti
hem (y 1040 to 1065), which hides the seam. Each cut should extend 15 to
20 px past its pivot into the parent so rotations do not open gaps.

**Before cutting:** the file is opaque (dark vignette with a red glow
behind the sash tails). Remove the background and the red glow first; the
glow breaks the crimson rule and would ride along with the sash.

**Edits that remain for one later single-image edit of `hero_idle.png`**
(DECISIONS.md 19: edit that one image, never regenerate poses):

1. Sandals to bare feet (RESEARCH.md section 4, footwear). Both feet, y
   1340 to 1510.
2. Sash to crimson `#B5342A` plain cotton: the painted sash runs brighter
   and more orange than `#B5342A`, with a silk sheen (RESEARCH.md section 4).
3. Background and red glow removed, as above.
4. Not named in DECISIONS.md 19: the hilt has a hooked, back-curved pommel
   and the scabbard curves backward, which reads as a talwar (RESEARCH.md
   section 5). See the open question below.

### Consistency note: rig sheets (slots 37 to 39)

Each character is one image. Generate it once, check it, and do not
regenerate for new moves; new moves are code. Every sheet uses the same
neutral stance: standing upright in profile, FACING RIGHT, feet a little
apart, arms held slightly away from the body so no limb overlaps the
torso, fingers apart from the thigh, weapon held clear of the legs, even
light with no strong cast shadows across joints. Elbows and knees are
almost straight so they can bend either way in code. Check each sheet for:
transparent background, no limb crossing another, the research items in
the block, and red (crimson only where the block says, none on the
Srivijayan). Silhouettes stay distinct: hero with topknot and sash tails;
guard with tall spear and round shield on his back; Adittan lean, grey,
unarmed but for a scabbard; fighter with head cloth knotted flat and a
short sword, his oblong shield drawn apart.

## 37 · `rig_guard.png` — Chola gate guard, rig sheet

```
Generate this image: a full-body 2D video-game character drawn as a cut-out animation rig sheet, on a fully transparent background.

The character: a Chola gate guard of the king's bodyguard, Thanjavur, 1010 CE. Stocky and vigilant, heavier than a young man, with a thick mustache and warm brown skin, modeled on figures in Chola temple relief. He wears a sleeveless quilted cotton jacket, undyed off-white, stitched in vertical padded channels, over a short white cotton dhoti wrapped to the knee. A crimson cotton cloth is bound tight around his waist over the jacket, and a crimson cotton head cloth is wrapped as a low turban with a knot at the side. Bare feet, no footwear of any kind. A bronze bangle on one wrist, small gold ear studs. A round shield of ox-hide stretched over wicker, with a plain iron boss at its center, is slung on his back. He holds a long spear (vel) upright in his right hand: a plain wooden shaft taller than he is, tipped with a leaf-shaped iron head. IMPORTANT: no metal armor of any kind, no lamellar plates, no mail, no helmet, no plume, no sword; his arms, legs, and feet are bare.

The pose: a neutral standing pose for rigging, in profile, FACING RIGHT. Upright, feet a little apart, knees almost straight. Both arms held slightly away from the body so neither arm overlaps the torso; the right hand grips the spear shaft at hip height with the spear upright and clear of his legs; the left hand open and away from the thigh. Elbows almost straight. Even light, no strong cast shadows across the joints. Full body visible with roughly 5% empty margin; bare feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Warm palette with strong value contrast: deep umber shadow #2A1A10, warm light #F6E2A8; his crimson head cloth and waist cloth (#B5342A) are the strongest accent and the only red on him: no other red, red-orange, rust, or pink anywhere. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: rig_guard.png
```

Replaces slots 11, 12, and 22: patrol strides and the catch reach are
rotations of this sheet's arms and legs.

## 38 · `rig_adittan.png` — Adittan, rig sheet

```
Generate this image: a full-body 2D video-game character drawn as a cut-out animation rig sheet, on a fully transparent background.

The character: Adittan, an older Tamil soldier of the Chola fleet, about fifty, Thanjavur, 1010 CE, modeled on Chola bronze sculpture and temple relief. Lean and wiry, slightly stooped, warm brown skin with weathered lines, a grey mustache, and long grey-streaked hair tied in a low topknot. He is bare-chested, with a plain leather cross-belt over one shoulder. He wears a white cotton veshti tucked up to the knee in the kachcham style, bound by a narrow, faded crimson cotton waist cloth with short tails. Plain bronze ear hoops, one bronze bangle. Bare feet, no footwear of any kind. In his right hand he holds a sword in a plain wooden scabbard, point down: a straight, broad, double-edged blade with a short bronze grip and a flat round disc pommel, as on Chola bronzes of Durga and Bhairava. IMPORTANT: the sword is straight, never a curved talwar, scimitar, or katana. No shield, no spear, no armor, no helmet, no gold armlets; he is plainer than the young hero.

The pose: a neutral standing pose for rigging, in profile, FACING RIGHT. Upright with a slight stoop, feet a little apart, knees almost straight. Both arms held slightly away from the body so neither arm overlaps the torso; the right hand holds the scabbarded sword by its middle, clear of his legs; the left hand open and away from the thigh. Elbows almost straight. Even light, no strong cast shadows across the joints. Full body visible with roughly 5% empty margin; bare feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Thanjavur palette with strong value contrast: deep umber shadow #2A1A10, warm gold light #F6E2A8, white veshti in warm off-white; his faded crimson waist cloth (#B5342A) is the only red on him: no other red, red-orange, rust, or pink anywhere. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: rig_adittan.png
```

Adittan is SCRIPT.md's older man of Ilamaran's company who hands him his
father's sword. His dress follows the hero's (RESEARCH.md section 4),
plainer; his age and stoop are [invented]. The sword he carries is the
straight one RESEARCH.md section 5 prefers, which does not match the
hilt now painted on `hero_idle.png`; see the open question.

## 39 · `rig_srivijayan.png` — Srivijayan fighter, rig sheet

```
Generate this image: a full-body 2D video-game character drawn as a cut-out animation rig sheet, on a fully transparent background, with his shield drawn separately beside him.

The character: a Malay fighter of Kadaram in the kingdom of Srivijaya, 1025 CE, lean and quick, a soldier of a kingdom with temples and a fleet. He has a watchful, individual face, warm brown skin, and long black hair tied up under a head cloth of ochre-yellow cotton knotted flat at the side of the head. He is bare-chested. He wears a wrapped waist cloth in deep indigo blue, woven with a fine ochre check and a narrow ochre border, wrapped to the knee with one loose end hanging at the front. Bare feet, no footwear of any kind. A plain bronze bangle at each wrist, small gold ear studs, a thin gold band on one upper arm. He carries a short straight sword, blade about the length of his forearm with a plain wooden grip, held in his right hand; no scabbard visible. IMPORTANT: absolutely no red or crimson anywhere on him, not on cloth, cord, border, shield, or jewelry. No kris or wavy blade, no feathers, no mask, no tusks, no tattoos, no bone ornament, no "savage" styling of any kind.

The separate shield: to the right of the figure, not touching him, a tall oblong shield of ox-hide stretched over a wooden frame, plain and undecorated, seen flat from the front, about the height from his shoulder to his thigh, with its hand grip visible.

The pose: a neutral standing pose for rigging, in profile, FACING RIGHT. Upright, feet a little apart, knees almost straight. Both arms held slightly away from the body so neither arm overlaps the torso; the right hand holds the sword low with the blade angled forward, clear of his legs; the left hand open and away from the thigh, ready to take the shield in code. Elbows almost straight. Even light, no strong cast shadows across the joints. The figure fills the left two-thirds of the frame with roughly 5% empty margin; bare feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Kadaram palette with strong value contrast: green-black shadow #101C1A, pale light #E4EAC8, warm bronze skin, ochre head cloth, umber hide shield; his indigo waist cloth (#4B5E9A) is the strongest accent, and there is no red, red-orange, rust, or pink anywhere on him. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a square image, 1536×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: rig_srivijayan.png
```

Replaces slots 17, 18, and 30 to 33. Walk, raise, thrust, and kneel are
rotations; the shield-bearer is the same rig with the shield part attached
to the left hand (the only silhouette change, as before). The kneel's
open raised hand is a forearm rotation. The figure keeps the same scale as
slot 37 so the builder sets one height for all characters.


---

## Voyage map (drawn in code)

DECISIONS.md 29, RESEARCH.md 6b. Drawn in `index.html`; no image slot.

**Extent and projection.** 0.5°N to 15.5°N, 77.5°E to 104.17°E.
Equirectangular, 48 px per degree on 1280×720: `x = (lon − 77.5) × 48`,
`y = (15.5 − lat) × 48`; error under 1 percent, 1 px ≈ 2.3 km.

**Coastlines**, from Natural Earth 1:10m (public domain), clipped and
simplified
to 0.02°: Coromandel coast, Sri Lanka, Andamans and Nicobars
(islands under 3 px as dots), Burma and Thai coasts, Malay peninsula with
Penang and Langkawi, Gulf of Thailand, northern Sumatra with Simeulue.

| Point | Lat, lon | x, y |
|---|---|---|
| Thanjavur | 10.79, 79.14 | 79, 226 |
| Nagapattinam | 10.77, 79.84 | 112, 227 |
| Sri Lanka, north tip | 9.83, 80.23 | 131, 272 |
| Nicobars (Manakkavaram) | 8.0, 93.4 | 763, 360 |
| Kadaram, Merbok estuary | 5.70, 100.40 | 1099, 470 |
| Gunung Jerai, peak glyph | 5.79, 100.43 | 1101, 466 |
| Talaittakkolam (Takuapa) | 8.87, 98.35 | 1001, 318 |
| Ilamuridesam (Lamuri) | 5.55, 95.32 | 855, 478 |
| Ilangasoka (Langkasuka) | 6.87, 101.25 | 1140, 414 |

An ink arrow at 1240, 560 points to Srivijaya (Palembang, 3°S), off
the map. Label text comes from SCRIPT.md only. Course [plausible],
by the Nicobars: Nagapattinam, 9.5°N 86.0°E, 7.6°N 93.6°E, 6.2°N 97.0°E,
Merbok.

**Look.** Sea `#F1E3B4`; a 14 px `#A9C4B4` shore wash at 60 percent,
with three 1 px `#5E8F94` echo lines at 6, 12 and 20 px, fading. Land
`#F6E2A8` with an 8 px `#B08A52` bloom inside the coast. Hills are small `#7A5530` ink humps. Coastline ink `#2B2520`,
2 px (islands 1.5 px), with a 0.4 px wobble. Labels in Marcellus SC:
places 18 px ink, years 14 px `#4A3220`, with a 3 px `#F1E3B4` halo.

The route is crimson `#B5342A`, 3 px, dashed 10 on and 6 off, a likely
course, not a record. Each leg draws on when reached. Fleet
marker: a 22 px crimson square sail on an ink hull. Detour lamps and
named kasu are gold `#C9A24A` with a `#F6E2A8` glow, never crimson;
unlit, an ink outline.

**The palm-leaf strip.** One dried palmyra leaf, 1220×110 px, at y 600
to 710. Rounded ends, `#E3BC6A` body, `#B08A52` edges, lengthwise veins
every 7 px. Two 10 px `#2A1A10` binding holes at a quarter and three
quarters of its length; a twisted `#7A5530` cord, 2.5 px, through both,
knotted at the left. Legs run left to right.
Letters are incised and lamp-blacked: ink, 16 px, with a 1 px
`#F6E2A8` highlight below. An unfilled leg is bare leaf with one faint
scored line. A filled leg incises left to right over 0.8 s under a small
landmark glyph. No crimson on the strip. Its text comes from SCRIPT.md.

**Readability** at 1280×720: nothing important under 14 px; marks at
least 12 px; lamp tap areas 32 px. If the canvas scales down, text stays
at 14 CSS px or more.

## Open questions for Gaurav

1. **The hero's sword in the rig.** DECISIONS.md 19 rigs the hero from
   `hero_idle.png` and names two later edits, sandals and sash. The same
   image has a hooked, back-curved pommel and a backward-curving scabbard,
   which reads as a talwar, the one form RESEARCH.md section 5 rules out.
   Adittan (slot 38) hands Ilamaran his father's sword, so the two must
   match. Options: (a) add the sword to the single-image edit: repaint hilt
   and scabbard as straight, with a disc pommel; (b) paint the sword as its
   own rig part, which also lets the builder draw it for the cut in
   Kadaram, and leave the hip scabbard to (a); (c) accept the painted
   sword. Recommendation: (a) and (b) together. The attack needs a drawn
   blade part in any case, since the idle image shows only a sheathed one.
   Until you rule, the rig uses the image as painted.

## Changelog

2026-10-25, second edition. First edition was written from the build before
`docs/RESEARCH.md` existed.

- **Style sheet** added: palette as hex, three rules, the crimson rule
  verbatim (VISION.md pillar 1 and section 5), characters face right.
  Olive-grey, ink, bronze, and gold values were read from the painted kit;
  indigo is new for slots 17 and 18. The look is unchanged.
- **Workflow** now names Canva (DECISIONS.md 6) and adds the transparency
  check; the first hero PNGs came back on an opaque vignette.
- **Slot 1 `l1_far`**: "many tiered gopuram towers" became two low
  barrel-vaulted gateways in line, under half the vimana's height; fort
  wall and moat excluded; cloister added; thirteen storeys, octagonal
  cupola, gilded finial; crimson moved from "temple banners" on walls to one
  flag on a flagstaff (RESEARCH.md 3.1, "what the game gets wrong" c and d;
  section 4, the tiger).
- **Slot 2 `l2_far`**: lateen sails replaced by square or canted matting
  sails; hulls sewn, no stern castles; catamarans and dugouts; the Chudamani
  vihara's brick tower added behind the quay; flat coast stated; cargo now
  cloth and rice (RESEARCH.md 3.2, ships, the vihara, dock scene; NOTES.md
  item 3 context).
- **Slot 3 `l3_far`**: Borobudur stupas and jungle ridges replaced by a
  mangrove estuary, stilt houses, brick candi on stepped plinths, one tall
  white-plastered brick tower, one forested mountain, rain; the crimson
  accent moved off a Srivijayan shrine onto a single Chola ship's pennant
  at the river mouth, since crimson means Chola (RESEARCH.md 3.3, landscape
  and architecture; VISION.md pillar 1; NOTES.md item 3). Title changed from
  "Srivijaya jungle" to "Kedah shore."
- **Slot 4 `tex_stone`**: red lacquer traces removed; stone described as
  newly dressed (RESEARCH.md 3.1: no red lacquer on exterior carvings;
  the stone was new in 1010).
- **Slot 5 `tex_wood`**: iron nail heads replaced by coir cord seams and
  wooden dowels (RESEARCH.md 3.2, ships; section 7, dhows and junks).
- **Slots 6 to 10, hero**: all five regenerated (DECISIONS.md 6; NOTES.md
  item 4). Changes in the shared description: "warrior of the Chola
  empire's navy" became "soldier of the Chola fleet" (RESEARCH.md 4, the
  hero; section 7, "navy"); silk sash became cotton (RESEARCH.md 4); sandals
  became bare feet (RESEARCH.md 4, footwear); the "slightly curved
  south-Indian sword" became a straight broad double-edged blade with
  bronze grip and disc pommel, with the talwar named as forbidden
  (RESEARCH.md 5). The forward-curved blade is recorded as an allowed
  alternative in the consistency note, not in the prompts, so the five
  poses cannot drift apart. Pose descriptions unchanged apart from "bare
  feet" and the blade.
- **Slots 11 and 12, guard**: crimson lamellar, dark tunic, conical bronze
  helmet and plume removed. Now: quilted cotton jacket (the historian's
  "if the silhouette needs armor" option, chosen so the guard reads
  heavier than the bare-chested hero), crimson waist cloth and head cloth,
  hide-over-wicker shield with boss, leaf-headed vel, bare feet, mustache
  (RESEARCH.md 4, the guard, item by item; NOTES.md item 2). "Imperial
  guard" became "gate guard of the king's bodyguard" (RESEARCH.md 4, army
  organization). He stays crimson (VISION.md section 5, "a guard's cloth").
- **Slot 13 `gate`**: free-standing torana with curved lintel replaced by
  two granite pillars and a straight lintel; niche lamps replaced by
  standing bronze lamps at the pillar bases; lacquer removed (RESEARCH.md
  3.1, the torana gate prop and sounds and objects). The crimson pennant
  stays for levels 1 and 2; level 3 is the open question above.
- **Slot 16 `l3_mid`**: jungle trees and vines became mangroves, nipa palm,
  and stilt-walkway posts (RESEARCH.md 3.3, landscape).
- **Slots 17 and 18, Srivijayan fighter**: new (VISION.md section 7;
  NOTES.md item 1). Dress from RESEARCH.md 3.3, people and dress: wrapped
  waist cloth to the knee, bare chest, head cloth; weapon a short straight
  sword, since the kris is not attested before the 13th century. No crimson
  (VISION.md pillar 1). A person with a face (VISION.md section 6;
  RESEARCH.md section 7, "faceless Srivijayans"). Indigo chosen as his
  color: a Southeast Asian dye, cool against the warm kit, no cliché.
- **Slots 14 and 15**: unchanged.
- **Consistency notes** added per character; **slots 19 onward** reserved.
- Not done: no level props, since `docs/levels/*.md` does not exist. No
  images generated; that is the sprite-artist's work.

2026-10-25, third edition, after the design-critic's review ("Ready with
fixes") and the level documents.

- **Critic finding 1**: "Reserved" replaced by slots 19 to 34 under the
  level-designer's numbering (NOTES.md, level-designer to art-director)
  with the critic's filenames; the level 3 gate moved to 35.
- **Critic finding 2 and DECISIONS.md 7**: slot 35 `gate_l3.png`, timber
  post-and-lintel, two standing lamps, no pennant, no crimson, same
  dimensions as slot 13 for `drawGate`. The open question is closed. The
  crimson arrow glyph is a builder task under the same ruling.
- **Critic finding 3**: slot 36 `kasu.png` from RESEARCH.md section 6
  (standing king with lamp stand, about 20 mm, pale low gold, irregular
  edge, no lettering) and DESIGN.md section 6. One face only, since the
  engine spins by scaling.
- **Critic finding 4**: a "Prop formats" table before slot 19 gives the
  four kinds (tileable texture, point prop, character pose, wide piece)
  with sizes; wide pieces (24, 25, 26, 28) state their walkable surface
  as a fraction of image height and require a builder note before
  generation.
- **Critic finding 5**: the shield-bearer note (slots 30 to 33) states the
  shield is the only silhouette change; the shield is oblong hide over a
  wooden frame so it never reads as the Chola guard's round one.
  [invented]: RESEARCH.md 3.3 gives no Srivijayan shield form; DESIGN.md
  section 4 asks for "a hide shield held forward."
- **Critic finding 6**: slot 22 `guard_reach.png` reuses slot 11's
  paragraph verbatim with the critic's pose wording (DESIGN.md section 3).
- **Slot 19 kodi**: tiger on a crimson field on a pole, no heraldic shield
  (RESEARCH.md section 4, the tiger). Lit state only; the engine dims it.
- **Slot 20 lamp**: standing bronze lamp, no niche (RESEARCH.md 3.1,
  sounds and objects).
- **Slot 21 Nandi**: monolithic, on a plain plinth, facing left toward the
  sanctum, no pavilion, since the Nandi hall is Nayak work (RESEARCH.md
  3.1 and section 7). [plausible] for 1010.
- **Slot 23 bales**: undyed cloth bales, rice baskets, jars, pepper sacks
  (RESEARCH.md 3.2, dock scene); no awnings (VISION.md pillar 1 rejects
  Nagapattinam's green awnings).
- **Slots 24 and 25**: dugout and sewn-plank hull with matting sail and
  gangplank, no iron, no stern castle (RESEARCH.md 3.2, ships and dock
  scene). The hull's masthead pennant is Chola crimson; the ship is a
  Chola ship.
- **Slots 26, 27, 34**: stilt walkway and porch, Bujang Valley candi on a
  stepped plinth, mangrove root knot (RESEARCH.md 3.3, landscape and
  architecture). All crimson-free.
- **Slot 28 palisade**: timber palisade with carved gilded gateway, the
  inscription's torana (RESEARCH.md 3.3; DESIGN.md section 4). Gilt and
  bronze bells are [invented] dressing for "jeweled." Crimson-free.
- **Slot 29 gong**: bronze gong on a frame (RESEARCH.md 3.3, sounds).
- **Slots 30 to 33**: fighter raise, thrust, shield-bearer walk, kneel,
  from DESIGN.md section 4 (telegraph, thrust, shield variant, kneel and
  wash-out). No ink effects in the sprites and no wounds on the kneeling
  figure (DESIGN.md violence rule, DECISIONS.md 2).
- Declined or merged: nothing. Every requested slot has a block. Slot 32
  covers both strides of the shield-bearer's walk with one frame; a second
  stride, if the builder wants it, is slot 37.
- Not done: no builder confirmation yet of the pixel heights for the wide
  pieces; the sprite-artist should wait for it on 24 to 28 and start on
  everything else.

2026-10-25, fourth edition, after DECISIONS.md 17 and 19.

- **Style sheet** rewritten for DECISIONS.md 17: a palette per level
  (sky stops, far, mid, near, shadow, light, and an accent that is not
  red: plantain green, turmeric, indigo), the crimson rule restated as
  "the only red" with red-orange, rust, terracotta and pink named, and a
  contrast rule with value targets. The old "one loud color" rule is gone,
  since DECISIONS.md 17 revises VISION.md pillar 1's "one color" while
  keeping its crimson sentence.
- **Color grade for the builder** added: per-level values for every
  color field in the three level objects and `render()`, plus six new
  fields for values now hardcoded. Haze (`fogHaze`) roughly halved, mist
  alphas halved in levels 1 and 2. Lists the stray reds in the code.
- **Color in prompts**: Style lines of slots 1 to 5, 14 to 16, 20, 21,
  23 to 29, 34, and 35 now carry their level's palette and the contrast
  and red rules; color words in the bodies of slots 1, 2, 3, 15, 16
  changed to match. Subject matter unchanged. Slots 13, 19, 36 are shared
  across levels and stay neutral. Brick (slots 3, 27) is umber-ochre so it
  never reads as a second red.
- **Indigo** raised from `#3F4D73` to `#4B5E9A` everywhere: at the old
  value it sat at the same value as Kadaram's jungle-green mid plane and
  the fighter lost his silhouette. It is now Kadaram's accent too.
- **Cut-out rigs** added for DECISIONS.md 19: a part map for the existing
  `hero_idle.png` (14 parts, pivots and cut regions measured on the file,
  draw order), the remaining single-image edits, and rig sheets for the
  guard (37), Adittan (38, new character from SCRIPT.md), and the
  Srivijayan fighter (39, shield drawn as a separate part). Slots 6 to 12,
  17, 18, 22, and 30 to 33 marked superseded, not deleted. Slots 6 to 10
  and 22 were not in the coordinator's list but follow from decision 19.
- **Open question** added on the hero's painted sword (RESEARCH.md
  section 5).
- Not done: no pivots were tested in code, and the part map assumes the
  builder removes the background first.

2026-10-26, fifth edition, after DECISIONS.md 28 and 29.

- **Voyage map (drawn in code)** added: a lat/lon box, an equirectangular
  projection at 48 px per degree, a coastline source and list, nine
  points with coordinates and canvas positions, and the course by the
  Nicobars (RESEARCH.md 6b). Also the map's look, the palm-leaf strip, and
  readability minimums. Colors come from the style sheet. The route and
  fleet are crimson; lamps and kasu are gold.
- The route is dashed and tagged [plausible]. SCRIPT.md says "No route
  line: the route is unrecorded"; the dash marks it as a likely course,
  and the narrative designer is told in NOTES.md.

## Revision notes

- 2026-10-25: four editions in one day. First, written from the build.
  Second, corrected against RESEARCH.md, slots 17 and 18 added. Third,
  slots 19 to 36 from the level documents and the critic's six findings.
  Fourth, per-level palettes and color grade (DECISIONS.md 17) and cut-out
  rigs (DECISIONS.md 19). The changelog above has the detail.
- 2026-10-26: fifth edition, voyage map (DECISIONS.md 29).
