import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import EcoMascot from "../EcoMascot";
import { toast } from "sonner";
import { fetchNatureArticle } from "../../lib/api"; // Import the API client

interface NatureArticleProps {
  onBack: () => void;
}

const NatureArticle = ({ onBack }: NatureArticleProps) => {
  const [article, setArticle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [todaysTopic, setTodaysTopic] = useState("Nature");

  useEffect(() => {
    generateArticle();
  }, []);

  const generateArticle = async () => {
    setIsLoading(true);
    
    try {
      // Call the actual API
      const articleContent = await fetchNatureArticle();
      
      // Extract topic from the article title (assuming the first line is the title)
      const firstLine = articleContent.split('\n')[0];
      if (firstLine.startsWith('# ')) {
        const title = firstLine.substring(2).trim();
        // Extract a topic word from the title
        const words = title.split(' ');
        for (const word of words) {
          if (word.length > 3 && !["about", "with", "from", "what", "when", "where", "THE", "AMAZING", "MAGICAL"].includes(word.toUpperCase())) {
            setTodaysTopic(word);
            break;
          }
        }
      }
      
      setArticle(articleContent);
    } catch (error) {
      toast.error("Couldn't load today's article. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const renderArticle = () => {
    if (!article) return null;

    // Simple markdown renderer for demo
    const lines = article.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold text-ecoGreen-dark mb-4">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold text-ecoBlue-dark mt-6 mb-3">{line.substring(3)}</h2>;
      } else if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 mb-2">{line.substring(2)}</li>;
      } else if (line.trim() === '') {
        return <div key={index} className="mb-3"></div>;
      } else {
        return <p key={index} className="mb-3">{line}</p>;
      }
    });
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
        <h2 className="text-2xl font-bold text-ecoBlue-dark">Today's Nature Article</h2>
        <button
          onClick={generateArticle}
          className="eco-button-secondary p-2 rounded-full ml-auto"
          disabled={isLoading}
          aria-label="Refresh article"
        >
          <RefreshCw className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col relative">
        <div className="absolute top-2 right-2 z-10">
          <EcoMascot 
            image="/lovable-uploads/b4310b3b-b786-4def-969c-be3dfd5a4fe0.png" 
            animation="float"
            size="sm"
          />
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-md flex-1 overflow-y-auto border-2 border-ecoGreen-light">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="relative">
                <EcoMascot 
                  image="/lovable-uploads/f65f8a63-0172-4b0c-9f71-907eb0defff8.png" 
                  animation="spin"
                  size="md"
                />
              </div>
              <p className="mt-4 text-ecoGreen-dark font-medium">Loading today's article about {todaysTopic}...</p>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              {renderArticle()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NatureArticle;