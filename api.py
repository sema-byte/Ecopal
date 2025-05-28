# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import json
# from ALL import EcoBot, NatureNews, NatureQuiz

# app = Flask(__name__)
# CORS(app)  # This enables CORS for all routes

# # Initialize our classes
# eco_bot = EcoBot()
# nature_news = NatureNews()
# nature_quiz = NatureQuiz()

# # EcoBot API endpoint
# @app.route('/api/chat', methods=['POST'])
# def chat():
#     data = request.json
#     user_input = data.get('message', '')
    
#     # If this is the first message, we need to set the name
#     if data.get('isFirstMessage', False):
#         eco_bot.name = None  # Reset name for new conversation
    
#     response = eco_bot.chat(user_input)
#     return jsonify({'response': response})

# # Nature News API endpoint
# @app.route('/api/article', methods=['GET'])
# def get_article():
#     article = nature_news.generate()
#     return jsonify({'article': article})

# # Nature Quiz API endpoint
# @app.route('/api/quiz', methods=['GET'])
# def get_quiz():
#     difficulty = request.args.get('difficulty', 'easy')
#     difficulty_map = {
#         "1": "very easy",
#         "2": "easy",
#         "3": "medium"
#     }
#     mapped_difficulty = difficulty_map.get(difficulty, "easy")
    
#     # We'll use a random category
#     quiz_data = nature_quiz.generate_quiz(difficulty=mapped_difficulty)
#     return jsonify(quiz_data)

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from ALL import EcoBot, NatureNews, NatureQuiz

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Initialize our classes
eco_bot = EcoBot()
nature_news = NatureNews()
nature_quiz = NatureQuiz()

# Home page route
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'EcoBot API is running!',
        'version': '1.0',
        'status': 'success',
        'endpoints': {
            'home': '/ (GET)',
            'chat': '/api/chat (POST)',
            'article': '/api/article (GET)', 
            'quiz': '/api/quiz (GET)'
        }
    })

# Health check route
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'message': 'API is working!'})

# EcoBot API endpoint
@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        user_input = data.get('message', '')
        if not user_input:
            return jsonify({'error': 'No message provided'}), 400
        
        # If this is the first message, we need to set the name
        if data.get('isFirstMessage', False):
            eco_bot.name = None  # Reset name for new conversation
        
        response = eco_bot.chat(user_input)
        return jsonify({'response': response, 'status': 'success'})
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

# Nature News API endpoint
@app.route('/api/article', methods=['GET'])
def get_article():
    try:
        article = nature_news.generate()
        return jsonify({
            'article': article, 
            'status': 'success',
            'timestamp': str(datetime.now())
        })
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

# Nature Quiz API endpoint
@app.route('/api/quiz', methods=['GET'])
def get_quiz():
    try:
        difficulty = request.args.get('difficulty', 'easy')
        difficulty_map = {
            "1": "very easy",
            "2": "easy",
            "3": "medium"
        }
        mapped_difficulty = difficulty_map.get(difficulty, "easy")
        
        # We'll use a random category
        quiz_data = nature_quiz.generate_quiz(difficulty=mapped_difficulty)
        
        if quiz_data is None:
            return jsonify({'error': 'Failed to generate quiz', 'status': 'error'}), 500
            
        return jsonify({
            **quiz_data,
            'status': 'success',
            'difficulty': mapped_difficulty
        })
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Endpoint not found',
        'message': 'Please check the API documentation',
        'available_endpoints': [
            '/ (GET)',
            '/health (GET)',
            '/api/chat (POST)',
            '/api/article (GET)',
            '/api/quiz (GET)'
        ]
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': 'Internal server error',
        'message': 'Something went wrong on our end'
    }), 500

# Add missing import for datetime
from datetime import datetime

if __name__ == '__main__':
    app.run(debug=True, port=5000)