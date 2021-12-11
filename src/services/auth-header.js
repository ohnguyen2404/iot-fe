export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  // return authorization header if user login with accessToken else return empty object
  if (user && user.accessToken) {
    return {'x-access-token': user.accessToken};
  } else {
    return {};
  }
}