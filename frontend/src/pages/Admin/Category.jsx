import { useEffect, useState } from "react";
import categoryAPI from "../../services/categoryAPI";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await categoryAPI.getAll();
    setCategories(res.data);
  };

  
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá không?")) {
      try {
        await categoryAPI.delete(id);
        fetchData(); // reload danh sách sau khi xoá
      } catch (err) {
        alert("Lỗi khi xoá danh mục.");
        console.error("Chi tiết lỗi:", err.response?.data || err.message);
      }
    }
  };
  

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0 fw-semibold d-flex align-items-center gap-2">
            📁 Quản lý Danh mục
          </h4>
          <button
            className="btn btn-success d-flex align-items-center gap-2"
            onClick={() => navigate("/admin/category/add")} // thêm sự kiện điều hướng
          >
            <i className="bi bi-plus-circle"></i> Thêm Danh Mục
          </button>
        </div>

        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Tên danh mục</th>
                <th style={{ width: "150px" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-muted">
                    Không có danh mục nào.
                  </td>
                </tr>
              ) : (
                categories.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                    <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => navigate(`/admin/Category/edit/${item.id}`)}  // Điều hướng đến trang sửa sản phẩm
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Xoá
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Category;
