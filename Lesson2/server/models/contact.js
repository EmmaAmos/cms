const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
   _id: { type: String, required: true },
   id: { type: String, required: true },
   name: { type: String },
   email: { type: String, required: true },
   phone: { type: String, required: true },
   imageUrl: { type: String, required: true },
   group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

module.exports = mongoose.model('Contact', contactSchema);