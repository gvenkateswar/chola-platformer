# Painted Asset Kit — Chola: Tides of Bronze

Owner: art-director. Reader: sprite-artist (and Gaurav). Second edition,
2026-10-25, revised against `docs/RESEARCH.md` (second draft),
`docs/VISION.md` (third draft), `docs/DECISIONS.md` 3 and 6, and the
creative-director's notes in `docs/NOTES.md`.

The game looks for PNG files in `chola-platformer/assets/` using the exact
filenames below. Any file that is missing falls back to the built-in procedural
art, so you can add assets one at a time and the game keeps working at every step.

## Style sheet

**Palette** (read from the painted kit):

- Warm beige `#D9C69A`: sky, haze, lit ground.
- Parchment gold `#CDBA8C`: sun path, lit stone.
- Umber `#6B4E33`: near silhouettes, wood, hair.
- Olive-grey `#6E6A52`: shadow, far ridges, water.
- Ink `#2B2520`: line, ink marks.
- Bronze `#A86A3C`, old gold `#C9A24A`: skin, ornament.
- Crimson `#B5342A`: Chola only.
- Indigo `#3F4D73`: the Srivijayan only.

**Three rules of the look.**

1. One painting, three depths. Far planes dissolve into haze, the near
   plane goes dark and simple; distance is told by value, never by line.
2. One loud color. Everything is parchment, umber, and grey; crimson is the
   single saturated note, and it is small.
3. The brush shows. Dry-brush strokes, watercolor blooms, edges that bleed,
   matte gouache finish. No photo-realism, no 3D render.

**The crimson rule**, verbatim from `docs/VISION.md` pillar 1: "Crimson means
Chola; nothing else gets it." Section 5 lists what gets it: "a sash, a
banner, a bird, a guard's cloth." The Srivijayan, his buildings, and his
shore carry none.

**Characters face right.** The engine flips them. If one comes back facing
left, regenerate or mirror it.

## Workflow

1. Copy any block below into the image generator, whole (the sprite-artist
   uses Canva, DECISIONS.md 6). Each block is self-contained: style,
   dimensions, PNG requirements, and filename are all inside it.
2. Download the result, rename it to the filename stated at the end of the
   block (convert to `.png` if the download is `.webp`), and drop it in
   `assets/`.
3. Open `chola-platformer/index.html` in a browser to see it in the game.
4. Consistency: the prompts repeat the full character description so they
   work in any order. For each character, generate the pose marked "first"
   and pass that image as a reference when generating the others; see the
   consistency notes under each character.
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
Generate this image: a wide painted background for a 2.5D side-scrolling video game. Dawn over Thanjavur, capital of the Chola kingdom, 1010 CE. The Brihadisvara temple dominates the middle distance: a steep pyramidal granite vimana of thirteen diminishing storeys rising to an octagonal cupola and a single square capstone with a small gilded finial, standing inside a long walled rectangular courtyard with a low pillared cloister along the wall. On the east side of the courtyard, two low gateway towers stand in line, each a plain rectangular block with a barrel-vaulted roof, both well under half the vimana's height. The vimana is the only tall structure in the picture; no other towers, no fort wall, no moat. The architecture is rendered as layered watercolor silhouettes that fade into warm morning haze: the nearest stone deep umber, the farthest almost dissolving into a parchment-gold sky. A pale, hazy sun disc in the upper right with soft god-rays. A line of palm crowns and low flat city rooftops runs along the bottom edge. One tiny crimson flag on a tall flagstaff inside the courtyard is the only saturated accent; no banners or streamers hang on any wall.

