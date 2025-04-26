import { useState, useEffect } from "react";
import userAPI from "../../services/userAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const User = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userAPI.getAll();
        setUsers(data);
      } catch (err) {
        setError("Không thể tải danh sách người dùng");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá người dùng này?");
    if (!confirmDelete) return;
    try {
      setDeletingId(id); // cho biết đang xoá ai
      await userAPI.delete(id);
      setUsers(users.filter(user => user.id !== id));
      toast.success("✅ Xoá người dùng thành công!");
    } catch (err) {
      toast.error("❌ Lỗi khi xoá người dùng");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id) => navigate(`/admin/user/edit/${id}`);
  const handleAdd = () => navigate("/admin/user/add");

  if (loading) return <div className="container mt-4">Đang tải dữ liệu...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="card bg-white text-dark shadow">
        <div className="card-header d-flex justify-content-between align-items-center text-white"
          style={{ backgroundColor: "#6c757d" }}
        >
          <h4 className="mb-0">👥 Quản lý Người dùng</h4>
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={handleAdd}
          >
            <i className="bi bi-person-plus"></i> Thêm người dùng
          </button>
        </div>
        <div className="card-body">
          <table className="table table-hover table-bordered">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">Không có người dùng nào.</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user.id)}>
                        Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(user.id)}
                        disabled={deletingId === user.id}
                      >
                        {deletingId === user.id ? "Đang xoá..." : "Xoá"}
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

export default User;
