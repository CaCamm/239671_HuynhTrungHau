const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Employee = require('./models/Employee');

const app = express();

app.use(cors());
app.use(express.json());

// Kết nối CSDL MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Kết nối MongoDB Atlas thành công!'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

// Endpoint kiểm tra trạng thái (/health)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend API is running' });
});

// 1. GET /api/employees (Lấy danh sách & Tìm kiếm theo search parameter)
app.get('/api/employees', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { employeeId: { $regex: search, $options: 'i' } },
          { fullName: { $regex: search, $options: 'i' } }
        ]
      };
    }
    const employees = await Employee.find(query);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// 2. GET /api/employees/:id (Lấy thông tin 1 nhân viên theo employeeId hoặc _id)
app.get('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const employee = await Employee.findOne({
      $or: [
        { employeeId: id },
        ...(isObjectId ? [{ _id: id }] : [])
      ]
    });

    if (!employee) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// 3. POST /api/employees (Thêm nhân viên mới)
app.post('/api/employees', async (req, res) => {
  try {
    const { employeeId, fullName, email } = req.body;

    if (!employeeId || !fullName || !email) {
      return res.status(400).json({ message: 'Mã nhân viên, họ tên và email là bắt buộc!' });
    }

    const existingEmp = await Employee.findOne({ employeeId });
    if (existingEmp) {
      return res.status(400).json({ message: 'Mã nhân viên đã tồn tại trong hệ thống!' });
    }

    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: 'Dữ liệu không hợp lệ', error: error.message });
  }
});

// 4. PUT /api/employees/:id (Cập nhật thông tin nhân viên)
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const updatedEmployee = await Employee.findOneAndUpdate(
      {
        $or: [
          { employeeId: id },
          ...(isObjectId ? [{ _id: id }] : [])
        ]
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên để cập nhật' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: 'Cập nhật thất bại', error: error.message });
  }
});

// 5. DELETE /api/employees/:id (Xóa nhân viên)
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const deletedEmployee = await Employee.findOneAndDelete({
      $or: [
        { employeeId: id },
        ...(isObjectId ? [{ _id: id }] : [])
      ]
    });

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên để xóa' });
    }
    res.status(200).json({ message: 'Xóa hồ sơ nhân viên thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});