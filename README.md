# SafeSight AI

**PPE-Compliance Detector Across Camera Viewpoints**

A research-oriented computer-vision application for detecting personal protective equipment (PPE) and evaluating model generalisation across camera viewpoints, distances and scene conditions.

## Current status

The repository contains a responsive research workspace and a FastAPI foundation. The UI now has distinct workspace views for overview, dataset preparation, model training, detection, viewpoint challenge, evaluation and research reports.

**No detector has been trained and no measured evaluation results are included yet.** Empty metric states are intentional; do not treat them as zero scores or experimental findings. Dataset selection in the current UI is local staging only and does not upload data.

## Architecture

- **Web:** Next.js App Router, React, TypeScript
- **API:** Python, FastAPI
- **Vision (planned):** PyTorch, Ultralytics YOLO, OpenCV
- **Experiments:** reproducible dataset splits, viewpoint and distance evaluation, per-class metrics and failure analysis

## Run the web app

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Run the API

```bash
cd backend
python -m venv .venv
# Windows PowerShell: .venv\\Scripts\\Activate.ps1
python -m pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API health: http://localhost:8000/api/health  
OpenAPI docs: http://localhost:8000/docs

## Quality checks

```bash
npm run lint
npm run build
cd backend
python -m pytest
```

GitHub Actions runs the web typecheck/build and API tests on pushes and pull requests to `main`.

## Research protocol

Read [docs/RESEARCH_PROTOCOL.md](docs/RESEARCH_PROTOCOL.md) before collecting data or reporting results. The dataset manifest schema is at [docs/DATASET_MANIFEST.schema.json](docs/DATASET_MANIFEST.schema.json), and the implementation sequence is in [docs/ROADMAP.md](docs/ROADMAP.md).

## UI design system

The applied UI/UX rules and token source of truth are documented in [design-system/safesight-ai/MASTER.md](design-system/safesight-ai/MASTER.md). The supplied skill's companion search script and reference files were not included with the uploaded Markdown, so no searchable database match is claimed; the supplied built-in guidance was used as fallback.

## Research integrity

Record dataset licences, annotation guidelines, split definitions, model checkpoint provenance, environment versions and evaluation commands. Keep raw datasets and large model weights out of Git. Never present illustrative dashboard values as experimental results.

## License

TBD. Add a licence after deciding how the project should be shared.
