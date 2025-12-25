# QRコード出席確認システム

QRコードを使用した簡単な出席確認システムです。学生がQRコードを生成し、教員がカメラでスキャンして出席を記録します。**Google Spreadsheetへの自動記録機能**を搭載し、リアルタイムで出席データを管理できます。

## 📱 クイックアクセス

### 学生用QRコード生成ページ

授業の最初に以下のQRコードをスキャンして、出席QRコード生成ページにアクセスしてください：

![学生用ページQRコード](https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://SuzukiLab-Niigata.github.io/lesson.github.io/)

または直接アクセス: `https://SuzukiLab-Niigata.github.io/lesson.github.io/`

## 概要

このシステムは2つのHTMLファイルで構成されています：

- **index.html** - 学生用QRコード生成ページ
- **teacher.html** - 教員用QRコードスキャナー（Google Spreadsheet自動連携）

## 主な機能

### 学生用機能（index.html）
- 学籍番号と氏名を入力してQRコードを生成
- ブラウザ上で完結（インストール不要）
- スマートフォン対応

### 教員用機能（teacher.html）
- **Googleアカウントでログイン** - 簡単認証
- **Spreadsheet自動作成** - 初回アクセス時に自動的にGoogle Driveに保存
- **URL共有機能** - 他の教員も同じSpreadsheetにアクセス可能
- QRコードをカメラでスキャン
- リアルタイムでSpreadsheetに記録
- 重複スキャン防止
- CSV形式でローカルバックアップ
- データクリア機能

## 使い方

### 学生側の操作

1. 上記のQRコードまたはURLから`index.html`にアクセス
2. 学籍番号を入力（例: 2025001）
3. 氏名を入力（例: 山田太郎）
4. 「QRコードを作成」ボタンをクリック
5. 表示されたQRコードを教員に提示

### 教員側の操作

#### 初回セットアップ（最初のユーザーのみ）

1. Google Cloud Consoleでプロジェクトを作成（[セットアップ手順](#google-cloud-console設定)参照）
2. APIキーとクライアントIDを取得
3. `teacher.html`を開く
4. APIキーとクライアントIDを入力
5. 「認証情報を保存してログイン」ボタンをクリック
6. Googleアカウントでログイン
7. **自動的にSpreadsheetが作成されます**
8. 表示される共有URLをコピーして他の教員に送信

#### 2回目以降の使用（作成者）

1. `teacher.html`を開く
2. 保存済みの認証情報で自動的に前回のSpreadsheetに接続
3. QRコードをスキャンして出席を記録

#### 他の教員の使用

1. 共有されたURLにアクセス（例: `teacher.html?sheetId=XXXXX`）
2. 自分のAPIキーとクライアントIDを入力してログイン
3. 同じSpreadsheetに記録可能

## セットアップ

### GitHub Pagesでの公開

1. GitHubリポジトリの Settings > Pages に移動
2. Source を `main` ブランチに設定
3. 公開されたURLにアクセス
   - 学生用: `https://あなたのユーザー名.github.io/lesson.github.io/`
   - 教員用: `https://あなたのユーザー名.github.io/lesson.github.io/teacher.html`

### Google Cloud Console設定

teacher.htmlを使用するには、Google Cloud Consoleでプロジェクトを作成し、API認証情報を取得する必要があります。

#### 1. Google Cloud Projectの作成

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成
   - プロジェクト名: `出席管理システム`（任意）
3. プロジェクトを選択

#### 2. Google Sheets APIの有効化

1. 左メニューから「APIとサービス」→「ライブラリ」を選択
2. 「Google Sheets API」を検索
3. 「有効にする」をクリック

#### 3. APIキーの作成

1. 「APIとサービス」→「認証情報」を選択
2. 「認証情報を作成」→「APIキー」をクリック
3. 作成されたAPIキーをコピー
4. （推奨）「キーを制限」をクリック
   - アプリケーションの制限: HTTPリファラー
   - ウェブサイトの制限: あなたのGitHub PagesのURL（例: `https://*.github.io/*`）
   - API の制限: Google Sheets API のみ選択
5. 「保存」をクリック

#### 4. OAuth 2.0 クライアントIDの作成

1. 「認証情報を作成」→「OAuth クライアント ID」をクリック
2. 同意画面の構成が必要な場合:
   - User Type: 外部
   - アプリ名: `出席管理システム`
   - サポートメール: あなたのメールアドレス
   - スコープ: 追加不要
   - テストユーザー: 使用する全員のGmailアドレスを追加
3. アプリケーションの種類: **ウェブアプリケーション**
4. 名前: `出席スキャナー`（任意）
5. 承認済みのJavaScript生成元を追加:
   - `https://あなたのユーザー名.github.io`
   - ローカルテスト用: `http://localhost` または `http://127.0.0.1`
6. 承認済みのリダイレクトURIを追加:
   - `https://あなたのユーザー名.github.io/lesson.github.io/teacher.html`
7. 「作成」をクリック
8. クライアントIDをコピー

#### 5. teacher.htmlでの設定

1. `teacher.html`を開く
2. **APIキー**を入力
3. **クライアントID**を入力
4. 「認証情報を保存してログイン」をクリック
5. Googleアカウントでログイン
6. 権限を許可

## データ形式

### QRコード形式
```
学籍番号,氏名
```
例: `2025001,山田太郎`

### Spreadsheetの列
| 学籍番号 | 氏名 | 日付 | 時刻 | 記録日時 |
|---------|------|------|------|----------|
| 2025001 | 山田太郎 | 2025/12/25 | 10:30:45 | 2025-12-25T01:30:45.123Z |

### CSV出力
- ファイル名: `attendance_YYYY-MM-DD.csv`
- エンコーディング: UTF-8 (BOM付き)
- 列: 学籍番号, 氏名, 日付, 時刻

## よくある質問（FAQ）

### Q1. Google Cloud Consoleの設定は全員必要ですか？
いいえ。**1人が設定すれば、APIキーとクライアントIDを共有**することで、他の人も同じ設定を使用できます。ただし、各自がGoogleアカウントでログインする必要があります。

### Q2. Spreadsheetは誰のDriveに保存されますか？
**最初にログインして作成した人のGoogle Drive**に保存されます。他のユーザーは、共有URLを使ってそのSpreadsheetに記録します。

### Q3. 複数の教員で同時に使用できますか？
はい。共有URLを使えば、複数の教員が同じSpreadsheetに同時に記録できます。

### Q4. オフラインでも使用できますか？
QRコードの生成とスキャンはオフラインでも可能ですが、Spreadsheetへの送信にはインターネット接続が必要です。ローカルにもデータが保存されるため、後でCSVでエクスポートできます。

### Q5. Spreadsheetを新しく作り直したい場合は？
ブラウザのLocalStorageをクリアするか、別のブラウザで新規にログインしてください。

### Q6. セキュリティは大丈夫ですか？
- Google OAuth 2.0で認証
- APIキーはHTTPリファラーで制限可能
- Spreadsheetは自分のGoogle Driveに保存
- データは暗号化通信（HTTPS）で送信

## 技術仕様

### 使用API・ライブラリ

- **Google Sheets API v4** - Spreadsheet操作
- **Google Identity Services** - OAuth 2.0認証
- **jsQR** - QRコード読み取り
- **QRCode.js** - QRコード生成

### 対応ブラウザ

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- モバイルブラウザ（iOS Safari, Chrome Mobile）

### 必要な権限

- `https://www.googleapis.com/auth/spreadsheets` - Spreadsheet読み書き
- カメラアクセス（QRコードスキャン用）

## 注意事項

- HTTPSまたはlocalhostでの動作が必要です
- Google Cloud Consoleの無料枠を使用する場合、リクエスト数に制限があります
- スプレッドシートIDはURLパラメータとlocalStorageに保存されます
- 同じ学生が複数回QRコードを提示しても、1回のみ記録されます

## トラブルシューティング

### 「APIキーが無効です」と表示される
- APIキーが正しいか確認
- Google Sheets APIが有効化されているか確認
- APIキーの制限設定を確認

### 「認証に失敗しました」と表示される
- クライアントIDが正しいか確認
- 承認済みのJavaScript生成元が正しいか確認
- OAuth同意画面でテストユーザーに追加されているか確認

### Spreadsheetに記録されない
- ブラウザの開発者ツールでエラーを確認
- Googleアカウントにログインしているか確認
- インターネット接続を確認

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 改善案

- 複数の授業・クラスを管理する機能
- 出席率の統計表示とグラフ化
- 遅刻の自動判定機能
- 学生リストの一括インポート
- QRコードの有効期限設定
- 欠席者の自動リストアップ
