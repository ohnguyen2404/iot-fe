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
                localStorage.setItem("accessToken", JSON.stringify(response.accessToken));
                localStorage.setItem("refreshToken", JSON.stringify(response.refreshToken));
            }

            return response.user;
        })
        .catch(err => err);
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};