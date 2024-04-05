export type Question = QuestionMC | QuestionText;

export interface QuestionMC {
  title: string;
  createdAt: string;
  type: "single-select";
  options: { value: string }[];
}

export interface QuestionText {
  title: string;
  createdAt: string;
  type: "text";
}
