"use client";
import { motion } from "framer-motion";
import { PredictionResult } from "@/lib/types";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

function formatLabel(cls: string) {
  return cls.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function levelStyles(level: string) {
  switch (level) {
    case "high":
      return {
        bar: "bg-brand-600",
        badge:
          "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
        icon: <CheckCircle2 className="h-4 w-4" />,
      };
    case "moderate":
      return {
        bar: "bg-brand-500",
        badge:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
        icon: <Info className="h-4 w-4" />,
      };
    default:
      return {
        bar: "bg-brand-400",
        badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
        icon: <AlertTriangle className="h-4 w-4" />,
      };
  }
}

export default function ResultsPanel({ result }: { result: PredictionResult }) {
  const sortedProbs = Object.entries(result.probabilities).sort(
    (a, b) => b[1] - a[1],
  );
  const styles = levelStyles(result.confidence_level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Prediction */}
      <div className="rounded-2xl border-l-4 border-brand-600 bg-white p-6 shadow-sm dark:bg-gray-900">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Predicted Condition
        </p>
        <h2 className="mt-1 text-2xl font-bold text-brand-800 dark:text-brand-300">
          {formatLabel(result.predicted_class)}
        </h2>

        <div className="mt-4 flex items-center gap-2">
          <div
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
          >
            {styles.icon}
            {result.confidence_level.toUpperCase()} CONFIDENCE
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {(result.confidence * 100).toFixed(2)}%
          </span>
        </div>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-50 dark:bg-gray-800">
          <div
            className={`h-full rounded-full ${styles.bar}`}
            style={{ width: `${result.confidence * 100}%` }}
          />
        </div>
      </div>

      {/* Explanation */}
      <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-5 dark:border-gray-700 dark:bg-gray-800/50">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-400">
          <Info className="h-4 w-4" /> Why the model thinks this
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {result.explanation}
        </p>
      </div>

      {/* Probability bars */}
      <div className="rounded-2xl border border-brand-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-4 font-semibold text-gray-800 dark:text-gray-200">
          Prediction Probabilities
        </h3>
        <div className="space-y-3">
          {sortedProbs.map(([cls, prob]) => (
            <div key={cls}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {formatLabel(cls)}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {(prob * 100).toFixed(2)}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="h-full rounded-full bg-brand-500"
                  style={{ width: `${prob * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grad-CAM */}
      <div className="rounded-2xl border border-brand-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
          AI Attention Map (Grad-CAM)
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Highlighted regions show areas that most influenced the model&apos;s
          prediction.
        </p>
        <div className="overflow-hidden rounded-xl border border-brand-100 dark:border-gray-700">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.gradcam_image}
            alt="Grad-CAM overlay"
            className="w-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
