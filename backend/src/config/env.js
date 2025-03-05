require('dotenv').config();

// Vérifier si toutes les variables d'environnement nécessaires sont présentes
const requiredEnvVars = [
  'MONGO_URI'
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Error: Variable d'environnement manquant: ${envVar}`);
    process.exit(1); 
  }
});

// Fonction pour obtenir une variable d'environnement
const getEnv = (key) => {
  return process.env[key];
};

module.exports = {
  getEnv
};
