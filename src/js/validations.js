export const validatePassword = (value) => {
    const regExp = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*/;
    return regExp.test(value);
  };