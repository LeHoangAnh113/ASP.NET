import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "../../../services/userAPI";

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    role: ""
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userAPI.createUser(formData);
      navigate("/admin/user", { state: { message: "✅ Thêm người dùng thành công!" } });
    } catch (err) {
      console.error("Lỗi khi thêm người dùng:", err);
      setError("❌ Có lỗi xảy ra khi thêm người dùng.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">➕ Thêm Người dùng</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên người dùng</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Họ tên</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Vai trò</label>
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn vai trò --</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">
                <i className="bi bi-save"></i> Lưu
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/admin/user")}
              >
                Quay lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
