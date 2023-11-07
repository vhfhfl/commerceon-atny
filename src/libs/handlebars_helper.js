Handlebars.logger.level = 'debug';

/**
 * n 회 반복
 * ex)
 * {{#times 10}}
 *   {{index}} {{number}} {{digit}}
 * {{/times}}
 */
Handlebars.registerHelper('times', function (n, block) {
  var accum = '';
  for (var i = 0; i < n; ++i)
    accum += block.fn({index : i, number : i + 1, digit : (i + 1).toString().padStart(2, '0')});
  return accum;
});

/**
 * \n 줄바꿈 처리
 * ex)
 * {{BR this}}
 */
Handlebars.registerHelper('BR', function (text) {
  text = Handlebars.Utils.escapeExpression(text);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  return new Handlebars.SafeString(text);
});

/**
 * 더미 이미지
 * ex)
 * {{IMG 560 315 '사과'}}
 */
Handlebars.registerHelper('IMG', function (width, height, text) {
  text = (typeof text === 'string' || typeof text === 'number') ? ' - ' + text : '';
  
  const src = `https://gifpng.com/${width}x${height}/?font-size=16&text=${width}x${height}${text}`;
  
  const html = `<img src="${src}" alt=""/>`;
  return new Handlebars.SafeString(html);
});

/**
 * 랜덤 난수
 * 1~10 중에서 랜덤 수
 * ex) {{RANDOM 1 10 }}
 */
Handlebars.registerHelper('RANDOM', function (MIN, MAX) {
  //min 부터 max 까지 랜덤 정수
  //Math.floor(Math.random()*(max-min+1)+min);
  //MIN ~ MAX 랜덤 양의 정수
  const k = Math.random() * (MAX - MIN) + MIN;
  
  return k;
});

/**
 * 랜덤 정수
 * 1~10 중에서 랜덤 뽑기
 * ex) {{INT 1 10 }}
 */
Handlebars.registerHelper('INT', function (MIN, MAX) {
  //min 부터 max 까지 랜덤 정수
  //Math.floor(Math.random()*(max-min+1)+min);
  //MIN ~ MAX 랜덤 양의 정수
  const k = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
  
  return k;
});

/**
 * {{#IF this ">=" 6}}
 *   <div>1</div>
 * {{else IF this "<" 6}}
 *   <div>2</div>
 * {{else}}
 *   <div>3</div>
 * {{/IF}}
 */
Handlebars.registerHelper('IF', function (v1, condition, v2, options) {
  if (eval(`v1
  ${condition}
  v2`)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

/**
 * 수식과 숫자 x 를 받아서 반환
 * ex) {{MATH 'x+1' index}}
 * ex) {{MATH '(x%2===1)?1:(x%6===0)?1:2' number}}
 */
Handlebars.registerHelper('MATH', function (mathematics, x) {
  const result = eval(mathematics);
  return result;
});

/**
 * Object 에 노드 추가
 * ex) {{VAR this 'NAME' 'ksm'}}
 */
Handlebars.registerHelper('VAR', function (object, node_name, value, options) {
  if (typeof object === 'object') {
    object[node_name] = value;
  }
});

/**
 * 값 합치기
 * ex) {{ADD this 'NAME' (ADD 'ksm_' @key) }}
 */
Handlebars.registerHelper('ADD', function (v1, v2, options) {
  return v1 + v2;
});

/**
 * <script type="text/x-handlebars-template"> 에 입력된 템플릿 DOM 태그들을 render_data 와 합성하여 DOM 결과물을 화면에 출력한다.
 * @param render_data
 * @param template_sctipt_id
 * https://handlebarsjs.com/
 */
Handlebars.write = function (render_data, template_sctipt_id) {
  
  const $me = document.currentScript;
  if ($me.tagName != 'SCRIPT') return;
  
  let templateTag;
  if (!template_sctipt_id) {
    templateTag = $me.previousElementSibling;
  } else {
    templateTag = document.querySelector(template_sctipt_id);
  }
  
  //Grab the inline template
  const template = templateTag.innerHTML;
  
  //Compile the template
  const compiled_template = Handlebars.compile(template);
  
  //Render the data into the template
  const rendered = compiled_template(render_data);
  
  templateTag.insertAdjacentHTML('beforebegin', rendered.trim());
  templateTag.remove();
  $me.remove();
}

/**
 *
 * @param path
 * @param render_data
 * ex)
 * Handlebars.component(`../components/products/main/visual_slide_wrap.html`, {
 *   name : "KSM"
 * }, (param) => {
 *   console.log('[main.html : 40]');
 *   console.log(param);
 * });
 *
 */
Handlebars.component = function (path, render_data = {}, end_callback) {
  render_data.cpntid = Handlebars.uuid();
  
  const $me = document.currentScript;
  
  let htmlString;
  
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        // success
        //Compile the template
        const compiled_template = Handlebars.compile(this.responseText);
        
        //Render the data into the template
        const rendered = compiled_template(render_data);
        
        const div = document.createElement('div');
        div.innerHTML = rendered;
        
        const clen = div.children.length;
        if (div.children.length > 1) {
          console.error(`컴포넌트의 최상위 엘리먼트는 1개 이어야합니다. 현재 ${clen} 개입니다.`);
          console.log(path + ' 파일의 수정이 필요합니다.');
        }
        const dom = div.children[0];
        if (dom) {
          dom.setAttribute(`data-cpntid`, render_data.cpntid);
        }
        
        htmlString = div.innerHTML;
        
      } else {
        // error
        const msg = '404 Not Found';
        console.log("path : ", path);
        console.log(`%c${msg}%c${path}`, 'font-family:D2Coding; border:1px solid black; background:red; color:white; padding:10px; font-size:14px;', 'font-family:D2Coding; background-color:black; border:1px solid black; border-left:none; padding:10px; color:yellow; font-size:14px;');
        htmlString = path;
      }
      
    }
  };
  xhttp.open('GET', path, false);
  xhttp.send();
  htmlString = `<!-- START : Handlebars.component : ${path} -->` + htmlString;
  htmlString = htmlString + `<!-- // END : Handlebars.component : ${path} -->`;
  
  if (htmlString) document.write(htmlString);
  if (end_callback) end_callback(render_data);
  
  $me.remove();
}

Handlebars.uuid = () => {
  // UUID v4 generator in JavaScript (RFC4122 compliant)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 3 | 8);
    return v.toString(16);
  });
}