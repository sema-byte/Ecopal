import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import EcoMascot from "../EcoMascot";
import { toast } from "sonner";
import { fetchNatureQuiz } from "../../lib/api"; // Import the API client

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
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [difficulty, setDifficulty] = useState<string>("2");

  useEffect(() => {
    if (difficulty) {
      generateQuiz();
    }
  }, [difficulty]);

  const generateQuiz = async () => {
    setIsLoading(true);
    setQuizComplete(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
    
    try {
      // Call the actual API
      const data = await fetchNatureQuiz(difficulty);
      setQuizData(data);
    } catch (error) {
      toast.error("Couldn't load the quiz. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
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

  const handleDifficultyChange = (level: string) => {
    setDifficulty(level);
  };

  const getResultMessage = () => {
    if (!quizData) return "";
    
    if (score === quizData.questions.length) {
      return "🏆 NATURE CHAMPION! Perfect score!";
    } else if (score >= 3) {
      return "👍 Excellent job! You know your nature facts!";
    } else {
      return "🌱 Keep exploring! The natural world is amazing!";
    }
  };

  const getMascotImage = () => {
    const images = [
      "/lovable-uploads/f65f8a63-0172-4b0c-9f71-907eb0defff8.png",
      "/lovable-uploads/b4310b3b-b786-4def-969c-be3dfd5a4fe0.png",
      "/lovable-uploads/598b4b4c-5006-4e4c-8b45-f5e4aabf0b80.png"
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  const renderDifficultySelector = () => (
    <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-ecoGreen-light">
      <h3 className="text-xl font-bold text-ecoBlue-dark mb-6">Choose your age level:</h3>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          className={`eco-button ${difficulty === "1" ? "bg-ecoPink" : "bg-gray-200 text-gray-700"} w-full sm:w-auto`}
          onClick={() => handleDifficultyChange("1")}
        >
          4-5 years (very easy)
        </button>
        <button 
          className={`eco-button ${difficulty === "2" ? "bg-ecoPink" : "bg-gray-200 text-gray-700"} w-full sm:w-auto`}
          onClick={() => handleDifficultyChange("2")}
        >
          6-8 years (easy)
        </button>
        <button 
          className={`eco-button ${difficulty === "3" ? "bg-ecoPink" : "bg-gray-200 text-gray-700"} w-full sm:w-auto`}
          onClick={() => handleDifficultyChange("3")}
        >
          9-12 years (medium)
        </button>
      </div>
      
      <div className="mt-10 flex justify-center">
        <EcoMascot 
          image="/lovable-uploads/598b4b4c-5006-4e4c-8b45-f5e4aabf0b80.png" 
          animation="bounce"
          size="lg"
        />
      </div>
    </div>
  );

  const renderQuizResults = () => (
    <div className="bg-white rounded-2xl p-6 shadow-md flex-1 border-2 border-ecoGreen-light text-center">
      <h3 className="text-2xl font-bold text-ecoGreen-dark mb-4">Quiz Complete!</h3>
      
      <div className="mb-6">
        <p className="text-3xl font-bold mb-2">🌟 Your Score: {score}/{quizData?.questions.length}</p>
        <p className="text-xl">{getResultMessage()}</p>
      </div>
      
      <div className="flex justify-center mb-8">
        <EcoMascot 
          image={getMascotImage()} 
          animation="bounce"
          size="lg"
        />
      </div>
      
      <button onClick={generateQuiz} className="eco-button-primary mx-auto">
        <RefreshCw className="mr-2" />
        Play Again
      </button>
    </div>
  );

  const renderQuizQuestion = () => {
    if (!quizData) return null;
    
    const question = quizData.questions[currentQuestion];
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md flex-1 border-2 border-ecoGreen-light">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-ecoBlue-dark">
            Question {currentQuestion + 1} of {quizData.questions.length}
          </h3>
          <p className="text-lg font-medium">Score: {score}</p>
        </div>
        
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
              onClick={() => handleOptionSelect(idx)}
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
              image={getMascotImage()} 
              animation="float"
              size="sm"
            />
          </div>
        </div>
      </div>
    );
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
        <button
          onClick={generateQuiz}
          className="eco-button-secondary p-2 rounded-full ml-auto"
          disabled={isLoading}
          aria-label="New quiz"
        >
          <RefreshCw className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="bg-white rounded-2xl p-6 shadow-md flex-1 flex flex-col items-center justify-center">
            <EcoMascot 
              image="/lovable-uploads/f65f8a63-0172-4b0c-9f71-907eb0defff8.png" 
              animation="spin"
              size="md"
            />
            <p className="mt-4 text-ecoGreen-dark font-medium">Loading quiz questions...</p>
          </div>
        ) : quizComplete ? (
          renderQuizResults()
        ) : quizData ? (
          renderQuizQuestion()
        ) : (
          renderDifficultySelector()
        )}
      </div>
    </div>
  );
};
export default NatureQuiz;