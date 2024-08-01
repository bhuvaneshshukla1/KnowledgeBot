import json
import faiss
import boto3
from sentence_transformers import SentenceTransformer
from flask import Flask, request, jsonify

app = Flask(__name__)

# Global variables to cache the model, FAISS index, and metadata
model = None
faiss_index = None
context_metadata = None

# Initialize the S3 client
aws_access_key_id = 'aws-access-key'
aws_secret_access_key = 'aws-secret-access-key'
aws_region = 'aws-region'

# Initialize the S3 client with credentials
s3 = boto3.client(
    's3',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=aws_region
)
bucket_name = 'vector-db-data-items'  # Replace with your S3 bucket name


def load_model():
    global model
    if model is None:
        model = SentenceTransformer('paraphrase-MiniLM-L6-v2')


def load_faiss_index():
    global faiss_index
    if faiss_index is None:
        s3.download_file(bucket_name, 'context_index.faiss', 'context_index.faiss')
        faiss_index = faiss.read_index('context_index.faiss')
    return faiss_index


def load_context_metadata():
    global context_metadata
    if context_metadata is None:
        s3.download_file(bucket_name, 'context_metadata.json', 'context_metadata.json')
        with open('context_metadata.json', 'r') as f:
            context_metadata = json.load(f)
    return context_metadata


@app.route('/query', methods=['POST'])
def query_endpoint():
    data = request.json
    query = data.get('query')
    history = data.get('history')

    if not query or not history:
        return jsonify({'error': 'Query and history are required'}), 400

    load_model()
    index = load_faiss_index()
    metadata = load_context_metadata()
    query_embedding = model.encode(query).astype('float32')
    distances, indices = index.search(query_embedding.reshape(1, -1), k=5)
    context_texts = [metadata['contexts'][idx] for idx in indices[0]]
    print(context_texts)
    print(len(context_texts))
    print(history)
    return jsonify({'response': context_texts[0]})


if __name__ == '__main__':
    app.run(host='localhost', port=8081, debug=True)
