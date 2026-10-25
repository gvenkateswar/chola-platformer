# Chola: Tides of Bronze — Vision

Owner: creative-director. Readers: everyone. First draft, 2026-10-25, written
from the build at `index.html`, the art kit in `ASSETS.md`, and a short play
session. `docs/RESEARCH.md` did not exist when this was written; section 6 must
be checked against it when it arrives.

## 1. The game in one sentence

A common Chola sailor runs from Thanjavur's temple to the Srivijaya shore,
slipping between the depth layers of an ink-and-watercolor world as Rajendra's
fleet sails east.

## 2. Player fantasy

You are nobody. You are one oarsman in a fleet of hundreds, and the emperor
will never learn your name. That is the point. Other games about kings put
the crown on your head; this one puts a sword at your hip and a sea in front
of you, and lets you watch the largest event of your century happen around
you at eye level.

You get to move through a painting. The temple is a wash of umber in the
morning haze, and when you step through a lamplit gate you walk into that
haze and the near world blurs behind you. Nothing else lets you change which
layer of the picture you stand in.

And you get to go where almost no game has gone: eleventh-century Tamil
country, then across the Bay of Bengal, on foot, on deck, on a strange shore,
under the banner of a tiger.

## 3. Pillars

### Pillar 1: The painting has depth

Every scene is one ink-and-watercolor painting, and play happens inside its
layers; haze and blur measure distance.

Approves: lane switching at the gates. The far path is the painting's
background, and the ink puff when you cross is the brush.

Rejects: Nagapattinam's green, purple, and teal awnings. Nothing on screen
may be more saturated than the crimson accent.

### Pillar 2: A sailor, not a king

The player is an ordinary person of the fleet. Rulers, battles, and treaties
are seen from the deck and the road, and the player never decides them.

Approves: Rajendra present only as a summons, a banner, and a line of text.

Rejects: a boss fight against the maharaja of Kadaram, or any ending that
says the player won the war.

### Pillar 3: The sea pulls east

Every level is a leg of one voyage. The player moves forward, toward water
and then across it, and nothing asks them to turn back or grind.

Approves: kasu coins that lead the eye along the better route, so the player
learns a gate by chasing them.

Rejects: the end screen's kasu tally. A completion count is a reason to go
back.

The pillars conflict on purpose. Pillar 1 wants the player to linger in the
haze; Pillar 3 wants them moving. Pillar 2 wants a small ending; the current
end screen wants a triumphant one. When they disagree, the designer writes
down which pillar won and why.

## 4. Audience

Two rings, one game. The core is adults from 25 to 50 who know the Chola name
from Ponniyin Selvan, a textbook, or a grandparent, and who play short story
games on a laptop: Gris, Journey, a Rayman level. They have
never seen Nagapattinam drawn. The outer ring is their kids and nephews, 10
and up, who play Hollow Knight and Celeste and will tolerate history if the
jumping is good.

What makes both stop: a cheap death. A fall into water that resets a whole
stretch, or a guard who hits from off screen, and the painting stops
mattering.

## 5. Tone and references

**Gris (Nomada Studio).** A world that is almost monochrome, where one color
carries all the feeling. Our palette is parchment and umber; crimson is the
only loud thing on screen, and it means Chola: a sash, a banner, a bird, a
guard's armor. Nothing else gets it.

**Ponniyin Selvan (Kalki).** A low-ranking traveler carries messages through
great events and sees princes only from the far side of a courtyard. Our
interstitial text is written from that vantage, never from the throne.

**Ōkami (Clover).** Brush and ink as a visible material of the world; the
stroke belongs to the picture, never a filter laid over it. Our gates, lane
shifts, and ink clouds should look painted on, with edges that bleed.

Not a reference: Son of Thanjai (Ayelet Studio), a 3D cinematic action game
where you play a Chola king in Thanjavur. We are 2D, painted, a nobody, and
at sea.

## 6. Historical stance

