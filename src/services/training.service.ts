import { TRAINING_COURSES } from "@/constants/mock-data/training.data";
import { TrainingCourse } from "@/types/training";

export class TrainingService {
  static async getCourses(): Promise<TrainingCourse[]> {
    return Promise.resolve(TRAINING_COURSES);
  }

  static async getCourseBySlug(slug: string): Promise<TrainingCourse | undefined> {
    return Promise.resolve(TRAINING_COURSES.find((c) => c.slug === slug));
  }
}
