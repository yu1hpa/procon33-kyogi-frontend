# Procon33 Kyogi Frontend

## 概要

本アプリケーションは、
全国高等専門学校プログラミングコンテスト（高専プロコン）第 33 回 群馬大会 競技部門において、
試合の情報・問題情報・分割データの取得、回答の送信などがおこなえるものである。

## 動作の詳細

動作の詳細は[こちら](./docs/README.md)です。

## 使い方

まずはじめに、`.env.local`に配布されたトークンを置く必要があります。

```none
PROCON_TOKEN=<TOKEN>
```

### 準備

```none
$ yarn install
```

### 開発サーバー起動

```none
$ yarn dev
```

### ビルド & 起動

```none
$ yarn build
$ yarn start
```

## ライセンス

MIT LICENSE

## 作者

yu1hpa
