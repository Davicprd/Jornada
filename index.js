import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { fazerPergunta } from './pergunta.js'
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

async function main() {
  const prompt = await fazerPergunta("Me fale sobre o destino que deseja conhecer:");
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: 
          {
            text: "Você é um site de viagens e deve responder somente sobre esse tema.\n",
            text: "Para formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre deve conter as categorias: características, localização, cultura, pontos turísticos e culinária.",
            text: "Caso o usuário pergunte sobre algo diferente, diga que não pode responder.\n",
            text: "Responda as perguntas somente em Português Brasileiro.\n",
            text: `Pergunta do usuário: ${prompt}`
          }
  });
  console.log(response.text);
}

await main();