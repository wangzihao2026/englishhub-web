/* ============ 视图：语法学习 / 作文学习 ============ */
window.Views = window.Views || {};
window.App = window.App || { session: {} };
App.session = App.session || {};
App.act = App.act || {};
(function () {
  const S = Store;
  const h = App.h;
  // 用于内联 onclick 中的字符串参数（定义见 util.js）
  const jsq = App.jsq;

  // ================= 语法学习 =================
  Views.grammar = function (el, params) {
    const id = params && params.id;
    if (id) { renderGrammarLesson(el, id); return; }
    renderGrammarList(el);
  };

  // ----- 语法列表 -----
  function renderGrammarList(el) {
    const levels = ['零基础', '小学', '七年级', '八年级', '九年级', '初中核心', '初中进阶', '初中拓展'];
    const levelIcons = { '零基础': '🌱', '小学': '🌻', '七年级': '🍎', '八年级': '🚲', '九年级': '🎓', '初中核心': '📘', '初中进阶': '🚀', '初中拓展': '⭐' };
    const groups = levels.map(lv => ({
      level: lv,
      items: S.db.grammar.filter(g => g.level === lv)
    })).filter(g => g.items.length);

    el.innerHTML = `
      <div class="card" style="margin-bottom:16px">
        <div class="result-hero">
          <div style="font-size:52px">📐</div>
          <div style="font-size:18px;font-weight:750;margin:8px 0 4px">语法学习</div>
          <div class="muted">从字母拼读到时态运用，循序渐进打好基础</div>
        </div>
      </div>
      <div class="card" style="margin-bottom:16px">
        <div class="card-title">🎯 零基础学习路径</div>
        <div class="tiny" style="line-height:2">
          字母拼读 → be 动词 → 人称代词 → 名词单复数 → 冠词 → 一般现在时 → 现在进行时 → 一般过去时 → 一般将来时 → 比较级与最高级<br>
          小学组（There be / can / 疑问句 / 祈使句）配套「小学必备词汇」；七/八/九年级组（do/does、频度副词、should、to do、不规则动词、定语从句等）配套「人教课本必备词汇」；初中拓展组（动名词 / 完成时 / 从句 / 被动语态）配套「初中课标必备词汇」。学完语法去词库同步背单词效果更好。<br>
          建议按顺序学习，每课学完做练习巩固，正确率 60% 以上即算掌握。
        </div>
      </div>
      ${groups.map(g => `
        <div class="card" style="margin-bottom:16px">
          <div class="card-title">${levelIcons[g.level] || '📐'} ${g.level}</div>
          ${g.items.map(item => {
      const p = S.db.grammarProgress[item.id];
      const done = p && p.done;
      const best = p ? p.best : null;
      return `
              <div class="list-item" onclick="App.go('grammar',{id:'${item.id}'})" style="cursor:pointer">
                <div class="li-icon" style="background:var(--primary-soft)">${item.icon || '📐'}</div>
                <div class="li-body">
                  <div class="li-title">${h(item.title)} ${done ? '<span class="tag tag-green" style="margin-left:6px">已掌握</span>' : ''}</div>
                  <div class="tiny">${h(item.summary)}</div>
                </div>
                <div class="tiny">${best != null ? best + '%' : ''}</div>
              </div>`;
    }).join('')}
        </div>`).join('')}
      <div style="height:16px"></div>`;
  }

  // ----- 语法课程详情 -----
  function renderGrammarLesson(el, id) {
    const g = S.grammarById(id);
    if (!g) { el.innerHTML = '<div class="card"><div class="empty">课程不存在</div></div>'; return; }
    const p = S.db.grammarProgress[id];
    const exAnswers = (App.session.gramEx && App.session.gramEx.id === id) ? App.session.gramEx.answers : null;

    el.innerHTML = `
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <button class="btn btn-ghost btn-sm" onclick="App.go('grammar')">← 返回列表</button>
          <span class="tag tag-gray">${h(g.level)}</span>
          ${p && p.done ? '<span class="tag tag-green">已掌握</span>' : ''}
        </div>
        <div class="card-title" style="font-size:20px">${g.icon || '📐'} ${h(g.title)}</div>
        <div class="tiny">${h(g.summary)}</div>
      </div>

      ${g.sections.map((sec, si) => `
        <div class="card" style="margin-bottom:16px">
          <div class="card-title">${si + 1}. ${h(sec.h)}</div>
          <div class="tiny" style="line-height:2;white-space:pre-line;margin-bottom:12px">${h(sec.body)}</div>
          ${sec.examples && sec.examples.length ? `
            <div style="background:var(--bg);border-radius:12px;padding:12px 14px">
              ${sec.examples.map(ex => `
                <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:8px">
                  <button class="btn btn-ghost btn-sm" style="flex:none;padding:4px 8px" onclick="App.speak('${jsq(ex.en)}')">🔊</button>
                  <div>
                    <div style="font-weight:600">${h(ex.en)}</div>
                    <div class="tiny">${h(ex.zh)}</div>
                  </div>
                </div>`).join('')}
            </div>` : ''}
        </div>`).join('')}

      ${g.tips && g.tips.length ? `
        <div class="card" style="margin-bottom:16px">
          <div class="card-title">💡 小贴士</div>
          ${g.tips.map(t => `<div class="tiny" style="line-height:2">· ${h(t)}</div>`).join('')}
        </div>` : ''}

      <div class="card" style="margin-bottom:16px">
        <div class="card-title">✏️ 巩固练习（${g.exercises.length} 题）</div>
        <div id="gram-ex-body">
          ${g.exercises.map((q, qi) => `
            <div style="margin-bottom:20px" id="gq-${qi}">
              <div style="font-weight:600;margin-bottom:10px">${qi + 1}. ${h(q.prompt)}</div>
              ${q.type === 'choice' ? `
                <div style="display:flex;flex-direction:column;gap:8px">
                  ${q.options.map((opt, oi) => `
                    <button class="option ${exAnswers && exAnswers[qi] !== undefined ? (oi === q.answer ? 'correct' : (oi === exAnswers[qi] ? 'wrong' : '')) : ''}"
                      onclick="App.act.gramChoice(${qi},${oi})" ${exAnswers ? 'disabled' : ''}>
                      <span class="opt-key">${String.fromCharCode(65 + oi)}</span>
                      <span>${h(opt)}</span>
                    </button>`).join('')}
                </div>` : `
                <div>
                  <input class="spell-input" id="gf-${qi}" placeholder="输入答案后回车" autocomplete="off"
                    value="${exAnswers && exAnswers[qi] !== undefined ? h(exAnswers[qi]) : ''}"
                    ${exAnswers ? 'disabled' : ''}
                    onkeydown="if(event.key==='Enter')App.act.gramFill(${qi})">
                </div>`}
              ${exAnswers && exAnswers[qi] !== undefined ? `
                <div class="q-explain" style="margin-top:8px">
                  ${q.type === 'choice'
          ? (exAnswers[qi] === q.answer ? '✅ 回答正确' : '❌ 正确答案：' + h(q.options[q.answer]))
          : (gramFillCorrect(q, exAnswers[qi]) ? '✅ 回答正确' : '❌ 正确答案：' + h(q.answer.split('|')[0]))}
                  ${q.explain ? '<br>' + h(q.explain) : ''}
                </div>` : ''}
            </div>`).join('')}
        </div>
        ${!exAnswers ? `
          <div class="flash-actions">
            <button class="btn btn-primary btn-lg" onclick="App.act.submitGrammar('${id}')">提交练习</button>
          </div>` : `
          <div class="flash-actions" style="gap:12px">
            <span class="tag ${gramScore(exAnswers, g.exercises) >= 60 ? 'tag-green' : 'tag-amber'}" style="font-size:14px;padding:8px 16px">
              正确率 ${gramScore(exAnswers, g.exercises)}%
            </span>
            <button class="btn btn-ghost" onclick="App.act.retryGrammar('${id}')">重做</button>
            ${gramScore(exAnswers, g.exercises) >= 60 ? '<button class="btn btn-primary" onclick="App.go(\'grammar\')">返回列表</button>' : ''}
          </div>`}
      </div>
      <div style="height:24px"></div>`;
  }

  function gramFillCorrect(q, val) {
    if (val === undefined || val === null) return false;
    const answers = String(q.answer).split('|').map(s => s.trim().toLowerCase());
    return answers.includes(String(val).trim().toLowerCase());
  }
  function gramScore(answers, exercises) {
    let c = 0;
    exercises.forEach((q, i) => {
      if (q.type === 'choice') { if (answers[i] === q.answer) c++; }
      else { if (gramFillCorrect(q, answers[i])) c++; }
    });
    return Math.round(c / exercises.length * 100);
  }

  App.act.gramChoice = function (qi, oi) {
    const id = App.route.params.id;
    if (!App.session.gramEx || App.session.gramEx.id !== id) App.session.gramEx = { id, answers: {} };
    App.session.gramEx.answers[qi] = oi;
    App.rerender();
  };
  App.act.gramFill = function (qi) {
    const id = App.route.params.id;
    const input = document.getElementById('gf-' + qi);
    if (!input) return;
    if (!App.session.gramEx || App.session.gramEx.id !== id) App.session.gramEx = { id, answers: {} };
    App.session.gramEx.answers[qi] = input.value.trim();
    App.rerender();
  };
  App.act.submitGrammar = function (id) {
    const g = S.grammarById(id);
    const ses = App.session.gramEx;
    if (!ses || ses.id !== id) { App.toast('请先作答', 'error'); return; }
    // 未答的题标记为错误
    g.exercises.forEach((q, i) => { if (ses.answers[i] === undefined) ses.answers[i] = q.type === 'choice' ? -1 : ''; });
    const pct = gramScore(ses.answers, g.exercises);
    S.markGrammar(id, pct);
    App.rerender();
    App.toast(pct >= 60 ? '🎉 恭喜掌握本课！' : '继续加油，正确率 60% 以上即算掌握', pct >= 60 ? '' : 'error');
  };
  App.act.retryGrammar = function (id) {
    delete App.session.gramEx;
    App.rerender();
  };

  // ================= 作文学习 =================
  Views.writing = function (el, params) {
    const id = params && params.id;
    if (id) { renderWritingLesson(el, id); return; }
    renderWritingList(el);
  };

  // ----- 作文列表 -----
  function renderWritingList(el) {
    el.innerHTML = `
      <div class="card" style="margin-bottom:16px">
        <div class="result-hero">
          <div style="font-size:52px">✍️</div>
          <div style="font-size:18px;font-weight:750;margin:8px 0 4px">作文学习</div>
          <div class="muted">从仿写到独立写作，一步步学会英语表达</div>
        </div>
      </div>
      <div class="card" style="margin-bottom:16px">
        <div class="card-title">📚 课程列表</div>
        ${S.db.writings.map(w => {
      const p = S.db.writingProgress[w.id];
      const done = p && p.done;
      const hasDraft = p && p.draft && p.draft.trim().length > 0;
      return `
            <div class="list-item" onclick="App.go('writing',{id:'${w.id}'})" style="cursor:pointer">
              <div class="li-icon" style="background:var(--primary-soft)">${w.icon || '✍️'}</div>
              <div class="li-body">
                <div class="li-title">${h(w.title)} ${done ? '<span class="tag tag-green" style="margin-left:6px">已完成</span>' : ''}</div>
                <div class="tiny">${h(w.summary)}${hasDraft ? ' · 有草稿' : ''}</div>
              </div>
              <div class="tiny">${h(w.level)}</div>
            </div>`;
    }).join('')}
      </div>
      <div style="height:16px"></div>`;
  }

  // ----- 作文课程详情 -----
  function renderWritingLesson(el, id) {
    const w = S.writingById(id);
    if (!w) { el.innerHTML = '<div class="card"><div class="empty">课程不存在</div></div>'; return; }
    const p = S.db.writingProgress[id] || { done: false, draft: '' };
    const exAnswers = (App.session.writEx && App.session.writEx.id === id) ? App.session.writEx.answers : null;

    el.innerHTML = `
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <button class="btn btn-ghost btn-sm" onclick="App.go('writing')">← 返回列表</button>
          <span class="tag tag-gray">${h(w.level)}</span>
          ${p.done ? '<span class="tag tag-green">已完成</span>' : ''}
        </div>
        <div class="card-title" style="font-size:20px">${w.icon || '✍️'} ${h(w.title)}</div>
        <div class="tiny">${h(w.summary)}</div>
      </div>

      <div class="card" style="margin-bottom:16px">
        <div class="card-title">🧠 写作思路</div>
        ${w.points.map((pt, i) => `<div class="tiny" style="line-height:2">${i + 1}. ${h(pt)}</div>`).join('')}
      </div>

      <div class="card" style="margin-bottom:16px">
        <div class="card-title">🧰 句型工具箱</div>
        ${w.patterns.map(pt => `
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
            <button class="btn btn-ghost btn-sm" style="flex:none;padding:4px 8px" onclick="App.speak('${jsq(pt.en)}')">🔊</button>
            <div>
              <div style="font-weight:600">${h(pt.en)}</div>
              <div class="tiny">${h(pt.zh)}</div>
            </div>
          </div>`).join('')}
      </div>

      <div class="card" style="margin-bottom:16px">
        <div class="card-title">📖 范文赏析</div>
        ${w.sample.map((para, i) => `
          <div style="margin-bottom:14px">
            <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px">
              <button class="btn btn-ghost btn-sm" style="flex:none;padding:4px 8px" onclick="App.speak('${jsq(para)}')">🔊</button>
              <div style="font-weight:600;line-height:1.8">${h(para)}</div>
            </div>
            <div class="tiny" style="padding-left:36px;line-height:1.8">${h(w.sampleZh[i])}</div>
          </div>`).join('')}
      </div>

      <div class="card" style="margin-bottom:16px">
        <div class="card-title">✏️ 仿写练习（${w.guided.length} 空）</div>
        ${w.guided.map((g, gi) => `
          <div style="margin-bottom:16px" id="wg-${gi}">
            <div class="tiny" style="margin-bottom:6px">${gi + 1}. ${h(g.prompt)}</div>
            <input class="spell-input" id="wf-${gi}" placeholder="输入答案后回车" autocomplete="off"
              value="${exAnswers && exAnswers[gi] !== undefined ? h(exAnswers[gi]) : ''}"
              ${exAnswers ? 'disabled' : ''}
              onkeydown="if(event.key==='Enter')App.act.writFill(${gi})">
            ${exAnswers && exAnswers[gi] !== undefined ? `
              <div class="q-explain" style="margin-top:6px">
                ${writFillCorrect(g, exAnswers[gi]) ? '✅ 正确' : '❌ 参考答案：' + h(g.answer.split('|')[0])}
                ${g.zh ? '<br>' + h(g.zh) : ''}
              </div>` : ''}
          </div>`).join('')}
        ${!exAnswers ? `
          <div class="flash-actions">
            <button class="btn btn-primary btn-lg" onclick="App.act.submitWriting('${id}')">提交仿写</button>
          </div>` : `
          <div class="flash-actions" style="gap:12px">
            <span class="tag ${writScore(exAnswers, w.guided) >= 60 ? 'tag-green' : 'tag-amber'}" style="font-size:14px;padding:8px 16px">
              正确率 ${writScore(exAnswers, w.guided)}%
            </span>
            <button class="btn btn-ghost" onclick="App.act.retryWriting('${id}')">重做</button>
          </div>`}
      </div>

      <div class="card" style="margin-bottom:16px">
        <div class="card-title">📝 我的作文</div>
        <div class="tiny" style="margin-bottom:10px">模仿范文，用上面的句型写一篇自己的作文。写完后可以点击「完成本课」记录进度。</div>
        <textarea class="textarea" id="writing-draft" rows="8" placeholder="开始写作...">${h(p.draft || '')}</textarea>
        <div style="display:flex;align-items:center;gap:12px;margin-top:12px;flex-wrap:wrap">
          <button class="btn btn-ghost" onclick="App.act.saveDraft('${id}')">💾 保存草稿</button>
          <button class="btn btn-ghost" onclick="App.speak(document.getElementById('writing-draft').value)">🔊 朗读</button>
          <span class="tiny" id="draft-count">${(p.draft || '').trim() ? (p.draft || '').trim().split(/\s+/).filter(Boolean).length + ' 词' : '0 词'}</span>
          <span class="spacer"></span>
          ${!p.done ? `<button class="btn btn-primary" onclick="App.act.finishWriting('${id}')">✓ 完成本课</button>` : '<span class="tag tag-green">已完成</span>'}
        </div>
      </div>
      <div style="height:24px"></div>`;

    // 字数统计
    const ta = document.getElementById('writing-draft');
    const cnt = document.getElementById('draft-count');
    if (ta && cnt) {
      ta.addEventListener('input', () => {
        const n = ta.value.trim().split(/\s+/).filter(Boolean).length;
        cnt.textContent = n + ' 词';
      });
    }
  }

  function writFillCorrect(g, val) {
    if (val === undefined || val === null) return false;
    const answers = String(g.answer).split('|').map(s => s.trim().toLowerCase());
    return answers.includes(String(val).trim().toLowerCase());
  }
  function writScore(answers, guided) {
    let c = 0;
    guided.forEach((g, i) => { if (writFillCorrect(g, answers[i])) c++; });
    return Math.round(c / guided.length * 100);
  }

  App.act.writFill = function (gi) {
    const id = App.route.params.id;
    const input = document.getElementById('wf-' + gi);
    if (!input) return;
    if (!App.session.writEx || App.session.writEx.id !== id) App.session.writEx = { id, answers: {} };
    App.session.writEx.answers[gi] = input.value.trim();
    App.rerender();
  };
  App.act.submitWriting = function (id) {
    const w = S.writingById(id);
    const ses = App.session.writEx;
    if (!ses || ses.id !== id) { App.toast('请先作答', 'error'); return; }
    w.guided.forEach((g, i) => { if (ses.answers[i] === undefined) ses.answers[i] = ''; });
    const pct = writScore(ses.answers, w.guided);
    App.rerender();
    App.toast(pct >= 60 ? '👍 仿写完成得不错！' : '继续加油，可以参考范文和句型', pct >= 60 ? '' : 'error');
  };
  App.act.retryWriting = function (id) {
    delete App.session.writEx;
    App.rerender();
  };
  App.act.saveDraft = function (id) {
    const ta = document.getElementById('writing-draft');
    if (!ta) return;
    S.markWriting(id, { draft: ta.value });
    App.toast('草稿已保存');
  };
  App.act.finishWriting = function (id) {
    const ta = document.getElementById('writing-draft');
    if (ta && ta.value.trim()) S.markWriting(id, { draft: ta.value });
    S.markWriting(id, { done: true });
    App.rerender();
    App.toast('🎉 恭喜完成本课！');
  };
})();
