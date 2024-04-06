import { Question } from "./questions";

export interface Campaign {
  createdAt: string;
  title: string;
  description: string;
  icon: string;
  location: string;
  hasImage: boolean;
  deadline: string;
  questions: Question[];
}
