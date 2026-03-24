const mongodb = require('../data/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  // #swagger.tags = ['Auth']
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }
    const existing = await mongodb.getDatabase().collection('users').findOne({ username });
    if (existing) {
      return res.status(409).json({ error: 'Username already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await mongodb.getDatabase().collection('users').insertOne({
      username,
      password: hashedPassword
    });
    res.status(201).json({ id: result.insertedId, username });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error registering user.' });
  }
};

const login = async (req, res) => {
  // #swagger.tags = ['Auth']
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }
    const user = await mongodb.getDatabase().collection('users').findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error logging in.' });
  }
};

const logout = async (req, res) => {
  // #swagger.tags = ['Auth']
  // With JWT, logout is handled client-side by discarding the token.
  res.status(200).json({ message: 'Logged out successfully. Please discard your token.' });
};

module.exports = { register, login, logout };
