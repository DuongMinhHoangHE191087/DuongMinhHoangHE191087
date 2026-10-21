# Đặt file này vào: .github/workflows/snake.yml trong repo username/username
# Action sẽ tự tạo ảnh rắn ăn các ô đóng góp, chạy mỗi 12 giờ và khi bạn push.
# Tham khảo thêm và phiên bản mới nhất tại: https://github.com/Platane/snk

name: Generate contribution snake

on:
  schedule:
    - cron: "0 */12 * * *"
  workflow_dispatch:
  push:
    branches: ["main"]

permissions:
  contents: write

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - name: Generate snake SVGs
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: ${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark

      - name: Push SVGs to output branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
