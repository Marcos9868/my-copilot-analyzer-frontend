'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui';
import { api } from '@/libs/api';
import { FileText, Clock, BarChart3, Cpu } from 'lucide-react';

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    api.getHistory(50).then(data => {
      setAnalyses(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Histórico de Análises</h1>
          <p className="text-gray-500 text-sm mt-1">{analyses.length} análises realizadas</p>
        </div>
        <Link
          href="/analyze"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Nova Análise
        </Link>
      </div>

      <div className="space-y-4">
        {analyses.length === 0 ? (
          <Card>
            <p className="text-gray-500 text-center py-12">Nenhuma análise encontrada.</p>
          </Card>
        ) : (
          analyses.map((item: any) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              {/* Cabeçalho */}
              <div
                className="cursor-pointer"
                onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>#{item.id}</span>
                      <span>•</span>
                      <span>{new Date(item.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                    <p className="font-medium text-gray-900 line-clamp-2">
                      {item.text}
                    </p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                    item.analysis?.complexity === 'Alta' ? 'bg-red-100 text-red-800' :
                    item.analysis?.complexity === 'Média' ? 'bg-yellow-100 text-yellow-800' :
                    item.analysis?.complexity === 'Baixa' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <BarChart3 className="w-3 h-3" />
                    {item.analysis?.complexity || 'N/A'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    <Clock className="w-3 h-3" />
                    {item.analysis?.deadline_estimate || 'N/A'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                    <Cpu className="w-3 h-3" />
                    {item.model?.replace(':latest', '') || 'N/A'}
                  </span>
                </div>

                {/* Resumo */}
                {item.analysis?.resume && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {item.analysis.resume}
                  </p>
                )}
              </div>

              {/* Detalhes expandidos */}
              {expanded === item.id && (
                <div className="mt-4 pt-4 border-t space-y-4">
                  {/* Requisitos Explícitos */}
                  {item.analysis?.explicit_requirements?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Requisitos Explícitos</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {item.analysis.explicit_requirements.map((req: string, i: number) => (
                          <li key={i} className="text-sm text-gray-600">{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Requisitos Implícitos */}
                  {item.analysis?.implicit_requirements?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Requisitos Implícitos</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {item.analysis.implicit_requirements.map((req: string, i: number) => (
                          <li key={i} className="text-sm text-gray-600">{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Cenários Positivos */}
                  {item.analysis?.positive_scenarios?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-green-700 mb-1">Cenários Positivos</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {item.analysis.positive_scenarios.map((s: string, i: number) => (
                          <li key={i} className="text-sm text-gray-600">{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Cenários Negativos */}
                  {item.analysis?.negative_scenarios?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-red-700 mb-1">Cenários de Risco</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {item.analysis.negative_scenarios.map((s: string, i: number) => (
                          <li key={i} className="text-sm text-gray-600">{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Indicador de expansão */}
              <div className="text-center mt-2">
                <span className="text-xs text-gray-400">
                  {expanded === item.id ? '▲ Recolher' : '▼ Expandir'}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}