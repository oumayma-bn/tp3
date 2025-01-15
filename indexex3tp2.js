const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Utiliser body-parser pour analyser le corps des requêtes JSON
app.use(bodyParser.json());

// Route POST pour tester la validation de l'âge
app.post('/check-age', (req, res) => {
  res.send('L\'âge est valide.');
});

// Middleware pour valider l'âge
const validateAge = (req, res, next) => {
    // Extraire 'age' du corps de la requête
    const { age } = req.body;
  
    // Vérifier si 'age' est défini et si sa valeur est négative
    if (age !== undefined && age < 0) {
      // Si l'âge est négatif, créer une erreur
      const error = new Error("L'âge ne peut pas être négatif.");
      error.status = 400;  // Définir un code d'état HTTP 400 pour indiquer une mauvaise demande
      return next(error);  // Passer l'erreur au middleware de gestion des erreurs
    }
  
    // Si l'âge est valide (pas négatif), appeler 'next()' pour passer à la prochaine étape (la route)
    next();
  };
  


  // Utiliser le middleware `validateAge` pour la route POST /check-age
app.post('/check-age', validateAge, (req, res) => {
    res.send('L\'âge est valide.');
  });
  


  
// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
  });
  