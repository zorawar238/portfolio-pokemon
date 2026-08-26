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
    phone: string;
    github: string;
    linkedin: string;
    twitter?: string;
  };
  resumeUrl: string;
}

export const developerData: DeveloperProfile = {
  name: 'Nishant Kumar',
  class: 'Full-Stack Developer',
  specialization: 'Full-Stack Web Development',
  currentFocus: ['React.js', 'Node.js', 'Full Stack'],
  location: 'Bengaluru, India',
  status: 'Available for opportunities',
  bio: [
    'Computer Science undergraduate at Jain University building full-stack web applications across frontend, backend, and database layers.',
    'Experienced in developing responsive e-commerce workflows, admin dashboards, authentication, media uploads, and order management, with internship exposure to full-stack development.'
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
    email: 'nishantkr238@gmail.com',
    phone: '+91-9101870695',
    github: 'https://github.com/zorawar238',
    linkedin: 'https://www.linkedin.com/in/nishant-kumar-23205331a/',
  },
  resumeUrl: '/resume.docx'
};
