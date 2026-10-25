# Chola: Tides of Bronze — Vision

Owner: creative-director. Readers: everyone. Third draft, 2026-10-25,
revised after Gaurav's rulings in `docs/DECISIONS.md`, two vision-critic
reviews in `docs/reviews/`, and the historian's note in `docs/RESEARCH.md`.

Budget: 1,200 words for sections 1 to 8 (sections 1 to 7 at most 900,
section 8 under 300), counting prose and table cells, not headings. Revision
notes sit outside the budget.

## 1. The game in one sentence

A common Chola soldier of the fleet runs from Thanjavur's temple to the
Srivijaya shore, crossing between the depth layers of an ink-and-watercolor
world at lamplit gates.

## 2. Player fantasy

You are nobody: one soldier on one ship among many, and the emperor will
never learn your name. A sword at your hip, the sea in front of you, and your
century's largest event happening around you at eye level.

You move through a painting: the temple is a wash of umber in morning haze;
step through a lamplit gate and you walk into the haze, and play goes on
inside it. LittleBigPlanet and Mutant Mudds also change layers; neither
paints the layer or makes you earn the crossing at a gate.

Then eleventh-century Tamil country and a strange shore, under a tiger
banner.

## 3. Pillars

### Pillar 1: The painting has depth and one color

Every scene is one ink-and-watercolor painting with three depths to stand
in; the player crosses between them only at painted gates, leaving an ink
mark each time. Crimson means Chola; nothing else gets it.

Approves: lane switching at the gates.

Rejects: Nagapattinam's green awnings; a crimson guard standing in for a
Srivijayan.

### Pillar 2: One of the crew

The player is an ordinary person of the fleet, who sees rulers, battles,
and treaties from the deck and the road and never decides them.

Approves: a fight the road forces on the player, first in Kadaram.

Rejects: a fight staged for its own sake (an arena, a wave, an enemy where
no route passes); a Chola opponent; a named opponent of any rank; any reward
for a kill.

### Pillar 3: The voyage only goes east

Every level is a leg of one voyage east, and the game never counts, ranks,
or rewards what the player left behind.

Approves: kasu that lead the eye to the better route; a stealth stretch, if
it still moves east.

Rejects: any stop to earn something in place (a stall, a shop, a timed
challenge); the tallies of kasu, falls, and minutes.

### Rulings on six decisions

| Decision | Ruling |
|---|---|
| Lane switching at gates | 1 approves. |
| Coins | 3: trail stays; HUD counter, end tally, "+1 kasu" float, and chime go; a pickup is only an ink bloom. |
| Chola guard as only enemy | 2 rejects (DECISIONS.md, 3); 1 rejects the crimson stand-in. |
| A boss fight | 2 rejects at any rank. |
| A stealth section | 3 approves; 2 is silent. |
| A trading mini-game | 3 rejects. |

Conflicts are deliberate: 1 lingers, 3 moves; 2 wants a small ending, the
title a large one. 1 gives a way around every enemy, 2 wants fights the
road forces: in Kadaram, 2 wins at the gateway, 1 everywhere else. The
designer records which won.

## 4. Audience

Settled (DECISIONS.md, 2): adults first, built so a ten-year-old can finish
it.

Core [assumed]: adults 25 to 50, diaspora or Ponniyin Selvan readers, who
own a laptop. No data says how many play games; ten playtests will tell. Outer ring [assumed]: their
children, 10 and up, who play Hollow Knight and Celeste and will tolerate
history if the jumping is good.

What makes both stop: a cheap death, a fall that resets a whole stretch or
a guard who hits from off screen. Then the painting stops mattering.

## 5. Tone and references

**Gris (Nomada Studio).** A world almost monochrome, where one color carries
all the feeling. Ours is crimson, the only loud thing on parchment and
umber, and it means Chola: a sash, a banner, a bird, a guard's cloth.
Nothing else gets it.

**Ponniyin Selvan (Kalki).** Its texture: the lamp-lit mutts, the boatmen
and spies, the gossip of the road. Not its hero, who is a prince's friend.
Interstitials speak from the road, never from the throne.

**Ōkami (Clover).** Brush and ink are a visible material of the world; every
stroke is part of the picture. Gates, lane shifts, and ink clouds look
painted on, with edges that bleed.

Not a reference: Son of Thanjai (Ayelet Studio), 3D, cinematic, a Chola king
in Thanjavur. We are 2D, painted, one of the crew.

## 6. Historical stance

Three rules. First, anything shown as fact carries the historian's
[documented] tag or is rewritten as what Ilamaran believes; the end screen's
"only great overseas naval expedition" fails and becomes "the largest
overseas expedition any Indian ruler is known to have sent." Second,
invention is free below the rank of commander, in spoken lines, and in
level layouts; forbidden for places, dates, rulers, dress,
weapons, coins, and architecture, which follow `docs/RESEARCH.md`. Third,
Srivijayans are a kingdom with a navy and temples, drawn with the same care
as the Cholas, never faceless. The raid is one campaign, after Kulke; the
sources screen notes the dispute.

Settled (DECISIONS.md, 3 and 4): Ilamaran never harms civilians or kills
Chola people; the sword is first drawn in Kadaram; the ending adds one line
of cost. Falls, not gore.

## 7. Scope for the first release

Three levels, 4 to 6 minutes each, 15 to 20 minutes end to end. Browser
only, keyboard and touch, one `index.html` plus `assets/`. Levels 1 and 2
are traversal and stealth; the Chola guard is an obstacle there and absent
from level 3 (DECISIONS.md, 3). One painted Srivijayan enemy in two poses,
`ASSETS.md` slots 17 and 18. Guard, gate, and mid-band slots filled, the
guard redrawn per RESEARCH.md; the five hero poses (slots 6 to
10) regenerated with the straight sword and cotton sash (DECISIONS.md, 6).
Three interstitials, one ending, one sources screen.

Out of scope: saving, difficulty settings, voice, new music, Tamil
localization, boss fights, upgrades, leaderboards, app-store
wrapping, and the ship-deck level (release two, DECISIONS.md, 1). The name
Ilamaran stays (DECISIONS.md, 5).

## 8. Open questions for Gaurav

None. Six questions were ruled on 2026-10-25; see `docs/DECISIONS.md`. New
questions go here as they arise.

## Revision notes

- 2026-10-25, three drafts in one day. First draft: written from the build
  and art kit before `docs/RESEARCH.md` existed, with five open questions.
  Second: Gaurav ruled on all five (DECISIONS.md 1 to 5); the critic's eight
  findings applied (pillars rule on combat, stealth, and trade; false
  uniqueness claim removed; audience tagged [assumed]; budget stated); the
  historian's three corrections taken. Third: the critic's six smaller
  findings applied (Pillar 1 retitled for the crimson rule, Pillar 2 no
  longer rejects fights the lanes create, table cells corrected, Ponniyin
  Selvan reference fixed, diaspora restored, "+1 kasu" float and chime
  ruled out); hero redraw settled by DECISIONS.md 6.
- Two pushbacks kept: revision notes sit outside the word budget, and the
  ship-deck beat at the end of level 2 is a proposal to the game-designer
  (NOTES.md), not scope, since the deck level is release two. Point-by-point
  replies are in `docs/reviews/` and git history.
