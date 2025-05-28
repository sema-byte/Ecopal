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
import os
from ALL import EcoBot, NatureNews, NatureQuiz

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Initialize our classes
eco_bot = EcoBot()
nature_news = NatureNews()
nature_quiz = NatureQuiz()

# EcoBot API endpoint
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get('message', '')
    
    # If this is the first message, we need to set the name
    if data.get('isFirstMessage', False):
        eco_bot.name = None  # Reset name for new conversation
    
    response = eco_bot.chat(user_input)
    return jsonify({'response': response})

# Nature News API endpoint
@app.route('/api/article', methods=['GET'])
def get_article():
    article = nature_news.generate()
    return jsonify({'article': article})

# Nature Quiz API endpoint
@app.route('/api/quiz', methods=['GET'])
def get_quiz():
    difficulty = request.args.get('difficulty', 'easy')
    difficulty_map = {
        "1": "very easy",
        "2": "easy",
        "3": "medium"
    }
    mapped_difficulty = difficulty_map.get(difficulty, "easy")
    
    # We'll use a random category
    quiz_data = nature_quiz.generate_quiz(difficulty=mapped_difficulty)
    return jsonify(quiz_data)

# Health check endpoint (useful for deployment)
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({'status': 'EcoBot API is running!', 'version': '1.0'})

if __name__ == '__main__':
    # For production deployment
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)