export interface Question {
  title: string;
  type: "single-select" | "text";
  options?: { value: string }[];
}
export interface QuestionMC {
  title: string;
  type: "single-select";
  options: { value: string }[];
}

export interface QuestionText {
  title: string;
  type: "text";
}
