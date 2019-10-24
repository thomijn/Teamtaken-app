const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['team-member', 'team-captain', 'admin'],
    default: 'team-member'
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'team',
    default: null
  }
});

module.exports = User = mongoose.model("user", UserSchema);
