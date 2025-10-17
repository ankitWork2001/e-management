import React, { useState } from "react";
import axios from "axios";

const DocumentUpload = () => {
  const [files, setFiles] = useState({
    resume: null,
    idCard: null,
    offerLetter: null,
    certificate: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleUpload = async () => {
    const formData = new FormData();
    Object.keys(files).forEach((key) => {
      if (files[key]) formData.append(key, files[key]);
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/documents/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage(res.data.message);
      console.log(res.data.files);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "2px 2px 10px #aaa" }}>
      <h2>Upload Your Documents</h2>

      <div className="pt-3" style={{ marginBottom: "10px" }}>
        <input type="file" name="resume"  placeholder=" Resume" onChange={handleChange} />
        <label> Resume</label>
      </div>

      <div className="pt-3" style={{ marginBottom: "10px" }}>
        <input type="file" name="idCard" placeholder="Upload Id" onChange={handleChange} />
        <label> ID Card</label>
      </div>

      <div className="pt-3" style={{ marginBottom: "10px" }}>
        <input type="file" name="offerLetter" placeholder="Offer Letter" onChange={handleChange} />
        <label> Offer Letter</label>
      </div>

      <div className="pt-3" style={{ marginBottom: "10px" }}>
        <input type="file" name="certificate" placeholder="Certificate" onChange={handleChange} />
        <label> Certificate</label>
      </div>

      <button onClick={handleUpload} style={{ padding: "10px 20px", marginTop: "10px", cursor: "pointer" }}>Upload</button>

      {message && <p style={{ marginTop: "15px", color: "green" }}>{message}</p>}
    </div>
  );
};

export default DocumentUpload;
