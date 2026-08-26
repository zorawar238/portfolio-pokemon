export interface Achievement {
  id: string;
  title: string;
  category: 'Hackathon' | 'Certification' | 'Competition' | 'Open Source' | 'Academic' | 'Other';
  year: string;
  issuer: string;
  description: string;
}

export const achievementsData: Achievement[] = [
  {
    id: 'ideathon-winner',
    title: 'Ideathon Winner',
    category: 'Competition',
    year: '1st Year',
    issuer: 'Jain University',
    description: 'Won an Ideathon competition held at Jain University.'
  },
  {
    id: 'nian-selection',
    title: 'Selected for NIAN (New Age Innovation Network)',
    category: 'Other',
    year: '2nd Year',
    issuer: 'Government of Karnataka',
    description: 'Selected for the New Age Innovation Network (NIAN) program run by the Karnataka Government.'
  },
  {
    id: 'cloud-club-lead',
    title: 'Social Media Lead',
    category: 'Other',
    year: '2nd Year',
    issuer: 'Jain University Cloud Club',
    description: "Served as Social Media Lead for Jain University's Cloud Club."
  },
  {
    id: 'web-dev-bootcamp',
    title: 'The Web Developer Bootcamp',
    category: 'Certification',
    year: '2nd Year',
    issuer: 'Udemy (Colt Steele)',
    description: "Completed Colt Steele's web development bootcamp course on Udemy."
  },
  {
    id: 'harkirat-cohort',
    title: 'Bootcamp 1.0',
    category: 'Certification',
    year: '2nd Year',
    issuer: '100xdevs (Harkirat Singh)',
    description: "Completed Harkirat Singh's 100xdevs Bootcamp 1.0 cohort program."
  }
];
