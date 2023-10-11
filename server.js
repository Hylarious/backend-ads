require("dotenv").config();
const express = require("express");
const socket = require("socket.io");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

const adsRoutes = require("./routes/ad.routes");
const authRoutes = require("./routes/auth.routes");

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running");
});

const io = socket(server);

const connectToDb = () => {mongoose.connect(
  `mongodb+srv://karolinahyla1:${process.env.DB_PASSWORD}@cluster0.c8sesoa.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to database");
});

db.on("error", (err) => console.log("Error" + err));
}

connectToDb()


app.use(helmet());

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create(mongoose.connection),
    resave: false,
    saveUninitialized: false,
    cookie: {
      // expires: 1000 * 60 *60 * 24,
      secure: process.env.NODE_ENV == "production",
    },
  })
);

app.use((req, res, next) => {
  (req.io = io), next();
});


app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/api/auth", authRoutes);
app.use("/api", adsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});

io.on("connection", (socket) => {
  console.log("User connected");
});

module.exports = server;
