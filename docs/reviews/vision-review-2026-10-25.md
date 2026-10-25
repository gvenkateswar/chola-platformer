# Vision review, 2026-10-25

Reviewer: vision-critic. Document: `docs/VISION.md`, first draft of
2026-10-25. Judged against `index.html` (1,735 lines), `ASSETS.md` (sixteen
slots, ten files present in `assets/`), and a web check of the one outside
claim. `docs/RESEARCH.md` did not exist at review time, so the historical
stance (section 6) is checked only for internal consistency; the check against
the historian's sources is pending.

## Verdict

**Not ready.** The document answers its largest open question in two different
places (section 6 forbids what section 8 asks Gaurav to decide), and the
pillars are silent on the combat the build already has.

## Findings

### 1. Section 6 decides open question 3

Quote, section 6: "The hero never harms civilians and never kills Chola
people."

Quote, section 8: "**3. May Ilamaran kill Chola guards?** ... Options: (a)
keep it and call them rebels or bandits; (b) no combat in the Chola levels ...
(c) sparring partners".

The historical stance states as a rule what the open question offers as a
choice. A designer reading section 6 will cut guard combat from levels 1 and 2
before Gaurav has answered. The build today has three guards on the Thanjavur
main path (`G.push([1330,1700,620,1],[2650,3010,620,1],[4460,4900,620,1])`)
and the attack logic ends with "Guard felled". Option (a) keeps that and is
allowed by nothing in section 6.

Fix: replace the sentence in section 6 with "Whether the hero may fell Chola
guards is open question 3; section 6 follows Gaurav's answer. Whatever he
decides, the hero never harms civilians, and there is no gore: falls, not
blood." Delete "never kills Chola people" until the question is closed.

### 2. The pillars cannot rule on the build's own enemy, or on stealth or trading

Quote, Pillar 2: "The player is an ordinary person of the fleet. Rulers,
battles, and treaties are seen from the deck and the road, and the player
never decides them."

Test against six decisions:

| Decision | Pillar 1 | Pillar 2 | Pillar 3 |
|---|---|---|---|
| Lane switching at gates | yes | silent | silent |
| Coin collecting | silent | silent | yes to the trail, no to the tally; silent on the HUD counter (`coins taken / total`, line 1604) |
| Guards as the only enemy | silent | silent | silent |
| A boss fight | silent | no, but only "the maharaja of Kadaram"; silent on a Srivijayan captain | silent |
| A stealth section | silent | silent | silent |
| A trading mini-game | silent | silent | silent |

Felling a guard does not decide a ruler, a battle, or a treaty, so Pillar 2
does not speak to it. Stealth and trading, both plausible for a sailor at a
port, get no ruling from any pillar. A pillar that only rules on the two
examples its author chose is an example list.

Fix: give each pillar a line that rules on violence, waiting, and commerce.
Pillar 2, after Gaurav answers question 3: "Approves: a fight that the road
forces on the player. Rejects: a fight the player could walk past, a named
opponent of any rank, and any reward for a kill." Pillar 3: "Approves: a
stealth stretch, if it still moves east. Rejects: any stop that holds the
player in one place to earn something: a trading stall, a shop, a timed
challenge."

### 3. The sea pillar has no sea in it, and scope settles question 1(c)

Quote, Pillar 3: "The player moves forward, toward water and then across it".

Quote, section 1: "as Rajendra's fleet sails east".

Quote, section 7: "Later releases may add a ship-deck level between
Nagapattinam and Kadaram; the first one does not."

Quote, revision notes: "the player never stands on water except one ship deck
in level 2."

The pillar promises a crossing; the scope rules out the only level that would
show one; the crossing happens in an interstitial card. The pitch's "sails
east" is something the player watches a title card say. And the scope sentence
decides option (c) of open question 1, which is listed for Gaurav.

