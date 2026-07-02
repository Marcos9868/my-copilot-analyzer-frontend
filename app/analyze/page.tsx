'use client';

import { useState } from 'react';
import { DemandForm } from '@/components/analysis/DemandForm';
import { AnalysisResult } from '@/components/analysis/AnalysisResult';

export default function AnalyzePage() {
  const [result, setResult] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Analisar Demanda</h1>
      <DemandForm onResult={setResult} />
      {result && <AnalysisResult data={result} />}
    </div>
  );
}