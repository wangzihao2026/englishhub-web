/* ============ 账号登录 / 云端同步（离线优先，任何失败静默降级） ============ */
window.App = window.App || { session: {} };
App.session = App.session || {};
App.act = App.act || {};
(function () {
  const AUTH_KEY = 'englishhub_auth';
  const h = App.h;

  let auth = null;
  try { auth = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null'); } catch (e) { auth = null; }
  function saveAuth(a) {
    auth = a;
    try {
      if (a) localStorage.setItem(AUTH_KEY, JSON.stringify(a));
      else localStorage.removeItem(AUTH_KEY);
    } catch (e) { }
  }

  // ---------- 基础请求（3 秒超时，永不抛出未捕获异常） ----------
  function api(path, opts) {
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let ctrl = null;
      try { ctrl = new AbortController(); } catch (e) { }
      const timer = setTimeout(() => { try { ctrl && ctrl.abort(); } catch (e) { } reject(new Error('请求超时')); }, 3000);
      const headers = { 'Content-Type': 'application/json' };
      if (auth && auth.token) headers['Authorization'] = 'Bearer ' + auth.token;
      fetch(location.origin + path, {
        method: opts.method || 'GET',
        headers,
        body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
        signal: ctrl ? ctrl.signal : undefined
      }).then(res => {
        res.json().then(json => {
          clearTimeout(timer);
          if (!json || json.ok === false) reject(new Error((json && json.error) || ('请求失败（' + res.status + '）')));
          else resolve(json);
        }, () => { clearTimeout(timer); reject(new Error('服务器返回异常')); });
      }, () => { clearTimeout(timer); reject(new Error('服务器不可用')); });
    });
  }

  // ---------- 顶栏账号按钮 ----------
  function renderAccountBtn() {
    const wrap = document.getElementById('account-btn-wrap');
    if (!wrap) return;
    wrap.innerHTML = auth
      ? `<button class="btn btn-ghost btn-sm" onclick="App.act.openAccount()">👤 ${h(auth.username)}</button>`
      : `<button class="btn btn-ghost btn-sm" onclick="App.act.openAccount()">👤 登录</button>`;
  }
  App.renderAccountBtn = renderAccountBtn;

  App.act.openAccount = function () {
    if (auth) showAccountModal();
    else showAuthModal('login');
  };

  // ---------- 登录 / 注册弹窗 ----------
  function showAuthModal(tab) {
    App.modal(`
      <div class="modal-head"><div class="modal-title">账号</div><button class="modal-close" onclick="App.closeModal()">✕</button></div>
      <div class="tabs">
        <div class="tab ${tab === 'login' ? 'active' : ''}" onclick="App.act.authTab('login')">登录</div>
        <div class="tab ${tab === 'register' ? 'active' : ''}" onclick="App.act.authTab('register')">注册</div>
      </div>
      <div class="field"><label class="label">用户名</label><input class="input" id="au-name" placeholder="2-20 个字符" maxlength="20"></div>
      <div class="field"><label class="label">密码</label><input class="input" id="au-pass" type="password" placeholder="至少 4 位"></div>
      ${tab === 'register' ? `<div class="field"><label class="label">角色</label>
        <select class="select" id="au-role" style="width:100%">
          <option value="student">🎒 学生</option>
          <option value="teacher">👩‍🏫 老师</option>
        </select></div>` : ''}
      <div class="modal-foot">
        <button class="btn btn-ghost" onclick="App.closeModal()">取消</button>
        <button class="btn btn-primary" onclick="App.act.${tab === 'login' ? 'doLogin' : 'doRegister'}()">${tab === 'login' ? '登录' : '注册并登录'}</button>
      </div>`);
  }
  App.act.authTab = function (tab) { showAuthModal(tab); };

  function fieldVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  App.act.doLogin = function () {
    const username = fieldVal('au-name'), password = fieldVal('au-pass');
    if (!username || !password) return App.toast('请填写用户名和密码', 'error');
    api('/api/login', { method: 'POST', body: { username, password } })
      .then(r => {
        saveAuth({ token: r.token, username: r.username, role: r.role });
        renderAccountBtn();
        App.closeModal();
        afterLogin();
      })
      .catch(e => App.toast(e.message || '登录失败', 'error'));
  };

  App.act.doRegister = function () {
    const username = fieldVal('au-name'), password = fieldVal('au-pass');
    const roleEl = document.getElementById('au-role');
    const role = roleEl ? roleEl.value : 'student';
    if (username.length < 2 || username.length > 20) return App.toast('用户名需为 2-20 个字符', 'error');
    if (password.length < 4) return App.toast('密码至少 4 位', 'error');
    api('/api/register', { method: 'POST', body: { username, password, role } })
      .then(r => {
        saveAuth({ token: r.token, username: r.username, role: r.role });
        renderAccountBtn();
        App.closeModal();
        afterLogin();
      })
      .catch(e => App.toast(e.message || '注册失败', 'error'));
  };

  // ---------- 已登录账号弹窗 ----------
  function showAccountModal() {
    App.modal(`
      <div class="modal-head"><div class="modal-title">账号</div><button class="modal-close" onclick="App.closeModal()">✕</button></div>
      <div class="field"><label class="label">用户名</label><div style="font-weight:650">${h(auth.username)}</div></div>
      <div class="field"><label class="label">角色</label><div>${auth.role === 'teacher' ? '👩‍🏫 老师' : '🎒 学生'}</div></div>
      <div class="modal-foot">
        <button class="btn btn-ghost" onclick="App.act.doLogout()">退出登录</button>
        <button class="btn btn-primary" onclick="App.act.syncNow()">🔄 立即同步</button>
      </div>`);
  }

  App.act.doLogout = function () {
    api('/api/logout', { method: 'POST' }).catch(() => { });
    saveAuth(null);
    renderAccountBtn();
    App.closeModal();
    App.toast('已退出登录');
  };

  // ---------- 数据同步 ----------
  function pushDb() {
    if (!auth) return Promise.reject(new Error('未登录'));
    return api('/api/sync', { method: 'POST', body: Store.db });
  }

  function applyCloudDb(db) {
    try {
      Store.importData(JSON.stringify(db));
      App.rerender();
    } catch (e) { }
  }

  function afterLogin() {
    api('/api/sync')
      .then(r => {
        if (r.db) { applyCloudDb(r.db); return null; }
        return pushDb().catch(() => { }); // 云端无数据：把本地推上去
      })
      .catch(() => { })
      .then(() => pullContent())
      .then(() => App.toast('已登录，数据已同步', 'success'));
  }

  App.act.syncNow = function () {
    if (!auth) return;
    pushDb()
      .then(() => api('/api/sync'))
      .then(r => { if (r.db) applyCloudDb(r.db); })
      .then(() => pullContent())
      .then(() => App.toast('同步完成', 'success'))
      .catch(e => App.toast('同步失败：' + (e.message || '服务器不可用'), 'error'));
  };

  // 自动推送：Store.save 钩子，防抖 1.5 秒
  let pushTimer = null;
  Store._afterSave = function () {
    if (!auth) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(() => { pushDb().catch(() => { }); }, 1500);
  };

  // ---------- 共享教学内容（老师发布 → 学生合并，生词本除外） ----------
  function mergeContent(c) {
    if (!c || typeof c !== 'object') return;
    const db = Store.db;
    const merge = (list, items) => {
      if (!Array.isArray(list) || !Array.isArray(items)) return;
      items.forEach(item => {
        if (!item || item.id == null || item.id === 'vocab') return;
        const copy = JSON.parse(JSON.stringify(item));
        const i = list.findIndex(x => x.id === item.id);
        if (i >= 0) list[i] = copy;
        else list.push(copy);
      });
    };
    merge(db.wordbooks, c.books);
    merge(db.quizzes, c.quizzes);
    merge(db.readings, c.readings);
    Store.save();
  }
  function pullContent() {
    return api('/api/content')
      .then(r => { mergeContent(r.content); })
      .catch(() => { });
  }
  App.syncPullContent = function () {
    pullContent().then(() => {
      // 合并到本地后若当前视图受影响则刷新（首屏异步不阻塞）
      try { App.rerender(); } catch (e) { }
    });
  };

  // ---------- 老师：发布内容到班级 ----------
  App.act.publishContent = function () {
    if (!auth || auth.role !== 'teacher') return App.toast('请先以老师身份登录', 'error');
    const db = Store.db;
    const body = {
      books: db.wordbooks.filter(b => !b.vocab),
      quizzes: db.quizzes,
      readings: db.readings
    };
    api('/api/content', { method: 'POST', body })
      .then(() => App.toast('已发布到班级，学生端将自动获取', 'success'))
      .catch(e => App.toast('发布失败：' + (e.message || '服务器不可用'), 'error'));
  };

  // ---------- 老师：全班学情 ----------
  App.isTeacherOnline = function () { return !!(auth && auth.role === 'teacher'); };
  App.renderClassData = function (container) {
    if (!auth || auth.role !== 'teacher') return;
    container.innerHTML = '<div class="tiny">正在加载全班学情…</div>';
    api('/api/students').then(r => {
      const rows = (r.students || []).map(s => `
        <div class="list-item">
          <div class="li-icon" style="background:var(--blue-soft)">🎒</div>
          <div class="li-body">
            <div class="li-title">${h(s.username)}</div>
            <div class="li-sub">已学 ${s.learned} · 掌握 ${s.mastered} · 语法 ${s.grammarDone}/${s.grammarTotal} · 作文 ${s.writingDone}/${s.writingTotal} · 连续打卡 ${s.streak} 天 · 正确率 ${s.accuracy == null ? '—' : s.accuracy + '%'} · 最近活跃 ${h(s.lastActive || '—')}</div>
          </div>
        </div>`).join('') || '<div class="empty">暂无学生数据</div>';
      container.innerHTML = rows;
    }).catch(() => {
      container.innerHTML = '<div class="tiny">服务器不可用，仅显示本机数据</div>';
    });
  };

  renderAccountBtn();
})();
