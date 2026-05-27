const JSONBIN_BIN_ID = '69f02c9caaba88219746b13a';
const JSONBIN_API_KEY = '$2a$10$dzj1iMxtKvGpfL501RM1lOME.Z54T.Etj/gXNw94tt0JmNBpvHHY2';

function sync() {
  chrome.storage.local.get(['pipeline_updates', 'manual_clients'], function(data) {
    window.postMessage({ source: 'jt-extension', data: data }, '*');
  });
}

chrome.storage.onChanged.addListener(function(changes) {
  var update = {};
  if (changes.pipeline_updates) update.pipeline_updates = changes.pipeline_updates.newValue;
  if (changes.manual_clients) update.manual_clients = changes.manual_clients.newValue;
  if (Object.keys(update).length) window.postMessage({ source: 'jt-extension', data: update }, '*');
});

setTimeout(sync, 1000);
setInterval(sync, 2000);
