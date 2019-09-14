const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    team: {
        type: {
            type: Schema.Types.ObjectId,
            ref: 'team'
        },
        required: true
    },
    executors: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    }
});

module.exports = User = mongoose.model("task", TaskSchema);