const mongoose = require('mongoose');

const documentsSchema = mongoose.Schema({
   _id: { type: String, required: true },
   id: { type: String, required: true },
   name: { type: String },
   description: { type: String, required: true },
   url: { type: String },
   children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Documents' }]
});

module.exports = mongoose.model('Documents', documentsSchema);