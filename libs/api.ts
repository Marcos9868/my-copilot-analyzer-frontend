import { AnalysisResult, ValidationResult, ModelInfo, Stats, KnowledgeBase } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.statusText}`);
  return res.json();
}

export const api = {
  analyzeDemand: (text: string, model?: string) =>
    fetchAPI<AnalysisResult>('/analyze/', {
      method: 'POST',
      body: JSON.stringify({ text, model }),
    }),

  validateDelivery: (demand: string, delivery: string) =>
    fetchAPI<ValidationResult>('/validate/', {
      method: 'POST',
      body: JSON.stringify({ demand, delivery }),
    }),

  getModels: () => fetchAPI<ModelInfo[]>('/models/'),
  
  selectModel: (modelName: string) =>
    fetchAPI<{ status: string; model: string }>(`/models/select?model_name=${modelName}`, {
      method: 'POST',
    }),

  submitFeedback: (demandId: number, rating: number, comment?: string) =>
    fetchAPI<{ status: string }>('/feedback/', {
      method: 'POST',
      body: JSON.stringify({ demand_id: demandId, rating, comment }),
    }),

  getStats: () => fetchAPI<Stats>('/knowledge/stats'),

  getKnowledge: () => fetchAPI<KnowledgeBase>('/knowledge/'),
  getHistory: (limit: number) => fetchAPI<any>(`/analyze/history?limit=${limit}`)
};