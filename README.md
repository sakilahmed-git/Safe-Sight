# SafeSight AI

**PPE-Compliance Detector Across Camera Viewpoints**

A research-oriented computer-vision application for detecting personal protective equipment (PPE) and evaluating model generalisation across camera viewpoints, distances and scene conditions.

## Project status

The repository is being bootstrapped. The current interface is a frontend prototype; no trained model or measured evaluation results are included yet. All preview charts must be treated as illustrative until real experiments are run.

## Planned architecture

- **Web:** Next.js, React, TypeScript
- **API:** Python, FastAPI
- **Vision:** PyTorch, Ultralytics YOLO, OpenCV
- **Experiments:** reproducible dataset splits, viewpoint and distance evaluation, confusion matrices and per-class metrics

## Research workflow

1. Import and validate annotated images or video frames.
2. Record dataset provenance, camera viewpoint and distance metadata.
3. Train or load a single-stage PPE detector.
4. Evaluate on held-out frontal, side and overhead viewpoints.
5. Compare precision, recall, mAP, latency and failure cases by domain.

## Run the web app

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Research integrity

Do not report illustrative dashboard values as experimental findings. Add dataset licences, annotation guidelines, split definitions, model weights provenance and evaluation commands before claiming results.

## License

TBD. Add a licence only after deciding how the project should be shared.
