const fs = require('fs');

const log = (msg) => {
  fs.appendFileSync(
    'service-start.log',
    `[${new Date().toISOString()}] ${msg}\n`
  );
};

process.on('uncaughtException', err => {
  log('UNCAUGHT EXCEPTION');
  log(err.stack || err);
});

process.on('unhandledRejection', err => {
  log('UNHANDLED REJECTION');
  log(err);
});

log('Server script loaded');


const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Chemin vers le build Vite
const distPath = path.join(__dirname, "frontend", "dist");

// Fichiers statiques
app.use(express.static(distPath));

// Fallback React Router (SPA)
app.get('/*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Écoute réseau (obligatoire pour accès externe + service)
const server = app.listen(PORT, "0.0.0.0", () => {
  log(`Absolute Devices en ligne sur le port ${PORT}`);
});

// Garde le process vivant explicitement
server.on('error', err => {
  log('SERVER ERROR');
  log(err);
});
