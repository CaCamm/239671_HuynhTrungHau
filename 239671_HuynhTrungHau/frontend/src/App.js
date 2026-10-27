import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    gender: 'Nam',
    dateOfBirth: '',
    department: '',
    position: '',
    email: '',
    phone: '',
    hireDate: '',
    status: 'Đang làm việc'
  });

  const fetchEmployees = async (query = '') => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/employees${query ? `?search=${query}` : ''}`);
      setEmployees(res.data);
    } catch (err) {
      showMessage('Lỗi khi tải danh sách nhân viên!', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(search);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.employeeId || !formData.fullName || !formData.email) {
      return showMessage('Vui lòng điền đầy đủ Mã NV, Họ tên và Email!', 'error');
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/employees/${editingId}`, formData);
        showMessage('Cập nhật thông tin nhân viên thành công!', 'success');
      } else {
        await axios.post(`${API_URL}/api/employees`, formData);
        showMessage('Thêm mới nhân viên thành công!', 'success');
      }
      resetForm();
      fetchEmployees();
    } catch (err) {
      showMessage(err.response?.data?.message || 'Thao tác thất bại!', 'error');
    }
  };

  const handleEdit = (emp) => {
    setEditingId(emp.employeeId);
    setFormData(emp);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hồ sơ nhân viên này không?')) {
      try {
        await axios.delete(`${API_URL}/api/employees/${id}`);
        showMessage('Xóa nhân viên thành công!', 'success');
        fetchEmployees();
      } catch (err) {
        showMessage('Xóa nhân viên thất bại!', 'error');
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      employeeId: '',
      fullName: '',
      gender: 'Nam',
      dateOfBirth: '',
      department: '',
      position: '',
      email: '',
      phone: '',
      hireDate: '',
      status: 'Đang làm việc'
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>HỆ THỐNG QUẢN LÝ NHÂN SỰ</h2>
      <p>Sinh viên: Huỳnh Trung Hậu - MSSV: 239671</p>

      {message.text && (
        <div style={{
          padding: '10px',
          marginBottom: '15px',
          backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          borderRadius: '4px'
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tìm theo Mã NV hoặc Họ tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 15px' }}>Tìm kiếm</button>
        <button type="button" onClick={() => { setSearch(''); fetchEmployees(''); }} style={{ padding: '8px 15px', marginLeft: '5px' }}>Đặt lại</button>
      </form>

      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>{editingId ? 'Cập Nhật Thông Tin Nhân Viên' : 'Thêm Hồ Sơ Nhân Viên Mới'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <input name="employeeId" placeholder="Mã nhân viên (*)" value={formData.employeeId} onChange={handleChange} disabled={!!editingId} required />
          <input name="fullName" placeholder="Họ và tên (*)" value={formData.fullName} onChange={handleChange} required />
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          <input name="department" placeholder="Phòng ban" value={formData.department} onChange={handleChange} />
          <input name="position" placeholder="Chức vụ" value={formData.position} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email (*)" value={formData.email} onChange={handleChange} required />
          <input name="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleChange} />
          <input type="date" name="hireDate" value={formData.hireDate} onChange={handleChange} />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Đang làm việc">Đang làm việc</option>
            <option value="Nghỉ việc">Nghỉ việc</option>
          </select>
          <div style={{ gridColumn: 'span 2' }}>
            <button type="submit" style={{ padding: '8px 20px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {editingId ? 'Cập nhật' : 'Thêm mới'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} style={{ padding: '8px 20px', marginLeft: '10px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      <h3>Danh Sách Nhân Viên</h3>
      {loading ? <p>Đang tải dữ liệu...</p> : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e9ecef' }}>
              <th>Mã NV</th>
              <th>Họ tên</th>
              <th>Phòng ban</th>
              <th>Chức vụ</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? employees.map(emp => (
              <tr key={emp.employeeId}>
                <td>{emp.employeeId}</td>
                <td>{emp.fullName}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.status}</td>
                <td>
                  <button onClick={() => handleEdit(emp)} style={{ marginRight: '5px' }}>Sửa</button>
                  <button onClick={() => handleDelete(emp.employeeId)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Xóa</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>Không có dữ liệu nhân viên</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;