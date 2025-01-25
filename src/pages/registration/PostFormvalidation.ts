export const validateName = (value: string): string | null => {
  if (!value.trim()) return "상품명을 입력하세요.";
  if (value.length > 10) return "10자 이내로 입력해주세요";
  return null; // 유효할 경우 null 반환
};

export const validateDescription = (value: string): string | null => {
  if (!value.trim()) return "상품 소개를 입력해주세요";
  if (value.length < 10) return "10자 이상 입력해주세요";
  return null;
};

export const validatePrice = (value: number | null): string | null => {
  if (!value) return "판매가격을 입력하세요.";
  if (!/^\d+$/.test(value.toString())) return "숫자로 입력해주세요";
  return null;
};
