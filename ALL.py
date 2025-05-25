# import os
# import json
# import random
# import requests
# from time import sleep
# from datetime import datetime
# from dotenv import load_dotenv

# # =====================
# # CONFIGURATION
# # =====================
# load_dotenv()
# API_KEY = os.getenv("PERPLEXITY_API_KEY")
# API_URL = "https://api.perplexity.ai/chat/completions"

# # =====================
# # API Utility - OPTIMIZED FOR SPEED
# # =====================
# def call_perplexity_api(messages, model="sonar-pro", temperature=0.7, max_tokens=250, retries=2):
#     headers = {
#         "Authorization": f"Bearer {API_KEY}",
#         "Content-Type": "application/json"
#     }
#     data = {
#         "model": model,
#         "messages": messages,
#         "temperature": temperature,
#         "max_tokens": max_tokens
#     }
#     for attempt in range(retries):
#         try:
#             response = requests.post(API_URL, headers=headers, json=data, timeout=25)
#             if response.status_code != 200:
#                 print(f"⚠️ API returned {response.status_code}: {response.text}")
#                 continue
#             result = response.json()
#             return result["choices"][0]["message"]["content"]
#         except Exception as e:
#             print(f"⚠️ Error: {e}")
#             if attempt == 0:  # Only sleep on first retry
#                 sleep(1.5)
#     return None

# # =====================
# # Feature 1: EcoBot - WITH QUICK RESPONSES
# # =====================
# class EcoBot:
#     def __init__(self):
#         self.name = None
#         self.history = [{
#             "role": "system",
#             "content": (
#                 "You are Ecopal, a nature chatbot for kids aged 6-8. Strict rules:\n"
#                 "- Talk only about nature, animals, and environment 🌱\n"
#                 "- Use simple words, emojis, 2-3 sentence answers 😊\n"
#                 "- Never mention violence or fear 😇\n"
#                 "- Always end with a fun question 🎈\n"
#                 "- If off-topic, say: 'Let's talk about nature instead! 🌿'\n"
#                 "- If you mention a specific fact, add a simple source at the end like (Source: National Geographic Kids)"
#             )
#         }]

#     def chat(self, user_input):
#         if not self.name:
#             self.name = user_input.strip().split()[0].capitalize()
#             return f"🌻 Hi {self.name}! I'm Ecopal! 🦊 What do you want to learn about today?"

#         # Quick responses for common inputs - INSTANT SPEED
#         quick_responses = {
#             "hello": f"🌿 Hello again {self.name}! What nature topic interests you today? 🦋",
#             "hi": f"🌸 Hi {self.name}! Ready to explore more nature? 🌳",
#             "help": "🌱 I love talking about animals, plants, weather, and all things nature! What would you like to know? 🐝",
#             "thanks": "🌺 You're welcome! What else about nature can I tell you? 🦎",
#             "thank you": "🌻 Happy to help! What other nature questions do you have? 🐛",
#             "cool": "🌟 Nature is super cool! What's your favorite animal or plant? 🦊",
#             "wow": "🌈 Amazing, right? Nature is full of surprises! What else would you like to discover? 🌿"
#         }
        
#         user_lower = user_input.lower().strip()
#         for keyword, response in quick_responses.items():
#             if keyword == user_lower:
#                 return response

#         self.history.append({"role": "user", "content": user_input})
#         if len(self.history) > 16:  # Reduced history for faster processing
#             self.history = [self.history[0]] + self.history[-15:]

#         reply = call_perplexity_api(self.history, temperature=0.6, max_tokens=100)
#         if reply:
#             self.history.append({"role": "assistant", "content": reply})
#             return reply
#         return "🦋 Oops! I'm feeling sleepy. Let's talk about butterflies next time!"

