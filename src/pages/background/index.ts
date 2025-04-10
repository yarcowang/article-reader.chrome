// console.log(chrome.tts.speak('hello world!'))

chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.action === 'read') {
      chrome.tts.speak(request.content, {lang: request.lang, onEvent: (event) => {
        if (event.type === 'end' && sender.tab) {
            chrome.tabs.sendMessage(sender.tab.id!, { action: 'finished_reading' })
        }
      }})
    } else if (request.action === 'stop') {
      chrome.tts.stop()
    }
})