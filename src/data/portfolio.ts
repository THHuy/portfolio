import {
  Activity,
  BriefcaseBusiness,
  Bug,
  Code2,
  Database,
  FileSpreadsheet,
  GraduationCap,
  Headphones,
  HeartPulse,
  Laptop,
  Network,
  Rocket,
  Server,
  ShieldCheck,
  Stethoscope,
  TestTube2,
  Users,
} from "lucide-react";

export const personal = {
  name: "Trương Hoàng Huy",
  logo: "Huy.Truong",
  headline: "Software Engineer & HIS/EMR Implementation Engineer",
  email: "thhuywork@gmail.com",
  phone: "0783943515",
  location: "Cần Thơ, Việt Nam",
  major: "Khoa học Máy tính",
  gpa: "3.1 / 4.0",
  direction: "Software Engineering & Healthcare IT",
  github: "https://github.com/your-github",
  linkedin: "https://linkedin.com/in/your-linkedin",
  cvUrl: "/Truong-Hoang-Huy-CV.pdf",
};

export const roles = [
  "Software Engineer",
  "HIS/EMR Implementation Engineer",
  "Full-stack Developer",
  "System Deployment Engineer",
];

export const roleHighlights = [
  {
    title: "Phân tích nghiệp vụ bệnh viện",
    icon: Stethoscope,
    items: [
      "Tìm hiểu quy trình khám chữa bệnh",
      "Tiếp nhận yêu cầu từ người dùng",
      "Đề xuất điều chỉnh chức năng phù hợp thực tế",
    ],
  },
  {
    title: "Lập trình và kiểm thử phần mềm",
    icon: Code2,
    items: [
      "Phát triển hoặc cập nhật chức năng",
      "Kiểm thử luồng nghiệp vụ",
      "Ghi nhận bug và phối hợp khắc phục lỗi",
    ],
  },
  {
    title: "Triển khai hệ thống HIS/EMR",
    icon: Rocket,
    items: [
      "Cấu hình phần mềm",
      "Hỗ trợ đồng bộ dữ liệu",
      "Hướng dẫn người dùng sử dụng hệ thống",
    ],
  },
  {
    title: "Hỗ trợ vận hành",
    icon: Headphones,
    items: [
      "Theo dõi lỗi phát sinh",
      "Xử lý sự cố phần mềm",
      "Phối hợp cùng đội kỹ thuật và bệnh viện",
    ],
  },
];

export const workflow = [
  "Tiếp nhận yêu cầu",
  "Phân tích nghiệp vụ",
  "Lập trình / Cấu hình",
  "Kiểm thử",
  "Triển khai",
  "Hỗ trợ vận hành",
];

export const experiences = [
  {
    role: "HIS & EMR Implementation Engineer",
    company: "Healthcare Software System",
    period: "02/2026 - Hiện tại",
    icon: HeartPulse,
    items: [
      "Tham gia lập trình và triển khai phần mềm HIS/EMR cho bệnh viện.",
      "Hỗ trợ kiểm thử các chức năng theo quy trình nghiệp vụ thực tế.",
      "Ghi nhận và phân tích lỗi trong quá trình sử dụng phần mềm.",
      "Phối hợp với đội ngũ kỹ thuật để xử lý sự cố và tối ưu hệ thống.",
      "Hướng dẫn người dùng sử dụng phần mềm và hỗ trợ vận hành.",
    ],
  },
  {
    role: "Thực tập sinh Kỹ sư Phần mềm",
    company: "Công ty Cổ phần Phân bón Dầu khí Cà Mau - PVCFC",
    period: "06/2025 - 08/2025",
    icon: BriefcaseBusiness,
    items: [
      "Phát triển và triển khai hệ thống quản lý hợp đồng nội bộ tích hợp AI.",
      "Xây dựng kiến trúc xử lý bất đồng bộ sử dụng Redis Bull Queue và Server-Sent Events.",
      "Phát triển RESTful API và quy trình phân quyền người dùng.",
      "Đóng gói microservices bằng Docker.",
      "Thiết lập CI/CD với GitHub Actions.",
      "Tăng cường bảo mật với HttpOnly Cookies, CSRF Protection, Rate Limiting, CrowdSec và Microsoft Entra ID SSO.",
      "Triển khai nền tảng tài nguyên canh tác kỹ thuật số sử dụng Linux, Nginx, MySQL và PHP.",
    ],
  },
  {
    role: "Kỹ thuật viên Hiện trường",
    company: "FPT Telecom",
    period: "12/2025 - 02/2026",
    icon: Network,
    items: [
      "Lắp đặt và cấu hình Internet, FPT Play và FPT Camera.",
      "Kiểm tra và xử lý lỗi đường truyền.",
      "Hỗ trợ kỹ thuật tận nơi cho khách hàng.",
      "Phối hợp với các bộ phận liên quan để xử lý sự cố.",
      "Thu thập phản hồi và hỗ trợ cải thiện trải nghiệm người dùng.",
    ],
  },
];

