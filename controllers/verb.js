"use strict"

var Verb = require("../models/verb");
var Example = require("../models/example");


function crearVerb (req, res){

    if(req.body.verb && req.body.past_tense && req.body.past_participle){

        var verb = req.body.verb,
            past = req.body.past_tense,
            participle = req.body.past_participle;

        var myVerb = new Verb({
            verb : verb,
            past_tense: past,
            past_participle: participle,
        })

        if(req.body.topic) myVerb.topic = req.body.topic;
        
        myVerb.save(function(err, savedVerb){
            if(err) res.send({message: "Este verbo ya existe"});
            else{
                res.send(savedVerb);
            }
        });
    }
    else{
        res.status(500).send({message: "Faltan parametros: [verb] [past] [participle]"})
    }
}

function obtenerVerbs (req, res){
    Verb.find({}).
    populate("examples", { 'context': 1, 'example': 1}).
    populate("tags", "tag").
    select({ "__v": 0}).
    exec(function(err, verbs){
        if(err) res.send(err);
        else{
            res.send(verbs);
        }
    });
}

function obtenerVerb (req, res){
    if(req.params.id){
        Verb.findOne({"_id": req.params.id}).
        populate("examples", { 'context': 1, 'example': 1}).
        populate("tags", "tag").
        select({ "__v": 0}).
        exec(function(err, verbs){
            if(err) res.send(err);
            else{
                res.send(verbs);
            }
        });
    }
    else{
        res.status(500).send({message: "Faltan parametros: [:id]"})
    }
}

function actualizarVerb(req, res){
    var id = req.params.id;
    
        Verb.findOne({_id: id}, function(err, foundVerb){
            if(err){
                res.status(500).send({message: "Error al buscar el verbo"});
            }
            else{
                if(!foundVerb){
                    res.status(404).send({message: "Error no existe ese verbo"});
                }
                else{
                    if(req.body.verb){
                        var verb = req.body.verb;
                        if(verb) foundVerb.verb = verb;
                    }
                    if(req.body.past_tense){
                        var past = req.body.past_tense;
                        if(past) foundVerb.past_tense = past;
                    }
                    if(req.body.past_participle){
                        var participle = req.body.past_participle;
                        if(participle) foundVerb.past_participle = participle;
                    }
                        
                    if(req.body.topic) foundVerb.topic = req.body.topic;
                    
                    foundVerb.save(function(err, updateVerb){
                        if(err){
                            res.status(500).send({message: "Error no se pudo actualizar el verbo"});
                        }
                        else{
                            res.send(updateVerb);
                        }
                    });
                }
            }
        });
}

function eliminarVerb(req, res){
    
    var id = req.params.id;
        
    Verb.findOneAndRemove({_id: id}, function(err){
        if(err){
            return res.status(500).send("No se ha podido eliminar el verbo");
        }
        else{
            Example.remove({"verbId": id}, function(err){
                if(err) res.status(500).send("No se ha podido eliminar los ejemplos");
                else res.status(200).send();
            }) ;
        }
    }); 
}


module.exports = {
    crearVerb,
    obtenerVerbs,
    obtenerVerb,
    actualizarVerb,    
    eliminarVerb
}