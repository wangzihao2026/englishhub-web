/* ============ 数据层 + 艾宾浩斯记忆引擎 ============ */
window.Store = (function () {
  const KEY = 'englishhub_db_v1';
  // 艾宾浩斯复习间隔（天）：第1次复习后隔1天，之后 2/4/7/15/30 天
  const INTERVALS = [1, 2, 4, 7, 15, 30];
  const MAX_STAGE = 6; // stage 达到 6 视为已掌握

  // ---------- 日期工具 ----------
  function todayStr(d) {
    const t = d || new Date();
    const m = t.getMonth() + 1, day = t.getDate();
    return t.getFullYear() + '-' + String(m).padStart(2, '0') + '-' + String(day).padStart(2, '0');
  }
  function toDate(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
  function dateAdd(s, days) { const t = toDate(s); t.setDate(t.getDate() + days); return todayStr(t); }
  function daysBetween(a, b) { return Math.round((toDate(b) - toDate(a)) / 86400000); }

  // ---------- 数据库 ----------
  let db = null;
  function defaults() {
    return {
      version: 1,
      role: 'student',
      profile: { name: '学习者' },
      goals: JSON.parse(JSON.stringify(Seed.defaults.goals)),
      wordbooks: JSON.parse(JSON.stringify(Seed.books)),
      readings: JSON.parse(JSON.stringify(Seed.readings)),
      quizzes: JSON.parse(JSON.stringify(Seed.quizzes)),
      grammar: JSON.parse(JSON.stringify(Seed.grammar)),
      writings: JSON.parse(JSON.stringify(Seed.writings)),
      enrollments: [{ bookId: 'b6', date: todayStr() }, { bookId: 'b7', date: todayStr() }, { bookId: 'b8', date: todayStr() }, { bookId: 'b1', date: todayStr() }],
      srs: {},            // wordId -> { bookId, stage, learnDate, lastDate, nextDate, times, history:[] }
      attempts: [],       // { id, quizId, date, total, correct }
      wrongbook: [],      // { key, quizId, questionId, date, times, resolved }
      readingProgress: [],// { readingId, date }
      grammarProgress: {},// lessonId -> { best: 0..100, done, lastDate }
      writingProgress: {},// lessonId -> { done, lastDate, draft }
      checkins: {},       // 'YYYY-MM-DD' -> true
      activity: {}        // 'YYYY-MM-DD' -> { learned, reviewed, quiz, read, grammar, write }
    };
  }
  // 按 id 合并新增的种子内容，老用户打开时自动获得新词库/阅读/测验
  function syncSeed() {
    const merge = (list, seeds) => {
      seeds.forEach(s => { if (!list.find(x => x.id === s.id)) list.push(JSON.parse(JSON.stringify(s))); });
    };
    merge(db.wordbooks, Seed.books);
    merge(db.readings, Seed.readings);
    merge(db.quizzes, Seed.quizzes);
    merge(db.grammar, Seed.grammar);
    merge(db.writings, Seed.writings);
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      db = raw ? JSON.parse(raw) : defaults();
      // 保证关键字段存在
      const def = defaults();
      for (const k in def) if (db[k] === undefined) db[k] = def[k];
      if (!db.wordbooks.find(b => b.id === 'vocab')) {
        db.wordbooks.push({ id: 'vocab', name: '我的生词本', desc: '阅读中收藏的生词', level: '自定义', vocab: true, words: [] });
      }
      syncSeed();
      save();
    } catch (e) { db = defaults(); }
    return db;
  }
  let afterSaveHook = null;
  function save() {
    localStorage.setItem(KEY, JSON.stringify(db));
    if (typeof afterSaveHook === 'function') { try { afterSaveHook(); } catch (e) { } }
  }

  // ---------- 词库 / 单词 ----------
  const bookById = id => db.wordbooks.find(b => b.id === id);
  function allWords() {
    const out = [];
    db.wordbooks.forEach(b => b.words.forEach(w => out.push(Object.assign({ bookId: b.id }, w))));
    return out;
  }
  const wordById = id => allWords().find(w => w.id === id);
  function dictLookup(word) {
    const low = word.toLowerCase();
    // 先查词库
    const inBook = allWords().find(w => w.word.toLowerCase() === low);
    if (inBook) return { meaning: inBook.meaning, phonetic: inBook.phonetic || '', fromBook: inBook.bookId, wordId: inBook.id };
    if (Seed.dict[low]) return { meaning: Seed.dict[low], phonetic: '', fromBook: null, wordId: null };
    return null;
  }

  // ---------- 报名词库 ----------
  const isEnrolled = bid => db.enrollments.some(e => e.bookId === bid);
  function enroll(bid) {
    if (!isEnrolled(bid)) { db.enrollments.push({ bookId: bid, date: todayStr() }); save(); }
  }

  // ---------- 艾宾浩斯 ----------
  function srsOf(wordId) { return db.srs[wordId] || null; }
  function learnWord(wordId, bookId, remembered) {
    const today = todayStr();
    db.srs[wordId] = {
      bookId, stage: remembered ? 1 : 0, learnDate: today, lastDate: today,
      nextDate: dateAdd(today, remembered ? INTERVALS[1] : INTERVALS[0]),
      times: 1, history: [{ date: today, correct: !!remembered }]
    };
    bumpActivity('learned', 1);
    save();
  }
  function reviewWord(wordId, remembered) {
    const rec = db.srs[wordId];
    if (!rec) return;
    const today = todayStr();
    rec.lastDate = today; rec.times++;
    rec.history.push({ date: today, correct: !!remembered });
    if (remembered) {
      rec.stage = Math.min(rec.stage + 1, MAX_STAGE);
      rec.nextDate = rec.stage >= MAX_STAGE ? null : dateAdd(today, INTERVALS[rec.stage]);
    } else {
      rec.stage = 0;
      rec.nextDate = dateAdd(today, INTERVALS[0]);
    }
    bumpActivity('reviewed', 1);
    save();
  }
  function dueWords() {
    const today = todayStr();
    return Object.keys(db.srs)
      .filter(id => { const r = db.srs[id]; return r.nextDate && r.nextDate <= today; })
      .map(id => Object.assign({ rec: db.srs[id] }, wordById(id)))
      .filter(w => w.word)
      .sort((a, b) => (a.rec.nextDate < b.rec.nextDate ? -1 : 1));
  }
  function newWordsPool(limit) {
    const enrolledIds = db.enrollments.map(e => e.bookId);
    const pool = [];
    enrolledIds.forEach(bid => {
      const b = bookById(bid); if (!b) return;
      b.words.forEach(w => { if (!db.srs[w.id]) pool.push(Object.assign({ bookId: bid }, w)); });
    });
    return limit ? pool.slice(0, limit) : pool;
  }
  const bookProgress = bid => {
    const b = bookById(bid); if (!b) return { total: 0, learned: 0, mastered: 0, due: 0 };
    const today = todayStr();
    let learned = 0, mastered = 0, due = 0;
    b.words.forEach(w => {
      const r = db.srs[w.id];
      if (r) { learned++; if (!r.nextDate || r.stage >= MAX_STAGE) mastered++; else if (r.nextDate <= today) due++; }
    });
    return { total: b.words.length, learned, mastered, due };
  };

  // ---------- 测验 / 错题集 ----------
  function recordAttempt(quizId, total, correct, wrongQuestionIds) {
    db.attempts.push({ id: 'a' + Date.now(), quizId, date: todayStr(), total, correct });
    const today = todayStr();
    (wrongQuestionIds || []).forEach(qid => {
      const key = quizId + '#' + qid;
      const exist = db.wrongbook.find(w => w.key === key);
      if (exist) { exist.times++; exist.date = today; exist.resolved = false; }
      else db.wrongbook.push({ key, quizId, questionId: qid, date: today, times: 1, resolved: false });
    });
    // 答对的题自动移出错题本（针对重练）
    const wrongSet = new Set((wrongQuestionIds || []).map(qid => quizId + '#' + qid));
    db.wrongbook.forEach(w => {
      if (w.quizId === quizId && !wrongSet.has(w.key) && !w.resolved) w.resolved = true;
    });
    bumpActivity('quiz', 1);
    save();
  }
  function recordPractice(quizId, questionId, correct) {
    const key = quizId + '#' + questionId;
    const w = db.wrongbook.find(x => x.key === key);
    if (w && correct) w.resolved = true;
    if (w && !correct) { w.times++; w.date = todayStr(); }
    bumpActivity('quiz', 1);
    save();
  }
  function questionById(quizId, qid) {
    const quiz = db.quizzes.find(q => q.id === quizId);
    return quiz ? quiz.questions.find(x => x.id === qid) : null;
  }

  // ---------- 阅读 ----------
  function finishReading(readingId) {
    const today = todayStr();
    if (!db.readingProgress.find(p => p.readingId === readingId && p.date === today)) {
      db.readingProgress.push({ readingId, date: today });
      bumpActivity('read', 1);
      save();
    }
  }
  const hasRead = rid => db.readingProgress.some(p => p.readingId === rid);

  // ---------- 生词本 ----------
  function addToVocab(word) {
    let book = bookById('vocab');
    const exist = book.words.find(w => w.word.toLowerCase() === word.toLowerCase());
    if (exist) return false;
    const d = dictLookup(word);
    const w = {
      id: 'v' + Date.now(), word,
      phonetic: (d && d.phonetic) || '',
      meaning: (d && d.meaning) || '（待补充释义）',
      example: ''
    };
    book.words.push(w);
    enroll('vocab');
    // 直接进入艾宾浩斯流程
    if (!db.srs[w.id]) {
      const today = todayStr();
      db.srs[w.id] = { bookId: 'vocab', stage: 0, learnDate: today, lastDate: today, nextDate: dateAdd(today, 1), times: 0, history: [] };
    }
    save();
    return true;
  }

  // ---------- 语法 / 作文 ----------
  function grammarById(id) { return db.grammar.find(g => g.id === id); }
  function writingById(id) { return db.writings.find(w => w.id === id); }
  // 练习提交后记录最高正确率；pct>=60 视为完成该课
  function markGrammar(id, pct) {
    const today = todayStr();
    const p = db.grammarProgress[id] || (db.grammarProgress[id] = { best: 0, done: false, lastDate: today });
    p.lastDate = today;
    p.best = Math.max(p.best || 0, pct);
    if (pct >= 60 && !p.done) { p.done = true; bumpActivity('grammar', 1); }
    save();
  }
  // patch: { done: true } 或 { draft: '文本' }
  function markWriting(id, patch) {
    const today = todayStr();
    const p = db.writingProgress[id] || (db.writingProgress[id] = { done: false, lastDate: today, draft: '' });
    if (patch.draft !== undefined) p.draft = patch.draft;
    if (patch.done && !p.done) {
      p.done = true;
      p.lastDate = today;
      bumpActivity('write', 1);
    } else {
      p.lastDate = today;
    }
    save();
  }

  // ---------- 打卡 / 活跃度 ----------
  function bumpActivity(field, n) {
    const t = todayStr();
    const a = db.activity[t] || (db.activity[t] = { learned: 0, reviewed: 0, quiz: 0, read: 0, grammar: 0, write: 0 });
    a[field] = (a[field] || 0) + n;
  }
  function todayActivity() { return db.activity[todayStr()] || { learned: 0, reviewed: 0, quiz: 0, read: 0, grammar: 0, write: 0 }; }
  function checkin() {
    db.checkins[todayStr()] = true;
    save();
  }
  const checkedToday = () => !!db.checkins[todayStr()];
  function streak() {
    let n = 0;
    let d = todayStr();
    if (!db.checkins[d]) d = dateAdd(d, -1); // 今天还没打卡则从昨天数
    while (db.checkins[d]) { n++; d = dateAdd(d, -1); }
    return n;
  }
  function heatData(days) {
    // 最近 N 天活跃度 -> 强度 0..4
    const out = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = dateAdd(todayStr(), -i);
      const a = db.activity[d] || {};
      const v = (a.learned || 0) + (a.reviewed || 0) + (a.quiz || 0) * 3 + (a.read || 0) * 3 + (a.grammar || 0) * 3 + (a.write || 0) * 3;
      const lv = v === 0 ? 0 : v < 5 ? 1 : v < 12 ? 2 : v < 25 ? 3 : 4;
      out.push({ date: d, level: lv });
    }
    return out;
  }

  // ---------- 统计 ----------
  function stats() {
    const srsKeys = Object.keys(db.srs);
    const mastered = srsKeys.filter(id => !db.srs[id].nextDate || db.srs[id].stage >= MAX_STAGE).length;
    const attempts = db.attempts;
    const totalQ = attempts.reduce((s, a) => s + a.total, 0);
    const totalC = attempts.reduce((s, a) => s + a.correct, 0);
    return {
      learned: srsKeys.length,
      mastered,
      due: dueWords().length,
      accuracy: totalQ ? Math.round(totalC / totalQ * 100) : null,
      wrongCount: db.wrongbook.filter(w => !w.resolved).length,
      streak: streak(),
      checkinTotal: Object.keys(db.checkins).length
    };
  }

  // ---------- 老师端 ----------
  function addBook(name, desc, level) {
    const id = 'tb' + Date.now();
    db.wordbooks.push({ id, name, desc, level: level || '自定义', words: [] });
    save(); return id;
  }
  function deleteBook(id) {
    if (id === 'vocab') return;
    db.wordbooks = db.wordbooks.filter(b => b.id !== id);
    db.enrollments = db.enrollments.filter(e => e.bookId !== id);
    save();
  }
  function addWords(bookId, lines) {
    const b = bookById(bookId); if (!b) return 0;
    let n = 0;
    lines.split('\n').forEach(line => {
      const t = line.trim(); if (!t) return;
      const parts = t.split('|').map(s => s.trim());
      if (!parts[0]) return;
      b.words.push({
        id: 'tw' + Date.now() + n, word: parts[0],
        phonetic: parts[1] || '', meaning: parts[2] || '（待补充释义）', example: parts[3] || ''
      });
      n++;
    });
    save(); return n;
  }
  function deleteWord(bookId, wordId) {
    const b = bookById(bookId); if (!b) return;
    b.words = b.words.filter(w => w.id !== wordId);
    delete db.srs[wordId];
    save();
  }
  function addQuiz(title, desc, questions) {
    const id = 'tq' + Date.now();
    db.quizzes.push({ id, title, desc, questions });
    save(); return id;
  }
  function deleteQuiz(id) { db.quizzes = db.quizzes.filter(q => q.id !== id); save(); }
  function addReading(title, level, paras) {
    const id = 'tr' + Date.now();
    db.readings.push({ id, title, level, desc: '', date: todayStr(), text: paras });
    save(); return id;
  }
  function deleteReading(id) { db.readings = db.readings.filter(r => r.id !== id); save(); }
  function addGrammar(obj) {
    const id = 'tg' + Date.now();
    db.grammar.push(Object.assign({ id }, obj));
    save(); return id;
  }
  function deleteGrammar(id) { db.grammar = db.grammar.filter(g => g.id !== id); delete db.grammarProgress[id]; save(); }
  function addWriting(obj) {
    const id = 'tw' + Date.now();
    db.writings.push(Object.assign({ id }, obj));
    save(); return id;
  }
  function deleteWriting(id) { db.writings = db.writings.filter(w => w.id !== id); delete db.writingProgress[id]; save(); }

  // ---------- 角色 / 目标 ----------
  function setRole(r) { db.role = r; save(); }
  function setGoal(key, val) { db.goals[key] = val; save(); }

  // ---------- 导出 / 导入备份 ----------
  function exportData() { return JSON.stringify(db, null, 2); }
  function importData(json) {
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.wordbooks)) {
      throw new Error('备份文件格式不正确');
    }
    db = parsed;
    save();
  }

  load();
  return {
    get db() { return db; },
    get _afterSave() { return afterSaveHook; },
    set _afterSave(fn) { afterSaveHook = fn; },
    save, todayStr, dateAdd, daysBetween,
    bookById, allWords, wordById, dictLookup, enroll, isEnrolled,
    srsOf, learnWord, reviewWord, dueWords, newWordsPool, bookProgress,
    recordAttempt, recordPractice, questionById,
    finishReading, hasRead, addToVocab,
    grammarById, writingById, markGrammar, markWriting,
    bumpActivity, todayActivity, checkin, checkedToday, streak, heatData, stats,
    addBook, deleteBook, addWords, deleteWord, addQuiz, deleteQuiz, addReading, deleteReading,
    addGrammar, deleteGrammar, addWriting, deleteWriting,
    setRole, setGoal, exportData, importData,
    INTERVALS, MAX_STAGE
  };
})();
