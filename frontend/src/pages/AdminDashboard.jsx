import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('shop');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [notices, setNotices] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Shop States
  const [newItem, setNewItem] = useState({ name: '', category: 'Seeds', price: '', description: '', stock: '' });
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  // Notice States
  const [newNotice, setNewNotice] = useState({ title: '', sender: '', description: '' });
  const [noticeImage, setNoticeImage] = useState(null);

  // Agent States
  const [newAgent, setNewAgent] = useState({ name: '', role: 'Crops Officer', phone: '', email: '' });
  const [agentEditMode, setAgentEditMode] = useState(false);
  const [agentEditId, setAgentEditId] = useState(null);

  useEffect(() => {
    fetchItems();
    fetchNotices();
    fetchAgents();
  }, []);

  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'shop_items'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    } catch (err) { console.error(err); }
  };

  const fetchNotices = async () => {
    try {
      const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotices(data);
    } catch (err) { console.error(err); }
  };

  const fetchAgents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'agents'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAgents(data);
    } catch (err) { console.error(err); }
  };


  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = editMode ? items.find(i => i.id === editItemId)?.imageUrl : '';
      
      // Upload image if selected
      if (image) {
        const imageRef = ref(storage, `shop/${Date.now()}_${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const itemData = {
        name: newItem.name,
        category: newItem.category,
        price: parseFloat(newItem.price),
        description: newItem.description,
        stock: parseInt(newItem.stock),
        imageUrl: imageUrl,
        updatedAt: serverTimestamp()
      };

      if (editMode) {
        await updateDoc(doc(db, 'shop_items', editItemId), itemData);
        alert('Item updated successfully!');
      } else {
        await addDoc(collection(db, 'shop_items'), { ...itemData, createdAt: serverTimestamp() });
        alert('Item added successfully!');
      }

      setNewItem({ name: '', category: 'Seeds', price: '', description: '', stock: '' });
      setImage(null);
      setEditMode(false);
      setEditItemId(null);
      fetchItems();
    } catch (err) { 
      console.error(err); 
      alert("Failed to save item: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleEditClick = (item) => {
    setEditMode(true);
    setEditItemId(item.id);
    setNewItem({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      stock: item.stock
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNotice = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';
      if (noticeImage) {
        const imageRef = ref(storage, `notices/${Date.now()}_${noticeImage.name}`);
        const snapshot = await uploadBytes(imageRef, noticeImage);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'notices'), {
        ...newNotice,
        imageUrl: imageUrl,
        createdAt: serverTimestamp()
      });

      alert('Notice added successfully!');
      setNewNotice({ title: '', sender: '', description: '' });
      setNoticeImage(null);
      fetchNotices();
    } catch (err) { 
      console.error(err);
      alert("Failed to add notice: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleAddAgent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (agentEditMode) {
        await updateDoc(doc(db, 'agents', agentEditId), newAgent);
        alert('Agent updated!');
      } else {
        await addDoc(collection(db, 'agents'), newAgent);
        alert('Agent added!');
      }
      setNewAgent({ name: '', role: 'Crops Officer', phone: '', email: '' });
      setAgentEditMode(false);
      setAgentEditId(null);
      fetchAgents();
    } catch (err) { 
      console.error(err); 
      alert("Failed to save agent: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAgentEdit = (agent) => {
    setAgentEditMode(true);
    setAgentEditId(agent.id);
    setNewAgent({
      name: agent.name,
      role: agent.role,
      phone: agent.phone,
      email: agent.email
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await deleteDoc(doc(db, 'shop_items', id));
      fetchItems();
    } catch (err) { console.error(err); }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm('Delete this notice?')) return;
    try {
      await deleteDoc(doc(db, 'notices', id));
      fetchNotices();
    } catch (err) { console.error(err); }
  };

  const handleDeleteAgent = async (id) => {
    if (!window.confirm('Delete this agent?')) return;
    try {
      await deleteDoc(doc(db, 'agents', id));
      fetchAgents();
    } catch (err) { console.error(err); }
  };



  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <main className="min-h-screen pt-24 bg-[#0a0a0a] text-white font-sans">
      <div className="flex h-[calc(100vh-6rem)]">
        
        {/* Sidebar */}
        <aside className="w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 p-8 flex flex-col gap-4">
          <div className="mb-10 px-4">
            <h2 className="text-2xl font-black bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">ADMIN PANEL</h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-2">Management Console</p>
          </div>
          
          <button 
            onClick={() => setActiveTab('shop')}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'shop' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'hover:bg-white/5 text-white/60'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span className="font-bold">Shop Manager</span>
          </button>

          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'messages' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'hover:bg-white/5 text-white/60'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            <span className="font-bold">Messages</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('agents')}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'agents' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'hover:bg-white/5 text-white/60'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span className="font-bold">Agents</span>
          </button>
          
          <div className="mt-auto">
            <Link to="/" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-white/40 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span className="font-bold text-sm">Exit to Site</span>
            </Link>
          </div>

        </aside>

        {/* Content Area */}
        <section className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          
          {activeTab === 'shop' && (
            <div className="max-w-7xl mx-auto animate-fadeIn">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h1 className="text-4xl font-black mb-2">Shop Inventory</h1>
                  <p className="text-white/50 font-medium">Manage and monitor your agricultural supplies</p>
                </div>
                
                {/* Category Filters */}
                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                  {['All', 'Seeds', 'Plants', 'Equipments', 'Fertilizers'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-6 py-2 rounded-xl text-xs font-black uppercase transition-all ${selectedCategory === cat ? 'bg-green-500 text-green-950 shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                
                {/* Add Item Form */}
                <div className="lg:col-span-1">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sticky top-0">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      New Product
                    </h3>
                    
                    <form onSubmit={handleAddItem} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-white/40 mb-1 ml-1">Name</label>
                        <input 
                          type="text" required
                          value={newItem.name}
                          onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                          placeholder="Product Name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500/50 text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-white/40 mb-1 ml-1">Category</label>
                          <select 
                            value={newItem.category}
                            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none text-sm"
                          >
                            <option value="Seeds">Seeds</option>
                            <option value="Plants">Plants</option>
                            <option value="Equipments">Equipments</option>
                            <option value="Fertilizers">Fertilizers</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-black uppercase text-white/40 mb-1 ml-1">Price ($)</label>
                            <input 
                              type="number" required
                              value={newItem.price}
                              onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                              placeholder="0.00"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black uppercase text-white/40 mb-1 ml-1">Stock</label>
                            <input 
                              type="number" required
                              value={newItem.stock}
                              onChange={(e) => setNewItem({...newItem, stock: e.target.value})}
                              placeholder="0"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-white/40 mb-1 ml-1">Description</label>
                        <textarea 
                          rows="2"
                          value={newItem.description}
                          onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                          placeholder="Short description..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none text-sm"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-white/40 mb-1 ml-1">Image</label>
                        <input 
                          type="file" accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                          className="w-full text-xs text-white/40 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-white/10 file:text-white hover:file:bg-white/20"
                        />
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button 
                          type="submit" disabled={loading}
                          className={`flex-1 ${editMode ? 'bg-yellow-500 hover:bg-yellow-400 text-yellow-950' : 'bg-green-500 hover:bg-green-400 text-green-950'} font-black py-4 rounded-xl transition-all shadow-lg`}
                        >
                          {loading ? (editMode ? 'Updating...' : 'Adding...') : (editMode ? 'Update Product' : 'Add to Shop')}
                        </button>
                        {editMode && (
                          <button 
                            type="button"
                            onClick={() => {
                              setEditMode(false);
                              setEditItemId(null);
                              setNewItem({ name: '', category: 'Seeds', price: '', description: '', stock: '' });
                            }}
                            className="bg-white/10 hover:bg-white/20 text-white font-black py-4 px-6 rounded-xl transition-all border border-white/10"
                          >
                            Cancel
                          </button>
                        )}
                      </div>

                    </form>
                  </div>
                </div>

                {/* Items Grid (More like frontend) */}
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                      <div key={item.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:bg-white/10 transition-all">
                        <div className="h-40 relative">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-white/10 flex items-center justify-center font-black text-white/10 text-xs">NO IMAGE</div>
                          )}
                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                            <span className={`text-[10px] font-black ${item.stock > 10 ? 'text-green-400' : 'text-red-400'}`}>
                              {item.stock} IN STOCK
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="text-green-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.category}</p>
                              <h4 className="text-lg font-bold text-white line-clamp-1">{item.name}</h4>
                            </div>
                            <div className="flex gap-1">
                              <button 
                                onClick={() => handleEditClick(item)}
                                className="p-2 text-white/20 hover:text-yellow-400 transition-colors"
                                title="Edit Item"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              </button>
                              <button 
                                onClick={() => handleDeleteItem(item.id)}
                                className="p-2 text-white/20 hover:text-red-400 transition-colors"
                                title="Delete Item"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>

                          </div>
                          <div className="flex justify-between items-center mt-auto">
                            <p className="text-2xl font-black text-white">${item.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {filteredItems.length === 0 && (
                    <div className="py-40 text-center bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                      <p className="text-white/20 font-bold text-xl uppercase tracking-widest">No items in this category</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="max-w-6xl mx-auto animate-fadeIn">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h1 className="text-4xl font-black mb-2">Official Notices</h1>
                  <p className="text-white/50 font-medium">Upload scanned documents and official letters</p>
                </div>
                <div className="bg-white/5 rounded-2xl px-6 py-4 border border-white/10 flex gap-8">
                  <div className="text-center">
                    <p className="text-white/40 text-[10px] font-black uppercase mb-1">Total Notices</p>
                    <p className="text-2xl font-black text-yellow-400">{notices.length}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Add Notice Form */}
                <div className="lg:col-span-1">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sticky top-0">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      Post New Notice
                    </h3>
                    
                    <form onSubmit={handleAddNotice} className="space-y-5">
                      <div>
                        <label className="block text-xs font-black uppercase text-white/40 mb-2 ml-1">Notice Title</label>
                        <input 
                          type="text" 
                          required
                          value={newNotice.title}
                          onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                          placeholder="e.g. Fertilizer Subsidy Notice"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500/50 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase text-white/40 mb-2 ml-1">Sender Organization</label>
                        <input 
                          type="text" 
                          required
                          value={newNotice.sender}
                          onChange={(e) => setNewNotice({...newNotice, sender: e.target.value})}
                          placeholder="e.g. Ministry of Agriculture"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500/50 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase text-white/40 mb-2 ml-1">Small Description</label>
                        <textarea 
                          rows="3"
                          value={newNotice.description}
                          onChange={(e) => setNewNotice({...newNotice, description: e.target.value})}
                          placeholder="Brief summary of the document..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase text-white/40 mb-2 ml-1">Document Scan (Photo)</label>
                        <div className="relative group">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => setNoticeImage(e.target.files[0])}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          <div className="w-full bg-white/5 border-2 border-dashed border-white/10 rounded-xl px-4 py-8 flex flex-col items-center justify-center gap-2 group-hover:border-yellow-500/30 transition-all">
                            <svg className="w-8 h-8 text-white/20 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            <p className="text-xs font-bold text-white/40">{noticeImage ? noticeImage.name : 'Upload Scan'}</p>
                          </div>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-yellow-500 hover:bg-yellow-400 text-yellow-950 font-black py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {loading ? 'Posting...' : 'Post Notice'}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Notices List */}
                <div className="lg:col-span-2 space-y-4">
                  {notices.map((notice) => (
                    <div key={notice.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex gap-6 items-center group hover:bg-white/10 transition-all">
                      <div className="w-24 h-32 rounded-lg overflow-hidden bg-white/10 border border-white/10 flex-shrink-0">
                        {notice.image ? (
                          <img src={notice.image} alt={notice.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/20 uppercase font-black text-[10px]">No Scan</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="mb-2">
                          <p className="text-yellow-400 text-[10px] font-black uppercase tracking-wider mb-1">{notice.sender}</p>
                          <h4 className="text-lg font-bold">{notice.title}</h4>
                        </div>
                        <p className="text-white/40 text-sm line-clamp-2 italic">"{notice.description}"</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <p className="text-white/20 text-[10px] font-bold">
                          {notice.createdAt ? new Date(notice.createdAt._seconds * 1000).toLocaleDateString() : 'Just now'}
                        </p>
                        <button 
                          onClick={() => handleDeleteNotice(notice.id)}
                          className="p-2 text-white/20 hover:text-red-400 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  {notices.length === 0 && (
                    <div className="py-20 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                      <p className="text-white/20 font-bold">No official notices posted.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'agents' && (
            <div className="max-w-6xl mx-auto animate-fadeIn">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h1 className="text-4xl font-black mb-2">Agricultural Officers</h1>
                  <p className="text-white/50 font-medium">Manage your team of experts and their contact details</p>
                </div>
                <div className="bg-white/5 rounded-2xl px-6 py-4 border border-white/10">
                  <p className="text-white/40 text-[10px] font-black uppercase mb-1">Active Agents</p>
                  <p className="text-2xl font-black text-blue-400">{agents.length}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-0">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      {agentEditMode ? 'Update Officer' : 'Add New Officer'}
                    </h3>
                    <form onSubmit={handleAddAgent} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-white/40 mb-1 ml-1">Full Name</label>
                        <input 
                          type="text" required
                          value={newAgent.name}
                          onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                          placeholder="e.g. Mr. Sunil Perera"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-white/40 mb-1 ml-1">Officer Role</label>
                        <select 
                          value={newAgent.role}
                          onChange={(e) => setNewAgent({...newAgent, role: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none text-sm"
                        >
                          <option value="Crops Officer">Crops Officer</option>
                          <option value="Land Officer">Land Officer</option>
                          <option value="Animal Officer">Animal Officer</option>
                          <option value="Regional Manager">Regional Manager</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-white/40 mb-1 ml-1">Phone Number</label>
                        <input 
                          type="tel" required
                          value={newAgent.phone}
                          onChange={(e) => setNewAgent({...newAgent, phone: e.target.value})}
                          placeholder="07xxxxxxxx"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-white/40 mb-1 ml-1">Email Address</label>
                        <input 
                          type="email" required
                          value={newAgent.email}
                          onChange={(e) => setNewAgent({...newAgent, email: e.target.value})}
                          placeholder="name@farmera.lk"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none text-sm"
                        />
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <button 
                          type="submit" disabled={loading}
                          className={`flex-1 ${agentEditMode ? 'bg-blue-500 hover:bg-blue-400 text-blue-950' : 'bg-white text-black hover:bg-white/90'} font-black py-4 rounded-xl transition-all shadow-lg`}
                        >
                          {loading ? 'Processing...' : (agentEditMode ? 'Update Agent' : 'Register Agent')}
                        </button>
                        {agentEditMode && (
                          <button 
                            type="button"
                            onClick={() => {
                              setAgentEditMode(false);
                              setAgentEditId(null);
                              setNewAgent({ name: '', role: 'Crops Officer', phone: '', email: '' });
                            }}
                            className="bg-white/10 hover:bg-white/20 text-white font-black py-4 px-6 rounded-xl transition-all border border-white/10"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agents.map((agent) => (
                    <div key={agent.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 group hover:bg-white/10 transition-all">
                      <div className="flex justify-between items-start mb-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${agent.role.includes('Crops') ? 'bg-green-500/20 text-green-400' : agent.role.includes('Land') ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => handleAgentEdit(agent)} className="p-2 text-white/20 hover:text-blue-400 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                          <button onClick={() => handleDeleteAgent(agent.id)} className="p-2 text-white/20 hover:text-red-400 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                        </div>
                      </div>
                      <div>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">{agent.role}</p>
                        <h4 className="text-xl font-bold mb-4">{agent.name}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-white/60 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            {agent.phone}
                          </div>
                          <div className="flex items-center gap-3 text-white/60 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {agent.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AdminDashboard;

