# Vision review, 2026-10-25, second draft

Reviewer: vision-critic. Document: `docs/VISION.md`, second draft of
2026-10-25. Judged against `index.html`, `ASSETS.md`, `docs/DECISIONS.md`,
`docs/RESEARCH.md` (now present), `docs/NOTES.md`, and the first review.

## Verdict

**Ready with fixes.** The eight first-draft findings are resolved or
reasonably pushed back; what remains is one contradiction between the
historical stance and the hero already in the kit, and one tension between
Pillars 1 and 2 that the conflict paragraph does not name.

## Status of the first review's findings

| # | Finding | Status |
|---|---|---|
| 1 | Section 6 decided question 3 | Resolved. Section 6 cites DECISIONS.md 3; the question is closed by the owner. |
| 2 | Pillars could not rule on combat, stealth, trade | Resolved. All six test decisions get a ruling. See new finding 3 on the table's accuracy. |
| 3 | Sea pillar with no sea; scope settled 1(c) | Resolved by the owner's ruling. The pushback (deck stretch goes to the game-designer as a proposal) is reasonable: it is a level decision, and NOTES.md carries it. |
| 4 | Blur claim and false uniqueness | Resolved. The build-accurate wording is in; lane-dependent blur is in NOTES.md tagged not built. |
| 5 | Chola guards as the Srivijayan enemy | Resolved. Section 7 budgets slots 17 and 18; NOTES.md asks the art-director. |
| 6 | Pillars 1 and 3 described other games | Resolved. Pillar 3 now also rejects the falls and minutes tallies. |
| 7 | Audience unsourced | Resolved. [assumed] tags and a playtest check. See new finding 5 on a mismatch with DECISIONS.md. |
| 8 | No budget; style rule | Resolved. Budget stated; sections 1 to 7 count 900 words by my count (prose and table cells, no headings or table rules), which is at the limit, not over. The pushback that revision notes sit outside the budget is reasonable, since CLAUDE.md requires them; but the notes are now 542 words, more than half the vision, and the point-by-point reply belongs in the next review's status table, not in the document everyone reads. Trim them to the historian's paragraph on the next revision. |

## Historical stance against RESEARCH.md

