import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productAPI from '../../../services/productAPI';
import categoryAPI from '../../../services/categoryAPI';// Giả sử bạn có API để lấy danh sách các danh mục

const EditProduct = () => {
  const { id } = useParams();  // Lấy id sản phẩm từ URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: '',
    qty: '',
    categoryId: ''
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  // Lấy thông tin sản phẩm từ API
  const fetchProduct = async () => {
    try {
      const res = await productAPI.getById(id); // Lấy sản phẩm theo ID
      setProduct(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
  };

  // Lấy danh sách danh mục sản phẩm từ API (nếu có)
  const fetchCategories = async () => {
    try {
      const res = await categoryAPI.getAll(); // Giả sử bạn có API để lấy tất cả các danh mục
      setCategories(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  // Xử lý thay đổi giá trị trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Xử lý khi gửi form chỉnh sửa
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productAPI.update(id, product);  // Gửi dữ liệu cập nhật tới API
      navigate("/admin/product", {
        state: { message: "✅ Cập nhật sản phẩm thành công!" }
      });
    } catch (error) {
      setMessage("Lỗi khi cập nhật sản phẩm!");
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  return (
    <div className="container mt-4">
      {message && <div className="alert alert-danger">{message}</div>}
      <div className="card bg-white text-dark shadow">
        <div className="card-header bg-light">
          <h4>✏️ Chỉnh sửa Sản phẩm</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Tên sản phẩm</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Giá</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Link Hình ảnh</label>
              <input
                type="text"
                className="form-control"
                id="image"
                name="image"
                value={product.image}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="qty" className="form-label">Số lượng</label>
              <input
                type="number"
                className="form-control"
                id="qty"
                name="qty"
                value={product.qty}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="categoryId" className="form-label">Danh mục</label>
              <select
                id="categoryId"
                name="categoryId"
                className="form-select"
                value={product.categoryId}
                onChange={handleInputChange}
                required
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-success">Cập nhật sản phẩm</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
