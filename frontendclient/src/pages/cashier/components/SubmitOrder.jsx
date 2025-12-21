import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, Plus, Minus } from 'lucide-react';
import axios from "axios"

const RestaurantOrderingUI = ({ onGoBack, customerId }) => {
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [cart, setCart] = useState({ });
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const allMenu = async () => {
    const response = await axios.get("https://bradpoints.dcism.org/cashier/cashierprod");
    setMenuItems(response.data.products);
    console.log(response.data.products);
  }

  useEffect(() => {
    allMenu();
  }, [])

  const handleSubmit = async (e) => {
    try {
      const orderData = {
        userId: customerId, // from LoginCard
        totalPoints: totalPoints,
        orderItems: orderItems.filter(item => item.qty > 0).map(item => ({
          name: item.name,
          quantity: item.qty,
          points: item.points,
          totalPoints: item.points * item.qty
        }))
      };

      const response = await axios.post('https://bradpoints.dcism.org/cashier/cashierorder', orderData);

      if (response.data.success) {
        setSubmitMessage(response.data.message);
        setOrderSubmitted(true);
      } else {
        alert('Failed to submit order: ' + response.data.message);
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Error submitting order. Please try again.');
    }
  }

  const categories = ['All Items', 'Rice Meals and Soup', 'Rolls', 'Other Side Dishes'];

  const updateQuantity = (itemName, delta) => {
    setCart(prev => {
      const newCart = { ...prev };
      const newQty = (newCart[itemName] || 0) + delta;
      if (newQty <= 0) {
        delete newCart[itemName];
      } else {
        newCart[itemName] = newQty;
      }
      return newCart;
    });
  };

  const getItemPoints = (itemName) => {
    const item = menuItems.find(i => i.prod_name === itemName);
    return item ? item.points : 0;
  };

  const totalPoints = Object.entries(cart).reduce((sum, [item, qty]) => {
    return sum + (getItemPoints(item) * qty);
  }, 0);

  // Filter menu items based on search query and active category
  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.prod_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All Items' || item.category_name === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const orderItems = Object.entries(cart).map(([name, qty]) => {
    const item = menuItems.find(i => i.prod_name === name);
    return {
      name,
      category: item?.category_name || 'Unknown',
      qty,
      points: item?.points || 0,
      image: item?.prod_image || '/api/placeholder/64/64'
    };
  });

  return (
    <div className="flex h-screen w-screen bg-amber-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => onGoBack && onGoBack()} title="Back" className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search all product items..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="px-6 py-2 bg-red-700 text-white rounded hover:bg-red-800"
              onClick={() => setSearchQuery('')}
            >
              CLEAR
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 mb-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded flex items-center gap-2 ${
                  activeCategory === cat 
                    ? 'bg-red-700 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                {cat === 'All Items' && <span className="text-lg">☰</span>}
                {cat === 'Rice Meals and Soup' && <span className="text-lg">🍜</span>}
                {cat === 'Rolls' && <span className="text-lg">🥟</span>}
                {cat === 'Other Side Dishes' && <span className="text-lg">🍽️</span>}
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-4 gap-4 pb-4">
            {filteredMenuItems.length > 0 ? (
              filteredMenuItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow">
                  <div className="aspect-square bg-gray-200">
                    <img src={item.prod_image} alt={item.prod_name} className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-red-700 text-white p-3">
                    <h3 className="font-semibold text-sm mb-0.5">{item.prod_name}</h3>
                    <p className="text-xs opacity-90 mb-2">{item.category_name}</p>
                    <p className="text-xs mb-2">{item.points} points</p>
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => updateQuantity(item.prod_name, -1)}
                        className="w-7 h-7 flex items-center justify-center bg-red-800 rounded hover:bg-red-900"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm">{cart[item.prod_name] || 0}</span>
                      <button 
                        onClick={() => updateQuantity(item.prod_name, 1)}
                        className="w-7 h-7 flex items-center justify-center bg-red-800 rounded hover:bg-red-900"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center py-12 text-gray-500">
                No items found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <div className="w-80 bg-white flex flex-col">
        <div className="p-6 pb-0">
          <div className="mb-6">
            <h2 className="text-sm text-gray-600 mb-1">Current Order</h2>
            <p className="text-xs text-gray-500">{currentDateTime}</p>
          </div>
        </div>

        <div className="border-t-2 border-gray-300"></div>

        <div className="flex-1 overflow-auto px-6 pt-6">
          {orderItems.filter(item => item.qty > 0).map((item, idx) => (
            <div key={idx} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
              <div className="flex gap-3 mb-3">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-500 italic">{item.category}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-800">{item.qty}x</span>
                <span className="text-red-700 font-semibold text-sm">
                  {item.points * item.qty} points
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 pt-0">
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-red-700">TOTAL POINTS</span>
              <span className="font-bold text-xl">{totalPoints}</span>
            </div>
            <button 
              className="w-full py-3 bg-red-700 text-white rounded font-semibold hover:bg-red-800"
              onClick={() => setShowSubmitModal(true)}
            >
              Submit Order
            </button>
          </div>
        </div>
      </div>

      {/* Submit Order Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-red-700 rounded-lg p-8 max-w-lg w-full mx-4">
            {/* Placeholder Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <span className="text-4xl">📋</span>
              </div>
            </div>
            
            {!orderSubmitted ? (
              <>
                {/* Confirmation Text */}
                <h2 className="text-center text-red-700 font-bold text-lg mb-1">
                  Are you sure you want to submit this order?
                </h2>
                <p className="text-center text-gray-500 italic text-sm mb-6">
                  Please make sure you have confirmed all necessary details.
                </p>
                
                {/* Submit Button */}
                <button 
                  className="w-full py-3 bg-red-700 text-white rounded font-semibold hover:bg-red-800"
                  onClick={handleSubmit}   //{() => {
                  //  setOrderSubmitted(true);
                  //}}
                >
                  Submit
                </button>
                
                {/* Cancel Button */}
                <button 
                  className="w-full py-2 mt-2 text-gray-600 hover:text-gray-800"
                  onClick={() => setShowSubmitModal(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {/* Success Message */}
                <h2 className="text-center text-red-700 font-bold text-lg mb-1">
                  Success!
                </h2>
                <p className="text-center text-gray-500 italic text-sm mb-6">
                  {/*{totalPoints} Points successfully transferred to user 12345*/}
                  {`${totalPoints} Points successfully transferred to user ${customerId}`}
                </p>
                
                {/* Close Button */}
                <button 
                  className="w-full py-2 text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    setShowSubmitModal(false);
                    setOrderSubmitted(false);
                    setCart({});
                  }}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantOrderingUI;



// const menuItems = [
  //   { id: 1, name: 'Bacon Rolls', category: 'Rolls', points: 2, image: '/src/assets/images/Bacon Roll.jpg' },
  //   { id: 2, name: 'Batchoy', category: 'Rice Meals & Soups', points: 5, image: '/src/assets/images/Batchoy.jpg' },
  //   { id: 3, name: 'Beef Rice', category: 'Rice Meals & Soups', points: 5, image: '/src/assets/images/Beef Rice.jpg' },
  //   { id: 4, name: 'Chicken Feet', category: 'Side Dishes', points: 3, image: '/src/assets/images/Chicken Feet.jpg' },
  //   { id: 5, name: 'Chicken Rice', category: 'Side Dishes', points: 3, image: '/src/assets/images/Chicken Rice.jpg' },
  //   { id: 6, name: 'Crab Pincer', category: 'Side Dishes', points: 3, image: '/src/assets/images/Crab Pincer.jpg' },
  //   { id: 7, name: 'Empress Roll', category: 'Rolls', points: 2, image: '/src/assets/images/Empress Roll.jpg' },
  //   { id: 8, name: 'Fried Wonton', category: 'Side Dishes', points: 3, image: '/src/assets/images/Fried Wanton.jpg' },
  //   { id: 9, name: 'Ngohiong', category: 'Side Dishes', points: 3, image: '/src/assets/images/Ngohiong.jpg' },
  //   { id: 10, name: 'Pizza Roll', category: 'Rolls', points: 2, image: '/src/assets/images/Pizza Roll.jpg' },
  //   { id: 11, name: 'Shrimp Balls', category: 'Side Dishes', points: 3, image: '/src/assets/images/Shrimp Balls.jpg' },
  //   { id: 12, name: 'Siomai', category: 'Side Dishes', points: 3, image: '/src/assets/images/Siomai.jpg' },
  //   { id: 13, name: 'Siopao', category: 'Side Dishes', points: 3, image: '/src/assets/images/Siopao.jpg' },
  //   { id: 14, name: 'Spring Rolls', category: 'Rolls', points: 2, image: '/src/assets/images/Spring Rolls.jpg' },
  //   { id: 15, name: 'Steamed Chicken', category: 'Side Dishes', points: 3, image: '/src/assets/images/Steamed Chicken.jpg' },
  //   { id: 16, name: 'Steamed Rice', category: 'Rice Meals & Soups', points: 5, image: '/src/assets/images/Steamed Rice.jpg' },
  //   { id: 17, name: 'Sweet and Sour Pork', category: 'Side Dishes', points: 3, image: '/src/assets/images/Sweet and Sour.jpg' },
  // ];