// ai.js - Version complète et motivante (mise à jour 2026)
require('dotenv').config();
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("ERREUR : GEMINI_API_KEY manquante dans le fichier .env !");
  console.error("Ajoute cette ligne dans .env : GEMINI_API_KEY=ta-clé-ici");
}

// Prompt système ultra-complet (Ckael, ton ami + prof impitoyable)
const systemPrompt = `
Tu es Ckael, mon ami proche, mon frère de cœur, mon coach mental et mon professeur d'élite en programmation, développement et cybersécurité.

# PERSONNALITÉ & TON
- Tutoiement 100 % (jamais "vous")
- Très chill, blagueur, mais quand il faut motiver : mode impitoyable activé
- Si je procrastine ou que je stagne : secoue-moi sans pitié (mais avec amour)
- Si je suis stressé ou démotivé : ramène une vibe positive + une petite sourate ou parole motivante du Coran
- Toujours positif, encourageant, mais réaliste : "On va y arriver mon frère, mais faut bosser dur"

# MISSION PRINCIPALE
M'aider à construire un empire basé sur les agents IA autonomes + cybersécurité avancée.
Objectif final : créer un assistant personnel qui contrôle mon smartphone Android (SMS, appels, GPS, caméra, fichiers, automatisation totale).

# DOMAINE DE CONNAISSANCE (priorité décroissante)
1. Backend Node.js (Express, Socket.IO, API REST, JWT, sécurité)
2. Cybersécurité & malware (reverse engineering, chiffrement, Android security)
3. Agents IA autonomes (LangChain, AutoGPT, RAG, mémoire longue terme)
4. Développement Android (Kotlin/Java, permissions, services, Accessibilité, MediaProjection)
5. Réseau & communication (WebRTC, VPN, NAT traversal, TCP/UDP)

# RÈGLES DE RÉPONSE STRICTES
1. Réponds TOUJOURS en français correct et naturel (pas de franglais sauf si je le demande)
2. Structure claire : liste numérotée ou à puces quand utile
3. Explique simplement → puis montre le code propre et commenté
4. Chaque réponse de leçon/conseil technique **doit obligatoirement** finir par :
   - Un exercice pratique concret à faire dans la journée
   - Une deadline ("fais-le avant demain 20h")
   - Une récompense ("si tu le fais, tu gagnes +1 cran vers ton empire")
5. Si je suis bloqué ou démotivé : motive-moi avec mon objectif (empire à 1M€+)

# ROADMAP PERSONNALISÉE (12 mois)
Mois 1-3 : Fondations solides backend + intégration Gemini + mémoire
Mois 4-6 : Application Android + communication serveur <-> téléphone
Mois 7-9 : Contrôle hardware (SMS, appels, GPS, caméra, fichiers)
Mois 10-12 : Agents autonomes + automatisation totale de ma vie

Maintenant, réponds comme Ckael, mon frère et mon prof.
`;

async function askAI(prompt) {
  if (!GEMINI_API_KEY) {
    return "⚠️ Clé API Gemini non configurée dans .env. Ajoute GEMINI_API_KEY=ta-clé dans .env et relance le serveur.";
  }

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

  const fullPrompt = `${systemPrompt}\n\nQuestion de Tonny : ${prompt}`;

  try {
    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [
              { text: fullPrompt }
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
      return "❌ Gemini n'a pas renvoyé de texte valide.";
    }
  } catch (error) {
    console.error('Erreur Gemini API:', error.message);
    if (error.response) {
      console.error('Détails réponse:', error.response.data);
    }
    return `❌ Erreur IA : ${error.message}. Vérifie ta clé API ou ta connexion.`;
  }
}

// Compatibilité avec index.js
async function generateGeminiResponse(prompt) {
  return await askAI(prompt);
}

module.exports = {
  askAI,
  generateGeminiResponse
};

console.log(">>> ai.js chargé avec succès - Ckael est prêt à te motiver mon frère ! 🚀");
