const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3010

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'Jack199723@@', // Replace with your MySQL password
  database: 'logisticsDB'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// CRUD APIs for Vendors
app.get('/vendors', (req, res) => {
  db.query('SELECT * FROM Vendors', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/vendors', (req, res) => {
  const { VendorName, VendorContact } = req.body;
  db.query(
    'INSERT INTO Vendors (VendorName, VendorContact) VALUES (?, ?)',
    [VendorName, VendorContact],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true, id: result.insertId });
    }
  );
});

app.delete('/vendors/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Vendors WHERE VendorID = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});



// CRUD APIs for Delivery Agents
app.get('/deliveryAgents', (req, res) => {
  db.query('SELECT * FROM DeliveryAgents', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/deliveryAgents', (req, res) => {
  const { AgentName, AgentContact } = req.body;
  db.query(
    'INSERT INTO DeliveryAgents (AgentName, AgentContact) VALUES (?, ?)',
    [AgentName, AgentContact],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true, id: result.insertId });
    }
  );
});

app.put('/deliveryAgents/:id', (req, res) => {
  const { AgentName, AgentContact } = req.body;
  const id = req.params.id;
  db.query(
    'UPDATE DeliveryAgents SET AgentName = ?, AgentContact = ? WHERE AgentID = ?',
    [AgentName, AgentContact, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true });
    }
  );
});

app.delete('/deliveryAgents/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM DeliveryAgents WHERE AgentID = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});


// CRUD APIs for Deliveries
app.get('/deliveries', (req, res) => {
  db.query('SELECT * FROM Deliveries', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/deliveries', (req, res) => {
  const { ProductID, AgentID, CustomerID, DeliveryDate, DeliveryLocation } = req.body;
  db.query(
    'INSERT INTO Deliveries (ProductID, AgentID, CustomerID, DeliveryDate, DeliveryLocation) VALUES (?, ?, ?, ?, ?)',
    [ProductID, AgentID, CustomerID, DeliveryDate, DeliveryLocation],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true, id: result.insertId });
    }
  );
});

app.put('/deliveries/:id', (req, res) => {
  const { ProductID, AgentID, CustomerID, DeliveryDate, DeliveryLocation } = req.body;
  const id = req.params.id;
  db.query(
    'UPDATE Deliveries SET ProductID = ?, AgentID = ?, CustomerID = ?, DeliveryDate = ?, DeliveryLocation = ? WHERE DeliveryID = ?',
    [ProductID, AgentID, CustomerID, DeliveryDate, DeliveryLocation, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true });
    }
  );
});

app.delete('/deliveries/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Deliveries WHERE DeliveryID = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});


// CRUD APIs for Customers
app.get('/customers', (req, res) => {
  db.query('SELECT * FROM Customers', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/customers', (req, res) => {
  const { CustomerName, CustomerContact } = req.body;
  db.query(
    'INSERT INTO Customers (CustomerName, CustomerContact) VALUES (?, ?)',
    [CustomerName, CustomerContact],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true, id: result.insertId });
    }
  );
});

app.put('/customers/:id', (req, res) => {
  const { CustomerName, CustomerContact } = req.body;
  const id = req.params.id;
  db.query(
    'UPDATE Customers SET CustomerName = ?, CustomerContact = ? WHERE CustomerID = ?',
    [CustomerName, CustomerContact, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true });
    }
  );
});

app.delete('/customers/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Customers WHERE CustomerID = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});


// CRUD APIs for Products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM Products', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/products', (req, res) => {
  const { ProductName, VendorID } = req.body;
  db.query(
    'INSERT INTO Products (ProductName, VendorID) VALUES (?, ?)',
    [ProductName, VendorID],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true, id: result.insertId });
    }
  );
});

app.put('/products/:id', (req, res) => {
  const { ProductName, VendorID } = req.body;
  const id = req.params.id;
  db.query(
    'UPDATE Products SET ProductName = ?, VendorID = ? WHERE ProductID = ?',
    [ProductName, VendorID, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true });
    }
  );
});

app.delete('/products/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Products WHERE ProductID = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});




// Analytics APIs
app.get('/analytics', (req, res) => {
  const query = `
    SELECT 
      (SELECT COUNT(*) FROM Vendors) AS totalVendors,
      (SELECT COUNT(*) FROM DeliveryAgents) AS totalAgents,
      (SELECT COUNT(*) FROM Deliveries) AS totalDeliveries;
      (SELECT COUNT(*) FROM Products) AS totalProducts;
      (SELECT COUNT(*) FROM Customers) AS totalCustomer;
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

// Start the server
const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  console.log('Sending message to browser...');
    app.get('/', (req,res) => {
        res.send('Server Started Successfully!');
    });
});
