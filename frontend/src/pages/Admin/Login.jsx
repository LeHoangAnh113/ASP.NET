import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig"; 
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Gửi dữ liệu:", { username, password });
  
      const res = await axios.post("https://localhost:5000/api/Auth/login", {
        username,
        password
      });
  
      console.log("Phản hồi:", res.data);
  
      localStorage.setItem("admin", res.data.token);
      navigate("/admin");
    } catch (error) {
      console.error("Chi tiết lỗi đăng nhập:", error); // Log full error
    
      if (error.response) {
        console.error("Lỗi từ server:", error.response.data);
        alert(`Lỗi server: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error("Không nhận được phản hồi từ server:", error.request);
        alert("Không nhận được phản hồi từ server. API có chạy không?");
      } else {
        console.error("Lỗi khi gửi yêu cầu:", error.message);
        alert(`Lỗi gửi yêu cầu: ${error.message}`);
      }
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Đăng nhập Admin</h2>
        <input
          type="text"
          placeholder="Tài khoản"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Đăng nhập</button>
      </div>
    </div>
  );
};

export default Login;
