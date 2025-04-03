const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Service = require("../models/Service"); // Assurez-vous que le modèle est bien défini

dotenv.config(); // Charge les variables d'environnement

const services = [
  { name: "Vidange d'huile", price: 50, description: "Changement d'huile moteur avec filtre." },
  { name: "Remplacement des freins", price: 120, description: "Changement des plaquettes et disques de frein." },
  { name: "Alignement des roues", price: 80, description: "Réglage de la géométrie des roues pour éviter l'usure inégale." },
  { name: "Diagnostic moteur", price: 40, description: "Analyse des codes d'erreur et test des capteurs." },
  { name: "Recharge de climatisation", price: 60, description: "Recharge du gaz réfrigérant et vérification du circuit." },
  { name: "Changement de batterie", price: 90, description: "Remplacement et test de la batterie." },
  { name: "Remplacement des bougies", price: 70, description: "Changement des bougies d’allumage pour une meilleure combustion." },
  { name: "Contrôle technique", price: 100, description: "Inspection complète avant passage au contrôle technique." },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connecté à MongoDB");

    await Service.deleteMany(); // Supprime les services existants
    console.log("🗑️ Services existants supprimés");

    await Service.insertMany(services); // Insère les nouveaux services
    console.log("🚀 Services insérés avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors du seed :", error);
  } finally {
    mongoose.disconnect();
  }
};

seedDatabase();
