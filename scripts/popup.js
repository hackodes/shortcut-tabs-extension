document.getElementById('link').addEventListener('click', function () {
  chrome.tabs.create({ url: 'chrome://extensions/shortcuts' })
})
