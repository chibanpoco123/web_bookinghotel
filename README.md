# Frontend Project : KING OF WIBU

## Jenkins CI

The root `Jenkinsfile` defines the CI pipeline for this repository. It installs
the backend and frontend dependencies, checks the backend entry point syntax,
runs the frontend tests, and builds the frontend. A failed stage stops the
pipeline.

### Jenkins setup

1. Install Jenkins with the **Pipeline** and **NodeJS** plugins.
2. In **Manage Jenkins → Tools**, add a NodeJS installation named `NodeJS 20`
   and select Node.js 20.x. The installation name must match the `Jenkinsfile`.
3. Create a **Pipeline** job. Under **Pipeline**, choose **Pipeline script from
   SCM**, select **Git**, enter this repository URL, and set the branch to
   `*/main`. Set the script path to `Jenkinsfile`.
4. Save and run **Build Now**. To run it on each GitHub push, configure a
   GitHub webhook pointing to `https://<your-public-jenkins-url>/github-webhook/`
   and enable the GitHub hook trigger in the job's build triggers. Jenkins must
   be reachable by GitHub for webhooks to work.

Render can remain connected to GitHub with Auto-Deploy enabled; it will deploy
commits independently of Jenkins. If deployments must wait for Jenkins to
pass, disable Render Auto-Deploy and configure a protected Render deploy hook
as a Jenkins credential, then add a deploy stage to the pipeline.

## Mô tả
Đây là một dự án frontend sử dụng React.js để xây dựng giao diện người dùng. 
Dự án được thiết kế để hiển thị đề tài đặt phòng khách sạn

---

## Công nghệ và thư viện sử dụng

### Ngôn ngữ
- **JavaScript**

### Thư viện chính
- **React**: Thư viện chính để xây dựng giao diện người dùng.
- **React Router Dom**: Quản lý routing trong ứng dụng SPA.
- **Axios**: Gửi yêu cầu HTTP và xử lý API.
- **Formik**: Hỗ trợ xây dựng biểu mẫu đơn giản và hiệu quả.
- **Yup**: Xác thực dữ liệu biểu mẫu.

### Giao diện
- **Bootstrap**: Thiết kế giao diện nhanh chóng và hiện đại.
- **Bootstrap Icons**: Bộ biểu tượng tích hợp sẵn.
- **React Icons**: Cung cấp các biểu tượng phong phú cho giao diện.
- **React Slick** và **Slick Carousel**: Tạo carousel đẹp mắt.

### Xử lý ngày tháng
- **React Datepicker**: Công cụ chọn ngày tháng trực quan.

### Tối ưu hiệu suất
- **Web Vitals**: Đánh giá hiệu suất của ứng dụng.

### DevDependencies
- **ESLint**: Kiểm tra và cải thiện chất lượng mã nguồn.
- **Babel Plugins**: Hỗ trợ cú pháp JavaScript hiện đại.

---

### Hướng dẫn cài đặt và chạy

## Lệnh Cài Đặt

Để cài đặt tất cả các thư viện cần thiết cho dự án, bạn có thể sử dụng lệnh sau:

```bash
npm install bootstrap react-datepicker react-icons react-router-dom react-slick slick-carousel web-vitals

```

## Hướng Dẫn Tải Dự Án Về và Chạy

1. **Mở thư mục dự án**:
   ```bash
   cd frontend
   ```

2. **Cài Đặt Các thư viện package**: Chạy lệnh sau để cài đặt tất cả các thư viện cần thiết:
   ```bash
   npm install
   ```

3. **Chạy Dự Án**: Sử dụng lệnh sau trên Terminal để khởi động websize:
   ```bash
   npm start
   ```

4. **Mở Trình Duyệt**: Truy cập vào `http://localhost:3000` (hoặc cổng mà Vite thông báo) để xem .

## Lưu Ý Khi Chạy Dự Án

- Đảm bảo rằng bạn đã cài đặt Node.js và npm trên máy tính của mình.
- Nếu gặp lỗi liên quan đến các thư viện, hãy kiểm tra phiên bản của Node.js và npm.
- Đảm bảo rằng bạn đã cài đặt tất cả các phụ thuộc cần thiết bằng cách chạy `npm install`.


### Tài Khoản Admin
user : admin
Password : admin123
### Cấu trúc thư mục

frontend/
├── public/         # Tài nguyên tĩnh (ảnh, favicon, HTML...)
├── src/  
│   ├── assets/     #Chứa các tệp CSS để định dạng giao diện.
│   ├── components/ #Các component nhỏ được dùng chung trong nhiều nơi.
│   ├── data/       #Lưu trữ các tệp dữ liệu tạm thời hoặc dữ liệu mẫu.
│   └── page/       #Các thành phần React đại diện cho từng trang giao diện.
│   └── route/      #Xử lý các đường dẫn (routes) của ứng dụng.
├── App.js          #File gốc của ứng dụng React.
├── index.js        #Entry point để render ứng dụng React vào DOM.
├── package.json    # Danh sách phụ thuộc và script
└── README.md       # Tài liệu hướng dẫn
