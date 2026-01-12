import { Order } from '../../types';
import { useEffect, useState } from 'react';
import { apiGetOrders } from '../../lib/api';

const getStatusColor = (status: string) => {
  const s = status?.toLowerCase() || '';
  if (s.includes('deliver')) return 'bg-green-100 text-green-800';
  if (s.includes('ship')) return 'bg-blue-100 text-blue-800';
  if (s.includes('process') || s.includes('pending')) return 'bg-yellow-100 text-yellow-800';
  return 'bg-gray-100 text-gray-800';
};

const OrderHistorySection = () => {
  const [orders, setOrders] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiGetOrders();
        if (mounted) setOrders(res?.orders || []);
      } catch (err: any) {
        console.error('Failed to fetch orders', err);
        if (mounted) {
          setOrders([]);
          setError('Failed to load orders');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchOrders();
    return () => { mounted = false };
  }, []);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-light tracking-widest border-b border-gray-200 pb-4">
        Order History
      </h2>
      <div className="space-y-8 mt-6">
        {loading ? (
          <p className="text-center text-foreground py-8">Loading orders…</p>
        ) : error ? (
          <p className="text-center text-red-600 py-8">{error}</p>
        ) : (orders && orders.length > 0 ? orders.map((order: any) => {
          const orderId = order.order_id ?? order.id ?? '—';
          const orderDate = order.created_at || order.date || order.placed_at || '—';
          const orderStatus = order.status || order.state || 'Processing';
          const orderTotal = Number(order.total ?? order.amount ?? 0).toFixed(2);
          const orderItems = order.items || order.order_items || [];

          return (
            <div key={orderId} className="border border-gray-200 rounded-lg p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-bold text-lg text-dark-text">Order #{orderId}</h3>
                  <p className="text-sm text-foreground">Date: {orderDate}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(orderStatus)}`}>
                    {orderStatus}
                  </span>
                  <p className="font-sans text-lg font-semibold text-heading">₹{orderTotal}</p>
                </div>
              </div>
              <div className="flex space-x-4 border-t border-gray-200 pt-4">
                <div className="flex -space-x-4">
                  {orderItems.slice(0, 3).map((item: any, index: number) => (
                    <img
                      key={index}
                      src={item.imageUrl || item.image_url || item.media?.[0]?.src || '/placeholder.png'}
                      alt={item.name || item.product_name}
                      className="w-16 h-16 object-cover rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div className="flex-1 self-center">
                  <p className="font-semibold text-dark-text">
                    {orderItems.map((i: any) => `${i.name ?? i.product_name ?? 'Product'} (x${i.quantity ?? i.qty ?? 1})`).join(', ')}
                  </p>
                </div>
              </div>
              <div className="text-right mt-4">
                <button className="text-heading font-bold hover:underline">View Details</button>
              </div>
            </div>
          );
        }) : (
          <p className="text-center text-foreground py-8">You have no past orders.</p>
        ))}
      </div>
    </div>
  );
};

export default OrderHistorySection;
