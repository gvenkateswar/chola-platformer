# Assets review, 2026-10-25

Reviewer: design-critic. Document: `ASSETS.md`, second edition. Judged
against `docs/VISION.md` Pillar 1 and section 7, `docs/DECISIONS.md` 3
and 6, `docs/RESEARCH.md` sections 3 to 6, `docs/NOTES.md`, the three
level documents (section 7), `docs/DESIGN.md` sections 4 to 6, and
`drawGate` / `drawPlatform` in `index.html`.

## Verdict

**Ready with fixes.** Slots 1 to 18 are sound against the research and
the crimson rule, and the sprite-artist can start on them today; the
document's own "Slots 19 onward" section is now stale, and sixteen props
the level designer has requested, plus two the game designer requires,
have no prompt, no filename, and no stated format.

## Findings

### 1. "Reserved" is stale and the slot numbers already collide

"Reserved. `docs/levels/*.md` does not exist yet." They exist, and
NOTES.md lists slots 19 to 34 by name. The open question proposes "a slot
19 `gate_l3.png`," which the level designer has given to the crimson
kodi; LEVEL-2 and LEVEL-3 already cite "kodi 19" and "guard reach 22" as
existing. Write slots 19 to 34 as NOTES.md numbers them, each with a
filename the builder can key (`kodi.png`, `lamp.png`, `nandi.png`,
`guard_reach.png`, `bales.png`, `dugout.png`, `hull.png`,
`stilt_walk.png`, `candi.png`, `palisade.png`, `gong.png`,
`srivijayan_raise.png`, `srivijayan_thrust.png`,
`srivijayan_shield_walk.png`, `srivijayan_kneel.png`, `root_knot.png`),
and move the level 3 gate to slot 35.

### 2. The level 3 pennant: recommend (b), but not as the torana

"In Kadaram a crimson pennant on a Srivijayan gateway breaks the crimson
rule. Options: (a) accept it as a game device ... (b) add a slot 19
`gate_l3.png`, a carved timber gateway with no pennant." Verified: Pillar
1 says "Crimson means Chola; nothing else gets it," and this kit already
moved level 3's only crimson onto a Chola ship for exactly that reason;
option (a) fails by the kit's own logic. But (b) as written is wrong too:
the inscription's torana is the war gate, which LEVEL-3 builds as the
palisade, slot 28. The crossing gates in level 3 stand on stilt walks and
mud banks. Recommend: slot 35, a timber post-and-lintel gate with the
same two standing lamps and no pennant; DESIGN rule 4 makes the lamp, not
the pennant, what announces a gate. Engine: `drawGate` reads `IMGS.gate`
only (line 1213); a per-level key is a one-line builder change. Note for
the same ruling: the engine draws a pulsing crimson arrow above every
gate in every level (line 1221), a UI mark that Pillar 1 has not ruled
on.

### 3. The kasu has no slot

DESIGN 6: "Sprite per RESEARCH 6: thick, irregular, pale gold, a standing
figure, no lettering." The kit has no coin; the build draws a procedural
one. Add a slot: "a thick round gold coin with an irregular edge, a
standing figure with a lamp stand on its face, no legible lettering,
pale low gold, 256 by 256, transparent."

### 4. The props need a format the document does not give

"one block per prop in the form above." The form above is a 1024 by 1536
transparent character or a 1024 by 1024 tile. The requests are four
kinds: tileable textures (23, "the `stall` platform skin," which the
engine applies through `texPat` like slots 4 and 5); point props drawn at
an anchor (19, 20, 21, 27, 29, 34); character poses (22, 30 to 33); and
wide pieces the builder must place by hand (25 hull with gangplank, 26
stilt walkway, 28 palisade "spanning three depths"). Say which is which,
the pixel size for each kind, and that the wide pieces need a builder
note before the sprite-artist generates them, or three of the sixteen
will come back unusable.

### 5. The shield-bearer contradicts the fighter's silhouette rule

Consistency note: "Silhouette: head cloth knotted flat, bare chest, short
sword held low, a loose cloth end swinging at the front, nothing on his
back." DESIGN 4's shield-bearer holds "a hide shield held forward" and
reads from the front. When slot 32 is written, state that the shield is
the variant's silhouette change and the only one, so the sprite-artist
does not redress him.

### 6. Slot 22 has no description to copy

DESIGN 3: "the guard grabs a shoulder (this needs a sprite: guard
reaching, one pose, new slot)." NOTES asks for it as 22. When written,
reuse the slot 11 character paragraph verbatim and give the pose as "both
arms reaching forward at shoulder height, spear tucked under the right
arm, weight on the front foot, FACING RIGHT," since the engine flips him
and the catch lands from either side.

## What works

The crimson rule is quoted, applied, and audited per character ("Check
every result for red"). Each prompt is self-contained and names its file.
The changelog ties every change to a RESEARCH.md section, which is the
trail CLAUDE.md asks for. The Srivijayan gets a face, ornament, a dye
with a reason, and a list of the clichés he must not carry; VISION 6's
"never faceless" is met in the prompt itself. The open question is put
to the owner with options and a recommendation, as it should be.
