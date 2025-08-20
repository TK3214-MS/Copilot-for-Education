# School Life Assistant

学校生活において生徒、教員双方の学習や校務を効率化し、コミュニケーション促進に利用可能なWebアプリケーションです。

## 概要

Microsoft 365 Copilotとの会話ログをデータソースとして活用し、生徒の学習支援と教員の指導支援を行うプラットフォームです。

## 主な機能

### 生徒向け機能
- **学習状況分析**: Microsoft 365 Copilotとの会話ログを基に、強みと弱点を分析
- **個人アドバイス**: AI分析による学習アドバイスの提供
- **学習計画**: 個人の特性に応じた学習計画の作成支援
- **進捗可視化**: 学習の進捗状況をわかりやすく表示

### 教員向け機能
- **生徒管理**: 生徒の学習状況、特性、目標を一元管理
- **分析レポート**: 生徒の学習パターンと進捗の分析
- **コミュニケーション履歴**: Copilotとのやりとりからコミュニケーションスタイルを把握
- **指導支援**: 個々の生徒に適した指導方法の提案

## デザイン

- **生徒向け**: 青と白をベースとした親しみやすいデザイン
- **教員向け**: 緑と白をベースとしたプロフェッショナルなデザイン
- **レスポンシブ対応**: モバイル、タブレット、デスクトップに対応

## 技術仕様

### 開発言語・技術
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **スタイリング**: CSS Grid, Flexbox, CSS Variables
- **アイコン**: Font Awesome 6.0
- **API連携**: Microsoft 365 Copilot API (将来実装予定)

### ファイル構成
```
Copilot-for-Education/
├── index.html              # メインページ（役割選択）
├── student.html            # 生徒向けダッシュボード
├── teacher.html            # 教員向けダッシュボード
├── src/
│   ├── css/
│   │   ├── common.css      # 共通スタイル
│   │   ├── student.css     # 生徒向けスタイル
│   │   └── teacher.css     # 教員向けスタイル
│   ├── js/
│   │   ├── config.js       # 設定・変数定義
│   │   ├── common.js       # 共通JavaScript機能
│   │   ├── student.js      # 生徒向け機能
│   │   └── teacher.js      # 教員向け機能
│   └── data/
│       └── sampleData.js   # サンプルデータ
└── LICENSE
```

## インストール・使用方法

### 1. プロジェクトのクローン
```bash
git clone https://github.com/TK3214-MS/Copilot-for-Education.git
cd Copilot-for-Education
```

### 2. ローカルサーバーで実行
HTTPサーバーを起動してアプリケーションを実行します：

```bash
# Python 3の場合
python -m http.server 8000

# Python 2の場合
python -m SimpleHTTPServer 8000

# Node.jsの場合
npx http-server

# VS Code Live Server拡張機能を使用する場合
# index.htmlを右クリック → "Open with Live Server"
```

### 3. アプリケーションにアクセス
ブラウザで `http://localhost:8000` にアクセスし、使用したい役割（生徒 or 教員）を選択してください。

## API設定

### 本番環境での設定
`src/js/config.js` ファイルで以下の設定を変更してください：

```javascript
const CONFIG = {
    // 本番APIエンドポイント
    API_BASE_URL: 'https://your-api-endpoint.com/v1',
    COPILOT_API_URL: 'https://graph.microsoft.com/v1.0',
    
    // Microsoft 365認証情報
    MICROSOFT_365_CLIENT_ID: 'your-actual-client-id',
    MICROSOFT_365_TENANT_ID: 'your-actual-tenant-id',
    
    // デバッグモードを無効化
    DEBUG_MODE: false,
    
    // その他の設定...
};
```

### 認証設定
Microsoft 365との連携には、Azure AD アプリケーション登録が必要です：

1. Azure Portal でアプリケーションを登録
2. 必要なAPI権限を設定
3. Client IDとTenant IDを取得
4. `config.js`に設定値を反映

## 機能詳細

### 生徒向け機能

#### 学習ダッシュボード
- 個人の強み・弱点の可視化
- 好きな科目と学習特性の表示
- 目標と将来の夢の管理

#### 学習計画機能
- AI分析による個人最適化された学習計画
- 週間スケジュールの提案
- 進捗追跡機能

#### アドバイス機能
- Copilotとの会話ログ分析による学習アドバイス
- 弱点克服のためのステップガイド
- 強みを活かした学習方法の提案

### 教員向け機能

#### 生徒管理ダッシュボード
- 全生徒の学習状況一覧
- フィルタリング・検索機能
- 統計情報の表示

#### 生徒詳細分析
- 個別生徒の詳細プロフィール
- Copilotとの会話履歴
- 学習パターンの分析

#### レポート機能
- 生徒別学習レポートの生成
- データエクスポート機能
- 指導計画支援

## データ管理

### サンプルデータ
現在はサンプルデータを使用しており、以下の情報が含まれています：
- 生徒の基本情報（名前、学年、クラス）
- 学習特性（強み、弱点、好きな科目）
- 性格特性とコミュニケーションスタイル
- Copilotとの会話ログ（模擬データ）

### データプライバシー
- ローカルストレージを使用したクライアントサイドデータ管理
- 個人情報の暗号化（本番実装時）
- GDPR対応のデータ処理ポリシー

## ブラウザ対応

### 推奨ブラウザ
- Google Chrome 90+
- Mozilla Firefox 88+
- Microsoft Edge 90+
- Safari 14+

### 必要な機能
- ES6+ JavaScript対応
- CSS Grid & Flexbox対応
- Local Storage対応

## アクセシビリティ

### 対応機能
- キーボードナビゲーション
- スクリーンリーダー対応
- 高コントラストモード対応
- フォーカス管理

### WCAG準拠
Web Content Accessibility Guidelines 2.1 レベルAAに準拠するよう設計されています。

## 今後の拡張予定

### Phase 1 (短期)
- Microsoft 365 Copilot API の実装
- 実際のユーザー認証システム
- データベース連携

### Phase 2 (中期)
- PWA (Progressive Web App) 対応
- オフライン機能
- プッシュ通知

### Phase 3 (長期)
- 多言語対応
- 機械学習による予測分析
- モバイルアプリ版

## 貢献方法

### バグレポート
GitHubのIssueページでバグレポートや機能要望を受け付けています。

### 開発参加
1. リポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

### コーディング規約
- JavaScript: ES6+ 標準に準拠
- CSS: BEM methodology推奨
- HTML: Semantic HTML5使用

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## サポート

### ドキュメント
- [API仕様書](docs/api.md) (作成予定)
- [インストールガイド](docs/installation.md) (作成予定)
- [FAQ](docs/faq.md) (作成予定)

### お問い合わせ
- Email: support@school-life-assistant.com
- GitHub Issues: https://github.com/TK3214-MS/Copilot-for-Education/issues

## 更新履歴

### v1.0.0 (2025-08-20)
- 初期リリース
- 生徒向け・教員向け基本機能実装
- サンプルデータによるデモ機能
- レスポンシブデザイン対応

---

**School Life Assistant** - 学習の未来を支援するプラットフォーム