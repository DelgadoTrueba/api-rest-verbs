"use strict"

var express = require("express"),
    api = express.Router(),
    ExampleController = require("../controllers/example");

api.get("/", ExampleController.obtenerExamples);
api.get("/:id", ExampleController.obtenerExample);
api.post("/", ExampleController.crearExample);
api.put("/:id", ExampleController.actualizarExample);
api.delete("/:id", ExampleController.eliminarExample);

module.exports  = api;