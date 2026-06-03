import { GoogleGenerativeAI } from "@google/generative-ai";
import { SCHEMES } from "../constants";
import { Scheme } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

interface VectorDocument {
  scheme: Scheme;
  embedding: number[];
}

class RAGService {
  private vectorStore: VectorDocument[] = [];
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;

    // Use gemini-embedding-001 which is confirmed working for this key
    const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

    for (const scheme of SCHEMES) {
      const textToEmbed = `${scheme.name} ${scheme.description} ${scheme.eligibilityCriteria.join(' ')} ${scheme.categoryTags.join(' ')}`;
      try {
        const result = await model.embedContent(textToEmbed);

        if (result.embedding?.values) {
          this.vectorStore.push({
            scheme,
            embedding: result.embedding.values
          });
        }
      } catch (error) {
        console.error(`Error embedding scheme ${scheme.id}:`, error);
      }
    }

    this.isInitialized = true;
    console.log("RAG Service Initialized with", this.vectorStore.length, "documents");
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  async search(query: string, limit: number = 3): Promise<Scheme[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    try {
      const result = await model.embedContent(query);

      const queryEmbedding = result.embedding?.values;
      if (!queryEmbedding) return SCHEMES.slice(0, limit);

      const scores = this.vectorStore.map(doc => ({
        scheme: doc.scheme,
        score: this.cosineSimilarity(queryEmbedding, doc.embedding)
      }));

      return scores
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(s => s.scheme);
    } catch (error) {
      console.error("Error during RAG search:", error);
      return SCHEMES.slice(0, limit);
    }
  }
}

export const ragService = new RAGService();
