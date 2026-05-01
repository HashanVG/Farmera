import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp, runTransaction, doc } from 'firebase/firestore';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    if (!auth.currentUser) {
      alert("Please sign in to complete your purchase.");
      navigate('/sign-in');
      return;
    }

    setLoading(true);
    try {
      // Use a Firestore Transaction to ensure atomic stock reduction
      await runTransaction(db, async (transaction) => {
        // 1. Check stock for all items
        const itemRefs = cart.map(item => doc(db, 'shop_items', item.id));
        const itemSnapshots = await Promise.all(itemRefs.map(ref => transaction.get(ref)));
        
        for (let i = 0; i < itemSnapshots.length; i++) {
          const snap = itemSnapshots[i];
          const cartItem = cart[i];
          if (!snap.exists()) throw new Error(`Product ${cartItem.name} not found!`);
          
          const currentStock = snap.data().stock;
          if (currentStock < cartItem.quantity) {
            throw new Error(`Insufficient stock for ${cartItem.name}. Available: ${currentStock}`);
          }
          
          // 2. Reduce stock
          transaction.update(itemRefs[i], {
            stock: currentStock - cartItem.quantity
          });
        }

        // 3. Create the order
        const orderRef = doc(collection(db, 'orders'));
        transaction.set(orderRef, {
          userId: auth.currentUser.uid,
          userEmail: auth.currentUser.email,
          items: cart,
          total: getCartTotal(),
          status: 'pending',
          createdAt: serverTimestamp()
        });
      });

      alert("Purchase successful! Thank you for shopping with Farmera.");
      clearCart();
      navigate('/');
    } catch (error) {
      console.error("Checkout error:", error);
      alert(`Checkout failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen pt-32 pb-16 px-6 bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-400">Your Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-20 text-center">
            <p className="text-white/40 text-xl font-bold mb-8 uppercase tracking-widest">Your cart is empty</p>
            <Link to="/shop/seeds" className="inline-block bg-yellow-400 text-yellow-950 font-black px-10 py-4 rounded-xl hover:bg-yellow-300 transition-all shadow-lg">
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map(item => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-3xl p-4 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6 items-center sm:items-center group hover:bg-white/10 transition-all relative">
                  <div className="w-full sm:w-24 h-48 sm:h-24 rounded-2xl overflow-hidden bg-white/10 border border-white/10 flex-shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                    <p className="text-yellow-400 font-black">Rs. {item.price}</p>
                  </div>
                  
                  <div className="flex items-center gap-6 sm:gap-4">
                    <div className="flex items-center gap-4 bg-black/40 px-4 py-2 rounded-xl border border-white/10">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-white/40 hover:text-white font-bold text-lg">-</button>
                      <span className="font-bold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-white/40 hover:text-white font-bold text-lg">+</button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors sm:static absolute top-4 right-4"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>


            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sticky top-32">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>Rs. {getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Delivery</span>
                    <span className="text-green-400 font-bold uppercase text-xs">Free</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                    <span className="font-bold">Total</span>
                    <span className="text-3xl font-black text-yellow-400">Rs. {getCartTotal()}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-black py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Checkout Now'}
                  {!loading && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>}
                </button>
                
                <p className="text-[10px] text-white/30 text-center mt-6 font-bold uppercase tracking-widest">Secure Payment Powered by Farmera Pay</p>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
