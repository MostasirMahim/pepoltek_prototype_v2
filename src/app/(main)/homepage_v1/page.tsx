"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./homepage_v1.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/* ==========================================================================
   INLINED ICONS
   ========================================================================== */

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

function CheckCircle({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ArrowRight({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ==========================================================================
   INLINED PORTFOLIO TYPES & DATA
   ========================================================================== */

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

const projectsData: Project[] = [
  {
    id: "bidyatek",
    numericId: 1,
    slug: "bidyatek",
    type: "SaaS Product",
    title: "BIDYATek",
    subtitle: "Comprehensive School Management System",
    description:
      "An all-in-one SaaS platform built to digitalize educational institutions. From student enrollment to fee management, attendance tracking, and result processing, BIDYATek bridges the gap between administrators, teachers, and parents.",
    overview:
      "BIDYATek revolutionizes the way educational institutions operate by providing a centralized, cloud-based platform for all stakeholders. By automating complex workflows like fee collection, attendance tracking, and grading, it frees up educators to focus on what matters most: teaching. Designed for scalability and ease of use, BIDYATek seamlessly serves everything from local academies to large university networks, ensuring data integrity and real-time communication across the board.",
    logo: "/solutions/solution_icon.png",
    url: "https://bidyatek.com/",
    features: [
      "Student Information System",
      "Automated Fee Collection",
      "Real-time Attendance",
      "Academic Result Processing",
      "Parent-Teacher Portal",
    ],
    benefits: [
      {
        title: "Time Efficiency",
        desc: "Automate manual administrative tasks to save up to 40 hours per week.",
        icon: "ri-timer-flash-line",
      },
      {
        title: "Parent Engagement",
        desc: "Keep parents in the loop with real-time updates and push notifications.",
        icon: "ri-parent-line",
      },
      {
        title: "Financial Control",
        desc: "Track every penny with advanced fee collection and ledger management.",
        icon: "ri-money-dollar-circle-line",
      },
    ],
    modules: [
      {
        title: "Academics",
        desc: "Manage classes, subjects, exams, and generate automated report cards.",
        icon: "ri-book-open-line",
        points: ["Class & Subject Allocation", "Exam Scheduling", "Automated Grading"],
      },
      {
        title: "Finance",
        desc: "Handle fee structures, payroll, expenses, and comprehensive accounting.",
        icon: "ri-wallet-3-line",
        points: ["Fee Collection", "Expense Tracking", "Payroll Processing"],
      },
      {
        title: "Communication",
        desc: "Built-in SMS, Email, and Push Notifications for immediate alerts.",
        icon: "ri-message-3-line",
        points: ["SMS Gateways", "Email Broadcasts", "Push Notifications"],
      },
    ],
    tags: ["Education Tech", "School Management", "Cloud Native"],
    colorStart: "#0a84ff",
    colorEnd: "#38bdf8",
    image: "/project_images/bidyatek.png",
    alt: "BIDYATek: Comprehensive School Management System",
    titleTop: "BIDYATEK",
    titleBottom: "EDTECH SAAS",
    labelLeft: "EDTECH POD",
    descLeft: "All-in-one SaaS platform built to digitalize educational institutions from enrollment to grading.",
    labelRight: "CLOUD NATIVE",
    descRight: "Automated fee collection, real-time attendance tracking, and parent-teacher communication portals.",
    live: "https://bidyatek.com/",
    liveDemo: "https://bidyatek.com/",
    caseStudy: {
      challenge: "Educational institutions struggle with fragmented legacy software, manual fee collection, and delayed parent communications.",
      solution: "Engineered BIDYATek as a multi-tenant cloud-native platform with unified gradebooks, automated payment gateways, and real-time push alerts.",
      results: "Saved institutions 40+ administrative hours per week and increased on-time tuition collection rates by 38%.",
      techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Tailwind CSS"],
    },
  },
  {
    id: "pepoltek-hrm",
    numericId: 2,
    slug: "pepoltek-hrm",
    type: "SaaS Product",
    title: "Intelligent HR Solution",
    subtitle: "Intelligent Human Resource Management",
    description:
      "Empower your HR operations with our modern HRMS. Automate payroll, streamline recruitment, manage leave requests, and evaluate employee performance in one unified, cloud-based platform.",
    overview:
      "Intelligent HR Solution is a comprehensive, intelligent human resource management system designed to eliminate HR bottlenecks. By centralizing employee data, automating tedious payroll calculations, and streamlining the recruitment pipeline, our platform empowers your HR department to transition from administrative overhead to strategic business partners. Built with compliance and security at its core, it ensures your workforce is managed efficiently.",
    logo: "/solutions/solution_icon.png",
    url: "#",
    features: [
      "Payroll Automation",
      "Performance Management",
      "Leave & Attendance",
      "Recruitment Pipeline",
      "Employee Self-Service",
    ],
    benefits: [
      {
        title: "Automated Payroll",
        desc: "100% accurate payroll processing with automated tax compliance.",
        icon: "ri-bank-card-line",
      },
      {
        title: "Talent Retention",
        desc: "Identify top performers through advanced analytics and review cycles.",
        icon: "ri-bar-chart-grouped-line",
      },
      {
        title: "Self-Service Portal",
        desc: "Reduce HR tickets by empowering employees to manage their own profiles.",
        icon: "ri-user-settings-line",
      },
    ],
    modules: [
      {
        title: "Recruitment (ATS)",
        desc: "Post jobs, parse resumes, and manage interview pipelines seamlessly.",
        icon: "ri-user-search-line",
        points: ["Resume Parsing", "Interview Scheduling", "Offer Management"],
      },
      {
        title: "Core HR",
        desc: "Manage employee directories, organizational charts, and document vaults.",
        icon: "ri-organization-chart",
        points: ["Employee Database", "Document Vault", "Org Charts"],
      },
      {
        title: "Performance",
        desc: "Conduct 360-degree reviews, set OKRs, and track continuous feedback.",
        icon: "ri-line-chart-line",
        points: ["360-Degree Feedback", "OKR Tracking", "Appraisal Cycles"],
      },
    ],
    tags: ["HR Tech", "Enterprise", "Automation"],
    colorStart: "#0ea5e9",
    colorEnd: "#38bdf8",
    image: "/project_images/pepoltek-hrm.png",
    alt: "Intelligent HR Solution: HRMS Platform",
    titleTop: "INTELLIGENT HR",
    titleBottom: "SOLUTION",
    labelLeft: "ENTERPRISE HRMS",
    descLeft: "Modern HRMS that automates payroll, recruitment pipelines, and 360-degree employee appraisals.",
    labelRight: "WORKFORCE AI",
    descRight: "Automated tax compliance, self-service employee portal, and real-time OKR performance metrics.",
    caseStudy: {
      challenge: "High administrative overhead, manual salary slip calculations, and disconnected applicant tracking systems across distributed enterprise teams.",
      solution: "Developed an intelligent human resource management platform centralizing payroll, ATS pipelines, and performance reviews in one unified suite.",
      results: "100% payroll calculation accuracy with zero compliance violations and 65% faster time-to-hire across technical roles.",
      techStack: ["React", "TypeScript", "Node.js", "Docker", "PostgreSQL", "Tailwind CSS"],
    },
  },
  {
    id: "erp-suite",
    numericId: 3,
    slug: "erp-suite",
    type: "Enterprise Software",
    title: "Enterprise ERP",
    subtitle: "Next-Gen Enterprise Resource Planning",
    description:
      "Unify your entire business operations. Our custom ERP solutions provide real-time insights, optimize supply chain logistics, and drive data-driven decision making across all departments.",
    overview:
      "Our Next-Gen Enterprise ERP suite dismantles data silos and unifies your entire business into a single source of truth. From supply chain logistics to advanced financial forecasting, the platform provides unparalleled visibility into your operations. By leveraging AI-driven analytics and highly customizable workflows, the ERP adapts to your specific business model, scaling effortlessly as your organization expands globally.",
    logo: "/solutions/solution_icon.png",
    url: "#",
    features: [
      "Financial Accounting",
      "Supply Chain Optimization",
      "CRM Integration",
      "Inventory Tracking",
      "Advanced Data Analytics",
    ],
    benefits: [
      {
        title: "Unified Operations",
        desc: "Connect finance, sales, and supply chain in one central dashboard.",
        icon: "ri-dashboard-3-line",
      },
      {
        title: "Data-Driven Decisions",
        desc: "Leverage real-time analytics to forecast trends and optimize costs.",
        icon: "ri-line-chart-line",
      },
      {
        title: "Scalable Architecture",
        desc: "Add or remove modules on demand as your business requirements evolve.",
        icon: "ri-stack-line",
      },
    ],
    modules: [
      {
        title: "Financial Management",
        desc: "General ledger, accounts payable/receivable, and asset management.",
        icon: "ri-money-dollar-box-line",
        points: ["General Ledger", "Asset Management", "Tax Compliance"],
      },
      {
        title: "Supply Chain",
        desc: "Procurement, warehouse management, and vendor logistics.",
        icon: "ri-truck-line",
        points: ["Vendor Management", "Warehouse Logistics", "Procurement"],
      },
      {
        title: "CRM Integration",
        desc: "Track sales pipelines, customer interactions, and service tickets.",
        icon: "ri-customer-service-2-line",
        points: ["Sales Pipeline", "Customer Support", "Lead Tracking"],
      },
    ],
    tags: ["ERP", "Logistics", "Business Intelligence"],
    colorStart: "#0a84ff",
    colorEnd: "#38bdf8",
    image: "/project_images/erp-suite.png",
    alt: "Enterprise ERP: Next-Gen ERP Suite",
    titleTop: "ENTERPRISE",
    titleBottom: "ERP SUITE",
    labelLeft: "OPERATIONS",
    descLeft: "Dismantles data silos with real-time general ledger financial forecasting and supply chain telemetry.",
    labelRight: "SUPPLY CHAIN",
    descRight: "Integrated multi-warehouse inventory management, procurement tracking, and executive BI dashboards.",
    caseStudy: {
      challenge: "Disconnected legacy systems causing supply chain delays, inaccurate financial forecasting, and manual stock reconciliations.",
      solution: "Architected a high-throughput ERP backbone integrating real-time telemetry, automated vendor EDI orders, and automated ledger balancing.",
      results: "Unified operations across 12 countries, reducing inventory holding costs by 24% and forecasting revenue with 98% accuracy.",
      techStack: ["Next.js", "Go", "PostgreSQL", "Kafka", "Redis", "Docker"],
    },
  },
  {
    id: "club-management",
    numericId: 4,
    slug: "club-management",
    type: "SaaS Product",
    title: "Club Member Management",
    subtitle: "Complete Club & Member Ecosystem",
    description:
      "Streamline your club's operations with an integrated platform. Handle member subscriptions, organize events, manage facility bookings, and improve member communications effortlessly.",
    overview:
      "Designed specifically for country clubs, fitness centers, and professional associations, our Club Management software provides an end-to-end ecosystem to foster community engagement. The platform completely automates billing cycles and membership renewals, while offering a sleek member-facing app for facility bookings and event RSVPs. It's everything you need to boost retention and operate efficiently.",
    logo: "/solutions/solution_icon.png",
    url: "#",
    features: [
      "Membership Subscriptions",
      "Event Management",
      "Facility Booking",
      "Member Portal",
      "Automated Billing",
    ],
    benefits: [
      {
        title: "Boost Retention",
        desc: "Keep members engaged with a branded mobile app and personalized offers.",
        icon: "ri-heart-pulse-line",
      },
      {
        title: "Zero Billing Errors",
        desc: "Automate recurring payments, dunning management, and invoicing.",
        icon: "ri-secure-payment-line",
      },
      {
        title: "Resource Optimization",
        desc: "Maximize facility usage with smart booking algorithms.",
        icon: "ri-calendar-todo-line",
      },
    ],
    modules: [
      {
        title: "Member Directory",
        desc: "Detailed member profiles, tier management, and engagement tracking.",
        icon: "ri-contacts-book-2-line",
        points: ["Member Profiles", "Tier Management", "Engagement Stats"],
      },
      {
        title: "Facility Booking",
        desc: "Visual calendars for courts, rooms, and equipment reservations.",
        icon: "ri-calendar-check-line",
        points: ["Visual Calendars", "Equipment Rentals", "Conflict Resolution"],
      },
      {
        title: "Event Ticketing",
        desc: "Create events, sell tickets, and manage capacity in real-time.",
        icon: "ri-ticket-2-line",
        points: ["Ticket Sales", "Capacity Management", "Event Check-in"],
      },
    ],
    tags: ["Lifestyle", "Community", "SaaS"],
    colorStart: "#10b981",
    colorEnd: "#34d399",
    image: "/project_images/club-management.png",
    alt: "Club Member Management: Member Ecosystem",
    titleTop: "CLUB MEMBER",
    titleBottom: "MANAGEMENT",
    labelLeft: "MEMBER PORTAL",
    descLeft: "Comprehensive ecosystem handling tiered subscriptions, visual calendar bookings, and event check-ins.",
    labelRight: "COMMUNITY",
    descRight: "Automated recurring dunning, dynamic facility capacity optimization, and VIP member directory.",
    caseStudy: {
      challenge: "High member turnover and double bookings resulting from manual paper calendars and non-automated subscription billing.",
      solution: "Created an interactive self-service portal with conflict-free scheduling algorithms and automatic recurring Stripe billing.",
      results: "Zero booking conflicts, 94% retention rate, and a 45% increase in member engagement for club events.",
      techStack: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe API"],
    },
  },
  {
    id: "custom-it-solutions",
    numericId: 5,
    slug: "custom-it-solutions",
    type: "Service",
    title: "Custom IT Solutions",
    subtitle: "Tailored Technical Architecture",
    description:
      "End-to-end custom software development and IT consulting tailored to your unique business challenges. From legacy system modernization to scalable cloud-native architectures.",
    overview:
      "When off-the-shelf software falls short, our Custom IT Solutions division steps in. We act as your elite technical strike team, architecting bespoke software systems designed specifically to conquer your unique business challenges. From modernizing monolithic legacy systems to building highly scalable, cloud-native microservices from scratch, we deliver high-performance code that drives your strategic vision forward.",
    logo: "/solutions/solution_icon.png",
    url: "#",
    features: [
      "Custom Software Dev",
      "Cloud Architecture",
      "System Integration",
      "Legacy Modernization",
      "Strategic Consulting",
    ],
    benefits: [
      {
        title: "Tailored Fit",
        desc: "Software built exactly to your workflows with no compromises or bloated features.",
        icon: "ri-pencil-ruler-2-line",
      },
      {
        title: "Future-Proof",
        desc: "We utilize modern, scalable tech stacks ensuring long-term viability.",
        icon: "ri-rocket-2-line",
      },
      {
        title: "Elite Engineering",
        desc: "Access to top 1% developers, cloud architects, and UI/UX designers.",
        icon: "ri-code-s-slash-line",
      },
    ],
    modules: [
      {
        title: "Cloud Migration",
        desc: "Seamless transition to AWS, Azure, or GCP with zero downtime.",
        icon: "ri-cloud-windy-line",
        points: ["AWS/Azure/GCP", "Zero Downtime", "Architecture Design"],
      },
      {
        title: "Custom App Dev",
        desc: "Full-stack web, mobile, and desktop application engineering.",
        icon: "ri-braces-line",
        points: ["Web Applications", "Mobile Apps (iOS/Android)", "Desktop Software"],
      },
      {
        title: "API Integrations",
        desc: "Connect disparate systems to create unified data pipelines.",
        icon: "ri-plug-line",
        points: ["REST/GraphQL APIs", "Legacy System Hooks", "Data Pipelines"],
      },
    ],
    tags: ["Consulting", "Development", "Cloud"],
    colorStart: "#0a84ff",
    colorEnd: "#38bdf8",
    image: "/project_images/custom-it-solutions.png",
    alt: "Custom IT Solutions: Tailored Technical Architecture",
    titleTop: "CUSTOM IT",
    titleBottom: "SOLUTIONS",
    labelLeft: "ARCHITECTURE",
    descLeft: "Elite engineering pod architecting cloud-native microservices and modernizing legacy systems.",
    labelRight: "CLOUD STRIKE",
    descRight: "Zero-downtime AWS/GCP cloud migrations, unified GraphQL data pipelines, and custom enterprise apps.",
    caseStudy: {
      challenge: "Legacy monolithic architectures suffering from downtime vulnerabilities, unscalable codebases, and slow feature velocity.",
      solution: "Refactored client systems into high-speed event-driven microservices with continuous CI/CD automated deployment pipelines.",
      results: "Achieved 99.99% uptime, reduced infrastructure overhead by 40%, and accelerated release cycles from months to days.",
      techStack: ["Kubernetes", "AWS", "Go", "Next.js", "GraphQL", "Terraform"],
    },
  },
  {
    id: "omnisource",
    numericId: 6,
    slug: "omnisource",
    type: "Corporate Sales & Sourcing Service",
    title: "OmniSource",
    subtitle: "Corporate Supplies, Merchandise and Gifts",
    description:
      "A full-service corporate sourcing arm that designs, produces, brands, and delivers premium gifts and promotional merchandise. From concept and customization to nationwide fulfillment, OmniSource takes the entire supply chain off your plate so your brand shows up flawlessly at every touchpoint.",
    overview:
      "OmniSource is our dedicated B2B sourcing division, engineered to remove the friction from corporate gifting and branded merchandise. We operate as a single accountable partner across the full lifecycle, sourcing raw materials, managing overseas and local production, handling logo application and offset printing, curating gift boxes, and coordinating warehousing and last-mile delivery. Whether a client needs fifty welcome kits for new hires or fifty thousand branded items for a nationwide campaign, our team engineers each order around the client's budget, brand guidelines, and timeline. By consolidating vendors, quality control, and delivery under one roof, OmniSource lets organizations invest in relationships instead of chasing suppliers.",
    logo: "/solutions/solution_icon.png",
    url: "#",
    features: [
      "Custom Product Sourcing & Manufacturing",
      "In-House Branding, Printing & Engraving",
      "Curated Corporate Gift Boxes",
      "Nationwide Warehousing & Fulfillment",
      "Bulk Order Management & Vendor Consolidation",
      "Dedicated Account & Consultancy Support",
    ],
    benefits: [
      {
        title: "Single Point of Accountability",
        desc: "One partner owns sourcing, production, branding, and delivery, with no more juggling a dozen vendors or chasing status updates.",
        icon: "ri-shake-hands-line",
      },
      {
        title: "Budget-Fit Customization",
        desc: "Every recommendation is tailored to your industry, recipient, and spending limits, so you get standout gifts without overspending.",
        icon: "ri-price-tag-3-line",
      },
      {
        title: "Brand Consistency at Scale",
        desc: "Strict quality control and precise logo application keep your identity sharp across orders of any volume.",
        icon: "ri-verified-badge-line",
      },
      {
        title: "Speed to Delivery",
        desc: "Streamlined production pipelines and nationwide logistics get your gifts to recipients on schedule, every time.",
        icon: "ri-truck-line",
      },
    ],
    modules: [
      {
        title: "Promotional Merchandise",
        desc: "High-visibility branded items built for campaigns, giveaways, and everyday marketing impact.",
        icon: "ri-gift-2-line",
        points: ["Pens, Notebooks & Drinkware", "USB Drives, Power Banks & Tech Add-ons", "Tote Bags, Keychains & EDC"],
      },
      {
        title: "Branded Apparel",
        desc: "Custom-manufactured clothing that turns teams and audiences into walking brand ambassadors.",
        icon: "ri-t-shirt-line",
        points: ["Polos, Tees, Hoodies & Jackets", "Caps, Scarves & Accessories", "Embroidery, Screen & DTG"],
      },
      {
        title: "Curated Gift Boxes",
        desc: "Ready-to-gift bundles assembled and packaged around any occasion or recipient profile.",
        icon: "ri-inbox-archive-line",
        points: ["Onboarding & Welcome Kits", "Festive & Seasonal Hampers", "Gourmet Edibles & Baskets"],
      },
    ],
    services: [
      {
        title: "Personalization & Customization",
        desc: "Adapt any product with your logo, colors, names, or bespoke messaging.",
        icon: "ri-palette-line",
      },
      {
        title: "Offset & Digital Printing",
        desc: "Professional print production for brochures, catalogues, cards, and letterheads.",
        icon: "ri-printer-line",
      },
      {
        title: "Nationwide Shipping",
        desc: "Countrywide delivery network that gets gifts to recipients wherever they are.",
        icon: "ri-map-pin-line",
      },
    ],
    tags: ["B2B Sourcing", "Corporate Merchandise", "Fulfillment"],
    colorStart: "#0a84ff",
    colorEnd: "#38bdf8",
    image: "/project_images/omnisource.png",
    alt: "OmniSource: Corporate Supplies, Merchandise & Gifts",
    titleTop: "OMNISOURCE",
    titleBottom: "B2B SOURCING",
    labelLeft: "B2B SOURCING",
    descLeft: "Full-service corporate sourcing arm producing premium branded merchandise and executive gift boxes.",
    labelRight: "FULFILLMENT",
    descRight: "In-house laser engraving, vendor consolidation, nationwide warehousing, and direct-to-door delivery.",
    caseStudy: {
      challenge: "Enterprise brands face severe logistical friction, inconsistent branding, and delayed delivery when coordinating across multiple gift vendors.",
      solution: "Consolidated the end-to-end supply chain into OmniSource: design, factory manufacturing, custom branding, warehousing, and nationwide drop-shipping.",
      results: "Fulfilled 150,000+ custom branded merchandise units with 100% brand guideline adherence and on-time nationwide delivery.",
      techStack: ["B2B Portal", "Automated EDI", "ERP Fulfillment", "Digital Proofing"],
    },
  },
];

/* ==========================================================================
   INLINED SPLIT TYPE UTILITY
   ========================================================================== */

class SplitType {
  elements: HTMLElement[];
  chars?: HTMLElement[];
  words?: HTMLElement[];
  lines?: HTMLElement[];

  constructor(target: HTMLElement | string | NodeListOf<HTMLElement>, options: { types?: string } = {}) {
    let elements: HTMLElement[] = [];
    if (typeof target === "string") {
      elements = Array.from(document.querySelectorAll(target));
    } else if (target instanceof HTMLElement) {
      elements = [target];
    } else if (target) {
      elements = Array.from(target as unknown as HTMLElement[]);
    }
    this.elements = elements;

    const types = (options.types || "chars,words,lines").split(",").map((s) => s.trim());
    const splitChars = types.includes("chars");
    const splitLines = types.includes("lines");
    const splitWords = types.includes("words");

    const allChars: HTMLElement[] = [];
    const allWords: HTMLElement[] = [];
    const allLines: HTMLElement[] = [];

    elements.forEach((el) => {
      const text = el.textContent || "";
      el.innerHTML = "";

      if (splitChars) {
        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.className = "char";
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.display = "inline-block";
          el.appendChild(span);
          allChars.push(span);
        });
      } else if (splitLines || splitWords) {
        const words = text.split(/\s+/).filter(Boolean);
        words.forEach((word, wIdx) => {
          const wordSpan = document.createElement("span");
          wordSpan.className = "word line";
          wordSpan.textContent = word;
          wordSpan.style.display = "inline-block";
          wordSpan.style.marginRight = wIdx < words.length - 1 ? "0.28em" : "0";
          el.appendChild(wordSpan);
          allWords.push(wordSpan);
          allLines.push(wordSpan);
        });
      }
    });

    if (splitChars) this.chars = allChars;
    if (splitWords) this.words = allWords;
    if (splitLines) this.lines = allLines;
  }

  revert() {
    this.elements.forEach((el) => {
      el.textContent = el.textContent || "";
    });
  }
}

/* ==========================================================================
   INLINED CURSOR GRID
   ========================================================================== */

type Falloff = "linear" | "smooth" | "sharp";

interface CursorGridProps {
  cellSize?: number;
  color?: string;
  radius?: number;
  falloff?: Falloff;
  holdTime?: number;
  fadeDuration?: number;
  lineWidth?: number;
  maxOpacity?: number;
  fillOpacity?: number;
  gridOpacity?: number;
  cellRadius?: number;
  clickPulse?: boolean;
  pulseSpeed?: number;
  ambient?: boolean;
  ambientDensity?: number;
  ambientMaxAlpha?: number;
  className?: string;
}

interface GridConfig {
  cellSize: number;
  color: string;
  radius: number;
  falloff: Falloff;
  holdTime: number;
  fadeDuration: number;
  lineWidth: number;
  maxOpacity: number;
  fillOpacity: number;
  gridOpacity: number;
  cellRadius: number;
  clickPulse: boolean;
  pulseSpeed: number;
  ambient: boolean;
  ambientDensity: number;
  ambientMaxAlpha: number;
}

interface Pulse {
  x: number;
  y: number;
  t0: number;
}

interface AmbientCell {
  index: number;
  baseAlpha: number;
  phase: number;
  speed: number;
}

interface CircuitStream {
  points: [number, number][];
  speed: number;
  length: number;
  offset: number;
  color: string;
}

const FALLOFF_CURVES: Record<Falloff, (t: number) => number> = {
  linear: (t) => t,
  smooth: (t) => t * t * (3 - 2 * t),
  sharp: (t) => t * t * t,
};

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const num = parseInt(v.slice(0, 6), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

function pseudoRandom(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
  return n - Math.floor(n);
}

function CursorGrid({
  cellSize = 56,
  color = "#0a84ff",
  radius = 175,
  falloff = "smooth",
  holdTime = 400,
  fadeDuration = 700,
  lineWidth = 1.3,
  maxOpacity = 0.75,
  fillOpacity = 0.08,
  gridOpacity = 0.07,
  cellRadius = 6,
  clickPulse = true,
  pulseSpeed = 600,
  ambient = true,
  ambientDensity = 0.28,
  ambientMaxAlpha = 0.42,
  className = "",
}: CursorGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef<GridConfig>({} as GridConfig);
  const wakeRef = useRef<(() => void) | null>(null);

  propsRef.current = {
    cellSize,
    color,
    radius,
    falloff,
    holdTime,
    fadeDuration,
    lineWidth,
    maxOpacity,
    fillOpacity,
    gridOpacity,
    cellRadius,
    clickPulse,
    pulseSpeed,
    ambient,
    ambientDensity,
    ambientMaxAlpha,
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let cols = 0;
    let rows = 0;
    let offX = 0;
    let offY = 0;
    let alphas = new Float32Array(0);
    let touched = new Float64Array(0);
    let ambientMap = new Map<number, AmbientCell>();
    let w = 0;
    let h = 0;
    const pulses: Pulse[] = [];
    const streams: CircuitStream[] = [];
    let raf = 0;
    let running = false;
    let lastFrame = 0;

    const rebuild = () => {
      const p = propsRef.current;
      w = container.offsetWidth;
      h = container.offsetHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / p.cellSize) + 1;
      rows = Math.ceil(h / p.cellSize) + 1;
      offX = (w - cols * p.cellSize) / 2;
      offY = (h - rows * p.cellSize) / 2;
      alphas = new Float32Array(cols * rows);
      touched = new Float64Array(cols * rows);

      ambientMap.clear();
      if (p.ambient) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const normX = c / cols;
            if (normX < 0.48) continue;

            const idx = r * cols + c;
            const rand = pseudoRandom(c + 1, r + 1);
            const normY = r / rows;
            const clusterBias = Math.sin(normY * Math.PI) * 0.15 + (normX > 0.6 ? 0.15 : 0);

            if (rand < p.ambientDensity + clusterBias) {
              const rand2 = pseudoRandom(c + 13.5, r + 7.1);
              const rand3 = pseudoRandom(c + 91.2, r + 43.8);
              ambientMap.set(idx, {
                index: idx,
                baseAlpha: p.ambientMaxAlpha * (0.5 + 0.5 * rand2),
                phase: rand3 * Math.PI * 2,
                speed: 0.7 + 0.8 * rand,
              });
            }
          }
        }
      }

      streams.length = 0;
      if (w > 200 && h > 200) {
        const step = p.cellSize;
        streams.push({
          points: [
            [offX + step * 10, offY + step * 1],
            [offX + step * 14, offY + step * 1],
            [offX + step * 14, offY + step * 4],
            [offX + step * 18, offY + step * 4],
          ],
          speed: 0.18,
          length: step * 3,
          offset: 0,
          color: "#38bdf8",
        });
        streams.push({
          points: [
            [offX + step * 11, offY + step * 3],
            [offX + step * 16, offY + step * 3],
            [offX + step * 16, offY + step * 7],
            [offX + step * 19, offY + step * 7],
          ],
          speed: 0.22,
          length: step * 3.5,
          offset: 0.5,
          color: "#0a84ff",
        });
      }
    };

    const cellCenter = (i: number): [number, number] => {
      const p = propsRef.current;
      const cx = offX + (i % cols) * p.cellSize + p.cellSize / 2;
      const cy = offY + Math.floor(i / cols) * p.cellSize + p.cellSize / 2;
      return [cx, cy];
    };

    const energize = (x: number, y: number, boost?: number) => {
      const p = propsRef.current;
      const r = Math.max(p.radius, 1);
      const ease = FALLOFF_CURVES[p.falloff] ?? FALLOFF_CURVES.linear;
      const now = performance.now();
      const minCol = Math.max(0, Math.floor((x - r - offX) / p.cellSize));
      const maxCol = Math.min(cols - 1, Math.floor((x + r - offX) / p.cellSize));
      const minRow = Math.max(0, Math.floor((y - r - offY) / p.cellSize));
      const maxRow = Math.min(rows - 1, Math.floor((y + r - offY) / p.cellSize));
      for (let cRow = minRow; cRow <= maxRow; cRow++) {
        for (let cCol = minCol; cCol <= maxCol; cCol++) {
          const i = cRow * cols + cCol;
          const [cx, cy] = cellCenter(i);
          const dist = Math.hypot(cx - x, cy - y);
          if (dist > r) continue;
          const level = ease(1 - dist / r) * p.maxOpacity * (boost ?? 1);
          if (level > alphas[i]) {
            alphas[i] = level;
            touched[i] = now;
          } else if (level > 0) {
            touched[i] = now;
          }
        }
      }
    };

    const draw = (now: number) => {
      const p = propsRef.current;
      const dt = Math.min(now - lastFrame, 50);
      lastFrame = now;
      ctx.clearRect(0, 0, w, h);
      const [cr, cg, cb] = hexToRgb(p.color);

      if (p.gridOpacity > 0) {
        ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${p.gridOpacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let cCol = 0; cCol <= cols; cCol++) {
          const x = Math.round(offX + cCol * p.cellSize) + 0.5;
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
        }
        for (let cRow = 0; cRow <= rows; cRow++) {
          const y = Math.round(offY + cRow * p.cellSize) + 0.5;
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
        }
        ctx.stroke();

        ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${p.gridOpacity * 3.2})`;
        ctx.lineWidth = 1.2;
        const arm = 3.5;
        ctx.beginPath();
        for (let cCol = 0; cCol <= cols; cCol++) {
          const x = Math.round(offX + cCol * p.cellSize) + 0.5;
          for (let cRow = 0; cRow <= rows; cRow++) {
            const y = Math.round(offY + cRow * p.cellSize) + 0.5;
            ctx.moveTo(x - arm, y);
            ctx.lineTo(x + arm, y);
            ctx.moveTo(x, y - arm);
            ctx.lineTo(x, y + arm);
          }
        }
        ctx.stroke();
      }

      for (const st of streams) {
        if (st.points.length < 2) continue;
        ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, 0.12)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(st.points[0][0], st.points[0][1]);
        for (let i = 1; i < st.points.length; i++) {
          ctx.lineTo(st.points[i][0], st.points[i][1]);
        }
        ctx.stroke();

        const t = ((now * 0.0003 * st.speed + st.offset) % 1);
        let totalLen = 0;
        const segmentLens: number[] = [];
        for (let i = 0; i < st.points.length - 1; i++) {
          const segLen = Math.hypot(
            st.points[i + 1][0] - st.points[i][0],
            st.points[i + 1][1] - st.points[i][1]
          );
          segmentLens.push(segLen);
          totalLen += segLen;
        }

        let targetDist = t * totalLen;
        let px = st.points[0][0];
        let py = st.points[0][1];
        for (let i = 0; i < segmentLens.length; i++) {
          if (targetDist <= segmentLens[i]) {
            const segRatio = segmentLens[i] > 0 ? targetDist / segmentLens[i] : 0;
            px = st.points[i][0] + (st.points[i + 1][0] - st.points[i][0]) * segRatio;
            py = st.points[i][1] + (st.points[i + 1][1] - st.points[i][1]) * segRatio;
            break;
          }
          targetDist -= segmentLens[i];
        }

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = st.color;
        ctx.shadowColor = st.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      for (let pi = pulses.length - 1; pi >= 0; pi--) {
        const pulse = pulses[pi];
        const age = (now - pulse.t0) / 1000;
        const ringR = age * p.pulseSpeed;
        if (ringR > Math.hypot(w, h)) {
          pulses.splice(pi, 1);
          continue;
        }
        const band = p.cellSize;
        const minCol = Math.max(0, Math.floor((pulse.x - ringR - band - offX) / p.cellSize));
        const maxCol = Math.min(cols - 1, Math.floor((pulse.x + ringR + band - offX) / p.cellSize));
        const minRow = Math.max(0, Math.floor((pulse.y - ringR - band - offY) / p.cellSize));
        const maxRow = Math.min(rows - 1, Math.floor((pulse.y + ringR + band - offY) / p.cellSize));
        for (let cRow = minRow; cRow <= maxRow; cRow++) {
          for (let cCol = minCol; cCol <= maxCol; cCol++) {
            const i = cRow * cols + cCol;
            const [cx, cy] = cellCenter(i);
            const dist = Math.hypot(cx - pulse.x, cy - pulse.y);
            if (Math.abs(dist - ringR) < band / 2 && p.maxOpacity > alphas[i]) {
              alphas[i] = p.maxOpacity;
              touched[i] = now;
            }
          }
        }
      }

      const fadeStep = dt / Math.max(p.fadeDuration, 16);
      const half = p.cellSize / 2;

      const totalCells = cols * rows;
      for (let i = 0; i < totalCells; i++) {
        let a = alphas[i];
        if (a > 0 && now - touched[i] > p.holdTime) {
          a = Math.max(0, a - fadeStep);
          alphas[i] = a;
        }

        let ambAlpha = 0;
        const amb = ambientMap.get(i);
        if (amb) {
          const breath = 0.72 + 0.28 * Math.sin(now * 0.0016 * amb.speed + amb.phase);
          ambAlpha = amb.baseAlpha * breath;
        }

        const effectiveAlpha = Math.max(a, ambAlpha);
        if (effectiveAlpha <= 0.01) continue;

        const [cx, cy] = cellCenter(i);
        const gradient = ctx.createRadialGradient(cx, cy, half * 0.05, cx, cy, p.cellSize * 0.95);
        gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${effectiveAlpha * 1.1})`);
        gradient.addColorStop(0.65, `rgba(56, 189, 248, ${effectiveAlpha * 0.85})`);
        gradient.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

        const x = cx - half + 0.5;
        const y = cy - half + 0.5;
        const s = p.cellSize - 1;

        ctx.beginPath();
        if (p.cellRadius > 0) {
          ctx.roundRect(x, y, s, s, p.cellRadius);
        } else {
          ctx.rect(x, y, s, s);
        }
        if (p.fillOpacity > 0) {
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${effectiveAlpha * p.fillOpacity * 3.5})`;
          ctx.fill();
        }
        ctx.strokeStyle = gradient;
        ctx.lineWidth = p.lineWidth;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    const wake = () => {
      if (running) return;
      running = true;
      lastFrame = performance.now();
      raf = requestAnimationFrame(draw);
    };
    wakeRef.current = wake;

    const toLocal = (e: PointerEvent): [number, number] => {
      const rect = canvas.getBoundingClientRect();
      return [e.clientX - rect.left, e.clientY - rect.top];
    };

    const onPointerMove = (e: PointerEvent) => {
      const [x, y] = toLocal(e);
      if (x >= -60 && x <= w + 60 && y >= -60 && y <= h + 60) {
        energize(x, y);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!propsRef.current.clickPulse) return;
      const [x, y] = toLocal(e);
      if (x >= 0 && x <= w && y >= 0 && y <= h) {
        pulses.push({ x, y, t0: performance.now() });
      }
    };

    const ro = new ResizeObserver(() => {
      rebuild();
    });
    ro.observe(container);
    rebuild();
    wake();

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [cellSize]);

  useEffect(() => {
    wakeRef.current?.();
  }, [gridOpacity, color, lineWidth, maxOpacity, fillOpacity, cellRadius, ambient, ambientDensity, ambientMaxAlpha]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full pointer-events-none" />
    </div>
  );
}

/* ==========================================================================
   INLINED GLOBE VISUAL
   ========================================================================== */

const HUB_POINTS: [number, number][] = [
  [40.7, -74.0],
  [51.5, -0.1],
  [28.6, 77.2],
  [1.35, 103.8],
  [-33.9, 151.2],
  [52.5, 13.4],
  [-23.5, -46.6],
];

const LAND: [number, number, number, number][] = [
  [54, -100, 26, 34],
  [40, -78, 13, 13],
  [30, -105, 10, 12],
  [72, -42, 9, 16],
  [-12, -60, 24, 13],
  [4, -66, 9, 10],
  [54, 18, 13, 26],
  [62, 90, 15, 60],
  [4, 20, 30, 17],
  [30, 45, 13, 22],
  [22, 78, 11, 9],
  [35, 108, 15, 22],
  [3, 112, 11, 13],
  [-25, 134, 12, 16],
];

function isLand(lat: number, lon: number): boolean {
  for (const [cLat, cLon, rLat, rLon] of LAND) {
    let dLon = lon - cLon;
    if (dLon > 180) dLon -= 360;
    if (dLon < -180) dLon += 360;
    const a = (lat - cLat) / rLat;
    const b = dLon / rLon;
    if (a * a + b * b <= 1) return true;
  }
  return false;
}

const D2R = Math.PI / 180;

function GlobeVisual({
  hideCenterHub = false,
}: {
  hideCenterHub?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points: [number, number][] = [];
    for (let lat = -58; lat <= 82; lat += 2.6) {
      const step = 2.6 / Math.max(0.25, Math.cos(lat * D2R));
      for (let lon = -180; lon < 180; lon += step) {
        if (isLand(lat, lon)) points.push([lat, lon]);
      }
    }

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let rot = -20;
    let last = performance.now();

    const render = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduce) rot += dt * 9;

      ctx.clearRect(0, 0, w, h);

      const R = Math.min(w, h) * 0.38;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const hubX = cx;
      const hubY = cy;

      const disc = ctx.createRadialGradient(cx, cy - R * 0.35, R * 0.1, cx, cy, R);
      disc.addColorStop(0, "rgba(219,234,254,0.55)");
      disc.addColorStop(0.7, "rgba(191,214,250,0.28)");
      disc.addColorStop(1, "rgba(159,192,242,0.05)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = disc;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56,189,248,0.45)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const cosR = Math.cos(rot * D2R);
      const sinR = Math.sin(rot * D2R);
      for (const [lat, lon] of points) {
        const phi = lat * D2R;
        const lam = lon * D2R;
        const cosPhi = Math.cos(phi);
        const x0 = cosPhi * Math.sin(lam);
        const z0 = cosPhi * Math.cos(lam);
        const y = Math.sin(phi);
        const x = x0 * cosR + z0 * sinR;
        const z = -x0 * sinR + z0 * cosR;
        if (z <= 0) continue;
        const sx = cx + x * R;
        const sy = cy - y * R;
        const depth = 0.35 + 0.65 * z;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.3 + z * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10,132,255,${0.18 + 0.62 * depth})`;
        ctx.fill();
      }

      for (let i = 0; i < HUB_POINTS.length; i++) {
        const [lat, lon] = HUB_POINTS[i];
        const phi = lat * D2R;
        const lam = lon * D2R;
        const cosPhi = Math.cos(phi);
        const x0 = cosPhi * Math.sin(lam);
        const z0 = cosPhi * Math.cos(lam);
        const yy = Math.sin(phi);
        const x = x0 * cosR + z0 * sinR;
        const z = -x0 * sinR + z0 * cosR;
        if (z <= 0.02) continue;
        const sx = cx + x * R;
        const sy = cy - yy * R;

        const mx = (sx + hubX) / 2 + (sx - hubX) * 0.18;
        const my = (sy + hubY) / 2 + (sy - hubY) * 0.18 - 20;
        const fade = Math.min(1, z * 1.4);

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(mx, my, hubX, hubY);
        ctx.strokeStyle = `rgba(10,132,255,${0.28 * fade})`;
        ctx.lineWidth = 1.4;
        if (!reduce) {
          ctx.setLineDash([5, 9]);
          ctx.lineDashOffset = -((now / 22) % 200);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.save();
        ctx.beginPath();
        ctx.arc(sx, sy, 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.85 * fade})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(10,132,255,${0.5 * fade})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sx, sy - 2.2, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10,132,255,${fade})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(sx, sy + 3.4, 3.2, Math.PI * 1.15, Math.PI * 1.85);
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = `rgba(10,132,255,${fade})`;
        ctx.stroke();
        ctx.restore();

        if (!reduce) {
          const t = ((now / 1600 + i / HUB_POINTS.length) % 1);
          const it = 1 - t;
          const px = it * it * sx + 2 * it * t * mx + t * t * hubX;
          const py = it * it * sy + 2 * it * t * my + t * t * hubY;
          ctx.beginPath();
          ctx.arc(px, py, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56,189,248,${fade})`;
          ctx.fill();
        }
      }

      const hubGlow = ctx.createRadialGradient(hubX, hubY, 2, hubX, hubY, 70);
      hubGlow.addColorStop(0, "rgba(56,189,248,0.5)");
      hubGlow.addColorStop(1, "rgba(56,189,248,0)");
      ctx.beginPath();
      ctx.arc(hubX, hubY, 70, 0, Math.PI * 2);
      ctx.fillStyle = hubGlow;
      ctx.fill();

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      {!hideCenterHub && (
        <div
          className="absolute left-1/2 top-1/2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-electric bg-white p-3 shadow-[0_0_28px_4px_rgba(10,132,255,0.35)] backdrop-blur-md sm:h-[68px] sm:w-[68px]"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          <Image
            src="/assets/pepoltek/pepoltek_icon.png"
            alt="Pepoltek Core"
            width={38}
            height={38}
            className="h-auto w-auto object-contain"
            priority
          />
          <span
            className="absolute inset-[-10px] rounded-full border border-electric-bright/50"
            style={{ animation: "pulse-ring 3s ease-in-out infinite" }}
          />
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   INLINED MAGIC BENTO & PARTICLE CARDS
   ========================================================================== */

const DEFAULT_PARTICLE_COUNT = 10;
const DEFAULT_SPOTLIGHT_RADIUS = 350;
const DEFAULT_GLOW_COLOR = "10, 132, 255";
const MOBILE_BREAKPOINT = 768;

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.85,
});

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number
) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--glow-x", `${relativeX.toFixed(2)}%`);
  card.style.setProperty("--glow-y", `${relativeY.toFixed(2)}%`);
  card.style.setProperty("--glow-intensity", glow.toFixed(3));
  card.style.setProperty("--glow-radius", `${radius}px`);
};

interface ParticleCardProps {
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  enableBorderGlow?: boolean;
  enableStars?: boolean;
}

const ParticleCard: React.FC<ParticleCardProps> = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = false,
  clickEffect = true,
  enableMagnetism = false,
  enableBorderGlow = true,
  enableStars = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isHoveredRef = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.remove();
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current || !enableStars) return;

    const { width, height } = cardRef.current.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const particle = document.createElement("div");
        particle.className = "magic-particle";
        particle.style.background = `rgba(${glowColor}, 1)`;
        particle.style.boxShadow = `0 0 8px 1px rgba(${glowColor}, 0.8)`;
        particle.style.left = `${Math.random() * (width - 20) + 10}px`;
        particle.style.top = `${Math.random() * (height - 20) + 10}px`;

        cardRef.current.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.fromTo(
          particle,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 60,
          y: (Math.random() - 0.5) * 60,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(particle, {
          opacity: 0.35,
          duration: 1.2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, i * 75);

      timeoutsRef.current.push(timeoutId);
    }
  }, [particleCount, glowColor, enableStars]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 3,
          rotateY: 3,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.15,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.04;
        const magnetY = (y - centerY) * 0.04;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.28) 0%, rgba(${glowColor}, 0.1) 35%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 25;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  const borderClass = enableBorderGlow ? "magic-bento-card--border-glow" : "";

  return (
    <div
      ref={cardRef}
      className={`magic-bento-card ${borderClass} ${className}`}
      style={
        {
          ...style,
          "--glow-color": glowColor,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

interface GlobalSpotlightProps {
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}

const GlobalSpotlight: React.FC<GlobalSpotlightProps> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.background = `radial-gradient(circle,
      rgba(${glowColor}, 0.16) 0%,
      rgba(${glowColor}, 0.09) 20%,
      rgba(${glowColor}, 0.04) 40%,
      rgba(${glowColor}, 0.01) 60%,
      transparent 70%
    )`;
    spotlight.style.opacity = "0";
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest(".bento-section") || gridRef.current;
      const rect = section.getBoundingClientRect();
      const mouseInside =
        rect &&
        e.clientX >= rect.left - 60 &&
        e.clientX <= rect.right + 60 &&
        e.clientY >= rect.top - 60 &&
        e.clientY <= rect.bottom + 60;

      const cards = gridRef.current.querySelectorAll<HTMLElement>(".magic-bento-card");

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        cards.forEach((card) => {
          card.style.setProperty("--glow-intensity", "0");
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(card, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.9
          : minDistance <= fadeDistance
          ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.9
          : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gridRef.current?.querySelectorAll<HTMLElement>(".magic-bento-card").forEach((card) => {
        card.style.setProperty("--glow-intensity", "0");
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (spotlightRef.current?.parentNode) {
        spotlightRef.current.parentNode.removeChild(spotlightRef.current);
      }
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

interface MagicBentoProps {
  children?: React.ReactNode;
  className?: string;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  glowColor?: string;
  disableAnimations?: boolean;
}

const MagicBento: React.FC<MagicBentoProps> = ({
  children,
  className = "",
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = false,
  enableMagnetism = false,
  clickEffect = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  disableAnimations = false,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <div className={`bento-section ${className}`}>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}
      <div ref={gridRef} className="bento-grid-wrapper flex flex-col gap-3.5 sm:gap-4">
        {children}
      </div>
    </div>
  );
};

/* ==========================================================================
   INLINED PROJECT MODALS
   ========================================================================== */

interface ProjectOverviewModalProps {
  project: Project;
  index?: number;
  onClose: () => void;
  onOpenCaseStudy: (project: Project) => void;
}

const ProjectOverviewModal: React.FC<ProjectOverviewModalProps> = ({
  project,
  index = 0,
  onClose,
  onOpenCaseStudy,
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const isClosingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!mounted || !overlayRef.current || !wrapperRef.current || !imgContainerRef.current) return;

    let mouseRaf: number | null = null;
    let curX = 0,
      curY = 0,
      targetX = 0,
      targetY = 0;

    const renderCursor = () => {
      curX += (targetX - curX) * 0.15;
      curY += (targetY - curY) * 0.15;
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate3d(${curX}px,${curY}px,0)`;
      mouseRaf = requestAnimationFrame(renderCursor);
    };

    const onMouseMove = (e: MouseEvent) => {
      const r = cursorRef.current?.getBoundingClientRect();
      if (r) {
        targetX = e.clientX - r.width * 0.5;
        targetY = e.clientY - r.height * 0.5;
        if (!mouseRaf) mouseRaf = requestAnimationFrame(renderCursor);
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const titleTopNode = wrapperRef.current.querySelector<HTMLElement>("[data-text-top] div");
    const titleBottomNode = wrapperRef.current.querySelector<HTMLElement>("[data-text-bottom] div");
    const textLeftNodes = wrapperRef.current.querySelectorAll<HTMLElement>("[data-text-left] div");
    const textRightNodes = wrapperRef.current.querySelectorAll<HTMLElement>("[data-text-right] div");

    const reverts: SplitType[] = [];

    let ttSplit: SplitType | null = null;
    let tbSplit: SplitType | null = null;

    if (titleTopNode) {
      ttSplit = new SplitType(titleTopNode, { types: "chars" });
      reverts.push(ttSplit);
      ttSplit.chars?.forEach((ch) => {
        const w = document.createElement("div");
        w.classList.add("char-wrap");
        ch.parentNode?.insertBefore(w, ch);
        w.appendChild(ch);
      });
    }

    if (titleBottomNode) {
      tbSplit = new SplitType(titleBottomNode, { types: "chars" });
      reverts.push(tbSplit);
      tbSplit.chars?.forEach((ch) => {
        const w = document.createElement("div");
        w.classList.add("char-wrap");
        ch.parentNode?.insertBefore(w, ch);
        w.appendChild(ch);
      });
    }

    const wrapLines = (nodes: NodeListOf<HTMLElement>) =>
      Array.from(nodes, (el) => {
        const s = new SplitType(el, { types: "lines" });
        reverts.push(s);
        s.lines?.forEach((line) => {
          const wrap = document.createElement("div");
          wrap.className = "line-wrap";
          wrap.style.cssText =
            "display:inline-block;margin-right:0.32em;vertical-align:baseline;overflow:hidden;";
          line.parentNode?.insertBefore(wrap, line);
          wrap.appendChild(line);
        });
        return s;
      });

    const tlSplits = wrapLines(textLeftNodes);
    const trSplits = wrapLines(textRightNodes);

    const tl = gsap
      .timeline({
        onComplete: () => {
          cursorRef.current?.classList.add("is-open");
        },
      })
      .addLabel("start", 0);

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" },
      "start"
    );

    if (imgRef.current) {
      tl.fromTo(
        imgRef.current,
        { xPercent: 8, scale: 1.12 },
        { xPercent: 0, scale: 1, duration: 1.25, ease: "power4.inOut" },
        "start"
      );
    }

    tl.fromTo(
      imgContainerRef.current,
      { clipPath: "inset(100% 0 0 0)", scale: 0.88 },
      { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.25, ease: "power4.inOut" },
      "start"
    );

    if (ttSplit) {
      tl.fromTo(
        (ttSplit as any)?.elements ?? [],
        { xPercent: 15 },
        { xPercent: 0, duration: 1, ease: "power3.out" },
        "start+=1.25"
      );
    }

    tl.fromTo(
      [...(ttSplit?.chars ?? []), ...(tbSplit?.chars ?? [])],
      { clipPath: "inset(0 100% 0 0)", xPercent: 10 },
      { clipPath: "inset(0 0% 0 0)", xPercent: 0, duration: 0.75, ease: "power3.out" },
      "start+=1.25"
    );

    tl.fromTo(
      [
        ...tlSplits.flatMap((e) => e.lines ?? []),
        ...trSplits.flatMap((e) => e.lines ?? []),
      ],
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.025, duration: 0.6, ease: "power3.out" },
      "start+=1.2"
    );

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (mouseRaf) cancelAnimationFrame(mouseRaf);
      reverts.forEach((s) => {
        try {
          s.revert();
        } catch {
          // ignore revert error
        }
      });
    };
  }, [mounted, project]);

  const handleClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    cursorRef.current?.classList.remove("is-open");

    if (!overlayRef.current || !wrapperRef.current) {
      onClose();
      return;
    }

    const allChars = wrapperRef.current.querySelectorAll<HTMLElement>(".char-wrap");
    const allLines = wrapperRef.current.querySelectorAll<HTMLElement>(".line-wrap");

    const tl = gsap.timeline({ onComplete: onClose }).addLabel("start", 0);

    if (allChars.length)
      tl.fromTo(
        allChars,
        { clipPath: "inset(0 0% 0 0)", xPercent: 0 },
        { clipPath: "inset(0 100% 0 0)", xPercent: 10, ease: "power3.out", duration: 0.75 },
        "start"
      );

    if (allLines.length)
      tl.to(
        allLines,
        { yPercent: 100, opacity: 0, stagger: 0.02, duration: 0.75 },
        "start"
      );

    if (imgContainerRef.current) {
      tl.to(
        imgContainerRef.current,
        { clipPath: "inset(0 0 100% 0)", scale: 0.88, duration: 1.1, ease: "power4.inOut" },
        "start+=0.2"
      );
    }

    if (imgRef.current) {
      tl.to(
        imgRef.current,
        { xPercent: -6, scale: 1.1, duration: 1.1, ease: "power4.inOut" },
        "start+=0.2"
      );
    }

    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.35, ease: "power2.in" },
      "start+=0.8"
    );
  };

  if (!mounted || typeof document === "undefined") return null;

  const isAlt = index % 2 !== 0;

  return createPortal(
    <div
      ref={overlayRef}
      className="ovm-overlay"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest(".ovm-csb")) return;
        handleClose();
      }}
      onMouseEnter={() => cursorRef.current?.classList.add("is-visible")}
      onMouseLeave={() => cursorRef.current?.classList.remove("is-visible")}
    >
      <div ref={cursorRef} className="ovm-cursor">
        <div className="ovm-cross" />
      </div>

      <div
        ref={wrapperRef}
        className={`ovm-wrapper rounded-3xl border border-[#bcd6fa] bg-white/90 shadow-[0_30px_90px_rgba(10,132,255,0.3)] backdrop-blur-md ${
          isAlt ? "is-alt" : ""
        }`}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest(".ovm-csb")) return;
          handleClose();
        }}
      >
        <div className="ovm-title-top" data-text-top="true">
          <div className="ovm-title-big font-display text-ink">{project.titleTop}</div>
        </div>
        <div className="ovm-title-bottom" data-text-bottom="true">
          <div className="ovm-title-big font-display text-electric">{project.titleBottom}</div>
        </div>

        <div
          ref={imgContainerRef}
          className="ovm-img-container rounded-2xl border border-[#bcd6fa] shadow-[0_20px_45px_-15px_rgba(10,132,255,0.25)]"
        >
          <img
            ref={imgRef}
            src={project.image}
            alt={project.alt || project.title}
            className="ovm-img"
          />
        </div>

        <div className="ovm-text-left" data-text-left="true">
          <div className="ovm-label font-mono text-electric">{project.labelLeft}</div>
          <div className="ovm-para font-sans text-ink-soft">{project.descLeft}</div>
        </div>

        <div className="ovm-text-right" data-text-right="true">
          <div className="ovm-label font-mono text-electric">{project.labelRight}</div>
          <div className="ovm-para font-sans text-ink-soft">{project.descRight}</div>

          {project.caseStudy && (
            <button
              type="button"
              className="ovm-csb font-display cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenCaseStudy(project);
              }}
              onMouseEnter={() => cursorRef.current?.classList.remove("is-visible")}
              onMouseLeave={() => cursorRef.current?.classList.add("is-visible")}
            >
              <span>Case Study Brief</span>
              <svg className="ovm-arrow" viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    const win =
      typeof window !== "undefined"
        ? (window as unknown as { lenis?: { stop?: () => void; start?: () => void } })
        : null;
    if (win?.lenis && typeof win.lenis.stop === "function") {
      win.lenis.stop();
    }
    return () => {
      if (win?.lenis && typeof win.lenis.start === "function") {
        win.lenis.start();
      }
    };
  }, [project]);

  if (typeof document === "undefined") return null;

  const techList =
    project.caseStudy?.techStack ||
    (project.tags && project.tags.length > 0
      ? project.tags
      : ["Next.js", "TypeScript", "Tailwind CSS", "Enterprise Architecture", "Cloud Native"]);

  const githubUrl = project.github || "https://github.com/pepoltek";
  const liveUrl =
    project.liveDemo ||
    project.live ||
    (project.url && project.url !== "#" ? project.url : "https://pepoltek.com");

  return createPortal(
    <div
      ref={containerRef}
      className="case-study-page"
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <header className="case-study-page-header">
        <button
          className="case-study-back-btn font-display"
          onClick={onClose}
          aria-label="Back to Portfolio"
        >
          <svg
            className="btn-back-arrow"
            viewBox="0 0 24 24"
            width="18"
            height="18"
          >
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span>Back to Portfolio</span>
        </button>
      </header>

      <div className="case-study-page-hero">
        <div className="case-study-page-hero-img-wrapper">
          <img
            src={project.image}
            alt={project.alt || project.title}
            className="case-study-page-hero-img"
          />
        </div>
        <div className="case-study-page-hero-overlay">
          <div className="case-study-page-container">
            <p className="case-study-page-hero-subtitle font-mono">
              {project.labelLeft || "ENTERPRISE"} • {project.labelRight || "CLOUD POD"}
            </p>
            <h1 className="case-study-page-hero-title font-display">
              {project.titleTop || project.title} <br className="title-br" />{" "}
              {project.titleBottom || "SOLUTION"}
            </h1>
          </div>
        </div>
      </div>

      <div className="case-study-page-container case-study-page-content-wrapper">
        <div className="case-study-page-grid">
          <div className="case-study-page-left">
            <div className="case-study-page-section">
              <h2 className="case-study-page-section-title font-display">The Challenge</h2>
              <p className="case-study-page-text font-sans">
                {project.caseStudy?.challenge ||
                  project.description ||
                  "Modern enterprise operations demand high throughput, low latency data processing, automated compliance pipelines, and unified dashboard analytics without administrative friction."}
              </p>
            </div>

            <div className="case-study-page-section">
              <h2 className="case-study-page-section-title font-display">The Solution</h2>
              <p className="case-study-page-text font-sans">
                {project.caseStudy?.solution ||
                  project.overview ||
                  "Engineered a scalable multi-tenant cloud-native platform featuring unified telemetry, real-time data sync, automated scheduling algorithms, and responsive reactive interfaces."}
              </p>
            </div>
          </div>

          <div className="case-study-page-right">
            <div className="case-study-page-section">
              <h2 className="case-study-page-section-title font-display">Key Results</h2>
              <p className="case-study-page-text font-sans">
                {project.caseStudy?.results ||
                  "Achieved 99.99% uptime reliability, 65% reduction in administrative overhead, and seamless operational velocity across all distributed environments."}
              </p>
            </div>

            <div className="case-study-page-section">
              <h2 className="case-study-page-section-title font-display">Tech Stack</h2>
              <div className="case-study-page-tech-tags">
                {techList.map((tech) => (
                  <span key={tech} className="tech-page-tag font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="case-study-page-section">
              <h2 className="case-study-page-section-title font-display">Project Links</h2>
              <div className="case-study-links-group">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-study-link-btn github font-mono"
                >
                  <svg
                    className="link-icon"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </a>

                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-study-link-btn live font-mono"
                >
                  <svg
                    className="link-icon"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="case-study-page-gallery-section">
            <h2 className="case-study-page-section-title gallery-title font-display">
              Interface Showcase
            </h2>
            <div className="case-study-gallery-scroll">
              {project.screenshots.map((s, sIdx) => {
                const src = typeof s === "string" ? s : s.src;
                const label = typeof s === "string" ? `View ${sIdx + 1}` : s.label;
                const isLand = typeof s === "string" ? false : s.isLandscape;
                return (
                  <div
                    key={sIdx}
                    className={`case-study-gallery-card ${isLand ? "landscape" : ""}`}
                  >
                    <div className="gallery-img-wrapper">
                      <img src={src} alt={label} className="gallery-img" />
                    </div>
                    <span className="gallery-img-label font-mono">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

/* ==========================================================================
   SECTION 1: HERO & GLOBE SCROLL BRIDGE
   ========================================================================== */

function WaveText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <p className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            marginRight: "0.28em",
            animation: `word-wave 4.5s ease-in-out ${(i * 0.11).toFixed(2)}s infinite`,
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}

const PROOF_PILLS = [
  "20+ Years Combined Operational Excellence",
  "Industry Specialist Delivery Engine",
  "30+ Global Clients",
  "98% Client Retention",
  "40+ Hours Reclaimed Per Hire",
];

function StatCardSprint({ delay }: { delay: string }) {
  return (
    <div
      className="hero-stat-card pointer-events-auto absolute z-10 hidden -translate-x-1/2 lg:block"
      style={{
        top: "6%",
        left: "18%",
      }}
    >
      <div
        className="w-fit whitespace-nowrap rounded-xl border border-[#bcd6fa] bg-white/95 px-3 py-1.5 shadow-[0_6px_20px_-6px_rgba(10,132,255,0.25)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-electric hover:shadow-[0_10px_24px_-4px_rgba(10,132,255,0.35)]"
        style={{
          animation: "float-node 7s ease-in-out infinite",
          animationDelay: delay,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-[13.5px] font-extrabold tracking-tight text-[#0a1428]">
                Tech &amp; SDLC Pods
              </span>
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
            </div>
            <div className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-electric">
              Full-Stack Dev
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCardHealthcare({ delay }: { delay: string }) {
  return (
    <div
      className="hero-stat-card pointer-events-auto absolute z-10 hidden -translate-x-1/2 lg:block"
      style={{
        top: "6%",
        left: "82%",
      }}
    >
      <div
        className="w-fit whitespace-nowrap rounded-xl border border-[#bcd6fa] bg-white/95 px-3 py-1.5 shadow-[0_6px_20px_-6px_rgba(10,132,255,0.25)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-electric hover:shadow-[0_10px_24px_-4px_rgba(10,132,255,0.35)]"
        style={{
          animation: "float-node 7s ease-in-out infinite",
          animationDelay: delay,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div>
            <div className="font-display text-[13.5px] font-extrabold tracking-tight text-[#0a1428]">
              Healthcare IT
            </div>
            <div className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-sky-600">
              EMR &amp; HIPAA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCardPods({ delay }: { delay: string }) {
  return (
    <div
      className="hero-stat-card pointer-events-auto absolute z-10 hidden -translate-x-1/2 lg:block"
      style={{
        top: "83%",
        left: "18%",
      }}
    >
      <div
        className="w-fit whitespace-nowrap rounded-xl border border-[#bcd6fa] bg-white/95 px-3 py-1.5 shadow-[0_6px_20px_-6px_rgba(10,132,255,0.25)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-electric hover:shadow-[0_10px_24px_-4px_rgba(10,132,255,0.35)]"
        style={{
          animation: "float-node 7s ease-in-out infinite",
          animationDelay: delay,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <div className="font-display text-[13.5px] font-extrabold tracking-tight text-[#0a1428]">
              AI HRMS Portal
            </div>
            <div className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#3d4c68]">
              Global Workforce
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlobeScrollBridge() {
  const travelerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const traveler = travelerRef.current;
    if (!traveler) return;

    let ctx: gsap.Context;

    const setupAnimation = () => {
      const heroAnchor = document.getElementById("hero-globe-anchor");
      const overviewAnchor = document.getElementById("overview-orb-target");
      const calcPowerNode = document.getElementById("calculator-power-node");
      const calcDevice = document.getElementById("calculator-device-anchor");
      const calcBezel = document.getElementById("calculator-outer-bezel");
      const calcHalo = document.getElementById("calculator-glow-halo");
      const heroConnectors = document.getElementById("hero-connector-lines");
      const heroCards = document.querySelectorAll(".hero-stat-card");

      if (!heroAnchor || !overviewAnchor) return;

      const getMeasurements = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const heroRect = heroAnchor.getBoundingClientRect();
        const overviewRect = overviewAnchor.getBoundingClientRect();
        const calcAnchor = calcPowerNode || calcDevice;

        const heroCenterX = heroRect.left + heroRect.width / 2;
        const heroCenterY = heroRect.top + scrollY + heroRect.height / 2;

        const overviewCenterX = overviewRect.left + overviewRect.width / 2;
        const overviewCenterY = overviewRect.top + scrollY + overviewRect.height / 2;

        const dx1 = overviewCenterX - heroCenterX;
        const dy1 = overviewCenterY - heroCenterY;
        const targetSize1 = Math.min(overviewRect.width, overviewRect.height) || 280;
        const originSize = Math.min(heroRect.width, heroRect.height) || 400;
        const scale1 = (targetSize1 / originSize) * 1.1;

        let dx2 = dx1;
        let dy2 = dy1 + 850;
        let scale2 = 0.26;

        if (calcAnchor) {
          const calcRect = calcAnchor.getBoundingClientRect();
          const calcCenterX = calcRect.left + calcRect.width / 2;
          const calcCenterY = calcRect.top + scrollY + calcRect.height / 2;

          dx2 = calcCenterX - heroCenterX;
          dy2 = calcCenterY - heroCenterY;

          const targetSize2 = Math.min(calcRect.width, calcRect.height) || 44;
          scale2 = Math.max(0.18, Math.min(0.32, (targetSize2 / originSize) * 2.3));
        }

        return { dx1, dy1, scale1, dx2, dy2, scale2 };
      };

      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            endTrigger: "#hiring-velocity-section",
            end: "center 50%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          traveler,
          {
            x: () => getMeasurements().dx1,
            y: () => getMeasurements().dy1,
            scale: () => getMeasurements().scale1,
            ease: "power1.inOut",
            duration: 3.2,
          },
          0
        );

        if (heroConnectors) {
          tl.to(
            heroConnectors,
            {
              opacity: 0,
              ease: "power1.out",
              duration: 1.4,
            },
            0
          );
        }

        if (heroCards && heroCards.length > 0) {
          tl.to(
            heroCards,
            {
              opacity: 0,
              y: -30,
              stagger: 0.05,
              ease: "power1.out",
              duration: 1.4,
            },
            0
          );
        }

        tl.to(
          traveler,
          {
            x: () => getMeasurements().dx1,
            y: () => getMeasurements().dy1,
            scale: () => getMeasurements().scale1,
            ease: "none",
            duration: 1.4,
          },
          3.2
        );

        tl.to(
          traveler,
          {
            x: () => getMeasurements().dx2,
            y: () => getMeasurements().dy2,
            scale: () => getMeasurements().scale2,
            ease: "power2.inOut",
            duration: 3.8,
          },
          4.6
        );

        tl.to(
          traveler,
          {
            opacity: 0,
            ease: "power3.in",
            duration: 1.6,
          },
          7.0
        );

        if (calcBezel) {
          tl.to(
            calcBezel,
            {
              boxShadow: "0 0 40px 6px rgba(10,132,255,0.7), 0 30px 60px -20px rgba(10,132,255,0.5)",
              borderColor: "#0a84ff",
              ease: "power4.out",
              duration: 0.6,
            },
            7.8
          );
          tl.to(
            calcBezel,
            {
              boxShadow: "0 10px 25px -10px rgba(10,132,255,0.2)",
              borderColor: "#bcd6fa",
              ease: "power2.in",
              duration: 0.3,
            },
            8.4
          );
          tl.to(
            calcBezel,
            {
              boxShadow: "0 0 35px 5px rgba(56,189,248,0.65), 0 25px 50px -15px rgba(10,132,255,0.45)",
              borderColor: "#38bdf8",
              ease: "power2.out",
              duration: 0.3,
            },
            8.7
          );
          tl.to(
            calcBezel,
            {
              clearProps: "boxShadow,borderColor",
              ease: "power1.out",
              duration: 0.6,
            },
            9.1
          );
        }

        if (calcHalo) {
          tl.to(
            calcHalo,
            {
              opacity: 1,
              scale: 1.12,
              ease: "power4.out",
              duration: 0.6,
            },
            7.8
          );
          tl.to(
            calcHalo,
            {
              opacity: 0.4,
              scale: 0.98,
              ease: "power2.in",
              duration: 0.3,
            },
            8.4
          );
          tl.to(
            calcHalo,
            {
              opacity: 0.9,
              scale: 1.06,
              ease: "power2.out",
              duration: 0.4,
            },
            8.7
          );
          tl.to(
            calcHalo,
            {
              clearProps: "opacity,scale",
              ease: "power1.out",
              duration: 0.6,
            },
            9.1
          );
        }

        if (calcPowerNode) {
          tl.to(
            calcPowerNode,
            {
              scale: 2.0,
              boxShadow: "0 0 32px 10px rgba(56,189,248,1)",
              ease: "power4.out",
              duration: 0.5,
            },
            7.9
          );
          tl.to(
            calcPowerNode,
            {
              scale: 1.0,
              boxShadow: "0 0 8px 2px rgba(56,189,248,0.4)",
              ease: "power2.in",
              duration: 0.3,
            },
            8.4
          );
          tl.to(
            calcPowerNode,
            {
              scale: 1.6,
              boxShadow: "0 0 24px 8px rgba(56,189,248,0.9)",
              ease: "power2.out",
              duration: 0.3,
            },
            8.7
          );
          tl.to(
            calcPowerNode,
            {
              scale: 1.0,
              boxShadow: "0 0 8px rgba(56,189,248,0.9)",
              ease: "power1.out",
              duration: 0.6,
            },
            9.0
          );
        }
      });
    };

    const timer = setTimeout(() => {
      setupAnimation();
      ScrollTrigger.refresh();
    }, 200);

    const handleResize = () => {
      setupAnimation();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div
      ref={travelerRef}
      className="pointer-events-none absolute inset-0 z-30 h-full w-full will-change-transform"
      style={{ transformOrigin: "center center" }}
    >
      <GlobeVisual hideCenterHub={false} />
    </div>
  );
}

function Hero() {
  return (
    <div id="hero-section" className="relative z-10 min-h-full w-full bg-canvas">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute right-[-5%] top-[10%] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.18)_0%,rgba(56,189,248,0.08)_45%,transparent_70%)] blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-100">
        <CursorGrid
          cellSize={56}
          color="#0a84ff"
          radius={180}
          falloff="smooth"
          holdTime={400}
          fadeDuration={700}
          lineWidth={1.25}
          maxOpacity={0.78}
          fillOpacity={0.07}
          gridOpacity={0.05}
          cellRadius={6}
          clickPulse
          pulseSpeed={600}
          ambient={true}
          ambientDensity={0.26}
          ambientMaxAlpha={0.4}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl 2xl:max-w-[1360px] flex-col px-6 pt-0 pb-8 lg:px-10 xl:px-12">
        <div className="grid flex-1 items-center gap-8 pt-2 pb-6 sm:pt-3 sm:pb-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 xl:gap-14 lg:pt-3 lg:pb-10">
          <div className="max-w-[640px] xl:max-w-[680px]">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_8px_2px_rgba(10,132,255,0.6)]" />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#3d4c68]">
                Enterprise IT &amp; Healthcare Workforce Solutions
              </span>
            </div>

            <h1 className="mt-4 sm:mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0a1428] sm:text-[48px] lg:text-[54px] xl:text-[58px]">
              <span className="block">Millisecond Response,</span>
              <span className="relative inline-flex items-baseline whitespace-nowrap">
                <span className="bg-gradient-to-r from-electric to-electric-bright bg-clip-text text-transparent">
                  From a Human
                </span>
                <svg
                  className="pointer-events-none absolute -bottom-2.5 left-0 w-full overflow-visible sm:-bottom-3"
                  viewBox="0 0 340 18"
                  fill="none"
                >
                  <path
                    d="M 3 13 C 50 3, 120 17, 190 6.5 C 245 -2, 290 14, 337 4.5"
                    stroke="url(#hero-pen-underline)"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="hero-pen-underline" x1="0" y1="0" x2="340" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#0a1428" />
                      <stop offset="55%" stopColor="#0a84ff" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                  </defs>
                </svg>

                <span className="inline-flex items-baseline gap-1 sm:gap-1.5 ml-2" aria-hidden="true">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-electric-bright hero-typing-dot-1 sm:h-2 sm:w-2" />
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-electric-bright hero-typing-dot-2 sm:h-2 sm:w-2" />
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-electric-bright hero-typing-dot-3 sm:h-2 sm:w-2" />
                </span>
              </span>
            </h1>

            <WaveText
              className="mt-6 max-w-2xl text-base leading-relaxed text-[#3d4c68] sm:text-lg"
              text="Global IT solutions provider deploying pre vetted software engineering pods and compliance ready healthcare specialists. Powered by an in house delivery engine of industry specialists including niche recruiters, business analysts, and software engineers, delivering 7 day deployment sprints."
            />

            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <a
                href="#deploy"
                className="group inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-[#0a1428] px-6 py-3.5 font-display text-sm font-semibold text-white shadow-[0_8px_20px_-4px_rgba(10,20,40,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric hover:shadow-[0_12px_28px_-6px_rgba(10,132,255,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
              >
                Deploy Talent in 2 to 7 Days
              </a>
              <a
                href="#tracks"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-[#bcd6fa] bg-white/80 px-6 py-3.5 font-display text-sm font-semibold text-[#0a1428] shadow-[0_4px_14px_-2px_rgba(10,20,40,0.04)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:bg-white hover:text-electric focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
              >
                Explore Tech &amp; Healthcare Tracks
              </a>
            </div>
          </div>

          <div id="hero-globe-anchor" className="relative h-[380px] sm:h-[420px] lg:h-[460px] w-full">
            <GlobeScrollBridge />

            <svg
              id="hero-connector-lines"
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="hero-circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#0a84ff" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0a84ff" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {[
                [18, 14],
                [82, 14],
                [18, 83],
              ].map(([x, y], i) => (
                <g key={i}>
                  <line
                    x1={x}
                    y1={y}
                    x2="50"
                    y2="50"
                    stroke="#bcd6fa"
                    strokeOpacity="0.35"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                    vectorEffect="non-scaling-stroke"
                  />
                  <line
                    x1={x}
                    y1={y}
                    x2="50"
                    y2="50"
                    stroke="url(#hero-circuit-gradient)"
                    strokeWidth="1.4"
                    strokeDasharray="4 6"
                    vectorEffect="non-scaling-stroke"
                    style={{ animation: "line-dash 2.4s linear infinite" }}
                  />
                </g>
              ))}
              <circle
                cx="50"
                cy="50"
                r="3.5"
                stroke="#0a84ff"
                strokeWidth="0.8"
                strokeDasharray="2 3"
                opacity="0.5"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <StatCardSprint delay="0s" />
            <StatCardHealthcare delay="2s" />
            <StatCardPods delay="1s" />
          </div>
        </div>

        <div className="relative -mx-6 overflow-hidden border-t border-[#bcd6fa]/70 pt-5 lg:-mx-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-canvas to-transparent lg:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-canvas to-transparent lg:w-24" />
          <div
            className="flex w-max gap-3 pr-3"
            style={{ animation: "drift-marquee 32s linear infinite" }}
          >
            {[...PROOF_PILLS, ...PROOF_PILLS].map((pill, i) => (
              <span
                key={i}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#bcd6fa] bg-white/80 px-5 py-2 font-mono text-xs font-medium tracking-tight text-[#0a1428] shadow-sm backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_6px_1px_rgba(10,132,255,0.6)]" />
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SECTION 2: OVERVIEW
   ========================================================================== */

const overviewData = {
  logo: "/assets/pepoltek/white_logo.png",
  logoAlt: "Pepoltek Limited",
  badge: "Who We Are",
  text: "Pepoltek Limited operates as a global IT solutions provider delivering technical staffing and workforce solutions to 30+ clients across 15+ countries in IT & Healthcare. Powered by an in house delivery engine of industry specialists (Niche recruiters, business analysts, software engineers), our team brings 20+ years of combined execution leadership across greenfield HR tech and Enterprise level scale & commercialization.",
  subtext:
    "Together, we're here to reshape global hiring standards, faster turnarounds, data backed uncompromized quality.",
};

function Overview() {
  return (
    <section id="overview-section" className="relative w-full bg-gradient-to-b from-canvas via-white to-canvas py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[15%] left-[5%] text-electric/10 animate-[float-node_6s_ease-in-out_infinite]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="absolute right-[5%] bottom-[20%] text-electric/10 animate-[float-node_6s_ease-in-out_1s_infinite]">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4" />
            <path d="M5.5 20v-2a6.5 6.5 0 0 1 13 0v2" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div
            id="overview-orb-target"
            className="relative flex min-h-[340px] items-center justify-center sm:min-h-[420px]"
          >
            <div className="relative flex h-[240px] w-[240px] items-center justify-center sm:h-[300px] sm:w-[300px]">
              <div
                id="overview-dashed-ring"
                className="absolute inset-0 h-full w-full rounded-full border-2 border-dashed border-electric/25 animate-[spin_22s_linear_infinite]"
                style={{ transformOrigin: "center" }}
              >
                <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-electric shadow-[0_0_16px_rgba(10,132,255,0.7)]" />
              </div>

              <div
                id="overview-brand-blob"
                className="group relative flex h-[160px] w-[160px] items-center justify-center overflow-hidden bg-gradient-to-br from-electric to-[#0052cc] shadow-[0_20px_45px_-10px_rgba(10,132,255,0.45)] transition-shadow duration-300 hover:shadow-[0_24px_55px_-8px_rgba(10,132,255,0.6)] sm:h-[200px] sm:w-[200px] animate-[morph_8s_ease-in-out_infinite]"
              >
                <Image
                  src={overviewData.logo}
                  alt={overviewData.logoAlt}
                  width={220}
                  height={50}
                  className="p-5 sm:p-7 object-contain filter brightness-0 invert transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            <div id="overview-floating-badges" className="pointer-events-none absolute inset-0">
              <div className="pointer-events-auto absolute top-[14%] right-[4%] sm:right-[10%] flex items-center gap-2 rounded-full border border-electric/20 bg-white/90 px-4 py-2 text-xs sm:text-sm font-semibold text-ink shadow-[0_10px_25px_-5px_rgba(10,20,40,0.08)] backdrop-blur-md animate-[float-badge_5s_ease-in-out_infinite]">
                <span className="h-2 w-2 rounded-full bg-electric shadow-[0_0_8px_rgba(10,132,255,0.8)]" />
                <span>Est. 2020</span>
              </div>
              <div className="pointer-events-auto absolute bottom-[16%] left-[2%] sm:left-[6%] flex items-center gap-2 rounded-full border border-electric/20 bg-white/90 px-4 py-2 text-xs sm:text-sm font-semibold text-ink shadow-[0_10px_25px_-5px_rgba(10,20,40,0.08)] backdrop-blur-md animate-[float-badge_5.5s_ease-in-out_0.5s_infinite]">
                <span className="h-2 w-2 rounded-full bg-electric shadow-[0_0_8px_rgba(10,132,255,0.8)]" />
                <span>Global</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col text-left">
            <div className="mb-5 inline-flex items-center gap-2 self-start rounded-full border border-electric/20 bg-electric/[0.08] px-3.5 py-1 text-xs font-mono font-medium tracking-[0.14em] uppercase text-electric">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
              {overviewData.badge}
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-ink-soft">
              {overviewData.text}
            </p>

            <div className="relative mt-6 rounded-r-2xl border-l-4 border-electric bg-gradient-to-r from-electric/[0.05] via-electric/[0.02] to-transparent py-4 pr-6 pl-5 sm:pl-7">
              <svg
                className="pointer-events-none absolute top-2 right-4 h-9 w-9 text-electric/15"
                viewBox="0 0 40 40"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14 16L10 22V28H18V22H12L14 16Z" />
                <path d="M28 16L24 22V28H32V22H26L28 16Z" />
              </svg>
              <p className="text-base sm:text-[17px] font-normal italic leading-relaxed text-ink">
                &ldquo;{overviewData.subtext}&rdquo;
              </p>
            </div>

            <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-electric/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 3: HIRING VELOCITY & CALCULATOR
   ========================================================================== */

const SENIORITY = [
  { key: "Junior", mult: 1.0 },
  { key: "Mid", mult: 1.55 },
  { key: "Senior", mult: 2.3 },
  { key: "Lead", mult: 3.1 },
  { key: "C Level", mult: 4.6 },
] as const;

const REGIONS = [
  { key: "North America", tag: "NA", mult: 1.9, overlap: "6-9h" },
  { key: "CEE / Europe", tag: "EU", mult: 1.35, overlap: "5-8h" },
  { key: "LATAM", tag: "LA", mult: 1.1, overlap: "7-9h" },
  { key: "South Asia / APAC", tag: "AP", mult: 1.0, overlap: "4-6h" },
] as const;

const TECH = [
  { key: "FrontEnd", prem: 0.07 },
  { key: "BackEnd", prem: 0.1 },
  { key: "AI", prem: 0.16 },
  { key: "Cloud / DevOps", prem: 0.12 },
  { key: "QA", prem: 0.05 },
  { key: "Product", prem: 0.09 },
  { key: "Project", prem: 0.05 },
  { key: "Specialized Tech", prem: 0.18 },
] as const;

const BASE_UNIT = 4200;

const ZONES = [
  { name: "EST / PST", region: "Americas", start: 13, end: 21, hours: "8h", live: "9am to 5pm ET" },
  { name: "GMT / BST", region: "United Kingdom", start: 8, end: 17, hours: "9h", live: "8am to 5pm UK" },
  { name: "CET / CEST", region: "Europe", start: 7, end: 16, hours: "9h", live: "8am to 5pm CET" },
  { name: "GCC Region", region: "Gulf", start: 5, end: 13, hours: "8h", live: "8am to 4pm GST" },
] as const;

function useCountUp(target: number, decimals = 0, ms = 550) {
  const [val, setVal] = useState(target);
  const from = useRef(target);
  const raf = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    const b = target;
    cancelAnimationFrame(raf.current);
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(a + (b - a) * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else from.current = b;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, ms]);
  const f = Math.pow(10, decimals);
  return (Math.round(val * f) / f).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-fit inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/[0.08] px-4 py-1 font-mono text-[11px] font-500 tracking-[0.14em] uppercase text-electric">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
      {children}
    </div>
  );
}

function TimezoneMatrix() {
  const ticks = [0, 4, 8, 12, 16, 20, 24];
  return (
    <div className="flex flex-col h-full">
      <SectionBadge>Chasing the sun</SectionBadge>

      <h2 className="mt-4 font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.08] font-800 tracking-tight text-ink">
        Your workday never
        <br />
        goes <span className="text-electric">dark.</span>
      </h2>
      <p className="mt-3 max-w-[46ch] text-[16px] leading-relaxed text-ink-soft">
        We staff talent hubs across four longitudes so a live engineer is always
        inside your business hours. The matrix below is guaranteed daily overlap,
        not a best effort promise.
      </p>

      <div className="mt-8 rounded-2xl border border-[#bcd6fa]/60 bg-white/80 p-5 shadow-[0_20px_50px_-24px_rgba(10,132,255,0.25)] backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] uppercase text-mist">
          <span>Global overlap matrix</span>
          <span className="flex items-center gap-1.5 text-[var(--color-signal)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal)]" />
            live coverage
          </span>
        </div>

        <div className="ml-[128px] mb-2 flex justify-between font-mono text-[10px] text-mist">
          {ticks.map((t) => (
            <span key={t}>{String(t).padStart(2, "0")}</span>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          {ZONES.map((z, i) => {
            const left = (z.start / 24) * 100;
            const width = ((z.end - z.start) / 24) * 100;
            return (
              <div
                key={z.name}
                className="flex items-center"
                style={{ animation: `pt-rise .5s ease both`, animationDelay: `${i * 70}ms` }}
              >
                <div className="w-[128px] shrink-0 pr-3">
                  <div className="font-mono text-[12px] font-500 text-ink">{z.name}</div>
                  <div className="text-[10px] text-mist">{z.region}</div>
                </div>
                <div className="relative h-8 flex-1 overflow-hidden rounded-md bg-[#eef4fd] ring-1 ring-inset ring-[#bcd6fa]/70">
                  {ticks.slice(1, -1).map((t) => (
                    <span
                      key={t}
                      className="absolute top-0 h-full w-px bg-[#bcd6fa]/50"
                      style={{ left: `${(t / 24) * 100}%` }}
                    />
                  ))}
                  <div
                    className="absolute top-1/2 h-6 -translate-y-1/2 rounded-[5px] shadow-[0_0_18px_-2px_rgba(10,132,255,0.5)]"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                      background:
                        "linear-gradient(90deg,var(--color-electric),var(--color-electric-bright))",
                    }}
                  >
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[10px] font-600 text-white">
                      {z.hours} live
                    </span>
                    <span
                      className="absolute inset-y-0 w-1/3 bg-white/35 blur-[2px]"
                      style={{ animation: `pt-sweep 3.4s ${i * 0.4}s ease-in-out infinite` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <a
        href="#"
        className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-electric px-7 py-3.5 font-display text-[15px] font-600 text-white shadow-[0_10px_25px_-5px_rgba(10,132,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0a1428] hover:shadow-[0_14px_30px_-5px_rgba(10,20,40,0.5)]"
      >
        Hire locally, deploy globally
        <svg
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div className="mb-2 font-mono text-[10px] tracking-[0.16em] uppercase text-mist">{label}</div>
      {children}
    </div>
  );
}

function Stat({
  label,
  value,
  unit,
  note,
  tone,
  strike,
}: {
  label: string;
  value: string;
  unit: string;
  note?: string;
  tone: "electric" | "signal" | "dim" | "plain";
  strike?: boolean;
}) {
  const toneColor =
    tone === "electric"
      ? "text-electric"
      : tone === "signal"
        ? "text-[var(--color-signal)]"
        : tone === "dim"
          ? "text-mist"
          : "text-ink";
  return (
    <div className="rounded-xl border border-[#bcd6fa]/60 bg-white px-3.5 py-2.5">
      <div className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-mist">{label}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span
          className={`font-display text-2xl font-700 ${toneColor} ${
            strike ? "line-through decoration-[#f43f5e]/70 decoration-2" : ""
          }`}
        >
          {value}
        </span>
        <span className="font-mono text-[10px] text-mist">{unit}</span>
      </div>
      {note && <div className="mt-1 font-mono text-[9.5px] text-mist/90">{note}</div>}
    </div>
  );
}

function Calculator() {
  const [seniority, setSeniority] = useState(2);
  const [region, setRegion] = useState(1);
  const [tech, setTech] = useState<string[]>(["FrontEnd", "BackEnd"]);
  const [squad, setSquad] = useState(6);

  const toggleTech = (k: string) =>
    setTech((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  const calc = useMemo(() => {
    const sen = SENIORITY[seniority];
    const reg = REGIONS[region];
    const prem = tech.reduce(
      (sum, k) => sum + (TECH.find((t) => t.key === k)?.prem ?? 0),
      0
    );
    const perRole = BASE_UNIT * sen.mult * reg.mult * (1 + prem);
    const investment = perRole * squad;
    const sprint = Math.min(
      14,
      Math.round(2 + seniority * 1.4 + squad * 0.08 + tech.length * 0.5)
    );
    const legacy = Math.min(45, 35 + Math.round(seniority * 1.6 + squad * 0.05));
    const hoursPerRole = 40 + tech.length * 3 + seniority * 4;
    const hoursTotal = hoursPerRole * squad;
    return { investment, perRole, sprint, legacy, hoursPerRole, hoursTotal, prem };
  }, [seniority, region, tech, squad]);

  const invStr = useCountUp(calc.investment);
  const perRoleStr = useCountUp(calc.perRole);
  const sprintStr = useCountUp(calc.sprint);
  const legacyStr = useCountUp(calc.legacy);
  const hoursStr = useCountUp(calc.hoursTotal);

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(165deg,#fbfdff_0%,#eff6ff_50%,#e4eeff_100%)] p-5 backdrop-blur-md sm:p-6">
      <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:radial-gradient(rgba(10,132,255,0.16)_1px,transparent_1.4px)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.35),transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.22),transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.7),transparent)]" />

      <div className="relative flex items-center justify-between">
        <SectionBadge>Velocity calculator</SectionBadge>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-signal)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal)] [animation:pt-pulse_1.6s_ease-in-out_infinite]" />
          LIVE
        </span>
      </div>

      <Field label="Seniority level">
        <div className="grid grid-cols-5 gap-1.5">
          {SENIORITY.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setSeniority(i)}
              className={`rounded-lg py-2 font-mono text-[11px] font-500 transition-all duration-200 ${
                seniority === i
                  ? "bg-electric text-white shadow-[0_6px_16px_-6px_rgba(10,132,255,0.6)]"
                  : "bg-white text-ink-soft ring-1 ring-inset ring-[#bcd6fa]/70 hover:text-electric hover:ring-electric/40"
              }`}
            >
              {s.key}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Sourcing region">
        <div className="grid grid-cols-2 gap-1.5">
          {REGIONS.map((r, i) => (
            <button
              key={r.key}
              onClick={() => setRegion(i)}
              className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-left transition-all duration-200 ${
                region === i
                  ? "bg-electric/[0.06] ring-1 ring-inset ring-electric"
                  : "bg-white ring-1 ring-inset ring-[#bcd6fa]/70 hover:ring-electric/40"
              }`}
            >
              <span className={`text-[13px] font-500 ${region === i ? "text-ink" : "text-ink-soft"}`}>
                {r.key}
              </span>
              <span className={`font-mono text-[10px] ${region === i ? "text-electric" : "text-mist"}`}>
                {r.overlap}
              </span>
            </button>
          ))}
        </div>
      </Field>

      <Field label={`Tech focus · ${tech.length} selected`}>
        <div className="flex flex-wrap gap-1.5">
          {TECH.map((t) => {
            const on = tech.includes(t.key);
            return (
              <button
                key={t.key}
                onClick={() => toggleTech(t.key)}
                className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] transition-all duration-200 ${
                  on
                    ? "bg-electric/[0.1] text-electric ring-1 ring-inset ring-electric/50"
                    : "bg-white text-mist ring-1 ring-inset ring-[#bcd6fa]/70 hover:text-ink hover:ring-electric/30"
                }`}
              >
                {on ? "✓ " : "+ "}
                {t.key}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Squad size">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-2xl font-700 text-ink">
            {squad}
            <span className="ml-1.5 font-mono text-[11px] font-400 text-mist">
              {squad === 1 ? "specialist" : "specialists"}
            </span>
          </span>
          <span className="font-mono text-[10px] text-mist">1 to 100</span>
        </div>
        <input
          type="range"
          min={1}
          max={100}
          value={squad}
          onChange={(e) => setSquad(Number(e.target.value))}
          className="pt-slider mt-2.5 w-full"
          style={{
            background: `linear-gradient(90deg, #0a84ff ${squad}%, #bcd6fa ${squad}%)`,
          }}
        />
      </Field>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Stat label="Legacy agency latency" value={`${legacyStr}`} unit="days" tone="dim" note="industry standard" strike />
        <Stat label="Pepoltek deployment sprint" value={`${sprintStr}`} unit="days" tone="electric" note="signed to shipping" />
        <Stat label="Eng. hours reclaimed" value={`${hoursStr}`} unit="hrs / mo" tone="signal" note={`${calc.hoursPerRole}+ per role`} />
        <Stat
          label="Per specialist rate"
          value={money(Number(perRoleStr.replace(/,/g, "")))}
          unit="/ mo"
          tone="plain"
          note={calc.prem > 0 ? `+${Math.round(calc.prem * 100)}% skill premium` : "base rate"}
        />
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-electric/30 bg-electric/[0.06] px-5 py-3">
        <div>
          <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-mist">
            Live investment estimate
          </div>
          <div className="mt-1 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-800 leading-none text-ink">
            {money(Number(invStr.replace(/,/g, "")))}
            <span className="ml-1.5 font-mono text-[12px] font-400 text-mist">/ month</span>
          </div>
        </div>
        <button className="group flex cursor-pointer items-center gap-2 rounded-xl bg-electric px-5 py-3 font-display text-[14px] font-600 text-white shadow-[0_10px_25px_-5px_rgba(10,132,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0a1428] hover:shadow-[0_14px_30px_-5px_rgba(10,20,40,0.5)]">
          Lock this squad
          <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function DeviceFrame({ children }: { children: React.ReactNode }) {
  const edgeTicks = Array.from({ length: 13 });
  return (
    <div id="calculator-device-anchor" className="relative">
      <div
        id="calculator-glow-halo"
        className="pointer-events-none absolute -inset-6 rounded-[2.6rem] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.22),transparent_65%)] opacity-40 blur-2xl transition-all duration-700"
      />

      <div
        id="calculator-outer-bezel"
        className="relative rounded-[2.1rem] bg-[linear-gradient(150deg,#f4f9ff,#d4e5fb_45%,#eaf3ff)] p-3 shadow-[0_40px_90px_-30px_rgba(10,132,255,0.45),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-[#bcd6fa] transition-all duration-500"
      >
        <div className="relative rounded-[1.7rem] bg-[linear-gradient(160deg,#0a1428,#12203a)] p-[6px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
          <div className="pointer-events-none absolute inset-0 rounded-[1.7rem] p-px [background:conic-gradient(from_var(--pt-ang,0deg),transparent_0deg,rgba(56,189,248,0.9)_40deg,transparent_120deg,transparent_240deg,rgba(10,132,255,0.7)_300deg,transparent_360deg)] [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude] [animation:pt-spin_7s_linear_infinite]" />

          <div className="relative flex items-center justify-between px-4 pb-2 pt-1.5">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal)] shadow-[0_0_6px_#16a34a]" />
              <span className="h-1.5 w-1.5 rounded-full bg-electric-bright/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            </div>
            <span className="font-mono text-[9px] font-500 tracking-[0.34em] text-white uppercase drop-shadow-[0_0_6px_rgba(56,189,248,0.4)]">
              PEPOLTEK · OS
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-6 rounded-full bg-white/15" />
              <span
                id="calculator-power-node"
                className="relative flex h-2 w-2 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#7dd3fc,#0a84ff)] shadow-[0_0_8px_rgba(56,189,248,0.9)] transition-all duration-300"
              />
            </span>
          </div>

          <div className="relative overflow-hidden rounded-[1.35rem]">
            <span className="pointer-events-none absolute left-2 top-2 z-20 h-4 w-4 rounded-tl-md border-l-2 border-t-2 border-electric-bright/80" />
            <span className="pointer-events-none absolute right-2 top-2 z-20 h-4 w-4 rounded-tr-md border-r-2 border-t-2 border-electric-bright/80" />
            <span className="pointer-events-none absolute bottom-2 left-2 z-20 h-4 w-4 rounded-bl-md border-b-2 border-l-2 border-electric-bright/80" />
            <span className="pointer-events-none absolute bottom-2 right-2 z-20 h-4 w-4 rounded-br-md border-b-2 border-r-2 border-electric-bright/80" />
            {children}
          </div>
        </div>

        <div className="pointer-events-none absolute -left-[1px] top-1/2 flex -translate-y-1/2 flex-col gap-1.5">
          {edgeTicks.map((_, i) => (
            <span key={i} className={`h-px ${i % 4 === 0 ? "w-2.5 bg-electric/60" : "w-1.5 bg-[#9ec1f0]"}`} />
          ))}
        </div>
        <div className="pointer-events-none absolute -right-[1px] top-1/2 flex -translate-y-1/2 flex-col items-end gap-1.5">
          {edgeTicks.map((_, i) => (
            <span key={i} className={`h-px ${i % 4 === 0 ? "w-2.5 bg-electric/60" : "w-1.5 bg-[#9ec1f0]"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HiringVelocity() {
  return (
    <section
      id="hiring-velocity-section"
      className="relative w-full bg-canvas px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(188,214,250,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(188,214,250,0.18)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <TimezoneMatrix />
        <DeviceFrame>
          <Calculator />
        </DeviceFrame>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 4: DELIVERY PODS & LEADERSHIP
   ========================================================================== */

function useInViewSimple<T extends HTMLElement>(once = true) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          if (once) io.disconnect();
        } else if (!once) setSeen(false);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return { ref, seen };
}

function Counter({ to, seen, prefix = "", suffix = "" }: { to: number; seen: boolean; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return (
    <span>
      {prefix}
      {val.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

const dpIconProps = {
  width: 40,
  height: 40,
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "#0a84ff",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const DpIcons = {
  specialists: (
    <svg {...dpIconProps}>
      <circle cx="15" cy="14" r="5" />
      <path d="M6 33c0-5 4-9 9-9s9 4 9 9" />
      <circle cx="29" cy="11" r="3.2" />
      <path d="M25 22c4-1 9 2 9 8" />
      <path d="M31.5 30l1.6 1.6L37 28" stroke="#38bdf8" />
    </svg>
  ),
  analyst: (
    <svg {...dpIconProps}>
      <rect x="6" y="7" width="28" height="26" rx="3" />
      <path d="M12 26l5-6 4 4 7-9" />
      <circle cx="12" cy="26" r="1.2" fill="#0a84ff" />
      <circle cx="28" cy="15" r="1.2" fill="#38bdf8" />
      <path d="M6 13h28" />
    </svg>
  ),
  engineer: (
    <svg {...dpIconProps}>
      <path d="M15 12l-7 8 7 8" />
      <path d="M25 12l7 8-7 8" />
      <path d="M22 9l-4 22" stroke="#38bdf8" />
    </svg>
  ),
};

const CAPS = [
  {
    icon: DpIcons.specialists,
    title: "Technical & Healthcare Specialists",
    body: "Technical and clinical sourcing pods maintaining active talent pipelines across North America, Europe, GCC, and Asia Pacific.",
  },
  {
    icon: DpIcons.analyst,
    title: "Business Analysts",
    body: "Structures client tech stack mappings, workflow requirements, and operational SLAs prior to candidate deployment.",
  },
  {
    icon: DpIcons.engineer,
    title: "In House Software Engineers",
    body: "Conduct hard coded technical validation, system design reviews, and repository evaluations before any profile reaches a hiring manager panel.",
  },
];

const DP_REGIONS = [
  { x: 14, label: "N. America" },
  { x: 38, label: "Europe" },
  { x: 62, label: "GCC" },
  { x: 86, label: "APAC" },
];

function PodNetwork() {
  return (
    <ParticleCard
      glowColor="10, 132, 255"
      particleCount={12}
      enableStars={true}
      enableBorderGlow={true}
      clickEffect={true}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#bcd6fa]/60 bg-white/80 p-6 shadow-[0_24px_60px_-30px_rgba(10,132,255,0.35)] backdrop-blur-md transition-all duration-300 hover:border-electric/40 sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(10,132,255,0.12)_1px,transparent_1.4px)] [background-size:20px_20px]" />
      <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.18),transparent_65%)] blur-2xl" />

      <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#6b7a95]">
            Active talent pipeline
          </div>
          <div className="mt-1 font-display text-lg font-bold text-[#0a1428]">
            Four longitudes, one delivery core
          </div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/[0.08] px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase text-electric">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
          Streaming
        </span>
      </div>

      <svg viewBox="0 0 100 46" className="relative w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="dp-line" x1="0" x2="1">
            <stop offset="0" stopColor="#0a84ff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="1" stopColor="#0a84ff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="dp-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#0a84ff" />
          </radialGradient>
        </defs>

        {DP_REGIONS.map((r, i) => (
          <path
            key={i}
            d={`M${r.x} 10 Q${(r.x + 50) / 2} ${i % 2 ? 2 : 26} 50 30`}
            fill="none"
            stroke="url(#dp-line)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            className="dp-dash"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {DP_REGIONS.map((r, i) => (
          <g key={r.label}>
            <circle cx={r.x} cy="10" r="2.4" fill="#fff" stroke="#0a84ff" strokeWidth="0.6" />
            <circle cx={r.x} cy="10" r="1" fill="#0a84ff" className="dp-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
            <text x={r.x} y="5" textAnchor="middle" fontSize="2.6" fill="#3d4c68" fontFamily="Inter, sans-serif" fontWeight="500">
              {r.label}
            </text>
          </g>
        ))}

        <circle cx="50" cy="30" r="6" fill="url(#dp-core)" />
        <circle cx="50" cy="30" r="6" fill="none" stroke="#38bdf8" strokeWidth="0.5" className="dp-ring" />
        <text x="50" y="31.2" textAnchor="middle" fontSize="2.4" fill="#fff" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
          POD
        </text>
      </svg>

      <div className="relative mt-5 grid grid-cols-3 gap-3 border-t border-[#bcd6fa]/50 pt-5">
        {[
          { k: "12", l: "Active pods" },
          { k: "4", l: "Regions covered" },
          { k: "24/7", l: "Live sourcing" },
        ].map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-display text-xl font-extrabold text-electric">{s.k}</div>
            <div className="mt-0.5 font-mono text-[9.5px] tracking-[0.1em] uppercase text-[#6b7a95]">{s.l}</div>
          </div>
        ))}
      </div>
    </ParticleCard>
  );
}

function Leadership() {
  const scale = useInViewSimple<HTMLDivElement>();
  const comm = useInViewSimple<HTMLDivElement>();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <ParticleCard
        glowColor="10, 132, 255"
        particleCount={10}
        enableStars={true}
        enableBorderGlow={true}
        clickEffect={true}
        className="group relative overflow-hidden rounded-2xl border border-[#bcd6fa]/60 bg-white/80 p-6 shadow-[0_20px_50px_-30px_rgba(10,132,255,0.3)] backdrop-blur-md transition-all duration-300 hover:border-electric/40"
      >
        <div ref={scale.ref}>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-electric/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="inline-flex rounded-full border border-electric/20 bg-electric/[0.08] px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase text-electric">
            Scaling milestone
          </span>
          <div className="mt-5 flex items-end gap-1 font-display text-[#0a1428]">
            <span className="text-2xl font-bold text-[#6b7a95]">0</span>
            <span className="pb-1 text-lg text-[#6b7a95]">→</span>
            <span className="text-[42px] font-extrabold leading-none text-electric">
              <Counter to={1000} seen={scale.seen} />
            </span>
          </div>
          <div className="mt-1 font-mono text-[10px] tracking-[0.12em] uppercase text-[#6b7a95]">employees scaled</div>
          <div className="mt-5 flex gap-6 border-t border-[#bcd6fa]/50 pt-4">
            <div>
              <div className="font-display text-xl font-extrabold text-[#0a1428]">
                <Counter to={98} seen={scale.seen} suffix="%" />
              </div>
              <div className="mt-0.5 font-mono text-[9.5px] tracking-[0.1em] uppercase text-[#6b7a95]">Founding team retention</div>
            </div>
            <div>
              <div className="font-display text-xl font-extrabold text-[#0a1428]">
                <Counter to={36} seen={scale.seen} />
              </div>
              <div className="mt-0.5 font-mono text-[9.5px] tracking-[0.1em] uppercase text-[#6b7a95]">Months sustained</div>
            </div>
          </div>
        </div>
      </ParticleCard>

      <ParticleCard
        glowColor="10, 132, 255"
        particleCount={10}
        enableStars={true}
        enableBorderGlow={true}
        clickEffect={true}
        className="group relative overflow-hidden rounded-2xl border border-[#bcd6fa]/60 bg-white/80 p-6 shadow-[0_20px_50px_-30px_rgba(10,132,255,0.3)] backdrop-blur-md transition-all duration-300 hover:border-electric/40"
      >
        <div ref={comm.ref}>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-electric/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="inline-flex rounded-full border border-electric/20 bg-electric/[0.08] px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase text-electric">
            Commercialization
          </span>
          <div className="mt-5 font-display text-[42px] font-extrabold leading-none text-electric">
            <Counter to={10} seen={comm.seen} prefix="$" suffix="M" />
          </div>
          <div className="mt-1 font-mono text-[10px] tracking-[0.12em] uppercase text-[#6b7a95]">annual revenue driven</div>
          <p className="mt-4 text-[13px] leading-relaxed text-[#3d4c68]">
            Executive background driving enterprise brand expansion across a broad distribution footprint.
          </p>
          <div className="mt-4 flex gap-6 border-t border-[#bcd6fa]/50 pt-4">
            <div>
              <div className="font-display text-xl font-extrabold text-[#0a1428]">
                <Counter to={60} seen={comm.seen} suffix="+" />
              </div>
              <div className="mt-0.5 font-mono text-[9.5px] tracking-[0.1em] uppercase text-[#6b7a95]">Distribution channels</div>
            </div>
            <div>
              <div className="font-display text-xl font-extrabold text-[#0a1428]">Enterprise</div>
              <div className="mt-0.5 font-mono text-[9.5px] tracking-[0.1em] uppercase text-[#6b7a95]">Brand tier</div>
            </div>
          </div>
        </div>
      </ParticleCard>
    </div>
  );
}

function DeliveryPods() {
  return (
    <section id="delivery-pods" className="relative w-full overflow-hidden bg-canvas px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="pointer-events-none absolute right-1/2 top-10 h-[420px] w-[820px] translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1240px]">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/[0.08] px-4 py-1 font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-electric">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
            Delivery Pods &amp; Leadership
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#0a1428] sm:text-4xl lg:text-[38px]">
            In House Delivery Pod Breakdown
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#3d4c68] sm:text-lg">
            High velocity talent engineering pods, strict technical vetting, and proven executive scaling execution.
          </p>
        </div>

        <MagicBento
          glowColor="10, 132, 255"
          spotlightRadius={480}
          enableBorderGlow={true}
          enableStars={true}
          enableSpotlight={true}
          clickEffect={true}
          enableTilt={false}
          enableMagnetism={false}
          className="mt-12"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
            <PodNetwork />

            <div className="flex flex-col justify-between gap-3.5 sm:gap-4">
              {CAPS.map((c) => (
                <ParticleCard
                  key={c.title}
                  glowColor="10, 132, 255"
                  particleCount={8}
                  enableStars={true}
                  enableBorderGlow={true}
                  clickEffect={true}
                  className="group flex flex-1 flex-col justify-center rounded-2xl border border-[#bcd6fa]/60 bg-white/80 p-6 shadow-[0_16px_40px_-20px_rgba(10,132,255,0.18)] backdrop-blur-md transition-all duration-300 hover:border-electric/40 sm:p-6"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-electric/[0.05] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="relative shrink-0 rounded-xl bg-electric/[0.07] p-2.5 ring-1 ring-inset ring-electric/20 transition-transform duration-300 group-hover:scale-105">
                      {c.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-[16px] font-bold text-[#0a1428] transition-colors duration-200 group-hover:text-electric">
                        {c.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#3d4c68]">{c.body}</p>
                    </div>
                  </div>
                </ParticleCard>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Leadership />
          </div>
        </MagicBento>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 rounded-xl bg-electric px-7 py-3.5 font-display text-sm font-semibold text-white shadow-[0_10px_25px_-5px_rgba(10,132,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric-bright hover:shadow-[0_14px_30px_-5px_rgba(56,189,248,0.5)]"
          >
            Learn More About Us
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 rounded-xl border border-[#bcd6fa] bg-white/80 px-6 py-3.5 font-display text-sm font-semibold text-[#0a1428] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:bg-white hover:text-electric"
          >
            Explore Solutions
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 5: DUAL SECTOR SOLUTIONS
   ========================================================================== */

type Group = { title: string; items: string[] };
type Module = { title: string; body: string };
type Sector = {
  id: string;
  label: string;
  sub: string;
  tag: string;
  acc: string;
  acc2: string;
  emblem: "code" | "health";
  groups: Group[];
  modules: Module[];
};

const SECTORS: Sector[] = [
  {
    id: "tech",
    label: "Technology & SDLC",
    sub: "Capabilities",
    tag: "SDLC",
    acc: "#0a84ff",
    acc2: "#38bdf8",
    emblem: "code",
    groups: [
      { title: "Frontend", items: ["React", "Vue", "Angular", "Next.js"] },
      { title: "Backend", items: ["PHP / Laravel", "Node", "Python", "Java", "Go", ".NET"] },
      { title: "Data & AI", items: ["Data Eng", "AI / ML", "MLOps", "RAG"] },
      { title: "Cloud / DevOps", items: ["AWS / Azure", "Kubernetes", "Cyber"] },
      { title: "US Engagement Models", items: ["W2 Contract", "Corp-to-Corp (C2C)", "1099 Independent", "Direct Hire"] },
      { title: "Visa Pipelines", items: ["OPT / STEM OPT (12 to 36 months)", "H-1B (Transfer / Cap-Exempt)", "Green Card (PERM)", "USC", "Nearshore"] },
    ],
    modules: [
      {
        title: "Technical Onboarding & Secure SDLC Bootcamps",
        body: "14 day intensive repository orientation, code quality reviews, and architecture alignment curated by in house engineers.",
      },
      {
        title: "Enterprise Readiness & Timezone Collaboration",
        body: "Daily standup etiquette, BEI alignment, and synchronous workflow training for global candidates.",
      },
    ],
  },
  {
    id: "health",
    label: "Healthcare & Clinical",
    sub: "Capabilities",
    tag: "CLINICAL",
    acc: "#0d9488",
    acc2: "#2dd4bf",
    emblem: "health",
    groups: [
      { title: "Clinical Staffing", items: ["Physicians", "Registered Nurses (RN / NP)", "Emergency (ED)", "Outpatient (OPD)"] },
      { title: "Non-Clinical & Admin", items: ["Healthcare Administrators", "EMR / EHR Ops Directors", "Medical Billing & Coding"] },
      { title: "Compliance Vault", items: ["HIPAA-Aware Remote Frameworks", "PCI DSS Security", "Clinical Credentialing Audits"] },
    ],
    modules: [
      {
        title: "HIPAA & PCI DSS Regulatory Compliance Upskilling",
        body: "Remote data security protocols, EMR/EHR safety frameworks, and compliance certifications for health tech engineers and remote clinical specialists.",
      },
      {
        title: "Enterprise Readiness & BEI Alignment",
        body: "Communication protocols and clinical compliance onboarding.",
      },
    ],
  },
];

function Emblem({ kind }: { kind: "code" | "health" }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      <circle cx="60" cy="60" r="52" fill="none" stroke="var(--acc)" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" className="ds-spin-slow" style={{ transformOrigin: "60px 60px" }} />
      <circle cx="60" cy="60" r="40" fill="none" stroke="var(--acc2)" strokeWidth="1.2" strokeDasharray="1 7" className="ds-spin-rev" style={{ transformOrigin: "60px 60px" }} />
      <circle cx="60" cy="60" r="30" fill="color-mix(in srgb, var(--acc) 10%, transparent)" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="var(--acc)" strokeWidth="1" className="ds-pulse-ring" style={{ transformOrigin: "60px 60px" }} />
      <g className="ds-spin-slow" style={{ transformOrigin: "60px 60px" }}>
        <circle cx="60" cy="8" r="3" fill="var(--acc2)" />
      </g>
      {kind === "code" ? (
        <g stroke="var(--acc)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M50 50l-9 10 9 10" />
          <path d="M70 50l9 10-9 10" />
          <path d="M64 46l-8 28" stroke="var(--acc2)" />
        </g>
      ) : (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M60 44c-6-8-20-5-20 6 0 9 13 16 20 22 7-6 20-13 20-22 0-11-14-14-20-6z" stroke="var(--acc)" strokeWidth="2.4" />
          <path d="M50 62h6l3-6 4 10 3-4h4" stroke="var(--acc2)" strokeWidth="2.2" />
        </g>
      )}
    </svg>
  );
}

function GroupCard({ group, i }: { group: Group; i: number }) {
  const [pos, setPos] = useState({ x: "50%", y: "50%" });
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: `${e.clientX - r.left}px`, y: `${e.clientY - r.top}px` });
      }}
      className="group/card relative overflow-hidden rounded-xl border border-[#dbe6f5] bg-white/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--acc)_45%,transparent)] hover:shadow-[0_18px_36px_-20px_color-mix(in_srgb,var(--acc)_60%,transparent)]"
      style={{ ["--mx" as string]: pos.x, ["--my" as string]: pos.y, animation: "ds-rise .5s ease both", animationDelay: `${i * 60}ms` }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 [background:radial-gradient(180px_circle_at_var(--mx)_var(--my),color-mix(in_srgb,var(--acc)_16%,transparent),transparent_70%)]" />
      <div className="relative">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--acc)]" />
          <h4 className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-[#3d4c68]">{group.title}</h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {group.items.map((it) => (
            <span
              key={it}
              className="rounded-md border border-[color-mix(in_srgb,var(--acc)_22%,transparent)] bg-[color-mix(in_srgb,var(--acc)_7%,transparent)] px-2.5 py-1 text-[12px] font-medium text-[#0a1428] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--acc)_16%,transparent)] hover:text-[var(--acc)]"
            >
              {it}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ mod, i }: { mod: Module; i: number }) {
  return (
    <div
      className="group/mod relative overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--acc)_25%,transparent)] bg-[color-mix(in_srgb,var(--acc)_6%,transparent)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-22px_color-mix(in_srgb,var(--acc)_70%,transparent)]"
      style={{ animation: "ds-rise .5s ease both", animationDelay: `${180 + i * 90}ms` }}
    >
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/mod:translate-x-full" />
      <div className="relative flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--acc)] font-mono text-[12px] font-bold text-white shadow-[0_6px_14px_-6px_var(--acc)]">
          {i + 1}
        </span>
        <div>
          <h4 className="font-display text-[14.5px] font-bold leading-snug text-[#0a1428] transition-colors duration-200 group-hover/mod:text-[var(--acc)]">
            {mod.title}
          </h4>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[#3d4c68]">{mod.body}</p>
        </div>
      </div>
    </div>
  );
}

function DualSectorSolutions() {
  const [active, setActive] = useState(0);
  const sector = SECTORS[active];
  const style = { ["--acc" as string]: sector.acc, ["--acc2" as string]: sector.acc2 } as CSSProperties;

  return (
    <section id="solutions" className="relative w-full overflow-hidden bg-canvas px-5 py-20 sm:px-8 lg:px-12 lg:py-28" style={style}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[440px] w-[880px] -translate-x-1/2 rounded-full blur-3xl transition-colors duration-500 [background:radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--acc)_14%,transparent),transparent_62%)]" />

      <div className="relative mx-auto max-w-[1240px]">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--acc)_30%,transparent)] bg-[color-mix(in_srgb,var(--acc)_9%,transparent)] px-4 py-1 font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--acc)] transition-colors duration-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--acc)]" />
            Dual Sector Solutions
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#0a1428] sm:text-4xl lg:text-[38px]">
            One delivery engine, <span className="text-[var(--acc)] transition-colors duration-300">two regulated worlds</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#3d4c68] sm:text-lg">
            Toggle between our technology and healthcare capability stacks. Sourcing tracks, engagement models, and workforce readiness modules recolor to the sector you deploy into.
          </p>
        </div>

        <div className="mt-9 flex justify-center">
          <div className="relative grid grid-cols-2 gap-1 rounded-full border border-[#cddcf3] bg-white/80 p-1 shadow-[0_10px_30px_-16px_rgba(10,20,40,0.4)] backdrop-blur-md">
            <span
              className="absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-full transition-all duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] [background:linear-gradient(120deg,var(--acc),var(--acc2))]"
              style={{ left: active === 0 ? "0.25rem" : "calc(50% + 0rem)" }}
            />
            {SECTORS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`relative z-10 flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-[13px] font-semibold transition-colors duration-300 sm:px-7 sm:text-sm ${
                  active === i ? "text-white" : "text-[#3d4c68] hover:text-[#0a1428]"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${active === i ? "bg-white" : "bg-[#9db4d6]"}`} />
                {s.label}
                <span className="hidden font-mono text-[10px] font-normal opacity-70 sm:inline">{s.sub}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          key={sector.id}
          className={`mt-10 grid grid-cols-1 gap-6 ${active === 0 ? "lg:grid-cols-[1fr_1.35fr]" : "lg:grid-cols-[1.35fr_1fr]"}`}
          style={{ animation: "ds-fade .45s ease both" }}
        >
          <div className={`rounded-2xl border border-[#bcd6fa]/60 bg-white/50 p-5 backdrop-blur-md sm:p-6 ${active === 0 ? "lg:order-2" : "lg:order-1"}`}>
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#6b7a95]">Capability stack</span>
              <span className="rounded-md bg-[var(--acc)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-white">{sector.tag}</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {sector.groups.map((g, i) => (
                <GroupCard key={g.title} group={g} i={i} />
              ))}
            </div>
          </div>

          <div className={`flex flex-col gap-6 ${active === 0 ? "lg:order-1" : "lg:order-2"}`}>
            <div className="relative flex items-center gap-5 overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--acc)_25%,transparent)] bg-[linear-gradient(140deg,#0a1428,#111f38)] p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl [background:radial-gradient(circle,color-mix(in_srgb,var(--acc)_45%,transparent),transparent_70%)]" />
              <div className="relative h-24 w-24 shrink-0">
                <Emblem kind={sector.emblem} />
              </div>
              <div className="relative">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--acc2)]">Workforce readiness</div>
                <div className="mt-1 font-display text-xl font-extrabold text-white">Training &amp; upskilling modules</div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#aebfda]">
                  Curated by in house {sector.emblem === "code" ? "engineers" : "clinical & compliance leads"} before any profile ships.
                </p>
              </div>
            </div>

            {sector.modules.map((m, i) => (
              <ModuleCard key={m.title} mod={m} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 6: SPRINT WORKFLOW (CAROUSEL & PROGRESS HUD)
   ========================================================================== */

const SW_COLORS = {
  ink: "#0a1428",
  soft: "#3d4c68",
  el: "#0a84ff",
  br: "#38bdf8",
  line: "#bcd6fa",
};

function GfxDiscovery() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <rect x="46" y="30" width="120" height="150" rx="10" fill="#fff" stroke={SW_COLORS.line} strokeWidth="2" className="wf-draw" />
      {[62, 82, 102, 122].map((y, i) => (
        <line key={y} x1="64" y1={y} x2={i % 2 ? 132 : 148} y2={y} stroke={SW_COLORS.line} strokeWidth="4" strokeLinecap="round" className="wf-draw" />
      ))}
      <line x1="64" y1="142" x2="120" y2="142" stroke={SW_COLORS.br} strokeWidth="4" strokeLinecap="round" className="wf-draw" />
      <g className="wf-float">
        <circle cx="168" cy="118" r="34" fill="rgba(10,132,255,0.08)" stroke={SW_COLORS.el} strokeWidth="4" className="wf-draw" />
        <line x1="192" y1="142" x2="214" y2="164" stroke={SW_COLORS.el} strokeWidth="6" strokeLinecap="round" className="wf-draw" />
        <path d="M154 118l10 10 18-20" fill="none" stroke={SW_COLORS.br} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="wf-draw" />
      </g>
    </svg>
  );
}

function GfxMapping() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <circle cx="130" cy="112" r="72" fill="rgba(10,132,255,0.06)" stroke={SW_COLORS.line} strokeWidth="2" className="wf-draw" />
      <ellipse cx="130" cy="112" rx="72" ry="26" fill="none" stroke={SW_COLORS.line} strokeWidth="1.6" className="wf-draw" />
      <ellipse cx="130" cy="112" rx="30" ry="72" fill="none" stroke={SW_COLORS.line} strokeWidth="1.6" className="wf-draw" />
      <g style={{ transformOrigin: "130px 112px" }} className="wf-spin">
        <path d="M130 112 L130 40 A72 72 0 0 1 196 96 Z" fill="rgba(56,189,248,0.18)" />
      </g>
      {[[92, 78], [172, 92], [110, 150], [180, 148]].map(([x, y], i) => (
        <g key={i} className="wf-float" style={{ animationDelay: `${i * 0.3}s` }}>
          <circle cx={x} cy={y} r="6" fill={i === 1 ? SW_COLORS.br : SW_COLORS.el} />
          <circle cx={x} cy={y} r="6" fill="none" stroke={SW_COLORS.el} strokeWidth="2" className="wf-ping" style={{ transformOrigin: `${x}px ${y}px` }} />
        </g>
      ))}
    </svg>
  );
}

function GfxVetting() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <rect x="34" y="42" width="150" height="120" rx="10" fill={SW_COLORS.ink} className="wf-draw" />
      <circle cx="48" cy="56" r="3" fill="#ff5f57" />
      <circle cx="60" cy="56" r="3" fill="#febc2e" />
      <circle cx="72" cy="56" r="3" fill="#28c840" />
      {[78, 96, 114, 132].map((y, i) => (
        <line key={y} x1="50" y1={y} x2={[120, 150, 100, 138][i]} y2={y} stroke={i === 3 ? SW_COLORS.br : "#2c4670"} strokeWidth="5" strokeLinecap="round" className="wf-draw" />
      ))}
      <g className="wf-float">
        <path d="M196 70c-14-10-40-6-40 10 0 24 22 36 40 44 18-8 40-20 40-44 0-16-26-20-40-10z" fill="rgba(10,132,255,0.1)" stroke={SW_COLORS.el} strokeWidth="4" className="wf-draw" />
        <path d="M180 122l10 10 20-24" fill="none" stroke={SW_COLORS.br} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="wf-draw" />
      </g>
    </svg>
  );
}

function GfxInterview() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      {[[46, SW_COLORS.el], [150, SW_COLORS.br]].map(([x, c], i) => (
        <g key={i} className="wf-reveal">
          <rect x={x as number} y="52" width="64" height="90" rx="10" fill="#fff" stroke={SW_COLORS.line} strokeWidth="2" className="wf-draw" />
          <circle cx={(x as number) + 32} cy="82" r="14" fill="rgba(10,132,255,0.12)" stroke={c as string} strokeWidth="3" className="wf-draw" />
          <path d={`M${(x as number) + 12} 128c0-14 9-22 20-22s20 8 20 22`} fill="none" stroke={c as string} strokeWidth="3" className="wf-draw" />
        </g>
      ))}
      <path d="M118 82c12-8 20-8 30 0" fill="none" stroke={SW_COLORS.el} strokeWidth="3" strokeDasharray="3 4" className="wf-draw" />
      <path d="M148 112c-12 8-20 8-30 0" fill="none" stroke={SW_COLORS.br} strokeWidth="3" strokeDasharray="3 4" className="wf-draw" />
      <g className="wf-float">
        <rect x="100" y="150" width="60" height="46" rx="6" fill="#fff" stroke={SW_COLORS.el} strokeWidth="3" className="wf-draw" />
        <line x1="100" y1="162" x2="160" y2="162" stroke={SW_COLORS.el} strokeWidth="3" className="wf-draw" />
        <circle cx="130" cy="180" r="6" fill={SW_COLORS.br} />
      </g>
    </svg>
  );
}

function GfxClose() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <g className="wf-float">
        <path d="M60 96l30-16 24 12 22-10 34 18" fill="none" stroke={SW_COLORS.el} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="wf-draw" />
        <path d="M90 80l6 30M114 92l4 26M136 82l6 28" stroke={SW_COLORS.br} strokeWidth="5" strokeLinecap="round" className="wf-draw" />
      </g>
      <line x1="46" y1="164" x2="214" y2="164" stroke={SW_COLORS.line} strokeWidth="3" className="wf-draw" />
      {["30", "60", "90"].map((d, i) => {
        const x = 70 + i * 60;
        return (
          <g key={d} className="wf-reveal">
            <circle cx={x} cy={164} r="12" fill="#fff" stroke={SW_COLORS.el} strokeWidth="3" />
            <circle cx={x} cy={164} r="4" fill={SW_COLORS.el} />
            <text x={x} y="196" textAnchor="middle" fontSize="13" fontFamily="'JetBrains Mono', monospace" fill={SW_COLORS.soft}>{d}</text>
          </g>
        );
      })}
    </svg>
  );
}

function GfxSuccess() {
  return (
    <svg viewBox="0 0 260 240" className="h-full w-full">
      {[[40, 40, SW_COLORS.br], [220, 60, SW_COLORS.el], [56, 180, SW_COLORS.el], [210, 190, SW_COLORS.br], [130, 24, SW_COLORS.el]].map(([x, y, c], i) => (
        <rect key={i} x={x as number} y={y as number} width="8" height="8" rx="2" fill={c as string} className="wf-float" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 0.25}s` }} />
      ))}
      <g className="wf-float">
        <circle cx="130" cy="118" r="60" fill="rgba(10,132,255,0.08)" stroke={SW_COLORS.el} strokeWidth="4" className="wf-draw" />
        <circle cx="130" cy="118" r="46" fill="none" stroke={SW_COLORS.br} strokeWidth="2" strokeDasharray="4 6" className="wf-spin" style={{ transformOrigin: "130px 118px" }} />
        <path d="M104 118l16 16 34-40" fill="none" stroke={SW_COLORS.el} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="wf-draw" />
      </g>
      <path d="M110 168l-10 40 30-18 30 18-10-40" fill="rgba(56,189,248,0.25)" stroke={SW_COLORS.el} strokeWidth="3" className="wf-draw" />
    </svg>
  );
}

const STEPS = [
  { n: "01", title: "Technical & Compliance Discovery", short: "Discovery", body: "Stack analysis, clinical mapping, culture alignment, and success profiling.", Gfx: GfxDiscovery },
  { n: "02", title: "Market Mapping", short: "Mapping", body: "Instant candidate screening and passive sourcing via proprietary talent intelligence.", Gfx: GfxMapping },
  { n: "03", title: "Hard Coded Vetting", short: "Vetting", body: "Code validation, system design review, BEI/HEXACO/OCEAN behavioral assessment.", Gfx: GfxVetting },
  { n: "04", title: "Interview Orchestration", short: "Interview", body: "Frictionless panel scheduling, structured briefings, and feedback loops.", Gfx: GfxInterview },
  { n: "05", title: "Close & Integration", short: "Close", body: "Offer negotiation, resignation coaching, and 30/60/90 day onboarding check-ins.", Gfx: GfxClose },
];

const PANEL_COUNT = STEPS.length + 1;

function CandidateFigure({ pose }: { pose: "run" | "sit" | "wave" }) {
  const skin = "#f4c9a0";
  const suit = "#12213c";
  const shirt = "#eaf2ff";
  const tie = "#0a84ff";
  const hair = "#233248";
  const ls = { transformBox: "fill-box", transformOrigin: "top center" } as const;

  if (pose === "wave") {
    return (
      <svg viewBox="0 0 44 70" className="h-full w-full overflow-visible" fill="none">
        <path d="M17 44 L15 62" stroke={suit} strokeWidth="5" strokeLinecap="round" />
        <path d="M27 44 L29 62" stroke={suit} strokeWidth="5" strokeLinecap="round" />
        <path d="M14 22 Q22 18 30 22 L28 44 Q22 47 16 44 Z" fill={suit} />
        <path d="M19 22 L22 25 L25 22 Z" fill={shirt} />
        <path d="M22 24 L20.4 28 L22 35 L23.6 28 Z" fill={tie} />
        <path d="M15 27 L10 36" stroke={suit} strokeWidth="4" strokeLinecap="round" />
        <path d="M29 25 L36 14" stroke={suit} strokeWidth="4" strokeLinecap="round" className="wf-wave-arm" />
        <circle cx="37" cy="12" r="3.5" fill={skin} className="wf-wave-arm" />
        <circle cx="22" cy="13" r="6.5" fill={skin} />
        <path d="M15.5 13 A6.5 6.5 0 0 1 28.5 13 Q22 8 15.5 13 Z" fill={hair} />
        <path d="M19 16 Q22 19 25 16" fill="none" stroke={suit} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="19.5" cy="13.5" r="1" fill={suit} />
        <circle cx="24.5" cy="13.5" r="1" fill={suit} />
      </svg>
    );
  }

  if (pose === "run") {
    return (
      <svg viewBox="0 0 44 62" className="h-full w-full overflow-visible" fill="none">
        <g className="wf-runner">
          <path d="M22 38 L15 54" stroke={suit} strokeWidth="5" strokeLinecap="round" className="wf-leg-a" style={ls} />
          <path d="M22 38 L29 53" stroke={suit} strokeWidth="5" strokeLinecap="round" className="wf-leg-b" style={ls} />
          <path d="M14 22 Q22 18 30 22 L28 40 Q22 43 16 40 Z" fill={suit} />
          <path d="M19 22 L22 25 L25 22 Z" fill={shirt} />
          <path d="M22 24 L20.4 28 L22 35 L23.6 28 Z" fill={tie} />
          <path d="M15 25 L9 31" stroke={suit} strokeWidth="4" strokeLinecap="round" className="wf-arm-a" style={ls} />
          <path d="M29 25 L35 30" stroke={suit} strokeWidth="4" strokeLinecap="round" className="wf-arm-b" style={ls} />
          <circle cx="22" cy="13" r="6.5" fill={skin} />
          <path d="M15.5 13 A6.5 6.5 0 0 1 28.5 13 Q22 8 15.5 13 Z" fill={hair} />
          <circle cx="24.6" cy="13" r="1" fill={suit} />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 44 62" className="h-full w-full overflow-visible" fill="none">
      <g className="wf-sitter">
        <rect x="9" y="47" width="26" height="3" rx="1.5" fill={tie} />
        <rect x="12" y="35" width="20" height="12.5" rx="1.5" fill="#cfe0f7" stroke={tie} strokeWidth="1.4" />
        <line x1="16" y1="39" x2="28" y2="39" stroke={tie} strokeWidth="1" strokeLinecap="round" />
        <line x1="16" y1="42" x2="24" y2="42" stroke={tie} strokeWidth="1" strokeLinecap="round" />
        <path d="M18 44 L18 55" stroke={suit} strokeWidth="5" strokeLinecap="round" />
        <path d="M26 44 L26 55" stroke={suit} strokeWidth="5" strokeLinecap="round" />
        <path d="M22 39 L16 44 M22 39 L28 44" stroke={suit} strokeWidth="5" strokeLinecap="round" />
        <path d="M15 22 Q22 18 29 22 L27 40 Q22 42 17 40 Z" fill={suit} />
        <path d="M19 22 L22 25 L25 22 Z" fill={shirt} />
        <path d="M22 24 L20.6 28 L22 34 L23.4 28 Z" fill={tie} />
        <path d="M16 26 L21 34" stroke={suit} strokeWidth="4" strokeLinecap="round" className="wf-type" style={ls} />
        <path d="M28 26 L23 34" stroke={suit} strokeWidth="4" strokeLinecap="round" className="wf-type wf-type-2" style={ls} />
        <g className="wf-nod" style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}>
          <circle cx="22" cy="13" r="6.5" fill={skin} />
          <path d="M15.5 13 A6.5 6.5 0 0 1 28.5 13 Q22 8 15.5 13 Z" fill={hair} />
          <circle cx="22" cy="13" r="1" fill={suit} />
        </g>
      </g>
    </svg>
  );
}

function OverviewVisual({ onSelectStep }: { onSelectStep?: (index: number) => void }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const nodes = [
    { a: -90, l: "01", label: "Discovery" },
    { a: -18, l: "02", label: "Mapping" },
    { a: 54, l: "03", label: "Vetting" },
    { a: 126, l: "04", label: "Interview" },
    { a: 198, l: "05", label: "Close" },
  ];
  const R = 88, cx = 150, cy = 155;

  return (
    <svg viewBox="0 0 300 310" className="h-full w-full select-none">
      <defs>
        <radialGradient id="ov-core" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0a84ff" />
        </radialGradient>
      </defs>

      <circle cx={cx} cy={cy} r={R + 28} fill="none" stroke="#bcd6fa" strokeWidth="1" opacity="0.35" />

      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke="#bcd6fa"
        strokeWidth="1.5"
        strokeDasharray="3 7"
        className="wf-spin"
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {nodes.map((n, idx) => {
        const rad = (n.a * Math.PI) / 180;
        const x = cx + R * Math.cos(rad);
        const y = cy + R * Math.sin(rad);
        const isActive = idx === activeStep;

        return (
          <g key={n.l} className="cursor-pointer" onClick={() => onSelectStep?.(idx)}>
            <line
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={isActive ? "#0a84ff" : "#bcd6fa"}
              strokeWidth={isActive ? "1.8" : "1.2"}
              strokeDasharray={isActive ? "none" : "3 3"}
              style={{ transition: "stroke 0.8s ease, stroke-width 0.8s ease" }}
            />

            {isActive && (
              <g>
                <circle cx={x} cy={y} r="21" fill="none" stroke="#0a84ff" strokeWidth="1.8">
                  <animate attributeName="r" values="21;38" dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0" dur="2.6s" repeatCount="indefinite" />
                </circle>
                <circle cx={x} cy={y} r="21" fill="none" stroke="#38bdf8" strokeWidth="1.2">
                  <animate attributeName="r" values="21;38" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
                </circle>
              </g>
            )}

            <circle
              cx={x}
              cy={y}
              r="21"
              fill="#ffffff"
              stroke={isActive ? "#0a84ff" : "#bcd6fa"}
              strokeWidth={isActive ? "2.6" : "1.8"}
              style={{ transition: "stroke 0.6s ease, stroke-width 0.6s ease" }}
            />

            <text
              x={x}
              y={y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="700"
              fill={isActive ? "#0a84ff" : "#5a6e8c"}
              style={{ transition: "fill 0.6s ease" }}
            >
              {n.l}
            </text>

            <text
              x={x}
              y={y + 31}
              textAnchor="middle"
              fontSize="9"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight={isActive ? "700" : "500"}
              fill={isActive ? "#0a84ff" : "#6b7a95"}
              style={{ transition: "fill 0.6s ease, font-weight 0.6s ease" }}
            >
              {n.label}
            </text>
          </g>
        );
      })}

      <circle cx={cx} cy={cy} r="48" fill="rgba(10,132,255,0.03)" />
      <circle
        cx={cx}
        cy={cy}
        r="54"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        className="wf-spin"
        style={{ transformOrigin: `${cx}px ${cy}px`, animationDirection: "reverse" }}
      />
      <image
        href="/assets/sprint.png"
        x={cx - 55}
        y={cy - 57}
        width={110}
        height={110}
        preserveAspectRatio="xMidYMid meet"
        className="cursor-pointer drop-shadow-[0_8px_20px_rgba(10,132,255,0.35)] transition-transform duration-200 hover:scale-105"
        onClick={() => onSelectStep?.(0)}
      />
    </svg>
  );
}

function SprintWorkflow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const movingRef = useRef(false);
  const lastScrollTimeRef = useRef<number>(Date.now());
  const isAutoScrollingRef = useRef<boolean>(false);

  const [active, setActive] = useState(0);
  const [moving, setMoving] = useState(false);

  const jumpToPanel = (panelIndex: number) => {
    const st = ScrollTrigger.getById("sprint-st-v1");
    if (st) {
      const target = st.start + (panelIndex / (PANEL_COUNT - 1)) * (st.end - st.start);
      isAutoScrollingRef.current = true;
      lastScrollTimeRef.current = Date.now();
      window.scrollTo({ top: target, behavior: "smooth" });
      return;
    }
    if (pinRef.current) {
      window.scrollTo({ top: pinRef.current.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      const track = trackRef.current!;
      const distance = () => track.scrollWidth - window.innerWidth;

      const setAvatar = gsap.quickSetter(avatarRef.current!, "x", "px");
      const railW = () => railRef.current?.offsetWidth ?? 0;

      const setMove = (m: boolean) => {
        if (movingRef.current !== m) {
          movingRef.current = m;
          setMoving(m);
        }
      };

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          id: "sprint-st-v1",
          trigger: pinRef.current!,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (PANEL_COUNT - 1),
            duration: { min: 0.2, max: 0.6 },
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            setAvatar(self.progress * railW());
            const curr = Math.min(PANEL_COUNT - 1, Math.round(self.progress * (PANEL_COUNT - 1)));
            setActive(curr);
            setMove(Math.abs(self.getVelocity()) > 12);
            if (!isAutoScrollingRef.current) lastScrollTimeRef.current = Date.now();
          },
          onSnapComplete: () => {
            setMove(false);
            isAutoScrollingRef.current = false;
          },
          onScrubComplete: () => {
            setMove(false);
            isAutoScrollingRef.current = false;
          },
        },
      });

      gsap.utils.toArray<HTMLElement>(".wf-panel").forEach((panel) => {
        const reveals = panel.querySelectorAll(".wf-reveal");
        if (reveals.length) {
          gsap.from(reveals, {
            y: 44,
            opacity: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left 78%",
              toggleActions: "play none none reverse",
            },
          });
        }
        panel.querySelectorAll<SVGGeometryElement>(".wf-draw").forEach((el) => {
          let len = 0;
          try {
            len = el.getTotalLength();
          } catch {
            len = 0;
          }
          if (!len) return;
          gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(el, {
            strokeDashoffset: 0,
            duration: 1,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left 72%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      gsap.utils.toArray<HTMLElement>(".wf-gfx").forEach((g) => {
        gsap.fromTo(
          g,
          { xPercent: 14 },
          {
            xPercent: -14,
            ease: "none",
            scrollTrigger: {
              trigger: g,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      gsap.to(".wf-float", { y: -8, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.15 });
      gsap.to(".wf-spin", { rotation: 360, transformOrigin: "center", duration: 8, ease: "none", repeat: -1 });
      gsap.fromTo(".wf-ping", { scale: 1, opacity: 0.8 }, { scale: 2.6, opacity: 0, duration: 1.8, ease: "power1.out", repeat: -1, stagger: 0.2 });

      const autoInterval = setInterval(() => {
        const st = ScrollTrigger.getById("sprint-st-v1");
        if (!st || !st.isActive) return;
        const now = Date.now();
        if (now - lastScrollTimeRef.current >= 3400) {
          const curr = Math.min(PANEL_COUNT - 1, Math.round(st.progress * (PANEL_COUNT - 1)));
          const next = (curr + 1) % PANEL_COUNT;
          const target = st.start + (next / (PANEL_COUNT - 1)) * (st.end - st.start);
          isAutoScrollingRef.current = true;
          lastScrollTimeRef.current = now;
          window.scrollTo({ top: target, behavior: "smooth" });
        }
      }, 1000);

      const id = setTimeout(() => ScrollTrigger.refresh(), 300);
      return () => {
        clearTimeout(id);
        clearInterval(autoInterval);
      };
    },
    { scope: rootRef }
  );

  const hudLabels = ["Step 01", "Step 02", "Step 03", "Step 04", "Step 05", "Live"];

  return (
    <section ref={rootRef} className="relative w-full bg-canvas">
      <div className="relative flex h-screen w-full items-center overflow-hidden px-6 sm:px-16 lg:px-24">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(10,132,255,0.1)_1px,transparent_1.4px)] [background-size:26px_26px]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14),transparent_62%)] blur-2xl" />

        <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/[0.08] px-4 py-1 font-mono text-[10px] font-500 tracking-[0.14em] uppercase text-electric backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
              5 Step Execution Workflow
            </div>

            <h2 className="font-display text-4xl font-800 leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[52px]">
              One Candidate,<br />
              <span className="text-electric">Five Orchestrated Steps.</span>
            </h2>

            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft sm:text-[17px]">
              From technical brief to a fully onboarded specialist in{" "}
              <strong className="text-ink">7 days flat</strong>, vetted in house,
              compliance ready, and supported through the 30/60/90 day ramp.
            </p>

            <div className="mt-7 grid grid-cols-5 gap-2">
              {STEPS.map((s, i) => (
                <button
                  key={s.n}
                  onClick={() => jumpToPanel(i)}
                  className="group flex flex-col items-center gap-1.5 rounded-xl border border-[#cddcf3] bg-white/70 px-2 py-3 text-center backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:bg-white hover:shadow-[0_8px_20px_-6px_rgba(10,132,255,0.22)] cursor-pointer"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-electric/10 font-mono text-[11px] font-800 text-electric transition-all duration-200 group-hover:bg-electric group-hover:text-white">
                    {s.n}
                  </span>
                  <span className="font-mono text-[9px] font-600 leading-tight text-ink-soft group-hover:text-electric">
                    {s.short}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-5 font-mono text-[11px] tracking-[0.12em] uppercase text-[#8a9bbf]">
              Click a step above or meet our guide in the corner →
            </p>
          </div>

          <div className="relative mx-auto hidden aspect-square w-full max-w-[440px] rounded-[2rem] border border-[#bcd6fa]/60 bg-white/60 p-6 shadow-[0_40px_90px_-40px_rgba(10,132,255,0.5)] backdrop-blur-md lg:block">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-50 [background-image:radial-gradient(rgba(10,132,255,0.1)_1px,transparent_1.4px)] [background-size:22px_22px]" />
            <OverviewVisual onSelectStep={(idx) => jumpToPanel(idx)} />
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end gap-2 sm:bottom-10 sm:right-10">
          <button
            type="button"
            onClick={() => jumpToPanel(0)}
            className="wf-bubble relative mr-2 cursor-pointer text-left transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none"
            aria-label="Explore the sprint: Click to start"
          >
            <div className="rounded-xl border border-electric/30 bg-white/90 px-3.5 py-2 shadow-[0_8px_24px_-6px_rgba(10,132,255,0.25)] backdrop-blur-md transition-all hover:border-electric hover:shadow-[0_8px_24px_-4px_rgba(10,132,255,0.38)]">
              <p className="font-mono text-[11px] font-600 leading-tight text-ink">Explore the sprint</p>
              <p className="mt-0.5 font-mono text-[10px] font-semibold text-electric">Click me →</p>
            </div>
            <div className="absolute -bottom-2 right-5 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/90" />
          </button>
          <button
            type="button"
            onClick={() => jumpToPanel(0)}
            className="group flex h-[72px] w-[52px] cursor-pointer items-end justify-center focus:outline-none"
            aria-label="Start the sprint journey"
          >
            <div className="h-full w-full drop-shadow-[0_6px_12px_rgba(10,132,255,0.4)] transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1">
              <CandidateFigure pose="wave" />
            </div>
          </button>
        </div>
      </div>

      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(10,132,255,0.1)_1px,transparent_1.4px)] [background-size:26px_26px]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14),transparent_62%)] blur-2xl" />

        <div className="pointer-events-none absolute left-5 top-6 z-20 sm:left-10 sm:top-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/[0.08] px-4 py-1 font-mono text-[10px] font-500 tracking-[0.14em] uppercase text-electric backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
            5 Step Execution Workflow 7 Day Sprint
          </div>
        </div>

        <div ref={trackRef} className="flex h-full will-change-transform">
          {STEPS.map((step, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={step.n} className="wf-panel relative flex h-full w-screen shrink-0 items-center px-6 sm:px-16 lg:px-24">
                <div className={`relative grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative">
                    <span className="pointer-events-none absolute -left-2 top-1/2 -z-10 -translate-y-1/2 select-none font-display text-[30vw] font-800 leading-none text-electric/[0.06] lg:-left-6 lg:text-[13rem]">
                      {step.n}
                    </span>
                    <div className="wf-reveal flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric font-display text-lg font-800 text-white shadow-[0_10px_24px_-8px_rgba(10,132,255,0.7)]">
                        {step.n}
                      </span>
                      <span className="h-px w-14 bg-gradient-to-r from-electric to-transparent" />
                      <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#6b7a95]">Step {step.n} / 05</span>
                    </div>
                    <h3 className="wf-reveal mt-5 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-800 leading-tight tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="wf-reveal mt-4 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
                      {step.body}
                    </p>
                  </div>
                  <div className="wf-reveal wf-gfx relative mx-auto aspect-[13/11] w-full max-w-[420px] rounded-3xl border border-[#bcd6fa]/60 bg-white/70 p-6 shadow-[0_30px_70px_-34px_rgba(10,132,255,0.4)] backdrop-blur-md">
                    <step.Gfx />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="wf-panel relative flex h-full w-screen shrink-0 items-center px-6 sm:px-16 lg:px-24">
            <div className="relative grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
              <div className="relative">
                <div className="wf-reveal inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/[0.08] px-4 py-1 font-mono text-[11px] font-600 tracking-[0.16em] uppercase text-electric">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric" /> Onboarded
                </div>
                <h3 className="wf-reveal mt-5 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-800 leading-tight tracking-tight text-ink">
                  Deployed, retained,<br />
                  <span className="text-electric">productive.</span>
                </h3>
                <p className="wf-reveal mt-4 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
                  Seven days from brief to a fully integrated specialist, vetted in house, compliance ready, and supported through the 30/60/90 day ramp.
                </p>
                <div className="wf-reveal mt-7 flex flex-wrap gap-3">
                  <a href="#" className="group inline-flex items-center gap-2 rounded-xl bg-electric px-7 py-3.5 font-display text-sm font-600 text-white shadow-[0_10px_25px_-5px_rgba(10,132,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric-bright hover:shadow-[0_14px_30px_-5px_rgba(56,189,248,0.5)]">
                    Start a 7 day sprint
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 rounded-xl border border-[#bcd6fa] bg-white/80 px-6 py-3.5 font-display text-sm font-600 text-ink backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:text-electric">
                    See the vetting rubric
                  </a>
                </div>
              </div>
              <div className="wf-reveal wf-gfx relative mx-auto aspect-[13/11] w-full max-w-[420px] rounded-3xl border border-[#bcd6fa]/60 bg-white/70 p-6 shadow-[0_30px_70px_-34px_rgba(10,132,255,0.4)] backdrop-blur-md">
                <GfxSuccess />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6 sm:px-10 sm:pb-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 flex items-center justify-between font-mono text-[10px] tracking-[0.14em] uppercase text-[#6b7a95]">
              <span className="inline-flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${moving ? "bg-electric-bright" : "bg-electric"}`} />
                Candidate journey · {moving ? "in transit" : "in analysis"}
              </span>
              <span className="text-electric">{Math.round((active / (PANEL_COUNT - 1)) * 100)}% complete</span>
            </div>
            <div ref={railRef} className="relative h-1.5 w-full rounded-full bg-[#d6e3f7]">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-electric to-electric-bright transition-[width] duration-150"
                style={{ width: `${(active / (PANEL_COUNT - 1)) * 100}%` }}
              />
              {hudLabels.map((label, i) => {
                const done = i <= active;
                return (
                  <button
                    key={i}
                    onClick={() => jumpToPanel(i)}
                    className="group absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                    style={{ left: `${(i / (PANEL_COUNT - 1)) * 100}%` }}
                    aria-label={`Jump to ${label}`}
                  >
                    <span className={`block h-3 w-3 rounded-full border-2 transition-all duration-200 group-hover:scale-125 ${done ? "border-electric bg-electric" : "border-[#b9cdec] bg-white group-hover:border-electric"}`} />
                    <span className={`absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] tracking-[0.1em] uppercase transition-colors duration-200 ${i === active ? "font-semibold text-electric" : "text-[#9aabc6] group-hover:text-electric"}`}>
                      {label}
                    </span>
                  </button>
                );
              })}
              {!moving && (
                <span
                  className="wf-stop pointer-events-none absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-electric"
                  style={{ left: `${(active / (PANEL_COUNT - 1)) * 100}%` }}
                />
              )}
              <div ref={avatarRef} className="absolute bottom-1/2 left-0">
                <div className="-translate-x-1/2 translate-y-[3px]">
                  <div className={`h-[54px] w-[38px] origin-bottom drop-shadow-[0_6px_10px_rgba(10,132,255,0.35)] ${moving ? "wf-bob" : ""}`}>
                    <CandidateFigure pose={moving ? "run" : "sit"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 7: PRODUCT SOLUTIONS & CYBER CARD CATALOG
   ========================================================================== */

const solutionCategories = [
  { id: "all", name: "All Solutions" },
  { id: "SaaS Product", name: "SaaS Platforms" },
  { id: "Enterprise Software", name: "Enterprise ERP" },
  { id: "Service", name: "Custom IT" },
  { id: "Corporate Sales & Sourcing Service", name: "B2B Sourcing" },
];

interface ProjectCyberCardProps {
  project: Project;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  onClick: () => void;
  index: number;
}

function ProjectCyberCard({ project, hoveredId, setHoveredId, onClick, index }: ProjectCyberCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!cardRef.current) return;
    const update = () => {
      if (cardRef.current) {
        setDimensions({
          width: cardRef.current.clientWidth,
          height: cardRef.current.clientHeight,
        });
      }
    };
    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  const w = dimensions.width;
  const h = dimensions.height;
  const cornerCut = Math.max(120, Math.min(160, w * 0.48));

  const clipPathD =
    w && h
      ? `
    M 16 0 
    L ${w - 16} 0 
    A 16 16 0 0 1 ${w} 16 
    L ${w} ${h - 38 - 16} 
    A 16 16 0 0 1 ${w - 16} ${h - 38} 
    L ${w - cornerCut + 16} ${h - 38} 
    A 16 16 0 0 0 ${w - cornerCut} ${h - 38 + 16} 
    L ${w - cornerCut} ${h - 16} 
    A 16 16 0 0 1 ${w - cornerCut - 16} ${h} 
    L 16 ${h} 
    A 16 16 0 0 1 0 ${h - 16} 
    L 0 16 
    A 16 16 0 0 1 16 0 
    Z
  `
          .trim()
          .replace(/\s+/g, " ")
      : "";

  const clipId = `v1-proj-clip-${project.slug}`;
  const isHovered = hoveredId === project.slug;

  return (
    <div
      ref={cardRef}
      className={`skills-card-container group animate-card cursor-target ${isHovered ? "is-active" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setHoveredId(project.slug)}
      onMouseLeave={() => setHoveredId(null)}
      onTouchStart={() => setHoveredId(project.slug)}
      onTouchEnd={() => setHoveredId(null)}
      style={
        {
          aspectRatio: "3 / 3.9",
          ["--card-border-stroke" as string]: `url(#v1-border-grad-${project.slug})`,
          ["--card-border-glow" as string]: `url(#v1-glow-${project.slug})`,
        } as React.CSSProperties
      }
    >
      {w > 0 && h > 0 && (
        <svg className="skills-card-svg" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
          <defs>
            <filter id={`v1-glow-${project.slug}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#0a84ff" floodOpacity="0.4" />
            </filter>
            <linearGradient id={`v1-border-grad-${project.slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0a84ff" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0066cc" />
            </linearGradient>
            <linearGradient id={`v1-bg-grad-${project.slug}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f0f6ff" stopOpacity="0.98" />
            </linearGradient>
            <clipPath id={clipId}>
              <path d={clipPathD} />
            </clipPath>
          </defs>
          <path d={clipPathD} fill={`url(#v1-bg-grad-${project.slug})`} className="skills-card-fill" />
          <path d={clipPathD} fill="none" className="skills-card-border-path" />
        </svg>
      )}

      <div className="skills-card-body" style={{ clipPath: `url(#${clipId})` }}>
        <div className="skills-card-cyber-grid" />
        <div className="skills-card-inner-overlay" />
        <div className="skills-card-img-wrap">
          <img src={project.image} alt={project.alt} className="skills-card-img" />
        </div>
        <div className="skills-card-info">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-electric">{project.type}</span>
          <h4 className="font-display text-sm font-extrabold text-ink mt-0.5">{project.title}</h4>
          <p className="skills-card-desc mt-1 line-clamp-3 text-xs text-ink-soft">{project.description}</p>
          <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] font-semibold text-electric">
            <span>View Brief &amp; Architecture</span>
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="skills-card-label" style={{ width: cornerCut, height: 38 }}>
        <span className="skills-card-name">{project.title}</span>
        <span className="skills-card-level font-mono text-[10px] text-electric">#{String(index + 1).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

function ProductSolutions() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [overviewProject, setOverviewProject] = useState<Project | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.type === activeCategory || (activeCategory === "Service" && p.type.includes("Service")));

  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let ro: ResizeObserver | undefined;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".v1-solutions-header-num",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".v1-solutions-section-header",
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        gsap.fromTo(
          ".v1-solutions-header-title",
          { opacity: 0, y: 40, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power4.out",
            delay: 0.1,
            scrollTrigger: {
              trigger: ".v1-solutions-section-header",
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        gsap.fromTo(
          ".v1-solutions-filter-bar",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.25,
            scrollTrigger: {
              trigger: ".v1-solutions-section-header",
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        if (sectionRef.current) {
          const cards = sectionRef.current.querySelectorAll(".animate-card");
          gsap.fromTo(
            cards,
            { opacity: 0, y: 40, scale: 0.88, filter: "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.8,
              stagger: 0.08,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }, sectionRef);

      if (sectionRef.current) {
        ro = new ResizeObserver(() => {
          ScrollTrigger.refresh();
        });
        ro.observe(sectionRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
      ro?.disconnect();
    };
  }, []);

  return (
    <section
      id="solutions-catalog"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-canvas py-28 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden text-ink"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-electric-bright/5 blur-[140px] rounded-full" />
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(10,132,255,0.08)_1px,transparent_1.4px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-[90rem] mx-auto relative z-10">
        <div className="v1-solutions-section-header mb-10 text-center sm:text-left">
          <span className="v1-solutions-header-num inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/[0.08] px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-electric backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
            [ 07 ] · SOLUTIONS &amp; SAAS CATALOG
          </span>
          <h2 className="v1-solutions-header-title mt-3 font-display text-3xl font-800 tracking-tight text-ink sm:text-4xl lg:text-5xl">
            ENTERPRISE PLATFORMS <span className="text-electric">&amp; TAILORED ARCHITECTURES</span>
          </h2>
        </div>

        <div className="v1-solutions-filter-bar mb-14 flex flex-wrap gap-2.5 sm:gap-3">
          {solutionCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-xl border px-4 py-2 font-mono text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? "border-electric bg-electric text-white shadow-[0_4px_16px_rgba(10,132,255,0.35)]"
                  : "border-[#bcd6fa] bg-white/80 text-ink-soft hover:border-electric hover:text-electric backdrop-blur-sm"
              }`}
            >
              [ {cat.name} ]
            </button>
          ))}
        </div>

        <div className="skills-grid pb-16">
          {filteredProjects.map((p, idx) => (
            <div
              key={p.slug}
              className={`skills-col-card ${idx % 2 === 1 ? "sm:translate-y-8" : ""}`}
            >
              <ProjectCyberCard
                project={p}
                index={idx}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                onClick={() => setOverviewProject(p)}
              />
            </div>
          ))}
        </div>
      </div>

      {overviewProject && (
        <ProjectOverviewModal
          project={overviewProject}
          index={filteredProjects.findIndex((p) => p.slug === overviewProject.slug)}
          onClose={() => setOverviewProject(null)}
          onOpenCaseStudy={(proj) => {
            setOverviewProject(null);
            setSelectedCaseStudy(proj);
          }}
        />
      )}

      {selectedCaseStudy && (
        <ProjectModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}
    </section>
  );
}

/* ==========================================================================
   SECTION 8: COMMERCIAL TERMS
   ========================================================================== */

const CT_COLORS = {
  skin: "#f4c9a0",
  skinShade: "#e3b184",
  suit: "#12213c",
  suitLight: "#1c3560",
  shirt: "#eaf2ff",
  tie: "#0a84ff",
  br: "#38bdf8",
  hair: "#233248",
};

function SpecialistFigure() {
  return (
    <svg viewBox="0 0 260 300" className="h-full w-full overflow-visible" fill="none" aria-hidden>
      <ellipse cx="120" cy="286" rx="104" ry="14" fill="rgba(3,12,30,0.45)" />
      <g className="ct-bubble" style={{ animationDelay: "0.6s" }}>
        <rect x="22" y="40" width="96" height="46" rx="14" fill="#fff" />
        <path d="M92 84l8 16-24-10z" fill="#fff" />
        <circle cx="42" cy="63" r="6" fill={CT_COLORS.tie} />
        <circle cx="62" cy="63" r="6" fill={CT_COLORS.br} />
        <circle cx="82" cy="63" r="6" fill="#16a34a" />
        <text x="102" y="68" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fontSize="12" fill={CT_COLORS.suit}>15+</text>
      </g>
      <path d="M112 210 L102 280" stroke={CT_COLORS.suit} strokeWidth="17" strokeLinecap="round" />
      <path d="M132 210 L146 280" stroke={CT_COLORS.suit} strokeWidth="17" strokeLinecap="round" />
      <path d="M96 280 q-10 4 -2 10 l16 0 0 -12z" fill={CT_COLORS.hair} />
      <path d="M152 280 q10 4 2 10 l-16 0 0 -12z" fill={CT_COLORS.hair} />
      <path d="M96 214 Q98 150 122 150 Q146 150 148 214 Z" fill={CT_COLORS.suit} />
      <path d="M110 150 Q122 158 134 150 L130 196 Q122 200 114 196 Z" fill={CT_COLORS.shirt} />
      <path d="M122 154 L118 164 L122 194 L126 164 Z" fill={CT_COLORS.tie} />
      <path d="M96 214 Q122 224 148 214 L146 224 Q122 232 98 224 Z" fill={CT_COLORS.suitLight} opacity="0.6" />
      <path d="M140 168 Q162 176 160 200" stroke={CT_COLORS.suit} strokeWidth="14" strokeLinecap="round" fill="none" />
      <g className="ct-present">
        <path d="M104 168 Q78 172 72 150" stroke={CT_COLORS.suit} strokeWidth="14" strokeLinecap="round" fill="none" />
        <circle cx="70" cy="144" r="10" fill={CT_COLORS.skin} />
        <g style={{ transformBox: "fill-box", transformOrigin: "center" } as React.CSSProperties}>
          <path d="M70 96c-16-11-44-6-44 11 0 27 25 40 44 49 19-9 44-22 44-49 0-17-28-22-44-11z" fill="rgba(10,132,255,0.14)" stroke={CT_COLORS.tie} strokeWidth="4" />
          <path d="M52 148l12 12 24-30" stroke={CT_COLORS.br} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </g>
      <g className="ct-nod" style={{ transformBox: "fill-box", transformOrigin: "bottom center", animationDelay: "0.4s" } as React.CSSProperties}>
        <path d="M106 140 Q122 146 138 140 L136 150 Q122 156 108 150 Z" fill={CT_COLORS.skinShade} />
        <circle cx="122" cy="116" r="24" fill={CT_COLORS.skin} />
        <path d="M98 116 A24 24 0 0 1 146 114 Q136 96 122 100 Q108 98 98 116 Z" fill={CT_COLORS.hair} />
        <circle cx="114" cy="116" r="2.6" fill={CT_COLORS.suit} />
        <circle cx="132" cy="116" r="2.6" fill={CT_COLORS.suit} />
        <path d="M114 128 Q122 133 130 128" stroke={CT_COLORS.suit} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

const COMMERCIAL_MODELS = [
  {
    tag: "01",
    name: "Direct Hire & Permanent Placement",
    fee: "15% to 20% of first year annual compensation",
    highlight: "Market entry rate: 12% for your first 3 hires",
    guarantee: "90 Day Placement Replacement Guarantee",
    metric: "12%",
    metricLabel: "entry rate",
  },
  {
    tag: "02",
    name: "IT & Healthcare Staff Augmentation",
    fee: "Transparent hourly / monthly billing per specialist",
    highlight: "10% rate reduction on 6 month squad commitments",
    guarantee: "2 Week Risk Free Trial: $0 billed if benchmarks fail",
    metric: "2 wk",
    metricLabel: "Risk Free Trial",
  },
  {
    tag: "03",
    name: "Employer of Record (EOR) & Payroll",
    fee: "Complete payroll, tax withholding & compliance",
    highlight: "One partner across 15+ operating countries",
    guarantee: "Full compliance ownership with zero entity setup",
    metric: "15+",
    metricLabel: "countries",
  },
];

function CommercialTerms() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const m = COMMERCIAL_MODELS[active];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % COMMERCIAL_MODELS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="pricing" className="relative w-full bg-canvas px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="ct-banner relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_100px_-30px_rgba(10,20,40,0.6)] sm:rounded-[2.25rem]">
          <div className="ct-grad absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1.4px)] [background-size:26px_26px]" />
          <div className="pointer-events-none absolute -left-24 top-1/2 h-[340px] w-[340px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.3),transparent_62%)] blur-2xl" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.35),transparent_60%)] blur-2xl" />
          <div className="pointer-events-none absolute left-5 top-5 h-5 w-5 rounded-tl-lg border-l-2 border-t-2 border-white/30" />
          <div className="pointer-events-none absolute right-5 top-5 h-5 w-5 rounded-tr-lg border-r-2 border-t-2 border-white/30" />
          <div className="pointer-events-none absolute bottom-5 left-5 h-5 w-5 rounded-bl-lg border-b-2 border-l-2 border-white/30" />
          <div className="pointer-events-none absolute bottom-5 right-5 h-5 w-5 rounded-br-lg border-b-2 border-r-2 border-white/30" />

          <div className="relative grid items-center gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1.05fr_1.3fr] lg:gap-10 lg:px-12 lg:py-10">
            <div className="text-left">
              <div className="ct-in inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 font-mono text-[10px] font-500 uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric-bright" />
                Commercial engagement terms
              </div>
              <h2 className="ct-in mt-4 font-display text-2xl font-800 leading-[1.08] tracking-tight text-white sm:text-3xl lg:text-[36px]" style={{ animationDelay: "0.06s" }}>
                Terms engineered to <br />
                <span className="bg-gradient-to-r from-electric-bright to-white bg-clip-text text-transparent">Derisk every hire.</span>
              </h2>
              <p className="ct-in mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base" style={{ animationDelay: "0.12s" }}>
                Three flexible commercial models with one guarantee backed promise. Pick the engagement structure that fits your roadmap.
              </p>

              <div className="ct-in mt-7 flex flex-wrap gap-3" style={{ animationDelay: "0.18s" }}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-display text-sm font-600 text-ink shadow-[0_12px_30px_-8px_rgba(255,255,255,0.5)] transition-all duration-200 hover:-translate-y-0.5"
                >
                  Request commercial proposal
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3 font-display text-sm font-600 text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50"
                >
                  Talk to sales
                </Link>
              </div>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="pointer-events-none absolute -right-4 -bottom-8 hidden h-[260px] w-[260px] opacity-15 ct-float sm:block">
                <SpecialistFigure />
              </div>

              <div className="relative z-20 -mb-[1px] flex items-end gap-2 pl-2">
                {COMMERCIAL_MODELS.map((model, i) => {
                  const isActive = active === i;
                  return (
                    <button
                      key={model.tag}
                      onClick={() => setActive(i)}
                      className={`group relative transition-all duration-200 ${
                        isActive
                          ? "rounded-t-xl rounded-b-none border-t border-l border-r border-white/25 bg-white/[0.1] px-4 pb-2 pt-1.5 text-white shadow-[0_-6px_16px_-4px_rgba(56,189,248,0.35)] backdrop-blur-md"
                          : "mb-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/70 hover:border-white/35 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute inset-x-3 -top-[1.5px] h-[2px] rounded-full bg-gradient-to-r from-electric-bright via-white to-electric-bright shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
                      )}

                      <div className="flex items-center gap-1.5 font-display text-[11.5px] font-semibold">
                        <span
                          className={`font-mono text-[10px] ${
                            isActive ? "font-bold text-electric-bright" : "text-white/50"
                          }`}
                        >
                          {model.tag}
                        </span>
                        <span>{model.name.split(" (")[0].split(" & ")[0]}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div
                key={active}
                className="ct-card relative z-10 overflow-hidden rounded-2xl border border-white/20 bg-white/[0.1] p-4 text-left shadow-[0_20px_50px_-20px_rgba(10,20,40,0.6)] backdrop-blur-md sm:p-5"
              >
                <div className="ct-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-electric-bright">
                      Engagement {m.tag}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-700 leading-snug text-white sm:text-xl">
                      {m.name}
                    </h3>
                  </div>
                  <div className="shrink-0 rounded-xl border border-white/20 bg-electric/25 px-3 py-2 text-center shadow-[0_4px_16px_rgba(10,132,255,0.3)] backdrop-blur-sm">
                    <div className="font-display text-2xl font-800 leading-none text-white">{m.metric}</div>
                    <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-white/70">
                      {m.metricLabel}
                    </div>
                  </div>
                </div>

                <div className="relative mt-4 grid gap-2.5 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">Fee structure</div>
                    <div className="mt-1 text-[13px] font-500 leading-snug text-white/90">{m.fee}</div>
                  </div>
                  <div className="rounded-xl border border-electric-bright/30 bg-electric/15 p-3">
                    <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-electric-bright">
                      <span className="ct-badge h-1.5 w-1.5 rounded-full bg-signal" /> Risk free guarantee
                    </div>
                    <div className="mt-1 text-[13px] font-500 leading-snug text-white">{m.guarantee}</div>
                  </div>
                </div>

                <div className="relative mt-3 flex items-center gap-2 text-[12px] text-white/75">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 shrink-0 text-electric-bright"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2l2.4 5 5.6.8-4 3.9 1 5.5L12 20l-5 2.6 1-5.5-4-3.9 5.6-.8z" />
                  </svg>
                  {m.highlight}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 9: AI HRMS PORTAL
   ========================================================================== */

function useInViewHrms<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

function CountUpHrms({
  to,
  dur = 900,
  suffix = "",
  decimals = 0,
  play,
}: {
  to: number;
  dur?: number;
  suffix?: string;
  decimals?: number;
  play: boolean;
}) {
  const [v, setV] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    if (!play) {
      setV(0);
      return;
    }
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [play, to, dur]);
  return (
    <>
      {v.toFixed(decimals)}
      {suffix}
    </>
  );
}

function Gauge({
  value,
  label,
  sub,
  play,
  delay = 0,
}: {
  value: number;
  label: string;
  sub: string;
  play: boolean;
  delay?: number;
}) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const off = circ * (1 - (play ? value / 100 : 0));
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[92px] w-[92px]">
        <svg viewBox="0 0 84 84" className="h-full w-full -rotate-90">
          <defs>
            <linearGradient id="v1-hrms-g" x1="0" y1="0" x2="84" y2="84" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0a84ff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          <circle cx="42" cy="42" r={r} fill="none" stroke="#d6e3f7" strokeWidth="7" />
          <circle
            cx="42"
            cy="42"
            r={r}
            fill="none"
            stroke="url(#v1-hrms-g)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={off}
            style={{ transition: `stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-xl font-800 text-ink">
            <CountUpHrms to={value} play={play} dur={1100} />
          </span>
          <span className="font-mono text-[8px] text-mist">/100</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="font-display text-[13px] font-700 text-ink">{label}</div>
        <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-mist">{sub}</div>
      </div>
    </div>
  );
}

const HRMS_TABS = [
  { id: 0, k: "01", label: "Natural Language Query" },
  { id: 1, k: "02", label: "System Design Audit Logs" },
  { id: 2, k: "03", label: "Behavioral Video Scorecards" },
];

const CANDIDATES = [
  { init: "PN", name: "Priya Nair", role: "Senior Backend Engineer · 7y Node.js", score: 94, visa: "H-1B", visaTone: "el", tz: "GMT+5:30 · 4h overlap", model: "C2C ready" },
  { init: "MR", name: "Marco Ruiz", role: "Staff Node.js Engineer · 8y", score: 91, visa: "OPT / STEM", visaTone: "br", tz: "GMT-3 · 6h overlap", model: "W2" },
  { init: "LF", name: "Lena Fischer", role: "Backend Engineer · 6y Node.js", score: 88, visa: "EU Blue Card", visaTone: "gr", tz: "CET · 7h overlap", model: "EOR" },
];

const TERMINAL = [
  { t: "$ pepoltek audit --candidate PN-4471 --suite full", cls: "text-white/50" },
  { t: "› static analysis ........... clean", cls: "text-white/80" },
  { t: "› redis memory safety ....... [ PASS ]", cls: "text-signal" },
  { t: "› kafka backpressure ........ [ PASS ]", cls: "text-signal" },
  { t: "› system design review ...... 96 / 100", cls: "text-electric-bright" },
  { t: "› integration benchmarks .... 14/14 clean", cls: "text-signal" },
  { t: "[ PASSED ] audit sealed · hash 0xA1F…9C", cls: "text-white" },
];

const PILL = {
  el: "border-electric/30 bg-electric/10 text-electric",
  br: "border-electric-bright/40 bg-electric-bright/10 text-[#0b74c9]",
  gr: "border-signal/30 bg-signal/10 text-signal",
} as const;

function AiHrmsPortal() {
  const [tab, setTab] = useState(0);
  const [ref, inView] = useInViewHrms<HTMLDivElement>(0.25);
  const [typed, setTyped] = useState(0);
  const [visibleRows, setVisibleRows] = useState(0);
  const [termLines, setTermLines] = useState(0);

  const QUERY = "Filter software engineers with 5+ years in Node.js and C2C readiness";

  useEffect(() => {
    if (tab !== 0 || !inView) return;
    setTyped(0);
    setVisibleRows(0);
    let i = 0;
    const type = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= QUERY.length) {
        clearInterval(type);
        [0, 1, 2].forEach((n) => setTimeout(() => setVisibleRows(n + 1), 300 + n * 260));
      }
    }, 26);
    return () => clearInterval(type);
  }, [tab, inView]);

  useEffect(() => {
    if (tab !== 1 || !inView) return;
    setTermLines(0);
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setTermLines(n);
      if (n >= TERMINAL.length) clearInterval(id);
    }, 340);
    return () => clearInterval(id);
  }, [tab, inView]);

  return (
    <section ref={ref} id="ai-hrms" className="relative w-full bg-canvas px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(10,132,255,0.07)_1px,transparent_1.4px)] [background-size:28px_28px]" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[380px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14),transparent_64%)] blur-2xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/[0.07] px-4 py-1 font-mono text-[10px] font-500 uppercase tracking-[0.16em] text-electric backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
            In house AI HRMS
          </div>
          <h2 className="mt-4 font-display text-3xl font-800 leading-[1.05] tracking-tight text-ink sm:text-4xl lg:text-[44px]">
            Ask for the shortlist in <span className="text-electric">plain language.</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            The client portal accepts natural language queries and returns ranked candidates with match score, work authorization, engagement model, and the engineering audit that produced the ranking.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              {
                title: "Natural language shortlisting",
                body: "Query in plain English to get ranked matches with match score, work authorization, timezone overlap, and engagement model.",
                icon: <path d="M12 3v2M5 8l1.4 1.4M19 8l-1.4 1.4M12 21a5 5 0 0 0 5-5c0-2.5-2-3.5-2-6a3 3 0 0 0-6 0c0 2.5-2 3.5-2 6a5 5 0 0 0 5 5Z" />,
              },
              {
                title: "Engineering grade audit trail",
                body: "Every ranking ships with code quality, test coverage, and Redis/Kafka memory safety validation you can inspect.",
                icon: (
                  <>
                    <path d="m7 8-4 4 4 4" />
                    <path d="m17 8 4 4-4 4" />
                    <path d="M14 4 10 20" />
                  </>
                ),
              },
              {
                title: "Behavioral video scorecards",
                body: "HEXACO, OCEAN, and BEI signals paired with a 90 second technical explainer clip for every finalist.",
                icon: (
                  <>
                    <rect x="3" y="5" width="14" height="14" rx="2" />
                    <path d="m17 9 4-2v10l-4-2" />
                  </>
                ),
              },
            ].map((f) => (
              <li key={f.title} className="group flex gap-3.5">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#bcd6fa] bg-white text-electric shadow-[0_10px_24px_-14px_rgba(10,132,255,0.6)] transition-colors duration-200 group-hover:border-electric/40">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {f.icon}
                  </svg>
                </span>
                <div>
                  <div className="font-display text-[15px] font-700 text-ink">{f.title}</div>
                  <p className="mt-0.5 max-w-md text-[13.5px] leading-relaxed text-ink-soft">{f.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="#deploy"
              className="group inline-flex items-center gap-2 rounded-xl bg-electric px-7 py-3.5 font-display text-sm font-600 text-white shadow-[0_12px_30px_-8px_rgba(10,132,255,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric-bright"
            >
              Open the AI HRMS demo
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-[#bcd6fa] bg-white px-6 py-3.5 font-display text-sm font-600 text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:text-electric"
            >
              Book a guided tour
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="ai-edge pointer-events-none absolute -inset-px rounded-[2rem]" />
          <div className="relative overflow-hidden rounded-[2rem] border border-[#bcd6fa] bg-white shadow-[0_50px_120px_-45px_rgba(10,132,255,0.5)]">
            <div className="flex items-center gap-3 border-b border-[#bcd6fa]/70 bg-gradient-to-b from-[#f4f8ff] to-white px-5 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="mx-auto flex items-center gap-2 rounded-lg border border-[#bcd6fa] bg-white px-4 py-1.5 font-mono text-[11px] text-mist">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                portal.pepoltek.ai <span className="text-ink-soft">/ shortlist</span>
              </div>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-electric sm:inline">Live</span>
            </div>

            <div className="flex flex-wrap gap-1.5 border-b border-[#bcd6fa]/70 bg-[#f7faff] px-4 py-3 sm:px-6">
              {HRMS_TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`group relative inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 font-display text-[12.5px] font-600 transition-all duration-300 sm:text-[13px] ${
                    tab === t.id
                      ? "border-electric bg-electric text-white shadow-[0_10px_24px_-8px_rgba(10,132,255,0.7)]"
                      : "border-[#bcd6fa] bg-white text-ink-soft hover:border-electric/40 hover:text-ink"
                  }`}
                >
                  <span className={`font-mono text-[10px] ${tab === t.id ? "text-white/70" : "text-electric"}`}>{t.k}</span>
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className="sm:hidden">{t.label.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            <div className="relative min-h-[440px] bg-gradient-to-br from-white via-[#f9fcff] to-[#eef4fd] p-5 sm:p-8">
              {tab === 0 && (
                <div key="t0" className="ai-fade">
                  <div className="flex items-center gap-3 rounded-2xl border border-[#bcd6fa] bg-white px-4 py-3.5 shadow-[0_16px_40px_-24px_rgba(10,132,255,0.5)]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-electric" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v2M5 8l1.4 1.4M19 8l-1.4 1.4M12 21a5 5 0 0 0 5-5c0-2.5-2-3.5-2-6a3 3 0 0 0-6 0c0 2.5-2 3.5-2 6a5 5 0 0 0 5 5Z" />
                    </svg>
                    <div className="min-w-0 flex-1 font-mono text-[12px] leading-snug text-ink sm:text-[13.5px]">
                      {QUERY.slice(0, typed)}
                      <span className="ai-caret ml-0.5 inline-block h-[14px] w-[2px] translate-y-[2px] bg-electric" />
                    </div>
                    <button className="hidden shrink-0 items-center gap-1.5 rounded-lg bg-electric px-3.5 py-2 font-display text-[12px] font-600 text-white transition-colors hover:bg-electric-bright sm:inline-flex">
                      Run →
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-mist">
                    <span className="rounded-full border border-[#bcd6fa] bg-white px-2.5 py-1">Node.js</span>
                    <span className="rounded-full border border-[#bcd6fa] bg-white px-2.5 py-1">5+ yrs</span>
                    <span className="rounded-full border border-[#bcd6fa] bg-white px-2.5 py-1">C2C ready</span>
                    <span className="ml-auto normal-case text-electric">3 ranked matches · audited</span>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {CANDIDATES.map((c, i) => (
                      <div
                        key={c.init}
                        className={`group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-[#bcd6fa] bg-white p-3.5 transition-all duration-500 hover:border-electric/40 hover:shadow-[0_18px_44px_-26px_rgba(10,132,255,0.55)] sm:gap-4 ${
                          visibleRows > i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                        }`}
                        style={{ transitionDelay: `${i * 40}ms` }}
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-electric-bright font-display text-sm font-700 text-white shadow-[0_8px_18px_-6px_rgba(10,132,255,0.7)]">
                          {c.init}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-display text-[14px] font-700 text-ink">{c.name}</div>
                          <div className="truncate font-mono text-[11px] text-ink-soft">{c.role}</div>
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            <span className={`rounded-md border px-2 py-0.5 font-mono text-[9px] font-600 ${PILL[c.visaTone as keyof typeof PILL]}`}>{c.visa}</span>
                            <span className="rounded-md border border-[#bcd6fa] bg-canvas px-2 py-0.5 font-mono text-[9px] text-ink-soft">{c.tz}</span>
                            <span className="rounded-md border border-[#bcd6fa] bg-canvas px-2 py-0.5 font-mono text-[9px] text-ink-soft">{c.model}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className="font-display text-lg font-800 leading-none text-electric">
                            <CountUpHrms to={c.score} play={visibleRows > i} suffix="%" dur={800} />
                          </div>
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#e3ecfa]">
                            <div className="h-full rounded-full bg-gradient-to-r from-electric to-electric-bright transition-[width] duration-[900ms] ease-out" style={{ width: visibleRows > i ? `${c.score}%` : "0%" }} />
                          </div>
                          <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-mist">match score</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 1 && (
                <div key="t1" className="ai-fade grid gap-5 lg:grid-cols-[1fr_1.15fr]">
                  <div className="grid grid-cols-2 gap-3 self-start">
                    {[
                      { v: 96, suf: "/100", label: "Code quality score", big: true },
                      { v: 94, suf: "%", label: "Test coverage", big: true },
                    ].map((s) => (
                      <div key={s.label} className="rounded-2xl border border-[#bcd6fa] bg-white p-4 shadow-[0_16px_40px_-30px_rgba(10,132,255,0.5)]">
                        <div className="font-display text-3xl font-800 text-ink"><CountUpHrms to={s.v} play={inView && tab === 1} suffix={s.suf} /></div>
                        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-mist">{s.label}</div>
                      </div>
                    ))}
                    {[
                      { label: "Redis memory safety", state: "Validated" },
                      { label: "Kafka backpressure", state: "Validated" },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center gap-2.5 rounded-2xl border border-[#bcd6fa] bg-white p-4">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal/10 text-signal">
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                        </span>
                        <div>
                          <div className="font-display text-[13px] font-700 text-ink">{s.label}</div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-signal">{s.state}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-[#0b1d3a] bg-[#0a1428] shadow-[0_30px_70px_-30px_rgba(10,20,40,0.8)]">
                    <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                      <span className="ml-2 font-mono text-[10px] text-white/40">audit · integration benchmarks</span>
                    </div>
                    <div className="space-y-1.5 p-4 font-mono text-[11.5px] leading-relaxed sm:text-[12.5px]">
                      {TERMINAL.map((l, i) => (
                        <div key={i} className={`transition-all duration-300 ${termLines > i ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"} ${l.cls}`}>
                          {l.t}
                        </div>
                      ))}
                      {termLines >= TERMINAL.length && (
                        <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-signal/40 bg-signal/10 px-3 py-1.5 font-mono text-[11px] font-600 text-signal">
                          <span className="h-1.5 w-1.5 rounded-full bg-signal" /> 14 / 14 benchmarks clean
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {tab === 2 && (
                <div key="t2" className="ai-fade grid gap-5 lg:grid-cols-[1.05fr_1fr]">
                  <div className="group relative overflow-hidden rounded-2xl border border-[#bcd6fa] bg-[#0a1428] shadow-[0_30px_70px_-32px_rgba(10,20,40,0.8)]">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(10,132,255,0.35),transparent_60%)]" />
                    <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1.4px)] [background-size:22px_22px]" />
                    <div className="relative flex min-h-[240px] flex-col justify-between p-5 sm:min-h-[300px]">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff5f57]" /> Technical explainer
                        </span>
                        <span className="font-mono text-[11px] text-white/70">01:30</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-3 py-4">
                        <button className="group/play relative flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-[0_16px_40px_-10px_rgba(10,132,255,0.8)] transition-transform duration-200 hover:scale-105">
                          <span className="ai-ring absolute inset-0 rounded-full border-2 border-white/50" />
                          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 text-electric" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        </button>
                        <span className="font-display text-sm font-600 text-white">90 second whiteboard walkthrough</span>
                      </div>
                      <div className="flex items-end justify-center gap-[3px]">
                        {Array.from({ length: 40 }).map((_, i) => (
                          <span key={i} className="ai-wave w-[3px] rounded-full bg-gradient-to-t from-electric to-electric-bright" style={{ height: `${8 + ((i * 7) % 26)}px`, animationDelay: `${(i % 10) * 0.09}s` }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center rounded-2xl border border-[#bcd6fa] bg-white p-5 shadow-[0_16px_40px_-30px_rgba(10,132,255,0.5)]">
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">Behavioral scorecard · candidate PN-4471</div>
                    <div className="mt-5 grid grid-cols-3 gap-3">
                      <Gauge value={92} label="HEXACO" sub="Integrity" play={inView && tab === 2} delay={0} />
                      <Gauge value={88} label="OCEAN" sub="Adaptability" play={inView && tab === 2} delay={140} />
                      <Gauge value={95} label="BEI" sub="Scenario" play={inView && tab === 2} delay={280} />
                    </div>
                    <div className="mt-6 space-y-2 border-t border-[#bcd6fa] pt-4">
                      {[
                        ["Structured competency interview", "Passed"],
                        ["Communication & clarity", "High"],
                        ["Culture-add alignment", "Strong"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between text-[12.5px]">
                          <span className="text-ink-soft">{k}</span>
                          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-600 text-signal">
                            <span className="h-1.5 w-1.5 rounded-full bg-signal" />{v}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 10: TALENT ECOSYSTEM
   ========================================================================== */

const TE_COLORS = {
  ink: "#0a1428",
  soft: "#3d4c68",
  el: "#0a84ff",
  br: "#38bdf8",
  vio: "#8b5cf6",
  vio2: "#a78bfa",
  teal: "#0d9488",
  teal2: "#2dd4bf",
  amber: "#e97e13",
  amber2: "#fbbf24",
  line: "#bcd6fa",
};

const STAGES = [
  {
    n: "01",
    badge: "01 · Upload Your CV",
    route: "/career/upload_cv/",
    title: "Build your profile",
    description: "Upload your CV to auto build your profile and make it opportunity ready.",
    accent: TE_COLORS.el,
    accent2: TE_COLORS.br,
    image: "/assets/academy/talent-cv-intake.png",
  },
  {
    n: "02",
    badge: "02 · Reverse Job Search",
    route: "/talents/reverse-search/",
    title: "Let opportunities find you",
    description: "Scan live client pipelines and get discovered by top companies before you apply.",
    accent: TE_COLORS.vio,
    accent2: TE_COLORS.vio2,
    image: "/assets/academy/talent-reverse-search.png",
  },
  {
    n: "03",
    badge: "03 · Talent Academy",
    route: "/ecosystem/academy/",
    title: "Become opportunity ready",
    description: "Pinpoint skill gaps with your readiness index and upskill to unlock tier 1 roles.",
    accent: TE_COLORS.teal,
    accent2: TE_COLORS.teal2,
    image: "/assets/academy/talent-academy.png",
  },
  {
    n: "04",
    badge: "04 · Refer & Earn",
    route: "/ecosystem/referrals/",
    title: "Refer talent. Earn together.",
    description: "Refer top talent and track your reward payouts from submission to placement.",
    accent: TE_COLORS.amber,
    accent2: TE_COLORS.amber2,
    image: "/assets/academy/talent-refer-earn.png",
  },
];

function FeatureItem({
  stage,
  index,
  isVisible,
}: {
  stage: typeof STAGES[number];
  index: number;
  isVisible: boolean;
}) {
  const getDirectionClasses = () => {
    if (!isVisible) {
      if (index === 0) return "opacity-0 -translate-x-10 -translate-y-8 scale-95";
      if (index === 1) return "opacity-0 10 -translate-y-8 scale-95";
      if (index === 2) return "opacity-0 -translate-x-10 translate-y-8 scale-95";
      return "opacity-0 translate-x-10 translate-y-8 scale-95";
    }
    return "opacity-100 translate-x-0 translate-y-0 scale-100";
  };

  return (
    <div
      className={`group relative flex flex-col items-center justify-center p-2 sm:p-3 transition-all duration-700 ease-out hover:-translate-y-1.5 ${getDirectionClasses()}`}
      style={
        {
          "--ac": stage.accent,
          "--ac2": stage.accent2,
          transitionDelay: `${200 + index * 120}ms`,
        } as CSSProperties
      }
    >
      <div className="relative flex h-36 w-full max-w-[280px] items-center justify-center sm:h-40">
        <div
          className="pointer-events-none absolute inset-0 -top-2 rounded-full blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-90"
          style={{ background: `radial-gradient(ellipse at center, ${stage.accent}25, transparent 65%)` }}
        />

        <div className="relative flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <Image
            src={stage.image}
            alt={stage.title}
            width={280}
            height={160}
            className="h-full w-auto max-w-full object-contain drop-shadow-[0_10px_24px_rgba(10,132,255,0.12)]"
            priority
          />
        </div>
      </div>

      <div className="mt-3 flex flex-col items-center text-center">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 font-mono text-[10px] font-semibold tracking-wider transition-transform duration-200 group-hover:scale-105"
          style={{ background: `${stage.accent}14`, color: stage.accent, border: `1px solid ${stage.accent}28` }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: stage.accent }} />
          {stage.badge}
        </span>

        <Link
          href={stage.route}
          className="mt-2 inline-flex items-center gap-1.5 font-display text-[16px] sm:text-[18px] font-bold text-[#0a1428] transition-colors duration-200 group-hover:text-[var(--ac)]"
        >
          {stage.title}
          <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>

        <p className="mt-1.5 max-w-[32ch] sm:max-w-[36ch] text-[12px] sm:text-[12.5px] leading-relaxed text-[#3d4c68]">
          {stage.description}
        </p>
      </div>
    </div>
  );
}

function TalentEcosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="talent-ecosystem"
      className="relative w-full overflow-hidden bg-canvas px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(188,214,250,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(188,214,250,0.18)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-[1180px]">
        <div
          className={`mx-auto flex max-w-2xl flex-col items-center text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/[0.08] px-3.5 py-1 font-mono text-[10.5px] font-medium tracking-[0.14em] uppercase text-electric shadow-[0_2px_10px_-2px_rgba(10,132,255,0.2)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
            Talent Ecosystem
          </div>
          <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-[#0a1428] sm:text-3xl lg:text-[34px]">
            For Candidates,{" "}
            <span className="bg-gradient-to-r from-electric to-electric-bright bg-clip-text text-transparent">
              Not Just Clients
            </span>
          </h2>
          <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-[#3d4c68] sm:text-[15px]">
            A connected 4 pillar career ecosystem. Upload, scan live client pipelines, upskill, and earn referrals.
          </p>
        </div>

        <div className="relative mx-auto mt-8 hidden max-w-[1020px] lg:block">
          <svg
            viewBox="0 0 1000 520"
            className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="v1-stream-tl" x1="500" y1="260" x2="220" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#0a84ff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0a84ff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="v1-stream-bl" x1="500" y1="260" x2="220" y2="435" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#a78bfa" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#8b5cf6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="v1-stream-tr" x1="500" y1="260" x2="780" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#2dd4bf" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#0d9488" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="v1-stream-br" x1="500" y1="260" x2="780" y2="435" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#e97e13" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#fbbf24" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#e97e13" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#e97e13" stopOpacity="0" />
              </linearGradient>
            </defs>

            <circle cx="500" cy="260" r="85" stroke="#bcd6fa" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.6" />
            <circle cx="500" cy="260" r="160" stroke="#bcd6fa" strokeWidth="0.6" strokeDasharray="2 8" opacity="0.4" />
            <line x1="500" y1="170" x2="500" y2="350" stroke="#bcd6fa" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.3" />
            <line x1="410" y1="260" x2="590" y2="260" stroke="#bcd6fa" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.3" />

            <path
              d="M 500 260 C 440 260, 390 180, 335 130 C 290 88, 250 85, 220 85"
              stroke="#0a84ff"
              strokeWidth="6"
              strokeOpacity="0.08"
            />
            <path
              d="M 500 260 C 440 260, 390 180, 335 130 C 290 88, 250 85, 220 85"
              stroke="url(#v1-stream-tl)"
              strokeWidth="2.2"
              strokeDasharray="6 6"
              className="te-flow-fast"
            />
            <path
              d="M 500 254 C 442 254, 394 176, 340 126 C 294 84, 252 81, 220 81"
              stroke="#38bdf8"
              strokeWidth="1"
              strokeDasharray="2 8"
              opacity="0.5"
            />
            <g transform="translate(335, 130)">
              <polygon points="0,-4 4,0 0,4 -4,0" fill="#0a84ff" />
              <circle cx="0" cy="0" r="8" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" className="te-spin-slow" />
            </g>

            <path
              d="M 500 260 C 440 260, 390 340, 335 390 C 290 432, 250 435, 220 435"
              stroke="#8b5cf6"
              strokeWidth="6"
              strokeOpacity="0.08"
            />
            <path
              d="M 500 260 C 440 260, 390 340, 335 390 C 290 432, 250 435, 220 435"
              stroke="url(#v1-stream-bl)"
              strokeWidth="2.2"
              strokeDasharray="6 6"
              className="te-flow-fast"
            />
            <path
              d="M 500 266 C 442 266, 394 344, 340 394 C 294 436, 252 439, 220 439"
              stroke="#a78bfa"
              strokeWidth="1"
              strokeDasharray="2 8"
              opacity="0.5"
            />
            <g transform="translate(335, 390)">
              <polygon points="0,-4 4,0 0,4 -4,0" fill="#8b5cf6" />
              <circle cx="0" cy="0" r="8" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2 2" className="te-spin-slow" />
            </g>

            <path
              d="M 500 260 C 560 260, 610 180, 665 130 C 710 88, 750 85, 780 85"
              stroke="#0d9488"
              strokeWidth="6"
              strokeOpacity="0.08"
            />
            <path
              d="M 500 260 C 560 260, 610 180, 665 130 C 710 88, 750 85, 780 85"
              stroke="url(#v1-stream-tr)"
              strokeWidth="2.2"
              strokeDasharray="6 6"
              className="te-flow-fast"
            />
            <path
              d="M 500 254 C 558 254, 606 176, 660 126 C 706 84, 748 81, 780 81"
              stroke="#2dd4bf"
              strokeWidth="1"
              strokeDasharray="2 8"
              opacity="0.5"
            />
            <g transform="translate(665, 130)">
              <polygon points="0,-4 4,0 0,4 -4,0" fill="#0d9488" />
              <circle cx="0" cy="0" r="8" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="2 2" className="te-spin-slow" />
            </g>

            <path
              d="M 500 260 C 560 260, 610 340, 665 390 C 710 432, 750 435, 780 435"
              stroke="#e97e13"
              strokeWidth="6"
              strokeOpacity="0.08"
            />
            <path
              d="M 500 260 C 560 260, 610 340, 665 390 C 710 432, 750 435, 780 435"
              stroke="url(#v1-stream-br)"
              strokeWidth="2.2"
              strokeDasharray="6 6"
              className="te-flow-fast"
            />
            <path
              d="M 500 266 C 558 266, 606 344, 660 394 C 706 436, 748 439, 780 439"
              stroke="#fbbf24"
              strokeWidth="1"
              strokeDasharray="2 8"
              opacity="0.5"
            />
            <g transform="translate(665, 390)">
              <polygon points="0,-4 4,0 0,4 -4,0" fill="#e97e13" />
              <circle cx="0" cy="0" r="8" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" className="te-spin-slow" />
            </g>
          </svg>

          <div
            className={`pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center transition-all duration-700 ease-out ${
              isVisible ? "scale-100 opacity-100 rotate-0" : "scale-50 opacity-0 -rotate-45"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="group relative flex h-[78px] w-[78px] items-center justify-center rounded-full border border-electric/30 bg-white/95 p-4 shadow-[0_14px_40px_-6px_rgba(10,132,255,0.38)] backdrop-blur-md transition-transform duration-300 hover:scale-105">
              <div className="pointer-events-none absolute inset-[-14px] rounded-full border border-dashed border-electric/35 te-spin-reverse" />
              <div className="pointer-events-none absolute inset-[-6px] rounded-full border border-electric/25 te-spin-slow">
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#0a84ff] shadow-[0_0_6px_#0a84ff]" />
                <span className="absolute top-1/2 -right-1 -translate-y-1/2 h-2 w-2 rounded-full bg-[#0d9488] shadow-[0_0_6px_#0d9488]" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#e97e13] shadow-[0_0_6px_#e97e13]" />
                <span className="absolute top-1/2 -left-1 -translate-y-1/2 h-2 w-2 rounded-full bg-[#8b5cf6] shadow-[0_0_6px_#8b5cf6]" />
              </div>
              <div className="pointer-events-none absolute inset-[-4px] rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.22),transparent_70%)] blur-sm" />
              <Image
                src="/assets/pepoltek/pepoltek_icon.png"
                alt="Pepoltek Core"
                width={40}
                height={40}
                className="relative z-10 h-auto w-auto object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-28 gap-y-12">
            <FeatureItem stage={STAGES[0]} index={0} isVisible={isVisible} />
            <FeatureItem stage={STAGES[2]} index={1} isVisible={isVisible} />
            <FeatureItem stage={STAGES[1]} index={2} isVisible={isVisible} />
            <FeatureItem stage={STAGES[3]} index={3} isVisible={isVisible} />
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-[540px] pl-10 sm:pl-16 pr-2 lg:hidden">
          <div className="pointer-events-none absolute left-3 sm:left-5 top-0 bottom-0 w-8">
            <svg viewBox="0 0 32 1000" className="h-full w-full overflow-visible" preserveAspectRatio="none" fill="none">
              <defs>
                <linearGradient id="v1-m-rail-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0a84ff" />
                  <stop offset="33%" stopColor="#8b5cf6" />
                  <stop offset="66%" stopColor="#0d9488" />
                  <stop offset="100%" stopColor="#e97e13" />
                </linearGradient>
              </defs>
              <line x1="16" y1="20" x2="16" y2="980" stroke="url(#v1-m-rail-grad)" strokeWidth="6" opacity="0.12" />
              <line x1="16" y1="20" x2="16" y2="980" stroke="url(#v1-m-rail-grad)" strokeWidth="2.2" strokeDasharray="6 6" className="te-flow-fast" />
              <line x1="12" y1="20" x2="12" y2="980" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 8" opacity="0.4" />
            </svg>
          </div>

          <div className="absolute -top-7 left-3 sm:left-5 -translate-x-1/2 z-20">
            <div className="relative flex h-11 w-11 rotate-45 items-center justify-center rounded-lg border border-electric/40 bg-white/95 shadow-[0_6px_22px_rgba(10,132,255,0.35)] backdrop-blur-md">
              <div className="pointer-events-none absolute inset-[-5px] rounded-lg border border-dashed border-electric/40 te-spin-slow" />
              <div className="pointer-events-none absolute inset-[-2px] rounded-lg bg-[radial-gradient(circle,rgba(10,132,255,0.2),transparent_70%)] blur-sm" />
              <Image
                src="/assets/pepoltek/pepoltek_icon.png"
                alt="Pepoltek Icon"
                width={22}
                height={22}
                className="-rotate-45 object-contain"
              />
            </div>
          </div>

          <div className="absolute -bottom-6 left-3 sm:left-5 -translate-x-1/2 z-20">
            <div className="relative flex h-8 w-8 rotate-45 items-center justify-center rounded-md border border-[#e97e13]/40 bg-white/95 shadow-[0_4px_16px_rgba(233,126,19,0.3)]">
              <div className="h-2.5 w-2.5 rounded-full bg-[#e97e13] -rotate-45 shadow-[0_0_6px_#e97e13]" />
            </div>
          </div>

          <div className="flex flex-col gap-10 sm:gap-14 pt-8 pb-8">
            {STAGES.map((stage, idx) => (
              <div key={stage.n} className="relative">
                <div className="pointer-events-none absolute -left-7 sm:-left-11 top-[38%] -translate-y-1/2 w-7 sm:w-11">
                  <svg viewBox="0 0 44 20" className="h-5 w-full overflow-visible" fill="none">
                    <polygon points="0,10 4,6 8,10 4,14" fill={stage.accent} />
                    <circle cx="4" cy="10" r="7" stroke={stage.accent2} strokeWidth="1" strokeDasharray="2 2" className="te-spin-slow" />
                    <line x1="8" y1="10" x2="40" y2="10" stroke={stage.accent} strokeWidth="2" strokeDasharray="4 4" className="te-flow-fast" />
                    <circle cx="40" cy="10" r="3.5" fill={stage.accent} />
                    <circle cx="40" cy="10" r="8" stroke={stage.accent2} strokeWidth="1.2" className="te-ping-small" style={{ transformOrigin: "40px 10px" }} />
                  </svg>
                </div>

                <FeatureItem stage={stage} index={idx} isVisible={isVisible} />
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mt-10 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <Link
            href="/career/upload_cv/"
            className="group inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3 font-display text-xs font-semibold text-white shadow-[0_8px_20px_-4px_rgba(10,132,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric-bright"
          >
            Upload CV &amp; Get Matched
            <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link
            href="/talents/reverse-search/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#bcd6fa] bg-white/80 px-5 py-3 font-display text-xs font-semibold text-[#0a1428] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:bg-white hover:text-electric"
          >
            Explore Live Pipeline
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 11: CTA BANNER
   ========================================================================== */

function CtaBanner() {
  return (
    <section id="cta-banner" className="relative w-full bg-canvas px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1360px]">
        <div className="cta-shell relative overflow-hidden rounded-[2rem] border border-white/15 px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-10 shadow-[0_40px_100px_-35px_rgba(10,20,40,0.65)]">
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-[#0d234a] to-[#0a4d9c]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1.4px)] [background-size:24px_24px]" />
          <div className="pointer-events-none absolute -left-12 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.35),transparent_65%)] blur-2xl" />
          <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-80 w-80 lg:h-[460px] lg:w-[460px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.28),transparent_65%)] blur-3xl" />
          <div className="cta-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-8 xl:gap-10">
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm shadow-2xs">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric-bright" />
                <span>Zero risk hiring</span>
              </div>

              <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-extrabold leading-[1.12] tracking-tight text-white">
                Send us the requirement. We send back a{" "}
                <span className="bg-gradient-to-r from-electric-bright via-sky-200 to-white bg-clip-text text-transparent">
                  vetted shortlist.
                </span>
              </h2>

              <p className="mt-3.5 max-w-xl text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                Elastic turnkey pods and pre-vetted specialists deployed in 2 to 7 days with guaranteed daily timezone overlap.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {[
                  "2 week risk free trial on staff augmentation",
                  "90 day replacement guarantee on direct hire",
                ].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 font-mono text-[11px] font-medium text-white/90 backdrop-blur-sm"
                  >
                    <CheckCircle size={14} className="text-electric-bright shrink-0" />
                    <span>{t}</span>
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-display text-xs sm:text-sm font-bold text-ink shadow-[0_14px_34px_-10px_rgba(255,255,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/95 cursor-pointer"
                >
                  <span>Hire &amp; Deploy</span>
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1 text-ink" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-display text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15 cursor-pointer"
                >
                  <span>Engagement &amp; pricing</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end items-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[450px] transition-transform duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-electric/30 via-sky-400/20 to-transparent blur-2xl -z-1 scale-90 pointer-events-none" />
                
                <Image
                  src="/assets/cta_pic.png"
                  alt="Pepoltek Talent Pod & 2-Week Risk-Free Trial Guarantee"
                  width={900}
                  height={900}
                  priority
                  className="w-full h-auto object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.45)] select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   HOMEPAGE V1 PAGE ENTRY POINT
   ========================================================================== */

export default function HomepageV1() {
  return (
    <>
      <Hero />
      <Overview />
      <HiringVelocity />
      <DeliveryPods />
      <DualSectorSolutions />
      <SprintWorkflow />
      <ProductSolutions />
      <CommercialTerms />
      <AiHrmsPortal />
      <TalentEcosystem />
      <CtaBanner />
    </>
  );
}
