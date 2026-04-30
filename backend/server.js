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
  console.log('✅ Firebase Admin initialized successfully');
} catch (error) {
  console.error('❌ Error initializing Firebase Admin:', error.message);
  console.log('Make sure the service account JSON file exists in the backend directory.');
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Helper to delete file from storage using its URL
const deleteFileFromStorage = async (url) => {
  if (!url) return;
  try {
    const path = url.split(`${bucket.name}/`)[1];
    if (path) {
      await bucket.file(path).delete();
    }
  } catch (error) {
    console.error('Error deleting file from storage:', error.message);
  }
};

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', firebase: !!admin.apps.length });
});

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

// Update shop item
app.put('/api/shop/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, description, stock } = req.body;
    
    // Get existing item to check for old image
    const doc = await db.collection('shop_items').doc(id).get();
    const oldItem = doc.data();

    let updateData = {
      name,
      category,
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
      description
    };

    if (req.file) {
      // Delete old image if it exists
      if (oldItem?.imageUrl) {
        await deleteFileFromStorage(oldItem.imageUrl);
      }

      const fileName = `shop/${category}/${Date.now()}_${req.file.originalname}`;
      const file = bucket.file(fileName);
      await file.save(req.file.buffer, { metadata: { contentType: req.file.mimetype } });
      await file.makePublic();
      updateData.imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }

    await db.collection('shop_items').doc(id).update(updateData);
    res.status(200).json({ id, ...updateData });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete shop item
app.delete('/api/shop/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get item first to delete its image
    const doc = await db.collection('shop_items').doc(id).get();
    const item = doc.data();
    
    if (item?.imageUrl) {
      await deleteFileFromStorage(item.imageUrl);
    }

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
    
    // Get notice first to delete its image
    const doc = await db.collection('notices').doc(id).get();
    const notice = doc.data();
    
    if (notice?.image) {
      await deleteFileFromStorage(notice.image);
    }

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

// Get user profile
app.get('/api/user/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const doc = await db.collection('users').doc(uid).get();
    if (!doc.exists) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// --- SUBSIDIES ROUTES ---
app.post('/api/subsidies', upload.single('document'), async (req, res) => {
  try {
    const { type, fullName, nic, mobile, bankAccount } = req.body;
    let documentUrl = '';

    if (req.file) {
      const fileName = `subsidies/${type}/${Date.now()}_${req.file.originalname}`;
      const file = bucket.file(fileName);
      await file.save(req.file.buffer, { metadata: { contentType: req.file.mimetype } });
      await file.makePublic();
      documentUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }

    const application = {
      type,
      fullName,
      nic,
      mobile,
      bankAccount,
      documentUrl,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('subsidies').add(application);
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// --- AGENT ROUTES ---

// Get all agents
app.get('/api/agents', async (req, res) => {
  try {
    const snapshot = await db.collection('agents').get();
    const agents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Add new agent
app.post('/api/agents', async (req, res) => {
  try {
    const { name, role, phone, email } = req.body;
    const newAgent = {
      name,
      role,
      phone,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    const docRef = await db.collection('agents').add(newAgent);
    res.status(201).json({ id: docRef.id, ...newAgent });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update agent
app.put('/api/agents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, phone, email } = req.body;
    await db.collection('agents').doc(id).update({ name, role, phone, email });
    res.status(200).send({ id, name, role, phone, email });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete agent
app.delete('/api/agents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('agents').doc(id).delete();
    res.status(200).send({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// --- CONTACT MESSAGES ---
app.post('/api/contact', async (req, res) => {
  try {
    const { officerType, name, phone, message } = req.body;
    const newMessage = {
      officerType,
      senderName: name,
      senderPhone: phone,
      message,
      status: 'new',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    await db.collection('contact_messages').add(newMessage);
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
// --- SHOP CHECKOUT & STOCK MANAGEMENT ---
app.post('/api/checkout', async (req, res) => {
  const { userId, items, total } = req.body;

  try {
    await db.runTransaction(async (t) => {
      // 1. Verify all items and stock
      const productRefs = items.map(item => db.collection('shop_items').doc(item.id));
      const productDocs = await t.getAll(...productRefs);

      const updates = [];
      
      productDocs.forEach((doc, index) => {
        if (!doc.exists) {
          throw new Error(`Product ${items[index].name} no longer exists.`);
        }
        
        const currentStock = doc.data().stock;
        const requestedQty = items[index].quantity;

        if (currentStock < requestedQty) {
          throw new Error(`Insufficient stock for ${items[index].name}. Available: ${currentStock}`);
        }

        updates.push({
          ref: doc.ref,
          newStock: currentStock - requestedQty
        });
      });

      // 2. Perform Stock Reductions
      updates.forEach(update => {
        t.update(update.ref, { stock: update.newStock });
      });

      // 3. Create Order Record
      const orderRef = db.collection('orders').doc();
      t.set(orderRef, {
        userId,
        items: items.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
        total,
        status: 'paid',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });

    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Checkout Transaction Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
