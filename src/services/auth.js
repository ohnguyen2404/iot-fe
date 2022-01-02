import { AuthApi } from "../api";

const register = (email, firstName, lastName, password) => {
  return AuthApi.register({
    email,
    firstName,
    lastName,
    password,
  });
};

const login = async (email, password) => {
  const response = await AuthApi.login({
    email,
    password,
  });
  if (response.accessToken && response.refreshToken) {
    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
  }
  return response.user;
};

const changePassword = (currentPassword, newPassword) => {
  return AuthApi.changePassword({
    currentPassword,
    newPassword,
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => err);
};

const logout = () => {
  localStorage.clear();
};

export default {
  register,
  login,
  changePassword,
  logout,
};
