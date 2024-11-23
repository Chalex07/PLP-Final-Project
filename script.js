// // Fetch analytics data
// fetch('http://localhost:3010/analytics')
//   .then((response) => response.json())
//   .then((data) => {
//     document.getElementById('totalVendors').textContent = data.totalVendors;
//     document.getElementById('totalAgents').textContent = data.totalAgents;
//     document.getElementById('totalDeliveries').textContent = data.totalDeliveries;
//   });

// // Fetch and display vendors
// const vendorTableBody = document.querySelector('#vendorTable tbody');

// function loadVendors() {
//   fetch('http://localhost:3010/vendors')
//     .then((response) => response.json())
//     .then((data) => {
//       vendorTableBody.innerHTML = '';
//       data.forEach((vendor) => {
//         const row = `
//           <tr>
//             <td>${vendor.VendorID}</td>
//             <td>${vendor.VendorName}</td>
//             <td>${vendor.VendorContact}</td>
//             <td>
//               <button onclick="deleteVendor(${vendor.VendorID})">Delete</button>
//             </td>
//           </tr>
//         `;
//         vendorTableBody.innerHTML += row;
//       });
//     });
// }

// // Add a new vendor
// document.getElementById('vendorForm').addEventListener('submit', (event) => {
//   event.preventDefault();
//   const vendorName = document.getElementById('vendorName').value;
//   const vendorContact = document.getElementById('vendorContact').value;

//   fetch('http://localhost:3010/vendors', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ VendorName: vendorName, VendorContact: vendorContact }),
//   }).then(() => {
//     loadVendors();
//     document.getElementById('vendorForm').reset();
//   });
// });

// // Delete a vendor
// function deleteVendor(id) {
//   fetch(`http://localhost:3010/vendors/${id}`, { method: 'DELETE' }).then(() => {
//     loadVendors();
//   });
// }


// // Fetch and display customers
// function loadCustomers() {
//   fetch('http://localhost:3010/customers')
//     .then((response) => response.json())
//     .then((data) => {
//       const tableBody = document.querySelector('#customerTable tbody');
//       tableBody.innerHTML = '';
//       data.forEach((customer) => {
//         const row = `
//           <tr>
//             <td>${customer.CustomerID}</td>
//             <td>${customer.CustomerName}</td>
//             <td>${customer.CustomerContact}</td>
//             <td>
//               <button onclick="deleteCustomer(${customer.CustomerID})">Delete</button>
//             </td>
//           </tr>
//         `;
//         tableBody.innerHTML += row;
//       });
//     });
// }

// // Add a new customer
// document.getElementById('customerForm').addEventListener('submit', (event) => {
//   event.preventDefault();
//   const name = document.getElementById('customerName').value;
//   const contact = document.getElementById('customerContact').value;

//   fetch('http://localhost:3010/customers', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ CustomerName: name, CustomerContact: contact }),
//   }).then(() => {
//     loadCustomers();
//     document.getElementById('customerForm').reset();
//   });
// });

// // Delete a customer
// function deleteCustomer(id) {
//   fetch(`http://localhost:3010/customers/${id}`, { method: 'DELETE' }).then(() => {
//     loadCustomers();
//   });
// }

// // Repeat similar logic for Deliveries and Products


// // Initial load
// loadVendors();

// Base API URL
const BASE_URL = "http://localhost:3010";

// Helper function to fetch and display data
async function fetchData(endpoint, tableId) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  const data = await response.json();
  const tableBody = document.querySelector(`#${tableId} tbody`);
  tableBody.innerHTML = "";
  data.forEach(item => {
    const row = document.createElement("tr");
    Object.values(item).forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    actionCell.innerHTML = `
      <button onclick="editItem('${endpoint}', ${item.id})">Edit</button>
      <button class="delete" onclick="deleteItem('${endpoint}', ${item.id})">Delete</button>
    `;
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
}

// Helper function to send POST/PUT requests
async function sendData(endpoint, method, body) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
}

// Helper function to delete an item
async function deleteItem(endpoint, id) {
  await fetch(`${BASE_URL}/${endpoint}/${id}`, { method: "DELETE" });
  fetchData(endpoint, `${endpoint}Table`);
}

// Fetch all data on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchData("vendors", "vendorTable");
  fetchData("agents", "agentTable");
  fetchData("customers", "customerTable");
  fetchData("products", "productTable");
  fetchData("deliveries", "deliveryTable");
});

// Vendor Form Submission
document.querySelector("#vendorForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const vendorName = document.querySelector("#vendorName").value;
  const vendorContact = document.querySelector("#vendorContact").value;

  await sendData("vendors", "POST", { name: vendorName, contact: vendorContact });
  fetchData("vendors", "vendorTable");
  e.target.reset();
});

// Agent Form Submission
document.querySelector("#agentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const agentName = document.querySelector("#agentName").value;
  const agentContact = document.querySelector("#agentContact").value;

  await sendData("agents", "POST", { name: agentName, contact: agentContact });
  fetchData("agents", "agentTable");
  e.target.reset();
});

// Customer Form Submission
document.querySelector("#customerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const customerName = document.querySelector("#customerName").value;
  const customerContact = document.querySelector("#customerContact").value;

  await sendData("customers", "POST", { name: customerName, contact: customerContact });
  fetchData("customers", "customerTable");
  e.target.reset();
});

// Product Form Submission
document.querySelector("#productForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const productName = document.querySelector("#productName").value;
  const vendorId = document.querySelector("#vendorId").value;

  await sendData("products", "POST", { name: productName, vendor_id: vendorId });
  fetchData("products", "productTable");
  e.target.reset();
});

// Delivery Form Submission
document.querySelector("#deliveryForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const productId = document.querySelector("#productId").value;
  const agentId = document.querySelector("#agentId").value;
  const customerId = document.querySelector("#customerId").value;
  const deliveryDate = document.querySelector("#deliveryDate").value;
  const deliveryLocation = document.querySelector("#deliveryLocation").value;

  await sendData("deliveries", "POST", {
    product_id: productId,
    agent_id: agentId,
    customer_id: customerId,
    date: deliveryDate,
    location: deliveryLocation,
  });
  fetchData("deliveries", "deliveryTable");
  e.target.reset();
});
