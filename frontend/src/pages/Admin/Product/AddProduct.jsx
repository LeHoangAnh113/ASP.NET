import { useState, useEffect } from "react";
import productAPI from '../../../services/productAPI';
import categoryAPI from '../../../services/categoryAPI';
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    qty: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryAPI.getAll();
        setCategories(res.data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        ...form,
        price: parseFloat(form.price),
        qty: parseInt(form.qty),
        categoryId: parseInt(form.categoryId),
      };
      await productAPI.create(newProduct);
      navigate("/admin/product", { state: { message: "🎉 Thêm sản phẩm thành công!" } });
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="card">
        <div className="card-header">
          <h4>➕ Thêm Sản phẩm</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Tên sản phẩm</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-1212">
              <label className="form-label">Giá</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-1212">
              <label className="form-label">Số lượng</label>
              <input
                type="number"
                className="form-control"
                name="qty"
                value={form.qty}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Link hình ảnh</label>
              <input
                type="text"
                className="form-control"
                name="image"
                value={form.image}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Danh mục</label>
              <select
                name="categoryId"
                className="form-select"
                value={form.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Thêm sản phẩm
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => navigate("/admin/Product")}
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

export default AddProduct;
