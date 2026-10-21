/*
  ==========================================================
  FILE NÀY LÀ NƠI BẠN CHỈNH SỬA NỘI DUNG.
  Thay toàn bộ thông tin bên dưới bằng thông tin của bạn.
  Không cần sửa index.html hay script.js.
  ==========================================================
*/
window.PORTFOLIO = {
  // Username GitHub: dùng để lấy avatar và thống kê tự động
  username: "your-username",

  // Thông tin cá nhân
  name: "Nguyễn Văn A",
  roles: [
    "Backend Developer",
    "Python & Go Engineer",
    "Open source enthusiast",
  ],
  bio: "Mình xây dựng hệ thống backend ổn định, dễ mở rộng và thích chia sẻ kiến thức qua open source.",

  // Để trống để dùng avatar GitHub, hoặc điền đường dẫn ảnh riêng, ví dụ "avatar.jpg"
  avatar: "",

  email: "your@email.com",
  linkedin: "https://linkedin.com/in/your-id",
  website: "https://your-site.com",

  // Số liệu dự phòng khi không gọi được GitHub API (hoặc bị giới hạn request)
  fallbackStats: {
    repos: 20,
    stars: 150,
    followers: 30,
  },

  // ---------- DỰ ÁN ----------
  // featured: true sẽ hiện nhãn "Nổi bật"
  // metrics: thành tựu có số liệu cụ thể, rất nên có
  projects: [
    {
      name: "Project A",
      description: "Mô tả ngắn: dự án làm gì và giải quyết vấn đề gì.",
      tags: ["Python", "FastAPI", "Docker"],
      repo: "https://github.com/your-username/project-a",
      demo: "",
      featured: true,
      metrics: "Giảm 40% thời gian phản hồi API",
    },
    {
      name: "Project B",
      description: "Thư viện mã nguồn mở hỗ trợ xử lý dữ liệu theo lô.",
      tags: ["Go", "Open Source"],
      repo: "https://github.com/your-username/project-b",
      demo: "",
      featured: false,
      metrics: "",
    },
    {
      name: "Project C",
      description: "Ứng dụng web quản lý công việc, có giao diện realtime.",
      tags: ["TypeScript", "React", "PostgreSQL"],
      repo: "https://github.com/your-username/project-c",
      demo: "https://your-demo.com",
      featured: true,
      metrics: "500+ người dùng hoạt động hằng tuần",
    },
  ],

  // ---------- KINH NGHIỆM ----------
  experience: [
    {
      role: "Backend Developer",
      company: "Công ty ABC",
      location: "Hà Nội",
      period: "2023 – Hiện tại",
      highlights: [
        "Thiết kế REST API phục vụ hơn 1 triệu request mỗi ngày.",
        "Tối ưu truy vấn PostgreSQL, giảm 60% độ trễ trung bình.",
        "Xây dựng pipeline CI/CD với GitHub Actions và Docker.",
      ],
    },
    {
      role: "Junior Developer",
      company: "Công ty XYZ",
      location: "TP. Hồ Chí Minh",
      period: "2021 – 2023",
      highlights: [
        "Phát triển các tính năng cho hệ thống thương mại điện tử.",
        "Viết unit test, nâng độ phủ mã nguồn từ 30% lên 75%.",
      ],
    },
  ],

  // ---------- KỸ NĂNG ----------
  // level: mức thành thạo từ 0 đến 100
  skills: [
    {
      group: "Ngôn ngữ",
      items: [
        { name: "Python", level: 90 },
        { name: "Go", level: 70 },
        { name: "TypeScript", level: 65 },
      ],
    },
    {
      group: "Backend & Data",
      items: [
        { name: "FastAPI / Django", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "Redis", level: 60 },
      ],
    },
    {
      group: "DevOps",
      items: [
        { name: "Docker", level: 80 },
        { name: "GitHub Actions", level: 75 },
        { name: "Linux", level: 70 },
      ],
    },
  ],
};
