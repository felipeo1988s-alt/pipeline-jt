// Event listeners for extension version of pipeline_jt.html
document.addEventListener('DOMContentLoaded', function() {
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('action') === 'crear') {
    if (typeof navTo === 'function') navTo('equipo');
    setTimeout(function() { if (typeof openCrearCliente === 'function') openCrearCliente(); }, 500);
  }
});
