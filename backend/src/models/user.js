const {Schema , model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
    {
    username:{type: String, required: true, trim: true, unique: true},
    email:{type: String, required: true, trim: true, unique: true, lowercase: true},
    password:{type: String, required: true, minlength: 6}
    },
    {timestamps: true}
);

// Hash password before saving the user
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();

})

// Method to compare password
userSchema.methods.comparePassword = function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
}

module.exports = model('User', userSchema);