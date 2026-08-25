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
    id: 'badge-1',
    title: 'First Hackathon',
    category: 'Hackathon',
    year: '2025',
    issuer: 'Local Tech Community',
    description: 'Participated in a 48-hour hackathon and built a web app prototype.'
  }
];
