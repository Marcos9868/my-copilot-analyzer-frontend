'use client';

import { useState } from 'react';
import { api } from '@/libs/api';
import { Button, Card } from '@/components/ui';
import { AnalysisResultProps } from '@/interfaces/AnalysisResultProps';

export function AnalysisResult({ data }: AnalysisResultProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [sent, setSent] = useState(false);

  const handleFeedback = async () => {
    if (data.demand_id && rating > 0) {
      await api.submitFeedback(data.demand_id, rating, comment);
      setSent(true);
    }
  };

  return (
    <div className="space-y-4">
      <Card title="Resultado da Análise">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700">Resumo</h4>
            <p className="text-gray-600">{data.resume || 'N/A'}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Complexidade</h4>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                {data.complexity || 'N/A'}
              </span>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Prazo</h4>
              <p className="text-gray-600">{data.deadline_estimate || 'N/A'}</p>
            </div>
          </div>

          {data.explicit_requirements && (
            <div>
              <h4 className="font-medium text-gray-700">Requisitos Explícitos</h4>
              <ul className="list-disc pl-5 space-y-1">
                {data.explicit_requirements.map((r, i) => (
                  <li key={i} className="text-gray-600 text-sm">{r}</li>
                ))}
              </ul>
            </div>
          )}

          {data.implicit_requirements && (
            <div>
              <h4 className="font-medium text-gray-700">Requisitos Implícitos</h4>
              <ul className="list-disc pl-5 space-y-1">
                {data.implicit_requirements.map((r, i) => (
                  <li key={i} className="text-gray-600 text-sm">{r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>

      {/* Feedback */}
      <Card title="Avaliar Análise">
        {!sent ? (
          <div className="space-y-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className={`text-2xl transition-colors ${n <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Comentário (opcional)"
              className="w-full p-2 border rounded text-sm"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button variant="success" onClick={handleFeedback} disabled={rating === 0}>
              Enviar Feedback
            </Button>
          </div>
        ) : (
          <p className="text-green-600 font-medium">✅ Feedback enviado!</p>
        )}
      </Card>
    </div>
  );
}