Section 6 agrees with the historian where it speaks: the end-screen
replacement ("largest overseas expedition any Indian ruler is known to have
sent") is RESEARCH.md 3.3 verbatim; "one soldier on one ship among many"
follows the historian's note; "soldier of the fleet" follows section 4;
"guard's cloth" follows the lamellar finding; the one-campaign ruling answers
the historian's question 10. The gap is what section 6 does not say about the
hero: see new finding 1.

## New findings

### 1. The hero in the kit breaks section 6, and the scope does not budget the fix

Quote, section 6: "invention ... is forbidden for places, dates, rulers,
dress, weapons, coins, and architecture, which follow `docs/RESEARCH.md`."

Quote, section 7: "Guard, gate, and mid-band slots filled, the guard redrawn
to the historian's findings."

Quote, RESEARCH.md section 5: "The kit's 'slightly curved south-Indian sword'
should become 'a straight, broad, double-edged sword with a bronze or brass
grip and disc pommel, in a wooden scabbard.'" And section 4: "'Crimson silk
sash': silk was imported and costly; a soldier's sash is cotton. ... Keep the
color, drop 'silk.'" And: "Sandals [plausible]; bare feet are likelier on
deck."

Five painted hero poses are already in `assets/` with the curved sword. The
scope redraws the guard and says nothing about the hero, so the first release
ships a weapon section 6 forbids. NOTES.md asks the art-director about slots
3, 11, 12, 17 and 18, not 6 to 10. Regenerating five matched poses is the
largest art cost in the kit, and whether to pay it now is Gaurav's call, so
it belongs under section 8, which currently says "None."

Fix: add to section 7: "The hero's five poses stay as painted for release
one; the sword is wrong (RESEARCH.md 5) and is redrawn in release two, or now
if Gaurav rules so." Add to section 8: "**1. Redraw the hero now or in
release two?** The kit's curved sword and silk sash fail section 6. Options:
(a) regenerate the five poses now, before any other art; (b) ship as is and
redraw in release two, with the sources screen noting it; (c) regenerate only
`hero_attack.png`, the one pose where the blade is drawn. Recommendation:
(c), then (a) in release two." Add the hero prompts to the NOTES.md request.

### 2. Pillar 2 rejects the fights Pillar 1's lanes create, and the conflict paragraph does not say so

Quote, Pillar 2: "Approves: a fight the road forces on the player, first in
Kadaram. Rejects: a fight the player could walk past".

Quote, Pillar 1: "the player crosses between them only at painted gates".

In the build every guard patrols one lane (`G.push([x1, x2, groundY,
lane])`), and the canyon, basin and ravine set pieces give the player a far
path and a near path around each guard. That is the game's main mechanic.
Under Pillar 2 as written, a Srivijayan enemy placed on any lane with a gate
nearby is "a fight the player could walk past" and is rejected; the designer
can comply only by removing alternate lanes around every enemy in level 3,
which guts Pillar 1 there. The paragraph that lists the deliberate conflicts
("1 lingers, 3 moves; 2 wants a small ending") does not list this one.

Fix: change the reject to "a fight staged for its own sake: an arena, a
wave, an enemy placed where no route passes." Add to the conflict paragraph:
"1 gives a way around every enemy; 2 wants fights the road forces. In
Kadaram, 2 wins at the gateway and 1 wins everywhere else."

### 3. The rulings table credits pillars with rulings their text does not contain

Quote, table: "Chola guard as only enemy | 1 and 2 reject" and "A stealth
section | 2 and 3 approve".

Pillar 2's text has no line about Chola guards; the nearest is "first in
Kadaram" under Approves, which implies it. Pillar 2 has no line about stealth
at all; only Pillar 3 does. Pillar 1 rejects the guard through "Crimson means
Chola; nothing else gets it", a color rule that has nothing to do with the
pillar's heading, "The painting has depth", and is repeated in section 5.
A designer who reads the pillars and skips the table gets different rulings
from one who reads the table.

Fix: add to Pillar 2's Rejects: "a Chola as the opponent." Change the table
rows to "2 rejects (DECISIONS.md, 3); 1 rejects the crimson stand-in" and
"3 approves; 2 is silent." Move "Crimson means Chola; nothing else gets it"
out of Pillar 1 into section 5 only, where it already lives, or retitle
Pillar 1 "The painting has depth and one color."

### 4. The Ponniyin Selvan reference misdescribes the book

Quote, section 5: "A low-ranking traveler carries messages through great
events and sees princes only from across a courtyard."

Vandiyadevan, the messenger of Kalki's novel, is a prince of the Vanar clan
and becomes the crown prince's companion and the princess's suitor; he is in
the room for most of the great events. The vantage the vision wants, a man
who sees princes only from across a courtyard, is the one thing the book's
hero does not have. RESEARCH.md section 7: "Ponniyin Selvan as history.
Fiction set fifty years earlier; its characters are not sources." A writer
who goes to the novel for the interstitial voice will come back with the
wrong one.

Fix: "**Ponniyin Selvan (Kalki).** Its texture: the lamp-lit mutts, the
boatmen and spies, the gossip of the road. Not its hero, who is a prince's
friend. Interstitials speak from the road, never from the throne."

### 5. The audience drops a group the owner named

Quote, DECISIONS.md 2: "History-minded adults first (25 to 50, diaspora and
Ponniyin Selvan readers)".

Quote, section 4: "Core [assumed]: adults 25 to 50 who watched or read
Ponniyin Selvan and own a laptop."

The ruling names two groups; the vision keeps one. A diaspora adult who has
never read Kalki is in Gaurav's core and outside the vision's.

Fix: "Core [assumed]: adults 25 to 50, diaspora or Ponniyin Selvan readers,
who own a laptop."

### 6. Pillar 3 forbids counting, and the build still counts at every pickup

Quote, Pillar 3: "the game never counts, ranks, or rewards what the player
left behind." Quote, table: "trail stays; HUD counter and end tally go."

The build also prints "+1 kasu" above every coin taken (`floats.push({...
text:'+1 kasu'})`, line 728) and plays a two-note reward chime. Neither the
pillar nor the table rules on them, and "+1" is a count. The designer will
ask.

Fix: add to the table row: "the '+1 kasu' float and the chime go; a coin
taken makes an ink bloom and nothing else."

## What works

Section 8 is honest: it says "None" and points to the ledger, which is what
an owner-ruled document should do. The rulings table is the right shape; it
makes the pillars testable in thirty seconds, and finding 3 is a correction
to two cells, not to the idea. Section 6 now quotes the historian's exact
replacement sentence instead of promising one. The NOTES.md entries are
specific enough to act on. The pitch sentence is now unmistakably this game.
Keep all of it.
