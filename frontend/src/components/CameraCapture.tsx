"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { Camera, RefreshCw, Aperture } from "lucide-react";

export default function CameraCapture({
  onCapture,
}: {
  onCapture: (file: File) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((track) => track.stop());
    setStreaming(false);
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStreaming(true);
      }
    } catch {
      setError("Unable to access camera. Please check permissions.");
    }
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        onCapture(new File([blob], "capture.png", { type: "image/png" }));
        stopCamera();
      }
    }, "image/png");
  };

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-brand-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      {error && (
        <p className="text-sm text-brand-600 dark:text-brand-400">{error}</p>
      )}

      <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-xl bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
        />
        {!streaming && (
          <div className="absolute inset-0 flex items-center justify-center text-white/70">
            <Camera className="h-10 w-10" />
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-3">
        {!streaming ? (
          <button
            onClick={startCamera}
            className="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-brand-700"
          >
            <Camera className="h-4 w-4" /> Start Camera
          </button>
        ) : (
          <>
            <button
              onClick={capture}
              className="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-brand-700"
            >
              <Aperture className="h-4 w-4" /> Capture
            </button>
            <button
              onClick={stopCamera}
              className="flex items-center gap-2 rounded-xl border border-brand-200 px-5 py-2.5 font-medium text-brand-700 hover:bg-brand-50 dark:border-gray-700 dark:text-brand-400 dark:hover:bg-gray-800"
            >
              <RefreshCw className="h-4 w-4" /> Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
