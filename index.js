const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const path = require("path");
const albumRoutes = require("./routes/album.routes");

const app = express();

// connection plus création de la BDD si elle n'est pas créer 
mongoose.connect("mongodb://127.0.0.1/phototeque");

// permet de gérer les donneés envoyer par l'utilisateur (form etc...)
app.use(express.urlencoded({ extended: false }));
// permet de gérer les formulaire envoyé en format json
app.use(express.json());
// sert a gérer les image inserer dans notre form
app.use(fileUpload());
// sert à notifier à notre application qu'on utilise le framwork ejs
app.set("view engine", "ejs");
// sert à notifier a notre appliaction dans qu'elle dossier ce trouve nos fichier html
app.set("views", path.join(__dirname, "views"));
// sert à notifier a notre appliaction dans qu'elle dossier ce trouve nos fichier static (img, vidéo etc...)
app.use(express.static("public"));

// permet d'utiliser les session via le package npm-session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "_Pg=b$u>zh.)39Vr",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.get("/", (req, res) => {
  res.redirect("/albums");
});

app.use("/", albumRoutes);

app.use((req, res) => {
  res.status(404);
  res.send("page non trouvé");
});
//  permet de gérer les erreur via notre helpers pour eviter que notre serveur crash
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500);
  // 500 = erreur serveur
  res.send("Errur interne du serveur");
});

app.listen(3000, () => {
  console.log("Application lancée sur le port 3000");
});
