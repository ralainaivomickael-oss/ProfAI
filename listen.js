const { exec } = require("child_process");

function listen(callback) {
  exec("termux-speech-to-text", (error, stdout) => {
    if (error) return console.log("Erreur micro :", error);
    if (!stdout || stdout.trim() === "") return console.log("Aucun texte détecté");

    try {
      const result = JSON.parse(stdout);
      if (result.text) callback(result.text);
      else console.log("Micro actif mais aucun texte reconnu");
    } catch (err) {
      console.log("Erreur JSON :", err);
      console.log("Sortie brute :", stdout);
    }
  });
}

module.exports = { listen };
