# windows_news_collector
- 任意（ここではwindowsのキーワードが入っているもの）のRSSフィードを取得し、1日に1回メール配信するプログラム
- RSSは[rss-parser](https://www.npmjs.com/package/rss-parser), メール送信は[SendGrid](https://sendgrid.kke.co.jp/blog/?p=1026)のAPIを使用
- メール配信の自動化のためにGithub Actionsを使用する。


# bayse
- ナイーブベイズで分析を行う
- https://github.com/ttezel/bayes

# 形態素分析
- ナイーブベイズへの入力データの前処理に使う
- https://blog.kozakana.net/2019/04/try-tokenizer/