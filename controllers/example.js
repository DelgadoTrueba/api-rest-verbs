"use strict"

var Example = require("../models/example"),
    Verb = require("../models/verb");

function crearExample (req, res){
    
    if(req.body.id && req.body.context && req.body.example){

        var id = req.body.id,
            context = req.body.context,
            example = req.body.example;

        Verb.findByVerbId(id, function(invalido, verb){
            if(invalido){
                res.status(500).send(invalido);
            }
            else{
                var myExample = new Example({
                    verbId: verb._id,
                    context: context,
                    example: example
                })
                
                myExample.save(function(err, savedExample){
                    if(err) res.status(500).send({message: "Error al guardar el ejemplo"});
                    else{
                        //enlazar example con verbo
                        verb.examples.push(savedExample._id);
    
                        verb.save(function(err, data){
                            if(err) res.status(500).send({message: "Error al enlazar el ejemplo con el verbo"});
                            else{
                                res.status(200).send(savedExample);
                            }
                        });
    
                    }
                });
            }
        })
    }
    else{
        res.status(500).send({message: "Faltan parametros: [id] [context] [example]"});
    }     
}

function obtenerExamples (req, res){
    /*
    Example.find({}, function(err, examples){
        if(err) res.status(500).send("Error al obtener los ejemplos");
        else{      
            res.send(examples);
        }
    })
    */
    Example.find({})
    .populate("verbId", {"verb":1})
    .exec(function(err, examples){
        if(err) res.status(500).send("Error al obtener los ejemplos");
        else{      
            res.send(examples);
        }
    })
}

function obtenerExample (req, res){
    /*
    if(req.params.id){
        Example.findOne({"_id": req.params.id}, function(err, example){
            if(err) res.status(500).send("Error al obtener los ejemplos");
            else{       
                res.send(example);
            }
        });
    }
    else{
        res.status(500).send({message: "Faltan parametros: [:id]"})
    }
    */
    if(req.params.id){
        Example.findOne({"_id": req.params.id})
        .populate("verbId", {"verb":1})
        .exec(function(err, example){
            if(err) res.status(500).send("Error al obtener los ejemplos");
            else{       
                res.send(example);
            }
        });
    }
    else{
        res.status(500).send({message: "Faltan parametros: [:id]"})
    }
}

function actualizarExample(req, res){
    var id = req.params.id;
    
        Example.findOne({_id: id}, function(err, foundExample){
            if(err){
                res.status(500).send({message: "Error al buscar el ejemplo"});
            }
            else{
                if(!foundExample){
                    res.status(404).send({message: "Error no existe ese ejemplo"});
                }
                else{
                    if(req.body.context) foundExample.context = req.body.context
                    if(req.body.example) foundExample.example = req.body.example;
                    
                    foundExample.save(function(err, updateExample){
                        if(err){
                            res.status(500).send({message: "Error no se pudo actualizar el ejemplo"});
                        }
                        else{
                            res.send(updateExample);
                        }
                    });
                }
            }
        });
}

function eliminarExample(req, res){
    var id = req.params.id;
    
    Example.findOneAndRemove({_id: id}, function(err){
        if(err){
            return res.status(500).send("No se ha podido eliminar el ejemplo");
        }
        else{
            Verb.findOne({"examples": id},function(err, verb){
                verb.desenlazar(id);
                verb.save(function(err, data){
                    if(err) res.send({message: "Error al desenlazar"});
                    else{
                        res.send();
                    }
                })
            })
        }
    });
}

module.exports = {
    crearExample,
    obtenerExamples,
    obtenerExample,
    actualizarExample,
    eliminarExample
}