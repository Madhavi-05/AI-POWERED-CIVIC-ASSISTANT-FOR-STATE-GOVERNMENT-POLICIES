require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, History, Notification, SavedScheme } = require('./models');
const authMiddleware = require('./authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
    res.json({ message: 'AI-POWERED CIVIC ASSISTANT Backend is running' });
});

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, district, gender, occupation, incomeRange, category, preferredLanguage } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ name, email, password, district, gender, occupation, incomeRange, category, preferredLanguage });
        await user.save();

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name, email, district, gender, occupation, incomeRange, category, preferredLanguage } });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, district: user.district, gender: user.gender, occupation: user.occupation, incomeRange: user.incomeRange, category: user.category, preferredLanguage: user.preferredLanguage } });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Protected Profile Routes
app.get('/api/user/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.put('/api/user/profile', authMiddleware, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, { $set: req.body }, { new: true }).select('-password');
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// History Routes
app.get('/api/history', authMiddleware, async (req, res) => {
    try {
        const history = await History.find({ userEmail: req.user.email }).sort({ timestamp: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/history', authMiddleware, async (req, res) => {
    try {
        const { query, category } = req.body;
        const newHistory = new History({ userEmail: req.user.email, query, category });
        await newHistory.save();
        res.json(newHistory);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Notifications Routes
app.get('/api/notifications', authMiddleware, async (req, res) => {
    try {
        const notifications = await Notification.find({ userEmail: req.user.email }).sort({ timestamp: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.put('/api/notifications/:id/read', authMiddleware, async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
        res.json({ message: 'Notification marked as read' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Saved Schemes Routes
app.get('/api/saved-schemes', authMiddleware, async (req, res) => {
    try {
        const saved = await SavedScheme.find({ userEmail: req.user.email });
        res.json(saved.map(s => s.schemeId));
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/saved-schemes/toggle', authMiddleware, async (req, res) => {
    try {
        const { schemeId } = req.body;
        const existing = await SavedScheme.findOne({ userEmail: req.user.email, schemeId });
        if (existing) {
            await SavedScheme.deleteOne({ _id: existing._id });
            res.json({ saved: false });
        } else {
            const newSaved = new SavedScheme({ userEmail: req.user.email, schemeId });
            await newSaved.save();
            res.json({ saved: true });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
