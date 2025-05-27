import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { fetchNatureQuiz } from "../../lib/api";
import DifficultySelector from "./quiz/DifficultySelector";
import LoadingQuiz from "./quiz/LoadingQuiz";
import QuizQuestion from "./quiz/QuizQuestion";
import QuizResults from "./quiz/QuizResults";

interface NatureQuizProps {
  onBack: () => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  fun_fact: string;
}

interface QuizData {
  quiz_title: string;
  questions: QuizQuestion[];
}

const NatureQuiz = ({ onBack }: NatureQuizProps) => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [difficulty, setDifficulty] = useState<string>("");
  const [showDifficultySelector, setShowDifficultySelector] = useState(true);

  const generateQuiz = async (selectedDifficulty: string) => {
    setIsLoading(true);
    setShowDifficultySelector(false);
    setQuizComplete(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
    
    try {
      const data = await fetchNatureQuiz(selectedDifficulty);
      setQuizData(data);
      setDifficulty(selectedDifficulty);
    } catch (error) {
      toast.error("Couldn't load the quiz. Please try again!");
      setShowDifficultySelector(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDifficultySelect = (selectedDifficulty: string) => {
    generateQuiz(selectedDifficulty);
  };

  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null || !quizData) return;
    
    setSelectedOption(optionIndex);
    const currentQ = quizData.questions[currentQuestion];
    const isAnswerCorrect = currentQ.options[optionIndex] === currentQ.correct_answer;
    
    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setQuizComplete(true);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setShowDifficultySelector(true);
    setQuizData(null);
    setQuizComplete(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleNewQuiz = () => {
    if (difficulty) {
      generateQuiz(difficulty);
    } else {
      handleRestart();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="eco-button-secondary p-2 rounded-full"
          aria-label="Go back"
        >
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-bold text-ecoBlue-dark">Nature Quiz</h2>
        {!showDifficultySelector && (
          <button
            onClick={handleNewQuiz}
            className="eco-button-secondary p-2 rounded-full ml-auto"
            disabled={isLoading}
            aria-label="New quiz"
          >
            <RefreshCw className={isLoading ? "animate-spin" : ""} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {showDifficultySelector ? (
          <DifficultySelector
            selectedDifficulty={difficulty}
            onSelect={handleDifficultySelect}
          />
        ) : isLoading ? (
          <LoadingQuiz />
        ) : quizComplete && quizData ? (
          <QuizResults
            score={score}
            totalQuestions={quizData.questions.length}
            onRestart={handleRestart}
          />
        ) : quizData ? (
          <div className="bg-white rounded-2xl p-6 shadow-md flex-1 border-2 border-ecoGreen-light">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-ecoBlue-dark">
                Question {currentQuestion + 1} of {quizData.questions.length}
              </h3>
              <p className="text-lg font-medium">Score: {score}</p>
            </div>
            
            <QuizQuestion
              question={quizData.questions[currentQuestion]}
              onAnswer={handleAnswer}
              selectedOption={selectedOption}
              isCorrect={isCorrect}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NatureQuiz;