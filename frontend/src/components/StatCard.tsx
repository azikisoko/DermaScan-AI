export default function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {label}
        </p>
        {icon && (
          <div className="text-brand-500 dark:text-brand-400">{icon}</div>
        )}
      </div>
      <p className="mt-2 text-3xl font-bold text-brand-700 dark:text-brand-400">
        {value}
      </p>
    </div>
  );
}
