import { SERVICES_DATA, SERVICE_TIERS } from "@/constants/mock-data/services.data";
import { ServiceCapability, ServiceTier } from "@/types/services";

export class ServicesService {
  static async getAllServices(): Promise<ServiceCapability[]> {
    // Simulated realistic client fetch delay
    return Promise.resolve(SERVICES_DATA);
  }

  static async getServiceBySlug(slug: string): Promise<ServiceCapability | undefined> {
    return Promise.resolve(SERVICES_DATA.find((s) => s.slug === slug));
  }

  static async getServiceTiers(): Promise<ServiceTier[]> {
    return Promise.resolve(SERVICE_TIERS);
  }
}
