// 將對象序列化為 URL 查詢字串
export const serializeObject = (obj) => {
  const pairs = [];
  for (const prop in obj) {
    if (!{}.hasOwnProperty.call(obj, prop)) continue;
    pairs.push(`${prop}=${obj[prop]}`);
  }
  return pairs.join('&');
};

// 根據郵遞區號查找對應的縣市和區域
export const findDeep = (data, zipcode) => {
  let result = {};
  Object.keys(data).forEach((county) => {
    Object.keys(data[county]).forEach((district) => {
      if (data[county][district] === zipcode.toString()) {
        result = { county, district };
      }
    });
  });
  return result;
};