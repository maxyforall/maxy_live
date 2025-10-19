import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    displayPicture: { type: String, default: null },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dateOfBirth: { type: String, required: true, match: /^\d{2}\/\d{2}\/\d{4}$/ },
    gender: { type: String, required: true, enum: ['male', 'female', 'other', 'prefer not to say'] },
    emailId: { type: String, required: true, unique: true, lowercase: true, trim: true },

    // ===== Email verification fields =====
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },

    maxy_id: { type: String, required: true, unique: true, index: true },
    maxy_id_created_at: { type: Date, default: Date.now },
    password: { type: String, required: true },
    terms_accepted: { type: Boolean, default: false },
    terms_accepted_at: { type: Date },
    terms_version: { type: String, default: '1.0' },
    profile_completed: { type: Boolean, default: false },
    profile_created_at: { type: Date, default: Date.now },
    last_modified: { type: Date, default: Date.now },
    account_status: { type: String, enum: ['active', 'inactive', 'suspended', 'deleted'], default: 'active' },
    login_attempts: { type: Number, default: 0 },
    last_login: { type: Date },

    // Products user has access to
    products: { type: [String], default: [] }

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

// =======================
// INSTANCE METHODS
// =======================

// Add a product access
userSchema.methods.addProduct = async function(productId) {
    if (!this.products.includes(productId)) {
        this.products.push(productId);
        await this.save();
        return true; // product added
    }
    return false; // product already existed
};

// Remove a product access
userSchema.methods.removeProduct = async function(productId) {
    if (this.products.includes(productId)) {
        this.products = this.products.filter(p => p !== productId);
        await this.save();
        return true; // product removed
    }
    return false; // product did not exist
};

// Check if user has access to a product
userSchema.methods.hasProduct = function(productId) {
    return this.products.includes(productId);
};

const User = mongoose.model('User', userSchema);

export default User;



// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     displayPicture: {
//         type: String,
//         default: null
//     },
//     firstName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     dateOfBirth: {
//         type: String, // Storing as DD/MM/YYYY string
//         required: true,
//         match: /^\d{2}\/\d{2}\/\d{4}$/
//     },
//     gender: {
//         type: String,
//         required: true,
//         enum: ['male', 'female', 'other','prefer not to say']
//     },
//     emailId: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//         trim: true
//     },
//     maxy_id: {
//         type: String,
//         required: true,
//         unique: true,
//         index: true
//     },
//     maxy_id_created_at: {
//         type: Date,
//         default: Date.now
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     terms_accepted: {
//         type: Boolean,
//         default: false
//     },
//     terms_accepted_at: {
//         type: Date
//     },
//     terms_version: {
//         type: String,
//         default: '1.0'
//     },
//     profile_completed: {
//         type: Boolean,
//         default: false
//     },
//     profile_created_at: {
//         type: Date,
//         default: Date.now
//     },
//     last_modified: {
//         type: Date,
//         default: Date.now
//     },
//     account_status: {
//         type: String,
//         enum: ['active', 'inactive', 'suspended', 'deleted'],
//         default: 'active'
//     },
//     login_attempts: {
//         type: Number,
//         default: 0
//     },
//     last_login: {
//         type: Date
//     }
// }, { 
//     timestamps: true,
//     toJSON: { 
//         transform: function(doc, ret) {
//             delete ret.password;
//             delete ret.__v;
//             return ret;
//         }
//     }
// });

// const User = mongoose.model('User', userSchema);

// export default User;
