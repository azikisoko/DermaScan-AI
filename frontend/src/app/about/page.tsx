import { FaGithub, FaLinkedin } from "react-icons/fa";

const stack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "FastAPI",
  "TensorFlow / Keras",
  "MobileNetV2",
  "Grad-CAM",
  "Recharts",
  "Framer Motion",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-brand-800 dark:text-brand-300">
          About This Project
        </h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          A full-stack deep learning application for dermatological image
          classification
        </p>
      </div>

      <section className="mb-10 rounded-2xl border border-brand-100 bg-white p-8 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-3 text-xl font-semibold text-brand-700 dark:text-brand-400">
          Overview
        </h2>
        <p className="leading-relaxed text-gray-600 dark:text-gray-400">
          DermaScan AI classifies skin lesion images into four categories: Basal
          Cell Carcinoma, Benign Keratosis, Melanoma, and Nevus. The model is
          built on MobileNetV2 with transfer learning, fine-tuned on a
          dermatological dataset of over 34,000 images. Grad-CAM visualizations
          explain which regions influenced each prediction, promoting
          interpretability in medical AI.
        </p>
      </section>

      <section className="mb-10 rounded-2xl border border-brand-100 bg-white p-8 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-4 text-xl font-semibold text-brand-700 dark:text-brand-400">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {stack.map((t) => (
            <span
              key={t}
              className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-950/40 dark:text-brand-400"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-brand-100 bg-white p-8 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-3 text-xl font-semibold text-brand-700 dark:text-brand-400">
          Architecture
        </h2>
        <p className="leading-relaxed text-gray-600 dark:text-gray-400">
          The frontend is a Next.js app that communicates with a FastAPI backend
          via a REST API. The backend loads the trained Keras model, handles
          preprocessing, runs inference, generates Grad-CAM heatmaps, and
          returns JSON — keeping the two layers fully decoupled and
          independently deployable.
        </p>
      </section>
    </div>
  );
}
