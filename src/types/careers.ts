export interface CareerPosition {
  id: string;
  code: string;
  title: string;
  roleType: 'Armed Protection Specialist' | 'Patrol Officer' | 'Combatives Instructor' | 'Dispatch Operator';
  location: string;
  clearanceLevel: 'Florida Class G (Armed)' | 'Florida Class D (Unarmed)' | 'Secret / Top Secret Preferred' | 'Law Enforcement / Mil Veteran';
  employmentType: 'Full-Time' | 'Part-Time' | 'Event Contractor';
  salaryRange: string;
  responsibilities: string[];
  minimumQualifications: string[];
  preferredQualifications: string[];
  closingDate: string;
}
