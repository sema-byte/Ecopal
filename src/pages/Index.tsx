
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import EcoMascot from "@/components/EcoMascot";
import ChatBot from "@/components/features/ChatBot";
import NatureArticle from "@/components/features/NatureArticle";
import NatureQuiz from "@/components/features/NatureQuiz";
import { Flower, Heart, Earth } from "lucide-react";

type Feature = "home" | "chat" | "article" | "quiz";

const Index = () => {
  const [currentFeature, setCurrentFeature] = useState<Feature>("home");
  
  const renderContent = () => {
    switch (currentFeature) {
      case "chat":
        return <ChatBot onBack={() => setCurrentFeature("home")} />;
      case "article":
        return <NatureArticle onBack={() => setCurrentFeature("home")} />;
      case "quiz":
        return <NatureQuiz onBack={() => setCurrentFeature("home")} />;
      default:
        return renderHomeContent();
    }
  };
  
  const renderHomeContent = () => (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-ecoGreen-dark mb-3">
            Welcome to Ecopal!
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl">
            Learn amazing facts about plants, animals, and our beautiful planet 
            through fun chats, articles, and quizzes!
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <EcoMascot 
            image="/lovable-uploads/c6cc0559-a3f8-4ca2-9bca-b1a8efacdf50.png" 
            animation="float"
            size="xl"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <FeatureCard 
          title="Chat with EcoBot" 
          icon={<Earth className="text-ecoGreen" />}
          color="green"
          onClick={() => setCurrentFeature("chat")}
        >
          <p className="text-gray-600 mb-4">
            Have fun conversations about nature, animals, and the environment with your friendly EcoBot assistant!
          </p>
          <div className="mt-auto flex justify-center">
            <EcoMascot 
              image="/lovable-uploads/61f2961c-1cb9-4bd8-a747-c44309ebcd40.png" 
              animation="float"
              size="md"
            />
          </div>
          <button className="eco-button-primary w-full mt-4">Start Chatting</button>
        </FeatureCard>
        
        <FeatureCard 
          title="Nature Article" 
          icon={<Flower className="text-ecoBlue" />}
          color="blue"
          onClick={() => setCurrentFeature("article")}
        >
          <p className="text-gray-600 mb-4">
            Read today's exciting article about animals, plants, and amazing discoveries in the natural world!
          </p>
          <div className="mt-auto flex justify-center">
            <EcoMascot 
              image="/lovable-uploads/bd60f35c-11d9-4c41-ab36-114f52bb6f99.png" 
              animation="float"
              size="md"
            />
          </div>
          <button className="eco-button-secondary w-full mt-4">Read Article</button>
        </FeatureCard>
        
        <FeatureCard 
          title="Nature Quiz" 
          icon={<Heart className="text-ecoPink" />}
          color="pink"
          onClick={() => setCurrentFeature("quiz")}
        >
          <p className="text-gray-600 mb-4">
            Test your knowledge with fun quizzes about animals, plants, and our amazing planet Earth!
          </p>
          <div className="mt-auto flex justify-center">
            <EcoMascot 
              image="/lovable-uploads/bd1e5b19-46ad-465d-bbca-d381f8cddc13.png" 
              animation="float"
              size="md"
            />
          </div>
          <button className="eco-button-accent w-full mt-4">Take Quiz</button>
        </FeatureCard>
      </div>
    </>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container max-w-6xl mx-auto px-4 py-6 flex-1">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
