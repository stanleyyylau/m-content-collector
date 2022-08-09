const ENV = 'prod'
const ENDPOINTROOT = ENV === 'prod' ? 'https://copywrite.msupernova.com' : 'https://copywrite.local'

function exampleFunction(options) {
    chrome.tabs.executeScript(
      { code: "var options = " + JSON.stringify(options) },
      function() {
        chrome.tabs.executeScript({ file: "content.js" })
      }
    )
   }

document.addEventListener("DOMContentLoaded", () => {
    var button = document.getElementById("login")
    var logout = document.getElementById("logout")
    const pass = localStorage.getItem('SNPASS')
    if (pass != null && pass) {
      document.getElementById('login-wrap').classList.remove("show")
      document.getElementById('logout-wrap').classList.add("show")
    }

    logout.addEventListener('click', (e) => {
      document.getElementById('logout-wrap').classList.remove("show")
      document.getElementById('login-wrap').classList.add("show")
      localStorage.removeItem('SNPASS')
    })
   
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
        fetch(`${ENDPOINTROOT}/wp-json/sn/v1/my?XDEBUG_SESSION_START=PHPSTORM`, {
          method: 'get',
          headers: {
              'Authorization': `Basic ${base64Token}`
          },
          }).then(res => res.json())
          .then(res => {
            savebtnDom.innerText = preSaveText
            if(res == 'stanleylau') {
              alert('Login Success')
              localStorage.setItem('SNPASS', pass)
              document.getElementById('login-wrap').classList.remove("show")
              document.getElementById('logout-wrap').classList.add("show")
            }
            // set localstorage
              // console.log('res', res)
          });

    })
})


function getword(info,tab) {
    // console.log("Word " + info.selectionText + " was clicked.");
    //exampleFunction({selection: info.selection})

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {selectionText: info.selectionText, pass: localStorage.getItem('SNPASS')}, function(response) {
            console.log(response)
        });  
    });
  }

 
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      title: "超新星文案采集: %s", 
      contexts:["selection"], 
      onclick: getword
    }, function(e) {
        console.log('eee', e)
    });
  });

