import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoryAPI from "../../../services/categoryAPI";

const EditCategory = () => {
  const { id } = useParams(); // lấy id từ URL
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await categoryAPI.getById(id);
        setName(res.data.name);
        setImage(res.data.image || "");
      } catch (err) {
        alert("Không tìm thấy danh mục.");
        navigate("/admin/category");
      }
    };
    fetchCategory();
  }, [id, navigate]);

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "") return alert("Vui lòng nhập tên danh mục");
  
    try {
      console.log("Gửi dữ liệu cập nhật:", { id, name, image }); // 👈 debug
      const res = await categoryAPI.update(id, {
        id: parseInt(id), // truyền id vào body
        name,
        image,
        products: [] // nếu controller yêu cầu
      });      
      console.log("Phản hồi thành công:", res); // 👈 debug
      alert("Cập nhật danh mục thành công!");
      navigate("/admin/category");
    } catch (err) {
      console.error("Chi tiết lỗi cập nhật:", err.response?.data || err.message);
      alert("Lỗi khi cập nhật danh mục.");
    }
  };
  

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-warning text-white">
          <h4 className="mb-0">✏️ Sửa Danh Mục</h4>
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
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Link ảnh (tuỳ chọn)</label>
              <input
                type="text"
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Cập nhật
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

export default EditCategory;
