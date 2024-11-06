const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/authdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Weak Password Policy
app.post('/register', async (req, res) => {
  const { username, password } = req.body;  // No password strength validation
  const user = new User({ username, password });
  await user.save();
  res.send('User registered');
});

// Open Redirect
app.get('/redirect', (req, res) => {
  const { url } = req.query;
  res.redirect(url);  // Vulnerable to open redirect
});

app.listen(8001, () => console.log('Auth service running on port 8001'));
