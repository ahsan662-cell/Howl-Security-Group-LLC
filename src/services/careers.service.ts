import { CAREER_POSITIONS } from "@/constants/mock-data/careers.data";
import { CareerPosition } from "@/types/careers";

export class CareersService {
  static async getOpenPositions(): Promise<CareerPosition[]> {
    return Promise.resolve(CAREER_POSITIONS);
  }

  static async submitApplication(positionId: string, applicantData: { fullName: string; phone: string; email: string; experienceYears: number; veteranStatus: boolean; summary: string }): Promise<{ success: boolean; message: string; trackingCode: string }> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      success: true,
      trackingCode: "APP-VET-" + Math.floor(10000 + Math.random() * 90000),
      message: "Application received by Howl Vetting & Recruitment Division. Background review initiated.",
    };
  }
}