Composition rules: horizon line in the lower third of the frame; the bottom 25% of the image stays simple, dark, and low-contrast so game platforms drawn in front of it stay readable; no object of interest at the exact left or right edge, and both edges must close in similar tone and value so the image can repeat sideways.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette: warm beige #D9C69A, parchment gold #CDBA8C, umber #6B4E33, olive-grey shadows, with a single crimson accent #B5342A used sparingly. Soft atmospheric haze, visible dry-brush strokes and watercolor blooms, matte gouache finish, painterly soft edges, cinematic side-lighting. The mood of a moody stealth-action side-scroller set in medieval South India. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a landscape image, 1536×1024 pixels, as a PNG file. I will save this file as: l1_far.png
```

## 2 · `l2_far.png` — Nagapattinam harbor backdrop

```
Generate this image: a wide painted background for a 2.5D side-scrolling video game. Late golden afternoon over Nagapattinam, the main eastern port of the Chola kingdom, circa 1020 CE. A calm sea horizon in the lower third of the frame on a flat sandy coast with no cliffs or hills. The water is crowded with anchored medieval Indian Ocean merchant ships: broad, beamy wooden hulls with high curved prows and no stern castles, the planks visibly stitched edge to edge with cord, one or two masts each carrying a square or canted rectangular sail of woven matting, furled or half-furled, with rigging lines. No triangular lateen sails. Small catamarans and dugout canoes move between the ships. The ships are painted as layered warm-grey and umber silhouettes receding into amber sea haze. Behind the quay on the right, a tall square plastered brick tower with a tiered top, a Buddhist monastery tower, stands among thatched sheds and palms. Along the bottom edge, hints of a busy quay: piling posts, coiled rope, stacked cloth bales and rice baskets, all in deep shadow. A low hazy sun on the left throws a broken golden path across the water; gulls appear as tiny ink flecks. One crimson pennant on the nearest mast is the only saturated accent.

Composition rules: horizon in the lower third; the bottom 25% of the image stays simple, dark, and low-contrast so game platforms drawn in front of it stay readable; no object of interest at the exact left or right edge, and both edges must close in similar tone and value so the image can repeat sideways.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette: warm beige #D9C69A, parchment gold #CDBA8C, umber #6B4E33, olive-grey shadows, with a single crimson accent #B5342A used sparingly. Soft atmospheric haze, visible dry-brush strokes and watercolor blooms, matte gouache finish, painterly soft edges, cinematic side-lighting. The mood of a moody stealth-action side-scroller set in medieval South India. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a landscape image, 1536×1024 pixels, as a PNG file. I will save this file as: l2_far.png
```

## 3 · `l3_far.png` — Kedah shore backdrop

```
Generate this image: a wide painted background for a 2.5D side-scrolling video game. Monsoon morning on the coast of Kedah in the kingdom of Srivijaya, Malay peninsula, 1025 CE. A flat mangrove river plain under low cloud: a wide calm estuary in the lower third of the frame with mist lying over the water, mangrove trees on arched roots along both banks, and thatched wooden houses on stilts standing over the river edge, some with small boats tied beneath. On the near bank, low square brick shrines on stepped plinths, and one tall tiered brick tower plastered white, half veiled in mist. Far behind everything, a single forested mountain rises in soft grey-green wash, its summit lost in cloud. Light rain falls in thin diagonal strokes on the left. A pale white-green sun glows in the upper right behind thin cloud. Nipa palm fronds and mangrove branches frame the very bottom edge in deep shadow. No steep jungle ridges, no stupas, no bell-shaped domes, no Borobudur. Nothing in the picture is red except one tiny crimson pennant on the mast of a single foreign ship anchored far out at the river mouth; that pennant is the only saturated accent.

