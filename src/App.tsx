import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Phone,
  Send,
  Sun,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  aboutFacts,
  contactMethods,
  education,
  experiences,
  personal,
  projects,
  qualityNotes,
  roleHighlights,
  roles,
  skills,
  stats,
  tools,
  workflow,
} from "./data/portfolio";

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Tools", "tools"],
  ["Skills", "skills"],
  ["Contact", "contact"],
];

const fadeIn = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 transition-colors dark:bg-ink-950 dark:text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.12),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.14),transparent_28%)]" />
      <Header
        dark={dark}
        menuOpen={menuOpen}
        onToggleDark={() => setDark((value) => !value)}
        onToggleMenu={() => setMenuOpen((value) => !value)}
        onNav={scrollToSection}
      />
      <main>
        <Hero role={roles[roleIndex]} onNav={scrollToSection} />
        <About />
        <CurrentRole />
        <Experience />
        <Projects />
        <Tools />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer year={currentYear} />
    </div>
  );
}

type HeaderProps = {
  dark: boolean;
  menuOpen: boolean;
  onToggleDark: () => void;
  onToggleMenu: () => void;
  onNav: (id: string) => void;
};

function Header({ dark, menuOpen, onToggleDark, onToggleMenu, onNav }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/86 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/82">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNav("home")}
          className="text-lg font-bold tracking-normal text-slate-950 dark:text-white"
          aria-label="Về đầu trang"
        >
          <span className="text-cyan-600 dark:text-cyan-300">Huy</span>.Truong
        </button>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              onClick={() => onNav(id)}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={onToggleDark}
            className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            aria-label="Chuyển giao diện sáng tối"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href={personal.cvUrl}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-500 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            <Download size={17} />
            Download CV
          </a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onToggleDark}
            className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            aria-label="Chuyển giao diện sáng tối"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={onToggleMenu}
            className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            aria-label="Mở menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg dark:border-white/10 dark:bg-ink-900 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => onNav(id)}
                className="rounded-md px-3 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
              >
                {label}
              </button>
            ))}
            <a
              href={personal.cvUrl}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950"
            >
              <Download size={17} />
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ role, onNav }: { role: string; onNav: (id: string) => void }) {
  return (
    <section id="home" className="section-shell flex min-h-screen items-center pt-28">
      <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_0.88fr]">
        <motion.div {...fadeIn}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-700 dark:text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Software Engineering | Healthcare IT | System Deployment
          </div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-normal text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            {personal.name}
          </h1>
          <p className="mt-4 text-xl font-semibold text-cyan-700 dark:text-cyan-300 sm:text-2xl">
            {personal.headline}
          </p>
          <div className="mt-5 flex min-h-8 items-center text-base font-medium text-slate-700 dark:text-slate-300">
            <span className="mr-2 text-slate-500 dark:text-slate-400">Vai trò:</span>
            <motion.span
              key={role}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border-r-2 border-cyan-400 pr-1 text-cyan-700 dark:text-cyan-200"
            >
              {role}
            </motion.span>
          </div>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            Tôi là kỹ sư phần mềm định hướng phát triển và triển khai hệ thống thực tế. Hiện tại, tôi tham gia lập trình,
            triển khai và hỗ trợ vận hành phần mềm HIS/EMR cho bệnh viện. Tôi có kinh nghiệm xây dựng ứng dụng web,
            triển khai hệ thống trên Linux Server, cấu hình hạ tầng, hỗ trợ người dùng và xử lý các vấn đề phát sinh
            trong môi trường vận hành thực tế.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => onNav("projects")}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-cyan-500 px-5 py-3 font-semibold text-slate-950 shadow-glow transition hover:bg-cyan-300"
            >
              Xem dự án
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onNav("contact")}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-5 py-3 font-semibold text-slate-800 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-white/15 dark:text-slate-100 dark:hover:text-cyan-200"
            >
              Liên hệ với tôi
              <Mail size={18} />
            </button>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(([label, value]) => (
              <div key={label} className="glass-card p-4">
                <div className="text-sm font-bold text-slate-950 dark:text-white">{label}</div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{value}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-xl bg-cyan-400/15 blur-2xl dark:bg-cyan-400/20" />
          <div className="glass-card relative overflow-hidden p-3">
            <img
              src="/hero-healthcare-dashboard.png"
              alt="Minh họa dashboard phần mềm HIS EMR và triển khai hệ thống"
              className="aspect-[4/3] w-full rounded-md object-cover"
            />
            <div className="grid gap-2 p-3 sm:grid-cols-3">
              {qualityNotes.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 dark:bg-white/10 dark:text-slate-200">
                  <Icon size={15} className="text-cyan-500" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <motion.section id="about" className="section-shell" {...fadeIn}>
      <p className="section-kicker">About Me</p>
      <h2 className="section-title">Giới thiệu</h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">
          <p>
            Tôi tốt nghiệp ngành Khoa học Máy tính tại Trường Đại học Kỹ thuật - Công nghệ Cần Thơ. Tôi yêu thích việc
            xây dựng các phần mềm có thể giải quyết bài toán thực tế và trực tiếp tham gia triển khai hệ thống cho người dùng.
          </p>
          <p>
            Bên cạnh khả năng lập trình web, tôi có kinh nghiệm triển khai hệ thống trên máy chủ Linux, cấu hình Nginx,
            Docker, cơ sở dữ liệu và hỗ trợ xử lý sự cố. Hiện tại, tôi đang làm việc với các hệ thống HIS và EMR trong
            lĩnh vực y tế, hỗ trợ bệnh viện số hóa quy trình quản lý và vận hành.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {aboutFacts.map(([label, value]) => (
            <div key={label} className="glass-card p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{label}</div>
              <div className="mt-2 text-sm font-semibold text-slate-950 dark:text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function CurrentRole() {
  return (
    <motion.section id="current-role" className="section-shell" {...fadeIn}>
      <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.08] p-6 dark:bg-cyan-400/[0.065] sm:p-8">
        <p className="section-kicker">Current Role</p>
        <h2 className="section-title">Công việc hiện tại: Triển khai HIS & EMR cho bệnh viện</h2>
        <p className="section-lead">
          Tôi đang tham gia lập trình, triển khai và hỗ trợ vận hành hệ thống HIS/EMR tại bệnh viện. Công việc tập trung
          vào việc đưa phần mềm vào quy trình sử dụng thực tế, hỗ trợ người dùng và phối hợp xử lý các lỗi nghiệp vụ hoặc kỹ thuật.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {roleHighlights.map(({ title, icon: Icon, items }) => (
            <motion.div key={title} whileHover={{ y: -5 }} className="glass-card p-5">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-md bg-cyan-500/14 text-cyan-600 dark:text-cyan-300">
                <Icon size={22} />
              </div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">{title}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <ChevronRight size={16} className="mt-1 shrink-0 text-cyan-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 overflow-x-auto rounded-lg border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-ink-900/80">
          <div className="flex min-w-[820px] items-center gap-2">
            {workflow.map((step, index) => (
              <div key={step} className="flex flex-1 items-center gap-2">
                <div className="flex min-h-16 flex-1 items-center justify-center rounded-md border border-cyan-500/20 bg-cyan-500/10 px-3 text-center text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {step}
                </div>
                {index < workflow.length - 1 && <ArrowRight size={18} className="shrink-0 text-cyan-500" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Experience() {
  return (
    <motion.section id="experience" className="section-shell" {...fadeIn}>
      <p className="section-kicker">Work Experience</p>
      <h2 className="section-title">Kinh nghiệm làm việc</h2>
      <div className="mt-10 space-y-6">
        {experiences.map(({ role, company, period, icon: Icon, items }) => (
          <motion.article key={role} whileHover={{ y: -4 }} className="glass-card relative p-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-cyan-500/12 text-cyan-600 dark:text-cyan-300">
                <Icon size={23} />
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-950 dark:text-white">{role}</h3>
                    <p className="mt-1 font-medium text-slate-600 dark:text-slate-300">{company}</p>
                  </div>
                  <span className="w-fit rounded-md border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-700 dark:text-cyan-200">
                    {period}
                  </span>
                </div>
                <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300 md:grid-cols-2">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <ChevronRight size={16} className="mt-1 shrink-0 text-cyan-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

function Projects() {
  return (
    <motion.section id="projects" className="section-shell" {...fadeIn}>
      <p className="section-kicker">Selected Projects</p>
      <h2 className="section-title">Dự án nổi bật</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {projects.map(({ title, icon: Icon, description, stack }) => (
          <motion.article key={title} whileHover={{ y: -5 }} className="glass-card flex h-full flex-col p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-md bg-cyan-500/12 text-cyan-600 dark:text-cyan-300">
                <Icon size={23} />
              </div>
              <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-white/10 dark:text-slate-200 dark:hover:text-cyan-200">
                Xem chi tiết
                <ArrowRight size={15} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-950 dark:text-white">{title}</h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

function Tools() {
  return (
    <motion.section id="tools" className="section-shell" {...fadeIn}>
      <p className="section-kicker">Tools</p>
      <h2 className="section-title">Công cụ</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {tools.map(({ title, icon: Icon, description, href, stack }) => (
          <motion.article key={title} whileHover={{ y: -5 }} className="glass-card flex h-full flex-col p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-md bg-cyan-500/12 text-cyan-600 dark:text-cyan-300">
                <Icon size={23} />
              </div>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-white/10 dark:text-slate-200 dark:hover:text-cyan-200"
              >
                Mở tool
                <ExternalLink size={15} />
              </a>
            </div>
            <h3 className="text-xl font-bold text-slate-950 dark:text-white">{title}</h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

function Skills() {
  return (
    <motion.section id="skills" className="section-shell" {...fadeIn}>
      <p className="section-kicker">Technical Skills</p>
      <h2 className="section-title">Kỹ năng</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skills.map(({ title, icon: Icon, items }) => (
          <motion.div key={title} whileHover={{ y: -4 }} className="glass-card p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-cyan-500/12 text-cyan-600 dark:text-cyan-300">
                <Icon size={21} />
              </div>
              <h3 className="font-bold text-slate-950 dark:text-white">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function Education() {
  const Icon = education.icon;
  return (
    <motion.section id="education" className="section-shell" {...fadeIn}>
      <p className="section-kicker">Education</p>
      <h2 className="section-title">Học vấn</h2>
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1fr]">
        <div className="glass-card p-6">
          <div className="mb-5 grid h-12 w-12 place-items-center rounded-md bg-cyan-500/12 text-cyan-600 dark:text-cyan-300">
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-950 dark:text-white">{education.school}</h3>
          <p className="mt-2 font-semibold text-cyan-700 dark:text-cyan-300">{education.degree}</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{education.period}</p>
          <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100">GPA: {education.gpa}</p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">Môn học chính</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {education.subjects.map((subject) => (
              <div key={subject} className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                {subject}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Contact() {
  return (
    <motion.section id="contact" className="section-shell" {...fadeIn}>
      <p className="section-kicker">Contact</p>
      <h2 className="section-title">Liên hệ</h2>
      <p className="section-lead">
        Tôi luôn sẵn sàng trao đổi về các cơ hội liên quan đến phát triển phần mềm, triển khai hệ thống, Healthcare IT và HIS/EMR.
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1fr]">
        <div className="glass-card p-6">
          <div className="space-y-4">
            {contactMethods.map(([label, value]) => (
              <div key={label} className="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{label}</div>
                <div className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">{value}</div>
              </div>
            ))}
          </div>
        </div>
        <form className="glass-card p-6" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              Họ và tên
              <input className="rounded-md border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="Nhập họ và tên" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              Email
              <input type="email" className="rounded-md border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="email@example.com" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              Nội dung
              <textarea rows={5} className="resize-none rounded-md border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="Nội dung trao đổi" />
            </label>
            <button className="inline-flex items-center justify-center gap-2 rounded-md bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Gửi tin nhắn
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </motion.section>
  );
}

function Footer({ year }: { year: number }) {
  return (
    <footer className="border-t border-slate-200 bg-white/80 py-8 dark:border-white/10 dark:bg-ink-950/80">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-600 dark:text-slate-400 sm:px-6 md:flex-row lg:px-8">
        <p>© {year} Trương Hoàng Huy. Built with React.js and Tailwind CSS.</p>
        <div className="flex items-center gap-2">
          <a className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-white/10 dark:text-slate-200" href={personal.github} aria-label="GitHub">
            <Github size={18} />
          </a>
          <a className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-white/10 dark:text-slate-200" href={personal.linkedin} aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-white/10 dark:text-slate-200" href={`mailto:${personal.email}`} aria-label="Email">
            <Mail size={18} />
          </a>
          <a className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-white/10 dark:text-slate-200" href={`tel:${personal.phone}`} aria-label="Phone">
            <Phone size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default App;
