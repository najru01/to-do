const {Schema, model} = require('mongoose');

const taskSchema = new Schema(
    {
    title:{type: String, required: true, trim: true},
    completed:{type: Boolean, default: false},
    },

    {timestamps: true}

);

module.exports = model('Task', taskSchema);