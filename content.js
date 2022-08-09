let PASSFROMCACHE = ''


chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    const selectionText = msg.selectionText 
    PASSFROMCACHE = msg.pass
    mContentApp.showDialog(selectionText)

});

const ENV = 'prod'
const ENDPOINTROOT = ENV === 'prod' ? 'https://copywrite.msupernova.com' : 'https://copywrite.local'
const LOCALPASS = 'agk0 XTxE 8Wjh inQq uCsB LCpH'
const LABELS = ['[[Your Company]]', '[[Your Product]]', '[[Your Industry]]']

function getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range,
        textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }

    return {
        start: start,
        end: end
    };
}

function replaceSelectedText(el, text) {
    var sel = getInputSelection(el), val = el.value;
    if (sel.start == sel.end) return;
    el.value = val.slice(0, sel.start) + text + val.slice(sel.end);
}

// var el = document.getElementById("your_textarea");
// replaceSelectedText(el, "[NEW TEXT]");


const mContentApp = {
    isInit: false,
    htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    },
    init() {
        if (!this.isInit) {
            this.writeTplToDom()
            this.isInit = true
        }
    },
    replaceWithLabel(e) {
        const label = e.target.innerText
        const dom1 = document.getElementById('textarea-1626398514464')
        // const dom2 = document.getElementById('textarea-1626398536310')

        replaceSelectedText(dom1, label);
        // replaceSelectedText(dom2, label);

        // console.log('replaceWithLabel', e)
    },
    writeTplToDom() {
        const labelsContent = LABELS.map((label) => {
            return `<div class='label-item'>${label}</div>`
        }).join('')
      const tpl =  `<div class="rendered-form" id="m-content">
      <div class="">
          <h2 access="false" id="control-5063100">超新星文案采集器</h2></div>
          <div class='labels-title'>可替换标签</div>
          <div class='labels-wrap'>${labelsContent}</div>
      <div class="formbuilder-textarea form-group field-textarea-1626398514464">
          <label for="textarea-1626398514464" class="formbuilder-textarea-label">文案</label>
          <textarea type="textarea" class="form-control" name="textarea-1626398514464" access="false" id="textarea-1626398514464"></textarea>
      </div>
      <div class="formbuilder-textarea form-group field-textarea-1626398536310">
          <label for="textarea-1626398536310" class="formbuilder-textarea-label">翻译</label>
          <textarea type="textarea" class="form-control" name="textarea-1626398536310" access="false" id="textarea-1626398536310"></textarea>
      </div>
      <div class="formbuilder-textarea form-group field-textarea-1626398547264">
          <label for="textarea-1626398547264" class="formbuilder-textarea-label">点评</label>
          <textarea type="textarea" class="form-control" name="textarea-1626398547264" access="false" id="textarea-1626398547264"></textarea>
      </div>
      <div class="formbuilder-checkbox-group form-group field-checkbox-group-1626398729345">
          <label for="checkbox-group-1626398729345" class="formbuilder-checkbox-group-label">行业</label>
          <div class="checkbox-group m-industry">
              <div class="formbuilder-checkbox-inline">
                  <input name="checkbox-group-1626398729345[]" access="false" id="checkbox-group-1626398729345-0" value="option-1" type="checkbox" checked="checked">
                  <label for="checkbox-group-1626398729345-0">Option 1</label>
              </div>
              <div class="formbuilder-checkbox-inline">
                  <input name="checkbox-group-1626398729345[]" access="false" id="checkbox-group-1626398729345-1" value="banner" type="checkbox" checked="checked">
                  <label for="checkbox-group-1626398729345-1">Banner</label>
              </div>
          </div>
      </div>
      <div class="formbuilder-checkbox-group form-group field-checkbox-group-162639f8729345">
          <label for="checkbox-group-162639f8729345" class="formbuilder-checkbox-group-label">语言风格</label>
          <div class="checkbox-group m-tone">
            
          </div>
      </div>
      <div class="formbuilder-checkbox-group form-group field-checkbox-group-162639ff8729345">
          <label for="checkbox-group-162639ff8729345" class="formbuilder-checkbox-group-label">文本类型</label>
          <div class="checkbox-group m-text-type">
            
          </div>
      </div>
      <div class="formbuilder-checkbox-group form-group field-checkbox-group-162639f8s729345">
          <label for="checkbox-group-162639f8s729345" class="formbuilder-checkbox-group-label">页面</label>
          <div class="checkbox-group m-page-type">
            
          </div>
      </div>
      <div class="formbuilder-checkbox-group form-group field-checkbox-group-1626398571296">
          <label for="checkbox-group-1626398571296" class="formbuilder-checkbox-group-label">页面板块</label>
          <div class="checkbox-group m-block-type">

          </div>
      </div>
      <div class="m-collector-cta-wrap">
        <button class="m-collector-close">Close</button>
        <button class="m-collector-save">Save</button>
      </div>
  </div>`  

        var elements = this.htmlToElement(tpl)
        document.body.appendChild(elements)

        // document.body.innerHTML += tpl
        document.getElementById('m-content').addEventListener('click', e => {
            if (e.target.className === 'm-collector-close') {
                mContentApp.hideDialog()
            }
            if (e.target.className === 'm-collector-save') {
                mContentApp.saveContent()
            }
            if (e.target.className === 'label-item') {
                mContentApp.replaceWithLabel(e)
            }
        })
        this.fetchTaxData()
    },
    showDialog(content) {
        this.init()
        document.getElementById('textarea-1626398514464').value = content
        document.getElementById('m-content').classList.add("show-mcontent")
    },
    hideDialog() {
        document.getElementById('m-content').classList.remove("show-mcontent")
        this.resetForm()
    },
    fetchTaxData() {
        // console.log('fetching tax data')
        const endpoints = [
            {
                containerClass: 'm-tone',
                endpointUrl: `${ENDPOINTROOT}/wp-json/wp/v2/tone`
            },{
                containerClass: 'm-text-type',
                endpointUrl: `${ENDPOINTROOT}/wp-json/wp/v2/text_type`
            },{
                containerClass: 'm-page-type',
                endpointUrl: `${ENDPOINTROOT}/wp-json/wp/v2/page_type`
            },{
                containerClass: 'm-block-type',
                endpointUrl: `${ENDPOINTROOT}/wp-json/wp/v2/block_type`
            },{
                containerClass: 'm-industry',
                endpointUrl: `${ENDPOINTROOT}/wp-json/wp/v2/industry`
            },
        ]

        endpoints.forEach(function(item) {
            let wrapperClass = item.containerClass
            let url = item.endpointUrl
            fetch(url)
            .then(response => response.json())
            .then(data => {
                let optionsHtml = ''
                data.forEach((tax, index) => {
                    var tpl = `<div class="formbuilder-checkbox-inline">
                                <input name="checkbox-group-${tax.taxonomy}[]" access="false" id="checkbox-group-${tax.taxonomy}-${index}" value="${tax.id}" type="checkbox">
                                <label for="checkbox-group-${tax.taxonomy}-${index}">${tax.name}</label>
                            </div>`
                    optionsHtml = optionsHtml + tpl
                })
                document.getElementsByClassName(wrapperClass)[0].innerHTML = optionsHtml
            });
        })

        
    },
    getFormData() {
        const tax = {
            industry: [],
            tone: [],
            text_type: [],
            page_type: [],
            block_type: []
        }
        for (let checkbox of document.querySelectorAll('input[name="checkbox-group-industry[]"]:checked')) {
            tax.industry.push(Number(checkbox.value))
        }
        for (let checkbox of document.querySelectorAll('input[name="checkbox-group-tone[]"]:checked')) {
            tax.tone.push(Number(checkbox.value))
        }
        for (let checkbox of document.querySelectorAll('input[name="checkbox-group-text_type[]"]:checked')) {
            tax.text_type.push(Number(checkbox.value))
        }
        for (let checkbox of document.querySelectorAll('input[name="checkbox-group-page_type[]"]:checked')) {
            tax.page_type.push(Number(checkbox.value))
        }
        for (let checkbox of document.querySelectorAll('input[name="checkbox-group-block_type[]"]:checked')) {
            tax.block_type.push(Number(checkbox.value))
        }       
        const formData = {
            contentDetail: document.getElementById('textarea-1626398514464').value,
            contentTranslation: document.getElementById('textarea-1626398536310').value,
            contentAnalysis: document.getElementById('textarea-1626398547264').value,
            source: window.location.href,
            tax: tax,
            status: 'publish'
        }
        return formData
    },
    resetForm() {
        document.getElementById('textarea-1626398514464').value = ''
        document.getElementById('textarea-1626398536310').value = ''
        document.getElementById('textarea-1626398547264').value = ''
        for (let checkbox of document.querySelectorAll('input[name="checkbox-group-industry[]"]:checked')) {
            checkbox.checked = false
        }
        for (let checkbox of document.querySelectorAll('input[name="checkbox-group-tone[]"]:checked')) {
            checkbox.checked = false
        }
        for (let checkbox of document.querySelectorAll('input[name="checkbox-group-text_type[]"]:checked')) {
            checkbox.checked = false
        }
        for (let checkbox of document.querySelectorAll('input[name="checkbox-group-page_type[]"]:checked')) {
            checkbox.checked = false
        }
        for (let checkbox of document.querySelectorAll('input[name="checkbox-group-block_type[]"]:checked')) {
            checkbox.checked = false
        } 
    },
    saveContent() {
        // check login status
        const applicationPass = PASSFROMCACHE
        if (applicationPass == null || applicationPass == '') {
            return alert('login first')
        }

        const formData = this.getFormData()
        const savebtnDom = document.querySelector('.m-collector-save')
        const preSaveText = savebtnDom.innerText
        if (preSaveText == '采集中') return
        savebtnDom.innerText = '采集中'

        
        const userName = 'msupernova'
        const base64Token = btoa(`msupernova:${applicationPass}`)
        const url = `${ENDPOINTROOT}/wp-json/wp/v2/content?XDEBUG_SESSION_START=PHPSTORM`
        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64Token}`
            },
            body: JSON.stringify(formData)
            }).then(res => res.json())
            .then(res => {
                savebtnDom.innerText = preSaveText
                if (res.code) {
                    return alert('失败, 请退出重新登录')
                }
                if (res.id != 0) {
                    alert("成功")
                    mContentApp.hideDialog()
                } else {
                    alert('失败')
                }
            }).catch(e=> {
                console.log('e', e)
            });
    }
}

mContentApp.init()
