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
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url> #Url chính của Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>  #Anon key của Supabase = public Api key
NEXT_PUBLIC_BASE_URL=http://localhost:3000  #Localhost của Front-end
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001 # Localhost của backend
SERVICE_ROLE=<your-service-role-key>  
NEXT_PUBLIC_AGORA_APP_ID=<your-agora-app-id>
APP_CERTIFICATE=<your-app-certificate> 
```

# 🔑 Hướng dẫn cấu hình Google OAuth cho Supabase

Để sử dụng đăng nhập Google trong dự án Gather Clone (hoặc bất kỳ app nào dùng Supabase Auth), bạn cần tạo Google OAuth Client ID và kết nối với Supabase.  

---

## 📌 Các bước chi tiết

### 1. Vào Google Cloud Console
👉 Truy cập: [https://console.cloud.google.com/](https://console.cloud.google.com/)  
Đăng nhập bằng tài khoản Google của bạn.

---

### 2. Tạo Project (nếu chưa có)
- Nhấn **Select a project** (góc trên cùng).
- Chọn **New Project**.
- Điền tên project → nhấn **Create**.

---

### 3. Bật Google OAuth API
- Trong menu trái → chọn **APIs & Services → Library**.
- Tìm **Google Identity Services API** hoặc **OAuth 2.0**.
- Nhấn **Enable**.

---

### 4. Cấu hình OAuth Consent Screen
- Vào **APIs & Services → OAuth consent screen**.
- Chọn **External** (nếu bạn muốn cho người dùng bên ngoài login bằng Google).
- Điền các thông tin yêu cầu:
  - **App name**
  - **chọn web application**
  - **User support email**
  - **Developer contact info**
- Nhấn **Save & Continue** cho đến khi hoàn tất.

---

### 5. Tạo OAuth Credentials
- Vào **APIs & Services → Credentials**.
- Nhấn **+ Create Credentials → OAuth Client ID**.
- Ở phần **Application type**, chọn **Web application**.
- Điền tên (ví dụ: `Supabase Auth`).
- Ở mục **Authorized redirect URIs**, nhập: https://<project-ref>.supabase.co/auth/v1/callback

👉 Thay `<project-ref>` bằng **Project Reference** trong Supabase (ví dụ: `abcd1234efgh5678`).

- Nhấn **Create**.

---

### 6. Lấy Client ID & Client Secret
Sau khi tạo xong, Google sẽ hiện ra thông tin:  
- **Client ID**: `xxxxx.apps.googleusercontent.com`  
- **Client Secret**: `yyyyyyyyy`  

Hãy **copy** 2 thông tin này.

---

### 7. Cấu hình trong Supabase
- Quay lại **Supabase Dashboard** → **Authentication → Providers → Google**.
- Bật Google.
- Dán **Client ID** và **Client Secret** vừa lấy từ Google.
- Nhấn **Save**.

---

✅ Giờ bạn có thể sử dụng Google Login trong code:  
```ts
await supabase.auth.signInWithOAuth({ provider: "google" });
```
<img width="1917" height="875" alt="image" src="https://github.com/user-attachments/assets/0529ef90-29e1-4205-abff-b846f3e58e72" />
<img width="1919" height="877" alt="image" src="https://github.com/user-attachments/assets/e3be2bee-f081-4ee5-aceb-1f380dbb2994" />
