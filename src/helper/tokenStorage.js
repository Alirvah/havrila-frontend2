export default class TokenStorage {
  static isAuthenticated() {
    return this.getToken() !== null;
  }

  static clear() {
    window.localStorage.removeItem("token");
  }

  static setToken(token) {
    return window.localStorage.setItem("token", JSON.stringify(token));
  }

  static getToken() {
    const token = window.localStorage.getItem("token");
    return token && token;
  }

  static getRefreshToken() {
    const token = JSON.parse(window.localStorage.getItem("token"));
    return token ? token.refresh : false;
  }

  static setRefreshToken(token) {
    const oldToken = JSON.parse(window.localStorage.getItem("token"));
    const refreshedToken = { access: token.access, refresh: oldToken.refresh };
    return window.localStorage.setItem("token", JSON.stringify(refreshedToken));
  }
}
