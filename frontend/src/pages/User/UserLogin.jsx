import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig"; // giống admin
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS Toastify

const UserLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUserLogin = async () => {
        try {
            const res = await axios.post("https://localhost:5000/api/Auth/login", {
                username,
                password,
            });

            const { token, userId } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);

            // Thông báo đăng nhập thành công
            toast.success("Đăng nhập thành công!");

            navigate("/"); // hoặc navigate("/checkout") nếu muốn chuyển sau khi login để đặt hàng
        } catch (error) {
            if (error.response) {
                toast.error(`Lỗi: ${error.response.data?.message || "Sai tài khoản hoặc mật khẩu"}`);
            } else if (error.request) {
                toast.error("Không kết nối được đến máy chủ. Vui lòng thử lại sau.");
            } else {
                toast.error("Lỗi không xác định: " + error.message);
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Đăng nhập Người dùng</h2>
                <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleUserLogin}>Đăng nhập</button>
            </div>

            {/* Thêm ToastContainer để hiển thị thông báo */}
            <ToastContainer />
        </div>
    );
};

export default UserLogin;