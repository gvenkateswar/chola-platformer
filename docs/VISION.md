# Chola: Tides of Bronze — Vision

Owner: creative-director. Readers: everyone. Second draft, 2026-10-25,
revised after Gaurav's rulings in `docs/DECISIONS.md`, the vision-critic's
review in `docs/reviews/vision-review-2026-10-25.md`, and the historian's
note at the top of `docs/RESEARCH.md`.

Budget: 1,200 words for sections 1 to 8 (sections 1 to 7 at most 900,
section 8 under 300), counting prose and table cells, not headings. Revision
notes sit outside the budget.

## 1. The game in one sentence

A common Chola soldier of the fleet runs from Thanjavur's temple to the
Srivijaya shore, crossing between the depth layers of an ink-and-watercolor
world at lamplit gates.

## 2. Player fantasy

You are nobody: one soldier on one ship among many, and the emperor will
never learn your name. A sword at your hip, the sea in front of you, and the
largest event of your century happening around you at eye level.

You move through a painting. The temple is a wash of umber in the morning
haze; step through a lamplit gate and you walk into that haze, and play goes
on inside it. LittleBigPlanet and Mutant Mudds let you change layers;
neither makes the layer a wash of paint or makes you earn the crossing at a
gate.

And you go where almost no game has gone: eleventh-century Tamil country,
then a strange shore, under the banner of a tiger.

## 3. Pillars

### Pillar 1: The painting has depth

Every scene is one ink-and-watercolor painting with three depths a person
can stand in, and the player crosses between them only at painted gates,
leaving an ink mark each time. Crimson means Chola; nothing else gets it.

Approves: lane switching at the gates.

Rejects: Nagapattinam's green and purple awnings; a crimson Chola guard
standing in for a Srivijayan.

### Pillar 2: One of the crew

The player is an ordinary person of the fleet. Rulers, battles, and treaties
are seen from the deck and the road, and the player never decides them.

Approves: a fight the road forces on the player, first in Kadaram.

Rejects: a fight the player could walk past, a named opponent of any rank,
and any reward for a kill.

### Pillar 3: The voyage only goes east

Every level is a leg of one voyage east, and the game never counts, ranks,
or rewards what the player left behind.

Approves: kasu that lead the eye to the better route; a stealth stretch, if
it still moves east.

Rejects: any stop that holds the player in place to earn something (a stall,
a shop, a timed challenge); the tallies of kasu, falls, and minutes.

### Rulings on six decisions

| Decision | Ruling |
|---|---|
| Lane switching at gates | 1 approves. |
| Coins | 3: trail stays; HUD counter and end tally go. |
| Chola guard as only enemy | 1 and 2 reject (DECISIONS.md, 3). |
| A boss fight | 2 rejects, at any rank. |
| A stealth section | 2 and 3 approve. |
| A trading mini-game | 3 rejects. |

The pillars conflict on purpose (1 lingers, 3 moves; 2 wants a small ending,
the title a large one). The designer records which won and why.

## 4. Audience

Settled: history-minded adults first, built so a ten-year-old can finish it
(DECISIONS.md, 2).

Core [assumed]: adults 25 to 50 who watched or read Ponniyin Selvan and own
a laptop. We have no data on how many play games; the first ten playtests
will say whether this ring exists. Outer ring [assumed]: their
children, 10 and up, who play Hollow Knight and Celeste and will tolerate
history if the jumping is good.

What makes both stop: a cheap death. A fall that resets a whole stretch, or
a guard who hits from off screen, and the painting stops mattering.

## 5. Tone and references

**Gris (Nomada Studio).** A world almost monochrome, where one color carries
all the feeling. Our palette is parchment and umber; crimson is the only
loud thing on screen, and it means Chola: a sash, a banner, a bird, a
guard's cloth. Nothing else gets it.

**Ponniyin Selvan (Kalki).** A low-ranking traveler carries messages through
great events and sees princes only from across a courtyard. Interstitials
speak from that vantage, never from the throne.

**Ōkami (Clover).** Brush and ink are a visible material of the world; every
stroke is part of the picture. Gates, lane shifts, and ink clouds should
look painted on, with edges that bleed.

Not a reference: Son of Thanjai (Ayelet Studio), 3D and cinematic, where you
play a Chola king in Thanjavur. We are 2D, painted, and one of the crew.

## 6. Historical stance

Three rules. First, anything shown as fact carries the historian's
[documented] tag or is rewritten as what Ilamaran believes; the end screen's
"only great overseas naval expedition" fails and becomes the historian's
"largest overseas expedition any Indian ruler is known to have sent."
Second, invention is free for people below the rank of commander, spoken
lines, and level layouts; it is forbidden for places, dates, rulers, dress,
weapons, coins, and architecture, which follow `docs/RESEARCH.md`. Third,
Srivijayans are a kingdom with a navy and temples, drawn with the same care
as the Cholas, never faceless. The raid is one campaign, after Kulke; the
sources screen notes the dispute.

