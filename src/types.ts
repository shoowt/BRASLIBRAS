export interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface TranslationHistoryItem {
  id: string;
  timestamp: string;
  timeDisplay: string;
  title: string;
  text: string;
  confidence: number;
}

export interface LibrasSignSample {
  id: string;
  title: string;
  portugueseText: string;
  description: string;
  tags: string[];
  confidence: number;
}
