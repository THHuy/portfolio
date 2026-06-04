# Deploy Portfolio len Ubuntu

Huong dan nay dung cho project Vite/React deploy static files len Ubuntu server bang Nginx va GitHub Actions self-hosted runner.

Self-hosted runner dat ngay tren Ubuntu server se tu ket noi outbound den GitHub. Vi vay AWS security group khong can mo inbound SSH cho GitHub Actions. Ban chi can mo port 80/443 cho website.

## 1. Chuan bi server Ubuntu

Dang nhap vao server:

```bash
ssh ubuntu@YOUR_SERVER_IP
```

Cap nhat package va cai Nginx:

```bash
sudo apt update
sudo apt install -y curl nginx
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

## 4. Cai Node.js tren server

Self-hosted runner se build project truc tiep tren Ubuntu server, nen server can co Node.js va npm.

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

Kiem tra:

```bash
node -v
npm -v
```

## 5. Cai GitHub Actions self-hosted runner

Vao GitHub repository:

```text
Settings -> Actions -> Runners -> New self-hosted runner
```

Chon:

```text
Runner image: Linux
Architecture: x64
```

GitHub se hien cac lenh setup moi nhat. Chay cac lenh do tren Ubuntu server, thuong co dang:

```bash
mkdir actions-runner
cd actions-runner
curl -o actions-runner-linux-x64.tar.gz -L GITHUB_RUNNER_DOWNLOAD_URL
tar xzf ./actions-runner-linux-x64.tar.gz
./config.sh --url https://github.com/THHuy/portfolio --token GITHUB_RUNNER_TOKEN --labels portfolio
```

Luu y:

- Khong copy token trong README nay. Token phai lay truc tiep tu GitHub UI vi token co thoi han.
- Label `portfolio` la bat buoc vi workflow dang dung `runs-on: [self-hosted, linux, portfolio]`.
- GitHub se tu co label `self-hosted` va `linux`.

## 6. Cai runner thanh service

Sau khi config runner xong, cai thanh system service de runner tu chay sau khi reboot:

```bash
sudo ./svc.sh install
sudo ./svc.sh start
```

Kiem tra service:

```bash
sudo ./svc.sh status
```

Tren GitHub, vao:

```text
Settings -> Actions -> Runners
```

Neu runner hien `Idle` hoac `Online` la dung.

## 7. Cap quyen deploy cho runner

Tim user dang chay runner:

```bash
ps aux | grep actions-runner
```

Neu ban cai service bang user `ubuntu`, runner thuong chay bang user `ubuntu`.

Cap quyen ghi vao thu muc deploy:

```bash
sudo chown -R ubuntu:www-data /var/www/portfolio
sudo chmod -R 775 /var/www/portfolio
```

Neu user khac `ubuntu`, thay `ubuntu` bang user do.

## 8. Cho phep reload Nginx khong can password

GitHub Actions se chay:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Neu server yeu cau sudo password, pipeline se fail. Mo sudoers:

```bash
sudo visudo
```

Them dong sau, thay `ubuntu` bang user dang chay runner neu khac:

```text
ubuntu ALL=(ALL) NOPASSWD: /usr/sbin/nginx, /bin/systemctl reload nginx, /usr/bin/systemctl reload nginx
```

Kiem tra:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 9. Chay pipeline

Moi lan push len nhanh `main`, GitHub Actions se tu dong:

- Checkout source code.
- Kiem tra build tren GitHub-hosted runner.
- Chay job deploy tren self-hosted runner dat tren Ubuntu server.
- Cai dependencies bang `npm ci` tren server.
- Build bang `npm run build` tren server.
- Xoa file cu trong `/var/www/portfolio` tren server.
- Copy thu muc `dist` vao `/var/www/portfolio`.
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

## 10. Cai HTTPS bang Certbot

Sau khi domain da tro dung ve server:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d thhinfo.xyz -d www.thhinfo.xyz
```

Kiem tra auto renew:

```bash
sudo certbot renew --dry-run
```

## 11. AWS security group

Vi deploy dung self-hosted runner, AWS khong can mo SSH inbound cho GitHub Actions.

Nen cau hinh inbound nhu sau:

```text
HTTP  80   0.0.0.0/0
HTTPS 443  0.0.0.0/0
SSH   22   IP_CA_NHAN_CUA_BAN
```

Khong can mo SSH 22 cho GitHub.

Outbound nen cho phep server truy cap internet de runner ket noi GitHub:

```text
Outbound: allow all
```

## 12. Loi thuong gap

### Job deploy bi treo o trang thai queued

Kiem tra:

- Runner tren GitHub co trang thai `Online`.
- Workflow co dung label `portfolio`.
- Service runner dang chay tren server.

Lenh kiem tra:

```bash
cd ~/actions-runner
sudo ./svc.sh status
```

### Pipeline loi permission khi upload

Chay tren server:

```bash
sudo chown -R ubuntu:www-data /var/www/portfolio
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
