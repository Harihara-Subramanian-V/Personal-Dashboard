export type ProjectCategory = 'ALL' | 'AI_ML_CV' | 'ROBOTICS_IOT' | 'CYBERSEC' | 'SYSTEMS_CLI';

export interface Project {
  id: string;
  title: string;
  codename: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  categoryLabel: string;
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  clearance: 'TOP SECRET' | 'RESTRICTED' | 'UNCLASSIFIED' | 'CLASSIFIED';
  status: 'DEPLOYED' | 'OPERATIONAL' | 'LAB PROTOTYPE' | 'ACTIVE REPO';
  year: string;
  stars?: number;
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
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  levelLabel: string;
  category: 'LANGUAGES' | 'AI_CV' | 'HARDWARE_IOT' | 'CYBERSEC_SYSTEMS' | 'DATABASES_TOOLS';
  experience: string;
  iconName?: string;
  description: string;
}

export interface HardwareSpec {
  name: string;
  tag: string;
  architecture: string;
  clockSpeed: string;
  useCase: string;
  protocols: string[];
  status: 'ONLINE' | 'STANDBY';
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: 'HACKATHON' | 'ROBOTICS' | 'CYBERSEC' | 'ACADEMIC' | 'DEVELOPMENT';
  badge: string;
  badgeType?: 'gold' | 'silver' | 'orange' | 'cyan';
  description: string;
  tags: string[];
}

export interface TerminalOutput {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system' | 'ascii';
  text: string;
  timestamp: string;
  isHtml?: boolean;
}
