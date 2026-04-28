# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository shape

The frontend is a single self-contained file: `GanttChart.html`. It is vanilla HTML/CSS/JS with **no build step** — open in a browser and reload after edits. Two CDN imports (Yjs, y-websocket) are loaded at runtime from `esm.sh` for the live-collaboration layer; everything else is inline. There are no lint or test commands.

The repo also ships a **tiny Node WebSocket server** (`server.js` + `package.json`) that powers live multi-user editing. Run it with:

```bash
npm install
npm start            # listens on ws://localhost:1234
```

The frontend connects to `ws://localhost:1234` by default; override per-browser with `?server=wss://your-host`. The server is **in-memory only** (no persistence, no rooms — single shared timeline named `gantt-shared`). The page still works offline as a single-user editor when the server is unreachable.

This repo is a fork of an upstream `webapps` collection (see `README.md`); the deleted siblings `DocScan.html`, `RefFormat.html`, `QubitRotation.html` showing in `git status` are intentional removals from this fork — do not restore them.

## Architecture of `GanttChart.html`

The script is divided into labeled sections (`// ============================== NAME ==============================`). The data flow is one direction with one tight feedback loop:

```
textarea#input  ──parseInput──▶  data {settings, groups, allTasks}
                                         │
                                         ├──▶ computeLayout ──▶ rows[]
                                         │
                                         └──▶ renderChart (SVG)  ──drag──▶ commitLines ──▶ textarea#input
```

The Markdown-ish source in the textarea is the **single source of truth**. Every UI interaction (dragging a bar, dragging an arrow endpoint, changing a slider, toggling a palette) is round-tripped through the textarea via `commitLines()` or `updateSettingsInText()` so that copy/share/export/undo all reflect the current visual state. When changing rendering or interaction logic, preserve this invariant: mutations must end at the textarea, then trigger a re-render — never mutate `lastParsed` directly and skip writeback.

### Key sections and their roles

- **PALETTES / STATE** — `PALETTES` holds named color arrays; `st` holds non-textarea UI state (zoom, collapsed groups, hidden tasks, current drag, label/arrow settings). `SETTING_KEYS` / `SETTING_DEFAULTS` define which settings are synced between the textarea front-matter and UI controls.
- **PARSER** (`parseInput`, `parseTask`, `parseDeps`) — Hand-rolled line parser for the DSL. Settings are `key: value` lines at the top; `# Heading` starts a group; `- Name | start-end | key: value | deps: A, B@2>1!` defines a task. Dep syntax: `A` (end-of-A → start-of-this), `A@n` (from A.start+n), `A>n` (to this.start+n), `A!` (silent — no arrow drawn), `A "tooltip"`.
- **LAYOUT** (`computeLayout`) — Assigns each task a visual row, honoring `row: <other>` for shared rows and collapsed groups.
- **RENDER** (`render`, `renderChart`, `renderGrpHdr`) — Builds SVG from scratch each call. `render(skipParse=true)` reuses `lastParsed` for cheap re-renders (zoom, font, arrow style); pass `false`/omit when textarea content changed.
- **EVENTS / DRAG / ARROW ENDPOINT DRAG** — Mouse handlers for bar drag (resize edges / move middle) and dragging arrow source/target endpoints onto other tasks. Both write back via `commitLines()` (helpers: `setDepsInLine`, `addDepToLine`, `removeDepsFromLine`, `depToStr`).
- **SETTINGS SYNC** (`applySetting`, `getSettingsValues`, `updateSettingsInText`) — Bidirectional sync between the `settings:` front-matter lines and the toolbar controls. Adding a new persistent setting requires updating both `SETTING_KEYS`/`SETTING_DEFAULTS` and the apply/get/update trio.
- **EXPORT** — `exportSVG`, `exportPNG` (via canvas), `exportHTML` (self-contained snapshot), `exportMD` (raw textarea), `copyChartToClipboard`. `prepExportSvg` clones the live SVG and strips interactive UI before export.
- **SHARE** (`compressText`/`decompressText`, `shareAsLink`, `loadFromURL`) — Uses the browser's `CompressionStream('deflate-raw')` and base64url to put the full chart in a `?chart=` query param. The share link contains everything; there is no server.
- **UNDO / REDO** — Snapshot stack of textarea values (`undoStack`, `redoStack`, `MAX_UNDO=200`). `snapUndo()` is called on every `input` event and before any drag-driven `commitLines`. Anything that programmatically replaces the textarea contents must call `snapUndo()` first or undo history breaks.
- **INIT** — Wires up `input` event (debounced render), Ctrl+Z/Y/Shift+Z, window resize, Ctrl+wheel zoom (Shift = vertical), and finally calls `loadFromURL()` then `render()`. `DEFAULT_CHART` is the demo content shown on first load.
- **LIVE COLLABORATION** (separate `<script type="module">` at end of `<body>`) — Connects a `Y.Doc` to a `WebsocketProvider` and binds a `Y.Text` to the textarea via a small character-range diff. Local typing → diff → `ydoc.transact(..., 'local')` → broadcast. Remote update → `ytext.observe` (skipped when `transaction.origin === 'local'`) → splice into textarea, then `window.refreshUndoSnapshot()` and `window.render()`. On `provider.on('sync')`: if `ytext` is empty the local textarea seeds it; otherwise the textarea adopts the server state. Status pill in the editor header (`#collabStatus`) reflects connection + peer count.

### Conventions to follow when editing

- Keep the frontend in `GanttChart.html`. The only sanctioned exception is the live-collaboration module — don't extract further or add a bundler.
- After any change that modifies the textarea programmatically, call `snapUndo()` first and `render()` after — **and** `if (window.commitTextareaToY) window.commitTextareaToY()` at the end so the change propagates to other connected browsers. (See existing `undo`, `redo`, `loadFile`, and the drop handler for the pattern.)
- After any change to a synced setting in `st`, call `updateSettingsInText()` so the textarea reflects it (the Yjs sync then carries it to peers automatically).
- SVG elements are created via the `el(tag, attrs)` helper — use it instead of raw `createElementNS` for consistency.
- The parser is forgiving and pushes parse errors into the `errors` array shown in the red error bar; prefer surfacing problems there over throwing.
