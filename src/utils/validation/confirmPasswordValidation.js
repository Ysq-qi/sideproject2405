// 確認密碼驗證

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword ? "" : "密碼不匹配";
};