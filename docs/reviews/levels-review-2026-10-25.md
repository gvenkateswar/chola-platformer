# Levels review, 2026-10-25

Reviewer: design-critic. Documents: `docs/levels/LEVEL-1.md`,
`LEVEL-2.md`, `LEVEL-3.md`, first drafts, reviewed as one. Judged against
`docs/VISION.md`, `docs/DECISIONS.md`, `docs/RESEARCH.md` section 3,
`docs/DESIGN.md`, `docs/NOTES.md`, `ASSETS.md`, and `buildLevel1` to
`buildLevel3` in `index.html` (lines 366 to 507).

## Verdict

**Ready with fixes.** The builder notes are in the build's format, and
the platform, gate, guard, and checkpoint numbers cross-check almost
everywhere (gate centers match the prose; every ledge is 92 to 100 px
above its guard; every checkpoint clears a cone). Guard counts match
DESIGN.md's table (5, 6, 5). What blocks the builder is a column with no
unit, three build flags the notes do not set, one wrong cone number, and
slot numbers that do not exist.

## Findings

### 1. The T column has no unit

"| Beat | x | Does | Sees | T | Rule |". The column sums to 31, 27, and
32. As seconds, level 1 lasts half a minute against DESIGN's four; as
ten-second units, the levels run 5.2, 4.5, and 5.3 minutes against
targets of 4, 5, and 6. NOTES.md says "the target times still hold by
arithmetic," but no document shows it. Define T ("seconds for a first-time
player, one wait included") and add a sum line per level against DESIGN 7.

### 2. Crimson wall banners are on in all three levels

Every `buildLevelN` sets `banners:true`, and line 992 draws a "long
crimson banner" on walls. LEVEL-1 section 2 says "no streamers on walls
[invented if shown]"; LEVEL-3 is Srivijayan ground, where crimson is
forbidden (Pillar 1). No builder note sets the flag. Add `banners: false`
to all three. LEVEL-3 also says "killY 760 (visible water)" but only a
`water:` field draws water (level 2 sets 660); add `water: 660`.

### 3. LEVEL-3: "5020 is past his cone" is wrong

S3 patrols "4500–4900"; facing east at 4900 his cone reaches 5200, which
covers the return gate at 5020. The crossing works only "behind him," as
the same cell also says. Write: "5020 is behind him once he turns west;
facing east his cone reaches 5200, so cross after the turn."

### 4. Level 2's two "forced" beats do not force

LEVEL-2 marks the basin and ship 1 with rule 7. After F1 the obstacle is
"gap 2600," a 120 px single jump; after M2, "deck at 4000," a 96 px hop. A
chased hero at 385 clears both without slowing (design review, finding 2).
Only LEVEL-1's pillars at 2480, inside M1's leash, stop anyone. Either
relabel both as lane-choice beats and tell the game-designer the table's
"2" is zero by the corrected definition, or put a stop inside the leash
(a wall-jump onto the deck at 4000, 190 px tall, would do it).

### 5. Slots cited as existing do not exist

LEVEL-2 section 7: "Existing: ... kodi 19, guard reach 22." LEVEL-3:
"Existing: ... kodi 19." ASSETS.md reserves "slots 19 onward" with no
prompts and proposes its own slot 19, `gate_l3.png`. The builder has no
filename to put in `IMGS`. Write "requested (NOTES.md)" and name the file
you want for each, so the art-director's block and the builder's key
agree: `kodi.png`, `guard_reach.png`, and so on.

### 6. Coins are prose, not data

LEVEL-1: "C: stairs 360/460 560/370 770/290; arc 900/280 1000/240
1100/280; lane 0 1860–2220 step 120 y 452; pillar tops." The build takes
`[x, y, lane]`; "pillar tops" and LEVEL-3's "stilt tops" carry no
numbers. List every coin as `[x,y,lane]`, or state one rule the builder
can run: "one coin 40 px above the center of each platform named."

### 7. The first stealth beat is a two-guard read, and the phase is unstated

LEVEL-1 "Wall-walk ... down at G2 before F1." The down-crossing at 2400
is inside F1's sweep (2250 to 2950) and needs M1 below walking west. The
build starts every guard at `x1+30` walking east, so M1 and F1 run in
phase with an 8.4 s period and G2 opens for 2.6 s per cycle, while F1 is
east of 2700. A ten-year-old on the roof sees one guard below and one
ahead and has to time both on the level's first beat. State the window in
the M1 row ("cross down while F1 is east of 2700, 2.6 s each cycle"), or
move F1's patrol to 2700 to 3100 so G2 is outside his sweep, which
matches the beat's own intent ("before F1").

### 8. LEVEL-3 opens inside a cone

"Wait at 200 (cone edge 220)"; start is 50; the sword hint sits at 300,
inside the cone. A child who runs at the start is seen within half a
second, before reading anything. Move S1 to 700 to 1100 (cone edge 400),
the gate hint to 250, and the sword hint to 200.

## What works

The numbers that matter cross-check: gate centers, 92 to 100 px ledges,
checkpoint clearances, pair spacings of 640 to 1,140. "Not in the format
yet" lists are honest and complete. Level 2 puts the peak at the
two-thirds mark on purpose; level 3's standing gateway pair is the right
call and the revision note says why. The far-lane bypass with no guard in
level 2's first beat is a kind introduction.
