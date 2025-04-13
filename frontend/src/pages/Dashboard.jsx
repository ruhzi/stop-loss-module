import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet.jsx';
import { getOrders } from '../utils/api';
import { toast } from 'react-toastify';
import { FaPlus, FaCheckCircle, FaClock, FaExclamationTriangle, FaSync } from 'react-icons/fa';

const Dashboard = () => {
  const { account, isConnected } = useWallet();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    if (!isConnected) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching orders for address:', account);
      const data = await getOrders(account);
      console.log('Fetched orders:', data);
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      const errorMessage = err.message || 'Failed to load orders. Please try again later.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Set up polling to refresh orders every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [isConnected, account]);

  const getStatusIcon = (triggered) => {
    if (triggered) {
      return <FaCheckCircle className="text-green-500" />;
    }
    return <FaClock className="text-yellow-500" />;
  };

  const getStatusText = (triggered) => {
    if (triggered) {
      return <span className="text-green-500">Triggered</span>;
    }
    return <span className="text-yellow-500">Active</span>;
  };

  if (!isConnected) {
    return (
      <div className="text-center">
        <FaExclamationTriangle className="text-4xl text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
        <p className="text-gray-300 mb-6">Please connect your wallet to view your stop-loss orders.</p>
        <Link to="/" className="btn-primary">
          Connect Wallet
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Stop-Loss Orders</h1>
        <div className="flex space-x-4">
          <button 
            onClick={fetchOrders} 
            disabled={isLoading}
            className="btn-secondary flex items-center"
          >
            <FaSync className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link to="/create-order" className="btn-primary flex items-center">
            <FaPlus className="mr-2" />
            Create New Order
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading orders...</p>
        </div>
      ) : error ? (
        <div className="card text-center py-12">
          <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
          <p className="text-gray-300 mb-4">{error}</p>
          <div className="flex justify-center space-x-4">
            <button onClick={fetchOrders} className="btn-primary">
              Try Again
            </button>
            <Link to="/create-order" className="btn-secondary">
              Create New Order
            </Link>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-300 mb-4">You don't have any stop-loss orders yet.</p>
          <Link to="/create-order" className="btn-primary">
            Create Your First Order
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div key={index} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{order.market}</h3>
                  <p className="text-gray-300 text-sm">
                    {order.address ? `${order.address.slice(0, 6)}...${order.address.slice(-4)}` : 'No address'}
                  </p>
                </div>
                <div className="text-right">
                  {getStatusIcon(order.triggered)}
                  <p className="text-sm mt-1">{getStatusText(order.triggered)}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Stop-Loss Price:</span>
                  <span className="font-medium">${order.threshold.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Order Size:</span>
                  <span className="font-medium">{order.size} {order.market}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard; 