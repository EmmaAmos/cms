/* my origenal code
const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   value: { type: Number, required: true },
});

module.exports = mongoose.model('sequences', sequenceSchema);
*/

//robo code
const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  maxDocumentId: {type: Number, required: true},
  maxMessageId: {type: Number, required: true},
  maxContactId: {type: Number, required: true},
});

module.exports = mongoose.model('Sequence', sequenceSchema);