import { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please upload a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Extracted Resume Data:", response.data);
      alert("Signup successful! Check console for extracted details.");

    } catch (error) {
      alert("Error extracting resume details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6">Signup</h1>
        
        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            className="border p-2 rounded"
          />

          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            className="border p-2 rounded"
          />

          <input 
            type="file" 
            accept=".pdf,.docx" 
            onChange={handleFileChange} 
            className="border p-2 rounded"
          />

          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
