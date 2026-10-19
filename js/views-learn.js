/* ============ 视图：背单词 / 练习测验 / 错题集 / 阅读 ============ */
window.Views = window.Views || {};
window.App = window.App || { session: {} };
App.session = App.session || {};
App.act = App.act || {};
(function () {
  const S = Store;
  const h = App.h;
  // 用于内联 onclick 中的字符串参数（定义见 util.js）
  const jsq = App.jsq;

  // ================= 单词学习 =================
  Views.words = function (el, params) {
    const tab = (params && params.tab) || (App.session.wordsTab) || 'learn';
    App.session.wordsTab = tab;
    el.innerHTML = `
      <div class="tabs">
        <div class="tab ${tab === 'learn' ? 'active' : ''}" onclick="App.go('words',{tab:'learn'})">学新词</div>
        <div class="tab ${tab === 'review' ? 'active' : ''}" onclick="App.go('words',{tab:'review'})">复习 <span class="tag ${S.dueWords().length ? 'tag-amber' : 'tag-gray'}" style="padding:1px 8px">${S.dueWords().length}</span></div>
        <div class="tab ${tab === 'books' ? 'active' : ''}" onclick="App.go('words',{tab:'books'})">词库</div>
      </div>
      <div id="words-body"></div>`;
    const body = el.querySelector('#words-body');
    if (tab === 'learn') renderLearn(body);
    else if (tab === 'review') renderReview(body);
    else renderBooks(body);
  };

  // ----- 学新词 -----
  function renderLearn(el) {
    const ses = App.session.learn;
    if (ses) { renderFlash(el, 'learn'); return; }
    const act = S.todayActivity();
    const goal = S.db.goals.newWords;
    const remain = Math.max(0, goal - (act.learned || 0));
    const poolCnt = S.newWordsPool().length;
    const myBooks = S.db.enrollments.map(e => S.bookById(e.bookId)).filter(Boolean);
    el.innerHTML = `
      <div class="card">
        <div class="result-hero">
          <div style="font-size:52px">🌱</div>
          <div style="font-size:18px;font-weight:750;margin:8px 0 4px">今日可学新词</div>
          <div class="muted">目标 ${goal} 个 · 已学 ${act.learned || 0} 个 · 词库剩余 ${poolCnt} 个新词</div>
        </div>
        ${remain > 0 && poolCnt > 0
        ? `<div class="flash-actions"><button class="btn btn-primary btn-lg" onclick="App.act.startLearn(${Math.min(remain, poolCnt)})">开始学习（${Math.min(remain, poolCnt)} 个）</button></div>`
        : poolCnt === 0
          ? `<div class="flash-actions"><button class="btn btn-ghost" onclick="App.go('words',{tab:'books'})">去词库报名新词库</button></div>`
          : `<div class="flash-actions">
                 <span class="tag tag-green" style="font-size:13px;padding:6px 14px">🎉 今日新词任务已完成</span>
                 <button class="btn btn-ghost" onclick="App.act.startLearn(5)">加学 5 个</button>
               </div>`}
      </div>
      <div class="card" style="margin-top:16px">
        <div class="card-title">💡 艾宾浩斯记忆法</div>
        <div class="tiny" style="line-height:2">
          新学的单词会按照 <b>1天 → 2天 → 4天 → 7天 → 15天 → 30天</b> 的间隔安排复习，<br>
          忘记的单词会重新开始记忆周期，坚持复习即可长期记住。
        </div>
      </div>
      ${myBooks.length ? `<div class="card" style="margin-top:16px"><div class="card-title">📚 在学词库</div>${myBooks.map(b => {
            const p = S.bookProgress(b.id);
            return `<div class="list-item"><div class="li-body">
          <div class="li-title">${h(b.name)}</div>
          <div class="progress" style="margin-top:6px"><div class="progress-bar" style="width:${p.total ? p.learned / p.total * 100 : 0}%"></div></div>
        </div><div class="tiny">${p.learned}/${p.total}</div></div>`;
          }).join('')}</div>` : ''}`;
  }
  App.act.startLearn = function (n) {
    const pool = S.newWordsPool(n);
    if (!pool.length) return App.toast('词库里没有新词了', 'error');
    App.session.learn = { list: pool, idx: 0, known: 0, unknown: 0 };
    App.rerender();
  };

  // ----- 复习 -----
  function renderReview(el) {
    const ses = App.session.review;
    if (ses) { renderFlash(el, 'review'); return; }
    const due = S.dueWords();
    const st = S.stats();
    el.innerHTML = `
      <div class="card">
        <div class="result-hero">
          <div style="font-size:52px">⏰</div>
          <div style="font-size:18px;font-weight:750;margin:8px 0 4px">${due.length ? `有 ${due.length} 个单词今天该复习了` : '今天的复习任务已完成 🎉'}</div>
          <div class="muted">已学 ${st.learned} 词 · 已掌握 ${st.mastered} 词 · 按艾宾浩斯曲线安排</div>
        </div>
        ${due.length ? `<div class="flash-actions"><button class="btn btn-primary btn-lg" onclick="App.act.startReview()">开始复习</button></div>` : ''}
      </div>
      ${due.length ? `<div class="card" style="margin-top:16px"><div class="card-title">📅 复习队列（前 10 个）</div>
        ${due.slice(0, 10).map(w => `
          <div class="word-item"><div class="word-head">
            <span class="word-w">${h(w.word)}</span>
            <span class="spacer"></span>
            <span class="tag ${w.rec.nextDate < S.todayStr() ? 'tag-red' : 'tag-amber'}">${w.rec.nextDate === S.todayStr() ? '今日到期' : '已过期'}</span>
          </div>
          <div class="word-m">${h(w.meaning)}</div>
          <div class="tiny">上次学习：${w.rec.lastDate} · 第 ${w.rec.stage} 阶段</div>
        </div>`).join('')}</div>` : ''}`;
  }
  App.act.startReview = function () {
    const due = S.dueWords();
    if (!due.length) return App.toast('没有待复习的单词');
    App.session.review = { list: due, idx: 0, known: 0, forgot: 0 };
    App.rerender();
  };

  // ----- 抽认卡（学习/复习共用）-----
  function renderFlash(el, type) {
    const ses = App.session[type];
    if (ses.idx >= ses.list.length) { renderSessionDone(el, type); return; }
    const w = ses.list[ses.idx];
    const rec = type === 'review' ? S.srsOf(w.id) : null;
    const total = ses.list.length;
    el.innerHTML = `
      <div class="flash-wrap pop">
        <div class="flash-card" onclick="App.act.flip()">
          <div class="flash-book"><span class="tag tag-gray">${h((S.bookById(w.bookId) || {}).name || '')}</span></div>
          <div class="flash-count">${ses.idx + 1} / ${total}</div>
          <div class="flash-word">${h(w.word)}</div>
          <div>${w.phonetic ? `<span class="flash-phonetic">${h(w.phonetic)}</span>` : ''}</div>
          <button class="speak-btn" onclick="event.stopPropagation();App.speak('${jsq(w.word)}')" title="朗读">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" fill="currentColor"/></svg>
          </button>
          ${!ses.flip ? `<div class="flash-tip">点击卡片查看释义</div>` : `
            <div class="flash-meaning">${h(w.meaning)}</div>
            ${w.example ? `<div class="flash-example">${h(w.example)}</div>` : ''}
            ${rec ? `<div>
              <div class="stage-dots">${Array.from({ length: S.MAX_STAGE + 1 }, (_, i) =>
      `<div class="dot ${i <= rec.stage ? 'on' : ''} ${i === rec.stage && rec.nextDate && rec.nextDate <= S.todayStr() ? 'due' : ''}"></div>`).join('')}</div>
              <div class="tiny" style="margin-top:4px">记忆阶段 ${rec.stage}/${S.MAX_STAGE} · 学习日期 ${rec.learnDate} · 上次复习 ${rec.lastDate}</div>
            </div>` : ''}
          `}
        </div>
        <div class="flash-actions">
          ${!ses.flip
        ? `<button class="btn btn-ghost btn-lg" onclick="App.act.flip()">👀 显示答案</button>`
        : type === 'learn'
          ? `<button class="btn btn-ghost btn-lg" onclick="App.act.learnAnswer(false)">😅 不认识</button>
                 <button class="btn btn-primary btn-lg" onclick="App.act.learnAnswer(true)">😊 认识</button>`
          : `<button class="btn btn-ghost btn-lg" onclick="App.act.reviewAnswer(false)">😔 忘了</button>
                 <button class="btn btn-primary btn-lg" onclick="App.act.reviewAnswer(true)">😀 记得</button>`}
        </div>
        <div class="flash-tip">${type === 'learn' ? '「认识」直接进入 2 天后复习，「不认识」明天再学' : '「忘了」将重新开始记忆周期'}</div>
      </div>`;
  }
  App.act.flip = function () {
    const ses = App.session.wordsTab === 'review' ? App.session.review : App.session.learn;
    if (ses) { ses.flip = true; App.rerender(); }
  };
  App.act.learnAnswer = function (remembered) {
    const ses = App.session.learn;
    const w = ses.list[ses.idx];
    S.learnWord(w.id, w.bookId, remembered);
    if (remembered) ses.known++; else ses.unknown++;
    ses.idx++; ses.flip = false;
    App.rerender();
  };
  App.act.reviewAnswer = function (remembered) {
    const ses = App.session.review;
    const w = ses.list[ses.idx];
    S.reviewWord(w.id, remembered);
    if (remembered) ses.known++; else ses.forgot++;
    ses.idx++; ses.flip = false;
    App.rerender();
  };
  function renderSessionDone(el, type) {
    const ses = App.session[type];
    const isLearn = type === 'learn';
    el.innerHTML = `
      <div class="card pop">
        <div class="result-hero">
          <div style="font-size:52px">${isLearn ? '🌱' : '🔁'}</div>
          <div style="font-size:18px;font-weight:750;margin:8px 0">${isLearn ? '新词学习完成！' : '复习完成！'}</div>
          <div class="muted">
            共 ${ses.list.length} 个单词 · ${isLearn
        ? `认识 ${ses.known} · 不认识 ${ses.unknown}`
        : `记得 ${ses.known} · 忘了 ${ses.forgot}`}
          </div>
          <div class="tiny" style="margin-top:8px">${isLearn ? '已按艾宾浩斯曲线安排复习时间' : '忘了的单词明天会再次出现'}</div>
        </div>
        <div class="flash-actions">
          <button class="btn btn-ghost" onclick="App.act.endSession('${type}')">返回</button>
          <button class="btn btn-primary" onclick="App.act.endSession('${type}');App.go('plan')">去打卡</button>
        </div>
      </div>`;
  }
  App.act.endSession = function (type) {
    App.session[type] = null;
    if (type === 'review' && !S.dueWords().length) App.go('plan');
    else App.rerender();
  };

  // ----- 词库列表 -----
  function renderBooks(el) {
    el.innerHTML = S.db.wordbooks.map(b => {
      const p = S.bookProgress(b.id);
      const enrolled = S.isEnrolled(b.id);
      if (b.vocab) {
        return `<div class="card" style="margin-bottom:14px">
          <div class="row">
            <div class="li-icon" style="background:var(--accent-soft)">⭐</div>
            <div style="flex:1">
              <div class="li-title">${h(b.name)} <span class="tag tag-amber">${p.total} 词</span></div>
              <div class="li-sub">阅读时点击生词即可收藏到这里</div>
            </div>
            ${p.total ? `<button class="btn btn-primary btn-sm" onclick="App.act.startVocabReview()">复习</button>` : ''}
          </div>
        </div>`;
      }
      return `<div class="card" style="margin-bottom:14px">
        <div class="row">
          <div class="li-icon" style="background:var(--primary-soft)">📕</div>
          <div style="flex:1;min-width:0">
            <div class="li-title">${h(b.name)} <span class="tag tag-gray" style="margin-left:4px">${h(b.level || '')}</span></div>
            <div class="li-sub">${h(b.desc || '')}</div>
            <div class="progress" style="margin-top:8px"><div class="progress-bar ${p.learned >= p.total && p.total ? 'green' : ''}" style="width:${p.total ? p.learned / p.total * 100 : 0}%"></div></div>
            <div class="tiny" style="margin-top:5px">已学 ${p.learned}/${p.total} · 掌握 ${p.mastered} ${p.due ? `· <b style="color:var(--accent)">${p.due} 词待复习</b>` : ''}</div>
          </div>
        </div>
        <div class="row" style="margin-top:12px">
          <button class="btn btn-ghost btn-sm" onclick="App.act.showBookWords('${b.id}')">单词列表</button>
          <span class="spacer"></span>
          ${enrolled
          ? `<span class="tag tag-green" style="padding:6px 12px">✓ 在学</span>`
          : `<button class="btn btn-primary btn-sm" onclick="App.act.enrollBook('${b.id}')">报名学习</button>`}
        </div>
      </div>`;
    }).join('');
  }
  App.act.enrollBook = function (id) { S.enroll(id); App.toast('报名成功，开始学习吧！', 'success'); App.rerender(); };
  App.act.showBookWords = function (id) {
    const b = S.bookById(id);
    const rows = b.words.map(w => {
      const r = S.srsOf(w.id);
      const tag = r ? (r.stage >= S.MAX_STAGE ? '<span class="tag tag-green">掌握</span>' : `<span class="tag tag-blue">第${r.stage}阶段</span>`) : '<span class="tag tag-gray">未学</span>';
      return `<div class="word-item">
        <div class="word-head">
          <span class="word-w">${h(w.word)}</span>
          <span class="word-p">${h(w.phonetic || '')}</span>
          <span class="spacer"></span>${tag}
          <button class="speak-btn" style="width:32px;height:32px;margin:0" onclick="App.speak('${jsq(w.word)}')">
            <svg viewBox="0 0 24 24" width="14" height="14"><path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" fill="currentColor"/></svg>
          </button>
        </div>
        <div class="word-m">${h(w.meaning)}</div>
        ${w.example ? `<div class="tiny">${h(w.example)}</div>` : ''}
      </div>`;
    }).join('') || '<div class="empty">词库为空</div>';
    App.modal(`
      <div class="modal-head"><div class="modal-title">📚 ${h(b.name)}</div><button class="modal-close" onclick="App.closeModal()">✕</button></div>
      <div style="max-height:56vh;overflow-y:auto">${rows}</div>`);
  };
  App.act.startVocabReview = function () {
    const today = S.todayStr();
    const words = (S.bookById('vocab').words || []).map(w => Object.assign({ bookId: 'vocab' }, w))
      .filter(w => { const r = S.srsOf(w.id); return r && r.nextDate && r.nextDate <= today; });
    if (!words.length) return App.toast('生词本暂时没有到期单词');
    App.session.review = { list: words, idx: 0, known: 0, forgot: 0 };
    App.session.wordsTab = 'review';
    App.go('words', { tab: 'review' });
  };

  // ================= 练习测验 =================
  Views.quiz = function (el, params) {
    const sub = (params && params.tab) || (App.session.quizTab) || 'list';
    App.session.quizTab = sub;
    if (sub === 'wrong') { renderWrongbook(el); return; }
    const ses = App.session.quizRun;
    if (ses) { renderQuizRun(el); return; }
    // 测验列表
    el.innerHTML = `
      <div class="tabs">
        <div class="tab ${sub === 'list' ? 'active' : ''}" onclick="App.go('quiz',{tab:'list'})">测验</div>
        <div class="tab ${sub === 'wrong' ? 'active' : ''}" onclick="App.go('quiz',{tab:'wrong'})">错题集 <span class="tag ${S.stats().wrongCount ? 'tag-red' : 'tag-gray'}" style="padding:1px 8px">${S.stats().wrongCount}</span></div>
      </div>
      ${S.db.quizzes.map(q => {
      const last = [...S.db.attempts].reverse().find(a => a.quizId === q.id);
      const best = S.db.attempts.filter(a => a.quizId === q.id);
      const bestPct = best.length ? Math.max(...best.map(a => Math.round(a.correct / a.total * 100))) : null;
      return `<div class="card" style="margin-bottom:14px">
          <div class="row">
            <div class="li-icon" style="background:var(--accent-soft)">📝</div>
            <div style="flex:1;min-width:0">
              <div class="li-title">${h(q.title)}</div>
              <div class="li-sub">${h(q.desc || '')} · ${q.questions.length} 题
                ${last ? ` · 上次 ${last.correct}/${last.total}` : ''}${bestPct != null ? ` · 最佳 ${bestPct}%` : ''}
              </div>
            </div>
            <button class="btn btn-primary" onclick="App.act.startQuiz('${q.id}')">开始</button>
          </div>
        </div>`;
    }).join('') || '<div class="card"><div class="empty">暂无测验，请老师在管理页创建</div></div>'}`;
  };
  App.act.startQuiz = function (quizId) {
    const quiz = S.db.quizzes.find(q => q.id === quizId);
    if (!quiz || !quiz.questions.length) return App.toast('该测验暂无题目', 'error');
    App.session.quizRun = { quizId, questions: quiz.questions, idx: 0, wrongIds: [], correct: 0, answered: false, practice: false };
    App.rerender();
  };
  function renderQuizRun(el) {
    const ses = App.session.quizRun;
    const quiz = S.db.quizzes.find(q => q.id === ses.quizId) || { title: '错题重练' };
    if (ses.idx >= ses.questions.length) { renderQuizResult(el, ses); return; }
    const q = ses.questions[ses.idx];
    const title = ses.practice ? '错题重练' : quiz.title;
    if (q.type === 'spell') {
      el.innerHTML = `
        <div class="quiz-q pop">
          <div class="row"><span class="tag tag-primary">${h(title)}</span><span class="spacer"></span><span class="tiny">${ses.idx + 1}/${ses.questions.length}</span></div>
          <div class="card" style="margin-top:12px">
            <div class="q-text">${h(q.prompt)}</div>
            <input class="spell-input" id="spell-input" placeholder="输入英文单词后回车" autocomplete="off" onkeydown="if(event.key==='Enter')App.act.submitSpell()">
            <div id="spell-fb"></div>
            <div class="flash-actions" id="spell-actions">
              <button class="btn btn-primary" onclick="App.act.submitSpell()">提交</button>
            </div>
          </div>
        </div>`;
      setTimeout(() => { const i = document.getElementById('spell-input'); if (i) i.focus(); }, 50);
    } else {
      el.innerHTML = `
        <div class="quiz-q pop">
          <div class="row"><span class="tag tag-primary">${h(title)}</span><span class="spacer"></span><span class="tiny">${ses.idx + 1}/${ses.questions.length}</span></div>
          <div class="card" style="margin-top:12px">
            <div class="q-text">${h(q.prompt)}</div>
            <div id="opt-list">
              ${q.options.map((o, i) => `
                <button class="option" onclick="App.act.answerChoice(${i})">
                  <span class="opt-key">${'ABCD'[i]}</span><span>${h(o)}</span>
                </button>`).join('')}
            </div>
            <div id="q-fb"></div>
          </div>
        </div>`;
    }
  }
  App.act.answerChoice = function (i) {
    const ses = App.session.quizRun;
    const q = ses.questions[ses.idx];
    if (ses.answered) return;
    ses.answered = true;
    const correct = i === q.answer;
    if (correct) ses.correct++; else ses.wrongIds.push(q.id);
    if (ses.practice && q._quizId) S.recordPractice(q._quizId, q.id, correct);
    document.querySelectorAll('#opt-list .option').forEach((btn, bi) => {
      btn.disabled = true;
      if (bi === q.answer) btn.classList.add('correct');
      else if (bi === i) btn.classList.add('wrong');
    });
    showFeedback(q, correct, ses);
  };
  App.act.submitSpell = function () {
    const ses = App.session.quizRun;
    const q = ses.questions[ses.idx];
    if (ses.answered) return;
    const input = document.getElementById('spell-input');
    if (!input.value.trim()) return App.toast('请输入答案', 'error');
    ses.answered = true;
    const correct = input.value.trim().toLowerCase() === q.answer.toLowerCase();
    if (correct) ses.correct++; else ses.wrongIds.push(q.id);
    if (ses.practice && q._quizId) S.recordPractice(q._quizId, q.id, correct);
    input.disabled = true;
    input.classList.add(correct ? 'correct' : 'wrong');
    if (!correct) {
      const fb = document.getElementById('spell-fb');
      fb.innerHTML = `<div class="q-explain" style="margin-top:10px">正确答案：<b>${h(q.answer)}</b></div>`;
    }
    showFeedback(q, correct, ses);
  };
  function showFeedback(q, correct, ses) {
    const fb = q.type === 'spell' ? document.getElementById('spell-actions') : document.getElementById('q-fb');
    if (fb && q.explain) {
      const div = document.createElement('div');
      div.className = 'q-explain';
      div.style.marginTop = '12px';
      div.innerHTML = `${correct ? '✅ 回答正确！' : '❌ 正确答案：' + (q.type === 'spell' ? h(q.answer) : h(q.options[q.answer]))}<br>${h(q.explain)}`;
      if (q.type === 'spell') { fb.innerHTML = ''; fb.appendChild(div); }
      else fb.appendChild(div);
    }
    const nav = document.createElement('div');
    nav.style.marginTop = '16px';
    nav.innerHTML = `<button class="btn btn-primary btn-block" onclick="App.act.nextQ()">${ses.idx + 1 >= ses.questions.length ? '查看结果' : '下一题 →'}</button>`;
    if (q.type === 'spell') { fb.innerHTML = ''; fb.appendChild(nav); }
    else document.getElementById('q-fb').appendChild(nav);
  }
  App.act.nextQ = function () {
    const ses = App.session.quizRun;
    ses.idx++; ses.answered = false;
    App.rerender();
  };
  function renderQuizResult(el, ses) {
    if (!ses.practice) {
      S.recordAttempt(ses.quizId, ses.questions.length, ses.correct, ses.wrongIds);
    }
    const pct = Math.round(ses.correct / ses.questions.length * 100);
    const wrongQs = ses.wrongIds.map(id => ses.questions.find(q => q.id === id)).filter(Boolean);
    el.innerHTML = `
      <div class="card pop">
        <div class="result-hero">
          <div style="font-size:44px">${pct === 100 ? '🏆' : pct >= 80 ? '🎉' : pct >= 60 ? '💪' : '📖'}</div>
          <div class="result-score">${ses.correct}/${ses.questions.length}</div>
          <div class="muted">正确率 ${pct}% · ${pct === 100 ? '太棒了，全对！' : '错题已加入错题集，记得去重练'}</div>
        </div>
        <div class="flash-actions">
          ${ses.practice ? '' : `<button class="btn btn-ghost" onclick="App.act.startQuiz('${ses.quizId}')">再测一次</button>`}
          <button class="btn btn-primary" onclick="App.act.finishRun()">完成</button>
        </div>
      </div>
      ${wrongQs.length ? `<div class="card" style="margin-top:16px"><div class="card-title">❌ 本次错题（${wrongQs.length}）</div>
        ${wrongQs.map(q => `<div class="wrong-item"><div style="flex:1">
          <div style="font-size:14px;font-weight:600">${h(q.prompt)}</div>
          <div class="tiny" style="margin-top:3px">正确答案：${h(q.type === 'spell' ? q.answer : q.options[q.answer])}</div>
          ${q.explain ? `<div class="tiny" style="margin-top:2px">${h(q.explain)}</div>` : ''}
        </div></div>`).join('')}</div>` : ''}`;
    App.session.quizRun = null;
  }
  App.act.finishRun = function () { App.session.quizRun = null; App.rerender(); };

  // ----- 错题集 -----
  function renderWrongbook(el) {
    const wrong = S.db.wrongbook.filter(w => !w.resolved);
    const resolved = S.db.wrongbook.filter(w => w.resolved);
    el.innerHTML = `
      <div class="tabs">
        <div class="tab" onclick="App.go('quiz',{tab:'list'})">测验</div>
        <div class="tab active" onclick="App.go('quiz',{tab:'wrong'})">错题集 <span class="tag ${wrong.length ? 'tag-red' : 'tag-gray'}" style="padding:1px 8px">${wrong.length}</span></div>
      </div>
      <div class="card">
        <div class="card-title">❌ 待清理错题 <span class="spacer"></span>
          ${wrong.length ? `<button class="btn btn-primary btn-sm" onclick="App.act.practiceWrong()">🔁 错题重练（${wrong.length}）</button>` : ''}
        </div>
        ${wrong.length ? wrong.slice().reverse().map(w => {
      const q = S.questionById(w.quizId, w.questionId);
      return `<div class="wrong-item">
            <span class="tag tag-red">×${w.times}</span>
            <div style="flex:1;min-width:0">
              <div style="font-size:14px;font-weight:600">${h(q ? q.prompt : '原题目已被删除')}</div>
              ${q ? `<div class="tiny" style="margin-top:3px">正确答案：${h(q.type === 'spell' ? q.answer : q.options[q.answer])}</div>
                     ${q.explain ? `<div class="tiny">${h(q.explain)}</div>` : ''}` : ''}
              <div class="tiny" style="margin-top:3px">最近答错：${w.date}</div>
            </div>
            <button class="btn btn-ghost btn-sm" onclick="App.act.resolveWrong('${w.key}')">移出</button>
          </div>`;
    }).join('') : '<div class="empty"><div class="icon">🎉</div>没有待清理的错题<br><span class="tiny">答错的题目会自动收进这里</span></div>'}
      </div>
      ${resolved.length ? `<div class="card" style="margin-top:16px"><div class="card-title">✅ 已清理 ${resolved.length} 题</div>
        <div class="tiny">在测验中答对后，错题会自动移出待清理列表。</div></div>` : ''}`;
  }
  App.act.resolveWrong = function (key) {
    const w = S.db.wrongbook.find(x => x.key === key);
    if (w) { w.resolved = true; S.save(); }
    App.toast('已移出错题集');
    App.rerender();
  };
  App.act.practiceWrong = function () {
    const wrong = S.db.wrongbook.filter(w => !w.resolved);
    const qs = wrong.map(w => {
      const q = S.questionById(w.quizId, w.questionId);
      return q ? Object.assign({}, q, { _quizId: w.quizId }) : null;
    }).filter(Boolean);
    if (!qs.length) return App.toast('没有可重练的题目');
    App.session.quizRun = { quizId: 'practice', questions: qs, idx: 0, wrongIds: [], correct: 0, answered: false, practice: true };
    App.rerender();
  };

  // ================= 阅读 =================
  Views.reading = function (el, params) {
    if (params && params.id) { renderReader(el, params.id); return; }
    el.innerHTML = `
      <div class="card" style="background:linear-gradient(135deg,#10b981,#34d399);color:#fff;border:none;margin-bottom:16px">
        <div style="font-size:19px;font-weight:750">📚 阅读天地</div>
        <div style="opacity:.9;font-size:13px;margin-top:4px">点击文中蓝色下划线单词可查词，生词可一键加入生词本</div>
      </div>
      ${S.db.readings.map(r => {
      const read = S.hasRead(r.id);
      const wc = r.text.join(' ').split(/\s+/).length;
      return `<div class="card" style="margin-bottom:14px">
          <div class="row">
            <div class="li-icon" style="background:var(--green-soft)">📗</div>
            <div style="flex:1;min-width:0">
              <div class="li-title">${h(r.title)} <span class="tag tag-gray" style="margin-left:4px">${h(r.level || '')}</span></div>
              <div class="li-sub">${h(r.desc || '')} · 约 ${wc} 词</div>
            </div>
            <button class="btn btn-primary" onclick="App.go('reading',{id:'${r.id}'})">阅读</button>
          </div>
          ${read ? `<div class="tiny" style="margin-top:8px;color:var(--green)">✓ 已完成阅读</div>` : ''}
        </div>`;
    }).join('') || '<div class="card"><div class="empty">暂无阅读材料</div></div>'}`;
  };

  function annotate(par) {
    const vocabSet = new Set(Object.keys(S.db.srs).map(id => (S.wordById(id) || {}).word).filter(Boolean).map(w => w.toLowerCase()));
    return par.split(/([A-Za-z][A-Za-z'-]*)/g).map(tok => {
      if (!/^[A-Za-z][A-Za-z'-]*$/.test(tok)) return h(tok);
      const low = tok.toLowerCase();
      if (Seed.stopwords.has(low)) return h(tok);
      const inDict = !!S.dictLookup(low);
      const cls = 'rw' + (vocabSet.has(low) ? ' vocab' : inDict ? ' known' : '');
      return `<span class="${cls}" onclick="App.showWordCard('${jsq(tok)}')">${h(tok)}</span>`;
    }).join('');
  }

  function renderReader(el, id) {
    const r = S.db.readings.find(x => x.id === id);
    if (!r) { el.innerHTML = '<div class="card"><div class="empty">阅读材料不存在</div></div>'; return; }
    el.innerHTML = `
      <div class="reader">
        <div class="reading-toolbar">
          <button class="btn btn-ghost btn-sm" onclick="App.go('reading')">← 返回列表</button>
          <span class="spacer"></span>
          <button class="btn btn-ghost btn-sm" onclick="App.act.readDone('${r.id}')">✓ 完成阅读</button>
        </div>
        <div class="reader-head">
          <div class="tiny">${S.todayStr()} · ${S.hasRead(r.id) ? '<span style="color:var(--green)">✓ 已完成</span>' : '阅读中'}</div>
          <div class="reader-title">${h(r.title)}</div>
          <div class="muted">${h(r.desc || '')}</div>
        </div>
        <div class="card">
          ${r.text.map(p => `<p class="para">${annotate(p)}</p>`).join('')}
        </div>
        <div class="tiny" style="text-align:center;margin-top:14px">提示：橙色底纹 = 生词本单词 · 蓝色下划线 = 可查词</div>
      </div>`;
  }
  App.act.readDone = function (id) {
    S.finishReading(id);
    App.toast('阅读完成，已计入今日任务 🎉', 'success');
    App.go('reading');
  };

  // ----- 取词弹窗 -----
  App.showWordCard = function (word) {
    const d = S.dictLookup(word);
    const vocabBook = S.bookById('vocab');
    const inVocab = vocabBook.words.some(w => w.word.toLowerCase() === word.toLowerCase());
    App.modal(`
      <div style="text-align:center;padding:6px 0 2px">
        <div style="font-size:30px;font-weight:800">${h(word)}</div>
        ${d && d.phonetic ? `<div class="muted" style="margin-top:2px">${h(d.phonetic)}</div>` : ''}
        <button class="speak-btn" style="margin-top:8px" onclick="App.speak('${jsq(word)}')">
          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" fill="currentColor"/></svg>
        </button>
        <div style="margin-top:12px;font-size:16px;font-weight:600;color:var(--primary-deep)">${d ? h(d.meaning) : '<span class="muted">暂无释义</span>'}</div>
        <div class="tiny" style="margin-top:4px">${inVocab ? '已在生词本中' : d && d.fromBook ? '来自词库：' + h((S.bookById(d.fromBook) || {}).name || '') : '加入生词本后按艾宾浩斯曲线复习'}</div>
        <div class="modal-foot">
          <button class="btn btn-ghost" onclick="App.closeModal()">关闭</button>
          ${inVocab ? '' : `<button class="btn btn-primary" onclick="App.act.addVocab('${jsq(word)}')">＋ 加入生词本</button>`}
        </div>
      </div>`);
  };
  App.act.addVocab = function (word) {
    if (S.addToVocab(word)) App.toast(`「${word}」已加入生词本，明天复习`, 'success');
    else App.toast('该单词已在生词本中');
    App.closeModal();
  };
})();
