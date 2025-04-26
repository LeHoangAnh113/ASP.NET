import { useEffect, useState } from "react";
import orderDetailAPI from "../../services/orderDetailAPI";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderDetail = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await orderDetailAPI.getAll();
      setDetails(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    }
  };

  return (
    <div className="container mt-4 bg-white p-4 rounded shadow">
      <h2 className="mb-4">📄 Chi tiết Đơn hàng</h2>
      <Table striped bordered hover responsive>
        <thead className="table-white">
          <tr>
            <th>#ID</th>
            <th>🧾 Mã Đơn hàng</th>
            <th>📦 Mã sản phẩm</th>
            <th>📛 Tên sản phẩm</th>
            <th>🔢 Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {details.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.orderId}</td>
              <td>{d.productId}</td>
              <td>{d.product?.name || "Không có tên"}</td>
              <td>{d.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderDetail;
