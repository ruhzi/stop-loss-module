import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerStopLoss = async (market, threshold, size, address) => {
  try {
    console.log('Sending request to backend:', {
      market,
      threshold,
      size,
      address,
    });
    
    const response = await api.post('/register', {
      market,
      threshold,
      size,
      address,
    });
    
    console.log('Backend response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering stop-loss:', error);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      
      throw new Error(`Server error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response from server. Is the backend running?');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
      throw new Error(`Request error: ${error.message}`);
    }
  }
};

export const getOrders = async (address = null) => {
  try {
    const url = address ? `/orders?address=${address}` : '/orders';
    console.log('Fetching orders from:', `${API_URL}${url}`);
    
    const response = await api.get(url);
    console.log('Orders response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      throw new Error(`Server error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response from server. Is the backend running?');
    } else {
      console.error('Request setup error:', error.message);
      throw new Error(`Request error: ${error.message}`);
    }
  }
};

export default api; 