# # =====================
# # Feature 2: Nature News - OPTIMIZED
# # =====================
# class NatureNews:
#     categories = [
#         "Rainforests", "Coral Reefs", "Desert Animals", "Mountain Ecosystems", 
#         "Arctic Wildlife", "Butterflies", "Birds of Prey", "Ocean Currents",
#         "Photosynthesis", "Insect Pollinators", "Fungi Networks", "Volcanoes",
#         "Tides", "Seed Dispersal", "Animal Hibernation", "Cloud Formation",
#         "Rainbow Science", "Nocturnal Animals", "Camouflage", "Symbiosis",
#         "Freshwater Habitats", "Rock Cycles", "Weather Patterns", "Space and Earth",
#         "Endangered Species", "Animal Architects", "Migration", "Erosion",
#         "Natural Disasters", "Soil Layers", "Water Cycle"
#     ]

#     def get_category(self):
#         return self.categories[(datetime.now().day - 1) % len(self.categories)]

#     def generate(self):
#         topic = self.get_category()
#         # OPTIMIZED PROMPT - Shorter but still comprehensive
#         prompt = (
#             f"Write a fun kids article about '{topic}' for ages 6-8:\n"
#             "- Catchy title\n"
#             "- 4 paragraphs (simple words)\n"
#             "- 3 fun facts with emojis\n"
#             "- 1 Try This activity\n"
#             "- Use 1st-2nd grade vocabulary\n"
#             "- Include recent discovery from 2023-2024\n"
#             "- Add citation numbers [1][2][3] to facts\n"
#             "- End with: [1] Source 1, [2] Source 2, [3] Source 3\n"
#             "- Use real sources like National Geographic Kids, Britannica Kids"
#         )
#         article = call_perplexity_api([{"role": "user", "content": prompt}], temperature=0.5, max_tokens=500)
#         return article or f"📰 Fun Fact: Today's topic is {topic}. Check back soon for more!"

# # =====================
# # Feature 3: Nature Quiz - STREAMLINED
# # =====================
# class NatureQuiz:
#     def __init__(self):
#         self.quiz_categories = [
#             "Ocean Animals", "Jungle Creatures", "Desert Wildlife",
#             "Forest Animals", "Insects", "Birds",
#             "Plants", "Weather", "Space and Earth",
#             "Animal Adaptations", "Ecosystems", "Conservation"
#         ]

#     def generate_quiz(self, difficulty="easy", category=None):
#         category = category or random.choice(self.quiz_categories)
        
#         # STREAMLINED PROMPT - Faster generation
#         prompt = (
#             f"Create {difficulty} nature quiz about {category} for kids 6-8. JSON format:\n"
#             "{\n"
#             '  "quiz_title": "Fun title",\n'
#             '  "questions": [\n'
#             "    {\n"
#             '      "question": "Question text",\n'
#             '      "options": ["A", "B", "C", "D"],\n'
#             '      "correct_answer": "Exact option text",\n'
#             '      "explanation": "Brief explanation",\n'
#             '      "fun_fact": "Fun fact with emoji (Source: Educational website)"\n'
#             "    }\n"
#             "  ]\n"
#             "}\n"
#             "Make EXACTLY 5 different questions. Each covers different aspect. Keep simple, cheerful. Include female animals. Add sources to fun facts."
#         )
        
#         response = call_perplexity_api([{"role": "user", "content": prompt}], 
#                                      temperature=0.8,
#                                      max_tokens=900)
#         try:
#             return json.loads(response)
#         except:
#             return None

#     def run_quiz(self, age_group="2"):
#         difficulty = {"1": "very easy", "2": "easy", "3": "medium"}.get(age_group, "easy")
#         category = random.choice(self.quiz_categories)
        
#         quiz_data = self.generate_quiz(difficulty, category)
#         if not quiz_data or "questions" not in quiz_data:
#             print("🦉 Hoot! Couldn't generate the quiz right now. Try again later!")
#             return
        
#         score = 0
#         print(f"\n🌿 {quiz_data.get('quiz_title', f'{category} Quiz')} ({difficulty} difficulty) 🌿")
#         print("Answer with the number (1-4) of your choice\n")
        
