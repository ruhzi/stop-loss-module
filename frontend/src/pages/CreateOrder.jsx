import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet.jsx';
import { registerStopLoss } from '../utils/api';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';

const CreateOrder = () => {
  const navigate = useNavigate();
  const { account, isConnected } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    market: 'ETH',
    threshold: '',
    size: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear any previous errors when user makes changes
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConnected) {
      setError('Please connect your wallet first');
      toast.error('Please connect your wallet first');
      return;
    }

    // Validate form
    if (!formData.threshold || !formData.size) {
      setError('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }

    const threshold = parseFloat(formData.threshold);
    const size = parseFloat(formData.size);

    if (isNaN(threshold) || isNaN(size) || threshold <= 0 || size <= 0) {
      setError('Please enter valid numbers for threshold and size');
      toast.error('Please enter valid numbers for threshold and size');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('Submitting order with data:', {
        market: formData.market,
        threshold,
        size,
        address: account
      });
      
      const result = await registerStopLoss(formData.market, threshold, size, account);
      console.log('Order creation result:', result);
      
      toast.success('Stop-loss order created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating stop-loss order:', error);
      setError(error.message || 'Failed to create stop-loss order. Please try again.');
      toast.error(error.message || 'Failed to create stop-loss order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-300 hover:text-white mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Create Stop-Loss Order</h2>
        
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded mb-6 flex items-start">
            <FaExclamationTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="market" className="label">
              Market
            </label>
            <select
              id="market"
              name="market"
              value={formData.market}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="ETH">ETH</option>
              <option value="BTC">BTC</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="threshold" className="label">
              Stop-Loss Price (USD)
            </label>
            <input
              type="number"
              id="threshold"
              name="threshold"
              value={formData.threshold}
              onChange={handleChange}
              placeholder="e.g., 1600"
              step="0.01"
              min="0"
              className="input w-full"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="size" className="label">
              Order Size
            </label>
            <input
              type="number"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="e.g., 0.5"
              step="0.01"
              min="0"
              className="input w-full"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isConnected}
            className="btn-primary w-full"
          >
            {isSubmitting ? 'Creating...' : 'Create Stop-Loss Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder; 