const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type:String, required: true},
    role: {type:String, enum:['admin', 'journalist', 'student'], default:'student', required: true}
})

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        this.password = bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('User', userSchema);