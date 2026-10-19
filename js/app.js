/* ============ 应用入口：路由 / 导航 / 弹窗 / 朗读 ============ */
window.App = window.App || {};
window.App.session = window.App.session || {};
(function () {
  const S = Store;

  const NAV = [
    { key: 'dashboard', label: '首页', icon: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { key: 'words', label: '单词', icon: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5zM20 18.5H6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { key: 'grammar', label: '语法', icon: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 7h6M9 11h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' },
    { key: 'writing', label: '作文', icon: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { key: 'quiz', label: '练习', icon: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="m14.5 4.5 5 5L8 21H3v-5L14.5 4.5zM12.5 6.5l5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { key: 'reading', label: '阅读', icon: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 6.5C10.5 5 8.5 4 5.5 4H3v14h3c2.5 0 4.5 1 6 2 1.5-1 3.5-2 6-2h3V4h-2.5c-3 0-5 1-6.5 2.5zM12 6.5V20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { key: 'plan', label: '打卡', icon: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19V6.5zM8 3v4M16 3v4M4 10h16M9 15l2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { key: 'teacher', label: '管理', icon: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M4 6h16M4 12h16M4 18h10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="18" cy="18" r="2.4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>' }
  ];
  const TITLES = { dashboard: '首页', words: '单词学习', grammar: '语法学习', writing: '作文学习', quiz: '练习测验', reading: '阅读', plan: '打卡计划', teacher: '老师管理' };

  App.route = { view: 'dashboard', params: null };

  // ---------- 路由 ----------
  App.go = function (view, params) {
    if (view === 'teacher' && S.db.role !== 'teacher') view = 'dashboard';
    if (!Views[view]) view = 'dashboard';
    App.route = { view, params: params || null };
    render();
  };
  App.rerender = function () { render(); };

  function render() {
    closeDrawer();
    const { view, params } = App.route;
    // 导航高亮
    document.querySelectorAll('#nav-desktop .nav-item, #nav-bottom .bn-item, #drawer-nav .nav-item')
      .forEach(n => n.classList.toggle('active', n.dataset.key === view));
    document.getElementById('topbar-title').textContent = TITLES[view] || view;
    document.getElementById('streak-num').textContent = S.streak();
    // 渲染视图
    const el = document.getElementById('view');
    el.innerHTML = '';
    Views[view](el, params);
    window.scrollTo(0, 0);
  }

  // ---------- 导航 ----------
  function buildNav() {
    const role = S.db.role;
    const items = NAV.filter(n => n.key !== 'teacher' || role === 'teacher');
    document.getElementById('nav-desktop').innerHTML = items.map(n =>
      `<div class="nav-item" data-key="${n.key}" onclick="App.go('${n.key}')">${n.icon}<span>${n.label}</span></div>`).join('');
    document.getElementById('nav-bottom').innerHTML = items.map(n =>
      `<div class="bn-item" data-key="${n.key}" onclick="App.go('${n.key}')">${n.icon}<span>${n.label}</span></div>`).join('');
    // 角色切换
    const rs = `<button class="role-btn ${role === 'student' ? 'active' : ''}" onclick="App.setRole('student')">🎒 学生端</button>
                <button class="role-btn ${role === 'teacher' ? 'active' : ''}" onclick="App.setRole('teacher')">👩‍🏫 老师端</button>`;
    document.getElementById('role-switch').innerHTML = rs;
    document.getElementById('role-switch-top').innerHTML = rs;
  }
  App.setRole = function (r) {
    S.setRole(r);
    App.toast(r === 'teacher' ? '已切换到老师端' : '已切换到学生端');
    buildNav();
    App.go(r === 'teacher' ? 'teacher' : 'dashboard');
  };

  // ---------- 移动端抽屉 ----------
  document.getElementById('btn-menu').addEventListener('click', openDrawer);
  function openDrawer() {
    if (document.getElementById('drawer-mask')) return;
    const role = S.db.role;
    const items = NAV.filter(n => n.key !== 'teacher' || role === 'teacher');
    const mask = document.createElement('div');
    mask.className = 'drawer-mask'; mask.id = 'drawer-mask';
    mask.onclick = closeDrawer;
    const drawer = document.createElement('div');
    drawer.className = 'drawer'; drawer.id = 'drawer';
    drawer.innerHTML = `
      <div class="logo">
        <div class="logo-icon">🎓</div>
        <div class="logo-text"><div class="logo-name">EnglishHub</div><div class="logo-sub">英语学园</div></div>
      </div>
      <nav class="nav" id="drawer-nav">
        ${items.map(n => `<div class="nav-item" data-key="${n.key}" onclick="App.go('${n.key}')">${n.icon}<span>${n.label}</span></div>`).join('')}
      </nav>
      <div class="sidebar-foot"><div class="role-switch">
        <button class="role-btn ${role === 'student' ? 'active' : ''}" onclick="App.setRole('student')">🎒 学生端</button>
        <button class="role-btn ${role === 'teacher' ? 'active' : ''}" onclick="App.setRole('teacher')">👩‍🏫 老师端</button>
      </div></div>`;
    document.body.appendChild(mask);
    document.body.appendChild(drawer);
  }
  function closeDrawer() {
    const m = document.getElementById('drawer-mask');
    const d = document.getElementById('drawer');
    if (m) m.remove(); if (d) d.remove();
  }

  // ---------- Toast ----------
  App.toast = function (msg, type) {
    const root = document.getElementById('toast-root');
    const t = document.createElement('div');
    t.className = 'toast' + (type ? ' ' + type : '');
    t.textContent = msg;
    root.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; }, 1900);
    setTimeout(() => t.remove(), 2300);
  };

  // ---------- 弹窗 ----------
  App.modal = function (html) {
    const root = document.getElementById('modal-root');
    root.innerHTML = `<div class="modal-mask" onclick="if(event.target===this)App.closeModal()">
      <div class="modal">${html}</div></div>`;
  };
  App.closeModal = function () { document.getElementById('modal-root').innerHTML = ''; };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') App.closeModal(); });

  // ---------- 朗读 ----------
  App.speak = function (text) {
    try {
      if (!window.speechSynthesis) throw 0;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; u.rate = 0.85;
      speechSynthesis.speak(u);
    } catch (e) { App.toast('当前浏览器不支持语音朗读'); }
  };

  // ---------- 启动 ----------
  buildNav();
  App.go('dashboard');
  // 启动时异步拉取老师发布的共享内容（不阻塞首屏，离线时静默跳过）
  if (typeof App.syncPullContent === 'function') App.syncPullContent();
})();
