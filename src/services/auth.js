import {AuthApi} from "../api";

const register = (email, firstName, lastName, password) => {
    return AuthApi.register({
        email,
        firstName,
        lastName,
        password,
    });
};

const login = (email, password) => {
    return AuthApi.login({
        email,
        password,
    })
        .then((response) => {
            console.log(response);
            if (response.accessToken && response.refreshToken) {
                localStorage.setItem("accessToken", response.accessToken);
                localStorage.setItem("refreshToken", response.refreshToken);
            }

            return response.user;
        })
        .catch(err => err);
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
        .catch(err => err);
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    changePassword,
    logout,
};