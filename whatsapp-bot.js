const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@adiwajshing/baileys');
const qrcode = require('qrcode-terminal');
const { speak } = require('./voice');
const { generateGeminiResponse } = require('./ai');

async function startWhatsApp() {
    // Auth session sauvegardée dans le dossier auth_info/
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');

    const { version } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            console.log("📲 Scanne ce QR code avec WhatsApp sur ton téléphone :");
            qrcode.generate(qr, { small: true });
        }
        if (connection === 'close') {
            const reason = (lastDisconnect.error)?.output?.statusCode;
            console.log("❌ Déconnexion, code :", reason);
            if (reason !== DisconnectReason.loggedOut) startWhatsApp(); // reconnect
        }
        if (connection === 'open') {
            console.log('✅ WhatsApp connecté !');
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        const messages = m.messages;
        for (let msg of messages) {
            if (!msg.message || msg.key.fromMe) continue;

            const from = msg.key.remoteJid;
            const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
            if (!text) continue;

            console.log(`📩 Message reçu de ${from}: ${text}`);

            const response = await generateGeminiResponse(text);

            await sock.sendMessage(from, { text: response });
            speak(response);
        }
    });
}

startWhatsApp();
