"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import clsx from "clsx";

export default function UploadDropzone({
  onFileSelected,
}: {
  onFileSelected: (file: File) => void;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) onFileSelected(acceptedFiles[0]);
    },
    [onFileSelected],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition-colors",
        isDragActive
          ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30"
          : "border-brand-200 bg-white hover:bg-brand-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800",
      )}
    >
      <input {...getInputProps()} />
      <div className="rounded-full bg-brand-100 p-4 dark:bg-brand-950/50">
        <UploadCloud className="h-8 w-8 text-brand-600 dark:text-brand-400" />
      </div>
      <p className="font-semibold text-gray-700 dark:text-gray-300">
        {isDragActive
          ? "Drop the image here..."
          : "Drag & drop a skin image, or click to browse"}
      </p>
      <p className="text-sm text-gray-400 dark:text-gray-500">
        Supports JPG, JPEG, PNG
      </p>
    </div>
  );
}
