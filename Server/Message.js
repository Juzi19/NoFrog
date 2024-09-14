const mongoose = require('mongoose');
//Mongoose Schema für Kommunikation

const messageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//Eine Klasse, welche auf dem obigen Datenschema basiert um Daten zu speichern und abzurufen
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;