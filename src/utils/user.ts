/** 이메일 형식 유효성 검사 */
export function validateEmail(email: any) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export default validateEmail;
