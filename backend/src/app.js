const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("module-alias/register");

const userRoutes = require("@routes/userRoutes");
const authRoutes = require("@routes/authRoutes");
const errorMiddleware = require("@middlewares/errorHandlerMiddleware");
const connectDB = require("@config/db");

const app = express();

connectDB()

// Middlewares globaux
app.use(express.json()); // Pour traiter le JSON
app.use(cors()); // Gérer les CORS
app.use(morgan("dev")); // Logger les requêtes


// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/auth", authRoutes);

// Gestion des erreurs
app.use(errorMiddleware);

module.exports = app;
