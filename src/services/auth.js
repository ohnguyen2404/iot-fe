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
            if (response.accessToken) {
                localStorage.setItem("user", JSON.stringify(response));
            }

            return response;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};