
import EcoMascot from "../../EcoMascot";
import { RefreshCw } from "lucide-react";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const QuizResults = ({ score, totalQuestions, onRestart }: QuizResultsProps) => {
  const getResultMessage = () => {
    if (score === totalQuestions) {
      return "🏆 NATURE CHAMPION! Perfect score!";
    } else if (score >= Math.floor(totalQuestions / 2)) {
      return "👍 Excellent job! You know your nature facts!";
    } else {
      return "🌱 Keep exploring! The natural world is amazing!";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md flex-1 border-2 border-ecoGreen-light text-center">
      <h3 className="text-2xl font-bold text-ecoGreen-dark mb-4">Quiz Complete!</h3>
      
      <div className="mb-6">
        <p className="text-3xl font-bold mb-2">🌟 Your Score: {score}/{totalQuestions}</p>
        <p className="text-xl">{getResultMessage()}</p>
      </div>
      
      <div className="flex justify-center mb-8">
        <EcoMascot 
          image="/lovable-uploads/f65f8a63-0172-4b0c-9f71-907eb0defff8.png" 
          animation="bounce"
          size="lg"
        />
      </div>
      
      <button onClick={onRestart} className="eco-button-primary mx-auto">
        <RefreshCw className="mr-2" />
        Play Again
      </button>
    </div>
  );
};

export default QuizResults;
