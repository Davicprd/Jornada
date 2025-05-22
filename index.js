import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { fazerPergunta } from './pergunta.js'
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

async function main() {
  const userInput = await fazerPergunta("Me fale sobre o destino que deseja conhecer:");
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: 
          {
            text:
              "Você é um site de viagens e deve responder somente sobre esse tema.\n" +
              "Caso o usuário pergunte sobre algo diferente, diga que não pode responder.\n" +
              "Responda as perguntas somente em Português Brasileiro.\n" +
              `Pergunta do usuário: ${userInput}`
          }
  });
  console.log(response.text);
}

await main();