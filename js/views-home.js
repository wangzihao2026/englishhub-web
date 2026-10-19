/* ============ 视图：首页仪表盘 / 打卡计划 / 老师管理 ============ */
window.Views = window.Views || {};
window.App = window.App || { session: {} };
App.session = App.session || {};
App.act = App.act || {};
(function () {
  const S = Store;
  const h = App.h;

  // ---------- 公共：今日目标 ----------
  function goalItems() {
    const act = S.todayActivity();
    const due = S.dueWords().length;
    const goalNew = S.db.goals.newWords;
    const learned = act.learned || 0;
    const hasSrs = Object.keys(S.db.srs).length > 0;
    return [
      { key: 'new', icon: '📖', label: '学习新单词', now: learned, target: goalNew, done: learned >= goalNew, action: `App.go('words',{tab:'learn'})`, tip: `${learned}/${goalNew} 个` },
      { key: 'review', icon: '⏰', label: '复习到期单词', now: due === 0 && hasSrs ? 1 : 0, target: 1, done: due === 0 && hasSrs, action: `App.go('words',{tab:'review'})`, tip: due > 0 ? `${due} 个待复习` : (hasSrs ? '已完成' : '尚无学习记录') },
      { key: 'quiz', icon: '✏️', label: '完成一次测验', now: act.quiz > 0 ? 1 : 0, target: 1, done: act.quiz > 0, action: `App.go('quiz')`, tip: act.quiz > 0 ? '已完成' : '未完成' },
      { key: 'read', icon: '📚', label: '完成一篇阅读', now: act.read > 0 ? 1 : 0, target: 1, done: act.read > 0, action: `App.go('reading')`, tip: act.read > 0 ? '已完成' : '未完成' },
      { key: 'grammar', icon: '📐', label: '学习一节语法', now: act.grammar > 0 ? 1 : 0, target: 1, done: act.grammar > 0, action: `App.go('grammar')`, tip: act.grammar > 0 ? '已完成' : '未完成' },
      { key: 'write', icon: '✍️', label: '完成一篇作文', now: act.write > 0 ? 1 : 0, target: 1, done: act.write > 0, action: `App.go('writing')`, tip: act.write > 0 ? '已完成' : '未完成' }
    ];
  }
  function goalRows() {
    return goalItems().map(g => `
      <div class="goal-row" onclick="${g.action}" style="cursor:pointer">
        <div class="li-icon" style="background:var(--primary-soft)">${g.icon}</div>
        <div class="li-body">
          <div class="li-title">${g.label} ${g.done ? '<span class="tag tag-green" style="margin-left:6px">完成</span>' : `<span class="tag tag-amber" style="margin-left:6px">${g.tip}</span>`}</div>
          <div class="progress" style="margin-top:6px"><div class="progress-bar ${g.done ? 'green' : ''}" style="width:${Math.min(100, g.target ? g.now / g.target * 100 : 0)}%"></div></div>
        </div>
        <div class="tiny">${g.now}/${g.target}</div>
      </div>`).join('');
  }
  Views.goalRows = goalRows;

  function heatHtml() {
    const data = S.heatData(35);
    const cells = data.map(d =>
      `<div class="heat-cell ${d.level ? 'l' + d.level : ''} ${d.date === S.todayStr() ? 'today' : ''}" title="${d.date}${d.level ? ' · 活跃度' + d.level : ''}"></div>`).join('');
    return `<div class="heatmap-wrap"><div class="heat">${cells}</div></div>
      <div class="tiny" style="margin-top:8px">最近 5 周 · 颜色越深学习越多</div>`;
  }
  Views.heatHtml = heatHtml;

  // ---------- 首页仪表盘 ----------
  Views.dashboard = function (el) {
    const st = S.stats();
    const act = S.todayActivity();
    const items = goalItems();
    const doneCnt = items.filter(i => i.done).length;
    const pct = Math.round(doneCnt / items.length * 100);
    const hour = new Date().getHours();
    const hello = hour < 6 ? '夜深了' : hour < 12 ? '早上好' : hour < 14 ? '中午好' : hour < 18 ? '下午好' : '晚上好';
    const week = ['日', '一', '二', '三', '四', '五', '六'][new Date().getDay()];
    const myBooks = S.db.enrollments.map(e => S.bookById(e.bookId)).filter(Boolean);
    const bookRows = myBooks.map(b => {
      const p = S.bookProgress(b.id);
      return `<div class="list-item" onclick="App.go('words',{tab:'books'})" style="cursor:pointer">
        <div class="li-icon" style="background:var(--primary-soft)">📕</div>
        <div class="li-body">
          <div class="li-title">${h(b.name)}</div>
          <div class="progress" style="margin-top:6px"><div class="progress-bar" style="width:${p.total ? p.learned / p.total * 100 : 0}%"></div></div>
        </div>
        <div class="tiny">${p.learned}/${p.total}</div>
      </div>`;
    }).join('') || '<div class="empty">还没有报名词库，去「单词」页看看吧</div>';

    el.innerHTML = `
      <div class="card" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none">
        <div class="row">
          <div style="flex:1;min-width:0">
            <div style="font-size:19px;font-weight:750">${hello}，${h(S.db.profile.name)}</div>
            <div style="opacity:.85;font-size:13px;margin-top:3px">${S.todayStr()} 星期${week} · 已连续打卡 ${st.streak} 天</div>
            <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">
              <button class="btn btn-sm" style="background:rgba(255,255,255,.2);color:#fff" onclick="App.go('words',{tab:'learn'})">背单词</button>
              <button class="btn btn-sm" style="background:rgba(255,255,255,.2);color:#fff" onclick="App.go('words',{tab:'review'})">去复习 (${st.due})</button>
              <button class="btn btn-sm" style="background:rgba(255,255,255,.2);color:#fff" onclick="App.go('plan')">打卡</button>
            </div>
          </div>
          <div class="ring" style="background:conic-gradient(#fbbf24 ${pct}%,rgba(255,255,255,.25) 0)">
            <div class="ring-text">
              <div class="ring-pct" style="color:#fff">${pct}%</div>
              <div class="ring-cap" style="color:rgba(255,255,255,.8)">今日进度</div>
            </div>
          </div>
        </div>
      </div>

      <div class="stats-grid" style="margin-top:16px">
        <div class="stat-card"><div class="stat-num">${st.learned}</div><div class="stat-label">已学单词</div></div>
        <div class="stat-card"><div class="stat-num green">${st.mastered}</div><div class="stat-label">已掌握</div></div>
        <div class="stat-card"><div class="stat-num amber">${st.due}</div><div class="stat-label">待复习</div></div>
        <div class="stat-card"><div class="stat-num ${st.wrongCount ? 'red' : ''}">${st.wrongCount}</div><div class="stat-label">错题待清理</div></div>
      </div>

      <div class="card" style="margin-top:16px">
        <div class="card-title">🎯 今日任务 <span class="spacer"></span><span class="tiny">${doneCnt}/${items.length} 项完成</span></div>
        ${goalRows()}
      </div>

      <div class="grid2" style="margin-top:16px">
        <div class="card">
          <div class="card-title">🔥 学习热力图</div>
          ${heatHtml()}
        </div>
        <div class="card">
          <div class="card-title">📚 我的词库</div>
          ${bookRows}
        </div>
      </div>`;
  };

  // ---------- 打卡计划 ----------
  Views.plan = function (el) {
    const st = S.stats();
    const checked = S.checkedToday();
    const acc = st.accuracy == null ? '—' : st.accuracy + '%';
    const act = S.todayActivity();
    el.innerHTML = `
      <div class="card">
        <div class="card-title">🎯 今日目标</div>
        ${goalRows()}
        <div style="margin-top:18px">
          <button class="btn btn-primary btn-block checkin-btn" id="btn-checkin" ${checked ? 'disabled' : ''} onclick="App.act.doCheckin()">
            ${checked ? '✅ 今日已打卡' : '📮 完成打卡'}
          </button>
          <div class="tiny" style="text-align:center;margin-top:8px">完成全部目标后打卡，坚持才是最大的进步</div>
        </div>
      </div>

      <div class="stats-grid" style="margin-top:16px">
        <div class="stat-card"><div class="stat-num amber">${st.streak}</div><div class="stat-label">连续打卡(天)</div></div>
        <div class="stat-card"><div class="stat-num">${st.checkinTotal}</div><div class="stat-label">累计打卡</div></div>
        <div class="stat-card"><div class="stat-num green">${st.mastered}</div><div class="stat-label">已掌握单词</div></div>
        <div class="stat-card"><div class="stat-num">${acc}</div><div class="stat-label">测验正确率</div></div>
      </div>

      <div class="card" style="margin-top:16px">
        <div class="card-title">📅 学习热力图</div>
        ${heatHtml()}
      </div>

      <div class="card" style="margin-top:16px">
        <div class="card-title">⚙️ 每日目标设置</div>
        <div class="row">
          <div style="flex:1">
            <div class="label">每天学习新单词数</div>
            <div class="row">
              <button class="btn btn-ghost btn-sm" onclick="App.act.changeGoal(-2)">-2</button>
              <div style="font-size:18px;font-weight:750;min-width:50px;text-align:center">${S.db.goals.newWords} 个</div>
              <button class="btn btn-ghost btn-sm" onclick="App.act.changeGoal(2)">+2</button>
            </div>
          </div>
          <div style="flex:1">
            <div class="label">今日学习情况</div>
            <div class="tiny" style="font-size:13px">新学 ${act.learned || 0} · 复习 ${act.reviewed || 0} · 测验 ${act.quiz || 0} 次 · 阅读 ${act.read || 0} 篇</div>
          </div>
        </div>
      </div>
      <div class="card" style="margin-top:16px">
        <div class="card-title">💾 数据备份</div>
        <div class="row wrap">
          <button class="btn btn-ghost" onclick="App.act.exportBackup()">⬇️ 导出备份</button>
          <button class="btn btn-ghost" onclick="document.getElementById('import-file').click()">⬆️ 导入恢复</button>
          <input type="file" id="import-file" accept=".json,application/json" style="display:none" onchange="App.act.importBackup(this)">
        </div>
        <div class="tiny" style="margin-top:8px">学习数据保存在本浏览器中，换设备或清缓存前请先导出备份。</div>
      </div>`;
  };
  App.act.exportBackup = function () {
    const blob = new Blob([S.exportData()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'englishhub-backup-' + S.todayStr() + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    App.toast('备份文件已下载', 'success');
  };
  App.act.importBackup = function (input) {
    const f = input.files && input.files[0];
    input.value = '';
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        S.importData(reader.result);
        App.toast('数据已恢复', 'success');
        App.rerender();
      } catch (e) {
        App.toast(e.message || '备份文件格式不正确', 'error');
      }
    };
    reader.onerror = () => App.toast('读取文件失败', 'error');
    reader.readAsText(f);
  };
  App.act.doCheckin = function () {
    S.checkin();
    App.toast('打卡成功，继续保持！', 'success');
    App.rerender();
  };
  App.act.changeGoal = function (d) {
    const v = Math.max(2, Math.min(50, S.db.goals.newWords + d));
    S.setGoal('newWords', v);
    App.rerender();
  };

  // ================= 老师管理 =================
  Views.teacher = function (el, params) {
    const tab = (params && params.tab) || 'books';
    const tabs = [['books', '词库管理'], ['quizzes', '测验管理'], ['readings', '阅读管理'], ['grammar', '语法管理'], ['writing', '作文管理'], ['data', '学情数据']];
    const pubBar = (App.isTeacherOnline && App.isTeacherOnline())
      ? `<div class="content-toolbar"><button class="btn btn-primary" onclick="App.act.publishContent()">📢 发布内容到班级</button><span class="tiny" style="align-self:center">将本机词库 / 测验 / 阅读发布给全班学生（生词本不会发布）</span></div>`
      : '';
    el.innerHTML = `
      <div class="tabs">${tabs.map(t => `<div class="tab ${tab === t[0] ? 'active' : ''}" onclick="App.go('teacher',{tab:'${t[0]}'})">${t[1]}</div>`).join('')}</div>
      ${pubBar}
      <div id="teacher-body"></div>`;
    const body = el.querySelector('#teacher-body');
    if (tab === 'books') renderBooks(body);
    else if (tab === 'quizzes') renderQuizzes(body);
    else if (tab === 'readings') renderReadings(body);
    else if (tab === 'grammar') renderGrammarManage(body);
    else if (tab === 'writing') renderWritingManage(body);
    else renderData(body);
  };

  // ----- 词库管理 -----
  function renderBooks(el) {
    const rows = S.db.wordbooks.map(b => {
      const p = S.bookProgress(b.id);
      return `<div class="list-item">
        <div class="li-icon" style="background:var(--primary-soft)">📕</div>
        <div class="li-body" onclick="App.act.manageBook('${b.id}')" style="cursor:pointer">
          <div class="li-title">${h(b.name)} <span class="tag tag-gray" style="margin-left:4px">${h(b.level || '')}</span></div>
          <div class="li-sub">${h(b.desc || '')} · ${p.total} 词 · 已学 ${p.learned} · 掌握 ${p.mastered}</div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="App.act.manageBook('${b.id}')">管理</button>
        ${b.vocab ? '' : `<button class="btn btn-danger btn-sm" onclick="App.act.delBook('${b.id}')">删除</button>`}
      </div>`;
    }).join('');
    el.innerHTML = `
      <div class="content-toolbar">
        <button class="btn btn-primary" onclick="App.act.newBook()">＋ 新建词库</button>
        <span class="tiny" style="align-self:center">点击「管理」可添加单词、查看详情</span>
      </div>
      <div class="card">${rows || '<div class="empty">暂无词库</div>'}</div>`;
  }
  App.act.newBook = function () {
    App.modal(`
      <div class="modal-head"><div class="modal-title">新建词库</div><button class="modal-close" onclick="App.closeModal()">✕</button></div>
      <div class="field"><label class="label">词库名称</label><input class="input" id="nb-name" placeholder="如：高考核心词汇"></div>
      <div class="field"><label class="label">简介</label><input class="input" id="nb-desc" placeholder="词库简介（可选）"></div>
      <div class="field"><label class="label">难度标签</label><input class="input" id="nb-level" placeholder="如：四级 / 高考 / 入门"></div>
      <div class="modal-foot">
        <button class="btn btn-ghost" onclick="App.closeModal()">取消</button>
        <button class="btn btn-primary" onclick="App.act.saveNewBook()">创建</button>
      </div>`);
  };
  App.act.saveNewBook = function () {
    const name = document.getElementById('nb-name').value.trim();
    if (!name) return App.toast('请填写词库名称', 'error');
    S.addBook(name, document.getElementById('nb-desc').value.trim(), document.getElementById('nb-level').value.trim());
    App.closeModal(); App.toast('词库已创建', 'success'); App.rerender();
  };
  App.act.delBook = function (id) {
    const b = S.bookById(id);
    App.modal(`
      <div class="modal-head"><div class="modal-title">删除词库</div><button class="modal-close" onclick="App.closeModal()">✕</button></div>
      <div>确定删除词库「${h(b.name)}」吗？该操作不可恢复。</div>
      <div class="modal-foot">
        <button class="btn btn-ghost" onclick="App.closeModal()">取消</button>
        <button class="btn btn-danger" onclick="App.act.delBookOk('${id}')">删除</button>
      </div>`);
  };
  App.act.delBookOk = function (id) { S.deleteBook(id); App.closeModal(); App.toast('已删除'); App.rerender(); };
  App.act.manageBook = function (id) {
    const b = S.bookById(id);
    const p = S.bookProgress(id);
    const rows = b.words.map(w => {
      const r = S.srsOf(w.id);
      const stageTxt = r ? (r.stage >= S.MAX_STAGE ? '<span class="tag tag-green">已掌握</span>' : `<span class="tag tag-blue">第${r.stage}阶段</span>`) : '<span class="tag tag-gray">未学</span>';
      return `<div class="word-item">
        <div class="word-head">
          <span class="word-w">${h(w.word)}</span>
          <span class="word-p">${h(w.phonetic || '')}</span>
          <span class="spacer"></span>${stageTxt}
          <button class="btn btn-danger btn-sm" onclick="App.act.delWord('${id}','${w.id}')">删除</button>
        </div>
        <div class="word-m">${h(w.meaning)}</div>
        ${w.example ? `<div class="tiny">${h(w.example)}</div>` : ''}
      </div>`;
    }).join('') || '<div class="empty">词库为空，快添加单词吧</div>';
    App.modal(`
      <div class="modal-head"><div class="modal-title">📚 ${h(b.name)}</div><button class="modal-close" onclick="App.closeModal()">✕</button></div>
      <div class="tiny" style="margin-bottom:10px">共 ${p.total} 词 · 已学 ${p.learned} · 掌握 ${p.mastered}</div>
      <div class="import-box">批量添加格式（每行一个单词）：<br>单词 | 音标 | 释义 | 例句<br><b>示例：</b>apple | /ˈæpl/ | n. 苹果 | I eat an apple every day.</div>
      <textarea class="textarea" id="bw-lines" rows="4" placeholder="apple | /ˈæpl/ | n. 苹果 | I eat an apple every day."></textarea>
      <div class="modal-foot" style="margin-top:10px">
        <button class="btn btn-ghost" onclick="App.closeModal()">关闭</button>
        <button class="btn btn-primary" onclick="App.act.importWords('${id}')">导入单词</button>
      </div>
      <div class="divider"></div>
      <div style="max-height:300px;overflow-y:auto">${rows}</div>`);
  };
  App.act.importWords = function (id) {
    const lines = document.getElementById('bw-lines').value;
    const n = S.addWords(id, lines);
    App.toast(n ? `成功导入 ${n} 个单词` : '没有可导入的内容', n ? 'success' : 'error');
    if (n) App.act.manageBook(id);
  };
  App.act.delWord = function (bookId, wordId) { S.deleteWord(bookId, wordId); App.toast('已删除'); App.act.manageBook(bookId); };

  // ----- 测验管理 -----
  function renderQuizzes(el) {
    const rows = S.db.quizzes.map(q => `
      <div class="list-item">
        <div class="li-icon" style="background:var(--accent-soft)">📝</div>
        <div class="li-body">
          <div class="li-title">${h(q.title)}</div>
          <div class="li-sub">${h(q.desc || '')} · ${q.questions.length} 题</div>
        </div>
        <button class="btn btn-danger btn-sm" onclick="App.act.delQuiz('${q.id}')">删除</button>
      </div>`).join('');
    el.innerHTML = `
      <div class="content-toolbar"><button class="btn btn-primary" onclick="App.act.newQuiz()">＋ 新建测验</button></div>
      <div class="card">${rows || '<div class="empty">暂无测验</div>'}</div>`;
  }
  App.act.newQuiz = function () {
    App.modal(`
      <div class="modal-head"><div class="modal-title">新建测验</div><button class="modal-close" onclick="App.closeModal()">✕</button></div>
      <div class="field"><label class="label">测验标题</label><input class="input" id="nq-title" placeholder="如：期中词汇测验"></div>
      <div class="field"><label class="label">简介</label><input class="input" id="nq-desc" placeholder="测验简介（可选）"></div>
      <div class="import-box">题目格式（每行一题，用 <b>|</b> 分隔）：<br>
        选择题：题干 | 选项A | 选项B | 选项C | 选项D | 正确答案序号(1-4) | 解析(可选)<br>
        <b>示例：</b>“abandon”的意思是？| 放弃 | 吸收 | 准确的 | 实现 | 1 | abandon v. 放弃
      </div>
      <textarea class="textarea" id="nq-questions" rows="6" placeholder="题干 | 选项A | 选项B | 选项C | 选项D | 1 | 解析"></textarea>
      <div class="modal-foot">
        <button class="btn btn-ghost" onclick="App.closeModal()">取消</button>
        <button class="btn btn-primary" onclick="App.act.saveNewQuiz()">创建</button>
      </div>`);
  };
  App.act.saveNewQuiz = function () {
    const title = document.getElementById('nq-title').value.trim();
    if (!title) return App.toast('请填写测验标题', 'error');
    const questions = [];
    let lineNo = 0, ok = true;
    document.getElementById('nq-questions').value.split('\n').forEach(line => {
      lineNo++;
      const t = line.trim(); if (!t) return;
      const p = t.split('|').map(s => s.trim());
      if (p.length < 6) { ok = false; App.toast(`第 ${lineNo} 行格式不对（至少需要 题干|A|B|C|D|答案）`, 'error'); return; }
      const ans = parseInt(p[5], 10);
      if (!(ans >= 1 && ans <= 4)) { ok = false; App.toast(`第 ${lineNo} 行答案序号应为 1-4`, 'error'); return; }
      questions.push({ id: 'tqp' + Date.now() + lineNo, type: 'choice', prompt: p[0], options: p.slice(1, 5), answer: ans - 1, explain: p[6] || '' });
    });
    if (!ok) return;
    if (!questions.length) return App.toast('请至少添加一道题目', 'error');
    S.addQuiz(title, document.getElementById('nq-desc').value.trim(), questions);
    App.closeModal(); App.toast('测验已创建', 'success'); App.rerender();
  };
  App.act.delQuiz = function (id) { S.deleteQuiz(id); App.toast('已删除'); App.rerender(); };

  // ----- 阅读管理 -----
  function renderReadings(el) {
    const rows = S.db.readings.map(r => `
      <div class="list-item">
        <div class="li-icon" style="background:var(--green-soft)">📗</div>
        <div class="li-body">
          <div class="li-title">${h(r.title)} <span class="tag tag-gray" style="margin-left:4px">${h(r.level || '')}</span></div>
          <div class="li-sub">${h(r.desc || '')} · ${r.text.length} 段</div>
        </div>
        <button class="btn btn-danger btn-sm" onclick="App.act.delReading('${r.id}')">删除</button>
      </div>`).join('');
    el.innerHTML = `
      <div class="content-toolbar"><button class="btn btn-primary" onclick="App.act.newReading()">＋ 新建阅读</button></div>
      <div class="card">${rows || '<div class="empty">暂无阅读材料</div>'}</div>`;
  }
  App.act.newReading = function () {
    App.modal(`
      <div class="modal-head"><div class="modal-title">新建阅读材料</div><button class="modal-close" onclick="App.closeModal()">✕</button></div>
      <div class="field"><label class="label">标题</label><input class="input" id="nr-title" placeholder="如：My School Life"></div>
      <div class="field"><label class="label">难度</label><input class="input" id="nr-level" placeholder="如：A2 / B1"></div>
      <div class="import-box">正文按段落输入，<b>空一行</b>分段。常用词会自动高亮，学生点击即可查词并加入生词本。</div>
      <textarea class="textarea" id="nr-text" rows="8" placeholder="第一段内容...

第二段内容..."></textarea>
      <div class="modal-foot">
        <button class="btn btn-ghost" onclick="App.closeModal()">取消</button>
        <button class="btn btn-primary" onclick="App.act.saveNewReading()">发布</button>
      </div>`);
  };
  App.act.saveNewReading = function () {
    const title = document.getElementById('nr-title').value.trim();
    if (!title) return App.toast('请填写标题', 'error');
    const text = document.getElementById('nr-text').value.trim();
    if (!text) return App.toast('请填写正文', 'error');
    const paras = text.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
    S.addReading(title, document.getElementById('nr-level').value.trim() || 'B1', paras);
    App.closeModal(); App.toast('阅读已发布', 'success'); App.rerender();
  };
  App.act.delReading = function (id) { S.deleteReading(id); App.toast('已删除'); App.rerender(); };

  // ----- 语法管理 -----
  function renderGrammarManage(el) {
    const rows = S.db.grammar.map(g => {
      const p = S.db.grammarProgress[g.id];
      return `<div class="list-item">
        <div class="li-icon" style="background:var(--primary-soft)">${g.icon || '📐'}</div>
        <div class="li-body">
          <div class="li-title">${h(g.title)} <span class="tag tag-gray" style="margin-left:4px">${h(g.level || '')}</span></div>
          <div class="li-sub">${h(g.summary || '')} · ${g.sections.length} 节讲解 · ${g.exercises.length} 题练习</div>
        </div>
        ${p && p.done ? '<span class="tag tag-green">已掌握</span>' : ''}
        <button class="btn btn-danger btn-sm" onclick="App.act.delGrammar('${g.id}')">删除</button>
      </div>`;
    }).join('');
    el.innerHTML = `
      <div class="content-toolbar"><button class="btn btn-primary" onclick="App.act.newGrammar()">＋ 新建语法课</button></div>
      <div class="card">${rows || '<div class="empty">暂无语法课</div>'}</div>`;
  }
  App.act.newGrammar = function () {
    const tpl = {
      title: '新课标题', level: '零基础', icon: '📐', summary: '课程简介',
      sections: [{ h: '小节标题', body: '讲解正文', examples: [{ en: 'Example sentence.', zh: '例句翻译。' }] }],
      tips: ['小贴士1'],
      exercises: [{ type: 'choice', prompt: '题干', options: ['A', 'B', 'C', 'D'], answer: 0, explain: '解析' }]
    };
    App.modal(`
      <div class="modal-head"><div class="modal-title">新建语法课</div><button class="modal-close" onclick="App.closeModal()">✕</button></div>
      <div class="import-box">直接编辑 JSON。exercises 支持 choice（选择题）和 fill（填空题，answer 为字符串，多个答案用 | 分隔）。</div>
      <textarea class="textarea" id="ng-json" rows="14" style="font-family:monospace;font-size:12px">${h(JSON.stringify(tpl, null, 2))}</textarea>
      <div class="modal-foot">
        <button class="btn btn-ghost" onclick="App.closeModal()">取消</button>
        <button class="btn btn-primary" onclick="App.act.saveNewGrammar()">创建</button>
      </div>`);
  };
  App.act.saveNewGrammar = function () {
    let obj;
    try { obj = JSON.parse(document.getElementById('ng-json').value); }
    catch (e) { return App.toast('JSON 格式错误：' + e.message, 'error'); }
    if (!obj.title || !obj.sections || !obj.exercises) return App.toast('缺少必要字段：title / sections / exercises', 'error');
    S.addGrammar(obj);
    App.closeModal(); App.toast('语法课已创建', 'success'); App.rerender();
  };
  App.act.delGrammar = function (id) {
    const g = S.grammarById(id);
    App.modal(`
      <div class="modal-head"><div class="modal-title">删除语法课</div><button class="modal-close" onclick="App.closeModal()">✕</button></div>
      <div>确定删除「${h(g.title)}」吗？该操作不可恢复。</div>
      <div class="modal-foot">
        <button class="btn btn-ghost" onclick="App.closeModal()">取消</button>
        <button class="btn btn-danger" onclick="App.act.delGrammarOk('${id}')">删除</button>
      </div>`);
  };
  App.act.delGrammarOk = function (id) { S.deleteGrammar(id); App.closeModal(); App.toast('已删除'); App.rerender(); };

  // ----- 作文管理 -----
  function renderWritingManage(el) {
    const rows = S.db.writings.map(w => {
      const p = S.db.writingProgress[w.id];
      return `<div class="list-item">
        <div class="li-icon" style="background:var(--primary-soft)">${w.icon || '✍️'}</div>
        <div class="li-body">
          <div class="li-title">${h(w.title)} <span class="tag tag-gray" style="margin-left:4px">${h(w.level || '')}</span></div>
          <div class="li-sub">${h(w.summary || '')} · ${w.patterns.length} 句型 · ${w.guided.length} 仿写空</div>
        </div>
        ${p && p.done ? '<span class="tag tag-green">已完成</span>' : ''}
        <button class="btn btn-danger btn-sm" onclick="App.act.delWriting('${w.id}')">删除</button>
      </div>`;
    }).join('');
    el.innerHTML = `
      <div class="content-toolbar"><button class="btn btn-primary" onclick="App.act.newWriting()">＋ 新建作文课</button></div>
      <div class="card">${rows || '<div class="empty">暂无作文课</div>'}</div>`;
  }
  App.act.newWriting = function () {
    const tpl = {
      title: '新课标题', level: '零基础', icon: '✍️', summary: '课程简介',
      points: ['写作思路1', '写作思路2'],
      patterns: [{ en: 'Pattern sentence.', zh: '句型翻译。' }],
      sample: ['范文段落1'], sampleZh: ['范文译文1'],
      guided: [{ prompt: '仿写提示', answer: '答案', zh: '译文' }]
    };
    App.modal(`
      <div class="modal-head"><div class="modal-title">新建作文课</div><button class="modal-close" onclick="App.closeModal()">✕</button></div>
      <div class="import-box">直接编辑 JSON。sample 和 sampleZh 段落数量需一致；guided 的 answer 多个答案用 | 分隔。</div>
      <textarea class="textarea" id="nw-json" rows="14" style="font-family:monospace;font-size:12px">${h(JSON.stringify(tpl, null, 2))}</textarea>
      <div class="modal-foot">
        <button class="btn btn-ghost" onclick="App.closeModal()">取消</button>
        <button class="btn btn-primary" onclick="App.act.saveNewWriting()">创建</button>
      </div>`);
  };
  App.act.saveNewWriting = function () {
    let obj;
    try { obj = JSON.parse(document.getElementById('nw-json').value); }
    catch (e) { return App.toast('JSON 格式错误：' + e.message, 'error'); }
    if (!obj.title || !obj.points || !obj.sample || !obj.guided) return App.toast('缺少必要字段：title / points / sample / guided', 'error');
    S.addWriting(obj);
    App.closeModal(); App.toast('作文课已创建', 'success'); App.rerender();
  };
  App.act.delWriting = function (id) {
    const w = S.writingById(id);
    App.modal(`
      <div class="modal-head"><div class="modal-title">删除作文课</div><button class="modal-close" onclick="App.closeModal()">✕</button></div>
      <div>确定删除「${h(w.title)}」吗？该操作不可恢复。</div>
      <div class="modal-foot">
        <button class="btn btn-ghost" onclick="App.closeModal()">取消</button>
        <button class="btn btn-danger" onclick="App.act.delWritingOk('${id}')">删除</button>
      </div>`);
  };
  App.act.delWritingOk = function (id) { S.deleteWriting(id); App.closeModal(); App.toast('已删除'); App.rerender(); };

  // ----- 学情数据 -----
  function renderData(el) {
    const st = S.stats();
    const attempts = S.db.attempts.slice(-8).reverse();
    const quizName = id => { const q = S.db.quizzes.find(x => x.id === id); return q ? q.title : '错题重练'; };
    const attemptRows = attempts.map(a => {
      const pct = a.total ? Math.round(a.correct / a.total * 100) : 0;
      return `<div class="list-item">
        <div class="li-icon" style="background:var(--blue-soft)">📄</div>
        <div class="li-body">
          <div class="li-title">${h(quizName(a.quizId))}</div>
          <div class="li-sub">${a.date}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:750;color:${pct >= 80 ? 'var(--green)' : pct >= 60 ? 'var(--accent)' : 'var(--red)'}">${a.correct}/${a.total}</div>
          <div class="tiny">正确率 ${pct}%</div>
        </div>
      </div>`;
    }).join('') || '<div class="empty">暂无测验记录</div>';

    const wrongRows = S.db.wrongbook.filter(w => !w.resolved).slice(-10).reverse().map(w => {
      const q = S.questionById(w.quizId, w.questionId);
      return `<div class="wrong-item">
        <span class="tag tag-red">×${w.times}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:14px">${h(q ? q.prompt.slice(0, 40) : '题目已删除')}</div>
          <div class="tiny">${w.date} · ${h(quizName(w.quizId))}</div>
        </div>
      </div>`;
    }).join('') || '<div class="empty">没有待清理的错题 🎉</div>';

    const bookRows = S.db.wordbooks.filter(b => !b.vocab).map(b => {
      const p = S.bookProgress(b.id);
      return `<div class="list-item">
        <div class="li-body">
          <div class="li-title">${h(b.name)}</div>
          <div class="progress" style="margin-top:6px"><div class="progress-bar" style="width:${p.total ? p.learned / p.total * 100 : 0}%"></div></div>
        </div>
        <div class="tiny">${p.learned}/${p.total}</div>
      </div>`;
    }).join('');

    const grammarDone = S.db.grammar.filter(g => { const p = S.db.grammarProgress[g.id]; return p && p.done; }).length;
    const grammarRows = S.db.grammar.map(g => {
      const p = S.db.grammarProgress[g.id];
      const pct = p ? p.best : null;
      return `<div class="list-item">
        <div class="li-icon" style="background:var(--primary-soft)">${g.icon || '📐'}</div>
        <div class="li-body">
          <div class="li-title">${h(g.title)}</div>
          <div class="li-sub">${h(g.level)}</div>
        </div>
        <div style="text-align:right">
          ${p && p.done ? '<span class="tag tag-green">已掌握</span>' : (pct != null ? `<span class="tag tag-amber">${pct}%</span>` : '<span class="tag tag-gray">未学</span>')}
        </div>
      </div>`;
    }).join('');

    const writingDone = S.db.writings.filter(w => { const p = S.db.writingProgress[w.id]; return p && p.done; }).length;
    const writingRows = S.db.writings.map(w => {
      const p = S.db.writingProgress[w.id];
      return `<div class="list-item">
        <div class="li-icon" style="background:var(--primary-soft)">${w.icon || '✍️'}</div>
        <div class="li-body">
          <div class="li-title">${h(w.title)}</div>
          <div class="li-sub">${h(w.level)}${p && p.draft ? ' · 有草稿' : ''}</div>
        </div>
        <div style="text-align:right">
          ${p && p.done ? '<span class="tag tag-green">已完成</span>' : (p && p.draft ? '<span class="tag tag-amber">草稿中</span>' : '<span class="tag tag-gray">未写</span>')}
        </div>
      </div>`;
    }).join('');

    el.innerHTML = `
      ${(App.isTeacherOnline && App.isTeacherOnline()) ? '<div class="card" style="margin-bottom:16px"><div class="card-title">🏫 全班学情</div><div id="class-data"></div></div>' : ''}
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-num">${st.learned}</div><div class="stat-label">累计学习单词</div></div>
        <div class="stat-card"><div class="stat-num green">${st.mastered}</div><div class="stat-label">已掌握</div></div>
        <div class="stat-card"><div class="stat-num">${grammarDone}/${S.db.grammar.length}</div><div class="stat-label">语法课</div></div>
        <div class="stat-card"><div class="stat-num">${writingDone}/${S.db.writings.length}</div><div class="stat-label">作文课</div></div>
        <div class="stat-card"><div class="stat-num">${st.checkinTotal}</div><div class="stat-label">打卡天数</div></div>
        <div class="stat-card"><div class="stat-num ${st.wrongCount ? 'red' : ''}">${st.wrongCount}</div><div class="stat-label">待清理错题</div></div>
      </div>
      <div class="card" style="margin-top:16px"><div class="card-title">📖 词库学习进度</div>${bookRows || '<div class="empty">暂无词库</div>'}</div>
      <div class="card" style="margin-top:16px"><div class="card-title">📐 语法学习进度</div>${grammarRows || '<div class="empty">暂无语法课</div>'}</div>
      <div class="card" style="margin-top:16px"><div class="card-title">✍️ 作文学习进度</div>${writingRows || '<div class="empty">暂无作文课</div>'}</div>
      <div class="card" style="margin-top:16px"><div class="card-title">📄 最近测验记录</div>${attemptRows}</div>
      <div class="card" style="margin-top:16px"><div class="card-title">❌ 错题榜（易错题）</div>${wrongRows}</div>`;
    const cd = el.querySelector('#class-data');
    if (cd && App.renderClassData) App.renderClassData(cd);
  }
})();
