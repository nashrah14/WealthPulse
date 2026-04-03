export default function Footer() {
  return (
    <footer className="mt-16 py-8 text-center border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">      
      <div className="flex items-center justify-center gap-2">
        <img 
          src="/logo.png" 
          alt="WealthPulse Logo"
          className="w-7 h-7 object-contain"
        />
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
          WealthPulse
        </h3>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Track. Analyze. Prosper.
      </p>

    </footer>
  );
}
