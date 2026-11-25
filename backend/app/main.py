from datetime import datetime, timezone
from enum import Enum
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="SafeSight AI API", version="0.1.0", description="PPE detector research and cross-view evaluation API")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

class Condition(str, Enum):
    frontal = "frontal"
    overhead = "overhead"
    side = "side"
    distance = "distance"

class DatasetSummary(BaseModel):
    images: int = 0
    annotated_images: int = 0
    classes: list[str] = Field(default_factory=list)
    conditions: dict[str, int] = Field(default_factory=dict)

class MetricSummary(BaseModel):
    condition: Condition
    images: int
    precision: float | None = None
    recall: float | None = None
    map50: float | None = None
    map50_95: float | None = None

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "safesight-api", "timestamp": datetime.now(timezone.utc).isoformat()}

@app.get("/api/project")
def project():
    return {
        "name": "SafeSight AI",
        "research_title": "PPE-Compliance Detector Across Camera Viewpoints",
        "status": "prototype",
        "metrics_are_measured": False,
        "conditions": [condition.value for condition in Condition],
    }

@app.get("/api/dataset/summary", response_model=DatasetSummary)
def dataset_summary():
    # Empty until a validated dataset manifest is ingested.
    return DatasetSummary()

@app.get("/api/evaluation/summary", response_model=list[MetricSummary])
def evaluation_summary():
    # Never fabricate scores: no evaluation run means no metric rows.
    return []
