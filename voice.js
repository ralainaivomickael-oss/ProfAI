const gTTS = require("gtts");
const { exec } = require("child_process");
const path = require("path");

function speak(text) {
  const filePath = path.join(__dirname, "voice.mp3");
  const gtts = new gTTS(text, "fr");

  gtts.save(filePath, function (err) {
    if (err) return console.log("Erreur génération voix :", err);
    console.log("🔊 Voix générée :", text);
    exec(`termux-media-player play ${filePath}`);
  });
}

module.exports = { speak };
