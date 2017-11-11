"use strict"
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

//ejs
app.set('views', path.resolve(__dirname, "views"));
app.set('view engine', 'ejs');

//cargar rutas
var verb_routes = require("./routes/verb");
var example_routes = require("./routes/example");

//public
app.use('/public', express.static(__dirname + '/public'));

//middlewares de body-parse
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//Configurar Cabeceras y Cors
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Accept-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Aloow", "GET, POST, PUT, DELETE");
    next();
});

//rutas base
app.use("/api/verbs", verb_routes);
app.use("/api/examples", example_routes);

app.get("/home", function(req, res){
    res.render("home");
});

app.get("/home/verbs", function(req, res){
    res.render("verbs");
});
app.get("/home/examples", function(req, res){
    res.render("examples");
});


module.exports = app;