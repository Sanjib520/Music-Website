const express = require('express');
const path = require('path');
const app = express();
const mongoose = require("mongoose");

const bodyparser = require('body-parser');

mongoose.connect("mongodb://localhost/contactMusic", { useNewUrlParser: true });
const port = 8000;

// Define moongoose schema i.e the formats of the data
var contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  des: String,
});

var Contact = mongoose.model("Contact", contactSchema);


// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // For Serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); //Set the template engine as pug
app.set("views", path.join(__dirname, "views")); //Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
  const params = { };
  res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.get("/about", (req, res) => {
  const aboutMe = { };
  res.status(200).render("about.pug", aboutMe);
});

app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(() => {
    res.send("Details have been saved, Thank you...")
  }).catch(() => {
    res.status(400).send("Sorry, details have not been saved...")
  });

  //res.status(200).render("contact.pug");
});

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});

