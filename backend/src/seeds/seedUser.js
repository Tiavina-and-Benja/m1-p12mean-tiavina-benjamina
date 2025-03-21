const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

mongoose.connect("mongodb://localhost:27017/garage-agency", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ Erreur connexion MongoDB:", err));

const profils = ["user", "mecanicien", "manager"];

// Fonction pour générer des utilisateurs aléatoires
const generateUsers = async (count) => {
    const users = [];

    for (let i = 0; i < count; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({ firstName, lastName }).toLowerCase();
        const phone = faker.phone.number("032#######");
        const profil = profils[Math.floor(Math.random() * profils.length)];
        const password = await bcrypt.hash("password123", 10); // Mot de passe sécurisé

        users.push({ first_name: firstName, last_name: lastName, email, phone, password, profil });
    }

    return users;
};

// Insérer les utilisateurs en base
const insertUsers = async () => {
    const users = await generateUsers(100);
    
    try {
        await User.insertMany(users);
        console.log("✅ 100 utilisateurs insérés avec succès !");
    } catch (error) {
        console.error("❌ Erreur lors de l'insertion:", error);
    } finally {
        mongoose.connection.close();
    }
};

insertUsers();
