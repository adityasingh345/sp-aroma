import { useEffect, useState } from 'react';
import { apiGetAllOrders } from '../../lib/api';

const SalesSection = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiGetAllOrders();
      setOrders(res?.orders || []);
    } catch (e: any) {
      console.error('Failed to load orders', e);
      setError('Failed to load orders. Make sure you have admin privileges.');
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { load() }, []);

  const totalSales = orders.reduce((sum, o) => sum + (Number(o.total || o.amount || 0)), 0);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-light mb-4">Sales / Orders (Admin)</h2>
      <div className="text-sm text-gray-600 mb-4">
        Total Orders: {orders.length} — Total Sales: ₹{totalSales.toFixed(2)}
      </div>

      {loading ? (
        <p className="text-center py-4">Loading…</p>
      ) : error ? (
        <p className="text-center text-red-600 py-4">{error}</p>
      ) : (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-center text-gray-600 py-4">No orders found</p>
          ) : (
            orders.map(o => {
              const orderId = o.order_id ?? o.id ?? '—';
              const userEmail = o.user?.email ?? o.email ?? o.customer_email ?? '—';
              const total = Number(o.total ?? o.amount ?? 0).toFixed(2);
              const status = o.status ?? o.state ?? 'Pending';
              const items = o.items || o.order_items || [];

              return (
                <div key={orderId} className="border p-4 rounded hover:shadow-md transition-shadow">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">Order #{orderId}</div>
                      <div className="text-sm text-gray-600">By: {userEmail}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{total}</div>
                      <div className="text-sm text-gray-600">{status}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-700">
                    {Array.isArray(items) && items.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {items.map((it: any, idx: number) => (
                          <li key={idx}>
                            {it.name || it.product_name || 'Product'} × {it.quantity ?? it.qty ?? 1} — ₹{Number(it.price ?? it.unit_price ?? 0).toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div>No item details</div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default SalesSection;
