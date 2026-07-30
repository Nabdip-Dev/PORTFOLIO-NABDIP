export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface HeroData {
  _id: string;
  greeting: string;
  name: string;
  titles: string[];
  availability: boolean;
  resumeUrl?: string;
  socialLinks: SocialLink[];
}
