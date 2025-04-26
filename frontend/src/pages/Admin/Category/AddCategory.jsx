// src/pages/admin/AddCategory.jsx
import { useState } from "react";
import categoryAPI from "../../../services/categoryAPI";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(""); // Nếu có trường image
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "") return alert("Vui lòng nhập tên danh mục");

    const newCategory = {
      name,
      image, // bỏ nếu không dùng ảnh
      products: []
    };

    console.log("Gửi dữ liệu:", newCategory); // 👈 Xem log này trong Console

    try {
        await categoryAPI.create(newCategory);
        alert("Thêm danh mục thành công!");
        navigate("/admin/category");
    } catch (err) {
        alert("Lỗi khi thêm danh mục.");
        console.error("Chi tiết lỗi:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">➕ Thêm Danh Mục</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên danh mục</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên danh mục"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Link ảnh (tuỳ chọn)</label>
              <input
                type="text"
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Nhập URL ảnh nếu có"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Lưu
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate("/admin/category")}
            >
              Quay lại
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
