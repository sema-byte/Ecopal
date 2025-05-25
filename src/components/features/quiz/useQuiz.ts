
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { QuizData } from "./types";

export const useQuiz = (initialDifficulty: string = "2") => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [difficulty, setDifficulty] = useState<string>(initialDifficulty);

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
      // Simulate API call - in a real app this would call the Perplexity API
      setTimeout(() => {
        // Sample quiz data for demo
        const sampleQuiz: QuizData = {
          quiz_title: "Amazing Ocean Animals Quiz",
          questions: [
            {
              question: "Which ocean animal is the biggest?",
              options: ["Shark", "Blue Whale", "Dolphin", "Octopus"],
              correct_answer: "Blue Whale",
              explanation: "Blue whales are the largest animals ever to live on Earth!",
              fun_fact: "🐋 A blue whale's heart is as big as a small car!"
            },
            {
              question: "What do sea otters do to keep from floating away while sleeping?",
              options: ["Hold onto rocks", "Sleep on the beach", "Hold hands with other otters", "Attach to seaweed"],
              correct_answer: "Hold hands with other otters",
              explanation: "Sea otters hold hands (called rafting) while sleeping so they don't drift apart.",
              fun_fact: "🦦 Sea otters have the thickest fur of any animal!"
            },
            {
              question: "How many arms does an octopus have?",
              options: ["Four", "Six", "Eight", "Ten"],
              correct_answer: "Eight",
              explanation: "Octopuses have eight arms that they use to move and grab things.",
              fun_fact: "🐙 Octopuses can change color in less than a second!"
            },
            {
              question: "What helps fish breathe underwater?",
              options: ["Lungs", "Gills", "Nose", "Scales"],
              correct_answer: "Gills",
              explanation: "Fish use gills to take oxygen from the water.",
              fun_fact: "🐠 Some fish can breathe air AND water!"
            },
            {
              question: "Which female ocean animal is a better hunter than the male?",
              options: ["Dolphin", "Shark", "Whale", "Anglerfish"],
              correct_answer: "Anglerfish",
              explanation: "Female anglerfish are much bigger and hunt using a glowing lure on their head.",
              fun_fact: "🎣 Female anglerfish can be 10 times bigger than males!"
            }
          ]
        };
        
        setQuizData(sampleQuiz);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast.error("Couldn't load the quiz. Please try again!");
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

  return {
    quizData,
    isLoading,
    currentQuestion,
    selectedOption,
    isCorrect,
    score,
    quizComplete,
    difficulty,
    generateQuiz,
    handleOptionSelect,
    handleDifficultyChange
  };
};
