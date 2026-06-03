
export enum Language {
  ENGLISH = 'English',
  TELUGU = 'Telugu'
}

export enum Occupation {
  FARMER = 'Farmer',
  STUDENT = 'Student',
  SELF_EMPLOYED = 'Self-Employed',
  UNEMPLOYED = 'Unemployed',
  PRIVATE_SECTOR = 'Private Sector',
  GOVERNMENT_SECTOR = 'Government Sector'
}

export enum Category {
  GENERAL = 'General',
  OBC = 'OBC',
  SC = 'SC',
  ST = 'ST',
  MINORITY = 'Minority'
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  district: string;
  gender: Gender;
  occupation: Occupation;
  incomeRange: string;
  category: Category;
  preferredLanguage: Language;
}

export interface Scheme {
  id: string;
  name: string;
  department: string;
  goNumber: string;
  description: string;
  eligibilityCriteria: string[];
  benefits: string[];
  applicationSteps: string[];
  officialLink: string;
  categoryTags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  references?: Array<{
    title: string;
    goNumber?: string;
    department: string;
  }>;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  isRead: boolean;
  type: 'scheme' | 'policy' | 'system';
  link?: string;
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: number;
  category: string;
}
