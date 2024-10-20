export const checkEmail = (email)=>{
  const isValid = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/.test(email);
  return isValid
}
export const checkPassword = (password)=>{
  const isPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
  return isPassword;
}