export const projects = [
  {
    title: "Hệ thống HIS & EMR cho bệnh viện",
    icon: Activity,
    description:
      "Tham gia lập trình, triển khai, kiểm thử và hỗ trợ vận hành phần mềm quản lý bệnh viện. Hệ thống hỗ trợ số hóa quy trình khám chữa bệnh, quản lý hồ sơ bệnh án điện tử và đồng bộ thông tin nghiệp vụ.",
    stack: ["HIS", "EMR", "SQL Server", "System Deployment", "Software Testing", "User Support", "Healthcare IT"],
  },
  {
    title: "Hệ thống Quản lý Hợp đồng tích hợp AI",
    icon: ShieldCheck,
    description:
      "Hệ thống giúp quản lý hợp đồng nội bộ, tự động trích xuất dữ liệu bằng AI, cập nhật trạng thái xử lý theo thời gian thực và hỗ trợ quy trình phê duyệt theo vai trò.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "SQL Server", "Redis", "Bull Queue", "SSE", "Docker", "GitHub Actions", "Nginx"],
  },
  {
    title: "Nền tảng Tài nguyên Canh tác Kỹ thuật số PVCFC",
    icon: Server,
    description:
      "Triển khai môi trường máy chủ Linux, cấu hình LEMP Stack, Nginx Reverse Proxy, SSL/TLS, giám sát và sao lưu hệ thống.",
    stack: ["Linux", "Nginx", "MySQL", "PHP", "SSL/TLS", "Backup", "Monitoring"],
  },
  {
    title: "Darkness Survival",
    icon: Laptop,
    description:
      "Game mobile 2D thể loại survival roguelike được phát triển bằng Unity. Dự án bao gồm hệ thống kỹ năng, quái vật, wave, nâng cấp nhân vật, vật phẩm và giao diện mobile.",
    stack: ["Unity", "C#", "Mobile Game", "Game Design", "Pixel Art", "Android"],
  },
];

export const tools = [
  {
    title: "Auto Sync Excel",
    icon: FileSpreadsheet,
    description:
      "Công cụ đồng bộ và tự động hóa dữ liệu Excel, hỗ trợ giảm thao tác thủ công khi làm việc với bảng tính.",
    href: "https://excel.thhinfo.xyz",
    stack: ["Excel", "Automation", "Data Sync", "Workflow Tool"],
  },
];

export const skills = [
  { title: "Programming Languages", icon: Code2, items: ["JavaScript", "TypeScript", "Python", "C#"] },
  { title: "Frontend", icon: Laptop, items: ["HTML", "CSS", "React.js", "Tailwind CSS", "Responsive Design"] },
  { title: "Backend", icon: Server, items: ["Node.js", "Express.js", "RESTful APIs", "Server-Sent Events", "Redis Queue"] },
  { title: "Database", icon: Database, items: ["MongoDB", "MySQL", "SQL Server"] },
  { title: "DevOps & Infrastructure", icon: Rocket, items: ["Docker", "GitHub Actions", "CI/CD", "Linux Server", "Nginx", "AWS Basic", "SSL/TLS", "System Monitoring"] },
  { title: "Healthcare IT", icon: HeartPulse, items: ["HIS", "EMR", "Hospital Workflow", "Software Implementation", "User Training", "Functional Testing", "Bug Reporting", "Production Support"] },
  { title: "Networking & Support", icon: Network, items: ["TCP/IP", "DNS", "HTTP/HTTPS", "Router Configuration", "Troubleshooting", "Technical Support"] },
];

export const education = {
  school: "Trường Đại học Kỹ thuật - Công nghệ Cần Thơ",
  degree: "Cử nhân Khoa học Máy tính",
  period: "08/2021 - 01/2026",
  gpa: "3.1 / 4.0",
  icon: GraduationCap,
  subjects: [
    "Cấu trúc dữ liệu và giải thuật",
    "Hệ cơ sở dữ liệu",
    "Hệ điều hành",
    "Mạng máy tính",
    "Công nghệ phần mềm",
    "Học máy",
  ],
};

export const aboutFacts = [
  ["Địa điểm", personal.location],
  ["Chuyên ngành", personal.major],
  ["GPA", personal.gpa],
  ["Định hướng", personal.direction],
  ["Email", personal.email],
  ["Số điện thoại", personal.phone],
];

export const contactMethods = [
  ["Email", personal.email],
  ["Phone", personal.phone],
  ["Location", personal.location],
  ["GitHub", "https://github.com/THHuy"],
  // ["LinkedIn", "Placeholder - cập nhật URL trong src/data/portfolio.ts"],
];

export const stats = [
  ["HIS/EMR", "Healthcare IT"],
  ["Linux", "Deployment"],
  ["Full-stack", "Web Apps"],
  ["Support", "Production"],
];

export const qualityNotes = [
  { icon: TestTube2, label: "Functional Testing" },
  { icon: Bug, label: "Bug Reporting" },
  { icon: Users, label: "User Training" },
];
