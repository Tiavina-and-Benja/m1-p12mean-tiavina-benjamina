const mongoose = require('mongoose');
const { getEnv } = require('./env');

const dbURI = getEnv('MONGO_URI');

// Fonction pour se connecter à la base de données
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
    //   useNewUrlParser: true,   // Pour éviter les avertissements dépréciés
    //   useUnifiedTopology: true // Pour éviter les avertissements dépréciés
    });
    console.log('✅ MongoDB connecté');
  } catch (error) {
    console.log(dbURI)
    console.error('❌ MongoDB connexion échoué:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
