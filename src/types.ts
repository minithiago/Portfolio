export interface Project {
  id: string;
  title: string;
  category: 'Web' | 'Mobile' | 'Game';
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
  features: string[];
  mockData?: any;
  githubUrl?: string;
  webUrl?: string;
  imageUrl?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'tools';
  level: number; // 0 to 100
  color: string;
  icon: string;
}

export type CubeFace = 'front' | 'right' | 'back' | 'left' | 'top' | 'bottom';
