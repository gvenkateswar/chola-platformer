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

## Pending

- Slots 19 onward wait for docs/levels/*.md section 7.
- Sprite-artist has not yet reported which phrasings produced good
  results under Canva; record them here when they arrive.
- design-critic review of the second edition not yet received.
