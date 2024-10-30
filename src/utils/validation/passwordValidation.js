// 密碼輸入驗證

export const validatePassword = (password) => {
  const hasUpperCaseFirst = /^[A-Z]/.test(password);
  const isValidLength = password.length >= 8;
  return hasUpperCaseFirst && isValidLength;
};