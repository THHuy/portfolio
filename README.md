# Trương Hoàng Huy Portfolio

Website portfolio cá nhân one-page, responsive, hỗ trợ dark mode/light mode, xây dựng bằng React.js, TypeScript, Tailwind CSS, Framer Motion và Lucide Icons.

## Chạy project

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
```

## Preview build

```bash
npm run preview
```

## CI/CD

Project dùng GitHub Actions tại `.github/workflows/ci.yml`.

- Push commit lên nhánh `main` sẽ tự chạy pipeline.
- Pull request vào `main` cũng sẽ chạy pipeline.
- Pipeline sử dụng GitHub-hosted runner `ubuntu-latest`, cài dependencies bằng `npm ci` và kiểm tra production build bằng `npm run build`.

## Deploy

Project dùng Vite nên có thể deploy trực tiếp lên Vercel hoặc Netlify.

- Build command: `npm run build`
- Output directory: `dist`

Các thông tin GitHub, LinkedIn và ảnh cá nhân đang để dạng placeholder trong `src/data/portfolio.ts`.
