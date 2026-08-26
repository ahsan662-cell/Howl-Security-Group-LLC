export type ThreatLevel = 'LOW' | 'MODERATE' | 'ELEVATED' | 'HIGH' | 'CRITICAL_IMMINENT';

export interface DispatchRequest {
  fullName: string;
  organization?: string;
  phone: string;
  email: string;
  threatLevel: ThreatLevel;
  locationArea: 'Fort Pierce' | 'Palm Beach' | 'Treasure Coast' | 'Boca Raton' | 'Miami-Dade' | 'Other South FL';
  specificAddress: string;
  serviceType: string;
  deploymentTimeframe: 'IMMEDIATE (Under 60 Mins)' | 'TODAY (Within 4 Hours)' | 'SCHEDULED_DATE';
  scheduledDate?: string;
  operativesCount: number;
  armedRequired: boolean;
  incidentSummary: string;
}

export interface DispatchResponse {
  success: boolean;
  dispatchId: string;
  assignedUnit?: string;
  estimatedArrival?: string;
  status: 'PENDING_REVIEW' | 'DISPATCHED' | 'STANDBY';
  message: string;
  timestamp: string;
}
