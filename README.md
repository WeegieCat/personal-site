 <img width="1870" height="856" alt="画面録画 2026-09-09 072109" src="https://github.com/user-attachments/assets/4ed2704c-e0b2-48ab-ad20-ae1e2820fba0" />

## ポートフォリオ用サイト

- **デプロイ先リンク**: [weegiecat.com](https://weegiecat.com/)
- **ドメイン/デプロイ管理**: [Cloudflare Dashboard](https://dash.cloudflare.com/24280d6d12b705d87c6285e6320d1a75/workers/services/view/personalsite/production)

- **Framework**: Next.js 16.3.4 (App Router)
- **Styling**: Tailwind CSS 4.0
- **Deployment**: Cloudflare Workers (静的アセット配信、OpenNextは未使用)
- **Language**: TypeScript 5.x
- **Runtime**: 静的出力（`output: "export"`）を Cloudflare Workers Assets で配信
