// Daily practice stays on this device, alongside the existing lesson progress.
function dailyCards(day) {
    const d = days[day];
    const words = Array.from({ length: 5 }, (_, j) => d.unit.words[(d.di * 2 + j) % d.unit.words.length].split('=').map(s => s.trim()));
    return [...words, d.phrase.slice(0, 2), readingExtras[d.week].slice(0, 2)].map(([word, meaning], i) => ({ id: `${day}-card-${i}`, word, meaning }));
}
function dailyQuestions(day) {
    const d = days[day], cards = dailyCards(day);
    const make = (id, type, prompt, answer, explanation) => ({ id: `${day}-${id}`, sourceDay: day, type, prompt, answer, explanation });
    const vocabulary = cards.slice(0, 5).map((card, i) => make(`word-${i}`, 'blank', `Điền từ đã học: ${card.meaning} → ____`, card.word, `${card.word}: ${card.meaning}.`));
    // The exact inflected word from the lesson sentence is the answer, not its dictionary form.
    const tokens = d.sentence.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g);
    const answer = tokens[tokens.length - 1];
    const at = d.sentence.lastIndexOf(answer);
    const sentence = d.sentence.slice(0, at) + '____' + d.sentence.slice(at + answer.length);
    const extra = readingExtras[d.week];
    return [...vocabulary,
        make('sentence', 'blank', `${sentence}\nGợi ý: ${translations[d.week][d.di]}`, answer, `${d.sentence} · ${d.form}`),
        make('extra', 'blank', extra[2].replace(new RegExp(`\\b${extra[0]}\\b`, 'i'), '____') + `\nGợi ý: ${extra[1]}`, extra[0], `${extra[0]}: ${extra[1]}. ${extra[3]}`),
        ...[cards[0], cards[5], cards[6]].map((card, i) => make(`listen-${i}`, 'listen', 'Nghe rồi viết lại từ hoặc cụm từ.', card.word, `${card.word}: ${card.meaning}.`))];
}
function normalizeAnswer(text) {
    return text.normalize('NFKC').toLowerCase().trim().replace(/[’‘]/g, "'").replace(/[.,!?;:]+$/g, '').replace(/\s+/g, ' ');
}
function reviewState() { state.practice = state.practice || {}; return state.practice; }
function reviewSession() { return reviewState()[current]?.session; }
function oldQuestions() {
    return Object.entries(reviewState()).filter(([day]) => Number(day) < current).flatMap(([, record]) => record.pending || []).slice(0, 5);
}
function savePractice() { persist(); }
function startPractice(mode = 'daily') {
    stopSpeech();
    const record = reviewState()[current] || (reviewState()[current] = {});
    const questions = mode === 'old' ? oldQuestions() : mode === 'retry' ? record.pending || [] : dailyQuestions(current);
    if (!questions.length) return;
    record.session = { mode, phase: mode === 'daily' ? 'cards' : 'quiz', cards: dailyCards(current), cardIndex: 0, flipped: false, weakCards: [], questions, index: 0, firstCorrect: 0, mistakes: [], resolved: [], attempts: 0, feedback: '', checked: false, revealed: false, draft: '' };
    savePractice(); renderReview(true);
}
function reviewAudio(label = 'Nghe', slow = false) {
    return `<button type="button" class="speak" data-review-audio="${slow ? 'slow' : 'normal'}" aria-label="${label}" aria-pressed="false" ${!('speechSynthesis' in window) ? 'disabled' : ''}>${speakerIcon}<span>${label}</span></button>`;
}
function renderReview(focus = false) {
    const host = document.querySelector('#review'); if (!host) return;
    const record = reviewState()[current] || {}, session = record.session;
    const intro = `<h3 id="reviewTitle" tabindex="-1">Ôn tập ngày hôm nay</h3><p class="note">7 flashcard · 10 câu luyện tập · khoảng 5–10 phút. Tiến độ được lưu trên trình duyệt này.</p>`;
    if (!session) {
        host.innerHTML = intro + (record.completedAt ? `<p>✓ Đã ôn tập · Kết quả gần nhất: <strong>${record.score}/10</strong> câu đúng lần đầu.</p>` : '') + `<button class="btn primary" data-start="daily">${record.completedAt ? 'Ôn lại từ đầu' : 'Bắt đầu ôn tập'}</button>` + ((record.pending || []).length ? '<button class="btn" data-start="retry">Ôn lại câu sai / từ chưa nhớ</button>' : '') + (oldQuestions().length ? '<button class="btn" data-start="old">Ôn bài cũ · tối đa 5 câu cần nhớ</button>' : '');
    } else if (session.phase === 'cards') {
        const card = session.cards[session.cardIndex];
        host.innerHTML = intro + `<p class="review-step">Flashcard ${session.cardIndex + 1} / ${session.cards.length}</p>
            <div class="flashcard"><p lang="en" class="flash-word">${escapeHtml(card.word)}</p>${reviewAudio('Nghe từ')}
            ${session.flipped ? `<p class="flash-meaning">${escapeHtml(card.meaning)}</p>` : '<p class="note">Thử nhớ nghĩa trước khi lật thẻ.</p>'}</div>
            <div class="tools">${session.flipped ? '<button class="btn" data-card="weak">Cần ôn lại</button><button class="btn primary" data-card="known">Đã nhớ</button>' : '<button class="btn primary" id="flipCard">Lật thẻ để xem nghĩa</button>'}</div>`;
    } else if (session.phase === 'quiz') {
        const q = session.questions[session.index];
        host.innerHTML = intro + `<p class="review-step">${session.mode === 'old' ? 'Ôn bài cũ' : session.mode === 'retry' ? 'Ôn lại câu sai' : 'Luyện tập'} · Câu ${session.index + 1} / ${session.questions.length} · ${q.type === 'listen' ? 'Nghe–viết' : 'Điền chỗ trống'}</p>
            <p class="question">${escapeHtml(q.prompt)}</p>
            ${q.type === 'listen' ? `<div class="tools">${reviewAudio('Nghe đề bài')}${reviewAudio('Nghe chậm', true)}</div><p class="note">${'speechSynthesis' in window ? 'Nếu không nghe được, xem gợi ý nghĩa để tiếp tục.' : 'Thiết bị không hỗ trợ giọng đọc. Dùng gợi ý nghĩa để luyện viết.'}</p><details><summary>Xem gợi ý nghĩa</summary><p>${escapeHtml(q.explanation.slice(q.explanation.indexOf(':') + 1))}</p></details>` : ''}
            <form id="answerForm"><label for="reviewAnswer">Câu trả lời của bạn</label><input id="reviewAnswer" name="answer" type="text" lang="en" autocomplete="off" autocapitalize="none" spellcheck="false" value="${escapeHtml(session.draft)}" ${session.checked ? 'disabled' : ''} aria-describedby="answerHint reviewFeedback"><p id="answerHint" class="note">Không phân biệt chữ hoa, chữ thường; bỏ qua dấu câu cuối câu.</p>
            <div id="reviewFeedback" role="status" aria-live="polite">${session.feedback ? `<p>${escapeHtml(session.feedback)}</p>` : ''}${session.checked ? `<p><strong>Đáp án: <span lang="en">${escapeHtml(q.answer)}</span></strong></p><p>${escapeHtml(q.explanation)}</p>` : ''}</div>
            <div class="tools">${session.checked ? `<button type="button" class="btn primary" id="nextQuestion">${session.index + 1 === session.questions.length ? 'Xem kết quả' : 'Câu tiếp theo →'}</button>` : '<button type="submit" class="btn primary">Kiểm tra</button><button type="button" class="btn" id="revealAnswer">Xem đáp án</button>'}</div></form>`;
    } else {
        const missed = session.mistakes.length;
        host.innerHTML = intro + `<p class="review-score">${session.firstCorrect}<span> / ${session.questions.length}</span></p><p>Câu đúng ngay lần đầu${session.mode === 'daily' ? ' trong lượt này' : ' trong lượt ôn lại'}.</p>
            <p>${missed ? `${missed} câu cần ôn thêm. Bạn có thể luyện lại ngay bên dưới.` : 'Bạn đã trả lời đúng tất cả ngay lần đầu.'}</p>
            ${session.weakCards.length ? `<p><strong>Flashcard cần nhớ:</strong> ${session.weakCards.map(c => escapeHtml(c.word)).join(', ')}</p>` : ''}
            ${missed ? '<details open><summary>Các câu cần ôn</summary><ul>' + session.mistakes.map(q => `<li><strong lang="en">${escapeHtml(q.answer)}</strong> — ${escapeHtml(q.explanation)}</li>`).join('') + '</ul></details>' : ''}
            <div class="tools">${(session.mode === 'old' ? oldQuestions().length : (record.pending || []).length) ? `<button class="btn" data-start="${session.mode === 'old' ? 'old' : 'retry'}">Ôn lại câu sai / từ chưa nhớ</button>` : ''}<button class="btn primary" id="finishReview">${session.mode === 'daily' ? 'Hoàn thành hôm nay' : 'Lưu kết quả ôn lại'}</button></div>`;
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
        if (session.cardIndex === session.cards.length) session.phase = 'quiz';
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
    if (session.mode === 'daily') {
        record.completedAt = new Date().toISOString(); record.score = session.firstCorrect;
        state.done = state.done || {}; state.done[current] = true;
        document.querySelector('#done').textContent = '✓ Đã học';
        record.pending = [...session.mistakes, ...weak];
    } else {
        // Remove only answers correct on the first attempt of this retry; errors remain due.
        const missed = new Set(session.mistakes.map(q => q.id));
        for (const q of session.questions) {
            if (!missed.has(q.id)) {
                const source = reviewState()[q.sourceDay];
                if (source) source.pending = (source.pending || []).filter(item => item.id !== q.id);
            }
        }
    }
}
