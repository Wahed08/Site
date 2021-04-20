const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    details:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    Date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', userSchema);