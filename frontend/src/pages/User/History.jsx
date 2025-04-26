import React, { useEffect, useState } from 'react';

const History = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(stored);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lịch sử đơn hàng</h2>
      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="mb-4 border p-3 rounded">
            <h5>Mã đơn: {order.id}</h5>
            <p>Ngày tạo: {order.date}</p>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} - {item.quantity} x {item.price.toLocaleString()} VND
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