Three rules. First, anything shown to the player as fact (interstitials, end
screen, sources screen) carries the historian's [documented] tag or is
rewritten as what Ilamaran believes. The end screen's "only great overseas
naval expedition in Indian history" is the first test case. Second, invention
is free for people below the rank of commander, every spoken line, and every
level layout; it is forbidden for places, dates, rulers, dress, weapons,
coins, and architecture, which follow `docs/RESEARCH.md`. Third, Srivijayans
are a kingdom with a navy and temples, drawn with the same care as the
Cholas, never faceless. The hero never harms civilians and never kills Chola
people. Falls, not gore. A sources screen names the historian's primary
works.

## 7. Scope for the first release

Three levels, each 4 to 6 minutes for a first-time player, 15 to 20 minutes
end to end. Browser only: one `index.html` with assets in `assets/`,
playable on GitHub Pages and locally, keyboard and touch, 1280 by 720 scaled
to fit. One hero with the five painted poses already in the kit; the sixteen
asset slots in `ASSETS.md` filled, including the guard and gate slots that
are still procedural. Three interstitial screens, one ending, one sources
screen. Three checkpoints per level. One enemy type per level, two at most.

Out of scope: saving between sessions, difficulty settings, voice, music
beyond the current synthesized drone, Tamil localization (title-screen Tamil
script is a nice-to-have), boss fights, upgrades or unlocks, leaderboards,
app-store wrapping, a fourth level. Later releases may add a ship-deck level
between Nagapattinam and Kadaram; the first one does not.

## 8. Open questions for Gaurav

**1. Lone hero in Thanjavur, or the navy and the expedition?**
Options: (a) stay a lone fighter in Thanjavur, three levels in and around the
city; (b) commit to the voyage: temple, port, foreign shore, as the build
already frames it; (c) the voyage, but a fourth level on the water.
Recommendation: (b). The title screen already calls Ilamaran a sailor, the
painted backdrops already tell this story, and Son of Thanjai has taken
"warrior in Thanjavur." The sea is ours. Keep (c) for release two.

**2. Who is it for?**
Options: (a) history-minded adults; (b) children 8 to 12; (c) adults first,
built so a 10-year-old can finish it.
Recommendation: (c). It costs one rule, no gore and no cheap deaths, and
doubles the people who will send the link to a cousin.

**3. May Ilamaran kill Chola guards?**
Today he fells imperial guards in Thanjavur and Nagapattinam, and the same
crimson guards appear in Srivijaya. Options: (a) keep it and call them
rebels or bandits; (b) no combat in the Chola levels, which become traversal
and stealth, and the sword comes out only on the foreign shore; (c) sparring
partners in Thanjavur who knock you down but are never "felled."
Recommendation: (b). It makes the first drawn blade in Kadaram land, and it
keeps Pillar 2 honest.

**4. What does the ending say?**
Options: (a) keep "The Sea Belongs to the Tiger" and the triumph; (b) keep
the title, add one line on what the raid cost Kadaram and that the fleet
went home; (c) end on Ilamaran, not the empire: he sees the shore and the
screen fades.
Recommendation: (b). The line is good and historically defensible as a
Chola boast; one sentence of cost keeps section 6 true.

**5. Keep the name Ilamaran?**
Options: (a) keep it; (b) let the historian propose a period-attested name;
(c) leave him unnamed, "the sailor."
Recommendation: (a) unless the historian objects. It is already on the title
screen and reads well.

## Revision notes

- 2026-10-25: first draft. Written against the build before
  `docs/RESEARCH.md` existed; section 6 and the end-screen claim need a
  check when it arrives. Play notes that shaped this: painted backdrops and
  hero poses load, guards and gates are still procedural; the hero fights
  Chola guards in Chola cities; Nagapattinam awnings break the palette; the
  end screen counts coins; the navy is named on the title screen but the
  player never stands on water except one ship deck in level 2.
