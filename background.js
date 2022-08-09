const ENV = 'prod'
const ENDPOINTROOT = ENV === 'prod' ? 'https://copywrite.msupernova.com' : 'https://copywrite.local'

document.addEventListener("DOMContentLoaded", () => {
  var button = document.getElementById("login")
  var logout = document.getElementById("logout")

  // get pass from cache
  const pass = localStorage.getItem('SNPASS')

  // already logged in
  if (pass != null && pass) {
    document.getElementById('login-wrap').classList.remove("show")
    document.getElementById('logout-wrap').classList.add("show")
  }

  // logout click
  logout.addEventListener('click', (e) => {
    document.getElementById('logout-wrap').classList.remove("show")
    document.getElementById('login-wrap').classList.add("show")
    localStorage.removeItem('SNPASS')
  })

  // login click
  button.addEventListener("click", (e) => {
    const pass = document.getElementById("pass").value
    // console.log('pass is',pass)
    if (pass == '') {
      return alert('Plz enter your password')
    }

    const savebtnDom = document.getElementById('login')
    const preSaveText = savebtnDom.innerText
    if (preSaveText == 'loading') return
    savebtnDom.innerText = 'loading'

    const base64Token = btoa(`msupernova:${pass}`)
    fetch(`${ENDPOINTROOT}/wp-json/sn/v1/my`, {
        method: 'get',
        headers: {
          'Authorization': `Basic ${base64Token}`
        },
      }).then(res => res.json())
      .then(res => {
        savebtnDom.innerText = preSaveText
        if (res == 'root') {
          alert('Login Success')
          localStorage.setItem('SNPASS', pass)
          document.getElementById('login-wrap').classList.remove("show")
          document.getElementById('logout-wrap').classList.add("show")
        }
      });

  })
})

function getword(info, tab) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // call content script
    chrome.tabs.sendMessage(tabs[0].id, {
      selectionText: info.selectionText,
      pass: localStorage.getItem('SNPASS')
    }, function (response) {
      console.log(response)
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "超新星文案采集: %s",
    contexts: ["selection"],
    onclick: getword
  }, function (e) {
    console.log(e)
  });
});