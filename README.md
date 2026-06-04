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
- Pipeline sử dụng GitHub-hosted runner `ubuntu-latest`, cài dependencies bằng `npm ci`, kiểm tra production build bằng `npm run build` và deploy thư mục `dist` lên Ubuntu server khi push vào `main`.

Thêm các GitHub Secrets trong repository:

```text
SSH_HOST=your-server-ip
SSH_USER=your-ubuntu-user
SSH_KEY=private-key-content
SSH_PORT=22
DEPLOY_PATH=/var/www/portfolio
```

## Deploy

Project dùng Vite nên có thể deploy static files lên Nginx trên Ubuntu.

- Build command: `npm run build`
- Output directory: `dist`

Ví dụ cấu hình server Ubuntu:

```bash
sudo apt update
sudo apt install -y nginx
sudo mkdir -p /var/www/portfolio
sudo chown -R $USER:www-data /var/www/portfolio
```

Tạo Nginx site:

```nginx
server {
    listen 80;
    server_name thhinfo.xyz www.thhinfo.xyz;

    root /var/www/portfolio;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable site và reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
sudo nginx -t
sudo systemctl reload nginx
```

Các thông tin GitHub, LinkedIn và ảnh cá nhân đang để dạng placeholder trong `src/data/portfolio.ts`.
