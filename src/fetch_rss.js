import Parser from "rss-parser";
const parser = new Parser();

export async function fetch_rss(baseDate, URL, pattern){

  const feed = await parser.parseURL(URL);
  const result = await feed.items
    .map(item =>{
      return ({
        title: item.title,
        link: item.link,
        pubDate: new Date(item.isoDate)})
      }).filter(item => baseDate < item.pubDate && pattern.test(item.title));
  return result;
}
