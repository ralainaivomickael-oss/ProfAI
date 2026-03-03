const fs = require('fs');
const path = require('path');
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

function readDB(file) {
    const filePath = path.join(DATA_DIR, `${file}.json`);
    if (!fs.existsSync(filePath)) return {};
    return JSON.parse(fs.readFileSync(filePath, 'utf8') || '{}');
}

function writeDB(file, data) {
    const filePath = path.join(DATA_DIR, `${file}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readDB, writeDB };
