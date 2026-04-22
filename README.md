# Webapps

A collection of single-file web applications designed to run in your browser. Just click the links below to use the App directly in your browser.

## Apps

Just click the links below to use the App directly in your browser.

- [GanttChart.html](https://pcerf.github.io/webapps/GanttChart.html) — Interactive Gantt chart timeline builder with live Markdown editing, draggable bars and dependency arrows, milestones, collapsible groups, arrow tooltips, file import/export (SVG/PNG/HTML/MD), and URL sharing.
- [DocScan.html](https://pcerf.github.io/webapps/DocScan.html) — Mobile-friendly document scanner that captures pages via camera, applies perspective correction, and exports to PDF with optional OCR.
- [RefFormat.html](https://pcerf.github.io/webapps/RefFormat.html) — Academic reference formatter that fetches metadata from CrossRef, Semantic Scholar, NCBI, OpenAlex, arXiv, and Europe PMC, and generates formatted citations with optional local AI-powered summaries.
- [QubitRotation.html](https://pcerf.github.io/webapps/QubitRotation.html) — Interactive single-qubit visualization tool that visualizes qubit states and rotations together with SU(2) and SO(3) parameterizations of quantum gates.

## Privacy and Security

These apps are intended to run entirely in the user's browser. However, while I took great care to minimize interaction with external services, **some apps may load third-party libraries from CDNs on demand** or **contact external servers**, which means network requests are made and standard browser information is exposed to those servers. I have documented this to the best of my knowledge per app below (see [Acknowledgments and External Services](#acknowledgments-and-external-services) below). **You are responsible for reviewing the code yourself before use.** Use at your own risk.

## Acknowledgments and External Services

In this section I list which apps load third-party libraries from CDNs on demand or contact external servers and which don't. I might have made mistakes in compiling this list. **Hence, this list is not guaranteed to be complete. You are responsible for reviewing the code yourself before use. Use at your own risk.**

### GanttChart.html
GanttChart.html does not load any external libraries at runtime and does not contact external servers during runtime.

### DocScan.html
DocScan.html optionally loads the following external libraries at runtime (not bundled):

- [Tesseract.js](https://github.com/naptha/tesseract.js) (Apache-2.0) — OCR engine, loaded from `cdn.jsdelivr.net` when the user enables OCR.
- [Transformers.js](https://github.com/huggingface/transformers.js) (Apache-2.0) — ML inference runtime, loaded from `cdn.jsdelivr.net` when the user enables AI title generation.
- [HuggingFace ONNX models](https://huggingface.co/onnx-community) (Apache-2.0) — Small language models downloaded from `huggingface.co` for local title suggestion.

### RefFormat.html
RefFormat.html optionally loads the following external library at runtime (not bundled):

- [WebLLM](https://github.com/mlc-ai/web-llm) (Apache-2.0) — In-browser LLM runtime, loaded from `esm.run` (jsDelivr) when the user clicks "Summaries".
- [MLC-AI model weights](https://huggingface.co/mlc-ai) (per-model licenses: Gemma, Llama, Qwen terms) — Quantized model files downloaded from `huggingface.co` the first time a given model is used for local summarization.

RefFormat.html contacts the following external services during runtime to resolve reference metadata and abstracts. The identifiers the user pastes (DOIs, arXiv IDs, PMIDs, and titles) are sent to these endpoints:

- [CrossRef REST API](https://www.crossref.org/documentation/retrieve-metadata/rest-api/) — `api.crossref.org`, for DOI metadata.
- [DOI.org content negotiation](https://citation.crosscite.org/docs.html) — `doi.org`, CSL-JSON fallback (covers DataCite, mEDRA, JaLC, etc.).
- [Semantic Scholar Graph API](https://api.semanticscholar.org/) — `api.semanticscholar.org`, metadata and abstracts by arXiv ID, DOI, PMID, or title.
- [NCBI E-utilities](https://www.ncbi.nlm.nih.gov/books/NBK25501/) — `eutils.ncbi.nlm.nih.gov`, PubMed metadata and abstracts.
- [OpenAlex API](https://docs.openalex.org/) — `api.openalex.org`, abstracts by DOI.
- [Europe PMC REST](https://europepmc.org/RestfulWebService) — `www.ebi.ac.uk`, abstracts by DOI.

Local AI summarization runs entirely in the browser via WebGPU once model weights are downloaded; prompt text is not sent to any remote LLM service.

### QubitRotation.html
QubitRotation.html loads the following external library at runtime (not bundled):

- [three.js](https://github.com/mrdoob/three.js) (MIT) — 3D rendering library for the Bloch sphere visualization, loaded from Cloudflare's cdnjs CDN (`https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`).

QubitRotation.html does not contact any external servers during runtime beyond the initial library fetch.

## License

MIT License

Copyright (c) 2026 Pascal Cerfontaine

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
