<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg">
  <img src="assets/banner-light.svg" width="100%" alt="Dương Minh Hoàng. Mobile & Full-stack Developer. FPT University, Hà Nội. Đang tìm cơ hội thực tập.">
</picture>

<p>
  <a href="mailto:hoangduongminhinwork@gmail.com"><img src="https://img.shields.io/badge/Email-0d1117?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
  <a href="https://www.facebook.com/Duong.Minh.Hoang.edu.vn"><img src="https://img.shields.io/badge/Facebook-0d1117?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook"></a>
</p>

<sub><a href="README.md">English</a> | <b>Tiếng Việt</b></sub>

</div>

## Giới thiệu

Mình là sinh viên Đại học FPT Hà Nội. Mình làm sản phẩm trọn vẹn: app Android và iOS từ một codebase Kotlin Multiplatform, web app bằng Next.js và TypeScript, backend Java có thanh toán và phân quyền theo vai trò. Mình dựng test và CI ngay từ đầu, và ghi lại các quyết định kiến trúc trong lúc làm.

- **Đang làm:** hai app Kotlin Multiplatform cho Android và iOS, một app tra cứu game và một app camera chụp theo dáng mẫu.
- **Đang tìm:** vị trí thực tập mobile (Android, Kotlin Multiplatform) hoặc full-stack.

## Công nghệ

<table>
  <tr>
    <td width="150"><b>Mobile</b></td>
    <td>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=kotlin,androidstudio,java,gradle,firebase&theme=dark">
        <img src="https://skillicons.dev/icons?i=kotlin,androidstudio,java,gradle,firebase&theme=light" height="40" alt="Kotlin, Android Studio, Java, Gradle, Firebase">
      </picture>
      <br><sub>Kotlin Multiplatform, Compose Multiplatform, Jetpack Compose, Coroutines, CameraX, Room, WorkManager, JNI</sub>
    </td>
  </tr>
  <tr>
    <td><b>Web</b></td>
    <td>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=ts,react,nextjs,tailwind,vite,nodejs&theme=dark">
        <img src="https://skillicons.dev/icons?i=ts,react,nextjs,tailwind,vite,nodejs&theme=light" height="40" alt="TypeScript, React, Next.js, Tailwind CSS, Vite, Node.js">
      </picture>
      <br><sub>Next.js App Router, TanStack Query, Zod, Express, Playwright, Vitest</sub>
    </td>
  </tr>
  <tr>
    <td><b>Backend &amp; dữ liệu</b></td>
    <td>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=java,postgres,supabase,redis,py&theme=dark">
        <img src="https://skillicons.dev/icons?i=java,postgres,supabase,redis,py&theme=light" height="40" alt="Java, PostgreSQL, Supabase, Redis, Python">
      </picture>
      <br><sub>Jakarta EE (Servlet, JSP, WebSocket), SQL Server, Postgres row-level security, REST API, webhook</sub>
    </td>
  </tr>
  <tr>
    <td><b>Công cụ</b></td>
    <td>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=git,github,githubactions,vercel&theme=dark">
        <img src="https://skillicons.dev/icons?i=git,github,githubactions,vercel&theme=light" height="40" alt="Git, GitHub, GitHub Actions, Vercel">
      </picture>
      <br><sub>CI pipeline, bản build release R8, Google Gemini API</sub>
    </td>
  </tr>
</table>

## Dự án nổi bật

Phần lớn dự án gần đây của mình nằm ở repo riêng tư. Mình sẵn sàng trình bày mã nguồn trong buổi phỏng vấn.

### Yokai Wiki Search

App tra cứu dành cho dòng game Yo-kai Watch trên Android và iOS, dựng từ một codebase Kotlin Multiplatform.

`Kotlin 2.4` `Compose Multiplatform` `Coroutines` `DataStore` `Coil` `GitHub Actions`

- Khoảng 60 nghìn dòng Kotlin dùng chung chứa toàn bộ UI và logic cho cả hai nền tảng.
- Hai phiên bản sản phẩm dựng từ cùng một codebase bằng một cờ Gradle. Source set riêng theo phiên bản giữ SDK quảng cáo ngoài bản dành cho trẻ em.
- Khoảng 1.300 unit test. CI chạy test Android, build bản debug và bản release R8, và biên dịch các target iOS trên macOS.
- Cổng phát hành trong Gradle chặn bản build cửa hàng nếu còn ID tạm.

<sub>Trạng thái: bản release Android đã chạy trên emulator, iOS biên dịch được trên CI, chưa phát hành. Repo riêng tư.</sub>

### PoseCam

App camera hiển thị dáng mẫu đè lên khung ngắm và chụp theo chuỗi dáng. Kotlin Multiplatform, dùng CameraX trên Android.

`Kotlin` `Compose Multiplatform` `CameraX` `kotlinx.serialization` `Python`

- Mỗi tính năng tách thành ba lớp domain, data và presentation. Các lựa chọn chính được ghi trong 12 bản ghi quyết định kiến trúc (ADR).
- Chỉnh màu chạy trên LUT engine xử lý bằng CPU viết bằng Kotlin, kèm công cụ Python để tạo LUT.
- Danh mục dáng từ xa được tải, kiểm tra, lưu cache và gộp với bộ dáng có sẵn.
- Khoảng 1.400 test, gồm cả test giao diện Compose trên desktop. Camera giả phục vụ bản demo.

