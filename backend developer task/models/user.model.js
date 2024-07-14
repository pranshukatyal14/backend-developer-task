const mongoose = require('mongoose');


const SubtaskSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['todo', 'in_progress', 'completed'], default: 'todo' },
  deleted: { type: Boolean, default: false },
});

const TaskSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['todo', 'in_progress', 'completed'], default: 'todo' },
  deleted: { type: Boolean, default: false },
  subtasks: [SubtaskSchema],
});

const UserSchema = new mongoose.Schema({
  userId:{type:Number, required:true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tasks: [TaskSchema],
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
