# Chola: Tides of Bronze — Script

Owner: narrative-designer. Readers: builder, design-critic, level-designer.
Third draft, 2026-10-25. Budget 1,700 words including the text itself
(raised from 1,500 for the handover scene, DECISIONS.md 10).
Every fact follows `docs/RESEARCH.md`; every fight and kill follows
`docs/DECISIONS.md` 3 and 4.

## 1. Voice

Two registers. Ilamaran speaks in the level cards, the hints, the floats,
and the body of the ending. The record speaks in eyebrows, date lines, one
closing line on the end screen, and the sources screen: plain, dated,
no adjectives.

Ilamaran's three rules:

1. **He reports what is in front of him.** Stone, rope, rain, a lamp. He
   names a thing before he judges it, and he rarely judges. No "epic," no
   "legendary," no "destiny."
2. **He knows his station.** A sevagan of fifteen years. He has heard the
   king's name and the king's son's name; he has seen neither close. Rumor
   arrives as "they say." He never knows what comes after 1025.
3. **Short sentences, one breath each.** The longest thing he says is a
   fact he has checked with his own hands.

## 2. Title screen

**Eyebrow:** A voyage east · 1010–1025 CE

**Title (fixed):** Chola: Tides of Bronze

**Subtitle:** One soldier of the fleet, from the temple at Thanjavur to the
Srivijaya shore.

**Under the subtitle (replaces the "warrior of the Chola navy" paragraph):**
You are Ilamaran. Nobody will write your name on a wall. Run, climb, and
cross between the near and far paths of the painting at the lamplit gates.
The sword stays in its scabbard until Kadaram.

**Key legend, one change:** "J / X sword" becomes "J / X sword, sheathed
until Kadaram."

**Prompt:** Begin the voyage

## 3. Level cards

### Chapter I · Thanjavur

**Date line:** 1010 CE · the 25th year of Rajaraja

The stone is new. They say the king gave a copper pot plated in gold for
the top of the tower today, and I believe it; it burns from the far side
of the paddy. I am to join the muster of Rajendra, the king's son and
general, past the two east gateways. The gate guards want no village boy
inside the enclosure. I will cross it anyway. (66 words)

### Chapter II · Nagapattinam

**Date line:** 1025 CE · the sailing season

Fifteen years a sevagan and I have never seen so many hulls. Stitched
planks, coir cord, no iron anywhere. Pearls, cloth and rice go aboard. The
tall brick tower over the warehouses is a monastery the kings of Srivijaya
paid for, with our old king's leave. Now we sail against Srivijaya. The
dock guards hold soldiers back until the cargo is in. My ship is at the
far end. (68 words)

### Chapter III · Kadaram · Srivijaya

**Date line:** 1025 CE · the Kadaram shore

Rain. The river is flat and brown and the houses stand in it on legs. One
mountain behind, in cloud. They say the king of Kadaram keeps elephants
and a gate of jewels. The gate is ahead of us. The elephants I will not
see. The men in front of that gate know this ground. I have carried this
sword fifteen years without drawing it on a man. (70 words)

### The handover (level 1, start; DESIGN.md 2, "The sheathed sword")

Adittan, an older man of Ilamaran's company, waits by the first stairs.
Walking into him plays the scene. If the 2 s scene holds one line, use
the third.

> **Adittan:** Your father carried this. Now you do.
> **Ilamaran:** Do I draw it here?
> **Adittan:** Never among our own. Draw it where the king's son sends you.

Adittan knows a muster, not a voyage: he cannot name Kadaram in 1010.

## 4. In-level hints and floats

Positions follow `docs/levels/LEVEL-N.md` section 9, still in revision;
the x values here may shift, and the four traversal lines wait for the
level designer to place each piece's first use (DESIGN.md 2a). Each
level's first gate links lanes 0 and 1 only, so the gate lines promise ↑
and nothing else. All under 12 words. Touch versions swap "↑" for "tap
▲" and "J or X" for "tap ⚔" (DESIGN.md 8).

