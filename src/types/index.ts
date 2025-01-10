export interface GiftIdea {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  timeRequired: string;
  materials: string[];
  steps: string[];
  imageUrl: string;
  occasion: string;
}

export interface MaterialInventory {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export type Occasion = 'Birthday' | 'Anniversary' | 'Holiday' | 'Wedding' | 'Other';