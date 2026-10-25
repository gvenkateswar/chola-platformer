# Chola: Tides of Bronze

A 2.5D side-scrolling historical action game, single-file HTML5 canvas
(`index.html`), painted art kit in `assets/` with prompts in `ASSETS.md`.
Owner: Gaurav. This file sets the standards every agent on the project
inherits.

## Documents and who owns them

| File | Owner | Readers |
|---|---|---|
| `docs/VISION.md` | creative-director | everyone |
| `docs/RESEARCH.md` | historian | designers, writers, artists |
| `docs/DESIGN.md` | game-designer | builder, level-designer, tester |
| `docs/BACKLOG.md` | producer (written by critic after playtests) | builder |
| `ASSETS.md` | art-director | sprite-artist |

Agents edit only the documents they own. To change someone else's document,
write a note to its owner in `docs/NOTES.md` under a dated heading.

## Standards for every agent

- **Sources.** Any factual claim about history carries a source or a
  [plausible] / [invented] tag. See `docs/RESEARCH.md` for the convention.
- **Honesty over polish.** Say what you could not do or did not know. A
  document that admits three gaps is worth more than one that hides them.
- **Respect the budget.** Each document states a length. Over budget means
  not finished.
- **Writing style.** Plain sentences. American spelling. No "this isn't X,
  it's Y" constructions. No jargon where a plain word exists.
- **The owner decides.** Put decisions only Gaurav can make under an "Open
  questions" heading with options and a recommendation. Do not decide them.
- **Do not touch what you do not own.** Builders change `index.html` only.
  Artists change `assets/` only. Researchers and designers change `docs/`
  only.
- **Leave a trail.** Every document ends with "Revision notes": date, what
  changed, why.

## Running the game

Open `index.html` in a browser. Keyboard: arrows or WASD, Space to jump, J
or X to attack, up/down at gates to switch lanes. For automated play, use
Playwright (`require('playwright')`, Chromium is preinstalled in cloud
sessions).

## Setting, in brief

Chola empire under Rajaraja I and Rajendra I. Level 1: Thanjavur, 1010 CE,
the Brihadisvara temple. Level 2: Nagapattinam, the port. Level 3:
Srivijaya, 1025 CE, the naval expedition. The player is a young Chola
fighter. Nothing beyond this is settled until `docs/VISION.md` exists.
