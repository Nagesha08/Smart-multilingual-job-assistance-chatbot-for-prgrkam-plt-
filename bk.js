// Backend for "Smart Multilingual Job Assistance Chatbot"
// Language: Node.js (Express) + MongoDB (Mongoose)
// Structure shown below as multiple files. Save each section to its own file as indicated.

/* ====== package.json ======
{
  "name": "smart-multilingual-backend",
  "version": "1.0.0",
  "description": "Backend for Smart Multilingual Job Assistance Chatbot",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcrypt": "^5.1.0",
    "body-parser": "^1.20.2",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.4.1",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
*/

/* ====== .env.example ======
PORT=5000
MONGO_URI=mongodb://localhost:27017/smart_chatbot
JWT_SECRET=your_jwt_secret_here
*/

/* ====== server.js ====== */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smart_chatbot', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Mongo connection error:', err);
});

/* ====== models/User.js ====== */
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user','admin'], default: 'user' },
  preferredLanguage: { type: String, default: 'en' }, // e.g. 'en', 'fr', 'hi'
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
}

module.exports = model('User', UserSchema);

/* ====== models/Message.js ====== */
const { Schema, model: model2 } = require('mongoose');

const MessageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  language: { type: String, default: 'en' },
  fromBot: { type: Boolean, default: false },
  metadata: { type: Schema.Types.Mixed },
}, { timestamps: true });

module.exports = model2('Message', MessageSchema);

/* ====== middleware/auth.js ====== */
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '') || req.query.token;
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
}

/* ====== routes/auth.js ====== */
const express2 = require('express');
const router = express2.Router();
const jwt = require('jsonwebtoken');
const User2 = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, preferredLanguage } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    let user = await User2.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });
    user = new User2({ name, email, password, preferredLanguage });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, preferredLanguage: user.preferredLanguage } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User2.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, preferredLanguage: user.preferredLanguage } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

/* ====== routes/chat.js ====== */
const express3 = require('express');
const router3 = express3.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const User3 = require('../models/User');

// Simple: save user message and respond with an echo bot (placeholder for real NLP/LLM integration)
// In production you'd call an NLP/LLM service and optionally a translation API.

router3.post('/message', auth, async (req, res) => {
  try {
    const { text, language } = req.body;
    if (!text) return res.status(400).json({ message: 'No text provided' });

    // Save user message
    const userMessage = new Message({ user: req.user._id, text, language: language || req.user.preferredLanguage, fromBot: false });
    await userMessage.save();

    // Generate bot reply (placeholder)
    const botReplyText = `Echo (${language || req.user.preferredLanguage}): ${text}`;
    const botMessage = new Message({ user: req.user._id, text: botReplyText, language: language || req.user.preferredLanguage, fromBot: true });
    await botMessage.save();

    res.json({ userMessage, botMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get conversation for current user
router3.get('/history', auth, async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user._id }).sort({ createdAt: 1 }).lean();
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router3;

/* ====== README.md ======
# Smart Multilingual Chatbot - Backend

## Overview
Simple backend using Node.js, Express, MongoDB. Provides:
- Register / Login
- Save messages
- Retrieve chat history

## Setup
1. Copy files into a folder.
2. Create `.env` based on `.env.example`.
3. `npm install`
4. `npm run dev` (requires nodemon) or `npm start`

## Extend
- Integrate translation (Google Translate API / LibreTranslate).
- Integrate LLM (OpenAI, Azure) to generate helpful replies.
- Add Socket.IO for real-time chat.
- Add validation, rate-limiting, better error handling, tests.

*/
