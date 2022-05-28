import Parser from "rss-parser";
// let Parser = require('rss-parser');
let parser = new Parser();

export async function fetch_rss(baseDate, URL){

    let feed = await parser.parseURL(URL);
    console.log(feed.title);

    let result = [];
  
    feed.items.forEach(item => {
      if(item["dc:Date"] !== undefined){
        item.pubdate = item["dc:Date"];
      }
      if(baseDate < new Date(item.pubDate)){
        result.push({title: item.title, link: item.link, date: item.pubDate});
      }
    });
    console.log(result);
    return result;
  };
