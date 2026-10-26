# Art-director memory

## Style rulings (2026-10-25, second edition of ASSETS.md)

- Palette hex values are fixed in the ASSETS.md style sheet. Olive-grey
  #6E6A52, ink #2B2520, bronze #A86A3C, gold #C9A24A were read from the
  painted kit, not from the first prompts; keep them.
- Crimson #B5342A is Chola only (VISION.md pillar 1). Indigo #3F4D73 is the
  Srivijayan's one color: a Southeast Asian dye, the single cool note in a
  warm kit, chosen so the eye separates him before reading detail.
- Hero sword: all five poses use the straight broad double-edged blade,
  disc pommel. The forward-curved blade is also period (RESEARCH.md 5,
  Elgood) and is recorded only in the consistency note, never in prompts,
  so poses cannot drift. Back-curved talwar forbidden.
- Guard: quilted undyed cotton jacket (historian's conditional option)
  chosen over bare chest so his outline differs from the hero's. Crimson
  only on head cloth and waist cloth.
- Gate: two granite pillars, straight lintel, standing bronze lamps at the
  base. Level 3 crimson pennant conflict is an open question for Gaurav
  (recommendation: slot 19 `gate_l3.png`, timber gateway, no pennant).
- Silhouette rule: hero = topknot, sash tails, sword at hip, empty hands;
  guard = tall upright spear, round shield on back; Srivijayan = head cloth
  knotted flat, short sword held low, nothing on back.

## What the first kit's images taught

- The generator ignored "fully transparent background" for all five hero
  PNGs (opaque dark vignette). Workflow now tells the sprite-artist to
  check and strip backgrounds.
- It drew a back-curved talwar and strapped sandals despite "slightly
  curved south-Indian sword" and "simple leather sandals": vague phrasing
  invites the generator's default. Prompts now name the forbidden form
  ("never a curved talwar, scimitar, or katana"; "no sandals, no straps").
- Backdrops (l1, l2, l3) matched the wash style well; the character
  renders are tighter and more detailed than the backdrops but sit fine
  beside them at game scale. Do not loosen the character style.
- l1_far came back with several extra gopurams and distant temples; the
  new prompt says "the vimana is the only tall structure."

## Third edition (2026-10-25): slots 19 to 36

- Slot numbers are the level-designer's (NOTES.md) and are already cited
  in LEVEL-2/3; never renumber them. Level 3 gate is 35 (DECISIONS.md 7),
  kasu is 36; rigs took 37 to 39.
- Prop kinds and sizes: tileable 1024 sq opaque; point props 512x1024 or
  1024 sq or 1536x1024 transparent, bottom edge = ground; poses 1024x1536;
  wide pieces 1536x1024 with the walkable surface stated as a fraction of
  height, and a builder note required before generation (critic finding 4).
- Shield-bearer (32): oblong hide shield, the only silhouette change
  [invented]; round would read as the Chola guard.
- Nandi (21) faces left (backdrop, never flipped) and has no pavilion:
  the Nandi hall is Nayak.
- No ink effects in enemy sprites; the engine draws flare, splash,
  wash-out. Kneel pose carries no wounds (violence rule).
- Kasu (36): one face, 256 sq; the engine spins by x-scaling.

## Fourth edition (2026-10-25): palette and rigs

- Owner reaction: Gaurav played level 1 and found the sepia palette too
  drab. DECISIONS.md 17: a natural color per place, crimson still the only
  red. He favors legibility and life over restraint in color, unlike his
  restraint on story and gore.
- Accents: Thanjavur plantain green #6E8B3D, Nagapattinam turmeric
  #DDB02F, Kadaram indigo #4B5E9A (also the fighter's cloth; raised from
  #3F4D73, which vanished against the green mid plane).
- Haze: fogHaze alpha cut to .16/.14/.20 (from .34/.32/.36); mist .05/.03
  in levels 1 and 2, .12/.07 in level 3; depth comes from dimPal -40/+16.
- Brick is umber-ochre in prompts, never red (crimson rule).
- DECISIONS.md 19: cut-out animation, no per-pose generation ever again.
  Rig sheets: 37 guard, 38 Adittan, 39 fighter (shield as separate part,
  1536 square). Hero cut from existing hero_idle.png; part map measured
  with a 50 px grid overlay in the scratchpad (method worth reusing).
- hero_idle.png problems: opaque background, red glow behind sash tails,
  sandals, sash too orange with silk sheen, talwar-like hooked pommel and
  curved scabbard. Sword is an open question for Gaurav.
- Next free slot: 40.

## Critic (design-critic) taste

- Wants every slot keyed by filename the builder can use, a format per
  kind, and the engine line cited when a claim depends on it. Praised the
  per-character "check every result for red" audit; keep that pattern.

## Pending

- Builder has not confirmed pixel heights for wide pieces 24 to 28.
- Sprite-artist has not yet reported which phrasings produced good
  results under Canva; record them here when they arrive.
- Critic has not reviewed the third edition.
