const Util = {};

/**
 *
 */
Util.attachInfoBox = function () {
  
  const html = `
  <div id="markupInfoBox" style="cursor:pointer; text-align:center; font-size:10px; color:#1cffe3; border-radius:4px; padding:4px 8px; z-index:999999; position:fixed; top:0px; left:0; background-color:rgba(0,0,0,.5);">
      <span class="width"></span> x <span class="height"></span>
      <span class="inline-block sm:hidden text-[yellow]">~ 639</span>
      <span class="hidden sm:inline-block md:hidden text-[yellow]">sm : 640 ~</span>
      <span class="hidden md:inline-block lg:hidden text-[yellow]">md : 768 ~</span>
      <span class="hidden lg:inline-block xl:hidden text-[yellow]">lg : 1024 ~</span>
      <span class="hidden xl:inline-block text-[yellow]">xl : 1280 ~</span>
  </div>
  <dialog id="markupInfoBoxDialog" style="border-radius:10px; background-color:rgba(0,0,0,.8);">
    <form method="dialog">
      <div>
        <button class="dialog_btn third" onclick="(() => {
          window.localStorage.removeItem('SheetMenuData');
          window.location.reload();
        })();">메뉴 데이터 리로드
        </button>
        <button id="markupInfoBoxDialogCancel" class="dialog_btn first">Cancel</button>
      </div>
    </form>
  </dialog>
  <style>
    #markupInfoBoxDialog .dialog_btn{ display:block; width:200px; text-align:center; box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border:2px solid tomato;border-radius:0.6em;color:tomato;cursor:pointer;display:flex; align-items:center; justify-content:center; align-self:center;font-size:1rem;font-weight:400;line-height:1;margin:20px;padding:8px;text-decoration:none;text-align:center; letter-spacing:0.1rem; font-weight:bold;}
    #markupInfoBoxDialog .dialog_btn:hover,
    #markupInfoBoxDialog .dialog_btn:focus{color:#ffffff;outline:0;}
    #markupInfoBoxDialog .first{transition:box-shadow 300ms ease-in-out, color 300ms ease-in-out;}
    #markupInfoBoxDialog .first:hover{box-shadow:0 0 40px 40px tomato inset;}
    #markupInfoBoxDialog .second{border-radius:3em;border-color:#1abc9c;color:#ffffff;background-image:linear-gradient(to right, rgba(26, 188, 156, 0.6), rgba(26, 188, 156, 0.6) 5%, #1abc9c 5%, #1abc9c 10%, rgba(26, 188, 156, 0.6) 10%, rgba(26, 188, 156, 0.6) 15%, #1abc9c 15%, #1abc9c 20%, rgba(26, 188, 156, 0.6) 20%, rgba(26, 188, 156, 0.6) 25%, #1abc9c 25%, #1abc9c 30%, rgba(26, 188, 156, 0.6) 30%, rgba(26, 188, 156, 0.6) 35%, #1abc9c 35%, #1abc9c 40%, rgba(26, 188, 156, 0.6) 40%, rgba(26, 188, 156, 0.6) 45%, #1abc9c 45%, #1abc9c 50%, rgba(26, 188, 156, 0.6) 50%, rgba(26, 188, 156, 0.6) 55%, #1abc9c 55%, #1abc9c 60%, rgba(26, 188, 156, 0.6) 60%, rgba(26, 188, 156, 0.6) 65%, #1abc9c 65%, #1abc9c 70%, rgba(26, 188, 156, 0.6) 70%, rgba(26, 188, 156, 0.6) 75%, #1abc9c 75%, #1abc9c 80%, rgba(26, 188, 156, 0.6) 80%, rgba(26, 188, 156, 0.6) 85%, #1abc9c 85%, #1abc9c 90%, rgba(26, 188, 156, 0.6) 90%, rgba(26, 188, 156, 0.6) 95%, #1abc9c 95%, #1abc9c 100%);background-position:0 0;background-size:100%;transition:background 300ms ease-in-out;}
    #markupInfoBoxDialog .second:hover{background-position:100px;}
    #markupInfoBoxDialog .third{border-color:cornflowerblue;color:#ffffff;box-shadow:0 0 40px 40px cornflowerblue inset, 0 0 0 0 cornflowerblue;transition:all 150ms ease-in-out;}
    #markupInfoBoxDialog .third:hover{box-shadow:0 0 10px 0 cornflowerblue inset, 0 0 10px 4px cornflowerblue;}
    #markupInfoBoxDialog .fourth{border-color:#f1c40f;color:#ffffff;background-image:linear-gradient(45deg, #f1c40f 50%, transparent 50%);background-position:100%;background-size:400%;transition:background 300ms ease-in-out;}
    #markupInfoBoxDialog .fourth:hover{background-position:0;}
    #markupInfoBoxDialog .fifth{border-color:#8e44ad;border-radius:0;color:#8e44ad;position:relative;overflow:hidden;z-index:1;transition:color 150ms ease-in-out;}
    #markupInfoBoxDialog .fifth:after{content:"";position:absolute;display:block;top:0;left:50%;transform:translateX(-50%);width:0;height:100%;background:#8e44ad;z-index:-1;transition:width 150ms ease-in-out;}
    #markupInfoBoxDialog .fifth:hover{color:#ffffff;}
    #markupInfoBoxDialog .fifth:hover:after{width:110%;}
  </style>
  `;
  document.body.insertAdjacentHTML('afterbegin', html);
  
  const $markupInfoBox = document.getElementById('markupInfoBox');
  const $cancelButton = document.getElementById("markupInfoBoxDialogCancel");
  const $dialog = document.getElementById("markupInfoBoxDialog");
  
  $markupInfoBox.addEventListener("click", () => {
    // $dialog.showModal();
    window.location.href = "/";
  });
  
  $cancelButton.addEventListener("click", () => {
    $dialog.close("animalNotChosen");
  });
  
  function resizeListener() {
    // console.log(window.innerWidth, window.innerHeight);
    const $width = $markupInfoBox.querySelector('.width');
    const $height = $markupInfoBox.querySelector('.height');
    $width.innerHTML = window.innerWidth;
    $height.innerHTML = window.innerHeight;
  }
  resizeListener();
  window.addEventListener("resize", resizeListener);
}

