export type Question = QuestionMC | QuestionText;

export interface QuestionMC {
  question: string
  title: string;
  createdAt: string;
  type: "single-select";
  options: { value: string }[];
}

export interface QuestionText {
  question: string
  title: string;
  createdAt: string;
  type: "text";
}
