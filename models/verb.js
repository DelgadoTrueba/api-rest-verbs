const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var verbSchema = new Schema({
  verb : String,
  past_tense: String,
  past_participle: String,
  topic: String,
  examples: [{type: Schema.Types.ObjectId, ref: "Example"}]
});

verbSchema.statics.findByVerbId = function(id, callback){

    this.findById(id, function(err, verb){
      if(err){
          var my_err = {};
          my_err.message = "Error al buscar el verbId";
          callback(my_err);
      }
      else{
          if(!verb){
              var my_err = {};
              my_err.message = "No existe verbId:"+id;
              callback(my_err);
          }
          else{
            callback(null, verb); //ok
          }
      }
    });

}

verbSchema.methods.desenlazar = function(id){

    this.examples =this.examples.filter(function(exampleId){
    	return exampleId.toString() !== id;
    });
    
}


module.exports = mongoose.model("Verb", verbSchema);