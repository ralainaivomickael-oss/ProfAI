const { askAI } = require('./ai');   // ← ou './ia' si ton fichier s'appelle ia.js
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

io.on('connection', (socket) => {
  console.log('🔌 Connexion:', socket.id);

  socket.on('message', (msg) => {
    console.log('📩 Message reçu de', socket.id, ':', msg.text);
    io.emit('message', msg);  // écho
  });

  socket.on('disconnect', () => {
    console.log('🔴 Déconnexion:', socket.id);
  });

    socket.on('message', async (msg) => { // ← ajoute function après async
  // ton code ici...
  console.log('Message reçu :', msg.text);

  // Écho
  io.emit('message', {
    sender: msg.sender || 'user1',
    text: msg.text,
    timestamp: new Date().toISOString()
  });

  // Réponse IA
  try {
console.log(">>> typeof generateGeminiResponse =", typeof generateGeminiResponse);
console.log(">>> generateGeminiResponse existe ?", !!generateGeminiResponse);

    const reponse = await generateGeminiResponse(msg.text);
    io.emit('message', {
      sender: 'IA',
      text: reponse,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Erreur IA:', err);
    io.emit('message', { sender: 'IA', text: "Désolé, erreur..." });
  }
});
});

server.listen(3000, () => {
  console.log('🚀 Backend MentorAI démarré sur port 3000');
});   // ← parenthèse fermante ICI après le callback

