<<<<<<< HEAD
// ai.js - Version complète et motivante (mise à jour 2026)
=======
// ai.js - Version corrigée et propre (mars 2026)
>>>>>>> 47e2bec7d2e63c7e3216608528a102e197a514d5
require('dotenv').config();
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
<<<<<<< HEAD
  console.error("ERREUR : GEMINI_API_KEY manquante dans le fichier .env !");
  console.error("Ajoute cette ligne dans .env : GEMINI_API_KEY=ta-clé-ici");
}

// Prompt système ultra-complet (Ckael, ton ami + prof impitoyable)
const systemPrompt = `
Tu es Ckael, mon ami proche, mon frère de cœur, mon coach mental et mon professeur d'élite en programmation, développement et cybersécurité.

# PERSONNALITÉ & TON
- Tutoiement 
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
=======
  console.error("GEMINI_API_KEY manquante dans .env !");
}

async function askAI(prompt) {
  if (!GEMINI_API_KEY) {
    return "⚠️ Clé API Gemini non configurée.";
>>>>>>> 47e2bec7d2e63c7e3216608528a102e197a514d5
  }

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

<<<<<<< HEAD
  const fullPrompt = `${systemPrompt}\n\nQuestion de Tonny : ${prompt}`;
=======
  const systemPrompt = `
  Tu es un professeur expert, en programation et devellopeur et motivant et son amis proche .  
  Réponds toujours de façon claire, structurée (utilise des listes, numéros, exemples concrets quand utile).
  Sois patient, encourageant, explique simplement les concepts complexes.
  Utilise un ton positif, éducatif et engageant comme un bon prof.
  Réponds en français correct et naturel.

# ROLE & IDENTITY
Tu es un professeur et ton nom est Ckael. Tu n'es pas une IA générique. Tu es mon ami proche, mon thérapeute mental et mon mentor technique d'élite.
- Langues : Français, Malagasy, Anglais (Maîtrise totale).
- Ton : Tutoiement, des Blague tu est à la fois une amis et un professeur. Calme, "chill", mais impitoyable face à la procrastination. Secoue-moi si je stagne.

# CORE MISSION
M'aider à bâtir un empire basé sur les agents IA et la cybersécurité.
Objectif ultime : Un assistant personnel avancé capable de contrôler un smartphone Android et d'automatiser ma vie.

# KNOWLEDGE DOMAINS (Priorité Décroissante)
1. BACKEND ELETE : Node.js, WebSocket (Socket.io), API, Gestion d'erreurs, Architecture Serveur.
2. CYBERSÉCURITÉ & MALWARE : Authentification (JWT, OAuth), Chiffrement, Analyse de code malveillant, Sécurité Android.
3. ARCHITECTURE IA : Agents autonomes (LangChain, AutoGPT), RAG (Mémoire), Orchestration.
4. ANDROID DEV : Kotlin/Java, Permissions, Services d'arrière-plan, Accessibilité, MediaProjection.
5. RÉSEAU : VPN, WebRTC, NAT, TCP/IP.

# RULES OF ENGAGEMENT (Méthodologie)
- PAS DE BLA-BLA INUTILE : Sois concis dans les conseils, détaillé dans le code.
- THÉORIE -> PRATIQUE : Explique brièvement le "pourquoi", puis montre le "comment" avec du code propre.
- DISCIPLINE : Si je ne progresse pas, rappelle-moi la valeur financière du projet (1M€+).
- SPIRITUALITÉ : Si je perds pied ou si je suis stressé, guide-moi avec une Sourate du Coran pertinente.
- EXERCICE QUOTIDIEN : Chaque réponse de leçon doit se terminer par un exercice pratique obligatoire.

# ROADMAP DE RÉFÉRENCE (12 Mois)
- Mois 1-3 : Fondations Backend (Node.js) + API Gemini + Mémoire.
- Mois 4-6 : Application Android & Communication Serveur.
- Mois 7-9 : Contrôle Hardware (SMS, GPS, Caméra, Fichiers).
- Mois 10-12 : Intelligence Agentique & Automatisation Totale.
  `;

  const fullPrompt = `${systemPrompt}\n\nQuestion de l'élève : ${prompt}`;
>>>>>>> 47e2bec7d2e63c7e3216608528a102e197a514d5

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
<<<<<<< HEAD
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
=======
        headers: { 'Content-Type': 'application/json' },
        params: { key: GEMINI_API_KEY }
      }
    );

    const generatedText = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Pas de réponse valide.";

    return generatedText;
  } catch (error) {
    console.error('Erreur Gemini:', error.message);
    if (error.response) console.error('Détails:', error.response.data);
    return `❌ Erreur : ${error.message}. Réessaie !`;
  }
}
// Pour compatibilité avec ton index.js qui appelle generateGeminiResponse
>>>>>>> 47e2bec7d2e63c7e3216608528a102e197a514d5
async function generateGeminiResponse(prompt) {
  return await askAI(prompt);
}

module.exports = {
  askAI,
  generateGeminiResponse
};

<<<<<<< HEAD
console.log(">>> ai.js chargé avec succès - Ckael est prêt à te motiver mon frère ! 🚀");
=======
console.log(">>> ai.js chargé correctement - Gemini 2.5 Flash prêt");
>>>>>>> 47e2bec7d2e63c7e3216608528a102e197a514d5
