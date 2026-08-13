"use client";
import { useState } from "react";
import UploadDropzone from "@/components/UploadDropzone";
import CameraCapture from "@/components/CameraCapture";
import ResultsPanel from "@/components/ResultsPanel";
import Disclaimer from "@/components/Disclaimer";
import { predictImage } from "@/lib/api";
import { PredictionResult } from "@/lib/types";
import { Upload, Camera as CameraIcon, Loader2, RotateCcw } from "lucide-react";
import clsx from "clsx";

export default function DetectPage() {
  const [mode, setMode] = useState<"upload" | "camera">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError(null);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const res = await predictImage(file);
      setResult(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-brand-800 dark:text-brand-300">
          Skin Disease Detection
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Upload an image or use your camera to analyze a skin lesion
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left panel */}
        <div className="space-y-6">
          {!file && (
            <>
              {/* Mode toggle */}
              <div className="flex gap-2 rounded-xl bg-brand-50 p-1 dark:bg-gray-800">
                <button
                  onClick={() => setMode("upload")}
                  className={clsx(
                    "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors",
                    mode === "upload"
                      ? "bg-white text-brand-700 shadow-sm dark:bg-gray-700 dark:text-brand-400"
                      : "text-gray-500 dark:text-gray-400",
                  )}
                >
                  <Upload className="h-4 w-4" /> Upload
                </button>
                <button
                  onClick={() => setMode("camera")}
                  className={clsx(
                    "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors",
                    mode === "camera"
                      ? "bg-white text-brand-700 shadow-sm dark:bg-gray-700 dark:text-brand-400"
                      : "text-gray-500 dark:text-gray-400",
                  )}
                >
                  <CameraIcon className="h-4 w-4" /> Camera
                </button>
              </div>

              {mode === "upload" ? (
                <UploadDropzone onFileSelected={handleFile} />
              ) : (
                <CameraCapture onCapture={handleFile} />
              )}
            </>
          )}

          {/* Preview */}
          {preview && (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-brand-100 dark:border-gray-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full object-cover"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={analyze}
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Analyzing...
                    </>
                  ) : (
                    "Analyze Image"
                  )}
                </button>
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-2 rounded-xl border border-brand-200 px-5 py-3 font-medium text-brand-700 hover:bg-brand-50 dark:border-gray-700 dark:text-brand-400 dark:hover:bg-gray-800"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-xl bg-red-50 p-4 text-sm text-brand-700 dark:bg-red-950/30 dark:text-brand-400">
              {error}
            </p>
          )}

          <Disclaimer />
        </div>

        {/* Right panel */}
        <div>
          {result ? (
            <ResultsPanel result={result} />
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-brand-200 text-center text-gray-400 dark:border-gray-700 dark:text-gray-600">
              Results will appear here after analysis
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
