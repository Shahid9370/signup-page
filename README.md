# Signup Page - Backend Installation

This project sets up the **backend** for the **Signup Page**, built using **Flask**. It includes an API for handling resume uploads and extracting relevant details like Name, Email, Phone, and Skills from **PDF** and **DOCX** files.

## Prerequisites

1. **Clone the GitHub Repository**

   ```bash
   git clone <your-repo-url>
   cd backend
   ```

2. **Install Python 3.10** (Required)

   - Download **Python 3.10** from the Microsoft Store.
   - Set the Python path after installation:
     ```
     C:\Users\User\AppData\Local\Microsoft\WindowsApps
     ```
     Add this to your system's `PATH` environment variable.

3. **Verify Python Installation**

   ```bash
   python --version
   ```

   Expected Output:

   ```
   Python 3.10.x
   ```

## Setup Virtual Environment (Recommended)

1. **Create Virtual Environment**

   ```bash
   python -m venv venv
   ```

2. **Activate Virtual Environment**

   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **Mac/Linux:**
     ```bash
     source venv/bin/activate
     ```

## Install Dependencies

Once the virtual environment is activated, install the required dependencies:

```bash
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

cd frontend
npm install

### `requirements.txt` (Included in the repository)

```txt
Flask
Flask-CORS
spacy
PyPDF2
docx2txt
```

## Running the Project

Start the Flask backend server:

```bash
python app.py
```

By default, the server runs at: `http://127.0.0.1:5000/`

## Notes

- This backend is **only compatible with Python 3.10**.
- Ensure **Microsoft Store installation path** is set in environment variables if installed from there.
- `venv` folder should not be pushed to GitHub due to its large size.

## Contribution

Feel free to fork and improve the project. Contributions are welcome!

---

Developed by **Shahid Shaikh** 🚀
