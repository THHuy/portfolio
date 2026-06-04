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
- Pipeline sử dụng GitHub-hosted runner `ubuntu-latest` để kiểm tra build, sau đó dùng self-hosted runner trên Ubuntu server để deploy thư mục `dist` khi push vào `main`.

Runner deploy cần label:

```text
self-hosted
linux
portfolio
```

## Deploy

Project dùng Vite nên có thể deploy static files lên Nginx trên Ubuntu.

- Build command: `npm run build`
- Output directory: `dist`

Hướng dẫn cấu hình Ubuntu, Nginx, GitHub Secrets, GitHub Actions và HTTPS nằm tại:

```text
deploy/README.md
```

Các thông tin GitHub, LinkedIn và ảnh cá nhân đang để dạng placeholder trong `src/data/portfolio.ts`.
