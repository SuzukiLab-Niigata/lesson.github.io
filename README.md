# QRコード出席確認システム

QRコードを使用した簡単な出席確認システムです。学生がQRコードを生成し、教員がカメラでスキャンして出席を記録します。Google Spreadsheetへのリアルタイム更新にも対応しています。

## 📱 クイックアクセス

### 学生用QRコード生成ページ

授業の最初に以下のQRコードをスキャンして、出席QRコード生成ページにアクセスしてください：

![学生用ページQRコード](https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://あなたのユーザー名.github.io/lesson.github.io/)

または直接アクセス: `https://あなたのユーザー名.github.io/lesson.github.io/`

## 概要

このシステムは2つのHTMLファイルで構成されています：

- **index.html** - 学生用QRコード生成ページ
- **teacher.html** - 教員用QRコードスキャナー
- **Code.gs** - Google Apps Script（Spreadsheet連携用）

## 機能

### 学生用機能（index.html）
- 学籍番号と氏名を入力
- 出席確認用のQRコードを生成
- ブラウザ上で完結（インストール不要）

### 教員用機能（teacher.html）
- カメラを使ってQRコードをスキャン
- 読み取った学生情報をリアルタイムで表示
- **Google Spreadsheetへのリアルタイム送信**
- 重複スキャン防止機能
- 出席リストをCSV形式でダウンロード（日付入り）
- スキャン成功時の視覚的フィードバック
- データクリア機能

## 使い方

### 学生側の操作

1. `index.html`をブラウザで開く（またはQRコードからアクセス）
2. 学籍番号を入力（例: 2025001）
3. 氏名を入力（例: 山田太郎）
4. 「QRコードを作成」ボタンをクリック
5. 表示されたQRコードを教員に提示

### 教員側の操作

#### 初回セットアップ（Google Spreadsheet連携する場合）

1. `teacher.html`をブラウザで開く
2. Google Apps Script Web App URLを入力（セットアップ手順は下記参照）
3. 「設定を保存」ボタンをクリック
4. 接続ステータスが「接続済み」になることを確認

#### 日常の出席確認

1. `teacher.html`をブラウザで開く
2. カメラへのアクセス許可を承認
3. 学生が提示するQRコードをカメラでスキャン
4. スキャンされた学生情報が自動的にリストに追加される
5. Spreadsheet連携設定済みの場合、自動的にGoogleスプレッドシートに記録される
6. 授業終了後、必要に応じて「CSVで保存」ボタンでローカルバックアップを取得

## 技術仕様

### 使用ライブラリ

- **jsQR** - QRコード読み取り用（teacher.html）
- **QRCode.js** - QRコード生成用（index.html）

### 対応ブラウザ

- カメラアクセスが可能な最新のブラウザ（Chrome, Firefox, Safari, Edgeなど）
- スマートフォンでも利用可能

### データ形式

QRコードには以下の形式でデータが格納されます：
```
学籍番号,氏名
```

例: `2025001,山田太郎`

## セットアップ

### ローカル環境での使用

1. リポジトリをクローン
```bash
git clone https://github.com/あなたのユーザー名/lesson.github.io.git
cd lesson.github.io
```

2. HTMLファイルをブラウザで直接開く
   - 学生用: `index.html`を開く
   - 教員用: `teacher.html`を開く

### GitHub Pagesでの公開

1. GitHubリポジトリの Settings > Pages に移動
2. Source を `main` ブランチに設定
3. 公開されたURLにアクセス
   - 学生用: `https://あなたのユーザー名.github.io/lesson.github.io/`
   - 教員用: `https://あなたのユーザー名.github.io/lesson.github.io/teacher.html`

### Google Spreadsheet連携のセットアップ

#### 1. Google Spreadsheetの準備

1. [Google Spreadsheet](https://sheets.google.com)で新しいスプレッドシートを作成
2. スプレッドシートのURLから **スプレッドシートID** を取得
   - URL例: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
   - `SPREADSHEET_ID_HERE`の部分をコピー

#### 2. Google Apps Scriptの設定

1. スプレッドシートのメニューから「拡張機能」→「Apps Script」を選択
2. 表示されたエディタに `Code.gs` の内容をコピー＆ペースト
3. `YOUR_SPREADSHEET_ID_HERE` を実際のスプレッドシートIDに置き換え
4. 「デプロイ」→「新しいデプロイ」を選択
5. 「種類の選択」で「ウェブアプリ」を選択
6. 以下の設定を行う：
   - 説明: `出席記録システム`（任意）
   - 次のユーザーとして実行: `自分`
   - アクセスできるユーザー: `全員`
7. 「デプロイ」ボタンをクリック
8. 権限の承認を求められたら許可する
9. 表示される **ウェブアプリのURL** をコピー（これがWeb App URL）

#### 3. teacher.htmlでの設定

1. `teacher.html`を開く
2. コピーしたWeb App URLを入力欄に貼り付け
3. 「設定を保存」ボタンをクリック
4. ステータスが「接続済み」になれば完了

#### 4. 動作確認

1. `index.html`でテスト用QRコードを生成
2. `teacher.html`でスキャン
3. Google Spreadsheetに自動的に記録されることを確認

## 注意事項

- カメラ機能を使用するため、HTTPSまたはlocalhostでの動作が必要です
- スマートフォンで使用する場合は、背面カメラが自動的に選択されます
- 同じ学生が複数回QRコードを提示しても、1回のみ記録されます
- CSVファイルはUTF-8（BOM付き）で保存されるため、Excelでも文字化けせずに開けます
- Google Spreadsheet連携の設定はブラウザのLocalStorageに保存されます
- 出席データはCSVとSpreadsheetの両方に記録されるため、バックアップが確保されます

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## CSV出力形式

システムからダウンロードされるCSVファイルには以下の情報が含まれます：

- **学籍番号**: 学生が入力した学籍番号
- **氏名**: 学生が入力した氏名
- **日付**: スキャンされた日付
- **時刻**: スキャンされた時刻

ファイル名: `attendance_YYYY-MM-DD.csv`

## よくある質問（FAQ）

### Q1. Google Spreadsheet連携は必須ですか？
いいえ、必須ではありません。連携なしでも、ローカルでCSVファイルとしてダウンロードできます。

### Q2. 複数のブラウザで使用できますか？
はい、Google Spreadsheet連携を設定すれば、どのブラウザからでも同じスプレッドシートに記録できます。ただし、各ブラウザで個別にWeb App URLの設定が必要です。

### Q3. オフラインでも使用できますか？
QRコードの生成とスキャンはオフラインでも可能ですが、Google Spreadsheetへの送信にはインターネット接続が必要です。

### Q4. データのセキュリティは？
Google Apps Scriptは「自分」として実行され、スプレッドシートへのアクセス権はあなたのGoogleアカウントで管理されます。

## 改善案

- 複数の授業・クラスを管理する機能
- 出席率の統計表示
- 遅刻の記録機能（時刻による自動判定）
- 学生リストの一括インポート機能
- QRコードの有効期限設定
