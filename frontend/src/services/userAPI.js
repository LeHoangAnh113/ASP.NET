import axios from "../utils/axiosConfig";

// Lấy token từ localStorage
const getToken = () => localStorage.getItem("admin");

// Hàm trả về headers với token
const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${getToken()}`
});

// Lấy tất cả user
const getAll = async () => {
  try {
    const response = await axios.get('/api/User', {
      headers: getHeaders()
    });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.error('Lỗi khi lấy danh sách user:', error.response?.statusText || error.message);
    throw error;
  }
};

// Lấy user theo id
const getById = async (id) => {
  try {
    const response = await axios.get(`/api/User/${id}`, {
      headers: getHeaders()
    });
    return response.data; // Dữ liệu user theo ID
  } catch (error) {
    console.error(`Lỗi khi lấy user với ID ${id}:`, error.response?.statusText || error.message);
    throw error;
  }
};

// Thêm mới user
const createUser = async (newUser) => {
  try {
    const response = await axios.post('/api/User', newUser, {
      headers: getHeaders()
    });
    return response.data; // Dữ liệu user mới được tạo
  } catch (error) {
    console.error('Lỗi khi thêm user:', error.response?.statusText || error.message);
    throw error;
  }
};

// Cập nhật user
const updateUser = async (id, updatedUser) => {
  try {
    await axios.put(`/api/User/${id}`, updatedUser, {
      headers: getHeaders()
    });
  } catch (error) {
    console.error(`Lỗi khi cập nhật user với ID ${id}:`, error.response?.statusText || error.message);
    throw error;
  }
};

// Xoá user
const deleteUser = async (id) => {
  try {
    await axios.delete(`/api/User/${id}`, {
      headers: getHeaders()
    });
  } catch (error) {
    console.error('Lỗi khi xoá user:', error.response?.statusText || error.message);
    throw error;
  }
};

const userAPI = {
  getAll,
  getById,
  createUser,
  updateUser,
  delete: deleteUser
};

export default userAPI;
