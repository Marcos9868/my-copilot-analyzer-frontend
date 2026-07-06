'use client';

import { useState } from 'react';
import { api } from '@/libs/api';
import { Button, Card, Textarea } from '@/components/ui/index';
import { DemandFormProps } from '@/interfaces/DemandFormProps';

export function DemandForm({ onResult }: DemandFormProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await api.analyzeDemand(text);
      onResult(result);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <Card title="Nova Análise">
      <div className="space-y-4">
        <Textarea
          label="Descreva a demanda do cliente"
          placeholder="Ex: Preciso de um dashboard de vendas com atualização em tempo real..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
        />
        <Button onClick={handleSubmit} loading={loading} disabled={!text.trim()}>
          Analisar Demanda
        </Button>
      </div>
    </Card>
  );
}