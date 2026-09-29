const REVIEW_INTERVALS = [1, 3, 7, 14, 30];
function studyDate(now = new Date()) {
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}
function dateAfter(date, daysLater) {
    const [y, m, d] = date.split('-').map(Number);
    return studyDate(new Date(y, m - 1, d + daysLater, 12));
}
function itemKey(q) { return normalizeAnswer(q.item || q.answer); }
function scheduleAnswer(q, correct, today = studyDate()) {
    state.schedule = state.schedule || {};
    const key = itemKey(q), old = state.schedule[key];
    // Repeating the same item today cannot advance its interval more than once.
    const stage = correct ? (old?.lastDate === today ? old.stage : Math.min((old?.stage || 0) + 1, REVIEW_INTERVALS.length)) : 0;
    state.schedule[key] = { question: q, stage, lastDate: today, due: dateAfter(today, correct ? REVIEW_INTERVALS[Math.max(0, stage - 1)] : 1) };
}
function scheduledQuestions(today = studyDate()) {
    return Object.values(state.schedule || {}).filter(item => item.due <= today)
        .sort((a, b) => a.due.localeCompare(b.due) || a.stage - b.stage).map(item => item.question);
}
function seedSchedule() {
    state.schedule = state.schedule || {};
    for (const record of Object.values(state.practice || {})) {
        for (const q of record.pending || []) {
            const key = itemKey(q);
            if (!state.schedule[key]) state.schedule[key] = { question: q, stage: 0, due: studyDate(), lastDate: '' };
        }
    }
}
function masteryLabel(day) {
    const record = state.practice?.[day];
    if (!record?.completedAt) return state.done?.[day] ? 'Đã học · Chưa ôn tập' : 'Chưa học';
    const mastered = !(record.pending || []).length && dailyCards(day).every(card => (state.schedule?.[normalizeAnswer(card.word)]?.stage || 0) >= 2);
    return mastered ? '✓ Đã nắm vững' : 'Đã ôn · Cần củng cố';
}
function backupPayload() { return { app: 'english-every-day', version: 1, exportedAt: new Date().toISOString(), data: state }; }
function downloadBackup(payload = backupPayload()) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = `english-progress-${studyDate()}.json`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function validateBackup(payload) {
    const fail = () => { throw new Error('Tệp không phải bản sao lưu hợp lệ của English mỗi ngày.'); };
    if (!payload || payload.app !== 'english-every-day' || payload.version !== 1) fail();
    const data = payload.data;
    const object = value => value && typeof value === 'object' && !Array.isArray(value);
    const day = value => Number.isInteger(Number(value)) && Number(value) >= 0 && Number(value) < days.length;
    const text = value => typeof value === 'string' && value.length <= 5000;
    const question = q => object(q) && text(q.id) && day(q.sourceDay) && ['blank', 'listen'].includes(q.type) && text(q.prompt) && text(q.answer) && q.answer.trim() && text(q.explanation) && (q.item === undefined || text(q.item));
    const questions = qs => Array.isArray(qs) && qs.length <= 100 && qs.every(question);
    const card = c => object(c) && text(c.id) && text(c.word) && text(c.meaning);
    const date = d => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d));
    if (!object(data) || (data.current !== undefined && !day(data.current))) fail();
    // Reject prototype keys at any depth before this object can enter application state.
    function inspect(value, depth = 0) {
        if (depth > 15) fail();
        if (value && typeof value === 'object') for (const [key, child] of Object.entries(value)) {
            if (['__proto__', 'constructor', 'prototype'].includes(key)) fail(); inspect(child, depth + 1);
        }
    }
    inspect(data);
    if (data.done !== undefined && (!object(data.done) || Object.entries(data.done).some(([k, v]) => !day(k) || typeof v !== 'boolean'))) fail();
    if (data.rate !== undefined && (typeof data.rate !== 'number' || data.rate < .65 || data.rate > 1.1)) fail();
    if (data.voice !== undefined && data.voice !== null && !text(data.voice)) fail();
    if (data.writing !== undefined && (!object(data.writing) || Object.entries(data.writing).some(([k, v]) => !day(k) || typeof v !== 'string' || v.length > 2000))) fail();
    if (data.practice !== undefined) {
        if (!object(data.practice)) fail();
        for (const [key, r] of Object.entries(data.practice)) {
            if (!day(key) || !object(r) || (r.pending !== undefined && !questions(r.pending))) fail();
            if (r.completedAt !== undefined && (!text(r.completedAt) || Number.isNaN(Date.parse(r.completedAt)))) fail();
            if (r.score !== undefined && (!Number.isInteger(r.score) || r.score < 0 || r.score > 11)) fail();
            if (r.questionCount !== undefined && (!Number.isInteger(r.questionCount) || r.questionCount < 0 || r.questionCount > 11)) fail();
            if (r.round !== undefined && (!Number.isInteger(r.round) || r.round < 0 || r.round > 100000)) fail();
            if (r.session) {
                const s = r.session;
                if (!['daily', 'retry', 'old', 'due', 'cards', 'yesterday'].includes(s.mode) || !['cards', 'quiz', 'result'].includes(s.phase) || !questions(s.questions) || !questions(s.mistakes) || !Array.isArray(s.cards) || (s.cards.length < 7 || s.cards.length > 20) || !s.cards.every(card) || !Array.isArray(s.weakCards) || s.weakCards.length > s.cards.length || !s.weakCards.every(card)) fail();
                if (!Number.isInteger(s.index) || s.index < 0 || s.index > s.questions.length || (s.phase === 'quiz' && s.index === s.questions.length) || !Number.isInteger(s.cardIndex) || s.cardIndex < 0 || s.cardIndex > s.cards.length || (s.phase === 'cards' && s.cardIndex === s.cards.length)) fail();
                if (!text(s.draft) || !text(s.feedback) || !Number.isInteger(s.firstCorrect) || s.firstCorrect < 0 || s.firstCorrect > s.questions.length || !Number.isInteger(s.attempts) || s.attempts < 0 || !Array.isArray(s.resolved) || !s.resolved.every(text)) fail();
                if (![s.flipped, s.checked, s.revealed].every(v => typeof v === 'boolean')) fail();
            }
        }
    }
    if (data.schedule !== undefined) {
        if (!object(data.schedule) || Object.keys(data.schedule).length > 5000) fail();
        for (const [key, item] of Object.entries(data.schedule)) {
            if (!object(item) || !question(item.question) || key !== itemKey(item.question) || !Number.isInteger(item.stage) || item.stage < 0 || item.stage > 5 || !date(item.due) || (item.lastDate !== '' && !date(item.lastDate))) fail();
        }
    }
    return JSON.parse(JSON.stringify(data));
}
let pendingRestore = null, undoRestore = null;
function renderStudyTools() {
    const host = document.querySelector('#studyTools'); if (!host) return;
    seedSchedule();
    const due = scheduledQuestions().length;
    const next = Object.values(state.schedule).map(x => x.due).sort()[0];
    host.innerHTML = `<p><strong>${due ? `${due} từ / cụm từ đến hạn ôn` : 'Chưa có từ đến hạn ôn'}</strong>${!due && next ? ` · Lịch tiếp theo: ${escapeHtml(next)}` : ''}</p><p class="note">Ôn cách quãng: 1 → 3 → 7 → 14 → 30 ngày. Trả lời sai: ôn lại ngày mai. Luyện lại trong cùng ngày không tăng bậc ghi nhớ.</p><details ${undoRestore ? 'open' : ''}><summary>Sao lưu và khôi phục tiến độ</summary><p class="note">Tải bản sao lưu để chuyển thiết bị hoặc giữ lại dữ liệu. Khôi phục sẽ thay thế tiến độ hiện tại; bạn có thể hoàn tác ngay tại đây.</p><div class="tools"><button class="btn" id="exportProgress">Tải bản sao lưu</button><label class="btn">Chọn tệp khôi phục<input id="importProgress" type="file" accept="application/json,.json"></label></div><p id="backupStatus" role="status"></p><div id="restorePreview"></div>${undoRestore ? '<button class="btn" id="undoRestore">Hoàn tác khôi phục</button>' : ''}</details>`;
    host.querySelector('#exportProgress').onclick = () => downloadBackup();
    host.querySelector('#importProgress').onchange = async e => {
        pendingRestore = null; host.querySelector('#restorePreview').innerHTML = '';
        try {
            const file = e.target.files[0]; if (!file) return;
            if (file.size > 5 * 1024 * 1024) throw new Error('Tệp quá lớn. Hãy chọn bản sao lưu dưới 5 MB.');
            const candidate = validateBackup(JSON.parse(await file.text())); pendingRestore = candidate;
            host.querySelector('#backupStatus').textContent = `Bản sao lưu: ${Object.values(candidate.done || {}).filter(Boolean).length} ngày đã học, ${Object.values(candidate.practice || {}).filter(r => r.completedAt).length} ngày đã ôn.`;
            host.querySelector('#restorePreview').innerHTML = '<button class="btn" id="confirmRestore">Thay thế tiến độ bằng bản sao lưu này</button><button class="btn" id="cancelRestore">Hủy</button>';
            host.querySelector('#confirmRestore').onclick = () => {
                try {
                    const previous = JSON.stringify(state);
                    localStorage.setItem(KEY, JSON.stringify(pendingRestore));
                    undoRestore = previous; state = pendingRestore; pendingRestore = null;
                    current = Number(state.current) || 0; stopSpeech(); render(); refreshVoices(); renderStudyTools();
                    document.querySelector('#rate').value = state.rate || .8;
                    document.querySelector('#rateLabel').textContent = Number(document.querySelector('#rate').value).toFixed(2) + '×';
                } catch { host.querySelector('#backupStatus').textContent = 'Không thể lưu. Tiến độ hiện tại chưa bị thay thế.'; }
            };
            host.querySelector('#cancelRestore').onclick = () => { pendingRestore = null; host.querySelector('#restorePreview').innerHTML = ''; host.querySelector('#backupStatus').textContent = 'Đã hủy khôi phục.'; };
        } catch (error) { host.querySelector('#backupStatus').textContent = error instanceof SyntaxError ? 'Tệp JSON bị lỗi. Tiến độ hiện tại vẫn được giữ nguyên.' : error.message; }
    };
    const undo = host.querySelector('#undoRestore'); if (undo) undo.onclick = () => {
        try { localStorage.setItem(KEY, undoRestore); state = JSON.parse(undoRestore); undoRestore = null; current = Number(state.current) || 0; render(); refreshVoices(); renderStudyTools(); }
        catch { host.querySelector('#backupStatus').textContent = 'Không thể hoàn tác. Hãy thử lại.'; }
    };
}
