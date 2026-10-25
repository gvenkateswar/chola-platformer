# Script review, 2026-10-25

Reviewer: design-critic. Document: `docs/SCRIPT.md`, first draft. Judged
against `docs/VISION.md` sections 5 and 6, `docs/DECISIONS.md` 3 to 5,
`docs/RESEARCH.md` sections 2 to 4 and 9, `docs/DESIGN.md` sections 2, 3,
and 8, the three level documents (section 8 and `hints:`), and the strings
in `index.html`.

## Verdict

**Ready with fixes.** The voice holds in every line and every historical
claim traces to RESEARCH.md; the hint table was written before the level
documents and now points at gates that no longer exist, promises a
down-crossing at gates that only go up, and misses three hints and three
mid-level lines the level designer has asked for.

## Findings

### 1. The gate hints promise a crossing that fails

"| Level 1, first gate (x 2780) | The lamp marks a gate. ↑ far path, ↓
near. |" LEVEL-1 puts the hint at 1740 at G1, whose link is
`[1680,120,0,1]`: lanes 0 and 1 only. LEVEL-2's first gate (260) and
LEVEL-3's (340) are also 0 to 1 only. Pressing ↓ there gives "No gate
here." All three lines promise a ↓ that fails. Replace with ↑-only lines
at 1740, 260, and 340: "The lamp marks a gate. ↑ the cloister roof." /
"Lamplit again. ↑ the warehouse ledge." / "A lamp in the rain. ↑ the
stilt walk." If a ↓ line is wanted, it belongs at the first 1-to-2 gate
(4510, 1830, 3050).

### 2. Three hints and one touch variant are missing

The level documents place `[1000,280,double jump]`, `[320,500,climb]`,
and `[300,560,sword]`; DESIGN 8 asks for "tap ▲ far, ▼ near" on touch.
None is in the table. Add four rows under 12 words, for example: "Jump
again in the air." / "Up the bales. Height hides you." / "Here the sword
comes out. J or X." / "The lamp marks a gate. Tap ▲ for the far path."

### 3. The mid-level hooks have no lines

LEVEL-1 section 8: "Mid at CP2 (the vimana close for the first time;
awe)"; LEVEL-2: "Mid at CP2 under the vihara tower: a foreign king's
monastery, noticed, not explained"; LEVEL-3: "Mid at CP4, facing the
wall: dread." The script has nothing for them, and the only mechanism is
the checkpoint float, where "The banner is planted. Breathe." would
collide. Write three one-line floats that replace the generic line at
those checkpoints, in his register: "The tower. I did not know stone went
that high." / "A foreign king's house of monks. Nobody minds it." / "A
wall of timber. Men in front of it. No way round." Or decline the hooks
in writing so the level designer stops holding the slot.

### 4. "I will see neither" contradicts the level and the ending

Chapter III: "They say the king of Kadaram keeps elephants and a gate of
jewels; I will see neither." The gate of jewels is the inscription's
torana at the war gate (RESEARCH 3.3), which LEVEL-3 builds as the
palisade gateway Ilamaran fights through and walks under in the inner
court. Write: "They say the king of Kadaram keeps elephants and a gate of
jewels. The gate is ahead of us. The elephants I will not see."

### 5. "rowed the bench beside mine" settles a fact the historian could not

The line of cost: "Sattan, son of Kandan, of Anaimangalam, who rowed the
bench beside mine." RESEARCH 9.2 could not answer "whether ships were
rowed," and 3.2 gives the hulls matting sails. Spoken invention is free
(VISION 6), but ships follow RESEARCH.md, and this line fixes how the
fleet moved. Write: "who slept on the deck beside mine from
Nagapattinam, is in the river, and his mother does not know."

### 6. Rulings on the two notes to the critic

"1025 CE · the Merbok river": the record register uses period names
elsewhere (Kadaram, not Kedah), and Merbok is the modern name. Use "1025
CE · the Kadaram shore." The shout "Hoi! You there!": keep it. DESIGN 3
asks for "a short shout," the "!" is a glyph, and three words cost
nothing.

### 7. One sources-screen tag is stronger than the research

"**Documented:** ... Rajendra as the king's son and general." RESEARCH
3.1 documents the co-regency of 1012 and infers the rest ("already a
commander" has no citation). Write "Rajendra as the king's son, co-regent
from 1012," and let "general" stay in Chapter I, where it is what
Ilamaran was told.

## What works

The three voice rules are real constraints, and the lines obey them:
"Stitched planks, coir cord, no iron anywhere" is a sailor's inventory,
not a historian's. "I did not see his face" is Pillar 2 in six words. The
line of cost names a man in the attested form and gives him a village
from the Leiden grant. The sources screen's invented list is honest
enough to keep verbatim.
