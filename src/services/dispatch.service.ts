import { DispatchRequest, DispatchResponse } from "@/types/dispatch";

export class DispatchService {
  static async submitDispatchRequest(payload: DispatchRequest): Promise<DispatchResponse> {
    // Simulate real backend processing time and ID generation
    await new Promise((resolve) => setTimeout(resolve, 800));

    const dispatchCode = "HWL-" + Math.floor(100000 + Math.random() * 900000);
    const unitAssignments: Record<string, string> = {
      "Fort Pierce": "HOWL-TAC-ALPHA-01 (Sector North)",
      "Palm Beach": "HOWL-TAC-BRAVO-03 (Sector Central)",
      "Treasure Coast": "HOWL-PATROL-04 (Sector East)",
      "Boca Raton": "HOWL-EP-SIERRA-02 (Sector South)",
      "Miami-Dade": "HOWL-METRO-06 (Sector Metro)",
      "Other South FL": "HOWL-COMMAND-STANDBY",
    };

    return {
      success: true,
      dispatchId: dispatchCode,
      assignedUnit: unitAssignments[payload.locationArea] || "HOWL-RAPID-UNIT-1",
      estimatedArrival: payload.deploymentTimeframe.startsWith("IMMEDIATE") ? "32 - 45 Minutes" : "As Scheduled",
      status: payload.threatLevel === "CRITICAL_IMMINENT" || payload.threatLevel === "HIGH" ? "DISPATCHED" : "PENDING_REVIEW",
      message: `Emergency response protocol activated. Incident report ${dispatchCode} logged with Fort Pierce Command Console. Lead tactical unit alerted.`,
      timestamp: new Date().toISOString(),
    };
  }
}
