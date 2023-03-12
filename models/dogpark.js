const mongoose = require('mongoose')

const dogparkSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    // description: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    hours: {type: String, required: true},
    image: [{type: String}],
    rating: {type: Number, required: true},
    comments: {type: String}
}, {timestamps: true})

const Dogpark = mongoose.model('Dogpark', dogparkSchema)
module.exports = Dogpark