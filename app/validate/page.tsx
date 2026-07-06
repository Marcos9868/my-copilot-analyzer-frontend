'use client';

import { useState } from 'react';
import { Card, Button, Textarea } from '@/components/ui';
import { api } from '@/libs/api';
import { ValidationResult } from '@/libs/types';

export default function ValidatePage() {
  const [demand, setDemand] = useState('');
  const [delivery, setDelivery] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.validateDelivery(demand, delivery);
      setResult(res);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Validar Entrega</h1>
      
      <Card title="Validação de Entrega">
        <div className="space-y-4">
          <Textarea
            label="Demanda Original"
            placeholder="Descreva a demanda original do cliente..."
            value={demand}
            onChange={(e) => setDemand(e.target.value)}
            rows={4}
          />
          <Textarea
            label="Entrega Realizada"
            placeholder="Descreva o que foi entregue..."
            value={delivery}
            onChange={(e) => setDelivery(e.target.value)}
            rows={4}
          />
          <Button 
            onClick={handleSubmit} 
            loading={loading} 
            disabled={!demand.trim() || !delivery.trim()}
          >
            Validar Entrega
          </Button>
        </div>
      </Card>

      {result && (
        <Card title="Resultado da Validação">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              <span className={`px-2 py-1 rounded text-sm ${
                result.status === 'approved' ? 'bg-green-100 text-green-800' :
                result.status === 'approved_with_reservations' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {result.status}
              </span>
            </div>
            
            <div>
              <span className="font-medium">Score: </span>
              <span className="text-lg font-bold">{result.score}/100</span>
            </div>

            {result.gaps && result.gaps.length > 0 && (
              <div>
                <h4 className="font-medium text-red-700">Gaps Identificados:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {result.gaps.map((gap, i) => (
                    <li key={i} className="text-gray-600 text-sm">{gap}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.strengths && result.strengths.length > 0 && (
              <div>
                <h4 className="font-medium text-green-700">Pontos Fortes:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="text-gray-600 text-sm">{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.recommendations && result.recommendations.length > 0 && (
              <div>
                <h4 className="font-medium text-blue-700">Recomendações:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="text-gray-600 text-sm">{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}