/**
 * 동기방식으로 .html 파일 include
 * @param path
 * @constructor
 */
Util.include = function (path) {
  const $me = document.currentScript;
  
  let htmlString;
  
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    /*
    readyState
    0	UNSENT	Client has been created. open() not called yet.
    1	OPENED	open() has been called.
    2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
    3	LOADING	Downloading; responseText holds partial data.
    4	DONE	The operation is complete.
    */
    if (this.readyState == 4) {
      if (this.status == 200) {
        // success
        htmlString = this.responseText;
      } else {
        // error
        const msg = '404 Not Found';
        console.log("path : ", path);
        console.log(`%c${msg}%c${path}`, 'font-family:D2Coding; border:1px solid black; background:red; color:white; padding:10px; font-size:14px;', 'font-family:D2Coding; background-color:black; border:1px solid black; border-left:none; padding:10px; color:yellow; font-size:14px;');
        // Util.include('../pages/기타/404.html');
        htmlString = path;
      }
      
    }
  };
  xhttp.open('GET', path, false);
  xhttp.send();
  /*
  console.log("=============================================");
  console.log(`🍒 include path : ${path} 🍒`);
  console.log(htmlString);
  console.log("=============================================");
   */
  htmlString = `<!-- START : Util.include : ${path} -->` + htmlString;
  htmlString = htmlString + `<!-- // END : Util.include : ${path} -->`;
  
  if (htmlString) document.write(htmlString);
  
  $me.remove();
}

Util.activeTab = (tab_key) => {
  console.log("tab_key == ", tab_key);
  
  if (!tab_key) return;
  const el_target = document.querySelector(`[data-tab-key="${tab_key}"]`);
  if (!el_target) return;
  
  const el_siblings = el_target?.parentElement.querySelectorAll(`[data-tab-key]`);
  if (!el_siblings) return;
  
  Util.OFF(el_siblings);
  Util.ON(el_target);
}

Util.addClass = (elements, class_name) => {
  if (!class_name) console.error('class_name 이 필요합니다.');
  
  if (elements.forEach) {
    elements.forEach((el, idx) => {
      el.classList.add(class_name);
    });
  } else {
    elements.classList.add(class_name);
  }
}

Util.removeClass = (elements, class_name) => {
  if (!class_name) console.error('class_name 이 필요합니다.');
  
  if (elements.forEach) {
    elements.forEach((el, idx) => {
      el.classList.remove(class_name);
    });
  } else {
    elements.classList.remove(class_name);
  }
}

Util.hasClass = (elements, class_name) => {
  if (!class_name) console.error('class_name 이 필요합니다.');
  // if (elements.toString() === '[object NodeList]') {
  if (elements.forEach) {
    let is_has = false;
    elements.forEach((el, idx) => {
      const has = el.classList.contains(class_name);
      if (has) {
        is_has = has;
      }
    });
    return is_has;
  } else {
    return elements.classList.contains(class_name);
  }
  
}

Util.ON = (elements) => {
  Util.addClass(elements, 'ACTIVE');
}

Util.OFF = (elements) => {
  Util.removeClass(elements, 'ACTIVE');
}

Util.TOGGLE = (elements) => {
  if (elements.forEach) {
    elements.forEach((el, idx) => {
      if (Util.hasClass(elements, 'ACTIVE')) {
        Util.removeClass(elements, 'ACTIVE');
      } else {
        Util.addClass(elements, 'ACTIVE');
      }
    });
  } else {
    if (Util.hasClass(elements, 'ACTIVE')) {
      Util.removeClass(elements, 'ACTIVE');
    } else {
      Util.addClass(elements, 'ACTIVE');
    }
  }
}

Util.toggleByKey = (toggle_key) => {
  const el_target = document.querySelectorAll(`[data-toggle-key="${toggle_key}"]`);
  Util.TOGGLE(el_target);
}

Util.setMarkupPageTitle = (title_string) => {
  Util.include(`../components/MarkupPageTitle.hbs`);
  const el_title = document.querySelector('#MarkupPageTitle');
  el_title.innerText = title_string;
}

/**
 * uuid v4 생성
 * @returns {string}
 */
Util.uuid = () => {
  // UUID v4 generator in JavaScript (RFC4122 compliant)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 3 | 8);
    return v.toString(16);
  });
}


/**
 * document ready
 */
document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    Util.attachInfoBox();
  }
});
