export type ServiceCategory = 
  | 'executive-protection'
  | 'event-security'
  | 'commercial-patrol'
  | 'threat-mitigation'
  | 'residential-estate'
  | 'tactical-dispatch';

export interface ServiceCapability {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  summary: string;
  fullDescription: string;
  responseSLA: string;
  armedRequirement: 'Armed (G License)' | 'Unarmed (D License)' | 'Special Operations Operator';
  protocols: string[];
  keyHighlights: string[];
  deploymentZones: string[];
}

export interface ServiceTier {
  name: string;
  code: string;
  description: string;
  features: string[];
  idealFor: string;
  priorityDispatch: boolean;
}
