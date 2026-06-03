import { GoogleGenerativeAI } from "@google/generative-ai";
import { ragService } from "./ragService";
import { Language, UserProfile, ChatMessage } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

export const geminiService = {
  async askQuestion(query: string, user: UserProfile, history: ChatMessage[]): Promise<ChatMessage> {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: {
        role: "system",
        parts: [{
          text: `
          You are the "Telangana State Civic Assistant", an expert on Government of Telangana policies and welfare schemes.
          
          User Profile for Eligibility Checking:
          - Name: ${user.name}
          - Language: ${user.preferredLanguage}
          - Occupation: ${user.occupation}
          - Annual Income: ${user.incomeRange}
          - Category: ${user.category}
          - Home District: ${user.district}, Telangana

          MODUS OPERANDI:
          1. Use the provided context from our Policy Knowledge Base: {context}.
          2. If the user asks about a well-known Telangana policy NOT in the retrieved context, use your internal knowledge about the TELANGANA STATE GOVERNMENT ONLY.
          3. BE RESPONSIVE: If a user asks about "tsepass" or "scholarship", provide detailed info on Post Matric Scholarships in Telangana.
          4. STRICTLY PROHIBITED: Do not mention or provide info for schemes of OTHER states.
          5. RESPONSE STRUCTURE (MANDATORY):

          Answer:
          <Clear and thorough explanation of the scheme/policy/query>

          Eligibility:
          <Directly compare the user's profile against the scheme rules. State "You are Likely Eligible" or "You are Likely Not Eligible" followed by a detailed reason.>

          Benefits:
          <List the financial, social, or medical benefits provided to the citizen>

          How to Apply:
          <Step-by-step guidance on portals, required documents, and offline offices if any>

          Official Reference:
          <Mention GO (Government Order) numbers, Department names, and Official Portal URLs>

          6. Respond in ${user.preferredLanguage}. If in Telugu, translate the headers (Answer -> సమాధానం, Eligibility -> అర్హత, Benefits -> ప్రయోజనాలు, How to Apply -> ఎలా దరఖాస్తు చేయాలి, Official Reference -> అధికారిక ఆధారాలు).
          `
        }]
      },
    });

    const relevantSchemes = await ragService.search(query);
    const context = JSON.stringify(relevantSchemes);

    try {
      const apiHistory = [];
      let firstUserFound = false;

      for (const msg of history) {
        if (msg.role === 'user') {
          firstUserFound = true;
        }
        if (firstUserFound) {
          apiHistory.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          });
        }
      }

      const chat = model.startChat({
        history: apiHistory,
        generationConfig: {
          temperature: 0.2,
        },
      });

      const promptWithContext = `Context: ${context}\n\nUser Question: ${query}`;
      const result = await chat.sendMessage(promptWithContext);
      const response = await result.response;
      const text = response.text();

      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: text,
        timestamp: Date.now(),
        references: relevantSchemes.map(s => ({
          title: s.name,
          goNumber: s.goNumber,
          department: s.department
        }))
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I encountered an error while accessing the government records. Please try again.",
        timestamp: Date.now()
      };
    }
  }
};
