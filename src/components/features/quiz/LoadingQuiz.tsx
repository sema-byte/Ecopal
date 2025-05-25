
import EcoMascot from "../../EcoMascot";

const LoadingQuiz = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md flex-1 flex flex-col items-center justify-center">
      <EcoMascot 
        image="/lovable-uploads/f65f8a63-0172-4b0c-9f71-907eb0defff8.png" 
        animation="float"
        size="md"
      />
      <p className="mt-4 text-ecoGreen-dark font-medium">Loading quiz questions...</p>
    </div>
  );
};

export default LoadingQuiz;
