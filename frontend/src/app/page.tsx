import Link from "next/link";
import { ArrowRight, ScanLine, Layers, ImageIcon } from "lucide-react";
import StatCard from "@/components/StatCard";
import Disclaimer from "@/components/Disclaimer";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white px-6 py-24 text-center dark:from-gray-900 dark:to-gray-950">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-brand-100 px-4 py-1 text-sm font-medium text-brand-700 dark:bg-brand-950/60 dark:text-brand-400">
            Deep Learning · Computer Vision
          </span>
          <h1 className="text-4xl font-extrabold leading-tight text-brand-900 sm:text-5xl dark:text-white">
            AI-Powered Skin Disease Detection
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
            A deep learning system that analyzes skin lesion images and
            classifies them into four dermatological categories using
            MobileNetV2 transfer learning.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/detect"
              className="flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Try It Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/insights"
              className="rounded-xl border border-brand-200 px-6 py-3 font-semibold text-brand-700 transition-colors hover:bg-brand-50 dark:border-gray-700 dark:text-brand-400 dark:hover:bg-gray-800"
            >
              View Model Insights
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          <StatCard
            label="Model Accuracy"
            value="71.2%"
            icon={<ScanLine className="h-5 w-5" />}
          />
          <StatCard
            label="Disease Classes"
            value="4"
            icon={<Layers className="h-5 w-5" />}
          />
          <StatCard
            label="Images Used"
            value="34,000+"
            icon={<ImageIcon className="h-5 w-5" />}
          />
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <Disclaimer />
      </section>
    </div>
  );
}
