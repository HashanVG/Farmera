const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
try {
  const serviceAccount = require('./farmera-5ecc9-firebase-adminsdk-fbsvc-d5e4279cd4.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'farmera-5ecc9.firebasestorage.app'
  });
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin:', error.message);
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Multer setup for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// --- SHOP ROUTES ---

// Get all shop items
app.get('/api/shop', async (req, res) => {
  try {
    const snapshot = await db.collection('shop_items').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Add new shop item with photo
app.post('/api/shop', upload.single('image'), async (req, res) => {
  try {
    const { name, category, price, description, stock } = req.body;
    let imageUrl = '';

    if (req.file) {
      const fileName = `shop/${category}/${Date.now()}_${req.file.originalname}`;
      const file = bucket.file(fileName);

      await file.save(req.file.buffer, {
        metadata: { contentType: req.file.mimetype }
      });

      // Get public URL
      await file.makePublic();
      imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }

    const newItem = {
      name,
      category,
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
      description,
      imageUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('shop_items').add(newItem);
    res.status(201).json({ id: docRef.id, ...newItem });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete shop item
app.delete('/api/shop/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('shop_items').doc(id).delete();
    res.status(200).send({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// --- MESSAGES ROUTES (Official Notices from Admin) ---

// Get all notices
app.get('/api/notices', async (req, res) => {
  try {
    const snapshot = await db.collection('notices').orderBy('createdAt', 'desc').get();
    const notices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Add new notice with photo (official letter scan)
app.post('/api/notices', upload.single('image'), async (req, res) => {
  try {
    const { title, sender, description } = req.body;
    let imageUrl = '';

    if (req.file) {
      const fileName = `notices/${Date.now()}_${req.file.originalname}`;
      const file = bucket.file(fileName);

      await file.save(req.file.buffer, {
        metadata: { contentType: req.file.mimetype }
      });

      await file.makePublic();
      imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }

    const newNotice = {
      title,
      sender,
      description,
      image: imageUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('notices').add(newNotice);
    res.status(201).json({ id: docRef.id, ...newNotice });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete notice
app.delete('/api/notices/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('notices').doc(id).delete();
    res.status(200).send({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// --- USER ROUTES ---

app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, mobileNumber, address, uid } = req.body;
    await db.collection('users').doc(uid).set({
      username,
      email,
      mobileNumber,
      address,
      role: 'user', // Default role
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(200).send({ message: 'User data saved successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
