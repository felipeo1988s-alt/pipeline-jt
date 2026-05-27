(function() {
  if (document.getElementById('jt-float-btn')) return;
  var style = document.createElement('style');
  style.textContent = `
    #jt-float-btn{position:fixed;bottom:24px;right:24px;width:52px;height:52px;background:#1565C0;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:999999;box-shadow:0 4px 16px rgba(21,101,192,0.5);font-family:Georgia,serif;font-size:22px;font-weight:700;color:#fff;border:3px solid rgba(255,255,255,0.25);transition:transform 0.15s,box-shadow 0.15s;user-select:none}
    #jt-float-btn:hover{transform:scale(1.1);box-shadow:0 6px 20px rgba(21,101,192,0.7)}
    #jt-panel{position:fixed;bottom:88px;right:24px;width:320px;max-height:86vh;overflow-y:auto;background:#f0f4fc;border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,0.28);z-index:999998;display:none;font-family:Arial,sans-serif}
    .jt-hdr{background:#1565C0;padding:12px 14px;border-radius:14px 14px 0 0;display:flex;align-items:center;justify-content:space-between}
    .jt-logo{color:#fff;font-size:14px;font-weight:700}.jt-logo span{color:#90CAF9}
    .jt-x{color:#90CAF9;font-size:18px;cursor:pointer;background:none;border:none;font-weight:700;line-height:1;padding:0}
    .jt-body{padding:12px}
    .jt-ocard{background:#fff;border-left:4px solid #1565C0;border-radius:8px;padding:10px 12px;margin-bottom:12px}
    .jt-oname{font-size:13px;font-weight:700;color:#111;margin-bottom:3px;line-height:1.3}
    .jt-odate{font-size:11px;color:#666}
    .jt-otag{display:inline-block;margin-top:5px;font-size:10px;padding:2px 8px;border-radius:10px;background:#e3f2fd;color:#1565C0;font-weight:600}
    .jt-lbl{font-size:10px;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:.5px;margin:10px 0 6px}
    .jt-st{display:flex;align-items:center;gap:9px;width:100%;padding:9px 11px;margin-bottom:5px;border-radius:8px;border:2px solid #ddd;background:#fff;cursor:pointer;font-family:Arial,sans-serif;text-align:left;transition:border-color 0.1s,background 0.1s}
    .jt-st:hover{border-color:#1565C0;background:#e8f0fe}
    .jt-st.on{border-color:#1565C0;background:#e3f2fd}
    .jt-snum{width:24px;height:24px;border-radius:50%;background:#eee;border:2px solid #ccc;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#555;flex-shrink:0}
    .jt-st.on .jt-snum{background:#1565C0;border-color:#1565C0;color:#fff}
    .jt-sinfo{flex:1}.jt-sname{font-size:12px;font-weight:600;color:#111}.jt-spct{font-size:10px;color:#888}
    .jt-st.on .jt-spct{color:#1565C0}
    .jt-tick{font-size:14px;color:#1565C0;display:none}.jt-st.on .jt-tick{display:block}
    #jt-txt{width:100%;padding:8px 10px;border:2px solid #ddd;border-radius:8px;font-size:12px;font-family:Arial,sans-serif;outline:none;resize:none;color:#111;margin-bottom:10px}
    #jt-txt:focus{border-color:#1565C0}
    #jt-save{width:100%;background:#1565C0;color:#fff;border:none;padding:11px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif}
    #jt-save:hover{background:#0d47a1}
    #jt-info{font-size:11px;color:#888;text-align:center;margin-top:7px;min-height:16px}
    .jt-div{height:1px;background:#ddd;margin:12px 0}
    #jt-add{width:100%;background:#fff;border:2px dashed #aac;color:#1565C0;padding:9px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;font-family:Arial,sans-serif}
    #jt-add:hover{background:#e8f0fe}
  `;
  document.head.appendChild(style);

  var btn = document.createElement('div');
  btn.id = 'jt-float-btn';
  btn.textContent = '&';
  document.body.appendChild(btn);

  var panel = document.createElement('div');
  panel.id = 'jt-panel';
  panel.innerHTML =
    '<div class="jt-hdr"><div class="jt-logo">job<span>&</span>talent · Pipeline</div><button class="jt-x" id="jt-x">✕</button></div>' +
    '<div class="jt-body">' +
      '<div class="jt-ocard"><div class="jt-oname" id="jt-oname">Cargando...</div><div class="jt-odate" id="jt-odate"></div><div class="jt-otag" id="jt-otag"></div></div>' +
      '<div class="jt-lbl">Etapa real del negocio</div>' +
      '<button class="jt-st" data-s="Propuesta enviada"><div class="jt-snum">1</div><div class="jt-sinfo"><div class="jt-sname">Propuesta enviada</div><div class="jt-spct">20%</div></div><div class="jt-tick">✓</div></button>' +
      '<button class="jt-st" data-s="Negotiation"><div class="jt-snum">2</div><div class="jt-sinfo"><div class="jt-sname">Negociación</div><div class="jt-spct">40%</div></div><div class="jt-tick">✓</div></button>' +
      '<button class="jt-st" data-s="Firma de contrato"><div class="jt-snum">3</div><div class="jt-sinfo"><div class="jt-sname">Firma de contrato</div><div class="jt-spct">70%</div></div><div class="jt-tick">✓</div></button>' +
      '<button class="jt-st" data-s="Closed Won"><div class="jt-snum">4</div><div class="jt-sinfo"><div class="jt-sname">Closed Won</div><div class="jt-spct">90%</div></div><div class="jt-tick">✓</div></button>' +
      '<button class="jt-st" data-s="Inicio operación"><div class="jt-snum">5</div><div class="jt-sinfo"><div class="jt-sname">Inicio operación</div><div class="jt-spct">100%</div></div><div class="jt-tick">✓</div></button>' +
      '<div class="jt-lbl" style="margin-top:12px">Comentario</div>' +
      '<textarea id="jt-txt" rows="3" placeholder="Ej: Cliente pidiendo descuento 8%..."></textarea>' +
      '<button id="jt-save">Guardar en Pipeline</button>' +
      '<div id="jt-info"></div>' +
      '<div class="jt-div"></div>' +
      '<button id="jt-add">＋ Cliente sin CRM · Agregar manualmente</button>' +
    '</div>';
  document.body.appendChild(panel);

  var chosen = null, oppId = null;

  btn.addEventListener('click', function() {
    var open = panel.style.display === 'block';
    panel.style.display = open ? 'none' : 'block';
    if (!open) loadData();
  });
  document.getElementById('jt-x').addEventListener('click', function() { panel.style.display='none'; });

  panel.querySelectorAll('.jt-st').forEach(function(b) {
    b.addEventListener('click', function() {
      chosen = this.getAttribute('data-s');
      panel.querySelectorAll('.jt-st').forEach(function(x){x.classList.remove('on');});
      this.classList.add('on');
      var info = document.getElementById('jt-info');
      info.textContent = '✓ ' + chosen + ' seleccionada';
      info.style.color = '#1565C0';
    });
  });

  document.getElementById('jt-save').addEventListener('click', function() {
    if (!chosen) {
      var info = document.getElementById('jt-info');
      info.textContent = '⚠ Selecciona una etapa primero';
      info.style.color = '#c00';
      return;
    }
    var comment = document.getElementById('jt-txt').value.trim();
    var saveBtn = document.getElementById('jt-save');
    saveBtn.textContent = 'Guardando...'; saveBtn.style.background = '#999';
    var key = oppId || 'sin-opp';
    var record = { stage: chosen, comment: comment, savedAt: new Date().toISOString(), oppId: key };
    chrome.storage.local.get(['pipeline_updates'], function(data) {
      var all = data.pipeline_updates || {};
      all[key] = record;
      chrome.storage.local.set({ pipeline_updates: all }, function() {
        chrome.runtime.sendMessage({ type: 'SAVE_TO_JSONBIN', updates: all });
        saveBtn.textContent = '✓ Guardado en Pipeline'; saveBtn.style.background = '#1A7431';
        var info = document.getElementById('jt-info');
        var now = new Date();
        info.textContent = 'Guardado · ' + now.getHours() + ':' + String(now.getMinutes()).padStart(2,'0');
        info.style.color = '#1A7431';
        setTimeout(function(){ saveBtn.textContent='Guardar en Pipeline'; saveBtn.style.background='#1565C0'; }, 3000);
      });
    });
  });

  document.getElementById('jt-add').addEventListener('click', function() {
    chrome.runtime.sendMessage({ type: 'OPEN_CREAR' });
  });

  function selectStage(val) {
    chosen = val;
    panel.querySelectorAll('.jt-st').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-s')===val); });
  }

  function loadData() {
    var match = window.location.href.match(/\/Opportunity\/(006[A-Za-z0-9]+)\//);
    if (!match) { document.getElementById('jt-oname').textContent='Abre una oportunidad en Salesforce'; return; }
    oppId = match[1];
    chrome.storage.local.get(['opps','pipeline_updates'], function(data) {
      var opp = (data.opps||{})[oppId];
      var saved = (data.pipeline_updates||{})[oppId];
      var name = (opp&&opp.Name) || document.title.split(' | ')[0] || ('Oportunidad · '+oppId.substring(0,12));
      var sfStage = (opp&&opp.StageName)||'Negotiation';
      var closeDate = (opp&&opp.CloseDate)||'';
      document.getElementById('jt-oname').textContent = name;
      document.getElementById('jt-odate').textContent = closeDate?'📅 Cierre: '+closeDate:'';
      document.getElementById('jt-otag').textContent = sfStage+' en CRM';
      selectStage(saved?saved.stage:sfStage);
      if (saved&&saved.comment) { document.getElementById('jt-txt').value=saved.comment; document.getElementById('jt-info').textContent='Última actualización guardada ✓'; document.getElementById('jt-info').style.color='#1A7431'; }
    });
    setTimeout(function() {
      var nameEl = document.querySelector('.slds-page-header__title span')||document.querySelector('h1.slds-page-header__title');
      var n = nameEl?nameEl.textContent.trim():'';
      if (n&&oppId) {
        chrome.storage.local.get(['opps'], function(d) {
          var opps=d.opps||{}; if(!opps[oppId]) opps[oppId]={};
          opps[oppId].Name=n; chrome.storage.local.set({opps:opps});
          document.getElementById('jt-oname').textContent=n;
        });
      }
    }, 2000);
  }

  if (window.location.href.match(/\/Opportunity\/(006[A-Za-z0-9]+)\//)) loadData();
})();
