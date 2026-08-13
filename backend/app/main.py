import os
import io
from contextlib import asynccontextmanager

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

from app import inference, gradcam
from app.config import MODEL_METRICS
from app.schemas import PredictionResponse, HealthResponse


@asynccontextmanager
async def lifespan(app: FastAPI):
    inference.load_model()
    yield


app = FastAPI(title="Skin Disease Detection API", lifespan=lifespan)

origins = os.getenv("CORS_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse)
def health_check():
    try:
        inference.get_model()
        loaded = True
    except RuntimeError:
        loaded = False
    return HealthResponse(status="ok", model_loaded=loaded)


@app.get("/metrics")
def get_metrics():
    return MODEL_METRICS


@app.post("/predict", response_model=PredictionResponse)
async def predict_endpoint(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    contents = await file.read()
    try:
        image = Image.open(io.BytesIO(contents))
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    model = inference.get_model()
    _, predictions, predicted_class, confidence, probabilities = inference.predict(image)
    explanation = inference.get_explanation(predicted_class, confidence)
    confidence_level = inference.get_confidence_level(confidence)
    gradcam_image = gradcam.generate_gradcam_overlay(image, model)

    return PredictionResponse(
        predicted_class=predicted_class,
        confidence=confidence,
        probabilities=probabilities,
        explanation=explanation,
        confidence_level=confidence_level,
        gradcam_image=gradcam_image,
    )