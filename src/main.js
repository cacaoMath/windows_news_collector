import { fetch_rss } from "./fetch_rss.js";

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

const main = async () => {
    let results = [];

    for(const url of feedURL){
        const tmp = await fetch_rss(baseDate, url, matchPattern);
        results = results.concat(tmp);
    }
    console.log(results);
    console.log(results.length);
    return results;
};
main();