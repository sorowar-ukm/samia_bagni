
export interface PersonalInfo {
  name: string;
  class: string;
  section: string;
  roll: string;
  id: string;
  institution: string;
}

export interface ExperienceItem {
  title: string;
  role?: string;
  description: string;
  icon?: string;
}

export interface SkillItem {
  category: string;
  skills: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string;
  isError?: boolean;
}
