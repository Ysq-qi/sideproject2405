export const debounce = (func, delay) => {
  let timer;

  return (...args) => {
    if (timer) clearTimeout(timer);  // 清除上次的計時器
    timer = setTimeout(() => {
      func(...args);  // 允許將延遲後的未知數量參數傳給一個函數
    }, delay);
  };
};