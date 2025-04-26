import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const updateLocalStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    updateLocalStorage(updatedCart);
    toast.info('Sản phẩm đã được xoá khỏi giỏ hàng!');
  };

  const handleQuantityChange = (productId, delta) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 1 ? newQty : 1 };
      }
      return item;
    });
    updateLocalStorage(updatedCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-page container py-5">
      <h2 className="text-center mb-5 text-primary fw-bold">🛒 Giỏ Hàng Của Bạn</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-muted fs-5">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="row g-4">
          <div className="col-md-8">
            {cartItems.map(item => (
              <div className="card mb-3 shadow-sm rounded-4 p-3" key={item.id}>
                <div className="d-flex align-items-center">
                  <img
                    src={`/images/${item.image}?t=${new Date().getTime()}`}
                    alt={item.name}
                    className="rounded border me-3"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-1 text-muted" style={{ fontSize: '14px' }}>{item.description}</p>
                    <div className="d-flex justify-content-between align-items-end">
                      <div>
                        <p className="mb-1 text-success fw-semibold">
                          Đơn giá: {item.price.toLocaleString()} ₫
                        </p>
                        <div className="d-flex align-items-center mb-1">
                          <span className="me-2">Số lượng:</span>
                          <button
                            className="btn btn-outline-secondary btn-sm me-1"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            -
                          </button>
                          <span className="px-2">{item.quantity}</span><button
                            className="btn btn-outline-secondary btn-sm ms-1"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                        <p className="mb-1 fw-bold">
                          Thành tiền: {(item.price * item.quantity).toLocaleString()} ₫
                        </p>
                      </div>
                      <button
                        className="btn btn-danger btn-sm h-50 mt-auto"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="bi bi-trash"></i> Xoá
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <div className="card shadow-lg rounded-4 p-4">
              <h5 className="fw-bold mb-3">Tóm tắt đơn hàng</h5>
              <ul className="list-group list-group-flush mb-3">
                {cartItems.map(item => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                    <span>{item.name} x {item.quantity}</span>
                    <span className="text-success">{(item.price * item.quantity).toLocaleString()} VNĐ</span>
                  </li>
                ))}
              </ul>
              <hr />
              <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                <span>Tổng cộng:</span>
                <span className="text-danger">{getTotalPrice().toLocaleString()} VNĐ</span>
              </div>
              <Link to="/checkout" className="btn btn-success w-100 fw-bold py-2">
                Tiến hành thanh toán
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;