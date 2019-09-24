const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TeamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    members: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    }
});

module.exports = Team = mongoose.model("team", TeamSchema);
