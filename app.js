require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
var dns = require("dns");
const validUrl = require("valid-url");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(
  process.env["MONGO_URL"],
  { useNewUrlParser: true,useUnifiedTopology: true  }
);

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

let shortnerSchema = new Schema({
  long: { type: String, required: true },
  short: { type: String, required: true },
});

let Shortener = mongoose.model("Shortener", shortnerSchema);

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/shorturl/:id", async (req, res) => {
  var shortenerId = req.params.id;

  if (Number.isInteger(parseInt(shortenerId))) {

    try{
        let  data = await Shortener.find({ short: parseInt(shortenerId) })
        res.redirect(data[0].long)
    }catch(error){
        res.json("not refering to a URL in db");
    }    
  }else{
    res.json("Please enter a valid ID")
  }
});

app
  .route("/api/shorturl")
  .post((req, res) => {
    var paramURL = req.body.url;

    let hostname = paramURL.replace("https://", "").replace("http://", "");

    hostname = hostname.split("/")[0];

    dns.lookup(hostname, function (err, addresses, family) {
      if (addresses != undefined) {

        Shortener.countDocuments({}, function (err, count) {
          let newPlace = count + 1;
          let newShort = Shortener({
            long: paramURL,
            short: newPlace,
          });

          newShort.save(function (err, data) {
            if (err) return console.log(err);

            res.json({
              original_url: paramURL,
              short_url: newPlace,
            });
          });
        });
      } else {
        console.log("I am dead");
        res.json({ error: "invalid URL" });
      }
    });
  });


mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to the database');
});

// Handle connection errors
mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
});

// Handle process termination and close Mongoose connection
function gracefulShutdown(signal) {
    console.log(`Received ${signal}. Closing Mongoose connection...`);
    mongoose.connection.close(() => {
        console.log('Mongoose connection closed.');
        process.exit(0);
    });
}

// Handle various termination signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2')); // For nodemon

module.exports = app;
