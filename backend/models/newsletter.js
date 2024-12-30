const mongoose = require('mongoose');

const newsletterSchema = mongoose.Schema({
    title: {type:String},
    content: {type:String, required: true}
});
module.exports = new newsletterSchema('Newsletter', newsletterSchema);