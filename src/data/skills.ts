export type SkillCategory = 'Frontend' | 'Backend' | 'UI / UX' | 'Animation' | 'Tools' | 'Currently Learning';
export type SkillLevel = 'Learning' | 'Familiar' | 'Comfortable' | 'Advanced';

export interface Skill {
  id: string;
  category: SkillCategory;
  name: string;
  level: SkillLevel;
  description: string;
  usedInProjects: string[]; // Project IDs
}

export const skillsData: Skill[] = [
  {
    id: 'html',
    category: 'Frontend',
    name: 'HTML5',
    level: 'Advanced',
    description: 'Semantic markup and accessible DOM structure.',
    usedInProjects: [],
  },
  {
    id: 'css',
    category: 'Frontend',
    name: 'CSS3 / Tailwind',
    level: 'Advanced',
    description: 'Responsive layouts, modern styling, and utility-first design.',
    usedInProjects: [],
  },
  {
    id: 'javascript',
    category: 'Frontend',
    name: 'JavaScript (ES6+)',
    level: 'Comfortable',
    description: 'Dynamic interactivity and DOM manipulation.',
    usedInProjects: [],
  },
  {
    id: 'react',
    category: 'Frontend',
    name: 'React',
    level: 'Comfortable',
    description: 'Component-based architecture and state management.',
    usedInProjects: [],
  },
  {
    id: 'nextjs',
    category: 'Frontend',
    name: 'Next.js',
    level: 'Familiar',
    description: 'Server-side rendering, static generation, and app routing.',
    usedInProjects: [],
  },
  {
    id: 'gsap',
    category: 'Animation',
    name: 'GSAP',
    level: 'Familiar',
    description: 'High-performance and complex sequencing for web animations.',
    usedInProjects: [],
  },
  {
    id: 'figma',
    category: 'UI / UX',
    name: 'Figma',
    level: 'Comfortable',
    description: 'Prototyping, wireframing, and user interface design.',
    usedInProjects: [],
  },
  {
    id: 'agentic-ai',
    category: 'Currently Learning',
    name: 'Agentic AI',
    level: 'Learning',
    description: 'Exploring AI agents, LLMs, and autonomous workflows.',
    usedInProjects: [],
  }
];
