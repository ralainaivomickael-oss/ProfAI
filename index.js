const { askAI } = require('./ai');   // ou './ia' si ton fichier s'appelle ia.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { readDB, writeDB } = require('./database');
const { generateGeminiResponse } = require('./ai');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",                 // Autorise Expo Go, navigateur, etc.
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket']      // Force WebSocket (plus fiable)
});

app.use(express.json());
app.use(cors());

// Route de test (optionnel)
app.get('/', (req, res) => {
  res.send('Backend MentorAI est en ligne 🚀');
});

io.on('connection', (socket) => {
  console.log('🔌 Connexion:', socket.id);

  // UN SEUL listener pour 'message' – tout est ici
socket.on('message', async (msg) => {
  // Sécurité : ignorer les messages vides ou mal formés
  if (!msg || !msg.text || msg.text.trim() === '') {
    console.log('Message vide ou invalide ignoré');
    return;
  }

  console.log('📩 Message reçu de', socket.id, ':', msg.text);

  // 1. ÉCHO IMMÉDIAT du message utilisateur (pour que tout le monde le voie)
  io.emit('message', {
    sender: msg.sender || 'user1',
    text: msg.text,
    timestamp: new Date().toISOString()
  });

  // 2. Réponse de l'IA (seulement si le message n'est pas vide)
  try {
    const reponse = await generateGeminiResponse(msg.text.trim());

    io.emit('message', {
      sender: 'IA',
      text: reponse,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Erreur IA:', err.message || err);
    io.emit('message', {
      sender: 'IA',
      text: "Désolé, je rencontre un petit problème technique... Réessaie dans un instant ! 😅",
      timestamp: new Date().toISOString()
    });
  }
});
  socket.on('disconnect', () => {
    console.log('🔴 Déconnexion:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('🚀 Backend MentorAI démarré sur port 3000');
});
