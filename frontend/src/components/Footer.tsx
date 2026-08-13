export default function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white py-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
      <p>
        © {new Date().getFullYear()} DermaScan AI — Built for educational &
        portfolio purposes.
      </p>
    </footer>
  );
}
