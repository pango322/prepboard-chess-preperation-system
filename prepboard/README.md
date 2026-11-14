# Prepboard
A portable chess preparation app with Chess.com imports, exact-path repertoire statistics, and local Stockfish 19.0.1 analysis.

## Run on EndeavourOS, macOS or Windows
Requires Python 3; all browser dependencies are already included in `dist/`.

1. Extract the portable ZIP.
2. Open a terminal in that folder (Dolphin: F4).
3. Run `python3 -m http.server 8080 --directory dist` (Windows: `py -m http.server 8080 --directory 
4. Open http://localhost:8080 in Firefox or Chrome.
5. Stop with Ctrl+C.

No npm installation or build is needed to use the app. Do not open index.html directly: browser workers need an HTTP origin. The chess board and engine run locally. Live game imports require internet. Games and archive caches use browser IndexedDB, specific to the site's origin. Export a Prepboard JSON file to move a database between the hosted and local version. PGN import requires the target username in the input, matching its White/Black headers.

## Use
Find a Chess.com username, choose a recent-game count, import. Full history reads all monthly archives sequentially and sets the exact slider maximum to standard chess records available through the API. No artificial career cap; memory, browser storage and the API's availability remain practical limits. Requests retry temporary failures and support cancellation. Historic monthly archives are cached locally, while the current month is refreshed. The API may lag behind the website.

The board supports click-click and drag-drop legal moves, castling, en passant, selectable promotions, flipping, move navigation, right-click square highlighting, right-drag arrows including knight L-shapes. Shift selects red; Alt selects blue. Left-click clears annotations.

The imported player is filtered by White/Black and time control. On that player's turn, the database shows their moves. On the opposite turn it shows opponent replies. Win rate ALWAYS belongs to the imported player. Engine scores ALWAYS belong to White. Stockfish has three PVs and configurable search depth. Hover/focus a PV move to preview; click to play through it.

## Definitions
- Matching is by exact move sequence, not transposition-merged position.
- Likelihood = games with that next move / matching games with any next move.
- Win rate = target-player wins / games with that next move. Draws are displayed separately.
- Branches = distinct suffix move sequences AFTER that move, ending at game end or an optional 8/16/24-ply horizon. Duplicate paths count once. Results do not affect path identity. A game ending on that move contributes an empty continuation, counted as one recorded path.
- Ended games are reported separately and excluded from the next-move denominator.
- Variants, non-standard starting positions, unfinished PGNs, and malformed games are excluded and reported.
- Sample data is synthetic and clearly labeled. It is never presented as a real player's games.

## Develop and test
ES modules; no build step. `npm test` runs statistics, parsing, and special-move tests. `node --check dist/app.js` checks app syntax. `core.mjs` handles statistics; `parser.js` runs PGN parsing in a worker. Stockfish uses a separate single-threaded WebAssembly worker (no cross-origin isolation requirement).

Browser QA: legal move interaction, engine output, Chess.com archives and sample imports, sorting, annotations, navigation. There is no native desktop wrapper yet. Browser-local architecture provides portability without a server or credentials.

## Licenses
Stockfish.js 19.0.1 is GPL-3.0. The binary and license are bundled under dist/vendor. Corresponding source and build instructions: https://github.com/nmrugg/stockfish.js/tree/v19.0.1 . chess.js is BSD-2-Clause, with its license bundled. This independent app is not affiliated with Chess.com. The board uses system chess glyphs and an independent palette.
