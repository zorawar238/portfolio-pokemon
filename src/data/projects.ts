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
    id: 'womens-clothing-ecommerce',
    projectNumber: '001',
    name: "Full-Stack Women's Clothing E-Commerce Website",
    shortDescription: 'A responsive, mobile-first e-commerce platform with full shopping, auth, and admin management.',
    category: 'Full Stack',
    role: 'Personal Project',
    year: '',
    technologies: ['React.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    status: 'Archived',
    isFeatured: true,
    overview: "A responsive, mobile-first e-commerce platform for a women's clothing store, covering customer shopping, authentication, wishlist, cart, checkout, and order tracking, backed by an admin catalog and order management system.",
    problem: 'Online clothing shoppers need a smooth, mobile-first browsing and checkout experience, while the store needs a reliable way to manage products and orders.',
    goal: 'Build a full e-commerce flow end-to-end: browsing, authentication, wishlist, cart, checkout, order tracking, and an admin side for catalog and order management.',
    uxApproach: 'Mobile-first, responsive layouts with Tailwind CSS, focused on a fast, familiar shopping flow from product browsing through checkout.',
    architecture: 'React.js + TypeScript + Vite on the frontend, with a Node.js/Express.js REST API and MongoDB for data, using JWT for authentication and Cloudinary for product media.',
    challenges: 'Coordinating authentication, cart/wishlist state, and order status across both the customer-facing storefront and the admin dashboard.',
    solutions: 'Structured REST APIs around clear resource boundaries (auth, products, cart, orders) with JWT-protected routes, and a dedicated admin interface for catalog and order management.',
    results: 'A fully functional store demonstrating the complete customer journey (browse → cart → checkout → order tracking) alongside an admin-side catalog and order management system.',
    learnings: 'Deepened experience wiring a real MERN-stack backend (auth, REST APIs, MongoDB) to a modern TypeScript/Vite frontend for a non-trivial, multi-role application.',
    thumbnail: '',
    gallery: [],
  },
  {
    id: 'shoe-ecommerce',
    projectNumber: '002',
    name: 'Shoe Brand E-Commerce Website',
    shortDescription: 'An e-commerce website for a shoe brand with product listings and a browsing/shopping experience.',
    category: 'E-Commerce',
    role: 'Personal Project',
    year: '',
    technologies: ['React.js', 'Tailwind CSS', 'Bootstrap', 'Firebase'],
    status: 'Archived',
    isFeatured: false,
    overview: 'An e-commerce website for a shoe brand, featuring product listings and a browsing/shopping experience.',
    problem: 'Shoppers browsing a shoe catalog need a clean, responsive storefront to view and shop products.',
    goal: 'Build a product listing and shopping experience for a shoe brand storefront.',
    uxApproach: 'Combined Tailwind CSS and Bootstrap for a responsive, component-driven storefront layout.',
    architecture: 'React.js frontend with Firebase for data/hosting services.',
    challenges: 'Structuring product listing and browsing views for a clear, consistent shopping experience.',
    solutions: 'Used React component composition with Tailwind/Bootstrap utility styling to keep listing and product views consistent.',
    results: 'A working storefront demonstrating product listing and browsing/shopping flows.',
    learnings: 'Practiced combining two CSS frameworks (Tailwind + Bootstrap) cleanly within one React app.',
    thumbnail: '',
    gallery: [],
  },
  {
    id: 'note-management-system',
    projectNumber: '003',
    name: 'Note Management System',
    shortDescription: 'A note management platform with to-do lists, daily tasks, general notes, and book notes.',
    category: 'Web',
    role: 'Personal Project',
    year: '',
    technologies: ['React.js', 'Context API', 'Firebase'],
    status: 'Archived',
    isFeatured: false,
    overview: 'A note management platform featuring to-do lists, daily tasks, general notes, and a dedicated section for book notes.',
    problem: 'Keeping to-dos, daily tasks, general notes, and book notes organized across separate tools is fragmented.',
    goal: 'Build a single platform to manage to-do lists, daily tasks, general notes, and book notes in one place.',
    uxApproach: 'Organized the app around distinct note types (to-do, daily, general, book notes) for quick context switching.',
    architecture: 'React.js with Context API for state management, backed by Firebase for data persistence.',
    challenges: 'Managing shared state across multiple note types without prop-drilling.',
    solutions: "Used React's Context API to centralize state management across the different note sections.",
    results: 'A working multi-section note-taking app covering to-dos, daily tasks, general notes, and book notes.',
    learnings: 'Built practical experience using Context API for real cross-component state management, backed by Firebase.',
    thumbnail: '',
    gallery: [],
  },
  {
    id: 'nimbus-weather-tracker',
    projectNumber: '004',
    name: 'Nimbus — Weather Tracker',
    shortDescription: "Displays today's weather and lets you compare it with historical data from the past 10 years.",
    category: 'Web',
    role: 'Personal Project',
    year: '',
    technologies: ['React.js', 'JavaScript', 'Weather API'],
    status: 'Archived',
    isFeatured: false,
    overview: "A weather tracking app that displays today's weather and allows comparison with historical weather data from the past 10 years.",
    problem: "Knowing today's forecast alone doesn't show how unusual (or normal) it actually is for a given date.",
    goal: "Show current weather conditions alongside historical data for the same date across the past 10 years.",
    uxApproach: 'Simple, glanceable current-conditions view paired with a historical comparison view for context.',
    architecture: 'React.js frontend consuming a third-party weather API for current and historical data.',
    challenges: 'Fetching and aligning current weather data with 10 years of historical data for meaningful comparison.',
    solutions: 'Structured API calls around a selected date to pull both current conditions and matching historical records.',
    results: 'A working app that shows current weather alongside a 10-year historical comparison for the same date.',
    learnings: 'Gained experience integrating and normalizing data from an external weather API in a React app.',
    thumbnail: '',
    gallery: [],
  }
];
