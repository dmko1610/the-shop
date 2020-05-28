const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db =
  "mongodb+srv://dmko1610:ta4Q6ut7ap3wYUv7@trigger-cluster-arnah.gcp.mongodb.net/test?retryWrites=true&w=majority";

const errorController = require("./controllers/error");

const User = require("./models/user");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5ecc13826e467534e18d4db7")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(db)
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