Fix: either put the crossing in scope ("Level 2 ends on the deck of a ship
pulling away from the quay, a 40-second stretch with no enemies") or rewrite
the pillar to cover what the game actually does: "Every level is a leg of one
road east. The player moves forward and nothing asks them to turn back or
grind." Move "the first one does not" out of section 7 and into the
recommendation for question 1.

### 4. The player fantasy describes a build that does not exist and makes a false uniqueness claim

Quote, section 2: "when you step through a lamplit gate you walk into that
haze and the near world blurs behind you. Nothing else lets you change which
layer of the picture you stand in."

In the build, blur is fixed: `ctx.filter = 'blur(1.8px)'` on the far and mid
backdrop (line 1634) and `blur(3px)` on the foreground dressing (line 1670),
regardless of the player's lane. A player on lane 0 is drawn under a flat haze
fill (`ctx.fillStyle = level.fogHaze; ctx.fillRect(0,0,W,H)`, lines
1641-1642); the near world does not blur, and the far world does not sharpen.
That may be the right design, but the vision presents it as what the game
does.

The uniqueness claim is wrong. LittleBigPlanet (2008) has three playable
depth layers the player steps between; Mutant Mudds (2012) jumps between
foreground and background planes; Virtual Boy Wario Land (1995) did it first.
The vision-critic brief treats unsupported claims as failures, and a designer
who repeats this one in a pitch will be corrected by the first person who has
played LittleBigPlanet.

Fix: "When you step through a lamplit gate you walk into that haze and play
goes on inside it. LittleBigPlanet and Mutant Mudds let you change layers;
neither makes the layer a wash of paint, and neither makes you earn the
crossing at a gate." Then put "the near world blurs when the player is in the
far lane" in a note to the game-designer as a proposal, tagged as not yet
built.

### 5. Scope ships Chola guards as the Srivijayan enemy, which section 6 forbids

Quote, section 6: "Srivijayans are a kingdom with a navy and temples, drawn
with the same care as the Cholas, never faceless."

Quote, section 7: "the sixteen asset slots in `ASSETS.md` filled, including
the guard and gate slots that are still procedural ... One enemy type per
level, two at most."

`ASSETS.md` has one enemy, "a Chola imperial guard" in "deep crimson lamellar
armor" (slots 11 and 12). The build spawns the same figure in level 3
(`cloth:'#8C2F22', ... isGuard:true`, line 1541). Filling the kit as listed
delivers a Srivijaya level whose only inhabitants are Chola guards. Section 6
says the Srivijayans must have faces; section 7 budgets none.

Fix: add to section 7: "One painted Srivijayan enemy in two poses, to be added
to `ASSETS.md` as slots 17 and 18; the kit's Chola guard appears in levels 1
and 2 only, or not at all, per open question 3." Write the request to the
art-director in `docs/NOTES.md`.

### 6. Pillars 1 and 3 describe other games

Quote, Pillar 1: "Every scene is one ink-and-watercolor painting, and play
happens inside its layers; haze and blur measure distance."

Haze and blur measuring distance is atmospheric perspective, which Ori and the
Blind Forest, Rayman Legends, and Forgotton Anne all do. The ink-and-watercolor
part is Ōkami's. The thing only this game does, crossing between layers at a
painted gate, is in the Approves line, not the pillar.

Quote, Pillar 3: "The player moves forward, toward water and then across it,
and nothing asks them to turn back or grind."

That is Journey, Inside, and Limbo. It is also a scope rule (linear, no
backtracking) wearing a pillar's clothes.

Fix: Pillar 1: "Every scene is one ink-and-watercolor painting with three
depths a person can stand in, and the player crosses between them only at
painted gates, leaving an ink mark each time." Pillar 3: "Every level is a leg
of one voyage east, and the game never counts, ranks, or rewards what the
player left behind." That second line also closes a gap: the end screen
counts falls and minutes (`${deaths} fall ... ${mins.toFixed(1)} min voyage`,
line 781) and the pillar rejects only the kasu tally.

### 7. The audience is asserted without evidence

Quote, section 4: "The core is adults from 25 to 50 who know the Chola name
from Ponniyin Selvan, a textbook, or a grandparent, and who play short story
games on a laptop: Gris, Journey, a Rayman level. They have never seen
Nagapattinam drawn."

Quote, section 8: "doubles the people who will send the link to a cousin."

No source for the age band, the platform, or the overlap between Ponniyin
Selvan viewers and Gris players. "Doubles" is a number from nowhere.
"Never seen Nagapattinam drawn" is unknowable and probably false for anyone
who has seen the second Ponniyin Selvan film. CLAUDE.md asks for a source or
a tag on factual claims.

Fix: "Core [assumed]: adults who watched Ponniyin Selvan and own a laptop; we
have no data on how many of them play games, and the first ten playtests will
say whether this ring exists. Outer ring [assumed]: their children, 10 and up."
Replace "doubles the people who will send the link" with "and costs nothing
the core would miss."

### 8. No length is stated, and the document breaks one style rule

Quote, CLAUDE.md: "Each document states a length. Over budget means not
finished."

The vision states no length. It is 1,430 words. Section 8 (open questions) is
331 words, the longest section, longer than the pillars (248). Section 2
(player fantasy) is 150 words, a third of which (finding 4) describes an
unbuilt feature.

Quote, Pillar 2 heading: "A sailor, not a king". Quote, section 2: "Other
games about kings put the crown on your head; this one puts a sword at your
hip". Quote, section 5: "the stroke belongs to the picture, never a filter
laid over it." CLAUDE.md: "No 'this isn't X, it's Y' constructions."

Fix: add under the title: "Budget: 1,200 words. Sections 1 to 7 under 900;
section 8 under 300." Rename Pillar 2 "One of the crew." Rewrite the section 2
sentence as "You carry a sword at your hip and the sea is in front of you, and
the largest event of your century happens around you at eye level." Rewrite
the Ōkami line as "Brush and ink are a visible material of the world; every
stroke is part of the picture."

## Pending

The historical stance cannot be checked against `docs/RESEARCH.md` because
it does not exist yet. When it arrives, check in particular: the end screen's
"only great overseas naval expedition in Indian history"; whether "kasu" is
the right coin for 1010 CE Thanjavur; whether "Kadaram" is the historian's
preferred name; and the name Ilamaran (question 5).

The "Son of Thanjai" claim checks out: Ayelet Studio, you play a Chola king
in 11th-century Thanjavur, due spring 2027. Section 5's "3D cinematic" is
consistent with the published trailers.

## What works

The crimson rule is the best sentence in the document: "crimson is the only
loud thing on screen, and it means Chola: a sash, a banner, a bird, a guard's
armor. Nothing else gets it." It names the objects, so an artist can obey it.
The Approves and Rejects lines cite the real build (the awnings, the kasu
tally) rather than hypotheticals. Open question 3 has three distinct options
and a reason for the recommendation. The revision notes admit what was not
checked. The Son of Thanjai distinction is accurate and useful. Keep all of
it.
