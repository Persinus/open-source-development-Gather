# 🌐 Gather Clone

Đây là **dự án môn học Phát triển Mã nguồn mở**, được thực hiện dưới dạng **clone của Gather.town** – một nền tảng nổi tiếng cho phép mọi người gặp gỡ, trò chuyện và làm việc cùng nhau trong không gian ảo.  
Mục tiêu của dự án là xây dựng một môi trường **multiplayer** trực quan, dễ sử dụng và có tính tương tác cao.

Dự án mang lại trải nghiệm tương tự Gather:  
✨ Người chơi có thể di chuyển nhân vật trong bản đồ tile-based  
✨ Khi đến gần nhau sẽ tự động bật video chat  
✨ Có thể tham gia phòng riêng để trò chuyện nhóm nhỏ  
✨ Hỗ trợ nhiều người chơi trong cùng một không gian ảo  

Dự án này là **fork từ [Gather Clone](https://github.com/trevorwrightdev/gather-clone)** – một project trước đó cũng được lấy cảm hứng từ Gather.town.  

---

## 🛠 Công nghệ sử dụng

- **🔐 Auth & Data (Supabase + RLS)**
  - Người chơi đăng nhập bằng **Supabase Auth** (hỗ trợ email, OAuth...).  
  - Áp dụng **RLS (Row Level Security)** để đảm bảo mỗi người chơi chỉ truy cập dữ liệu của chính họ (ví dụ: hồ sơ cá nhân, inventory, cài đặt).  
  - Các dữ liệu công khai như **thông tin bản đồ, định nghĩa vật phẩm** có thể để ở bảng không bật RLS để mọi người đều truy cập được.  

- **⚡ Realtime State (Socket.io)**
  - **Supabase Realtime** thích hợp cho các sự kiện CRUD cơ bản (ví dụ: chat, cập nhật dữ liệu nhỏ).  
  - Tuy nhiên với các logic game đòi hỏi tốc độ cao như **di chuyển nhân vật, combat, đồng bộ trạng thái** thì dùng **Socket.io** là tối ưu.  
  - **Luồng xử lý:**  
    1. Người chơi login trên client.  
    2. Client gửi **JWT Supabase** đến server Socket.io.  
    3. Server xác thực → cấp quyền → cho phép join vào phòng (room).  

- **🎨 Frontend (Next.js + Tailwind + Pixi.js)**
  - **Next.js**: Xử lý phần giao diện web, routing, lobby, dashboard và các trang phụ.  
  - **Pixi.js**: Dùng để render bản đồ **tile-based**, hiển thị sprite nhân vật, hiệu ứng animation trên canvas.  
  - **TailwindCSS**: Thiết kế giao diện UI ngoài canvas (HUD, menu, overlay, bảng cài đặt) nhanh gọn, responsive.  

- **🎥 Voice/Video (Agora)**
  - Khi người chơi **đến gần nhau trong bản đồ**, Agora sẽ tự động bật video/voice chat.  
  - Nếu người chơi bước vào **khu vực riêng tư (private area)** thì hệ thống sẽ tạo một kênh riêng cho nhóm trong phòng đó.  
  - Tích hợp chặt với Socket.io: khi user join room → tự động join Agora channel.  

---

## 🚀 Tính năng chính

- 🗺️ **Tùy chỉnh không gian** bằng hệ thống **tileset** (người tạo map có thể sắp xếp gạch, vật thể).  
- 🎥 **Chat video theo khoảng cách (Proximity Chat):** chỉ bật video khi đến gần nhân vật khác, mô phỏng cảm giác “gặp gỡ ngoài đời thật”.  
- 🔒 **Chat riêng tư (Private Area):** hỗ trợ phòng chat nhỏ cho nhóm người dùng khi bước vào khu vực đặc biệt.  
- 👥 **Nhiều người chơi (Multiplayer):** đồng bộ hóa trạng thái và di chuyển của nhiều người chơi trên cùng bản đồ.  
- 🕹️ **Di chuyển tile-based:** nhân vật có thể di chuyển tự do trên bản đồ dạng lưới (grid).  

---

# I.⚙️ Hướng dẫn cài đặt chi tiết (A–Z)

## 1. Clone project về máy
```bash
git clone https://github.com/trevorwrightdev/gather-clone.git
```
## 2. Cài đặt phụ thuộc
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
**Ta có :**
- Backend: http://localhost:3001  
- Frontend: http://localhost:3000  

---

## Giao diện Backend & Frontend
| Frontend | Backend |
|---------|----------|
| ![Backend](https://github.com/user-attachments/assets/68156d3a-8594-4ab2-9605-a30c8025ac6c) | ![Frontend](https://github.com/user-attachments/assets/0a598b84-1ea6-4689-8bd1-5a99a2e0fec3) |
| *Hình 1: Màn Hình chạy của Front-end* | *Hình 2: Màn Hình chạy của Back-end* |


## 3. Tạo project Supabase

### 📌 Supabase là gì?
- **Supabase** là một nền tảng **Backend-as-a-Service (BaaS)** được xây dựng trên **PostgreSQL**.  
- Nó cung cấp sẵn nhiều tính năng quan trọng cho ứng dụng web/game:
  - 🗄️ **Database**: PostgreSQL với sức mạnh SQL đầy đủ.  
  - 🔐 **Auth**: Xác thực người dùng (email, mật khẩu, OAuth).  
  - 📂 **Storage**: Lưu trữ file (ảnh đại diện, asset, …).  
  - ⚡ **Realtime**: Nghe sự kiện thay đổi dữ liệu theo thời gian thực.  
  - 🛡️ **Row Level Security (RLS)**: Bảo mật dữ liệu ở mức từng dòng (mỗi user chỉ thấy dữ liệu của họ).  

### 🤔 Tại sao Gather-Clone chọn Supabase?
- **Tích hợp dễ dàng** với **Next.js** và frontend hiện đại.  
- **Auth + DB đồng bộ**: tài khoản người chơi login bằng Supabase Auth, liên kết trực tiếp với dữ liệu trong PostgreSQL (ví dụ: profile, inventory).  
- **Bảo mật mạnh mẽ**: nhờ RLS, đảm bảo mỗi người chơi chỉ đọc/ghi dữ liệu của riêng mình.  
- **Mã nguồn mở**: Supabase cũng là dự án open-source, phù hợp với tinh thần của môn học *Phát triển Mã nguồn mở*.  

---

### 🚀 Các bước tạo project Supabase

1. Vào [Supabase](https://supabase.com) → đăng nhập.  
2. Nhấn **New Project**.  
3. Điền **tên project**, chọn **region**, và đặt **mật khẩu cho database**.  
4. Khi project đã được tạo → vào **Project Settings → API** để lấy thông tin:  
   - `SUPABASE_URL` → Project URL.  
   - `SERVICE_ROLE` → Service Role Key (**chỉ dùng ở backend**, tuyệt đối không để lộ ra frontend).  
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Anon public key (**dùng ở frontend**).  

---

---
<img src="https://github.com/user-attachments/assets/8d214154-d6fc-47f0-9702-8ab44dbe72cf" width="100%" alt="Supabase Project" />
<p align="center"><em>Hình 3: Màn hình Project Supabase</em></p>

## 4. Tạo project Agora

### 📌 Agora là gì?
- **Agora** là một nền tảng **Realtime Engagement Platform** cung cấp API/SDK cho:
  - 🎥 **Video call**  
  - 🎤 **Voice chat**  
  - 👥 **Live streaming**  
- Điểm mạnh của Agora là **độ trễ thấp**, **ổn định**, và có sẵn SDK cho nhiều nền tảng (Web, iOS, Android, Unity...).  

### 🤔 Tại sao Gather-Clone chọn Agora?
- Dễ dàng tích hợp với **frontend (Next.js)** để bật video call theo khoảng cách (proximity).  
- Có thể tạo **private area chat**: khi user bước vào khu vực riêng → join vào channel riêng của Agora.  
- Hỗ trợ **nhiều người** trong cùng một phòng với chất lượng ổn định.  
- Kết hợp được với **Socket.io**: khi client join room trong game → server cấp token Agora → client tham gia channel video.  

---

### 🚀 Các bước tạo project Agora

1. Vào [Agora Console](https://console.agora.io) → đăng nhập.  
2. Vào **Project Management → Create Project**.  
3. Chọn chế độ **App ID + Certificate (khuyến nghị)** để đảm bảo bảo mật khi cấp token.  
4. Lấy thông tin cần thiết:
   - `NEXT_PUBLIC_AGORA_APP_ID` → App ID (dùng ở **frontend**).  
   - `APP_CERTIFICATE` → App Certificate (dùng ở **backend** để tạo token cho client).  

---

### 🛠️ Cách hoạt động với Gather-Clone

- Khi người chơi **join một phòng (room)**:  
  1. Client gửi request đến backend để xin token Agora.  
  2. Backend dùng `APP_CERTIFICATE` để tạo token hợp lệ.  
  3. Client dùng token này + `NEXT_PUBLIC_AGORA_APP_ID` để kết nối vào channel Agora.  
  4. Khi rời khỏi phòng → client rời channel.  

---

<img src="https://github.com/user-attachments/assets/d64073c9-7d58-47c2-8ae1-26a8f571d9d1" width="100%" alt="Agora Project" />
<p align="center"><em>Hình 4: Màn hình project đã tạo của Agora</em></p>

## 5. Cấu hình file `.env`

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

# II. 🔑 Hướng dẫn cấu hình Google OAuth cho Supabase

Để sử dụng đăng nhập Google trong dự án Gather Clone (hoặc bất kỳ app nào dùng Supabase Auth), bạn cần tạo Google OAuth Client ID và kết nối với Supabase.  

---

## 🧩 Google OAuth hoạt động thế nào?

- **OAuth 2.0** là giao thức xác thực ủy quyền.  
- Thay vì app của bạn trực tiếp xử lý **tài khoản + mật khẩu**, bạn ủy quyền cho Google làm việc đó.  
- Quy trình:  
  1. Người dùng nhấn **“Đăng nhập bằng Google”**.  
  2. App chuyển hướng người dùng đến Google để xác thực.  
  3. Google hỏi quyền → người dùng chấp nhận.  
  4. Google trả về **authorization code / access token** cho Supabase.  
  5. Supabase dùng token này để lấy thông tin cơ bản (email, avatar, tên) và tạo **user record** trong Auth.  

👉 Ưu điểm:  
- Bảo mật hơn (không phải lưu mật khẩu trong DB).  
- Nhanh chóng, quen thuộc với người dùng.  
- Có thể dùng thêm các provider khác (GitHub, Discord, Facebook...) qua Supabase.

---

## 🚀 Tại sao Supabase cần Google OAuth?

- **Supabase Auth** là hệ thống quản lý người dùng tích hợp sẵn (Authentication + Authorization).  
- Để người chơi có thể đăng nhập vào Gather Clone, bạn cần một cách xác thực.  
- Google OAuth giúp:  
  - Người chơi đăng nhập chỉ bằng 1 click.  
  - Tránh quản lý mật khẩu thủ công.  
  - Đồng bộ với **Supabase Database** (tự động tạo `user` trong bảng `auth.users`).  
- Sau khi login, Supabase cung cấp **JWT** để client dùng trong mọi request (ví dụ: chat, lưu map, tham gia room).  

---

## 1. Vào Google Cloud Console
👉 Truy cập: [https://console.cloud.google.com/](https://console.cloud.google.com/)  
Đăng nhập bằng tài khoản Google của bạn.

---

## 2. Tạo Project (nếu chưa có)
- Nhấn **Select a project** (góc trên cùng).
- Chọn **New Project**.
- Điền tên project → nhấn **Create**.

---

## 3. Bật Google OAuth API
- Trong menu trái → chọn **APIs & Services → Library**.
- Tìm **Google Identity Services API** hoặc **OAuth 2.0**.
- Nhấn **Enable**.

---

## 4. Cấu hình OAuth Consent Screen
- Vào **APIs & Services → OAuth consent screen**.
- Chọn **External** (nếu bạn muốn cho người dùng bên ngoài login bằng Google).
- Điền các thông tin yêu cầu:
  - **App name**
  - **User support email**
  - **Developer contact info**
- Nhấn **Save & Continue** cho đến khi hoàn tất.

---

## 5. Tạo OAuth Credentials
- Vào **APIs & Services → Credentials**.
- Nhấn **+ Create Credentials → OAuth Client ID**.
- Ở phần **Application type**, chọn **Web application**.
- Điền tên (ví dụ: `Supabase Auth`).
- Ở mục **Authorized redirect URIs**, nhập:  

👉 Thay `<project-ref>` bằng **Project Reference** trong Supabase (ví dụ: `abcd1234efgh5678`).

- Nhấn **Create**.

<img src="https://github.com/user-attachments/assets/06ce252f-f628-4ea8-b221-0756fb4965cc" width="100%" alt="OAuth Credentials" />
<p align="center"><em>Hình 5: Gán xong các URL JavaScript và URL Redirect</em></p>
---

## 6. Lấy Client ID & Client Secret
Sau khi tạo xong, Google sẽ hiện ra thông tin:  
- **Client ID**: `xxxxx.apps.googleusercontent.com`  
- **Client Secret**: `yyyyyyyyy`

| Client ID | Client Secret |
|-----------|---------------|
| ![Client ID](https://github.com/user-attachments/assets/8f8452dc-dd8c-4a7d-85d3-897ec0162e23) | ![Client Secret](https://github.com/user-attachments/assets/cad97a48-3c9d-4c1a-bd26-8df0cbedca63) |
| *Hình 6: Client ID* | *Hình 7: Client Secret* |


Hãy **copy** 2 thông tin này dán vào Supabase.


---

## 7. Cấu hình trong Supabase
- Quay lại **Supabase Dashboard** → **Authentication → Providers → Google**.
- Bật Google.
- Dán **Client ID** và **Client Secret** vừa lấy từ Google.
- Nhấn **Save**.
  
| Giao diện Authentication | Enable Google |
|-------------------------|---------------|
| ![Auth Dashboard](https://github.com/user-attachments/assets/ccbc5969-3733-41b1-b85e-5efd6ff52f3c) | ![Enable Google](https://github.com/user-attachments/assets/1c8af32a-7762-4e05-a842-303a750f23f4) |
| *Hình 8: Toàn bộ giao diện Authentication với Google* | *Hình 9: Nhập Client ID & Secret để bật Google* |

---



✅ Giờ bạn có thể sử dụng Google Login trong code:  
```ts
await supabase.auth.signInWithOAuth({ provider: "google" });
```


# III. 🔑 Hướng dẫn thêm bảng Posgresql ( Tính năng mới bản chính không cập nhật )


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

```Sql
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  username text,
  skin text DEFAULT 'default',
  created_at timestamptz DEFAULT now()
);
```
<img src="https://github.com/user-attachments/assets/8fbb0901-d9fa-4842-88d9-1fe19233b106" width="100%" alt="Profiles Table" /> <p align="center"><em>Hình 10: Màn hình bảng `profiles` trong Supabase</em></p>

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

<img src="https://github.com/user-attachments/assets/a555cd0f-fddb-4248-b48f-17d4c6a7c73e" width="100%" alt="Realms Table" />
<p align="center"><em>Hình 11: Màn hình bảng `public.realms` trong Supabase</em></p>

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

-   Tắt RLS : Nếu không bật RLS → bất kỳ ai có quyền truy cập bảng đều có thể thấy/chỉnh sửa toàn bộ dữ liệu trong bảng đó.

-   đổi only_Owner = False

| Realms | Profiles |
|--------|----------|
| ![Realms Table](https://github.com/user-attachments/assets/e70a2360-e8d2-408d-a587-ef55ca96ee6e) | ![Profiles Table](https://github.com/user-attachments/assets/3a573d27-a29b-46e2-a1ff-53c3376aa6fb) |
| *Hình 12: Dữ liệu bảng `realms`* | *Hình 1313: Dữ liệu bảng `profiles`* |


* * * * *

## 6 . Lưu ý
---------

-   Dự án Supabase cần bật **Authentication** để `auth.users` tồn tại

-   Các UUID được sinh tự động nhờ các extension đã bật

* * * * *

## 7. Tham khảo

-------------

-   Supabase Docs

-   [PostgreSQL UUID Functions](https://www.postgresql.org/docs/current/functions-uuid.html)

-   [pgcrypto Extension](https://www.postgresql.org/docs/current/pgcrypto.html)


# IV. 🔑 Phát triển Thêm + Demo Phát triển 
- Cải thiện UI của Web ( màu chủ đạo tím )
- Chuyển thành ngôn ngữ Tiếng Việt
- Thêm phần Âm Thanh nền
- Thêm hướng dẫn di chuyển
- cải thiện modal chọn skin 

| Hình 14 | Hình 15 |
|---------|---------|
| ![Hình 14](https://github.com/user-attachments/assets/caa1a97f-6cd1-4ead-85c3-b130152e05e5) | ![Hình 15](https://github.com/user-attachments/assets/03e07922-4d35-4d47-812b-3e22b5b8fa48) |
| *Hình 14.Màn hình khởi động * | *Hình 15.Màn hình đăng nhập bằng * |



| Hình 16 | Hình 17 |
|---------|---------|
| ![Hình 16](https://github.com/user-attachments/assets/f478048e-6732-48e0-9f44-8d3e91e82b04) | ![Hình 17](https://github.com/user-attachments/assets/94b17f6b-a6e2-4b7b-b656-52d2be903769) |
| *Hình 15.Màn hình chọn tài khoản đăng nhập * | *Hình 16.Màn hình duyệt các yêu cầu thông tin của google* |

| Hình 18 | Hình 19 |
|---------|---------|
| ![Hình 18](https://github.com/user-attachments/assets/6ceca737-ea56-4f81-bfbd-82d0752e7e51) | ![Hình 19](https://github.com/user-attachments/assets/5e89a065-eb99-4d86-8b12-e452d3ef91e4) |
| *Hình 18.Màn hình chính của web lúc bắt đầu* | *Hình 19.Màn hình tạo map* |

| Hình 20 | Hình 21 |
|---------|---------|
| ![Hình 20](https://github.com/user-attachments/assets/89878372-853f-45c7-9c55-b72f64e75afb) | ![Hình 21](https://github.com/user-attachments/assets/b89f9ed2-c99f-447d-9b1c-65a7895374af) |
| *Hình 20.Màn hình sửa map cho phù hợp* | *Hình 21.Màn hình chính khi có map* |

| Hình 22 | Hình 23 |
|---------|---------|
| ![Hình 22](https://github.com/user-attachments/assets/e256b341-d6a7-49b7-b7e2-3a7d72247b7c) | ![Hình 23](https://github.com/user-attachments/assets/0da192dd-e705-4422-ab91-c13417453a22) |
| *Hình 22.Màn hình khi chuẩn bị vào* | *Hình 23.màn hình khi đã vào map thành công* |

| Hình 24 | Hình 25 |
|---------|---------|
| ![Hình 24](https://github.com/user-attachments/assets/b458d7e3-db2d-4ab3-b0c0-28c96fb347d4) | ![Hình 25](https://github.com/user-attachments/assets/714bbb18-0900-46ec-b15d-55b3a3d2e574) |
| *Hình 24.Màn Hình lựa chọn skin nhân* | *Hình 25. Màn hình xóa map* |

| Hình 26 | Hình 27 |
|---------|---------|
| ![Hình 26](https://github.com/user-attachments/assets/15db6e6a-c58d-4dbd-b5ba-7c1f18bf3e0f) | ![Hình 27](https://github.com/user-attachments/assets/2ec14f5e-609c-4db2-92d0-ff6c8088627c) |
| *Hình 26.Màn hình hướng dẫn di chuyển* | *Hình 27.Màn hình dán link mời User khác* |

- User khác vào trình duyệt khác đăng nhập trước rồi mới nhận link liên kết mới liên kết được đến nhau 
- Dự án bảo đảm hoạt động trên localhost nếu setup chuẩn như trên , nếu cần phát triển lên web cho mọi người xài cần vào GG console gắn thêm Url FE và back end

**Phát triển thêm bởi Persinus**. Nếu bạn muốn đóng góp hoặc gửi phản hồi, vui lòng mở [issue](#) hoặc gửi pull request trên GitHub. Mọi đóng góp đều được hoan nghênh! 🎉

