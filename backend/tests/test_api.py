from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_project_is_explicitly_unmeasured():
    response = client.get("/api/project")
    assert response.status_code == 200
    assert response.json()["metrics_are_measured"] is False

def test_empty_dataset_and_evaluation_are_not_fabricated():
    assert client.get("/api/dataset/summary").json()["images"] == 0
    assert client.get("/api/evaluation/summary").json() == []
