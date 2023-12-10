// server/index.js
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./knexfile');
const path = require('path');
const session = require('express-session');

const db = knex(knexConfig.development);
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Use express-session middleware
app.use(session({
  secret: 'giftcardstore', // Change this to a secure random string
  resave: false,
  saveUninitialized: true,
}));

// route to set user information in the session
app.post('/api/setuser', (req, res) => {
  const { userId, email } = req.body;

  // Store user information in the session
  req.session.user = { userId, email };

  // Wait for the session to be saved before logging
  req.session.save((err) => {
    if (err) {
      console.error('Error saving session:', err);
      res.status(500).json({ message: 'Error saving session' });
    } else {
      console.log('Session after setting user information:', req.session);
      res.json({ message: 'User information set in the session' });
    }
  });
});

// route to get user information from the session
app.get('/api/getuser', (req, res) => {
  // Retrieve user information from the session
  const user = req.session.user || null;
  console.log('User information retrieved from session:', user);

  res.json({ user });
});

// SignUp route
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    await db('users').insert({ name, email, phone, address, password });
    res.status(201).json({ message: 'User signed up successfully!' });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// SignUp route admin
app.post('/api/signupadmin', async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    await db('admins').insert({ name, email, phone, address, password });
    res.status(201).json({ message: 'Admin signed up successfully!' });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// server/index.js
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await db('users').where({ email, password }).first();

    if (user) {
      // Successful login
      // Log user information before setting it in the session
      console.log('User information before setting in session:', user);

      // Set user information in the session
      req.session.user = { userId: user.id, email: user.email };
      console.log('User information set in session:', req.session.user);

      res.json({ message: 'Login successful!' });
    } else {
      // Invalid login credentials
      res.status(401).json({ message: 'Invalid login credentials' });
    }
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
app.post('/api/loginadmin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await db('admins').where({ email, password }).first();

    if (user) {
      // Successful login
      res.json({ message: 'Login successful!' });
    } else {
      // Invalid login credentials
      res.status(401).json({ message: 'Invalid login credentials' });
    }
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Serve uploaded files as static content
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = '../public/uploads';
    console.log('Destination Path:', destinationPath);
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    console.log('File Name:', fileName);
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Create product route
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const imagePath = req.file ? req.file.path.replace('..\\public\\', '') : null;
    console.log('Image Path:', imagePath);

    // Insert product into the database
    const [productId] = await db('products').insert({
      title,
      description,
      price,
      image_path: imagePath,
    });

    res.status(201).json({ message: 'Product created successfully!', productId });
  } catch (error) {
    console.error('Product creation error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all products route
app.get('/api/getproducts', async (req, res) => {
  try {
    const products = await db('products').select('*');
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
