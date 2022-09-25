import bayes from 'bayes';
import fs from 'fs';
import Mecab from 'mecab-async';

async function my_mecab(text) {
  return await new Promise((resolve, reject) => {
    Mecab.parse(text, function (err, result) {
      if (err) reject(err)

      const wakachi = result.filter(x => /^動詞|名詞|形容詞/.test(x)).map(x => x[0])
      resolve(wakachi.filter(v => v))
    })
  })
}

let classifier = bayes({
  tokenizer: async function (text) { return await my_mecab(text) }
});

export function get_classifier(model_path) {
  // console.log(JSON.parse(fs.readFileSync(model_path, 'utf8')))
  return bayes.fromJson(fs.readFileSync(model_path, 'utf8'));
}

function file_importer(text_path) {
  const text = fs.readFileSync(text_path, 'utf8');
  return text.toString().split('\n');
}

const grand_true_texts = file_importer('./resource/grand_true.txt');
const grand_false_texts = file_importer('./resource/grand_false.txt');

for (const txt of grand_true_texts) {
  // console.log(txt)
  await classifier.learn(txt, "windows");
}
for (const txt of grand_false_texts) {
  await classifier.learn(txt, "other");
}


const model = classifier.toJson()
// console.log(model);
fs.writeFileSync("./models/model.json", model)
// console.log(await classifier.categorize('Microsoft、Surface製品関連オンラインイベントを10月12日に開催'));
// console.log(await classifier.categorize('How to enable tabs in File Explorer on Windows 11 22H2 Build 22621'));
