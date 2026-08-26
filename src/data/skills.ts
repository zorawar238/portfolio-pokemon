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
    usedInProjects: ['nimbus-weather-tracker', 'note-management-system', 'shoe-ecommerce', 'womens-clothing-ecommerce'],
  },
  {
    id: 'css',
    category: 'Frontend',
    name: 'CSS3 / Tailwind CSS',
    level: 'Advanced',
    description: 'Responsive layouts, modern styling, and utility-first design.',
    usedInProjects: ['shoe-ecommerce', 'womens-clothing-ecommerce'],
  },
  {
    id: 'javascript',
    category: 'Frontend',
    name: 'JavaScript (ES6+)',
    level: 'Advanced',
    description: 'Dynamic interactivity and DOM manipulation.',
    usedInProjects: ['nimbus-weather-tracker', 'note-management-system', 'shoe-ecommerce', 'womens-clothing-ecommerce'],
  },
  {
    id: 'typescript',
    category: 'Frontend',
    name: 'TypeScript',
    level: 'Comfortable',
    description: 'Typed JavaScript for safer, more maintainable frontend code.',
    usedInProjects: ['womens-clothing-ecommerce'],
  },
  {
    id: 'react',
    category: 'Frontend',
    name: 'React.js',
    level: 'Advanced',
    description: 'Component-based architecture and state management.',
    usedInProjects: ['nimbus-weather-tracker', 'note-management-system', 'shoe-ecommerce', 'womens-clothing-ecommerce'],
  },
  {
    id: 'nextjs',
    category: 'Frontend',
    name: 'Next.js',
    level: 'Comfortable',
    description: 'Server-side rendering, static generation, and app routing.',
    usedInProjects: [],
  },
  {
    id: 'vite',
    category: 'Frontend',
    name: 'Vite',
    level: 'Comfortable',
    description: 'Fast dev server and build tooling for modern frontend apps.',
    usedInProjects: ['womens-clothing-ecommerce'],
  },
  {
    id: 'bootstrap',
    category: 'Frontend',
    name: 'Bootstrap',
    level: 'Familiar',
    description: 'Component-based responsive UI framework.',
    usedInProjects: ['shoe-ecommerce'],
  },
  {
    id: 'react-router',
    category: 'Frontend',
    name: 'React Router',
    level: 'Comfortable',
    description: 'Client-side routing for multi-page React applications.',
    usedInProjects: ['shoe-ecommerce', 'womens-clothing-ecommerce'],
  },
  {
    id: 'nodejs',
    category: 'Backend',
    name: 'Node.js',
    level: 'Comfortable',
    description: 'Server-side JavaScript runtime for building APIs and services.',
    usedInProjects: ['womens-clothing-ecommerce'],
  },
  {
    id: 'express',
    category: 'Backend',
    name: 'Express.js',
    level: 'Comfortable',
    description: 'Minimal web framework for building REST APIs on Node.js.',
    usedInProjects: ['womens-clothing-ecommerce'],
  },
  {
    id: 'rest-apis',
    category: 'Backend',
    name: 'REST APIs',
    level: 'Comfortable',
    description: 'Designing and consuming RESTful endpoints for web apps.',
    usedInProjects: ['womens-clothing-ecommerce'],
  },
  {
    id: 'jwt',
    category: 'Backend',
    name: 'JWT Authentication',
    level: 'Familiar',
    description: 'Token-based authentication and authorization flows.',
    usedInProjects: ['womens-clothing-ecommerce'],
  },
  {
    id: 'mongodb',
    category: 'Backend',
    name: 'MongoDB / Mongoose',
    level: 'Comfortable',
    description: 'Document database modeling and querying with Mongoose ODM.',
    usedInProjects: ['womens-clothing-ecommerce'],
  },
  {
    id: 'firebase',
    category: 'Backend',
    name: 'Firebase',
    level: 'Comfortable',
    description: 'Realtime database, auth, and hosting for rapid app development.',
    usedInProjects: ['note-management-system', 'shoe-ecommerce'],
  },
  {
    id: 'cloudinary',
    category: 'Backend',
    name: 'Cloudinary',
    level: 'Familiar',
    description: 'Cloud-based media storage, upload, and transformation.',
    usedInProjects: ['womens-clothing-ecommerce'],
  },
  {
    id: 'razorpay',
    category: 'Backend',
    name: 'Razorpay',
    level: 'Familiar',
    description: 'Payment gateway integration for checkout and order flows.',
    usedInProjects: ['womens-clothing-ecommerce'],
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
    id: 'git',
    category: 'Tools',
    name: 'Git & GitHub',
    level: 'Comfortable',
    description: 'Version control, branching workflows, and collaboration.',
    usedInProjects: [],
  },
  {
    id: 'postman',
    category: 'Tools',
    name: 'Postman',
    level: 'Familiar',
    description: 'API testing and documentation during backend development.',
    usedInProjects: ['womens-clothing-ecommerce'],
  }
];
