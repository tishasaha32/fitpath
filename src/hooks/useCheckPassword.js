const useCheckPassword = () => {
  const checkPassword = (password) => {
    return password.length >= 6;
  };

  return checkPassword;
};

export default useCheckPassword;
