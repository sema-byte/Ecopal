# 🌿 Ecopal Nature Explorer

An interactive wellness platform that promotes child development through AI-powered nature education, combating screen addiction and supporting healthy learning habits for children aged 4-12.

**Target Audience:** Children aged 4-12 years (younger children may need parental guidance)

## 🌟 Features

### 🦊 **EcoBot - Nature Chatbot**
- Interactive AI chatbot specialized in nature topics for kids aged 4-12
- Uses simple vocabulary and engaging emojis
- Provides educational facts with citations
- Remembers conversation context
- Kid-safe responses focused only on nature

### 📰 **Daily Nature Articles**
- Auto-generated educational articles about different nature topics
- Covers 31 different categories (rainforests, animals, weather, etc.)
- Includes fun facts, activities, and real citations
- Changes daily based on calendar
- Written for elementary school reading levels (adjustable complexity)

### 🧩 **Interactive Nature Quiz**
- 5-question quizzes with multiple difficulty levels
- 12 different nature categories
- Immediate feedback with explanations
- Fun facts with educational sources
- **Promotes Mental Wellbeing**: Encourages curiosity and reduces screen anxiety through meaningful nature interactions
- **Supports Healthy Development**: Evidence-based content that promotes cognitive growth and environmental awareness

## 🛠️ Technology Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Lovable** for component creation
- **Lucide React** for icons
- **Sonner** for notifications

### Backend
- **Python 3.8+**
- **Flask** web framework
- **Flask-CORS** for cross-origin requests
- **Perplexity AI API** for content generation
- **python-dotenv** for environment variables

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Python 3.8+
- Perplexity AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sema-byte/Ecopal.git
   cd Ecopal
   ```

2. **Set up the backend**
   ```bash
   # Install Python dependencies
   pip install flask flask-cors python-dotenv requests
   
   # Create environment file
   echo "PERPLEXITY_API_KEY=your_api_key_here" > .env
   ```

3. **Set up the frontend**
   ```bash
   # Install Node.js dependencies
   npm install
   
   # or with yarn
   yarn install
   ```

4. **Get your Perplexity API key**
   - Visit [Perplexity AI](https://www.perplexity.ai/settings/api)
   - Create an account and generate an API key
   - Add it to your `.env` file

### Running the Application

1. **Start the backend server**
   ```bash
   python api.py
   ```
   The Flask server will run on `http://localhost:5000`

2. **Start the frontend** (in a new terminal)
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The React app will run on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to use the application

## 📁 Project Structure

```
ecopal-nature-explorer/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── features/       # Main feature components
│   │   │   ├── ChatBot.tsx
│   │   │   ├── NatureArticle.tsx
│   │   │   └── NatureQuiz.tsx
│   │   └── EcoMascot.tsx
│   ├── lib/
│   │   └── api.ts         # API client functions
│   └── App.tsx            # Main app component
├── ALL.py                 # Core Python logic
├── api.py                 # Flask API server
├── .env                   # Environment variables
└── README.md
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
PERPLEXITY_API_KEY=pplx-your-api-key-here
```

### API Configuration
The application uses the Perplexity `sonar-pro` model for high-quality educational content. You can modify the model and parameters in `ALL.py`:

```python
def call_perplexity_api(messages, model="sonar-pro", temperature=0.7):
    # API configuration
```

## 🎯 Features in Detail

### Nature Categories
The app covers these educational topics:
- **Animals**: Desert Animals, Arctic Wildlife, Ocean Animals, etc.
- **Plants**: Rainforests, Photosynthesis, Seed Dispersal
- **Earth Science**: Volcanoes, Weather Patterns, Rock Cycles
- **Ecosystems**: Coral Reefs, Freshwater Habitats, Migration

### Educational & Wellness Standards
- Content designed to support healthy child development for ages 4-12
- Multiple difficulty levels (very easy, easy, medium)
- Elementary school vocabulary levels
- Real educational sources and citations that build media literacy
- Positive, encouraging messaging for emotional wellbeing
- Safe, non-scary content

## 🔮 Future Features

- **Voice Assistance**: Audio support for reading articles and questions aloud
- **Speech Recognition**: Voice input for chatbot conversations
- **Audio Feedback**: Spoken responses and explanations
- **Accessibility**: Enhanced support for children with reading difficulties

## 🚀 Performance Optimizations

The application includes several performance optimizations:
- Streamlined API calls for faster responses
- Quick response cache for common chat inputs
- Optimized timeout settings
- Fallback responses for reliability
- Reduced conversation history for efficiency

## 🔒 Safety Features

- Kid-safe content filtering
- Nature-only topic restriction
- No violent or scary content
- Educational source citations
- Age-appropriate vocabulary

## 🛠️ Development

### Adding New Features
1. **New Nature Categories**: Add to the `categories` array in `ALL.py`
2. **New Quiz Topics**: Add to `quiz_categories` in the `NatureQuiz` class
3. **UI Components**: Create new React components in `src/components/`

### API Endpoints
- `POST /api/chat` - Chatbot conversations
- `GET /api/article` - Generate nature articles
- `GET /api/quiz?difficulty={level}` - Generate quizzes

### Testing
```bash
# Test the API endpoints
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "isFirstMessage": true}'
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 🐛 Troubleshooting

### Common Issues

**401 Authorization Error**
- Check your Perplexity API key in `.env`
- Ensure the API key is valid and has credits

**CORS Errors**
- Verify Flask-CORS is installed: `pip install flask-cors`
- Check that `CORS(app)` is in your `api.py`

**Slow Responses**
- Check your internet connection
- Consider upgrading your Perplexity plan
- Verify API timeout settings

**Component Import Errors**
- Ensure all React dependencies are installed
- Check file paths in import statements

## 📊 API Usage

The application uses the Perplexity API efficiently:
- **Chat**: ~150 tokens per response
- **Articles**: ~800 tokens per article
- **Quizzes**: ~1500 tokens per quiz

Monitor your API usage through the Perplexity dashboard.

## 🎨 Customization

### Styling
Thanks to Lovable
The app uses Tailwind CSS with custom color schemes:
- `ecoGreen`: Primary nature theme
- `ecoBlue`: Secondary water theme
- `ecoPink`: Accent colors

### Content
Modify prompts in `ALL.py` to adjust:
- Article length and complexity
- Quiz difficulty levels
- Chatbot personality
- Educational focus areas

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with 🌱 for young nature explorers everywhere!
