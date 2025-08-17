# Gather Clone

👉 [Xem demo](https://www.youtube.com/watch?v=AnhsC7Fmt20)

Dự án **clone của Gather.town** với các tính năng: không gian tuỳ chỉnh, chat video theo khoảng cách, và networking nhiều người chơi.

Đây là bản **fork từ Realms** – một project trước đó cũng được lấy cảm hứng từ Gather. [Xem tại đây](https://github.com/trevorwrightdev/realms).

---

## 🛠 Công nghệ sử dụng
- **Next.js** – Frontend  
- **Supabase** – Cơ sở dữ liệu & xác thực  
- **Socket.io** – Realtime networking  
- **TailwindCSS** – Giao diện  
- **Pixi.js** – Render đồ hoạ tile-based  
- **Agora** – Video call  

---

## 🚀 Tính năng chính
- Tuỳ chỉnh không gian bằng tilesets  
- Chat video theo khoảng cách (proximity video chat)  
- Chat riêng trong khu vực (private area)  
- Hỗ trợ nhiều người chơi cùng lúc  
- Di chuyển dựa trên tile-based  

---

## ⚙️ Hướng dẫn cài đặt chi tiết (A–Z)

### 1. Clone project về máy
```bash
git clone https://github.com/trevorwrightdev/gather-clone.git
```
### 2. Cài đặt phụ thuộc
**Frontend**
```bash
cd frontend
npm install
```
**backend**
```bash
cd Backend
npm install
```
### 3. Tạo project Supabase

1. Vào [Supabase](https://supabase.com) → đăng nhập.  
2. Nhấn **New Project**.  
3. Điền **tên project**, chọn **region**, và đặt **mật khẩu cho database**.  
4. Khi project tạo xong → vào **Project Settings → API** để lấy:  
   - `SUPABASE_URL` → Project URL  
   - `SERVICE_ROLE` → Service Role Key (chỉ dùng ở **backend**, tuyệt đối không để lộ ra frontend)  
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Anon public key (dùng cho **frontend**)  

---

### 4. Tạo project Agora

1. Vào [Agora Console](https://console.agora.io) → đăng nhập.  
2. Vào **Project Management → Create Project**.  
3. Chọn chế độ **App ID + Certificate (khuyến nghị)**.  
4. Lấy thông tin:  
   - `NEXT_PUBLIC_AGORA_APP_ID` → App ID  
   - `APP_CERTIFICATE` → App Certificate (dùng ở **backend** để tạo token cho client)  

---

### 5. Cấu hình file `.env`

📌 Trong thư mục **backend/.env** tạo file với nội dung:  
```env
FRONTEND_URL=http://localhost:3000   # hoặc domain frontend
SUPABASE_URL=<your-supabase-url>
SERVICE_ROLE=<your-service-role-key>
```
📌  Trong thư mục `frontend/.env.local` tạo file với nội dung:

```env
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001 
SERVICE_ROLE=<your-service-role-key>
NEXT_PUBLIC_AGORA_APP_ID=<your-agora-app-id>
APP_CERTIFICATE=<your-app-certificate>
```
