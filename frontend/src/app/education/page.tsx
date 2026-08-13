"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const diseases = [
  {
    id: "basal_cell_carcinoma",
    name: "Basal Cell Carcinoma",
    details:
      "Basal Cell Carcinoma (BCC) is the most common type of skin cancer. It develops in the basal cells of the skin and is usually caused by prolonged exposure to ultraviolet radiation. Early detection greatly improves treatment outcomes.",
    tag: "Malignant",
    tagColor:
      "bg-brand-100 text-brand-700 dark:bg-brand-950/60 dark:text-brand-400",
  },
  {
    id: "benign_keratosis",
    name: "Benign Keratosis",
    details:
      "Benign keratosis lesions are non-cancerous skin growths that commonly appear with aging. They are generally harmless but can resemble malignant lesions, making accurate diagnosis important.",
    tag: "Benign",
    tagColor:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  },
  {
    id: "melanoma",
    name: "Melanoma",
    details:
      "Melanoma is one of the most serious forms of skin cancer. It develops from pigment-producing cells called melanocytes. Early diagnosis is critical because melanoma can spread to other parts of the body. Melanoma requires immediate medical evaluation.",
    tag: "Malignant",
    tagColor:
      "bg-brand-100 text-brand-700 dark:bg-brand-950/60 dark:text-brand-400",
  },
  {
    id: "nevus",
    name: "Nevus",
    details:
      "A nevus, commonly called a mole, is usually a benign growth of melanocytes. Most nevi are harmless, although some may develop suspicious characteristics over time and should be monitored.",
    tag: "Benign",
    tagColor:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  },
];

export default function EducationPage() {
  const [active, setActive] = useState(diseases[0].id);
  const current = diseases.find((d) => d.id === active)!;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-brand-800 dark:text-brand-300">
          Skin Disease Education Center
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Learn about the conditions recognized by the AI system
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <div className="flex flex-col gap-2">
          {diseases.map((d) => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                active === d.id
                  ? "bg-brand-600 text-white dark:bg-brand-700"
                  : "bg-white text-gray-600 hover:bg-brand-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border border-brand-100 bg-white p-8 dark:border-gray-700 dark:bg-gray-900"
          >
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${current.tagColor}`}
            >
              {current.tag}
            </span>
            <h2 className="mt-4 text-2xl font-bold text-brand-800 dark:text-brand-300">
              {current.name}
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-400">
              {current.details}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