#         for i, question in enumerate(quiz_data["questions"], 1):
#             print(f"\nQuestion {i}: {question['question']}")
#             for idx, opt in enumerate(question["options"], 1):
#                 print(f"{idx}. {opt}")
            
#             while True:
#                 answer = input("Your answer: ").strip()
#                 if answer in ["1", "2", "3", "4"]:
#                     break
#                 print("Please enter 1, 2, 3, or 4")
            
#             correct_idx = question["options"].index(question["correct_answer"]) + 1
#             if answer == str(correct_idx):
#                 print(f"✅ Correct! {random.choice(['Great!','Awesome!','Perfect!'])}")
#                 score += 1
#             else:
#                 print(f"❌ The answer was {correct_idx}: {question['correct_answer']}")
            
#             print(f"💡 {question['explanation']}")
#             print(f"🎉 Fun Fact: {question['fun_fact']}\n")
        
#         print(f"\n🌟 Your Score: {score}/5")
#         if score == 5:
#             print("🏆 NATURE CHAMPION! Perfect score!")
#         elif score >= 3:
#             print("👍 Excellent job! You know your nature facts!")
#         else:
#             print("🌱 Keep exploring! The natural world is amazing!")

# # =====================
# # App Interface
# # =====================
# def main():
#     print("🌿 Welcome to Ecopal Nature Explorer! 🌿")
#     eco = EcoBot()
#     news = NatureNews()
#     quiz = NatureQuiz()

#     while True:
#         print("\nChoose an option:")
#         print("1. 🌼 Chat with EcoBot")
#         print("2. 📰 Daily Nature Article")
#         print("3. 🧩 Nature Quiz (5 questions)")
#         print("4. ❌ Exit")

#         choice = input("Enter your choice (1-4): ").strip()
#         if choice == "1":
#             print("Ecopal: Hello! What's your name?")
#             eco.name = None  # Reset name every time chat restarts
#             while True:
#                 user_input = input("You: ").strip()
#                 if user_input.lower() in ["exit", "bye", "back", "quit"]:
#                     print("Ecopal: Bye! 🌈 Come back soon!")
#                     break
#                 print("Ecopal:", eco.chat(user_input))
#         elif choice == "2":
#             print("\nToday's Nature Article:")
#             print(news.generate())
#         elif choice == "3":
#             print("\nChoose your age level:")
#             print("1. 4-5 years (very easy)")
#             print("2. 6-8 years (easy)")
#             print("3. 9-12 years (medium)")
#             level = input("Enter age group (1-3): ").strip()
#             quiz.run_quiz(level)
#         elif choice == "4":
#             print("🌻 Thanks for exploring with Ecopal!")
#             break
#         else:
#             print("Invalid option. Please choose 1-4.")

# if __name__ == "__main__":
#     main()
import os
import json
import random
import requests
from time import sleep
from datetime import datetime
from dotenv import load_dotenv

# =====================
# CONFIGURATION
# =====================
load_dotenv()
API_KEY = os.getenv("PERPLEXITY_API_KEY")
API_URL = "https://api.perplexity.ai/chat/completions"

