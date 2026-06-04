# Deploy Portfolio len Ubuntu

Huong dan nay dung cho project Vite/React deploy static files len Ubuntu server bang Nginx va GitHub Actions.

## 1. Chuan bi server Ubuntu

Dang nhap vao server:

```bash
ssh ubuntu@YOUR_SERVER_IP
```

Cap nhat package va cai Nginx:

```bash
sudo apt update
sudo apt install -y nginx
```

Tao thu muc deploy:

```bash
sudo mkdir -p /var/www/portfolio
sudo chown -R $USER:www-data /var/www/portfolio
sudo chmod -R 775 /var/www/portfolio
```

## 2. Tao Nginx site

Tao file cau hinh:

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Dan noi dung sau vao file:

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

Neu domain khac, thay:

```text
thhinfo.xyz www.thhinfo.xyz
```

bang domain cua ban.

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
```

Kiem tra cau hinh va reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 3. Tro domain ve server

Trong DNS provider, tao record:

```text
Type: A
Name: @
Value: YOUR_SERVER_IP
```

Neu dung `www`:

```text
Type: A
Name: www
Value: YOUR_SERVER_IP
```

Cho DNS cap nhat roi kiem tra:

```bash
ping thhinfo.xyz
```

## 4. Tao SSH key cho GitHub Actions

Tren may local hoac server, tao key rieng cho deploy:

```bash
ssh-keygen -t ed25519 -C "github-actions-portfolio" -f portfolio_deploy_key
```

Lenh se tao 2 file:

```text
portfolio_deploy_key
portfolio_deploy_key.pub
```

Them public key vao server:

```bash
mkdir -p ~/.ssh
cat portfolio_deploy_key.pub >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

Neu tao key tren may local, copy public key len server:

```bash
ssh-copy-id -i portfolio_deploy_key.pub ubuntu@YOUR_SERVER_IP
```

Kiem tra dang nhap bang private key:

```bash
ssh -i portfolio_deploy_key ubuntu@YOUR_SERVER_IP
```

## 5. Cau hinh GitHub Secrets

Vao GitHub repository:

```text
Settings -> Secrets and variables -> Actions -> New repository secret
```

Them cac secret sau:

```text
SSH_HOST=YOUR_SERVER_IP
SSH_USER=ubuntu
SSH_KEY=noi dung file portfolio_deploy_key
SSH_PORT=22
DEPLOY_PATH=/var/www/portfolio
```

Xem noi dung private key:

```bash
cat portfolio_deploy_key
```

Copy toan bo noi dung, bao gom:

```text
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

## 6. Cho phep reload Nginx khong can password

GitHub Actions se chay:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Neu server yeu cau sudo password, pipeline se fail. Mo sudoers:

```bash
sudo visudo
```

Them dong sau, thay `ubuntu` bang user SSH cua ban neu khac:

```text
ubuntu ALL=(ALL) NOPASSWD: /usr/sbin/nginx, /bin/systemctl reload nginx
```

Kiem tra:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 7. Chay pipeline

Moi lan push len nhanh `main`, GitHub Actions se tu dong:

- Checkout source code.
- Cai dependencies bang `npm ci`.
- Build bang `npm run build`.
- Xoa file cu trong `/var/www/portfolio`.
- Upload thu muc `dist` len server.
- Reload Nginx.

Lenh push:

```bash
git add .
git commit -m "update portfolio"
git push
```

Theo doi pipeline tai:

```text
GitHub repository -> Actions -> Portfolio CI/CD
```

## 8. Cai HTTPS bang Certbot

Sau khi domain da tro dung ve server:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d thhinfo.xyz -d www.thhinfo.xyz
```

Kiem tra auto renew:

```bash
sudo certbot renew --dry-run
```

## 9. Loi thuong gap

### Pipeline loi SSH

Kiem tra lai:

- `SSH_HOST` dung IP server.
- `SSH_USER` dung user Ubuntu.
- `SSH_KEY` la private key, khong phai public key.
- Public key da nam trong `~/.ssh/authorized_keys` tren server.

### Pipeline loi permission khi upload

Chay tren server:

```bash
sudo chown -R $USER:www-data /var/www/portfolio
sudo chmod -R 775 /var/www/portfolio
```

### Pipeline loi reload Nginx

Kiem tra sudoers hoac reload thu cong:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Website hien 404 khi refresh route

Dam bao Nginx co dong:

```nginx
try_files $uri $uri/ /index.html;
```
