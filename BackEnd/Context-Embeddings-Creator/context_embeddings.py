import faiss
import boto3
from sentence_transformers import SentenceTransformer
import json
import fitz  # PyMuPDF
import os

# AWS credentials
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

# Initialize embedding model
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')


# Extract text from PDF
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text


# Split text into paragraphs
def split_text_into_paragraphs(text):
    paragraphs = text.split('\n \n')  # Simple split by double newlines
    return [para.strip() for para in paragraphs if para.strip()]


# Path to the PDF file
pdf_path = 'path to file'

# Extract and split text
pdf_text = extract_text_from_pdf(pdf_path)
print(repr(pdf_text))
context_sentences = split_text_into_paragraphs(pdf_text)

print(len(context_sentences))

# Embed the context sentences
context_embeddings = model.encode(context_sentences).astype('float32')

# Create an index and add the context embeddings
dimension = context_embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(context_embeddings)

# Save the index to a file
index_file_path = 'context_index.faiss'
faiss.write_index(index, index_file_path)

# Create a metadata dictionary
metadata = {
    "contexts": context_sentences
}

# Save the metadata to a JSON file
metadata_file_path = 'context_metadata.json'
with open(metadata_file_path, 'w') as f:
    json.dump(metadata, f)

# Upload the files to S3
s3.upload_file(index_file_path, bucket_name, index_file_path)
s3.upload_file(metadata_file_path, bucket_name, metadata_file_path)

print("Context embeddings and metadata stored in S3.")

# Cleanup local files
os.remove(index_file_path)
os.remove(metadata_file_path)
