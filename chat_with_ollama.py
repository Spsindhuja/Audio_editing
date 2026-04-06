# chat_with_ollama.py

import ollama # type: ignore

def ask_ollama(prompt, model='mistral'):
    try:
        response = ollama.chat(
            model=model,
            messages=[{"role": "user", "content": prompt}]
        )
        return response['message']['content']
    except Exception as e:
        return f"Error: {e}"

if __name__ == "__main__":
    print("🧠 Ollama Chatbot (type 'exit' to quit)")
    while True:
        user_input = input("\nYou: ")
        if user_input.lower() in ['exit', 'quit']:
            print("Goodbye!")
            break
        answer = ask_ollama(user_input)
        print("\nOllama:", answer)
