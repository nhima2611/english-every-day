const fs=require('fs'),vm=require('vm'),assert=require('assert');
const els=new Map(), saved={};
function el(key){if(!els.has(key))els.set(key,{innerHTML:'',textContent:'',value:key==='#rate'?'0.8':'',style:{},setAttribute(){},focus(){},querySelector:(k)=>k==="#reviewTitle"?{focus(){}}:{onclick:null,onchange:null,innerHTML:"",textContent:"",focus(){},querySelector:()=>({innerHTML:"",textContent:""})},querySelectorAll:()=>[]});return els.get(key)}
const ctx=vm.createContext({console,window:{},localStorage:{getItem:k=>saved[k],setItem:(k,v)=>saved[k]=v},document:{querySelector:el,querySelectorAll:()=>[]}});
vm.runInContext(fs.readFileSync('practice-data.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('learning-storage.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('review.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*)<\/script>/)[1],ctx);
vm.runInContext(`
function expect(x,msg){if(!x)throw Error(msg)}
for(let i=0;i<105;i++){
 expect(dailyCards(i).length===7,'card count');const qs=dailyQuestions(i);expect(qs.length===10,'question count');
 expect(new Set(qs.map(q=>q.id)).size===10,'unique IDs');
 expect(qs.slice(0,5).every(q=>!q.prompt.toLowerCase().includes(q.answer.toLowerCase()) && q.prompt.includes('Gợi ý:')),'context cloze leaks answer');
 expect(qs[5].prompt.includes('____') && !qs[5].prompt.includes('null'),'phrase context');
 expect(qs.every(q=>q.answer&&q.explanation&&!q.prompt.includes('undefined')),'content');
 expect(qs.filter(q=>q.type==='blank').every(q=>q.prompt.includes('____')),'blank missing');
}
expect(normalizeAnswer('  GET   UP! ')==='get up','normalization');
startPractice();expect(reviewSession().phase==='cards','cards first');
let s=reviewSession();s.phase='quiz';
s.draft='wrong';checkReviewAnswer();expect(s.firstCorrect===0&&s.mistakes.length===1&&!s.checked,'wrong first');
s.draft=s.questions[0].answer;checkReviewAnswer();expect(s.checked&&s.firstCorrect===0,'retry inflates score');advanceReview();
checkReviewAnswer(true);advanceReview();
while(s.phase==='quiz'){s.draft=s.questions[s.index].answer;checkReviewAnswer();advanceReview()}
expect(s.firstCorrect===8,'score');expect(state.practice[0].pending.length===2,'pending');expect(state.practice[0].completedAt&&state.done[0],'completed');
startPractice('retry');s=reviewSession();while(s.phase==='quiz'){s.draft=s.questions[s.index].answer;checkReviewAnswer();advanceReview()}
expect(state.practice[0].pending.length===0,'retry resolves errors');expect(state.practice[0].score===8,'retry changes initial score');
startPractice();s=reviewSession();s.phase='quiz';s.weakCards=[s.cards[0]];
while(s.phase==='quiz'){s.draft=s.questions[s.index].answer;checkReviewAnswer();advanceReview()}
expect(state.practice[0].pending.length===1,'weak flashcard missing');
select(1);expect(scheduledQuestions('2099-01-01').length>0,'scheduled practice');
select(2);startPractice();s=reviewSession();s.phase='quiz';s.draft='in progress';savePractice();
expect(JSON.parse(localStorage.getItem(KEY)).practice[2].session.draft==='in progress','draft save');
let q=dailyQuestions(3)[0];
scheduleAnswer(q,true,'2026-09-28');expect(state.schedule[itemKey(q)].due==='2026-09-29'&&state.schedule[itemKey(q)].stage===1,'first interval');
scheduleAnswer(q,true,'2026-09-28');expect(state.schedule[itemKey(q)].stage===1,'same-day inflation');
scheduleAnswer(q,true,'2026-09-29');expect(state.schedule[itemKey(q)].due==='2026-10-02'&&state.schedule[itemKey(q)].stage===2,'second interval');
scheduleAnswer(q,false,'2026-10-02');expect(state.schedule[itemKey(q)].stage===0&&state.schedule[itemKey(q)].due==='2026-10-03','failure reset');
const payload=backupPayload();const restored=validateBackup(JSON.parse(JSON.stringify(payload)));
expect(restored.current===state.current&&restored.practice[0].completedAt,'backup roundtrip');
for(const bad of [{...payload,version:2},{...payload,data:{...state,current:999}},{...payload,data:{...state,done:{999:true}}},{...payload,data:{...state,schedule:{oops:{stage:99}}}}]){
 let rejected=false;try{validateBackup(bad)}catch{rejected=true}expect(rejected,'invalid backup accepted');
}
console.log('PASS: 105 contextual exercises, progress, scheduling intervals, same-day cap, failed-card reset, backup roundtrip and validation');
`,ctx);
