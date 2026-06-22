export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  tags: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'frontend' | 'backend' | 'design' | 'tools';
}

export interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'system' | 'ai';
  description: string;
  detailedDescription: string;
  techStack: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  duration: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string; // Markdown supported or rich paragraphs
  category: 'technology' | 'coding' | 'design' | 'tutorials';
  imageUrl: string;
  readTime: string;
  date: string;
  views: number;
  likes: number;
  comments: Comment[];
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  priceStart: number;
  features: string[];
  iconName: string; // Lucide icon name mapping
  imageUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  unread: boolean;
}
