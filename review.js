// Daily practice stays on this device, alongside the existing lesson progress.
function dailyCards(day) {
    const d = days[day];
    const entries = [...lessonVocabulary(day), d.phrase.slice(0, 2), readingExtras[day].slice(0, 2)];
    return entries.filter(([word], i) => entries.findIndex(([other]) => other === word) === i)
        .map(([word, meaning], i) => ({ id: `${day}-card-${i}`, word, meaning }));
}
function blankWord(sentence, word) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`\\b${escaped}\\b`, 'i');
    return pattern.test(sentence) ? sentence.replace(pattern, '____') : null;
}
function dailyQuestions(day, round = 0) {
    const d = days[day], cards = [...lessonVocabulary(day), d.phrase.slice(0, 2), readingExtras[day].slice(0, 2)].map(([word, meaning]) => ({ word, meaning }));
    const make = (id, type, prompt, answer, explanation, item = answer) => ({ id: `${day}-${id}`, sourceDay: day, type, prompt, answer, explanation, item });
    const vocabulary = cards.slice(0, 5).map((card, i) => {
        const context = vocabularyContexts[card.word];
        const prompt = context && blankWord(context, card.word) || '____';
        return make(`word-${i}`, 'blank', `${prompt}\nGợi ý: ${card.meaning}`, card.word, `${context ? `${context} · ` : ''}${card.word}: ${card.meaning}.`);
    });
    const phrase = cards[5];
    const example = d.phrase[2];
    const phraseBlank = blankWord(example, phrase.word);
    const phraseTokens = phrase.word.match(/[A-Za-z]+/g) || [];
    const exampleTokens = example.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || [];
    const target = phraseBlank ? phrase.word : [...phraseTokens].reverse().map(word => exampleTokens.find(token => token.toLowerCase() === word.toLowerCase())).find(Boolean)
        || exampleTokens.find(token => token.toLowerCase().startsWith(phraseTokens[0]?.slice(0, 4).toLowerCase()) && token.length > 3)
        || exampleTokens.find(token => token.length > 4);
    const phraseAnswer = target || phrase.word;
    const phrasePrompt = `${phraseBlank || blankWord(example, phraseAnswer)}\nGợi ý: ${phrase.meaning}`;
    const extra = readingExtras[day];
    const questions = [...vocabulary,
        make('phrase', 'blank', phrasePrompt, phraseAnswer, `${example} · ${d.form}`, phrase.word),
        make('extra', 'blank', `${blankWord(extra[2], extra[0])}\nGợi ý: ${extra[1]}`, extra[0], `${extra[2]} · ${extra[0]}: ${extra[1]}. ${extra[3]}`),
        ...[cards[0], cards[5], cards[6]].map((card, i) => make(`listen-${i}`, 'listen', 'Nghe rồi viết lại từ hoặc cụm từ.', card.word, `${card.word}: ${card.meaning}.`)),
        grammarQuestion(day)];
    return questions.slice(round % questions.length).concat(questions.slice(0, round % questions.length));
}
function normalizeAnswer(text) {
    return text.normalize('NFKC').toLowerCase().trim().replace(/[’‘]/g, "'").replace(/[.,!?;:]+$/g, '').replace(/\s+/g, ' ');
}
function reviewState() { state.practice = state.practice || {}; return state.practice; }
function reviewSession() { return reviewState()[current]?.session; }
function oldQuestions() {
    return Object.entries(reviewState()).filter(([day]) => Number(day) < current).flatMap(([, record]) => record.pending || []).filter(q => !state.schedule?.[itemKey(q)]).slice(0, 5);
}
function savePractice() { persist(); }
function startPractice(mode = 'daily') {
    stopSpeech();
    const record = reviewState()[current] || (reviewState()[current] = {});
    delete record.contentUpdated;
    const questions = mode === 'cards' ? [] : mode === 'daily' || mode === 'yesterday' ? (current > 0 ? dailyQuestions(current - 1, record.round || 0) : []) : mode === 'old' ? oldQuestions() : mode === 'due' ? scheduledQuestions().slice(0, 10) : mode === 'retry' ? record.pending || [] : dailyQuestions(current, record.round || 0);
    if (!questions.length && !['daily', 'cards'].includes(mode)) return;
    record.session = { flowVersion: 3, mode, phase: ['daily', 'cards'].includes(mode) ? 'cards' : 'quiz', cards: dailyCards(current), cardIndex: 0, flipped: false, cardDirection: (current + (record.round || 0)) % 2, weakCards: [], questions, index: 0, firstCorrect: 0, mistakes: [], resolved: [], attempts: 0, feedback: '', checked: false, revealed: false, draft: '' };
    savePractice(); renderReview(true);
}
function reviewAudio(label = 'Nghe', slow = false) {
    return `<button type="button" class="speak" data-review-audio="${slow ? 'slow' : 'normal'}" aria-label="${label}" aria-pressed="false" ${!('speechSynthesis' in window) ? 'disabled' : ''}>${speakerIcon}<span>${label}</span></button>`;
}
function renderReview(focus = false) {
    const host = document.querySelector('#review'); if (!host) return;
    const record = reviewState()[current] || {};
    if (record.session && record.session.flowVersion !== 3) { delete record.session; record.contentUpdated = true; savePractice(); }
    const session = record.session;
    const reviewCount = session?.questions?.length && ['daily', 'yesterday'].includes(session.mode) ? session.questions.length : 11;
    const intro = `<h3 id="reviewTitle" tabindex="-1">Flashcard hôm nay · Ôn bài hôm trước</h3><p class="note">Ngày ${current + 1}: ${dailyCards(current).length} flashcard gồm đủ từ vựng, cụm từ và từ bổ sung.${current > 0 ? ` Sau đó ôn ${reviewCount} câu của ngày ${current}${reviewCount === 11 ? ', gồm cả ngữ pháp' : ''}.` : ' Đây là bài đầu tiên, chưa có bài hôm trước để ôn.'}</p>`;
    if (!session) {
        host.innerHTML = intro + (record.contentUpdated ? '<p class="note">Bộ từ của ngày này đã được cập nhật. Hãy bắt đầu lại lượt ôn đang dở.</p>' : '') + (record.completedAt ? `<p><strong>${masteryLabel(current)}</strong> · ${record.reviewedDay !== undefined ? `Ôn ngày ${record.reviewedDay + 1}: ${record.score}/${record.questionCount || 10} câu đúng lần đầu.` : 'Đã học xong flashcard.'}</p>` : '') + `<button class="btn primary" data-start="daily">${record.completedAt ? 'Học lại flashcard và ôn bài trước' : 'Bắt đầu flashcard hôm nay'}</button>` + '<button class="btn" data-start="cards">Chỉ học flashcard hôm nay</button>' + (current > 0 ? `<button class="btn" data-start="yesterday">Ôn bài ngày ${current}</button>` : '') + ((record.pending || []).length ? '<button class="btn" data-start="retry">Ôn lại câu sai / từ chưa nhớ</button>' : '') + (scheduledQuestions().length ? `<button class="btn" data-start="due">Ôn đến hạn · ${scheduledQuestions().length} mục</button>` : '') + (oldQuestions().length ? '<button class="btn" data-start="old">Ôn bài cũ</button>' : '');
    } else if (session.phase === 'cards') {
        const card = session.cards[session.cardIndex];
        host.innerHTML = intro + `<p class="review-step">Flashcard ${session.cardIndex + 1} / ${session.cards.length}</p>
            <div class="flashcard"><p class="review-step">${session.cardDirection ? 'Việt → Anh' : 'Anh → Việt'}</p><p class="flash-word" ${session.cardDirection ? '' : 'lang="en"'}>${escapeHtml(session.cardDirection ? card.meaning : card.word)}</p>
            ${session.flipped ? `<p class="flash-meaning" ${session.cardDirection ? 'lang="en"' : ''}>${escapeHtml(session.cardDirection ? card.word : card.meaning)}</p>${reviewAudio('Nghe từ')}` : '<p class="note">Thử nhớ mặt còn lại trước khi lật thẻ.</p>'}</div>
            <div class="tools">${session.flipped ? '<button class="btn" data-card="weak">Cần ôn lại</button><button class="btn primary" data-card="known">Đã nhớ</button>' : '<button class="btn primary" id="flipCard">Lật thẻ để xem nghĩa</button>'}</div>`;
    } else if (session.phase === 'quiz') {
        const q = session.questions[session.index];
        host.innerHTML = intro + `<p class="review-step">${['daily', 'yesterday'].includes(session.mode) ? `Ôn bài ngày ${current}` : session.mode === 'due' ? 'Ôn đến hạn' : session.mode === 'old' ? 'Ôn bài cũ' : session.mode === 'retry' ? 'Ôn lại câu sai' : 'Luyện tập'} · Câu ${session.index + 1} / ${session.questions.length} · ${q.type === 'listen' ? 'Nghe–viết' : 'Điền chỗ trống'}</p>
            <p class="question">${escapeHtml(q.prompt)}</p>
            ${q.type === 'listen' ? `<div class="tools">${reviewAudio('Nghe đề bài')}${reviewAudio('Nghe chậm', true)}</div><p class="note">${'speechSynthesis' in window ? 'Nếu không nghe được, xem gợi ý nghĩa để tiếp tục.' : 'Thiết bị không hỗ trợ giọng đọc. Dùng gợi ý nghĩa để luyện viết.'}</p><details><summary>Xem gợi ý nghĩa</summary><p>${escapeHtml(q.explanation.slice(q.explanation.indexOf(':') + 1))}</p></details>` : ''}
            <form id="answerForm"><label for="reviewAnswer">Câu trả lời của bạn</label><input id="reviewAnswer" name="answer" type="text" lang="en" autocomplete="off" autocapitalize="none" spellcheck="false" value="${escapeHtml(session.draft)}" ${session.checked ? 'disabled' : ''} aria-describedby="answerHint reviewFeedback"><p id="answerHint" class="note">Không phân biệt chữ hoa, chữ thường; bỏ qua dấu câu cuối câu.</p>
            <div id="reviewFeedback" role="status" aria-live="polite">${session.feedback ? `<p>${escapeHtml(session.feedback)}</p>` : ''}${session.checked ? `<p><strong>Đáp án: <span lang="en">${escapeHtml(q.answer)}</span></strong></p><p>${escapeHtml(q.explanation)}</p>` : ''}</div>
            <div class="tools">${session.checked ? `<button type="button" class="btn primary" id="nextQuestion">${session.index + 1 === session.questions.length ? 'Xem kết quả' : 'Câu tiếp theo →'}</button>` : '<button type="submit" class="btn primary">Kiểm tra</button><button type="button" class="btn" id="revealAnswer">Xem đáp án</button>'}</div></form>`;
    } else {
        const missed = session.mistakes.length;
        host.innerHTML = intro + `${session.questions.length ? `<p class="review-score">${session.firstCorrect}<span> / ${session.questions.length}</span></p><p>Câu đúng lần đầu · nội dung ngày ${session.questions[0].sourceDay + 1}.</p>` : '<p>✓ Đã xem hết flashcard của ngày hôm nay.</p>'}
            <p>${missed ? `${missed} câu cần ôn thêm. Bạn có thể luyện lại ngay bên dưới.` : session.questions.length ? 'Bạn đã trả lời đúng tất cả ngay lần đầu.' : 'Bạn có thể quay lại bộ thẻ bất cứ lúc nào.'}</p>
            ${session.weakCards.length ? `<p><strong>Flashcard cần nhớ:</strong> ${session.weakCards.map(c => escapeHtml(c.word)).join(', ')}</p>` : ''}
            ${missed ? '<details open><summary>Các câu cần ôn</summary><ul>' + session.mistakes.map(q => `<li><strong lang="en">${escapeHtml(q.answer)}</strong> — ${escapeHtml(q.explanation)}</li>`).join('') + '</ul></details>' : ''}
            <div class="tools">${((record.pending || []).length && session.mode !== 'due') ? '<button class="btn" data-start="retry">Ôn lại câu sai / từ chưa nhớ</button>' : ''}<button class="btn primary" id="finishReview">${session.mode === 'daily' ? 'Hoàn thành hôm nay' : 'Lưu kết quả ôn lại'}</button></div>`;
    }
    host.querySelectorAll('[data-start]').forEach(b => b.onclick = () => startPractice(b.dataset.start));
    host.querySelectorAll('[data-review-audio]').forEach(b => b.onclick = () => {
        const s = reviewSession(); const text = s.phase === 'cards' ? s.cards[s.cardIndex].word : s.questions[s.index].answer;
        say(text, b, b.dataset.reviewAudio === 'slow' ? .65 : undefined);
    });
    const flip = host.querySelector('#flipCard'); if (flip) flip.onclick = () => { session.flipped = true; savePractice(); renderReview(true); };
    host.querySelectorAll('[data-card]').forEach(b => b.onclick = () => {
        stopSpeech(); if (b.dataset.card === 'weak') session.weakCards.push(session.cards[session.cardIndex]);
        session.cardIndex++; session.flipped = false;
        if (session.cardIndex === session.cards.length) { if (session.questions.length) session.phase = 'quiz'; else completePractice(); }
        savePractice(); renderReview(true);
    });
    const input = host.querySelector('#reviewAnswer'); if (input) input.oninput = e => { session.draft = e.target.value; savePractice(); };
    const form = host.querySelector('#answerForm'); if (form) form.onsubmit = e => { e.preventDefault(); checkReviewAnswer(); };
    const reveal = host.querySelector('#revealAnswer'); if (reveal) reveal.onclick = () => checkReviewAnswer(true);
    const next = host.querySelector('#nextQuestion'); if (next) next.onclick = advanceReview;
    const finish = host.querySelector('#finishReview'); if (finish) finish.onclick = () => {
        stopSpeech(); delete record.session; savePractice(); renderReview(true);
    };
    if (focus) (host.querySelector('#reviewAnswer:not(:disabled)') || host.querySelector('#reviewTitle')).focus({ preventScroll: true });
}
function checkReviewAnswer(reveal = false) {
    const session = reviewSession(); if (!session || session.phase !== 'quiz' || session.checked) return;
    const q = session.questions[session.index];
    if (!reveal && !session.draft.trim()) { session.feedback = 'Bạn hãy nhập câu trả lời trước nhé.'; savePractice(); renderReview(true); return; }
    const correct = !reveal && normalizeAnswer(session.draft) === normalizeAnswer(q.answer);
    if (!session.attempts) {
        if (correct) session.firstCorrect++;
        else session.mistakes.push(q);
    }
    if (!session.attempts) scheduleAnswer(q, correct);
    session.attempts++;
    if (correct || reveal) {
        session.checked = true; session.revealed = reveal;
        if (correct) session.resolved.push(q.id);
        session.feedback = reveal ? 'Hãy đọc đáp án rồi thử nhớ lại ở lượt ôn sau.' : session.attempts === 1 ? 'Đúng rồi!' : 'Đúng rồi! Câu này vẫn được giữ trong lượt ôn lại.';
    } else session.feedback = 'Chưa đúng. Hãy thử lại; bạn cũng có thể xem đáp án để học tiếp.';
    savePractice(); renderReview(true);
}
function advanceReview() {
    const session = reviewSession(); if (!session || !session.checked) return;
    stopSpeech(); session.index++;
    if (session.index === session.questions.length) completePractice();
    else { session.attempts = 0; session.checked = false; session.revealed = false; session.feedback = ''; session.draft = ''; }
    savePractice(); renderReview(true);
}
function completePractice() {
    const record = reviewState()[current], session = record.session;
    session.phase = 'result';
    const weak = session.weakCards.map(card => ({ id: card.id, sourceDay: current, type: 'blank', prompt: `Nhớ lại từ / cụm từ: ${card.meaning} → ____`, answer: card.word, explanation: `${card.word}: ${card.meaning}.` }));
    if (['daily', 'cards', 'yesterday'].includes(session.mode)) {
        record.completedAt = new Date().toISOString(); record.score = session.firstCorrect; record.questionCount = session.questions.length;
        if (session.questions.length) record.reviewedDay = session.questions[0].sourceDay; record.round = (record.round || 0) + 1;
        state.done = state.done || {}; state.done[current] = true;
        document.querySelector('#done').textContent = '✓ Đã học';
        const retained = (record.pending || []).filter(q => !session.questions.some(item => item.id === q.id) && !session.cards.some(card => card.id === q.id));
        record.pending = [...retained, ...session.mistakes, ...weak];
        weak.forEach(q => scheduleAnswer(q, false));
    } else {
        // Remove only answers correct on the first attempt of this retry; errors remain due.
        const missed = new Set(session.mistakes.map(q => q.id));
        for (const q of session.questions) {
            if (!missed.has(q.id)) {
                for (const source of Object.values(reviewState())) source.pending = (source.pending || []).filter(item => item.id !== q.id);
            }
        }
    }
}
