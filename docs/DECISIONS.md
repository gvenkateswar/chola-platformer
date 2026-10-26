# Decisions

Rulings by the owner. Agents treat these as settled; to reopen one, write a
note in docs/NOTES.md addressed to Gaurav.

## 2026-10-25

1. **The game is the voyage.** Temple (Thanjavur), port (Nagapattinam),
   foreign shore (Srivijaya). Not a warrior-in-Thanjavur game. A ship-deck
   level is release two.
2. **Audience.** History-minded adults first (25 to 50, diaspora and
   Ponniyin Selvan readers), built so a ten-year-old can finish it. No gore,
   no cheap deaths.
3. **Ilamaran does not kill Chola people.** Levels 1 and 2 are traversal and
   stealth; the sword is first drawn in Kadaram against a Srivijayan enemy.
   The Chola guard remains in the game as an obstacle to avoid, not a target.
4. **Ending.** Keep "The Sea Belongs to the Tiger" and add one line of cost.
5. **Hero's name.** Ilamaran stays unless the historian objects.
6. **Redraw the hero.** All five hero poses are regenerated to match
   RESEARCH.md (straight double-edged sword, cotton sash), not only the
   attack pose. Art-director owns the new prompts; sprite-artist produces
   them through Canva.
7. **Level 3 gate.** Plain timber post-and-lintel with lamps, no pennant,
   no crimson, as a new asset slot. The engine's crimson arrow glyph over
   gates is disabled in level 3 (builder task).
8. **Catch rule.** A guard catches Ilamaran only when he stops inside the
   guard's reach; a moving player outruns a guard. DESIGN.md section 3 and
   the difficulty table are rewritten to match (level 2 forced stealth
   beats become 0 or are redesigned around stopping).
9. **Level length.** Release one keeps levels at their designed length
   (about 2 minutes each, 8 minutes total). Targets in VISION.md section 7
   and DESIGN.md section 7 are corrected to match. Longer levels are
   release two.

## 2026-10-25, after first playtest of level 1

10. **Make the sword legible.** Gaurav could not tell whether he had a
    sword. The player must know from the start that he carries one, that it
    stays sheathed among Chola people, and that it will be drawn in
    Kadaram. Designer chooses how (clearer first-press hint, a moment where
    the sword is handed over, or both).
11. **Traversal variety.** Levels are "a shell of a larger game, but that's
    okay." Each level adds one or two new traversal pieces that fit its
    setting and are historically defensible. Owner's ideas: slides, bouncy
    surfaces, vines, trees, ropes on the ship. Candidate kit: Thanjavur
    scaffolding and ropes, hauling ramps; Nagapattinam market awnings to
    bounce on, ship rigging and yard; Kadaram mangrove roots, vines, swaying
    stilt walkways, mud slides.
12. **Level length.** Supersedes decision 9. Levels grow to fit the new
    traversal, roughly three to four minutes each.
13. **Gameplay references from the owner.** Donkey Kong Country,
    Prince of Persia (the newer games), Assassin's Creed Chronicles: India.
    VISION.md section 5 is updated to name what we take from each.
14. **Another reference: The Jungle Book (SNES).** Take from it pushing
    blocks to reach or open a path, and swinging on vines. Push blocks fit
    Thanjavur (stone being hauled for the temple) and Nagapattinam (cargo
    bales and crates). Vine swinging fits Kadaram.
15. **Ropes and vines may cross depth if marked like a gate** (VISION.md
    section 8 question 1, option b). A crossing rope or vine carries the
    same lamp and ink mark as a gate, so every depth crossing is visible.
    Unmarked ropes and vines stay within one depth.
16. **Gate crossing is a visible leap.** Changing depth at a gate is shown
    as a short leap toward or away from the camera, about half a second,
    replacing the instant switch. The existing 0.5 s gate stand becomes
    this leap; the catch rule still applies during it.
17. **Palette: each place gets its own natural color; crimson stays the
    only red and still means Chola.** Thanjavur warm gold with deep umber
    shadows; Nagapattinam a blue-green sea and sky; Kadaram jungle greens
    and indigo. Contrast and depth are raised in all three (deeper shadows,
    stronger light, finished middle layers). Revises VISION.md pillar 1's
    "one color."
18. **Animation is improved later by cut-out animation** (painted
    characters split into parts and moved in code), after the levels are
    laid out. Not now.
19. **Cut-out animation from existing art; decision 6 retired.** Characters
    are animated by splitting one painted image into parts and rotating
    them in code. The hero is rigged from the existing hero_idle.png now;
    its sandals and sash are fixed later by editing that one image, never
    by regenerating poses. The guard, Adittan, and the Srivijayan fighter
    each get one rig-sheet image, generated once. No character is redrawn
    pose by pose again. Decision 6 (regenerate all five hero poses) is
    withdrawn.

## 2026-10-26, after playtest of level 1 round 3

20. **Ropes swing with momentum.** Hanging on a rope, the player pumps
    left and right to build the swing; letting go launches him along the
    swing's direction and speed, so the release point aims the jump. Applies
    to ropes and vines in every level.
21. **Climb animation needs work.** The pole climb "looks better but still
    feels like storyboard pre-viz." Animation polish on climb, hang, and
    swing is a standing task for the builder, judged by the owner.
22. **Repaint the three far backdrops through Canva** from the corrected
    prompts in ASSETS.md (per-place palette, no Borobudur, no non-Chola
    red), owner approving each before it goes in.
23. **Backdrop picks.** Thanjavur: option (a), bright non-red color.
    Nagapattinam: option (c), muted earth reds allowed (terracotta, brick,
    laterite) alongside the one Chola crimson pennant. Kadaram: option (a).
    Crimson stays reserved for Chola; muted earth reds are allowed in
    Nagapattinam's architecture and cargo only, and must read as brown-red,
    never as crimson. Architecture in every backdrop must be right for the
    period; the historian reviews each before it goes into the game.

## 2026-10-26, after the game-feel deep dive (docs/research/game-feel-deep-dive.md)

24. **Parry.** Ilamaran gets a parry, the core of sword fighting, in the
    manner of Prince of Persia (1989) and The Lost Crown. A good parry
    stuns and opens a counter; a mistimed one still guards. Telegraphs
    read gold for "parry this" and black or indigo ink for "avoid this";
    never crimson. The shield-bearer is broken by parries or by getting
    behind him.
25. **Rope rhythm follows length.** Longer ropes swing slower, as real
    ropes do (period tied to length). Supersedes the fixed ROPE_PERIOD
    in DESIGN.md 2a.
26. **Kasu have a use.** VISION.md pillar 3's no-counter rule is relaxed
    for kasu: they can be spent at ports on things a sailor of 1025 would
    need (owner examples: a pilot, a temple offering); clusters lead to
    hidden detours that leave a mark on a voyage map; a few rare named
    kasu unlock short history cards. Still no score, no grades, no
    end-of-level tally of misses.
