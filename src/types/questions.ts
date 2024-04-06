export type Question = QuestionMC | QuestionText;

export interface QuestionMC {
  question: string;
  createdAt: string;
  type: "single-select";
  options: { value: string }[];
}

export interface QuestionText {
  question: string;
  createdAt: string;
  type: "text";
  options: [];
}
