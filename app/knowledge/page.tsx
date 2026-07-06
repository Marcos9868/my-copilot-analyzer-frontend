'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui';
import { api } from '@/libs/api';
import { KnowledgeBase, Stats } from '@/libs/types';

export default function KnowledgePage() {
  const [knowledge, setKnowledge] = useState<KnowledgeBase | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.getKnowledge().then(setKnowledge);
    api.getStats().then(setStats);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Base de Conhecimento</h1>

      {stats && (
        <Card title="Estatísticas">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.demands}</p>
              <p className="text-sm text-gray-500">Análises</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.validations}</p>
              <p className="text-sm text-gray-500">Validações</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.learnings}</p>
              <p className="text-sm text-gray-500">Padrões</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.feedbacks}</p>
              <p className="text-sm text-gray-500">Feedbacks</p>
            </div>
          </div>
        </Card>
      )}

      {knowledge?.examples && (
        <Card title={`Exemplos (${knowledge.examples.examples?.length || 0})`}>
          {knowledge.examples.examples?.slice(0, 3).map((ex, i) => (
            <div key={i} className="mb-3 p-3 bg-gray-50 rounded">
              <p className="font-medium text-sm">{ex.demand}</p>
              <p className="text-xs text-gray-500 mt-1">{ex.analysis.resume}</p>
            </div>
          ))}
        </Card>
      )}

      {knowledge?.patterns && (
        <Card title={`Padrões (${knowledge.patterns.demand_patterns?.length || 0})`}>
          {knowledge.patterns.demand_patterns?.map((p, i) => (
            <div key={i} className="mb-2 text-sm">
              <span className="font-medium">{p.type}</span>
              <span className="text-gray-500"> - confiança: {(p.confidence * 100).toFixed(0)}%</span>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}