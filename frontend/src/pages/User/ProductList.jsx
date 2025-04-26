import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = categoryId
          ? `http://localhost:5000/api/products/category/${categoryId}`
          : `http://localhost:5000/api/products`;

        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", err);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="container mt-4">
      <h2>Danh sách sản phẩm {categoryId && `(Danh mục ${categoryId})`}</h2>
      <div className="row">
        {products.map(product => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card h-100">
              <img
                src={product.image || "https://via.placeholder.com/300"}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-danger">{product.price.toLocaleString()} VND</p>
                <Link to={`/user/product/${product.id}`} className="btn btn-primary btn-sm">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
