"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { getMetrics } from "@/lib/api";
import { ModelMetrics } from "@/lib/types";
import StatCard from "@/components/StatCard";
import { Target, Crosshair, Percent, Gauge } from "lucide-react";

function formatLabel(cls: string) {
  return cls.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function InsightsPage() {
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMetrics()
      .then(setMetrics)
      .catch(() => setError("Could not load live metrics from the API."));
  }, []);

  if (!metrics) {
    return (
      <div className="px-6 py-24 text-center text-gray-400">
        {error || "Loading metrics..."}
      </div>
    );
  }

  const chartData = metrics.class_performance.map((c) => ({
    name: formatLabel(c.disease),
    Precision: c.precision,
    Recall: c.recall,
    "F1 Score": c.f1_score,
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-brand-800 dark:text-brand-300">
          Model Performance Dashboard
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Summary of the deep learning model's evaluation metrics
        </p>
      </div>

      {/* Stat cards */}
      <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Accuracy"
          value={`${(metrics.accuracy * 100).toFixed(2)}%`}
          icon={<Target className="h-5 w-5" />}
        />
        <StatCard
          label="Precision"
          value={`${(metrics.precision * 100).toFixed(0)}%`}
          icon={<Crosshair className="h-5 w-5" />}
        />
        <StatCard
          label="Recall"
          value={`${(metrics.recall * 100).toFixed(0)}%`}
          icon={<Percent className="h-5 w-5" />}
        />
        <StatCard
          label="F1 Score"
          value={`${(metrics.f1_score * 100).toFixed(0)}%`}
          icon={<Gauge className="h-5 w-5" />}
        />
      </div>

      {/* Bar chart */}
      <div className="mb-10 rounded-2xl border border-brand-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-4 font-semibold text-gray-800 dark:text-gray-200">
          Class Performance Comparison
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffe1e1" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis domain={[0, 1]} stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-gray-900, #111827)",
                border: "1px solid #374151",
                borderRadius: "0.75rem",
                color: "#f3f4f6",
              }}
            />
            <Legend />
            <Bar dataKey="Precision" fill="#f83b3b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Recall" fill="#ff6b6b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="F1 Score" fill="#9f1414" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="mb-10 overflow-hidden rounded-2xl border border-brand-100 bg-white dark:border-gray-700 dark:bg-gray-900">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Disease</th>
              <th className="px-6 py-3">Precision</th>
              <th className="px-6 py-3">Recall</th>
              <th className="px-6 py-3">F1 Score</th>
            </tr>
          </thead>
          <tbody>
            {metrics.class_performance.map((c) => (
              <tr
                key={c.disease}
                className="border-t border-brand-50 dark:border-gray-800"
              >
                <td className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300">
                  {formatLabel(c.disease)}
                </td>
                <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                  {(c.precision * 100).toFixed(0)}%
                </td>
                <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                  {(c.recall * 100).toFixed(0)}%
                </td>
                <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                  {(c.f1_score * 100).toFixed(0)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-brand-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
            Model Summary
          </h3>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>• Architecture: {metrics.architecture}</li>
            <li>• Input size: {metrics.input_size}</li>
            <li>
              • Validation images: {metrics.validation_images.toLocaleString()}
            </li>
            <li>• Classes: {metrics.classes.length}</li>
            <li>• Data augmentation applied</li>
            <li>• Class weighting used to address imbalance</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-6 dark:border-gray-700 dark:bg-gray-800/60">
          <h3 className="mb-2 font-semibold text-brand-800 dark:text-brand-300">
            Key Takeaways
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Nevus achieved the strongest performance with an F1-score of 0.83.
            Basal Cell Carcinoma achieved strong recall (0.82). Benign Keratosis
            and Melanoma remain more challenging due to visual similarities with
            other lesions.
          </p>
        </div>
      </div>
    </div>
  );
}
