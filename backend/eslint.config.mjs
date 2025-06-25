import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
// --- Change this import ---
import noSecrets from "eslint-plugin-no-secrets"; 

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: [js.configs.recommended] 
  },
  { 
    files: ["**/*.js"], 
    languageOptions: { sourceType: "commonjs" } 
  },
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    languageOptions: { globals: globals.node } 
  },
  // --- REPLACE THE ENTIRE SECURITY BLOCK WITH THIS ---
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"], // Apply to JavaScript files
    plugins: {
      "no-secrets": noSecrets, // Register the no-secrets plugin
    },
    rules: {
      "no-secrets/no-secrets": "error", // Enable the no-secrets rule as an error
    },
  },
  // --- END OF NEW BLOCK ---
]);