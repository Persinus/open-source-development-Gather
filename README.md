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
**Sau đó chạy npm run dev : backend là 3001 localhost và Front-end là 3001**
<img width="1916" height="1007" alt="Ảnh chụp màn hình 2025-08-17 114107" src="https://github.com/user-attachments/assets/68156d3a-8594-4ab2-9605-a30c8025ac6c" />

<img width="1919" height="972" alt="Ảnh chụp màn hình 2025-08-17 113823" src="https://github.com/user-attachments/assets/0a598b84-1ea6-4689-8bd1-5a99a2e0fec3" />

### 3. Tạo project Supabase

1. Vào [Supabase](https://supabase.com) → đăng nhập.  
2. Nhấn **New Project**.  
3. Điền **tên project**, chọn **region**, và đặt **mật khẩu cho database**.  
4. Khi project tạo xong → vào **Project Settings → API** để lấy:  
   - `SUPABASE_URL` → Project URL  
   - `SERVICE_ROLE` → Service Role Key (chỉ dùng ở **backend**, tuyệt đối không để lộ ra frontend)  
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Anon public key (dùng cho **frontend**)  

---
<img width="1889" height="875" alt="Ảnh chụp màn hình 2025-08-17 112735" src="https://github.com/user-attachments/assets/8d214154-d6fc-47f0-9702-8ab44dbe72cf" />

### 4. Tạo project Agora

1. Vào [Agora Console](https://console.agora.io) → đăng nhập.  
2. Vào **Project Management → Create Project**.  
3. Chọn chế độ **App ID + Certificate (khuyến nghị)**.  
4. Lấy thông tin:  
   - `NEXT_PUBLIC_AGORA_APP_ID` → App ID  
   - `APP_CERTIFICATE` → App Certificate (dùng ở **backend** để tạo token cho client)
   - 
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d64073c9-7d58-47c2-8ae1-26a8f571d9d1" />

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
<img width="1904" height="879" alt="Ảnh chụp màn hình 2025-08-17 114921" src="https://github.com/user-attachments/assets/06ce252f-f628-4ea8-b221-0756fb4965cc" />

---

### 6. Lấy Client ID & Client Secret
Sau khi tạo xong, Google sẽ hiện ra thông tin:  
- **Client ID**: `xxxxx.apps.googleusercontent.com`  
- **Client Secret**: `yyyyyyyyy`
<img width="1919" height="884" alt="Ảnh chụp màn hình 2025-08-17 113649" src="https://github.com/user-attachments/assets/8f8452dc-dd8c-4a7d-85d3-897ec0162e23" />

<img width="471" height="393" alt="Ảnh chụp màn hình 2025-08-17 113525" src="https://github.com/user-attachments/assets/cad97a48-3c9d-4c1a-bd26-8df0cbedca63" />


Hãy **copy** 2 thông tin này dán vào Supabase.


---

### 7. Cấu hình trong Supabase
- Quay lại **Supabase Dashboard** → **Authentication → Providers → Google**.
- Bật Google.
- Dán **Client ID** và **Client Secret** vừa lấy từ Google.
- Nhấn **Save**.
<img width="1871" height="898" alt="Ảnh chụp màn hình 2025-08-17 113431" src="https://github.com/user-attachments/assets/ccbc5969-3733-41b1-b85e-5efd6ff52f3c" />
<img width="1901" height="865" alt="image" src="https://github.com/user-attachments/assets/1c8af32a-7762-4e05-a842-303a750f23f4" />

---



✅ Giờ bạn có thể sử dụng Google Login trong code:  
```ts
await supabase.auth.signInWithOAuth({ provider: "google" });
```




## 1. Đăng nhập Supabase

1. Vào [https://app.supabase.com](https://app.supabase.com)  
2. Chọn dự án của bạn hoặc tạo dự án mới  
3. Sau khi vào dự án, bạn sẽ thấy **Dashboard** của Supabase

---

## 2. Bật Extensions cần thiết

1. Trong menu bên trái, chọn **SQL Editor**  
2. Nhấn **New query**  
3. Dán SQL sau và nhấn **Run**:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```
-   `"uuid-ossp"`: cung cấp hàm `uuid_generate_v4()`

-   `"pgcrypto"`: cung cấp hàm `gen_random_uuid()`

* * * * *

## 3. Tạo bảng `profiles`
-----------------------

1.  Trong **SQL Editor**, nhấn **New query**

2.  Dán SQL sau và nhấn **Run**:

`CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  username text,
  skin text DEFAULT 'default',
  created_at timestamptz DEFAULT now()
);`
<img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/8fbb0901-d9fa-4842-88d9-1fe19233b106" />

-   `id`: liên kết với Supabase Auth

-   `username`: tên hiển thị người dùng

-   `skin`: mặc định `'default'`

-   `created_at`: thời gian tạo profile

* * * * *

## 4. Tạo bảng `realms`
---------------------

1.  Trong **SQL Editor**, nhấn **New query**

2.  Dán SQL sau và nhấn **Run**:

```SQL
CREATE TABLE public.realms (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  map_data jsonb,
  share_id uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  only_owner boolean NOT NULL DEFAULT true,
  owner_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```
<img width="1919" height="889" alt="image" src="https://github.com/user-attachments/assets/a555cd0f-fddb-4248-b48f-17d4c6a7c73e" />

-   `id`: UUID tự động

-   `name`: tên realm, bắt buộc

-   `description`: mô tả, tùy chọn

-   `map_data`: dữ liệu map dạng JSONB

-   `share_id`: UUID để chia sẻ

-   `only_owner`: chỉ chủ sở hữu mới truy cập

-   `owner_id`: liên kết với user

-   `created_at` / `updated_at`: thời gian tạo và cập nhật

* * * * *

## 5. Kiểm tra bảng
-----------------

-   Trong menu bên trái, vào **Table Editor**

-   Bạn sẽ thấy **profiles** và **realms**

-   Có thể nhấn **Insert Row** để thử thêm dữ liệu mẫu

<img width="1902" height="866" alt="image" src="https://github.com/user-attachments/assets/e70a2360-e8d2-408d-a587-ef55ca96ee6e" />


* * * * *

## 6 . Lưu ý
---------

-   Dự án Supabase cần bật **Authentication** để `auth.users` tồn tại

-   Các UUID được sinh tự động nhờ các extension đã bật

* * * * *

7\. Tham khảo
-------------

-   Supabase Docs

-   [PostgreSQL UUID Functions](https://www.postgresql.org/docs/current/functions-uuid.html)

-   [pgcrypto Extension](https://www.postgresql.org/docs/current/pgcrypto.html)
