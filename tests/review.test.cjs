const fs=require('fs'),vm=require('vm'),assert=require('assert');
const els=new Map(), saved={};
function el(key){if(!els.has(key))els.set(key,{innerHTML:'',textContent:'',value:key==='#rate'?'0.8':'',style:{},setAttribute(){},focus(){},querySelector:(k)=>k==="#reviewTitle"?{focus(){}}:{onclick:null,onchange:null,innerHTML:"",textContent:"",focus(){},querySelector:()=>({innerHTML:"",textContent:""})},querySelectorAll:()=>[]});return els.get(key)}
const ctx=vm.createContext({console,window:{},localStorage:{getItem:k=>saved[k],setItem:(k,v)=>saved[k]=v},document:{querySelector:el,querySelectorAll:()=>[]}});
vm.runInContext(fs.readFileSync('practice-data.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('learning-storage.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('reading-extras.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('daily-lessons.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('grammar-lessons.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('review.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*)<\/script>/)[1],ctx);
vm.runInContext(`
function expect(value, message) { if (!value) throw Error(message); }
const readings = new Set(), grammarExamples = new Set(), newWords = new Set(), dailyPhrases = new Set(), learningItems = new Set(), topicNames = new Set();
for (let i=0; i<105; i++) {
 const cards=dailyCards(i), d=days[i], reading=lessonReading(i);
 expect(!topicNames.has(d.topic),'repeated daily topic '+d.topic); topicNames.add(d.topic);
 expect(cards.length===new Set([...lessonVocabulary(i).map(p=>p[0]),d.phrase[0],readingExtras[i][0]]).size,'full card count '+i);
 expect(cards.some(c=>c.word===d.phrase[0]),'missing daily phrase '+i);
 expect(lessonVocabulary(i).every(p=>cards.some(c=>c.word===p[0])),'missing word '+i);
 for (const word of [...lessonVocabulary(i).map(p=>p[0]),readingExtras[i][0]]) {
  const key=word.toLowerCase().trim(); expect(!newWords.has(key),'repeated new word '+key+' on day '+(i+1)); newWords.add(key);
 }
 expect(!dailyPhrases.has(d.phrase[0]),'repeated daily phrase '+d.phrase[0]); dailyPhrases.add(d.phrase[0]);
 for(const item of cards) { const key=item.word.toLowerCase().trim(); expect(!learningItems.has(key),'repeated learning item '+key); learningItems.add(key); }
 expect(reading.english.split(/\\s+/).length>=100,'reading too short '+i);
 expect(reading.vietnamese.includes(translations[d.week][d.di]),'translation '+i);
 readings.add(reading.english);
 const grammar=grammarForDay(i), grammarQuiz=grammarQuestion(i);
 expect(grammar.example && grammar.translation && grammar.rule && grammar.formula,'grammar content '+i);
 expect(grammarQuiz.prompt.includes('____')&&!grammarQuiz.prompt.includes('null'),'grammar cloze '+i);
 grammarExamples.add(grammar.example);
 const questions=dailyQuestions(i);
 expect(questions.every(q=>!q.prompt.includes('null')&&!q.prompt.includes('undefined')),'question content '+i);
 expect(questions.filter(q=>q.type==='blank').every(q=>q.prompt.includes('____')),'missing blank '+i);
}
expect(readings.size===105,'readings must differ');
expect(newWords.size===630&&dailyPhrases.size===105&&learningItems.size===735,'all daily learning items must be unique');
expect(grammarExamples.size===105,'grammar examples must differ');
expect(dailyTargetWords(0)===12&&dailyTargetWords(104)===116,'daily speaking target range');
for(let i=1;i<105;i++) expect(dailyTargetWords(i)===dailyTargetWords(i-1)+1,'small daily increase '+i);
document.querySelector('#dailyAnswer').oninput({target:{value:'I check my notes every morning.'}});
expect(state.writing[0]==='I check my notes every morning.','daily answer saved');
expect(document.querySelector('#dailyWordCount').textContent.startsWith('6 / 12'),'daily answer word count');
startPractice(); expect(reviewSession().cards.length===7 && reviewSession().questions.length===0,'first-day boundary');
completePractice(); expect(reviewSession().phase==='result','first-day cards result');
select(1);startPractice();let s=reviewSession();
expect(s.questions.length===11&&s.questions.every(q=>q.sourceDay===0)&&s.questions.some(q=>q.id==='0-grammar'),'day 2 reviews day 1 including grammar');
expect(s.cards.every(c=>c.id.startsWith('1-card-')),'today cards source');
s.phase='quiz';s.draft='incorrect';checkReviewAnswer();s.draft=s.questions[0].answer;checkReviewAnswer();advanceReview();
while(s.phase==='quiz'){s.draft=s.questions[s.index].answer;checkReviewAnswer();advanceReview();}
expect(s.firstCorrect===10,'first-attempt grade');
expect(state.practice[1].pending.length===1,'yesterday mistakes retained');
startPractice('retry');s=reviewSession();s.draft=s.questions[0].answer;checkReviewAnswer();advanceReview();
expect(state.practice[1].pending.length===0,'cross-day retry cleared');
startPractice('cards');expect(!reviewSession().questions.length,'independent flashcards');
const payload=backupPayload();expect(validateBackup(JSON.parse(JSON.stringify(payload))).practice[1].session.cards.length===7,'backup new card count');
select(104);startPractice('yesterday');expect(reviewSession().questions.every(q=>q.sourceDay===103),'last day reviews previous');
reviewSession().flowVersion=2;renderReview();expect(!reviewSession()&&state.practice[104].contentUpdated,'outdated session refreshed');
startPractice();expect(reviewSession().flowVersion===3,'new practice uses current word set');
console.log('PASS: 105 distinct bilingual readings, all daily flashcards, previous-day review, first-day boundary, scoring, cross-day retry, backup');
`,ctx);
