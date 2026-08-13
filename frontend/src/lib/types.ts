export interface PredictionResult {
  predicted_class: string;
  confidence: number;
  probabilities: Record<string, number>;
  explanation: string;
  confidence_level: "high" | "moderate" | "low";
  gradcam_image: string;
}

export interface ClassPerformance {
  disease: string;
  precision: number;
  recall: number;
  f1_score: number;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  validation_images: number;
  architecture: string;
  input_size: string;
  classes: string[];
  class_performance: ClassPerformance[];
}