# InputValid-mern-secure - Node.js/Express Secure Build (Insecure Secrets Management)

This repository houses a specific application build that is part of a larger comparative study, "Evaluating the Effectiveness of Secure Coding Practices Across Python, Node.js, and .NET 8." The experiment systematically assesses how secure coding techniques mitigate critical web application vulnerabilities—specifically improper input validation, insecure secrets management, and insecure error handling—across these three diverse development stacks. Through the development of paired vulnerable and secure application versions, this study aims to provide empirical evidence on the practical effectiveness of various security controls and the impact of architectural differences on developer effort and overall security posture.

## Purpose
This particular build contains the **Secure Build** of the Node.js/Express application, specifically designed to demonstrate robust secure coding practices for **Insecure Secrets Management**.

## Vulnerability Focus
This application build specifically addresses the mitigation of:
* **Insecure Secrets Management:** Ensuring sensitive information (secrets) are handled securely without being hardcoded or exposed in the source code.

## Key Secure Coding Practices Implemented
* **Externalized Secrets Management with Environment Variables:** The OpenAI API key, a sensitive credential, is no longer hardcoded within the source file. Instead, it is loaded at application startup from a `.env` file using the `dotenv` package (`require('dotenv').config();`). The key is then accessed securely via `process.env.OPENAI_API_KEY`. This ensures the secret is kept out of the codebase and version control.
* **Runtime Key Verification:** The application explicitly checks if the API key is successfully loaded (`if (!OPENAI_API_KEY)`) before attempting to use it. If the key is missing, a `500 Internal Server Error` is returned with a non-descriptive message (`OpenAI API key is not configured.`) to prevent information leakage, guiding administrators to a configuration issue rather than a code problem.

## Setup and Running the Application

### Prerequisites
* Node.js (LTS recommended) and npm (Node Package Manager).
* **OpenAI API Key (for testing functionality):** You will need a valid OpenAI API key to make successful API calls.
* **Create a `.env` file:** In the same directory as `server.js`, create a file named `.env` and add your API key:
    ```
    OPENAI_API_KEY="YOUR_ACTUAL_OPENAI_API_KEY_HERE"
    ```
    (Replace `"YOUR_ACTUAL_OPENAI_API_KEY_HERE"` with your actual key). **Do NOT commit this `.env` file to version control.**

### Steps
1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    # Navigate to the specific build folder, e.g.:
    cd InputValid-dotnet-secure/nodejs/secure-secrets-management # Assuming this is Node.js's backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
    This will install `express`, `cors`, and `dotenv`.
3.  **Run the application:**
    ```bash
    node server.js
    ```
    The application will typically start on `http://localhost:5001`.

## API Endpoints

### `POST /api/generate`
* **Purpose:** Generates a product description by calling an external AI API (OpenAI). This secure build retrieves the API key from environment variables, demonstrating secure secrets management.
* **Method:** `POST`
* **Content-Type:** `application/json`
* **Request Body Example (JSON):**
    ```json
    {
      "productName": "Smart Watch",
      "keywords": "fitness tracking, long battery life, stylish"
    }
    ```
* **Expected Behavior:**
    * **With Valid API Key (in `.env` file):** Returns `200 OK` with a generated product description.
    * **Without API Key (missing from `.env` file):** Returns `500 Internal Server Error` with the message "OpenAI API key is not configured.".
    * **With Invalid API Key (in `.env` file):** Returns `500 Internal Server Error` with a generic error message, and an internal log of the OpenAI API error.

## Static Analysis Tooling
This specific build is designed to be analyzed by Static Analysis Security Testing (SAST) tools such as Semgrep and ESLint-Security (if configured) to measure their detection capabilities for **insecure secrets management** (e.g., hardcoded secrets) and to verify compliance with secure coding standards.