Composition rules: horizon in the lower third; the bottom 25% of the image stays simple, dark, and low-contrast so game platforms drawn in front of it stay readable; no object of interest at the exact left or right edge, and both edges must close in similar tone and value so the image can repeat sideways.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette shifted toward grey-green: warm beige #D9C69A, parchment gold #CDBA8C, umber #6B4E33, olive-grey shadows, with a single crimson accent #B5342A used sparingly. Soft atmospheric haze, visible dry-brush strokes and watercolor blooms, matte gouache finish, painterly soft edges, cinematic side-lighting. The mood of a moody action side-scroller set in medieval maritime Southeast Asia. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a landscape image, 1536×1024 pixels, as a PNG file. I will save this file as: l3_far.png
```

## 4 · `tex_stone.png` — granite block texture

```
Generate this image: a perfectly seamless, tileable texture of newly dressed granite temple masonry, hand-painted. Courses of large rectangular blocks in warm grey-brown stone, staggered joints, fine chisel marks and a few small chips, thin watercolor staining and faint moss shadow in the mortar lines. No paint or lacquer traces on the stone; no red anywhere in this texture. Even, directionless lighting: no cast shadows from any single direction, no vignette, no darkening at the edges. All four edges must tile seamlessly with themselves. Flat frontal view, no perspective.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette: warm beige #D9C69A, parchment gold #CDBA8C, umber #6B4E33, olive-grey shadows. Visible dry-brush strokes and watercolor blooms, matte gouache finish, painterly soft edges. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a square image, 1024×1024 pixels, as a PNG file, seamlessly tileable on all four edges. I will save this file as: tex_stone.png
```

## 5 · `tex_wood.png` — sewn-plank deck texture

```
Generate this image: a perfectly seamless, tileable texture of weathered teak ship planking from a medieval Indian Ocean sewn-plank hull, hand-painted. Horizontal planks of warm brown wood with visible grain painted in dry-brush strokes. Along every plank edge runs a zigzag seam of dark coir cord stitched through small drilled holes, and a few round wooden dowel ends show in the plank faces. No iron nails, no nail heads, no metal fittings of any kind. Salt staining, small gaps of deep shadow between planks, and a rope-worn patch or two. No red anywhere in this texture. Even, directionless lighting: no cast shadows from any single direction, no vignette, no darkening at the edges. All four edges must tile seamlessly with themselves. Flat frontal view, no perspective.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette: warm beige #D9C69A, parchment gold #CDBA8C, umber #6B4E33, olive-grey shadows. Visible dry-brush strokes and watercolor blooms, matte gouache finish, painterly soft edges. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a square image, 1024×1024 pixels, as a PNG file, seamlessly tileable on all four edges. I will save this file as: tex_wood.png
```

---

### Consistency note: the hero (slots 6 to 10)

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

```
Generate this image: a full-body 2D video-game character on a fully transparent background.

The character: Ilamaran, a young Tamil soldier of the Chola fleet, athletic build, warm bronze-brown skin, modeled on Chola bronze sculpture and temple relief carvings. He is bare-chested in the classical South Indian style, with a gold-trimmed leather cross-belt over the chest. He wears a white cotton veshti pleated from waist to knee and tucked up in the warrior's kachcham style, bound by a wide crimson cotton waist-sash, plain woven cotton with a narrow gold-thread border, whose two long tails trail behind him. His long hair is tied in a high warrior's topknot (kudumi) bound with a thin gold band. Gold hoop earrings, gold armlets on both upper arms, a bronze bangle at each wrist. His feet are bare: no sandals, no straps, no footwear of any kind. At his left hip hangs a straight, broad, double-edged sword in a plain wooden scabbard: the blade about the length of his arm, parallel-edged with a spear-point tip, a short bronze grip and a flat round disc pommel, as on Chola bronzes of Durga and Bhairava. IMPORTANT: the blade is straight, never a curved talwar, scimitar, or katana. No hood, no cloak, no armor, no European assassin styling: his head, chest, arms, and feet are bare.

