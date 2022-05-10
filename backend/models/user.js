//model schema for user
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');



const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    role: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
});

//virtual field
userSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv4();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

module.exports = mongoose.model('User', userSchema);