import bayes from 'bayes';
import fs from 'fs';
import TinySegmenter from 'tiny-segmenter';

const segmenter = new TinySegmenter()
const classifier = bayes({
  tokenizer: function (text) { return segmenter.segment(text) } 
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
  console.log(segmenter.segment(txt))
  await learn_classifier(classifier, txt, "windows");
}
const texts2 = file_importer('./resource/grand_false.txt');
for(const txt of texts2){
  await learn_classifier(classifier, txt, "non windows");
}
await console.log(await classifier.categorize('ハピネス'));
