/* eslint-disable */
export function generateAuthError(message) {
  switch (message) {
    case "EMAIL_NOT_FOUND":
      return "Неверный логин или пароль. Проверте правильность написания.";
    case "INVALID_PASSWORD":
      return "Неверный логин или пароль. Проверте правильность написания.";
    case "EMAIL_EXISTS":
      return "Пользователь с таким email уже существует.";
    default:
      return "Слишком много попыток входа, попробуйте позднее.";
  }
};
/* eslint-enable */
