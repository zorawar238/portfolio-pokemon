export type ProjectCategory = 'Web' | 'Full Stack' | 'AI' | 'UI/UX' | 'E-Commerce' | 'Experiments';
export type ProjectStatus = 'Live' | 'In Progress' | 'Archived' | 'Experimental';

export interface Project {
  id: string;
  projectNumber: string; // e.g. '001'
  name: string;
  shortDescription: string;
  category: ProjectCategory;
  role: string;
  year: string;
  technologies: string[]; // Skill IDs or strings
  status: ProjectStatus;
  isFeatured: boolean;
  
  // Case Study fields
  overview: string;
  problem: string;
  goal: string;
  uxApproach: string;
  architecture: string;
  challenges: string;
  solutions: string;
  results: string;
  learnings: string;
  
  // Media & Links
  thumbnail: string;
  gallery: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projectsData: Project[] = [
  {
    id: 'project-placeholder-1',
    projectNumber: '001',
    name: 'Featured Web App',
    shortDescription: 'A dynamic frontend application focusing on interactive user experiences.',
    category: 'Web',
    role: 'Frontend Developer',
    year: '2026',
    technologies: ['React', 'Next.js', 'Tailwind', 'GSAP'],
    status: 'Live',
    isFeatured: true,
    overview: 'This project demonstrates high-performance web development with complex animations.',
    problem: 'Placeholder problem description.',
    goal: 'Placeholder goal.',
    uxApproach: 'Placeholder UX approach.',
    architecture: 'Placeholder architecture.',
    challenges: 'Placeholder challenges.',
    solutions: 'Placeholder solutions.',
    results: 'Placeholder results.',
    learnings: 'Placeholder learnings.',
    thumbnail: '/placeholder-project-1.jpg',
    gallery: [],
    liveUrl: '#',
    githubUrl: '#',
  }
];
