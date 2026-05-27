document.getElementById('btn-pipeline').addEventListener('click', function() {
  chrome.tabs.create({ url: 'https://felipeo1988s-alt.github.io/pipeline-jt/pipeline_jt%20(1).html' });
});
document.getElementById('btn-crear').addEventListener('click', function() {
  chrome.tabs.create({ url: chrome.runtime.getURL('crear.html') });
});
