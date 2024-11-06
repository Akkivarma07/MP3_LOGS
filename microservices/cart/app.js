const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/cartdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const cartSchema = new mongoose.Schema({
  user: String,
  items: Array
});

const Cart = mongoose.model('Cart', cartSchema);

// CSRF Vulnerability
app.post('/cart/add', async (req, res) => {
  const { user, item } = req.body;
  const cart = await Cart.findOneAndUpdate({ user }, { $push: { items: item } });
  res.send('Item added to cart');
});

// Missing Authorization
app.get('/cart/:user', async (req, res) => {
  const cart = await Cart.findOne({ user: req.params.user }); // No authentication
  res.json(cart);
});

app.listen(8002, () => console.log('Cart service running on port 8002'));
