const {Schema, model} = require('mongoose');

const taskSchema = new Schema(
    {
    user :{type: Schema.Types.ObjectId, ref: 'User', required: true},    
    title:{type: String, required: true, trim: true},
    completed:{type: Boolean, default: false},
    },

    {timestamps: true}

);

module.exports = model('Task', taskSchema);