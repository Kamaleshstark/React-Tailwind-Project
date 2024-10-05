const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; 

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'root', 
  database: 'login_db', 
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

app.post('/login', (req, res) => {
  const { mail_id, password } = req.body; 
  
  const query = 'SELECT * FROM login_credentials WHERE mail_id = ? AND password = ?'; 
  db.query(query, [mail_id, password], (err, result) => {
    if (err) {
      console.error('Error executing query:', err); 
      return res.status(500).send({ message: 'Server error', error: err.message }); 
    }

    if (result.length > 0) {
      
      res.status(200).send({ message: 'Login successful', user: result[0] });
    } else {
      res.status(401).send({ message: 'Invalid mail ID or password' }); 
    }
  });
});

app.post('/register', (req, res) => {
  const { mail_id, password } = req.body;

  if (!mail_id || !password) {
    return res.status(400).send({ message: 'Mail ID and password are required' });
  }

  const query = 'INSERT INTO login_credentials (mail_id, password) VALUES (?, ?)';
  db.query(query, [mail_id, password], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send({ message: 'Server error', error: err.message });
    }

    res.status(201).send({ message: 'User created successfully' });
  });
});


// DELETE route to remove a user
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  const query = 'DELETE FROM login_credentials WHERE id = ?'; // Replace 'id' with your actual primary key column name
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send({ message: 'Server error', error: err.message });
    }
    
    if (result.affectedRows > 0) {
      res.status(200).send({ message: 'User deleted successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
