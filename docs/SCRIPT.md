# Chola: Tides of Bronze — Script

Owner: narrative-designer. Readers: builder, design-critic, level-designer.
First draft, 2026-10-25. Budget 1,500 words including the text itself.
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

**Key legend, one change:** "J / X sword" becomes "J / X sword · from
Chapter III."

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

**Date line:** 1025 CE · the Merbok river

Rain. The river is flat and brown and the houses stand in it on legs. One
mountain behind, in cloud. They say the king of Kadaram keeps elephants
and a gate of jewels; I will see neither. Our line goes to a timber wall
with a carved gateway, and the men in front of it know this ground. I have
carried this sword fifteen years without drawing it on a man. (69 words)

## 4. In-level hints and floats

`docs/levels/*.md` did not exist when this was written. These hints sit at
the build's current `hints:` x positions and replace the build's existing
floats. Positions may move when the level designer sets the first gate of
each level (DESIGN.md 9, rule 4). All under 12 words; glyphs as built.

| Where | Text |
|---|---|
| Level 1, first gate (x 2780) | The lamp marks a gate. ↑ far path, ↓ near. |
| Level 2, first gate (x 2010) | Lamplit again. ↑ the warehouse ledge, ↓ the wharf. |
| Level 3, first gate (x 2860) | A lamp in the rain. ↑ the walkway, ↓ the stones. |
| Up or down pressed away from a gate (replaces "no crossing here") | No gate here. Find the lamp. |
| Attack pressed in levels 1 and 2, once per level (DESIGN.md 3) | Not here. Not against our own. The sword waits. |
| Checkpoint reached (replaces "Banner planted") | The banner is planted. Breathe. |
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
Sattan, son of Kandan, of Anaimangalam, who rowed the bench beside mine
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
no. 1); Rajendra as the king's son and general; the Buddhist monastery at
Nagapattinam, funded by Srivijaya's kings with Rajaraja's grant (Larger
Leiden plates, 1006); sewn-plank hulls; the 1025 raid, the captured king,
the seized gateway (Rajendra's Thanjavur inscription); Srivijaya's embassy
to China in 1028 (*Song Shi* 489). Whether the thirteen places fell in one
campaign is disputed; the game follows Kulke. **Invented:** Ilamaran,
Sattan, every guard, fighter, and route, the lamplit gates, and the gold
kasu scattered on the road. Nobody knows how many ships sailed or how long
the crossing took.

**Read further:** Nilakanta Sastri, *The Cōḷas* (1955). Kulke, Kesavapany
and Sakhuja, eds., *Nagapattinam to Suvarnadwipa* (2009). Balasubrahmanyam,
*Middle Chola Temples* (1975). (118 words)

## 7. Names and terms

| On screen | What it is |
|---|---|
| Ilamaran | The hero, a common soldier (sevagan) of the fleet. Invented name; RESEARCH.md 4 does not object. |
| Sattan, son of Kandan | Ilamaran's benchmate, lost at Kadaram. Invented, in the attested "X son of Y of village Z" form. |
| Rajaraja | Rajaraja I, king 985–1014, builder of the temple. "The king" in Ilamaran's mouth; never "emperor." |
| Rajendra | Rajendra I, the king's son and general in 1010; co-regent 1012; king 1014–1044; sent the fleet of 1025. |
| Thanjavur | Chola capital; site of the Brihadisvara temple, finished 1010. The tower is over sixty metres; Ilamaran has no metres and does not say so. |
| Nagapattinam | The main eastern port; home of the Chudamani vihara, a Buddhist monastery funded by Srivijaya. |
| Anaimangalam | Village near Nagapattinam granted to the vihara in 1006; Sattan's home. |
| Srivijaya | Malay Buddhist kingdom centered on Palembang, Sumatra, with Kedah in its network. The level-3 enemy is Srivijayan, never a Chola guard. |
| Kadaram | Kedah, on the Malay peninsula; the Merbok estuary, Gunung Jerai behind. "Kadaram has fallen" is a Chola boast and the game says so. |
| kasu | Chola coin and unit of account (SII II). Gold in the game by convention; copper existed. Never counted. |
| sevagan | A common soldier. Glossed here; used once in Chapter II. |
| tiger | The Chola emblem; a tiger on a crimson field on a pole. "The Sea Belongs to the Tiger" is the boast, kept by DECISIONS.md 4. |

## Open questions for Gaurav

None. Two notes for the design-critic instead: the Chapter III date line
names the Merbok river, which is the historian's identification of Kadaram's
port, not something Ilamaran would call it; swap for "the Kadaram shore" if
the record register should stay out of the date lines. And the guard's shout
is one line; cut it if DESIGN.md's "!" is enough.

## Revision notes

- 2026-10-25, first draft. Rewrote every player-facing string in
  `index.html` against RESEARCH.md: "warrior of the Chola navy" to "soldier
  of the fleet"; "young prince Rajendra" to "the king's son and general";
  war elephants off the Nagapattinam docks and pearls, cloth and rice on;
  the Five Hundred of Ayyavole, "monsoon jungle," "citadel of the
  maharaja," and the "sixty-six metres" line removed; "only great overseas
  naval expedition" replaced with VISION.md's wording; Song trade and
  "Tamil merchant guilds" dropped rather than restated. Added the line of
  cost and the inert-attack float. Hints are placed at the build's
  positions because `docs/levels/` was empty. Word count 1,470 including headings.
