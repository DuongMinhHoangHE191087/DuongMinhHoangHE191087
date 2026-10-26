<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg">
  <img src="assets/banner-light.svg" width="100%" alt="Dương Minh Hoàng. Mobile & Full-stack Developer. FPT University, Hà Nội. Open to internship opportunities.">
</picture>

<p>
  <a href="mailto:hoangduongminhinwork@gmail.com"><img src="https://img.shields.io/badge/Email-0d1117?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
  <a href="https://www.facebook.com/Duong.Minh.Hoang.edu.vn"><img src="https://img.shields.io/badge/Facebook-0d1117?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook"></a>
</p>

<sub><b>English</b> | <a href="README.vi.md">Tiếng Việt</a></sub>

</div>

## About

I'm a student at FPT University in Hà Nội. I build complete products: Android and iOS apps from one Kotlin Multiplatform codebase, web apps with Next.js and TypeScript, and Java backends with payments and role-based access. I set up tests and CI early, and I record architecture decisions as I go.

- **Now:** two Kotlin Multiplatform apps for Android and iOS, a game encyclopedia and a pose-guided camera.
- **Looking for:** an internship in mobile (Android, Kotlin Multiplatform) or full-stack development.

## Tech stack

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
    <td><b>Backend &amp; data</b></td>
    <td>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=java,postgres,supabase,redis,py&theme=dark">
        <img src="https://skillicons.dev/icons?i=java,postgres,supabase,redis,py&theme=light" height="40" alt="Java, PostgreSQL, Supabase, Redis, Python">
      </picture>
      <br><sub>Jakarta EE (Servlet, JSP, WebSocket), SQL Server, Postgres row-level security, REST APIs, webhooks</sub>
    </td>
  </tr>
  <tr>
    <td><b>Tooling</b></td>
    <td>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=git,github,githubactions,vercel&theme=dark">
        <img src="https://skillicons.dev/icons?i=git,github,githubactions,vercel&theme=light" height="40" alt="Git, GitHub, GitHub Actions, Vercel">
      </picture>
      <br><sub>CI pipelines, R8 release builds, Google Gemini API</sub>
    </td>
  </tr>
</table>

## Featured projects

Most of my recent work lives in private repositories. I'm happy to walk through the code in an interview.

### Yokai Wiki Search

Encyclopedia app for the Yo-kai Watch games on Android and iOS, built from one Kotlin Multiplatform codebase.

`Kotlin 2.4` `Compose Multiplatform` `Coroutines` `DataStore` `Coil` `GitHub Actions`

- About 60k lines of shared Kotlin hold the UI and logic for both platforms.
- Two product editions come from one codebase and one Gradle flag. Edition-specific source sets keep the ad SDK out of the kids build.
- About 1,300 unit tests. CI tests Android, builds debug and R8 release artifacts, and compiles the iOS targets on macOS.
- A Gradle release gate refuses store builds that still carry placeholder IDs.

<sub>Status: Android release build verified on an emulator, iOS compiles in CI, not published yet. Private repository.</sub>

### PoseCam

Camera app that overlays pose templates on the live viewfinder and shoots pose sequences. Kotlin Multiplatform, with CameraX on Android.

`Kotlin` `Compose Multiplatform` `CameraX` `kotlinx.serialization` `Python`

- Each feature is split into domain, data and presentation layers. Key choices are written up in 12 architecture decision records.
- Color grading runs on a CPU LUT engine written in Kotlin, with a Python tool that bakes the LUTs.
- A remote pose catalog is fetched, validated, cached and merged with the bundled poses.
- About 1,400 tests, including desktop Compose UI tests. A fake camera powers a demo flavor.

<sub>Status: in development on Android. Private repository.</sub>

### UA analytics dashboard

Dashboard for a mobile game studio. It pulls live spend, revenue and app-quality data from seven ad and analytics APIs.

`TypeScript` `React 19` `Express` `Supabase` `Vercel Cron` `GitHub Actions`

