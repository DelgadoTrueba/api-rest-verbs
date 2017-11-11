"use strict"

var express = require("express"),
    api = express.Router(),
    VerbController = require("../controllers/verb");

api.get("/", VerbController.obtenerVerbs);
api.get("/:id", VerbController.obtenerVerb);
api.post("/", VerbController.crearVerb);
api.put("/:id", VerbController.actualizarVerb);
api.delete("/:id", VerbController.eliminarVerb);

module.exports = api;