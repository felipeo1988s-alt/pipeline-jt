const JSONBIN_BIN_ID = '69f02c9caaba88219746b13a';
const JSONBIN_API_KEY = '$2a$10$dzj1iMxtKvGpfL501RM1lOME.Z54T.Etj/gXNw94tt0JmNBpvHHY2';

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'OPEN_CREAR') {
    chrome.tabs.create({ url: chrome.runtime.getURL('crear.html') });
    return true;
  }
  if (message.type === 'SAVE_TO_JSONBIN') {
    fetch('https://api.jsonbin.io/v3/b/' + JSONBIN_BIN_ID, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Master-Key': JSONBIN_API_KEY },
      body: JSON.stringify({ pipeline_updates: message.updates })
    }).catch(function(e) { console.error('JSONBin error:', e); });
    return true;
  }
});
