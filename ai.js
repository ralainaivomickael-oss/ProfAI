// ai.js
require('dotenv').config();
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function askAI(prompt) {
    if (!GEMINI_API_KEY) {
        return "⚠️ Clé API Gemini non configurée dans le fichier .env";
    }

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

    try {
        const response = await axios.post(
            url,
            {
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    key: GEMINI_API_KEY
                }
            }
        );

        const generatedText = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (generatedText) {
            return generatedText;
        } else {
            return "❌ Gemini n'a pas renvoyé de texte valide";
        }
    } catch (error) {
        console.error('Erreur Gemini API:', error.message);
        if (error.response) {
            console.error('Détails réponse:', error.response.data);
        }
        return `❌ Erreur IA: ${error.message}`;
    }
}

module.exports = { askAI };
