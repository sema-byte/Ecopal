
import { useState } from "react";
import EcoMascot from "../../EcoMascot";

interface QuizQuestionProps {
  question: {
    question: string;
    options: string[];
    correct_answer: string;
    explanation: string;
    fun_fact: string;
  };
  onAnswer: (optionIndex: number) => void;
  selectedOption: number | null;
  isCorrect: boolean | null;
}

const QuizQuestion = ({ 
  question, 
  onAnswer, 
  selectedOption, 
  isCorrect 
}: QuizQuestionProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md flex-1 border-2 border-ecoGreen-light">
      <h4 className="text-xl font-bold mb-6">{question.question}</h4>
      
      <div className="grid grid-cols-1 gap-3 mb-6">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedOption === idx
                ? isCorrect
                  ? "bg-green-100 border-green-500"
                  : "bg-red-100 border-red-500"
                : "border-gray-300 hover:border-ecoBlue"
            }`}
            onClick={() => onAnswer(idx)}
            disabled={selectedOption !== null}
          >
            {option}
          </button>
        ))}
      </div>
      
      {selectedOption !== null && (
        <div className={`p-4 rounded-xl ${isCorrect ? "bg-green-100" : "bg-red-100"} mb-4`}>
          <p className="font-medium">
            {isCorrect ? "✅ Correct! Great job!" : `❌ The correct answer is: ${question.correct_answer}`}
          </p>
          <p className="mt-2">💡 {question.explanation}</p>
          <p className="mt-2 font-medium">{question.fun_fact}</p>
        </div>
      )}
      
      <div className="flex justify-end">
        <div className="w-20">
          <EcoMascot 
            image="/lovable-uploads/b4310b3b-b786-4def-969c-be3dfd5a4fe0.png" 
            animation="float"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
