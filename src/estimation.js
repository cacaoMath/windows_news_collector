import bayes from 'bayes';
import fs from 'fs';
import Mecab from 'mecab-async';

async function my_mecab(text){
  return await new Promise((resolve,reject) => {
    Mecab.parse(text, function(err, result) {
      if (err) reject(err)
  
      const wakachi = result.filter(x => /^動詞|名詞|形容詞/.test(x)).map(x => x[0])
      resolve(wakachi.filter(v => v))
    })
  })
}

let classifier = bayes({
  tokenizer: async function (text) { return await my_mecab(text) } 
});

function file_importer(text_path){
  const text = fs.readFileSync(text_path, 'utf8');
  return text.toString().split('\n');
}

const grand_true_texts = file_importer('./resource/grand_true.txt');
for(const txt of grand_true_texts){
  console.log(txt)
  await classifier.learn(txt, "win");
}
const grand_false_texts = file_importer('./resource/grand_false.txt');
for(const txt of grand_false_texts){
  await classifier.learn(txt, "other");
}
console.log(classifier.toJson());
console.log(await classifier.categorize('ガジェット'));