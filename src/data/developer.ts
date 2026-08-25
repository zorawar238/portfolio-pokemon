export interface DeveloperProfile {
  name: string;
  class: string;
  specialization: string;
  currentFocus: string[];
  location: string;
  status: 'Available for opportunities' | 'Currently employed' | 'Open to freelance';
  bio: string[];
  philosophy: string[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
  };
  resumeUrl: string;
}

export const developerData: DeveloperProfile = {
  name: 'Nishant Kumar',
  class: 'Web Developer',
  specialization: 'UI/UX + Frontend',
  currentFocus: ['Full Stack', 'AI', 'Agentic AI'],
  location: 'India',
  status: 'Available for opportunities',
  bio: [
    'I am a passionate web developer focused on building interactive, premium user experiences.',
    'I combine technical frontend skills with a strong eye for visual design to create memorable digital products.'
  ],
  philosophy: [
    'DESIGN FIRST',
    'DETAIL ORIENTED',
    'PERFORMANCE CONSCIOUS',
    'RESPONSIVE FIRST',
    'USER CENTRIC',
    'CURIOUS'
  ],
  contact: {
    email: 'hello@example.com', // TODO: Update with real email
    github: 'https://github.com', // TODO: Update with real GitHub
    linkedin: 'https://linkedin.com', // TODO: Update with real LinkedIn
  },
  resumeUrl: '/resume.pdf' // TODO: Update with actual resume path
};
