
import EcoMascot from "../../EcoMascot";

interface DifficultySelectorProps {
  selectedDifficulty: string;
  onSelect: (difficulty: string) => void;
}

const DifficultySelector = ({ selectedDifficulty, onSelect }: DifficultySelectorProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-ecoGreen-light">
      <h3 className="text-xl font-bold text-ecoBlue-dark mb-6">Choose your age level:</h3>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          className={`eco-button ${selectedDifficulty === "1" ? "bg-ecoPink" : "bg-gray-200 text-gray-700"} w-full sm:w-auto`}
          onClick={() => onSelect("1")}
        >
          4-5 years (very easy)
        </button>
        <button 
          className={`eco-button ${selectedDifficulty === "2" ? "bg-ecoPink" : "bg-gray-200 text-gray-700"} w-full sm:w-auto`}
          onClick={() => onSelect("2")}
        >
          6-8 years (easy)
        </button>
        <button 
          className={`eco-button ${selectedDifficulty === "3" ? "bg-ecoPink" : "bg-gray-200 text-gray-700"} w-full sm:w-auto`}
          onClick={() => onSelect("3")}
        >
          9-12 years (medium)
        </button>
      </div>
      
      <div className="mt-10 flex justify-center">
        <EcoMascot 
          image="/lovable-uploads/b4310b3b-b786-4def-969c-be3dfd5a4fe0.png" 
          animation="bounce"
          size="lg"
        />
      </div>
    </div>
  );
};

export default DifficultySelector;
