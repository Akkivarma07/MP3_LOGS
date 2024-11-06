// product.js
document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = document.getElementById('productPrice').value;
  
    // Vulnerable to XSS if name is not sanitized
    await fetch('http://localhost:8003/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price })
    });
    loadProducts();
  });
  
  async function loadProducts() {
    const response = await fetch('http://localhost:8003/product');
    const products = await response.json();
  
    const productList = document.getElementById('productList');
    productList.innerHTML = products.map(
      (product) => `
        <div class="bg-gray-200 p-4 mb-2 rounded">
          <h4 class="font-semibold">${product.name}</h4>
          <p>${product.description}</p>
          <p>$${product.price}</p>
        </div>`
    ).join('');
  }
  
  loadProducts();
  