- One provider module per source (Google Ads, Meta, Unity Ads, AppLovin, AppsFlyer, AdMob, Play Vitals), normalized into a single data model.
- A Google Ads quota limiter caps concurrency, spaces requests, enforces a daily ceiling and backs off on HTTP 429.
- GitHub Actions syncs snapshots into Supabase every 30 minutes. Vercel Cron sends a daily report to Telegram.
- 64 offline check suites (about 2,600 assertions) run in CI with type-checking and the build.
- Sessions use httpOnly cookies, and secrets are masked before any data reaches the Gemini prompt.

<sub>Private repository, real studio data.</sub>

### Hồi Nét

Web app that restores, sharpens and colorizes old photos with Google Gemini.

<a href="https://web-ssg.vercel.app"><img src="assets/hoi-net.jpg" width="100%" alt="Hồi Nét home page: restore and revive old photos with AI"></a>

`Next.js 16` `TypeScript` `Supabase` `Gemini API` `Redis` `TanStack Query`

- Email and Google sign-in through Supabase, with hCaptcha, CSRF protection and Redis-backed rate limiting.
- Admin CMS for users, restore requests and blog posts. Optimistic locking returns HTTP 409 and shows a conflict dialog when two admins edit the same record.
- Background removal runs in the browser with ONNX Runtime Web.

**[Live demo](https://web-ssg.vercel.app)** | **[Source](https://github.com/DuongMinhHoangHE191087/hoi_net)**

### Ban Hoa Qua Online

Multi-vendor fruit marketplace with five roles: guest, customer, shop owner, shipper and admin.

`Java 17` `Jakarta EE 10` `Servlet / JSP` `SQL Server` `Tomcat 10` `WebSocket`

- Layered Servlet, Service and DAO code. A filter chain handles authentication, role checks, CSRF, rate limiting and security headers.
- VietQR payments arrive through a SePay webhook with deduplication, amount and reference matching, and a transactional order finalize step.
- Scheduled jobs settle shop wallets, cancel unpaid orders and reconcile payments.
- Buyer and seller chat over WebSocket, plus Google sign-in.
- Team of four. I wrote about 80% of the commits.

**[Source](https://github.com/DuongMinhHoangHE191087/Ban_Hoa_Qua_Online)**

## More projects

| Project | What I did | Stack |
| --- | --- | --- |
| **[Ticketbox](https://github.com/dghoang/PRJ301_GROUP7_SELLING_TICKET)** | Team leader for an event-ticketing course project (FPT PRJ301). QR e-tickets signed with HMAC for check-in, SePay payments, support chat over WebSocket. | Java, Servlet / JSP, SQL Server |
| **Class management SaaS** | Multi-tenant app for teachers: schedules, attendance and tuition billing. Postgres row-level security per tenant, atomic billing and idempotent payments in database functions, database tests in CI. | Next.js, Supabase, Vitest, Playwright |
| **On-device meeting notes** | Team project for a MediaTek Genio 720 AI box: offline speech-to-text and LLM summaries. I built the Android app layer: recording flow, Room database and the AI pipeline. | Kotlin, Android, Room, JNI |
| **Data-logger hardening** | Audited a legacy Android data-logger (Java, JNI serial port, TCP sensors). Logged 56 bugs and fixed them in 10 batches, with regression tests and CI that includes CodeQL. | Java, Android NDK, GitHub Actions |
| **[Game studio website](https://metafruit-psi.vercel.app)** | Bilingual company site with a Git-based CMS, plus Playwright end-to-end, accessibility (axe) and SEO checks. | Next.js 16, Tailwind 4, GSAP, Keystatic |

## GitHub activity

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/DuongMinhHoangHE191087/DuongMinhHoangHE191087/output/snake-dark.svg">
  <img src="https://raw.githubusercontent.com/DuongMinhHoangHE191087/DuongMinhHoangHE191087/output/snake-light.svg" width="100%" alt="Contribution graph drawn as a snake">
</picture>
