const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db.config");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Connect to DB
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
