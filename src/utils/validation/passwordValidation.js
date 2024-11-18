// 密碼輸入驗證

export const validatePassword = (password) => {
  const hasUpperCaseFirst = /^[A-Z]/.test(password);
  const isValidLength = password.length >= 8;

  if (!hasUpperCaseFirst) {
    return "首位必須大寫";
  } else if (!isValidLength) {
    return "需滿8個字元";
  }
  return ""; // 驗證通過
};