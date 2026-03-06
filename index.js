const { generateGeminiResponse } = require('./ai');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Expo Go / React Native
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket'] // plus fiable pour mobile
});

app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
  console.log('🔌 Connexion:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔴 Déconnexion:', socket.id);
  });

  // Handler unique pour les messages
  socket.on('message', async (msg) => {
    console.log('📩 Message reçu de', socket.id, ':', msg.text);

    // Écho pour l'utilisateur
    io.emit('message', {
      sender: msg.sender || 'user1',
      text: msg.text,
      timestamp: new Date().toISOString()
    });

    // Réponse IA
    try {
      const reponse = await generateGeminiResponse(msg.text);
      io.emit('message', {
        sender: 'IA',
        text: reponse,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('Erreur IA:', err);
      io.emit('message', {
        sender: 'IA',
        text: "❌ Désolé, il y a eu une erreur côté IA."
      });
    }
  });
});

server.listen(3000, () => {
  console.log('🚀 Backend MentorAI démarré sur port 3000');
});
