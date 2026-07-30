export interface AboutStat {
  label: string;
  value: string;
}
export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}
export interface AboutData {
  photo?: { url: string };
  biography: string;
  achievements: string[];
  stats: AboutStat[];
  timeline: TimelineItem[];
}

export interface SkillData {
  _id: string;
  name: string;
  icon: string;
  percentage: number;
  description?: string;
  category: "frontend" | "backend" | "database" | "deployment" | "version-control" | "tools";
}

export interface ServiceData {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: number;
  active: boolean;
}

export interface ProjectMedia {
  url: string;
  publicId?: string;
}
export interface ProjectData {
  _id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  description: string;
  images: ProjectMedia[];
  video?: ProjectMedia;
  features: string[];
  technologies: string[];
  category: string;
  githubLink?: string;
  liveLink?: string;
  status: "completed" | "in-progress" | "planned";
  featured: boolean;
  views: number;
}
export interface PaginatedResponse<T> {
  data: T[];
  pagination: { page: number; limit: number; total: number; pages: number };
}

export interface ExperienceData {
  _id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  technologies: string[];
}

export interface EducationData {
  _id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface TestimonialData {
  _id: string;
  name: string;
  country?: string;
  company?: string;
  rating: number;
  comment: string;
  photo?: { url: string };
  createdAt: string;
}

export interface FaqData {
  _id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PricingFeature {
  text: string;
  included: boolean;
}
export interface PricingPlanData {
  _id: string;
  name: string;
  price: number;
  billingPeriod: string;
  description?: string;
  features: PricingFeature[];
  highlighted: boolean;
}

export interface PostData {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: { url: string };
  tags: string[];
  published: boolean;
  publishedAt?: string;
  views: number;
  createdAt: string;
}