<sub>Trạng thái: đang phát triển trên Android. Repo riêng tư.</sub>

### Dashboard phân tích UA

Dashboard cho một studio game mobile, lấy số liệu chi phí, doanh thu và chất lượng app trực tiếp từ bảy API quảng cáo và phân tích.

`TypeScript` `React 19` `Express` `Supabase` `Vercel Cron` `GitHub Actions`

- Mỗi nguồn một module provider (Google Ads, Meta, Unity Ads, AppLovin, AppsFlyer, AdMob, Play Vitals), chuẩn hoá về cùng một mô hình dữ liệu.
- Bộ giới hạn quota Google Ads: giới hạn số request đồng thời, giãn cách request, trần theo ngày và lùi lại khi gặp HTTP 429.
- GitHub Actions đồng bộ snapshot vào Supabase mỗi 30 phút. Vercel Cron gửi báo cáo hằng ngày qua Telegram.
- 64 bộ kiểm tra offline (khoảng 2.600 assertion) chạy trên CI cùng typecheck và build.
- Phiên đăng nhập dùng cookie httpOnly, và dữ liệu nhạy cảm được che trước khi đưa vào prompt Gemini.

<sub>Repo riêng tư, dữ liệu thật của studio.</sub>

### Hồi Nét

Web app khôi phục, làm nét và tô màu ảnh cũ bằng Google Gemini.

<a href="https://web-ssg.vercel.app"><img src="assets/hoi-net.jpg" width="100%" alt="Trang chủ Hồi Nét: khôi phục ảnh cũ bằng AI"></a>

`Next.js 16` `TypeScript` `Supabase` `Gemini API` `Redis` `TanStack Query`

- Đăng nhập email và Google qua Supabase, có hCaptcha, chống CSRF và giới hạn tần suất bằng Redis.
- Trang quản trị cho người dùng, yêu cầu khôi phục ảnh và bài blog. Optimistic locking trả HTTP 409 và hiện hộp thoại xung đột khi hai admin cùng sửa một bản ghi.
- Tách nền ảnh chạy ngay trên trình duyệt bằng ONNX Runtime Web.

**[Xem demo](https://web-ssg.vercel.app)** | **[Mã nguồn](https://github.com/DuongMinhHoangHE191087/hoi_net)**

### Ban Hoa Qua Online

Sàn thương mại điện tử hoa quả đa cửa hàng với năm vai trò: khách, khách hàng, chủ shop, shipper và admin.

`Java 17` `Jakarta EE 10` `Servlet / JSP` `SQL Server` `Tomcat 10` `WebSocket`

- Mã phân lớp Servlet, Service và DAO. Chuỗi filter xử lý xác thực, kiểm tra vai trò, CSRF, giới hạn tần suất và security header.
- Thanh toán VietQR qua webhook SePay có chống trùng, đối chiếu số tiền và mã tham chiếu, và chốt đơn trong một transaction.
- Tác vụ định kỳ kết toán ví shop, huỷ đơn chưa thanh toán và đối soát thanh toán.
- Chat giữa người mua và người bán qua WebSocket, đăng nhập bằng Google.
- Nhóm bốn người. Mình viết khoảng 80% số commit.

**[Mã nguồn](https://github.com/DuongMinhHoangHE191087/Ban_Hoa_Qua_Online)**

## Dự án khác

| Dự án | Mình đã làm | Công nghệ |
| --- | --- | --- |
| **[Ticketbox](https://github.com/dghoang/PRJ301_GROUP7_SELLING_TICKET)** | Trưởng nhóm dự án môn PRJ301 (FPT): nền tảng bán vé sự kiện. Vé điện tử dạng QR ký bằng HMAC để check-in, thanh toán SePay, chat hỗ trợ qua WebSocket. | Java, Servlet / JSP, SQL Server |
| **SaaS quản lý lớp học** | App đa tenant cho giáo viên: lịch học, điểm danh, thu học phí. Postgres row-level security theo từng tenant, thu phí nguyên tử và thanh toán idempotent trong database function, test database chạy trên CI. | Next.js, Supabase, Vitest, Playwright |
| **Ghi chú cuộc họp on-device** | Dự án nhóm trên AI box MediaTek Genio 720: chuyển giọng nói thành văn bản và tóm tắt bằng LLM hoàn toàn offline. Mình làm tầng app Android: luồng ghi âm, database Room và pipeline AI. | Kotlin, Android, Room, JNI |
| **Gia cố app data-logger** | Rà soát một app data-logger Android có sẵn (Java, cổng serial qua JNI, cảm biến TCP). Ghi nhận 56 lỗi và sửa trong 10 đợt, có test hồi quy và CI gồm CodeQL. | Java, Android NDK, GitHub Actions |
| **[Website studio game](https://metafruit-psi.vercel.app)** | Website công ty song ngữ với CMS dựa trên Git, kèm kiểm thử end-to-end bằng Playwright, kiểm tra trợ năng (axe) và SEO. | Next.js 16, Tailwind 4, GSAP, Keystatic |

## Hoạt động trên GitHub

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/DuongMinhHoangHE191087/DuongMinhHoangHE191087/output/snake-dark.svg">
  <img src="https://raw.githubusercontent.com/DuongMinhHoangHE191087/DuongMinhHoangHE191087/output/snake-light.svg" width="100%" alt="Biểu đồ đóng góp vẽ thành con rắn">
</picture>
