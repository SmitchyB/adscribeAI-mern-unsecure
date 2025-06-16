// src/InputForm.js
import { useState } from "react";
import "./InputForm.css"; // Import styles for the InputForm component
function InputForm({ onGenerate, isLoading }) {
  const [productName, setProductName] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload on form submit
    onGenerate(productName, keywords);
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g., Espresso Machine"
            disabled={isLoading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="keywords">Keywords</label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., sleek, fast, stainless steel"
            disabled={isLoading}
            required
          />
        </div>
        <button type="submit" className="generate-button" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Description'}
        </button>
      </form>
    </div>
  );
}

export default InputForm;