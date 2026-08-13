import { PredictionResult, ModelMetrics } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function predictImage(file: File): Promise<PredictionResult> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Prediction failed");
  }

  return res.json();
}

export async function getMetrics(): Promise<ModelMetrics> {
  const res = await fetch(`${API_URL}/metrics`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch metrics");
  return res.json();
}

export async function checkHealth() {
  const res = await fetch(`${API_URL}/health`);
  return res.json();
}
