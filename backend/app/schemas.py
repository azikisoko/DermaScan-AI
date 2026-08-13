from pydantic import BaseModel
from typing import Dict


class PredictionResponse(BaseModel):
    predicted_class: str
    confidence: float
    probabilities: Dict[str, float]
    explanation: str
    confidence_level: str
    gradcam_image: str  # base64 data URI


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool