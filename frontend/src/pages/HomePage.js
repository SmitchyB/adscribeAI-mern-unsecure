// frontend/src/HomePage.js

import axios from 'axios'; // Import axios
import InputForm from '../components/InputForm';
import DescriptionDisplay from '../components/DescriptionDisplay';
import './HomePage.css';
import { useState } from 'react';

function HomePage() {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // State to hold any error messages

  const handleGenerate = async (productName, keywords) => {
    setIsLoading(true);
    setDescription('');
    setError(''); // Clear previous errors

    try {
      // Make a POST request to our backend API
      const response = await axios.post('http://localhost:5001/api/generate', {
        productName,
        keywords,
      });
      
      // Set the description from the backend's response
      if (response.data.description) {
        setDescription(response.data.description);
      }

    } catch (err) {
      // If there's an error, display a message
      console.error("Error calling backend API:", err);
      setError('Sorry, something went wrong. Please try again.');
    } finally {
      // This will run whether the request succeeds or fails
      setIsLoading(false);
    }
  };

  return (
    <div>
      <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
      {/* Pass the error to the display component */}
      <DescriptionDisplay description={description} isLoading={isLoading} error={error} />
    </div>
  );
}

export default HomePage;