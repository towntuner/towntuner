export interface Campaign {
  createdAt: string;
  title: string;
  description: string;
  icon: string;
  location: string;
  image?: Blob;
  deadline: string;
  questions: {
    question: string;
    type: "single-select" | "text";
    options?: { value: string }[];
  }[];
}
