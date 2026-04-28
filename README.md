# Gant Chart Collaborative

A simple collaborative gantt-chart/timeline builder with live Markdown editing, draggable bars and dependency arrows, milestones, collapsible groups, arrow tooltips, file import/export (SVG/PNG/HTML/MD), and URL sharing.

## Live multi-user editing

The textarea is synchronized across all connected browsers via [Yjs](https://yjs.dev/) over WebSocket, so multiple people can edit the same timeline at once.

### Run the collaboration server

```bash
npm install
npm start
```

The server listens on `ws://localhost:1234` by default (override with `PORT` / `HOST` env vars). It is **in-memory only** — restarting the server drops the document, and the next browser to connect re-seeds it from its local content.

### Connecting

Open `GanttChart.html` in a browser. By default it connects to `ws://localhost:1234`. To point it at a different server, append `?server=wss://your-server` to the URL. The Yjs client and server libraries are loaded from a CDN at runtime; if the server is unreachable the page works as a single-user editor and reconnects automatically when it comes back. The first browser to connect to an empty server seeds the document; later joiners adopt the server's state, so any unsynced local edits made during a brief connection gap are overwritten.

## Privacy and Security

These apps are intended to run entirely in the user's browser. However, while I took great care to minimize interaction with external services, **some apps may load third-party libraries from CDNs on demand** or **contact external servers**, which means network requests are made and standard browser information is exposed to those servers. I have documented this to the best of my knowledge per app below (see [Acknowledgments and External Services](#acknowledgments-and-external-services) below). **You are responsible for reviewing the code yourself before use.** Use at your own risk.

## Acknowledgments and External Services

In this section I list which apps load third-party libraries from CDNs on demand or contact external servers and which don't. I might have made mistakes in compiling this list. **Hence, this list is not guaranteed to be complete. You are responsible for reviewing the code yourself before use. Use at your own risk.**

## License

MIT License

Copyright (c) 2026 Pascal Cerfontaine (forked GanttChart.html 28/04/2026 from https://github.com/pcerf/webapps)
Copyright (c) 2026 Kai Kreisköther (added collaborative functionality)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Disclaimer

This software is provided as-is with no warranties. The authors are not responsible for any damages, data loss, or privacy issues arising from the use of these applications. Users should independently verify that the applications meet their security and privacy requirements before use.
