import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // <--- Hooks to read URL
import API from '../api';
import Tracker from './Tracker'; // Reusing your beautiful tracker
import { Loader2 } from 'lucide-react';

const OrderPage = () => {
  const { id } = useParams(); // Get the "123" from /order/123
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Fetch the specific order from Backend
        const res = await API.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Order fetch failed:", err);
        setError("Order not found or deleted.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-green-600 mb-4" size={48} />
      <p className="text-gray-500 font-medium">Retrieving transaction details...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
      <p className="text-gray-600 mb-6">{error}</p>
      <button onClick={() => navigate('/')} className="bg-gray-900 text-white px-6 py-2 rounded-lg">
        Go Home
      </button>
    </div>
  );

  // If order exists, show the Tracker!
  return <Tracker order={order} onBack={() => navigate('/')} />;
};

export default OrderPage;