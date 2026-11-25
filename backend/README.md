# SafeSight API

FastAPI service for dataset metadata and reproducible PPE detector evaluation.

## Run locally

```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Health: `http://localhost:8000/api/health`  
OpenAPI: `http://localhost:8000/docs`

The current API intentionally returns empty dataset/evaluation summaries. It does not invent model metrics or claim that a detector has been trained.

## Next implementation milestones

1. Add a dataset manifest with source, licence, split, label schema, viewpoint and distance metadata.
2. Validate YOLO-format labels and prevent leakage between train/validation/test splits.
3. Add model training and checkpoint provenance.
4. Add per-condition precision, recall, mAP50 and mAP50-95 evaluation with confusion matrices.
5. Persist runs and expose status/progress to the web client.
