# HỆ THỐNG QUẢN LÝ NHÂN SỰ (HR MANAGEMENT SYSTEM)

## 👤 THÔNG TIN SINH VIÊN
* **Họ và tên:** Huỳnh Trung Hậu
* **Mã số sinh viên (MSSV):** 239671

---

## 📝 MÔ TẢ HỆ THỐNG
Hệ thống Quản lý Nhân sự là ứng dụng Full-stack Web cho phép quản lý thông tin hồ sơ nhân viên một cách trực quan và hiệu quả. Hệ thống hỗ trợ đầy đủ các chức năng CRUD cơ bản bao gồm:
* Thêm mới hồ sơ nhân viên với đầy đủ thông tin cá nhân, phòng ban, chức vụ, ngày sinh, email, SĐT.
* Hiển thị danh sách nhân viên linh hoạt.
* Tìm kiếm nhân viên nhanh chóng theo Mã NV hoặc Họ và tên.
* Cập nhật thông tin nhân viên trực tiếp.
* Xóa hồ sơ nhân viên khỏi hệ thống.
* Toàn bộ ứng dụng được đóng gói bằng **Docker** và triển khai tự động trên nền tảng **Render** kết nối cơ sở dữ liệu cloud **MongoDB Atlas**.

---

## 🛠 CÔNG NGHỆ SỬ DỤNG
* **Frontend:** React.js, Axios, HTML5, CSS3, JavaScript (ES6+).
* **Backend:** Node.js, Express.js, Mongoose ODM.
* **Database:** MongoDB Atlas (Cloud Database).
* **DevOps & Containerization:** Docker, Docker Compose, Docker Hub.
* **Deployment & Hosting:** Render (Web Service), Git & GitHub.

---

## 🚀 HƯỚNG DẪN CHẠY ỨNG DỤNG Ở MÔI TRƯỜNG PHÁT TRIỂN (LOCAL DEVELOPMENT)

### 1. Yêu cầu tiên quyết
* Đã cài đặt [Node.js](https://nodejs.org/) (phiên bản 18 trở lên).
* Đã cài đặt [Docker Desktop](https://www.docker.com/products/docker-desktop/) (nếu chạy qua Docker).
* Đã cài đặt [Git](https://git-scm.com/).

### 2. Cấu hình & Chạy không qua Docker (Local Node.js)

#### **Bước 2.1: Clone Repository**
```bash
git clone [https://github.com/CaCamm/239671_HuynhTrungHau.git](https://github.com/CaCamm/239671_HuynhTrungHau.git)
cd 239671_HuynhTrungHau
GitHub Repository: https://github.com/CaCamm/239671_HuynhTrungHau.git

Docker Hub Backend: huynhhtrunghau/backend:latest (https://hub.docker.com/r/huynhhtrunghau/backend)

Docker Hub Frontend: huynhhtrunghau/frontend:latest (https://hub.docker.com/r/huynhhtrunghau/frontend)

Render App Frontend (Web): https://web-239671.onrender.com/

Render App Backend (API): https://api-239671.onrender.com/api/employees

Link Data MongoDB: mongodb+srv://s239671_db_user:OlXU0TGSxAA29pmS@cluster0.5saav2j.mongodb.net/239671_HuynhTrungHau?retryWrites=true&w=majority
