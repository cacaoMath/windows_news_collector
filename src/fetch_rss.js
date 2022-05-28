import Parser from "rss-parser";
// let Parser = require('rss-parser');
let parser = new Parser();

export async function fetch_rss(URL){

    let feed = await parser.parseURL(URL);
    console.log(feed.title);
  
    feed.items.forEach(item => {
      console.log(item.title + ':' + item.link+ "- " +item["pubDate"])
    });
    console.log("--------");
  };