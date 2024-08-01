from flask import Flask, request, jsonify
import ollama

app = Flask(__name__)


@app.route('/chat', methods=['POST'])
def chat():
    input_data = request.json
    content = input_data.get('content', '')

    stream = ollama.chat(
        model='llama3.1',
        messages=[{'role': 'user', 'content': content}],
        stream=True,
    )

    response_content = ''
    for chunk in stream:
        response_content += chunk['message']['content']

    return jsonify({'response': response_content})


if __name__ == '__main__':
    app.run(debug=True)
