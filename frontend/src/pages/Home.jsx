import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { FaWallet, FaChartLine, FaShieldAlt, FaExchangeAlt } from 'react-icons/fa';

const Home = () => {
  const { isConnected } = useWallet();

  const features = [
    {
      icon: <FaWallet className="text-4xl text-blue-500" />,
      title: 'Wallet Integration',
      description: 'Connect your MetaMask wallet to manage your stop-loss orders.',
    },
    {
      icon: <FaChartLine className="text-4xl text-blue-500" />,
      title: 'Real-time Price Tracking',
      description: 'Monitor market prices in real-time with Hyperliquid testnet integration.',
    },
    {
      icon: <FaShieldAlt className="text-4xl text-blue-500" />,
      title: 'Stop-Loss Protection',
      description: 'Set price thresholds to automatically execute trades when conditions are met.',
    },
    {
      icon: <FaExchangeAlt className="text-4xl text-blue-500" />,
      title: 'Trade Execution',
      description: 'Automated trade execution through Hyperliquid API when stop-loss is triggered.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Stop-Loss Module</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A decentralized stop-loss module built using Hyperliquid's testnet API. Set price-triggered stop-loss orders that are executed based on real-time price feeds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="card flex flex-col items-center text-center">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        {isConnected ? (
          <Link to="/create-order" className="btn-primary text-lg px-8 py-3">
            Create Stop-Loss Order
          </Link>
        ) : (
          <div>
            <p className="text-xl mb-4">Connect your wallet to get started</p>
            <Link to="/" className="btn-primary text-lg px-8 py-3">
              Connect Wallet
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 