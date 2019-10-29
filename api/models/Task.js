const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'team',
        required: true
    },
    executors: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    }
});

module.exports = Task = mongoose.model("task", TaskSchema);