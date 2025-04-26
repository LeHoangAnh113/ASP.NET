import React, { useEffect, useState } from 'react';

const ProductCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const createOrder = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart
    };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");
    setCart([]);
    alert("Đã tạo đơn hàng!");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Giỏ hàng</h2>
      {cart.length === 0 ? (
        <p>Không có sản phẩm trong giỏ hàng.</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price.toLocaleString()} VND</td>
                  <td>{item.quantity}</td>
                  <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Tổng cộng: {total.toLocaleString()} VND</h4>
          <button className="btn btn-success" onClick={createOrder}>Tạo đơn hàng</button>
        </>
      )}
    </div>
  );
};

export default ProductCart;
