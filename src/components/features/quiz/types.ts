
export interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  fun_fact: string;
}

export interface QuizData {
  quiz_title: string;
  questions: QuizQuestion[];
}
