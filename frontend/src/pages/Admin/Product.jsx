import { useEffect, useState } from "react";
import productAPI from "../../services/productAPI";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();  // Khai báo hook navigate
  const location = useLocation();
  const message = location.state?.message;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await productAPI.getAll();
      setProducts(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
  };

  // Hàm điều hướng đến trang thêm sản phẩm
  const handleAddProduct = () => {
    navigate('/admin/product/add');  // Đổi '/add-product' thành đường dẫn bạn muốn điều hướng đến
  };

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        window.history.replaceState({}, document.title); // xóa state sau khi hiển thị
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  // Hàm xóa sản phẩm
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá sản phẩm này?");
    if (!confirmDelete) return;
  
    try {
      await productAPI.remove(id); // gọi API
      navigate("/admin/product", {
        state: { message: "🗑️ Đã xoá sản phẩm thành công!" }
      });
      fetchData(); // cập nhật lại danh sách
    } catch (error) {
      console.error("Lỗi khi xoá sản phẩm:", error);
    }
  };
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        window.history.replaceState({}, document.title);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);
  
  

  return (
    <div className="container mt-4">
        {message && (
          <div className="alert alert-success text-center" role="alert">
            {message}
          </div>
        )}
      <div className="card bg-white text-dark shadow">
        <div className="card-header d-flex justify-content-between align-items-center text-white"
          style={{ backgroundColor: "#0077b6" }} // xanh da trời đậm
        >
          <h4 className="mb-0">📦 Quản lý Sản phẩm</h4>
          <button
            className="btn btn-success d-flex align-items-center gap-2"
            onClick={handleAddProduct}
          >
            <i className="bi bi-plus-circle"></i> Thêm sản phẩm
          </button>
        </div>

        <div className="card-body">
          <table className="table table-hover table-bordered">
            <thead className="table-light">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted">Không có sản phẩm nào.</td>
                </tr>
              ) : (
                products.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price.toLocaleString()} ₫</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => navigate(`/admin/product/edit/${item.id}`)}  // Điều hướng đến trang sửa sản phẩm
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

export default Product;
