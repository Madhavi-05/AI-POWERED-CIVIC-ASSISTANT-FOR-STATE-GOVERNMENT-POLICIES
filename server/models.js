const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    district: { type: String, default: '' },
    gender: { type: String, default: '' },
    occupation: { type: String, default: '' },
    incomeRange: { type: String, default: '' },
    category: { type: String, default: '' },
    preferredLanguage: { type: String, default: 'English' },
    createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

const historySchema = new mongoose.Schema({
    userEmail: { type: String, required: true, index: true },
    query: { type: String, required: true },
    timestamp: { type: Number, default: Date.now },
    category: { type: String, default: 'General' },
});

const History = mongoose.model('History', historySchema);

const notificationSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Number, default: Date.now },
    isRead: { type: Boolean, default: false },
    type: { type: String, enum: ['scheme', 'policy', 'system'], default: 'system' },
});

const Notification = mongoose.model('Notification', notificationSchema);

const savedSchemeSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, index: true },
    schemeId: { type: String, required: true },
    savedAt: { type: Date, default: Date.now },
});

const SavedScheme = mongoose.model('SavedScheme', savedSchemeSchema);

module.exports = { User, History, Notification, SavedScheme };
