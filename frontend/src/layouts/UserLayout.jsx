import React, { useEffect, useState } from 'react';
import axios from 'axios';
import fashion2 from '../asset/slide_1.jpg';
import { Link, Outlet } from 'react-router-dom';

const UserLayout = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Lỗi khi tải danh mục:", error);
      });
  }, []);

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Danh mục
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {categories.map((category) => (
                    <li key={category._id}>
                      <Link className="dropdown-item" to={`/category/${category._id}`}>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <button className="nav-link">Offers</button>
              </li>
              <li className="nav-item">
                <button className="nav-link">Contact</button>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">Giỏ hàng 🛒</Link>
              </li>
              <li className="nav-item">
                <Link to="login" className="btn btn-success">Đăng nhập</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-success">Become a Seller</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Banner */}
      <div className="banner position-relative mt-5">
        <img
          src={fashion2}
          alt="Banner"
          className="img-fluid w-100"
          style={{ maxHeight: '500px', objectFit: 'cover' }}
        />
      </div>

      {/* Nội dung trang */}
      <div className="container my-5">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white pt-5 pb-4 mt-5">
        <div className="container text-md-left">
          <div className="row text-md-left">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-success">OneShop</h5>
              <p>Nơi bạn tìm thấy mọi sản phẩm yêu thích, giao hàng nhanh chóng, uy tín hàng đầu.</p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-success">Quick Links</h5>
              <p><a href="#" className="text-white text-decoration-none">Home</a></p>
              <p><a href="#" className="text-white text-decoration-none">Shop</a></p>
              <p><a href="#" className="text-white text-decoration-none">Offers</a></p>
              <p><a href="#" className="text-white text-decoration-none">Contact</a></p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-success">Support</h5>
              <p><a href="#" className="text-white text-decoration-none">Help Center</a></p>
              <p><a href="#" className="text-white text-decoration-none">Terms & Conditions</a></p>
              <p><a href="#" className="text-white text-decoration-none">Privacy Policy</a></p>
              <p><a href="#" className="text-white text-decoration-none">Report Issue</a></p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-success">Contact</h5>
              <p><i className="fas fa-home me-3"></i> HCM, Việt Nam</p>
              <p><i className="fas fa-envelope me-3"></i> top1@oneshop.com</p>
              <p><i className="fas fa-phone me-3"></i> +84 347 933 632</p>
              <div className="mt-3">
                <a href="#" className="text-white me-4"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-white me-4"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-white me-4"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-white"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row text-center">
            <div className="col-md-12">
              <p className="mb-0">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
