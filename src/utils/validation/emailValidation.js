// 信箱驗證函數

export const validateEmail = (email) => {
  const trimmedEmail = email.trim();
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 基本格式檢查，確保存在 "@" 符號以及正確的格式
  if (!re.test(trimmedEmail)) {
    return "信箱格式錯誤";
  }

  // 檢查末尾不應包含多餘的 "."
  if (trimmedEmail.endsWith(".")) {
    return "信箱格式錯誤";
  }
  return "";
};