const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.config");
const authRoutes = require("./routes/auth.routes");
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const session = require("express-session");
const defaultSession = require("./utils/session");

//env load
dotenv.config();

const app = express();

// Connect to DB
connectDB();

app.use(express.json());

// 1. LiveReload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
liveReloadServer.watch(path.join(__dirname, "views"));

// 2. Middleware for injecting livereload script
app.use(connectLivereload());

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Session middleware
app.use(
  session({
    secret: "your-random-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// 👇 Initialize default session object if missing
app.use((req, res, next) => {
  if (!req.session.sessionData) {
    req.session.sessionData = JSON.parse(JSON.stringify(defaultSession));
  }
  next();
});

// 👇 Make session data available to all EJS views
app.use((req, res, next) => {
  res.locals.session = req.session.sessionData;
  next();
});

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("signup", { session: req.session.sessionData.defaultSession });
});

//Notify browser on change
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
