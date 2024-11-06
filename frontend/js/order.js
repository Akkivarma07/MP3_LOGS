// order.js
document.getElementById('createOrderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
  
    // Vulnerable to NoSQL injection if not sanitized
    await fetch('http://localhost:8004/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });
    loadOrders();
  });
  
  async function loadOrders() {
    const response = await fetch('http://localhost:8004/order');
    const orders = await response.json();
  
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = orders.map(
      (order) => `
        <div class="bg-gray-200 p-4 mb-2 rounded">
          <h4 class="font-semibold">Order for: ${order.username}</h4>
        </div>`
    ).join('');
  }
  
  loadOrders();
  