export interface AnalysisResult {
  demand_id?: number;
  resume?: string;
  explicit_requirements?: string[];
  implicit_requirements?: string[];
  positive_scenarios?: string[];
  negative_scenarios?: string[];
  complexity?: string;
  deadline_estimate?: string;
  strategic_analysis?: any;
}

export interface ValidationResult {
  status: string;
  score: number;
  strengths?: string[];
  gaps?: string[];
  recommendations?: string[];
}

export interface ModelInfo {
  name: string;
  ollama_id: string;
  size_gb: number;
  ram_required: number;
  category: string;
  description: string;
  compatible: boolean;
}

export interface Stats {
  demands: number;
  validations: number;
  learnings: number;
  feedbacks: number;
  average_confidence: number;
  average: number;
}

export interface KnowledgeBase {
  examples?: { examples: Example[] };
  patterns?: { demand_patterns: Pattern[] };
}

export interface Example {
  demand: string;
  analysis: AnalysisResult;
}

export interface Pattern {
  id: string;
  type: string;
  frequency: string;
  confidence: number;
  common_requirements: string[];
  implicit_requirements: string[];
  typical_risks: string[];
  common_evolutions: string[];
}