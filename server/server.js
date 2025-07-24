const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.config");
const authRoutes = require("./routes/auth.routes");
const path = require("path");

//env load
dotenv.config();

const app = express();

// Connect to DB
connectDB();

app.use(express.json());

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("signup", { title: "Welcome to My App" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