Settled (DECISIONS.md, 3 and 4): Ilamaran never harms civilians or kills
Chola people; the sword is first drawn in Kadaram; the ending adds one line
of cost. Falls, not gore.

## 7. Scope for the first release

Three levels, 4 to 6 minutes each, 15 to 20 minutes end to end. Browser
only: one `index.html`, assets in `assets/`, keyboard and touch, 1280 by 720
scaled. Levels 1 and 2 are traversal and stealth; the Chola guard is an
obstacle there and absent from level 3 (DECISIONS.md, 3). One painted
Srivijayan enemy in two poses, `ASSETS.md` slots 17 and 18 (request in
`docs/NOTES.md`). Guard, gate, and mid-band slots filled, the guard redrawn
to the historian's findings. Three interstitials, one ending with its line
of cost, one sources screen.

Out of scope: saving, difficulty settings, voice, music beyond the current
drone, Tamil localization, boss fights, upgrades, leaderboards, app-store
wrapping, and the ship-deck level (release two, DECISIONS.md, 1). The name
Ilamaran stays (DECISIONS.md, 5).

## 8. Open questions for Gaurav

None. The first draft's five questions were ruled on 2026-10-25; see
`docs/DECISIONS.md`. New questions go here as they arise.

## Revision notes

### 2026-10-25, second draft

Gaurav accepted all five recommendations (DECISIONS.md). The open questions
are removed and their rulings appear in sections 4, 6, and 7 with citations.
Replies to the critic's eight findings:

1. **Section 6 decided question 3.** Agreed that the draft did. The question
   is now closed by ruling 3, so section 6 states it as settled and cites
   DECISIONS.md. The critic's interim wording was not needed.
2. **Pillars silent on combat, stealth, trade.** Accepted. Pillar 2 took the
   critic's Approves and Rejects lines; Pillar 3 took the stealth and
   commerce lines. A six-row rulings table follows the pillars so the test
   lives in the document. One addition the critic did not ask for: Pillar 1
   also rules on the enemy, through the crimson rule, since a crimson guard
   cannot stand in for a Srivijayan.
3. **Sea pillar with no sea; scope settled 1(c).** Accepted in the second
   form. Gaurav ruled the ship-deck level into release two, so the crossing
   stays off screen and the pillar was rewritten to cover what the game
   does; the pitch no longer says the player sails. The critic's 40-second
   deck stretch at the end of level 2 is a good idea and goes to the
   game-designer in NOTES.md as a proposal, since it is a level decision.
4. **Blur claim and false uniqueness.** Accepted in full; the critic's
   replacement text is used. Lane-dependent blur goes to the game-designer
   in NOTES.md, tagged as not built.
5. **Chola guards shipped as the Srivijayan enemy.** Accepted. Section 7
   budgets a painted Srivijayan enemy (slots 17 and 18) and confines the
   Chola guard to levels 1 and 2 as an obstacle, per ruling 3. The request
   to the art-director is in NOTES.md.
6. **Pillars 1 and 3 described other games.** Accepted. Both definitions use
   the critic's wording; Pillar 3 rejects the fall and minute tallies as
   well as the kasu tally, and its heading changed to match.
7. **Audience asserted without evidence.** Accepted. Core and outer ring are
   tagged [assumed] in the critic's wording; "never seen Nagapattinam drawn"
   and "doubles" are gone.
8. **No length stated; style rule broken.** Accepted. Budget line added;
   Pillar 2 is "One of the crew"; the three flagged sentences are rewritten.
   One clarification: revision notes sit outside the 1,200-word budget,
   since a point-by-point reply is required and would otherwise crowd out
   the vision.

From the historian's note (RESEARCH.md, top and section 4): "one oarsman in
a fleet of hundreds" is unsupported and is now "one soldier on one ship
among many"; the end-screen claim is replaced with the historian's wording
in section 6; Ilamaran stays. The historian's question 10 (one campaign or
several) is ruled in section 6: one campaign, with the disagreement named on
the sources screen. The guard's crimson now reads "cloth" in section 5,
since RESEARCH.md finds no lamellar armor in Chola sources.

### 2026-10-25, first draft

Written against the build before `docs/RESEARCH.md` existed. Play notes that
shaped it: painted backdrops and hero poses load, guards and gates are
procedural; the hero fought Chola guards in Chola cities; Nagapattinam
awnings break the palette; the end screen counts coins; the navy is named on
the title screen but the player never stands on water except one ship deck
in level 2.
