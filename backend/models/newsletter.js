const mongoose = require('mongoose');

const newsletterSchema = mongoose.Schema({
    title: {type:String, required: true},
    content: {type:String, required: true},
    author: {type: String, default: 'Anonymous'},
    createAt: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Newsletter', newsletterSchema);