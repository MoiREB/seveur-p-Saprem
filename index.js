// Pour supprimer un utilisateur Firebase, nous devons utiliser l'API Admin SDK de Firebase.

const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Convertir la clé JSON stockée en chaîne dans `.env` en objet JavaScript
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);


// Initialiser Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// Middleware pour CORS
app.use(cors()); // Ajout du middleware CORS

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token,Origin, X-Requested-With, Content, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


/**
* Supprime un utilisateur de Firebase Authentication.
* args: uid (string) - L'UID de l'utilisateur à supprimer.
*/
app.post('/deleteUser', async (req, res) => {
  const { uid } = req.body;

  // Vérification que l'UID est bien présent
   if (!uid || typeof uid !== 'string' || uid.trim() === '') {
     return res.status(400).json({ message: 'UID manquant ou invalide' });
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


module.exports = app;
