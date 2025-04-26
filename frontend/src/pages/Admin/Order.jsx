import { useEffect, useState } from "react";
import orderAPI from "../../services/orderAPI";
import { Table, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await orderAPI.getAll();
      setOrders(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN");
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge bg="warning">Chờ xử lý</Badge>;
      case "confirmed":
        return <Badge bg="info">Đã xác nhận</Badge>;
      case "shipped":
        return <Badge bg="primary">Đang giao</Badge>;
      case "completed":
        return <Badge bg="success">Hoàn tất</Badge>;
      case "cancelled":
        return <Badge bg="danger">Đã hủy</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container mt-4 bg-white p-4 rounded shadow">
      <h2 className="mb-4">📦 Quản lý Đơn hàng</h2>
      <Table striped bordered hover responsive>
        <thead className="table-white">
          <tr>
            <th>ID</th>
            <th>👤 Người dùng</th>
            <th>📅 Ngày đặt</th>
            <th>📍 Địa chỉ</th>
            <th>💵 Tổng tiền</th>
            <th>📌 Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.user?.name || "Không có tên"}</td>
              <td>{formatDate(o.orderDate)}</td>
              <td>{o.address}</td>
              <td>{formatCurrency(o.total)}</td>
              <td>{getStatusBadge(o.status)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Order;
