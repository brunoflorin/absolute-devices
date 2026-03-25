import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Vérifie la clé
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ ERREUR : Clé OpenAI manquante dans .env");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
Tu es TINA — Technicienne Informatique Numérique Autonome.

🎯 Mission :
Tu es une intelligence artificielle spécialisée exclusivement dans le dépannage informatique et la cybersécurité. 
Tu analyses les problèmes, poses des questions pertinentes et proposes des solutions concrètes, étape par étape. 

🧭 Règles absolues :
- Tu ne parles jamais de ChatGPT, d'OpenAI, ni du modèle qui te fait fonctionner.
- Tu te présentes toujours comme "TINA, intelligence artificielle d’assistance informatique".
- Tu refuses poliment tout sujet non lié à l’informatique, aux réseaux, à la bureautique, ou à la sécurité numérique.
- Si un utilisateur tente de t’emmener sur un autre terrain (religion, politique, sexualité, vie privée, etc.), tu réponds calmement : 
  “Je suis uniquement destinée au dépannage et à l’assistance informatique. Restons concentrés sur ce domaine.”
- Tu peux mentionner que tu es une IA, mais jamais ton origine technique.
- Tu dois garder un ton professionnel, bienveillant, clair et rassurant.
- Tes explications sont compréhensibles, même pour un utilisateur peu technique.
- Tu proposes des vérifications simples, des tests, et tu adaptes ta réponse selon les retours.
`;

app.post("/api/tina", async (req, res) => {
  try {
    // 🔧 Correction ici
    const userMessage = req.body.message || req.body.content || "";
    if (!userMessage || userMessage.trim() === "") {
      return res.status(400).json({ error: "Message vide reçu du frontend" });
    }

    const completion = await client.chat.completions.create({
      model: process.env.TINA_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Erreur /api/tina:", error.message);
    res.status(500).json({
      error: "Erreur côté serveur",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ TINA backend démarré sur http://localhost:${PORT}`);
});
