const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    displayPicture: {
        type: String,
        default: null
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: String, // Storing as DD/MM/YYYY string
        required: true,
        match: /^\d{2}\/\d{2}\/\d{4}$/
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other','prefer not to say']
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    maxy_id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    maxy_id_created_at: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true
    },
    terms_accepted: {
        type: Boolean,
        default: false
    },
    terms_accepted_at: {
        type: Date
    },
    terms_version: {
        type: String,
        default: '1.0'
    },
    profile_completed: {
        type: Boolean,
        default: false
    },
    profile_created_at: {
        type: Date,
        default: Date.now
    },
    last_modified: {
        type: Date,
        default: Date.now
    },
    account_status: {
        type: String,
        enum: ['active', 'inactive', 'suspended', 'deleted'],
        default: 'active'
    },
    login_attempts: {
        type: Number,
        default: 0
    },
    last_login: {
        type: Date
    }
}, { 
    timestamps: true,
    toJSON: { 
        transform: function(doc, ret) {
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('User', userSchema);