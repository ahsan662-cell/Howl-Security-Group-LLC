export interface TrainingCourse {
  id: string;
  code: string;
  title: string;
  slug: string;
  category: 'Ving Tsun Combatives' | 'Firearms & Tactics' | 'Executive Protection' | 'Officer Survival';
  duration: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced / Law Enforcement Only';
  prerequisites: string[];
  certificationsAwarded: string[];
  summary: string;
  curriculum: {
    moduleNumber: number;
    title: string;
    description: string;
    tacticsCovered: string[];
  }[];
  gearRequirements: string[];
  nextDate: string;
  tuition: string;
  seatsAvailable: number;
}