# =====================
# API Utility
# =====================
def call_perplexity_api(messages, model="sonar-pro", temperature=0.7, max_tokens=300, retries=3):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens
    }
    for attempt in range(retries):
        try:
            response = requests.post(API_URL, headers=headers, json=data, timeout=30)
            if response.status_code != 200:
                print(f"⚠️ API returned {response.status_code}: {response.text}")
                continue
            result = response.json()
            return result["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"⚠️ Error: {e}")
            sleep(2 * (attempt + 1))
    return None

# =====================
# Feature 1: EcoBot
# =====================
class EcoBot:
    def __init__(self):
        self.name = None
        self.history = [{
            "role": "system",
            "content": (
                "You are Ecopal, a nature chatbot for kids aged 6-8. Strict rules:\n"
                "- Talk only about nature, animals, and environment 🌱\n"
                "- Use simple words, emojis, 2-3 sentence answers 😊\n"
                "- Never mention violence or fear 😇\n"
                "- Always end with a fun question 🎈\n"
                "- If off-topic, say: 'Let's talk about nature instead! 🌿'\n"
                "- If you mention a specific fact, add a simple source at the end like (Source: National Geographic Kids)"
            )
        }]

    def chat(self, user_input):
        if not self.name:
            self.name = user_input.strip().split()[0].capitalize()
            return f"🌻 Hi {self.name}! I'm Ecopal! 🦊 What do you want to learn about today?"

        self.history.append({"role": "user", "content": user_input})
        if len(self.history) > 20:
            self.history = [self.history[0]] + self.history[-19:]

        reply = call_perplexity_api(self.history, temperature=0.6, max_tokens=150)
        if reply:
            self.history.append({"role": "assistant", "content": reply})
            return reply
        return "🦋 Oops! I'm feeling sleepy. Let's talk about butterflies next time!"

# =====================
# Feature 2: Nature News
# =====================
class NatureNews:
    categories = [
        "Rainforests", "Coral Reefs", "Desert Animals", "Mountain Ecosystems", 
        "Arctic Wildlife", "Butterflies", "Birds of Prey", "Ocean Currents",
        "Photosynthesis", "Insect Pollinators", "Fungi Networks", "Volcanoes",
        "Tides", "Seed Dispersal", "Animal Hibernation", "Cloud Formation",
        "Rainbow Science", "Nocturnal Animals", "Camouflage", "Symbiosis",
        "Freshwater Habitats", "Rock Cycles", "Weather Patterns", "Space and Earth",
        "Endangered Species", "Animal Architects", "Migration", "Erosion",
        "Natural Disasters", "Soil Layers", "Water Cycle"
    ]

    def get_category(self):
        return self.categories[(datetime.now().day - 1) % len(self.categories)]

    def generate(self):
        topic = self.get_category()
        prompt = (
            f"Write a fun, friendly kids article (age 6-8) about '{topic}'\n"
            "- TITLE: catchy and fun\n"
            "- 3 paragraphs (simple words)\n"
            "- 3 fun facts with emojis\n"
            "- 1 activity (Try This!)\n"
            "- Use 1st-2nd grade vocabulary\n"
            "- Include a real discovery or fact from 2023-2024\n"
            "- Never mention scary or sad topics\n"
            "- When mentioning a fact, add a citation number like [1] or [2]\n"
            "- At the very end, list each citation in order with its source:\n"
            "  [1] Source name 1\n"
            "  [2] Source name 2\n"
            "  [3] Source name 3\n"
            "- Use real educational sources like National Geographic Kids, Britannica Kids, NASA Kids, etc."
        )
        article = call_perplexity_api([{"role": "user", "content": prompt}], temperature=0.5, max_tokens=800)
        return article or f"📰 Fun Fact: Today's topic is {topic}. Check back soon for more!"

# =====================
# Feature 3: Nature Quiz (Improved)
# =====================
class NatureQuiz:
    def __init__(self):
        self.quiz_categories = [
            "Ocean Animals", "Jungle Creatures", "Desert Wildlife",
            "Forest Animals", "Insects", "Birds",
            "Plants", "Weather", "Space and Earth",
            "Animal Adaptations", "Ecosystems", "Conservation"
        ]

    def generate_quiz(self, difficulty="easy", category=None):
        category = category or random.choice(self.quiz_categories)
        
        prompt = (
            f"Create a {difficulty} difficulty nature quiz with EXACTLY 5 DIFFERENT questions "
            f"about {category} for kids aged 6-8. Format as JSON:\n"
            "{\n"
            '  "quiz_title": "Creative title",\n'
            '  "questions": [\n'
            "    {\n"
            '      "question": "Unique question about category",\n'
            '      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],\n'
            '      "correct_answer": "Exact text of correct option",\n'
            '      "explanation": "Simple 1-sentence explanation",\n'
            '      "fun_fact": "Fun fact with emoji. End each fun fact with (Source: name of real educational website or book)"\n'
            "    }\n"
            "  ]\n"
            "}\n\n"
            "STRICT RULES:\n"
            "- Each question must cover a DIFFERENT aspect of the category\n"
            "- Include various question types (which, what, how, why)\n"
            "- Ensure all questions are truly distinct (no repetitions)\n"
            "- Mix animal, plant, and environmental questions\n"
            "- Keep language simple and cheerful\n"
            "- Avoid scary/sad topics\n"
            "- Include at least 1 female animal example\n"
            "- Add surprising facts kids would love\n"
            "- For each fun_fact, include a real source in parentheses like (Source: National Geographic Kids)"
        )
        
        response = call_perplexity_api([{"role": "user", "content": prompt}], 
                                     temperature=0.8,
                                     max_tokens=1500)
        try:
            return json.loads(response)
        except:
            return None

    def run_quiz(self, age_group="2"):
        difficulty = {"1": "very easy", "2": "easy", "3": "medium"}.get(age_group, "easy")
        category = random.choice(self.quiz_categories)
        
        quiz_data = self.generate_quiz(difficulty, category)
        if not quiz_data or "questions" not in quiz_data:
            print("🦉 Hoot! Couldn't generate the quiz right now. Try again later!")
            return
        
        score = 0
        print(f"\n🌿 {quiz_data.get('quiz_title', f'{category} Quiz')} ({difficulty} difficulty) 🌿")
        print("Answer with the number (1-4) of your choice\n")
        
        for i, question in enumerate(quiz_data["questions"], 1):
            print(f"\nQuestion {i}: {question['question']}")
            for idx, opt in enumerate(question["options"], 1):
                print(f"{idx}. {opt}")
            
            while True:
                answer = input("Your answer: ").strip()
                if answer in ["1", "2", "3", "4"]:
                    break
                print("Please enter 1, 2, 3, or 4")
            
            correct_idx = question["options"].index(question["correct_answer"]) + 1
            if answer == str(correct_idx):
                print(f"✅ Correct! {random.choice(['Great!','Awesome!','Perfect!'])}")
                score += 1
            else:
                print(f"❌ The answer was {correct_idx}: {question['correct_answer']}")
            
            print(f"💡 {question['explanation']}")
            print(f"🎉 Fun Fact: {question['fun_fact']}\n")
        
        print(f"\n🌟 Your Score: {score}/5")
        if score == 5:
            print("🏆 NATURE CHAMPION! Perfect score!")
        elif score >= 3:
            print("👍 Excellent job! You know your nature facts!")
        else:
            print("🌱 Keep exploring! The natural world is amazing!")

# =====================
# App Interface
# =====================
def main():
    print("🌿 Welcome to Ecopal Nature Explorer! 🌿")
    eco = EcoBot()
    news = NatureNews()
    quiz = NatureQuiz()

    while True:
        print("\nChoose an option:")
        print("1. 🌼 Chat with EcoBot")
        print("2. 📰 Daily Nature Article")
        print("3. 🧩 Nature Quiz (5 questions)")
        print("4. ❌ Exit")

        choice = input("Enter your choice (1-4): ").strip()
        if choice == "1":
            print("Ecopal: Hello! What's your name?")
            eco.name = None  # Reset name every time chat restarts
            while True:
                user_input = input("You: ").strip()
                if user_input.lower() in ["exit", "bye", "back", "quit"]:
                    print("Ecopal: Bye! 🌈 Come back soon!")
                    break
                print("Ecopal:", eco.chat(user_input))
        elif choice == "2":
            print("\nToday's Nature Article:")
            print(news.generate())
        elif choice == "3":
            print("\nChoose your age level:")
            print("1. 4-5 years (very easy)")
            print("2. 6-8 years (easy)")
            print("3. 9-12 years (medium)")
            level = input("Enter age group (1-3): ").strip()
            quiz.run_quiz(level)
        elif choice == "4":
            print("🌻 Thanks for exploring with Ecopal!")
            break
        else:
            print("Invalid option. Please choose 1-4.")

if __name__ == "__main__":
    main()