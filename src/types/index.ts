export type ProjectCategory = 'ALL' | 'AI_ML_CV' | 'ROBOTICS_IOT' | 'CYBERSEC' | 'SYSTEMS_CLI';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  categoryLabel: string;
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'RESEARCH';
  year: string;
  featured?: boolean;
  simulatorType?: 'augmentation' | 'flight-cli' | 'gesture-bot' | 'ctf-lab';
  metrics?: { label: string; value: string }[];
  keyHighlights: string[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  domain: string;
  status: 'IN PROGRESS' | 'SUBMITTED' | 'PREPRINT';
  description: string;
  focusAreas: string[];
  leadRole: string;
  abstract?: string;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: 'Core' | 'Advanced' | 'Proficient' | 'Intermediate';
    experience: string;
    description: string;
  }[];
}

export interface HardwareSpec {
  name: string;
  tag: string;
  architecture: string;
  clockSpeed: string;
  useCase: string;
  protocols: string[];
  status: 'ACTIVE' | 'PRIMARY' | 'STANDBY';
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: 'HACKATHON' | 'ROBOTICS' | 'CYBERSEC' | 'ACADEMIC' | 'DEVELOPMENT';
  badge: string;
  badgeType?: 'gold' | 'silver' | 'amber' | 'emerald' | 'cyan';
  description: string;
  tags: string[];
}
