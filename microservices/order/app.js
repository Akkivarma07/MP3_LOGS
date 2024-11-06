const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/productdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

const Product = mongoose.model('Product', productSchema);

// Vulnerable to SQL Injection
app.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }); // Vulnerable
    res.json(product);
  } catch (error) {
    res.status(500).send('Error retrieving product');
  }
});

// Vulnerable to XSS
app.post('/product', async (req, res) => {
  const { name, description, price } = req.body;
  const product = new Product({ name, description, price });
  await product.save();
  res.send(`Product created: <script>alert('${name}')</script>`);
});

app.listen(8004, () => console.log('Product service running on port 8004'));
