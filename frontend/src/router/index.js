import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";

import Product from "../pages/Admin/Product";
import Category from "../pages/Admin/Category";
import User from "../pages/Admin/User";
import Order from "../pages/Admin/Order";
import OrderDetail from "../pages/Admin/OrderDetail";
import Login from "../pages/Admin/Login";
import UserLogin from "../pages/User/UserLogin";
// User Page
import ProductDetail from "../pages/User/ProductDetail";
import ProductList from "../pages/User/ProductList";
import ProductCart from "../pages/User/ProductCart";

import Cart from "../pages/User/Cart";
import History from "../pages/User/History";
import UserHome from "../pages/User/UserHome";

//Chức năng
import AddProduct from "../pages/Admin/Product/AddProduct";
import EditProduct from "../pages/Admin/Product/EditProduct";
import AddCategory from "../pages/Admin/Category/AddCategory";
import EditCategory from "../pages/Admin/Category/EditCategory";
import AddUser from "../pages/Admin/users/AddUser";
import EditUser from "../pages/Admin/users/EditUser";

//bostrap
import "bootstrap/dist/css/bootstrap.min.css";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Product />} />
          <Route path="category" element={<Category />} />
          <Route path="user" element={<User />} />
          <Route path="/admin/user/add" element={<AddUser />} />
          <Route path="/admin/user/edit/:id" element={<EditUser />} />
          <Route path="order" element={<Order />} />
          <Route path="order-detail" element={<OrderDetail />} />
          <Route path="product" element={<Product />} />
          <Route path="/admin/product/edit/:id" element={<EditProduct />} />
          <Route path="product/add" element={<AddProduct />} />
          <Route path="/admin/category/add" element={<AddCategory />} />
          <Route path="category/edit/:id" element={<EditCategory />} />
        </Route>


        <Route path="/login" element={<UserLogin />} />


        
        {/* User */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path="/product/:id" element={<ProductDetail />}></Route>
          <Route path="cart" element={<Cart />} />
          <Route path="history" element={<History />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="products" element={<ProductList />} />
          <Route path="cart-detail" element={<ProductCart />} />{" "}
          {/* đổi tên nếu cần */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
