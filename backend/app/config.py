from typing import List, Dict

CLASS_NAMES: List[str] = [
    "basal_cell_carcinoma",
    "benign_keratosis",
    "melanoma",
    "nevus",
]

LAST_CONV_LAYER_NAME = "Conv_1"
MODEL_PATH = "models/best_skin_model_final.keras"
IMG_SIZE = (224, 224)

EXPLANATIONS: Dict[str, str] = {
    "melanoma": "The model identified visual patterns associated with melanoma.",
    "nevus": "The lesion shares characteristics commonly observed in benign nevi.",
    "basal_cell_carcinoma": "The image contains features that resemble patterns seen in basal cell carcinoma.",
    "benign_keratosis": "The lesion appears visually similar to benign keratosis samples used during training.",
}

MODEL_METRICS = {
    "accuracy": 0.7123,
    "precision": 0.75,
    "recall": 0.72,
    "f1_score": 0.71,
    "validation_images": 6854,
    "architecture": "MobileNetV2 (Transfer Learning)",
    "input_size": "224x224",
    "classes": CLASS_NAMES,
    "class_performance": [
        {"disease": "basal_cell_carcinoma", "precision": 0.61, "recall": 0.82, "f1_score": 0.70},
        {"disease": "benign_keratosis", "precision": 0.48, "recall": 0.57, "f1_score": 0.52},
        {"disease": "melanoma", "precision": 0.50, "recall": 0.63, "f1_score": 0.56},
        {"disease": "nevus", "precision": 0.92, "recall": 0.75, "f1_score": 0.83},
    ],
}