The pose: standing alert in relaxed profile, FACING RIGHT, knees slightly bent, hands loose and ready. Full body visible from head to feet with roughly 5% empty margin all around; feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette with the crimson sash as the strongest accent (#B5342A). Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: hero_idle.png
```

## 7 · `hero_run_a.png` — the hero, run stride A

```
Generate this image: a full-body 2D video-game character on a fully transparent background.

The character: Ilamaran, a young Tamil soldier of the Chola fleet, athletic build, warm bronze-brown skin, modeled on Chola bronze sculpture and temple relief carvings. He is bare-chested in the classical South Indian style, with a gold-trimmed leather cross-belt over the chest. He wears a white cotton veshti pleated from waist to knee and tucked up in the warrior's kachcham style, bound by a wide crimson cotton waist-sash, plain woven cotton with a narrow gold-thread border, whose two long tails trail behind him. His long hair is tied in a high warrior's topknot (kudumi) bound with a thin gold band. Gold hoop earrings, gold armlets on both upper arms, a bronze bangle at each wrist. His feet are bare: no sandals, no straps, no footwear of any kind. At his left hip hangs a straight, broad, double-edged sword in a plain wooden scabbard: the blade about the length of his arm, parallel-edged with a spear-point tip, a short bronze grip and a flat round disc pommel, as on Chola bronzes of Durga and Bhairava. IMPORTANT: the blade is straight, never a curved talwar, scimitar, or katana. No hood, no cloak, no armor, no European assassin styling: his head, chest, arms, and feet are bare.

The pose: a full sprint in profile, FACING RIGHT: right leg extended far forward, left leg trailing bent behind, torso leaning into the run, both crimson sash tails streaming horizontally behind him, veshti pleats pressed back by the motion, arms pumping, the scabbarded sword swinging at his hip. Full body visible with roughly 5% empty margin; bare feet near the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette with the crimson sash as the strongest accent (#B5342A). Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: hero_run_a.png
```

## 8 · `hero_run_b.png` — the hero, run stride B

```
Generate this image: a full-body 2D video-game character on a fully transparent background.

The character: Ilamaran, a young Tamil soldier of the Chola fleet, athletic build, warm bronze-brown skin, modeled on Chola bronze sculpture and temple relief carvings. He is bare-chested in the classical South Indian style, with a gold-trimmed leather cross-belt over the chest. He wears a white cotton veshti pleated from waist to knee and tucked up in the warrior's kachcham style, bound by a wide crimson cotton waist-sash, plain woven cotton with a narrow gold-thread border, whose two long tails trail behind him. His long hair is tied in a high warrior's topknot (kudumi) bound with a thin gold band. Gold hoop earrings, gold armlets on both upper arms, a bronze bangle at each wrist. His feet are bare: no sandals, no straps, no footwear of any kind. At his left hip hangs a straight, broad, double-edged sword in a plain wooden scabbard: the blade about the length of his arm, parallel-edged with a spear-point tip, a short bronze grip and a flat round disc pommel, as on Chola bronzes of Durga and Bhairava. IMPORTANT: the blade is straight, never a curved talwar, scimitar, or katana. No hood, no cloak, no armor, no European assassin styling: his head, chest, arms, and feet are bare.

The pose: the opposite moment of a sprint stride in profile, FACING RIGHT: left leg planted under the body taking his weight, right leg folded and swinging through, arms in the opposite pumping position, sash tails swinging lower behind him, the scabbarded sword at his hip. Full body visible with roughly 5% empty margin; bare feet near the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette with the crimson sash as the strongest accent (#B5342A). Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: hero_run_b.png
```

## 9 · `hero_jump.png` — the hero, airborne

```
Generate this image: a full-body 2D video-game character on a fully transparent background.

The character: Ilamaran, a young Tamil soldier of the Chola fleet, athletic build, warm bronze-brown skin, modeled on Chola bronze sculpture and temple relief carvings. He is bare-chested in the classical South Indian style, with a gold-trimmed leather cross-belt over the chest. He wears a white cotton veshti pleated from waist to knee and tucked up in the warrior's kachcham style, bound by a wide crimson cotton waist-sash, plain woven cotton with a narrow gold-thread border, whose two long tails trail behind him. His long hair is tied in a high warrior's topknot (kudumi) bound with a thin gold band. Gold hoop earrings, gold armlets on both upper arms, a bronze bangle at each wrist. His feet are bare: no sandals, no straps, no footwear of any kind. At his left hip hangs a straight, broad, double-edged sword in a plain wooden scabbard: the blade about the length of his arm, parallel-edged with a spear-point tip, a short bronze grip and a flat round disc pommel, as on Chola bronzes of Durga and Bhairava. IMPORTANT: the blade is straight, never a curved talwar, scimitar, or katana. No hood, no cloak, no armor, no European assassin styling: his head, chest, arms, and feet are bare.

The pose: airborne mid-leap in profile, FACING RIGHT: knees tucked, bare feet drawn up, body arched slightly forward, arms spread for balance, the veshti pleats and both crimson sash tails billowing upward behind him, the scabbarded sword lifting at his hip. Centered in the frame with clear empty space below the feet.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette with the crimson sash as the strongest accent (#B5342A). Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: hero_jump.png
```

## 10 · `hero_attack.png` — the hero, sword cut

```
Generate this image: a full-body 2D video-game character on a fully transparent background.

The character: Ilamaran, a young Tamil soldier of the Chola fleet, athletic build, warm bronze-brown skin, modeled on Chola bronze sculpture and temple relief carvings. He is bare-chested in the classical South Indian style, with a gold-trimmed leather cross-belt over the chest. He wears a white cotton veshti pleated from waist to knee and tucked up in the warrior's kachcham style, bound by a wide crimson cotton waist-sash, plain woven cotton with a narrow gold-thread border, whose two long tails trail behind him. His long hair is tied in a high warrior's topknot (kudumi) bound with a thin gold band. Gold hoop earrings, gold armlets on both upper arms, a bronze bangle at each wrist. His feet are bare: no sandals, no straps, no footwear of any kind. His sword is drawn and in his right hand: a straight, broad, double-edged blade about the length of his arm, parallel-edged with a spear-point tip, a short bronze grip and a flat round disc pommel, as on Chola bronzes of Durga and Bhairava; the empty plain wooden scabbard hangs at his left hip. IMPORTANT: the blade is straight, never a curved talwar, scimitar, or katana. No hood, no cloak, no armor, no European assassin styling: his head, chest, arms, and feet are bare.

The pose: mid sword-cut in profile, FACING RIGHT: the straight blade sweeping forward at shoulder height in his right hand, a faint pale arc of motion behind the blade, weight on the front foot, veshti and sash swinging with the strike. Full body visible with roughly 5% empty margin; bare feet near the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette with the crimson sash as the strongest accent (#B5342A). Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: hero_attack.png
```

---

### Consistency note: the Chola guard (slots 11 and 12)

Generate slot 11 (`guard_walk_a.png`) first and pass it as a reference for
slot 12. He appears only in levels 1 and 2 as an obstacle to avoid
(DECISIONS.md 3), so he is read at a glance from a distance: the tall
upright spear and the round shield on his back are his silhouette. The
quilted jacket gives him a heavier outline than the bare-chested hero
without putting metal on him. Check: no plates, no helmet, bare feet,
crimson only on the head cloth and waist cloth, transparent background.

## 11 · `guard_walk_a.png` — Chola gate guard, stride A

```
Generate this image: a full-body 2D video-game enemy character on a fully transparent background.

The character: a Chola gate guard of the king's bodyguard, Thanjavur, 1010 CE. Stocky and vigilant, heavier than a young man, with a thick mustache and warm brown skin, modeled on figures in Chola temple relief. He wears a sleeveless quilted cotton jacket, undyed off-white, stitched in vertical padded channels, over a short white cotton dhoti wrapped to the knee. A crimson cotton cloth is bound tight around his waist over the jacket, and a crimson cotton head cloth is wrapped as a low turban with a knot at the side. Bare feet, no footwear of any kind. A bronze bangle on one wrist, small gold ear studs. A round shield of ox-hide stretched over wicker, with a plain iron boss at its center, is slung on his back. He holds a long spear (vel) upright in his right hand: a plain wooden shaft taller than he is, tipped with a leaf-shaped iron head. IMPORTANT: no metal armor of any kind, no lamellar plates, no mail, no helmet, no plume, no sword; his arms, legs, and feet are bare.

The pose: mid-patrol stride in profile, FACING RIGHT: right leg forward taking his weight, left leg pushing off behind, spear upright, shield square on his back. Full body visible with roughly 5% empty margin; bare feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette; his crimson head cloth and waist cloth (#B5342A) are the strongest accent, and the only red on him. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: guard_walk_a.png
```

## 12 · `guard_walk_b.png` — Chola gate guard, stride B

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

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style, muted sepia and umber tones, visible dry-brush strokes, matte gouache finish. No text, no watermark, no signature, no border.

Output: a landscape image, 1536×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: l1_mid.png
```

## 15 · `l2_mid.png` — Nagapattinam mid-parallax band (advanced)

```
Generate this image: a sparse horizontal band of wooden dock pilings with coiled rope and hanging fishing nets occupying ONLY the bottom half of the frame, painted as dark umber silhouettes with soft watercolor edges, for use as a parallax layer in a 2D video game. Nothing at all in the top half of the image; it must stay fully transparent. Left and right edges similar in density so the band can repeat sideways.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style, muted sepia and umber tones, visible dry-brush strokes, matte gouache finish. No text, no watermark, no signature, no border.

Output: a landscape image, 1536×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: l2_mid.png
```

## 16 · `l3_mid.png` — Kedah mid-parallax band (advanced)

```
Generate this image: a sparse horizontal band of mangrove trees standing on arched prop roots, nipa palm fronds, and the posts of a stilt walkway over water, occupying ONLY the bottom half of the frame, painted as dark olive-umber silhouettes with soft watercolor edges, for use as a parallax layer in a 2D video game. Nothing at all in the top half of the image; it must stay fully transparent. Left and right edges similar in density so the band can repeat sideways.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style, muted grey-green and umber tones, visible dry-brush strokes, matte gouache finish. No text, no watermark, no signature, no border.

Output: a landscape image, 1536×1024 pixels, as a PNG file with a fully transparent background. I will save this file as: l3_mid.png
```

---

### Consistency note: the Srivijayan fighter (slots 17 and 18)

Generate slot 17 (`srivijayan_walk_a.png`) first and pass it as a reference
for slot 18. He is the only enemy in level 3 and the first person the hero
ever draws a sword on (DECISIONS.md 3), so he gets the same care as the
hero: a face of his own, ornament, and a weapon a kingdom's soldier would
carry. His color is indigo (#3F4D73), a real Southeast Asian dye and the
one cool note in a warm kit, which is how the eye tells him from the Chola
figures before it reads any detail. Silhouette: head cloth knotted flat,
bare chest, short sword held low, a loose cloth end swinging at the front,
nothing on his back. Check every result for red: there must be none on him,
not on cord, border, or jewelry.

## 17 · `srivijayan_walk_a.png` — Srivijayan fighter, stride A

```
Generate this image: a full-body 2D video-game enemy character on a fully transparent background.

The character: a Malay fighter of Kadaram in the kingdom of Srivijaya, 1025 CE, lean and quick, a soldier of a kingdom with temples and a fleet. He has a watchful, individual face, warm brown skin, and long black hair tied up under a head cloth of ochre-yellow cotton knotted flat at the side of the head. He is bare-chested. He wears a wrapped waist cloth in deep indigo blue, woven with a fine ochre check and a narrow ochre border, wrapped to the knee with one loose end hanging at the front. Bare feet, no footwear of any kind. A plain bronze bangle at each wrist, small gold ear studs, a thin gold band on one upper arm. He carries a short straight sword, blade about the length of his forearm with a plain wooden grip, held low in his right hand with the point toward the ground; no scabbard visible, no shield. IMPORTANT: absolutely no red or crimson anywhere on him, not on cloth, cord, border, or jewelry. No kris or wavy blade, no feathers, no mask, no tusks, no tattoos, no bone ornament, no "savage" styling of any kind.

The pose: a wary advancing stride in profile, FACING RIGHT: right leg forward taking his weight, left leg behind, knees bent low, torso turned slightly toward the viewer, sword held low and ready in the right hand, left hand open at his side, the loose cloth end swinging forward. Full body visible with roughly 5% empty margin; bare feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette: warm bronze skin, umber shadows, ochre head cloth; his indigo waist cloth (#3F4D73) is the strongest accent, and there is no red on him. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: srivijayan_walk_a.png
```

## 18 · `srivijayan_walk_b.png` — Srivijayan fighter, stride B

```
Generate this image: a full-body 2D video-game enemy character on a fully transparent background.

The character: a Malay fighter of Kadaram in the kingdom of Srivijaya, 1025 CE, lean and quick, a soldier of a kingdom with temples and a fleet. He has a watchful, individual face, warm brown skin, and long black hair tied up under a head cloth of ochre-yellow cotton knotted flat at the side of the head. He is bare-chested. He wears a wrapped waist cloth in deep indigo blue, woven with a fine ochre check and a narrow ochre border, wrapped to the knee with one loose end hanging at the front. Bare feet, no footwear of any kind. A plain bronze bangle at each wrist, small gold ear studs, a thin gold band on one upper arm. He carries a short straight sword, blade about the length of his forearm with a plain wooden grip, held low in his right hand with the point toward the ground; no scabbard visible, no shield. IMPORTANT: absolutely no red or crimson anywhere on him, not on cloth, cord, border, or jewelry. No kris or wavy blade, no feathers, no mask, no tusks, no tattoos, no bone ornament, no "savage" styling of any kind.

The pose: the opposite moment of the wary advancing stride in profile, FACING RIGHT: left leg forward and planted, right leg trailing behind, knees still bent low, torso turned slightly toward the viewer, sword held low in the right hand with the blade angled a little forward, the loose cloth end swinging back. Full body visible with roughly 5% empty margin; bare feet at the bottom of the frame.

Style: hand-painted 2D video-game concept art in an ink-and-watercolor wash style. Muted sepia and parchment palette: warm bronze skin, umber shadows, ochre head cloth; his indigo waist cloth (#3F4D73) is the strongest accent, and there is no red on him. Visible dry-brush strokes, matte gouache finish, painterly soft edges, crisp readable silhouette, cinematic side-lighting. No text, no watermark, no signature, no border, no photo-realism, no 3D render look.

Output: a portrait image, 1024×1536 pixels, as a PNG file with a fully transparent background. I will save this file as: srivijayan_walk_b.png
```

---

## Slots 19 onward: level props

Reserved. `docs/levels/*.md` does not exist yet; the level-designer runs
after the game-designer. When those documents arrive, any prop their
section 7 requests is added here from slot 19, one block per prop in the
form above.

## Open questions for Gaurav

1. **The gate in level 3.** Slot 13 carries a crimson pennant and is the
   crossing gate in every level. In Kadaram a crimson pennant on a
   Srivijayan gateway breaks the crimson rule. Options: (a) accept it as a
   game device, since the gates are the player's marks on the painting, not
   the kingdom's; (b) add a slot 19 `gate_l3.png`, a carved timber gateway
   with no pennant, which RESEARCH.md section 3.3 supports as the
   inscription's torana. Recommendation: (b), if the builder confirms the
   engine can load a per-level gate image. Until then the single gate ships.

## Changelog and revision notes

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
