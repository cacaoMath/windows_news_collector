import Parser from "rss-parser";
// let Parser = require('rss-parser');
let parser = new Parser();

export async function fetch_rss(URL){

    let feed = await parser.parseURL(URL);
    console.log(feed.title);
  
    feed.items.forEach(item => {
      if(item["dc:date"]===undefined){
        console.log(item.title, item.link, item["pubDate"]);
      }else{
        console.log(item.title, item.link, item["dc:date"]);
      }
    });
    console.log("--------");
  };