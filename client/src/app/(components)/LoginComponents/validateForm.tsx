export const validatePasswords = (
  password: string,
  confirmPassword: string
) => {
  return (
    password.trim() && confirmPassword.trim() && password === confirmPassword
  );
};
