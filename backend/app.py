import re
import spacy
import docx2txt
import PyPDF2
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

nlp = spacy.load("en_core_web_sm")

skill_keywords = {"Python", "Java", "C++", "JavaScript", "React", "Node.js", "SQL", "HTML", "CSS", "Machine Learning", "AI"}

def extract_text_from_pdf(pdf_file):
    text = ""
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    for page in pdf_reader.pages:
        text += page.extract_text() + "\n"
    return text

def extract_text_from_docx(docx_file):
    return docx2txt.process(docx_file)

def extract_details(text):
    doc = nlp(text)

    name = next((ent.text for ent in doc.ents if ent.label_ == "PERSON"), "Not Found")
    email = re.search(r"[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+", text)
    phone = re.search(r"\b\d{10,12}\b", text)
    skills = list({token.text for token in doc if token.text in skill_keywords})

    extracted_data = {
        "name": name,
        "email": email.group(0) if email else "Not Found",
        "phone": phone.group(0) if phone else "Not Found",
        "skills": skills if skills else ["Not Found"]
    }

    print("Extracted Resume Data:", extracted_data)  # Logs data to the console
    return extracted_data

@app.route("/upload", methods=["POST"])
def upload_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["resume"]
    file_type = file.filename.split(".")[-1]

    text = extract_text_from_pdf(file) if file_type == "pdf" else extract_text_from_docx(file) if file_type == "docx" else ""
    
    if not text:
        return jsonify({"error": "Unsupported file format"}), 400

    extracted_info = extract_details(text)
    return jsonify(extracted_info)

if __name__ == "__main__":
    app.run(debug=True)
