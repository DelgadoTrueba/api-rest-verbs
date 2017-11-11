const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var exampleSchema = new Schema({
    verbId: {type: Schema.Types.ObjectId, ref: "Verb", required: true},
    context: String,
    example: String
});

module.exports = mongoose.model("Example", exampleSchema);