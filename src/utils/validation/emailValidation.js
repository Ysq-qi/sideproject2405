// 信箱輸入驗證

export const validateEmail = (email) => {
  const trimmedEmail = email.trim();
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const hasValidTLD = /\.[a-zA-Z]{2,}$/.test(trimmedEmail);
  const hasNoConsecutiveDots = !/\.{2,}/.test(trimmedEmail);

  return re.test(trimmedEmail) && hasValidTLD && hasNoConsecutiveDots;
};
