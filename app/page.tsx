import Link from 'next/link';
import { FileText, CheckCircle, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Copilot de Análise de Demandas</h1>
        <p className="text-gray-500 mt-2">Assistente local para analisar e validar demandas de clientes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/analyze" className="group">
          <div className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-all text-center">
            <FileText className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <h2 className="font-semibold text-lg">Analisar Demanda</h2>
            <p className="text-gray-500 text-sm mt-1">Envie uma demanda e receba análise detalhada</p>
          </div>
        </Link>

        <Link href="/validate" className="group">
          <div className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-all text-center">
            <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <h2 className="font-semibold text-lg">Validar Entrega</h2>
            <p className="text-gray-500 text-sm mt-1">Compare entregas com as demandas originais</p>
          </div>
        </Link>

        <Link href="/knowledge" className="group">
          <div className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-all text-center">
            <BookOpen className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <h2 className="font-semibold text-lg">Conhecimento</h2>
            <p className="text-gray-500 text-sm mt-1">Visualize exemplos e padrões da base</p>
          </div>
        </Link>
      </div>
    </div>
  );
}