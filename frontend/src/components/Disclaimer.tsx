import { AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800 dark:border-brand-900 dark:bg-brand-950/40 dark:text-brand-300">
      <AlertTriangle className="h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400" />
      <p>
        This tool is intended for educational and research purposes only. It
        should not replace professional medical diagnosis. Please consult a
        dermatologist for any medical concerns.
      </p>
    </div>
  );
}
