# Build roadmap

## Phase 1 — Research-ready foundation
- [x] Repository and responsive research dashboard scaffold
- [x] FastAPI health/project/dataset/evaluation endpoints
- [x] Explicit empty-state metrics (no fabricated results)
- [x] Research protocol and dataset manifest schema
- [ ] Validate frontend production build and API tests

## Phase 2 — Dataset studio
- [ ] Upload/import dataset archive and manifest
- [ ] Validate image integrity, labels and class mappings
- [ ] Detect duplicate/near-duplicate frames
- [ ] Group-aware train/validation/test split audit
- [ ] Dataset preview and annotation QA

## Phase 3 — Detector baseline
- [ ] Select and pin a supported YOLO implementation/version
- [ ] Train frontal-view baseline with reproducible config
- [ ] Save checkpoint, environment and run metadata
- [ ] Track loss curves and training artefacts

## Phase 4 — Cross-view evaluation
- [ ] Freeze baseline checkpoint
- [ ] Evaluate frontal, overhead, side and far-distance subsets
- [ ] Report precision, recall, mAP50 and mAP50-95
- [ ] Add class-wise metrics, confusion matrix and size buckets
- [ ] Export failure-case gallery and reproducibility report

## Phase 5 — Demo and deployment
- [ ] Connect UI to API and live job progress
- [ ] Add sample video inference with bounding boxes
- [ ] Add deployment configuration and documented limitations
- [ ] Record demo walkthrough and final research report

## Definition of done
A result is complete only when its input dataset version, split, model checkpoint, config, software environment and evaluation command can be identified and rerun.
