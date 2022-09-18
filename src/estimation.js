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

const classifier = bayes({
  tokenizer: async function (text) { return await my_mecab(text) } 
});

function file_importer(text_path){
  const text = fs.readFileSync(text_path, 'utf8');
  return text.toString().split('\n');
}

async function learn_classifier(classifier, txt, category){
  await classifier.learn(txt, category);
  return classifier;
}
const texts1 = file_importer('./resource/grand_true.txt');
for(const txt of texts1){
  await learn_classifier(classifier, txt, "windows");
}
const texts2 = file_importer('./resource/grand_false.txt');
for(const txt of texts2){
  await learn_classifier(classifier, txt, "other");
}
console.log(await classifier.categorize('しゃけ'));
