import io
import base64

import numpy as np
import tensorflow as tf
import cv2
import matplotlib.cm as cm
from PIL import Image

from app.config import LAST_CONV_LAYER_NAME, IMG_SIZE
from app.inference import preprocess_image


def make_gradcam_heatmap(img_array, model, last_conv_layer_name=LAST_CONV_LAYER_NAME):
    grad_model = tf.keras.models.Model(
        inputs=model.inputs,
        outputs=[model.get_layer(last_conv_layer_name).output, model.output],
    )

    with tf.GradientTape() as tape:
        # Fix: pass as dict matching input layer name
        input_name = model.input_names[0]
        conv_outputs, predictions = grad_model({input_name: img_array})
        class_idx = tf.argmax(predictions[0])
        loss = predictions[:, class_idx]

    grads = tape.gradient(loss, conv_outputs)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    conv_outputs = conv_outputs[0]

    heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)
    heatmap = tf.maximum(heatmap, 0) / (tf.math.reduce_max(heatmap) + 1e-8)

    return heatmap.numpy()


def generate_gradcam_overlay(image: Image.Image, model, last_conv_layer_name=LAST_CONV_LAYER_NAME) -> str:
    processed = preprocess_image(image)
    heatmap = make_gradcam_heatmap(processed, model, last_conv_layer_name)

    original_img = np.array(image.convert("RGB").resize(IMG_SIZE))
    heatmap_resized = cv2.resize(heatmap, IMG_SIZE)
    heatmap_resized = np.uint8(255 * heatmap_resized)

    jet_colors = cm.jet(np.arange(256))[:, :3]
    jet_heatmap = jet_colors[heatmap_resized]
    jet_heatmap = np.uint8(jet_heatmap * 255)

    overlay = cv2.addWeighted(original_img, 0.6, jet_heatmap, 0.4, 0)

    buffer = io.BytesIO()
    Image.fromarray(overlay).save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")

    return f"data:image/png;base64,{encoded}"