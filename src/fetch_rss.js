import Parser from "rss-parser";
import { get_classifier } from "./estimation.js";
const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml, application/atom+xml',
  },
});


export async function fetch_rss(baseDate, URL, pattern) {

  const feed = await parser.parseURL(URL);
  const result = await feed.items
    .map(item => {
      return ({
        title: item.title,
        link: item.link,
        pubDate: new Date(item.isoDate)
      })
    }).filter(item => baseDate < item.pubDate && pattern.test(item.title));
  return result;
}

export async function fetch_rss_by_bayes(baseDate, URL) {
  const feed = await parser.parseURL(URL);
  const result = await feed.items
    .map(item => {
      return ({
        title: item.title,
        link: item.link,
        pubDate: new Date(item.isoDate)
      })
    }).filter(item => baseDate < item.pubDate && hantei(item.title));
  return result;
}

async function hantei(text) {
  const classifier = get_classifier("./models/model.json");
  const pred = await classifier.categorize(text);

  return await (pred == "windows")
}