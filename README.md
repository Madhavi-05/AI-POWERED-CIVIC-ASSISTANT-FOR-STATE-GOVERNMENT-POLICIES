# AI-POWERED CIVIC ASSISTANT FOR STATE GOVERNMENT POLICIES

An intelligent, interactive government policy assistant designed to bridge the gap between complex state government schemes and citizens. Leveraging Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG), the system provides personalized, accurate, and easy-to-understand information about various government initiatives, tailored to the user's demographic profile (e.g., district, occupation, income, gender).

## Introduction

Finding and understanding government welfare schemes can be challenging due to bureaucratic language, fragmented web portals, and complex eligibility criteria. This platform simplifies the process by offering:
- **Natural Language Interaction:** Users can ask questions about policies in plain language and receive clear, conversational answers.
- **Retrieval-Augmented Generation (RAG):** The system searches a comprehensive, vetted knowledge base of government schemes to construct factual, hallucination-free responses using the Google Gemini model.
- **Demographic Personalization:** The assistant automatically analyzes user profile attributes (such as gender, occupation, and income range) to recommend relevant schemes and determine eligibility.
- **Secure Portal:** Secure user registration, authentication, dashboard statistics, personalized alerts, and conversation history persistence.

## Technologies Used

- **Frontend:**
  - React.js (Vite)
  - TypeScript
  - Tailwind CSS & Lucide Icons
  - React Router
- **Backend:**
  - Node.js & Express.js
  - JSON Web Tokens (JWT) & bcrypt for secure authentication
- **Database:**
  - MongoDB & Mongoose
- **AI & RAG Layer:**
  - Google Gemini API (`gemini-embedding-001` & `gemini-1.5-flash`)
  - Client-side in-memory vector storage for policy search context retrieval

## Run Locally

### Prerequisites
- Node.js installed on your computer
- MongoDB instance (Atlas or local community edition)
- A Google Gemini API key

### 1. Frontend Setup
1. From the project root directory, install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

### 2. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add your database configuration, JWT secret, and port:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_uri_here
   JWT_SECRET=your_jwt_secret_token_here
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

Open your browser and navigate to the local address provided by the frontend server (typically `http://localhost:5173`) to view and interact with the application.
