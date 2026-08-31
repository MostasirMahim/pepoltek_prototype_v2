export interface ProjectBenefit {
  title: string;
  desc: string;
  icon?: string;
}

export interface ProjectModule {
  title: string;
  desc: string;
  icon?: string;
  points: string[];
}

export interface ProjectService {
  title: string;
  desc: string;
  icon?: string;
}

export interface CaseStudy {
  challenge?: string;
  solution?: string;
  results?: string;
  features?: string[];
  techStack?: string[];
  architecture?: string[];
  techDeepDive?: string[];
  gallery?: { label: string; src: string }[];
}

export interface ScreenshotItem {
  src: string;
  label?: string;
  isLandscape?: boolean;
}

export interface Project {
  id: string | number;
  numericId: number;
  slug: string;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  logo?: string;
  url?: string;
  features: string[];
  benefits: ProjectBenefit[];
  modules: ProjectModule[];
  services?: ProjectService[];
  tags: string[];
  colorStart?: string;
  colorEnd?: string;
  image: string;
  alt: string;
  titleTop: string;
  titleBottom: string;
  labelLeft: string;
  descLeft: string;
  labelRight: string;
  descRight: string;
  github?: string;
  live?: string;
  liveDemo?: string;
  screenshots?: (string | ScreenshotItem)[];
  caseStudy?: CaseStudy;
}
