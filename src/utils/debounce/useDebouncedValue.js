import { useState, useEffect } from 'react';
import { debounce } from './debounce';

export const useDebouncedValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = debounce(() => setDebouncedValue(value), delay); // 防抖處理( 輸入值 , 延遲(毫秒))
    handler();

    return () => {
      clearTimeout(handler); // 組件卸載時清除計時器
    };
  }, [value, delay]);

  return debouncedValue;
};