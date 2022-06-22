import { fetch_rss } from "./fetch_rss.js";
import 'dotenv/config';
import mail from "@sendgrid/mail";

const env = process.env;
const sgMail = mail
sgMail.setApiKey(env.API_KEY);
const from = env.FROM;
const tos = env.TOS.split(',');

const msg = {
    personalizations: [
        {
            to: tos[0],
        },
        {
            to: tos[1],
        },
    ],

    from: {
        email: from, // 送信元アドレス
        name: 'cacao math' // 送信者名
    },
    subject: `[windows news] ${(new Date()).toString()}`, // 件名
}

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

function arrToHtml(rssArr){
    return "<ul>" + rssArr.map(item =>{
        return `<li> <a href='${item.link}'> ${item.title} </a>: ${item.pubDate} </li>` 
    }).join("") + "</ul>"
}

const main = async () => {
    let results = [];

    for(const url of feedURL){
        const tmp = await fetch_rss(baseDate, url, matchPattern);
        results = await results.concat(tmp);
    }
    const uniqueResult = await Array.from(
        new Map(results.map(result => [result.title, result])).values()
    );
    msg.html = await arrToHtml(uniqueResult);
    // 送信
    const response = await sgMail.send(msg);
    // 結果出力
    const obj = JSON.parse(JSON.stringify(response[0]));
    console.log("status : ", obj.statusCode, "body : ", obj.body, "header : ", obj.headers);
};
main();