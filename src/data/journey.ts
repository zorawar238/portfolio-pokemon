export interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  summary: string;
  details: string[];
  type: 'learning' | 'career' | 'project';
  nextStep?: string;
}

export const journeyData: JourneyMilestone[] = [
  {
    id: 'milestone-1',
    year: 'Year 1',
    title: 'The Beginning',
    summary: 'Started the journey into web development with HTML & CSS.',
    details: [
      'Built first static websites.',
      'Learned responsive design principles.',
      'Experimented with basic UI layouts.'
    ],
    type: 'learning',
    nextStep: 'Master JavaScript for interactivity.'
  },
  {
    id: 'milestone-2',
    year: 'Year 2',
    title: 'Adding Logic',
    summary: 'Dived deep into JavaScript and DOM manipulation.',
    details: [
      'Learned ES6+ features.',
      'Built interactive web components.',
      'Explored animations and transitions.'
    ],
    type: 'learning',
    nextStep: 'Adopt a modern framework like React.'
  },
  {
    id: 'milestone-3',
    year: 'Year 3',
    title: 'Modern Frontend',
    summary: 'Embraced React and the modern frontend ecosystem.',
    details: [
      'Learned state management and component architecture.',
      'Adopted Next.js for SSR and performance.',
      'Started building full web applications.'
    ],
    type: 'project',
    nextStep: 'Explore Full Stack and AI.'
  }
];
