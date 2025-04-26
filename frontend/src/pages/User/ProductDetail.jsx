// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productAPI from '../../services/productAPI';
import { BsCartPlus } from 'react-icons/bs';  // Sử dụng biểu tượng từ react-icons
import { toast, ToastContainer } from 'react-toastify';  // Import thư viện thông báo
import 'react-toastify/dist/ReactToastify.css';  // Import css của react-toastify

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();  // Hook để điều hướng
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      console.log('Đang lấy sản phẩm với ID:', id);
      try {
        const res = await productAPI.getById(id);
        if (res.data) {
          setProduct(res.data);
        } else {
          console.error('Sản phẩm không tồn tại!');
        }
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Hàm xử lý khi nhấn "Thêm vào giỏ hàng"
  const handleAddToCart = () => {
    // Logic thêm sản phẩm vào giỏ hàng ở đây
    // Sau khi thêm vào giỏ hàng, hiển thị thông báo
    toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
  };

  if (!product) {
    return <p>Đang tải thông tin sản phẩm...</p>;
  }

  return (
    <div className="container mt-5">
      {product && product.name ? (
        <>
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow-sm border-0">
                <img
                  src={`/images/${product.image}`}
                  alt={product.name}
                  className="card-img-top img-fluid"
                  style={{ height: "100%", objectFit: "cover", maxHeight: "400px" }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm border-0 p-4">
                {/* Thêm tên sản phẩm */}
                <h2 className="card-title text-center mb-4">Tên Sản Phẩm: {product.name}</h2>
                {/* Thêm giá tiền */}
                <h4 className="text-success text-center mb-3">Giá Tiền: {product.price.toLocaleString()} VNĐ</h4>

                {/* Phần mô tả sản phẩm */}
                <p className="lead mb-4">{product.description}</p>

                <div className="d-flex justify-content-center mb-3">
                  <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAddToCart}>
                    <BsCartPlus /> Thêm vào giỏ hàng
                  </button>
                </div>

                {/* Phần Nút thanh toán ngay và Quay lại cùng hàng với Đánh giá sản phẩm */}<div className="d-flex justify-content-between align-items-center mt-4">
                  <div>
                    <h5 className="mb-3">Đánh giá sản phẩm:</h5>
                    <div className="d-flex justify-content-start align-items-center">
                      <span className="me-2">⭐⭐⭐⭐⭐</span>
                      <span>4.5/5</span>
                    </div>
                  </div>

                  {/* Nút thanh toán ngay và Quay lại */}
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success"
                      onClick={() => navigate('/checkout')}
                    >
                      Thanh toán ngay
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate(-1)}
                    >
                      Quay lại
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">Sản phẩm không tìm thấy.</p>
      )}

      {/* Thêm phần thông báo */}
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;