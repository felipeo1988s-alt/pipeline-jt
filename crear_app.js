var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

// Build month grid starting from current month dynamically
var today = new Date();
var currentMonth = today.getMonth(); // 0=Enero
var currentYear = today.getFullYear();

var grid = document.getElementById('mes-grid');
var mesesMostrar = [];
for (var i = currentMonth; i < 12; i++) {
  mesesMostrar.push({ nombre: meses[i], index: i, year: currentYear });
}

mesesMostrar.forEach(function(m) {
  var cell = document.createElement('div');
  cell.className = 'mes-cell';
  cell.innerHTML = '<div class="mes-name">' + m.nombre + ' ' + m.year + '</div>' +
    '<div class="mes-input-wrap">' +
    '<span>$</span>' +
    '<input type="number" id="mes-' + m.index + '" min="0" placeholder="0">' +
    '<span>M</span></div>';
  grid.appendChild(cell);
});

// Recalc total on input
grid.addEventListener('input', function() {
  var total = 0;
  mesesMostrar.forEach(function(m) {
    var el = document.getElementById('mes-' + m.index);
    var v = el ? (parseFloat(el.value) || 0) : 0;
    total += v;
  });
  var fmt = total >= 1000 ? 'COP $' + (total/1000).toFixed(1) + 'B' : 'COP $' + Math.round(total) + 'M';
  document.getElementById('total-display').textContent = 'Total: ' + fmt;
});

// Back button
document.getElementById('btn-back').addEventListener('click', function() {
  window.history.back();
});

// Cancel
document.getElementById('btn-cancel').addEventListener('click', function() {
  window.history.back();
});

// Save
document.getElementById('btn-save').addEventListener('click', function() {
  var nombre = document.getElementById('f-nombre').value.trim();
  var comercial = document.getElementById('f-comercial').value;
  var etapa = document.getElementById('f-etapa').value;
  var mesCierre = document.getElementById('f-mes-cierre').value;

  if (!nombre || !comercial || !etapa || !mesCierre) {
    alert('Completa los campos obligatorios: Nombre, Comercial, Etapa y Mes de cierre.');
    return;
  }

  var sector = document.getElementById('f-sector').value.trim();
  var worker = document.getElementById('f-worker').value;
  var comentario = document.getElementById('f-comentario').value.trim();

  var valoresMes = mesesMostrar.map(function(m) {
    var el = document.getElementById('mes-' + m.index);
    return el ? (parseFloat(el.value) || 0) : 0;
  });
  var totalM = valoresMes.reduce(function(s, v) { return s + v; }, 0);
  var totalStr = totalM >= 1000 ? 'COP $' + (totalM/1000).toFixed(1) + 'B' : 'COP $' + totalM + 'M';

  var client = {
    id: Date.now(),
    nombre: nombre,
    comercial: comercial,
    sector: sector,
    etapa: etapa,
    mesCierre: mesCierre,
    worker: worker,
    comentario: comentario,
    valoresMes: valoresMes,
    mesesMostrar: mesesMostrar.map(function(m){ return m.nombre + ' ' + m.year; }),
    totalStr: totalStr,
    savedAt: new Date().toISOString()
  };

  chrome.storage.local.get(['manual_clients'], function(data) {
    var clients = data.manual_clients || [];
    clients.push(client);
    chrome.storage.local.set({ manual_clients: clients }, function() {
      var toast = document.getElementById('toast');
      toast.style.display = 'block';
      setTimeout(function() {
        toast.style.display = 'none';
        window.history.back();
      }, 2000);
    });
  });
});
