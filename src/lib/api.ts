// api.ts
// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : 'https://ecopal-production-2d9d.up.railway.app/api';



export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

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

// EcoBot Chat API
export const sendChatMessage = async (message: string, isFirstMessage: boolean = false): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, isFirstMessage }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

// Nature News API
export const fetchNatureArticle = async (): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/article`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    
    const data = await response.json();
    return data.article;
  } catch (error) {
    console.error('Error fetching nature article:', error);
    throw error;
  }
};

// Nature Quiz API
export const fetchNatureQuiz = async (difficulty: string): Promise<QuizData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz?difficulty=${difficulty}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch quiz');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching nature quiz:', error);
    throw error;
  }
};
