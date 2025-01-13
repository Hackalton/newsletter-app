const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const journalistSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type:String, required: true},
    role: {type:String, enum:['journalist'], default:'journalist', required: true},
    
})


journalistSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    if(this.isModified('password')){
        console.log('isModified') //return the immediate above two lines here
    }
    next();
});

journalistSchema.methods.comparePassword = async function(password){
    console.log('this is the password in the user.js model: ' + password) //tester
    console.log('plain password: ' + password); //tester
    console.log('this.password: ' + this.password); //tester
    return bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('Journalist', journalistSchema);