| Where | Text |
|---|---|
| Level 1, double jump (x 1000) | Jump again in the air. The step is high. |
| Level 1, first scaffold pole | A scaffold pole. Hold ↑ to climb. |
| Level 1, first scaffold planks | ↓ and jump to drop through the planks. |
| Level 1, first hauling rope | A hauling rope. Jump to it, then climb. |
| Level 1, first block on rollers | Stone on rollers. Lean into it to push. |
| Level 1, first gate (x 1740) | The lamp marks a gate. ↑ the cloister roof. |
| Level 2, first gate (x 260) | Lamplit again. ↑ the warehouse ledge. |
| Level 2, climb (x 320) | Up the bales. Height hides you. |
| Level 3, draw prompt before the first fighter (x 200) | Here the sword comes out. J or X. |
| Level 3, first cut, once (optional) | My father's blade, out for the first time. |
| Level 3, first gate (x 340) | A lamp in the rain. ↑ the stilt walk. |
| Up or down pressed away from a gate (replaces "no crossing here") | No gate here. Find the lamp. |
| Attack in level 1: blade pushed home; first press and after 30 s | Back in the sheath. Not among our own. |
| Attack in level 2, same rule | Back in the sheath. Not before the far shore. |
| Checkpoint reached (replaces "Banner planted") | The banner is planted. Breathe. |
| Level 1, CP2 (x 2900), replaces the checkpoint line | The tower. I did not know stone went that high. |
| Level 2, CP2 (x 3030), replaces the checkpoint line | A foreign king's house of monks. Nobody minds it. |
| Level 3, CP4 (x 5100), replaces the checkpoint line | A wall of timber. Men in front. No way round. |
| Return to checkpoint after a fall or third heart (replaces "Fallen") | Back to the banner. |
| Guard spots the hero (DESIGN.md 3 asks for a shout) | Hoi! You there! |

Struck from the build: "+1 kasu," "Guard felled," and the end-screen
stats line (DESIGN.md 4, 5, 6).

## 5. The ending

**Eyebrow (record):** 1025 CE · Kadaram has fallen

**Title (fixed):** The Sea Belongs to the Tiger

**Body (Ilamaran):**
That is what the men are shouting on the beach, and the banner is up on
the wall, so it must be so. The king of Kadaram is in a boat under guard.
I did not see his face.

**The line of cost:**
Sattan, son of Kandan, of Anaimangalam, who slept on the deck beside me
from Nagapattinam, is in the river, and his mother does not know.

**Closing line (record, replaces "the only great overseas naval
expedition"):**
This was the largest overseas expedition any Indian ruler is known to have
sent. It was a raid; no Chola rule followed. Three years later Srivijaya
sent envoys to China, as it always had.

**Button:** Sail again

No numbers appear on this screen (Pillar 3).

## 6. Sources screen

**Documented:** the temple and the gold-plated finial of 1010 (SII II
no. 1); Rajendra as the king's son, co-regent from 1012; the Buddhist monastery at
Nagapattinam, funded by Srivijaya's kings with Rajaraja's grant (Larger
Leiden plates, 1006); sewn-plank hulls; the 1025 raid, the captured king,
the seized gateway (Rajendra's Thanjavur inscription); Srivijaya's embassy
to China in 1028 (*Song Shi* 489). Whether the thirteen places fell in one
campaign is disputed; the game follows Kulke. **Invented:** Ilamaran,
Adittan, Sattan, every guard, fighter, and route, the lamplit gates, and the gold
kasu scattered on the road. Nobody knows how many ships sailed or how long
the crossing took.

**Read further:** Nilakanta Sastri, *The Cōḷas* (1955). Kulke, Kesavapany
and Sakhuja, eds., *Nagapattinam to Suvarnadwipa* (2009). Balasubrahmanyam,
*Middle Chola Temples* (1975). (118 words)

## 7. Names and terms

| On screen | What it is |
|---|---|
| Ilamaran | The hero, a common soldier (sevagan) of the fleet. Invented; RESEARCH.md 4 does not object. |
| Adittan | Older man of Ilamaran's company; hands him his father's sword. Invented, attested name, no rank. |
| Sattan, son of Kandan | Ilamaran's deckmate, lost at Kadaram. Invented, attested "X son of Y of village Z" form. |
| Rajaraja | Rajaraja I, king 985–1014, builder of the temple. "The king," never "emperor." |
| Rajendra | Rajendra I, the king's son; co-regent 1012; king 1014–1044; sent the fleet of 1025. |
| Thanjavur | Chola capital; the Brihadisvara temple, finished 1010, tower over sixty metres. |
| Nagapattinam | Main eastern port; the Chudamani vihara, a Buddhist monastery funded by Srivijaya. |
| Anaimangalam | Village granted to the vihara in 1006; Sattan's home. |
| Srivijaya | Malay Buddhist kingdom centered on Palembang, Sumatra. |
| Kadaram | Kedah, Malay peninsula. "Kadaram has fallen" is a Chola boast. |
| kasu | Chola coin and unit of account (SII II). Gold by game convention. Never counted. |
| sevagan | A common soldier. Glossed here; used once in Chapter II. |
| tiger | The Chola emblem, on a crimson field on a pole (DECISIONS.md 4). |

## Open questions for Gaurav

None.

## Revision notes

- 2026-10-25, third draft (DECISIONS.md 10; NOTES.md request): handover
  scene, per-level push-home lines, draw prompt, first-cut line, four
  traversal hints, title key text. Budget raised to 1,700.
- 2026-10-25, second draft: all seven findings of the script review taken
  (hint positions, ↑-only gates, mid-level lines, gateway, no rowing,
  Kadaram shore, Rajendra's tag).
- 2026-10-25, first draft: every `index.html` string rewritten against
  RESEARCH.md.
