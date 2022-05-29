import { fetch_rss } from "./fetch_rss.js";
import 'dotenv/config';
import NodeMailer from 'nodemailer';

const env = process.env

const feedURL = [
    "https://blogs.windows.com/feed/", //Windows Blogs
    "https://blogs.windows.com/windows-insider/feed/", //Windows Insider Blogs
    'https://devblogs.microsoft.com/landingpage/', //Microsoft Developer Blogs
    "https://devblogs.microsoft.com/dotnet/feed/", //.NET Blog
    "https://forest.watch.impress.co.jp/data/rss/1.0/wf/feed.rdf", //窓の杜
    "https://pc.watch.impress.co.jp/data/rss/1.0/pcw/feed.rdf", //PC Watch
    "https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml", //ITmedia NEWS
    "https://www.publickey1.jp/atom.xml", //Publickey
    "https://www.windowslatest.com/feed/", //Windows Latest
    "https://www.blogger.com/feeds/1894205398638095613/posts/default", //山市良のえぬなんとかわーるど
];
const baseDate = new Date(Date.now());
baseDate.setDate(baseDate.getDate() - 1);
baseDate.setHours(0);
baseDate.setMinutes(0);
baseDate.setSeconds(0);

const matchPattern = /[mM]icro.*|マイクロソフト|[wW]in.*|Net|アップデート|[uU]pdate/

const smtpData = {
    host: 'smtp.gmail.com', // Gmailのサーバ
    port: '465',            // Gmailの場合　SSL: 465 / TLS: 587
    secure: true,           // true = SSL
    auth: {
      user: env.MAIL_USER,  // メールアドレス（自身のアドレスを指定）
      pass: env.MAIL_PASSWORD            // パスワード（自身のパスワードを指定）
    }
  }

// メール送信関数
function sendMail (smtpData, mailData) {
 
    // SMTPサーバの情報をまとめる
    const transporter = NodeMailer.createTransport(smtpData)
   
    // メール送信
    transporter.sendMail(mailData, function (error, info) {
      if (error) {
        // エラー処理
        console.log(error)
      } else {
        // 送信時処理
        console.log('Email sent: ' + info.response)
      }
    })
  }

function arrToHtml(rssArr){
    return "<ul>" + rssArr.map(item =>{
        return `<li> <a href='${item.link}'> ${item.title} </a>: ${item.pubDate} </li>` 
    }) + "</ul>"
}

const main = async () => {
    let results = [];

    for(const url of feedURL){
        const tmp = await fetch_rss(baseDate, url, matchPattern);
        results = results.concat(tmp);
    }
    console.log(results);
    console.log(results.length);
    // 送信内容を作成
    const mailData = {
        from: 'smtpData.auth.user',     // 送信元名
        to: env.TO,                    // 送信先
        subject: '今日のWindows系RSS',           // 件名
        html: arrToHtml(results),           // 通常のメール本文
    }
    sendMail(smtpData, mailData);
};
main();