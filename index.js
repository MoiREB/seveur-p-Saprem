// server.js

const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

/*
// Charger les variables d'environnement
dotenv.config();

// Convertir la clé JSON stockée en chaîne dans `.env` en objet JavaScript
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);


// Initialiser Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

*/

const app = express();
//const port = 3000;

/*
// Middleware pour CORS
app.use(cors()); // Ajout du middleware CORS

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());
*/

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token,Origin, X-Requested-With, Content, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


  app.use((req, res) => {
    res.json({ message: "UPDATE !" });
 });

// Endpoint pour supprimer un utilisateur
app.post('/deleteUser', async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ message: 'UID manquant' });
  }

  try {
    await admin.auth().deleteUser(uid);
    console.log(`Utilisateur ${uid} supprimé avec succès.`);
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
  }
});

/*app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});*/

module.exports = app;
