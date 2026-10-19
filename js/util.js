/* ============ 公共助手 ============ */
window.App = window.App || { session: {} };
App.session = App.session || {};
App.act = App.act || {};

// HTML 文本转义
App.h = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// 内联 onclick 字符串参数：先 JS 转义再 HTML 转义
App.jsq = s => App.h(String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"));
