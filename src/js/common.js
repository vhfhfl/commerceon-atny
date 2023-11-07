const Layer = {};

/**
 * 레이어 팝업 열기
 * @param layer_id : 레이어 팝업 data-layer-id 값
 */
Layer.open = (layer_id) => {
  const el_layer = document.querySelector(`[data-layer-id="${layer_id}"]`);
  console.log("el_layer == ", el_layer);
  el_layer.classList.add('ACTIVE');
}

/**
 * 레이어 팝업 닫기
 * @param layer_id : 레이어 팝업 data-layer-id 값 || 클릭한 버튼 자신
 */
Layer.close = (layer_id) => {
  
  if (layer_id) {
    if (typeof layer_id === "string") {
      // id 값이 문자열로 넘어오면
      const el_layer = document.querySelector(`[data-layer-id="${layer_id}"]`);
      console.log("el_layer == ", el_layer);
      el_layer.classList.remove('ACTIVE');
    } else {
      // 팝업 내부에서 버튼이 자신을 변수로 넘겨준다면
      const el_layer = layer_id.closest('[data-layer-id]');
      console.log("el_layer == ", el_layer);
      el_layer.classList.remove('ACTIVE');
    }
  } else {
    // 매개변수가 없다면
    const el_layer_list = document.querySelectorAll(`[data-layer-id]`);
    el_layer_list.forEach((el_layer, idx) => {
      console.log("el_layer == ", el_layer);
      el_layer.classList.remove('ACTIVE');
    });
  }
  
}

Layer.openAtOnLoad = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const layer_id = urlParams.get('layer-id');
  if (!layer_id) return;
  Layer.open(layer_id);
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    Layer.openAtOnLoad();
  }
});

const Footer = {};
Footer.toggle = () => {
  const el_layout_footer = document.querySelector('#layout_footer');
  el_layout_footer.classList.toggle('on');
}