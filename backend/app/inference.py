import numpy as np
import tensorflow as tf
from PIL import Image

from app.config import CLASS_NAMES, MODEL_PATH, IMG_SIZE, EXPLANATIONS

_model = None


def load_model():
    global _model
    if _model is None:
        _model = tf.keras.models.load_model(MODEL_PATH)
    return _model


def get_model():
    if _model is None:
        raise RuntimeError("Model not loaded")
    return _model


def preprocess_image(image: Image.Image) -> np.ndarray:
    image = image.convert("RGB").resize(IMG_SIZE)
    arr = np.array(image, dtype=np.float32) / 255.0
    return np.expand_dims(arr, axis=0)


def get_confidence_level(confidence: float) -> str:
    if confidence > 0.75:
        return "high"
    elif confidence > 0.5:
        return "moderate"
    return "low"


def get_explanation(pred_class: str, confidence: float) -> str:
    level = get_confidence_level(confidence)
    base = EXPLANATIONS.get(pred_class, "No explanation available.")
    return f"{base} The model assigned a {level} confidence score."


def predict(image: Image.Image):
    model = get_model()
    processed = preprocess_image(image)

    # Use numpy array directly — no input_names needed
    predictions = model(processed, training=False).numpy()[0]

    predicted_index = int(np.argmax(predictions))
    predicted_class = CLASS_NAMES[predicted_index]
    confidence = float(predictions[predicted_index])
    probabilities = {cls: float(p) for cls, p in zip(CLASS_NAMES, predictions)}

    return processed, predictions, predicted_class, confidence, probabilities