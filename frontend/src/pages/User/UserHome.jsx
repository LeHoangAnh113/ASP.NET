// src/pages/UserHome.jsx
import React, { useEffect, useState } from 'react';
import productAPI from '../../services/productAPI';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Thư viện thông báo

const UserHome = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productAPI.getAll();
        setProducts(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
      cart[existingProductIndex].quantity += 1;
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
      product.quantity = 1;  // Mặc định số lượng là 1
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));  // Lưu lại giỏ hàng
    toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Tất Cả Sản Phẩm</h2>
      <div className="row gy-4">
        {products.length === 0 ? (
          <p className="text-center text-muted">Chưa có sản phẩm.</p>
        ) : (
          products.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`/images/${product.image}?t=${new Date().getTime()}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "400px", objectFit: "cover"}}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-success fw-bold">{product.price.toLocaleString()} VNĐ</p>

                  <div className="d-flex justify-content-between">
                    <Link to={`/product/${product.id}`} className="btn btn-sm btn-outline-success w-48">
                      🛒 Mua ngay
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-warning w-48"
                      onClick={() => addToCart(product)}
                    >
                      Thêm vào Giỏ hàng
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserHome;