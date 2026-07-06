import Link from 'next/link';
import { BarChart3 } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BarChart3 className="w-7 h-7 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">Copilot</span>
        </Link>
        <nav className="flex gap-4">
          <Link href="/analyze" className="text-gray-600 hover:text-blue-600">Analisar</Link>
          <Link href="/validate" className="text-gray-600 hover:text-blue-600">Validar</Link>
          <Link href="/knowledge" className="text-gray-600 hover:text-blue-600">Conhecimento</Link>
        </nav>
      </div>
    </header>
  );
}