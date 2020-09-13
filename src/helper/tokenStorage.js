export default class TokenStorage {
  static isAuthenticated() {
    return this.getToken() !== null;
  }

  static clear() {
    localStorage.removeItem("token");
  }

  static setToken(token) {
    return localStorage.setItem("token", JSON.stringify(token));
  }

  static getToken() {
    const token = localStorage.getItem("token");
    return token && token;
  }

  static getRefreshToken() {
    const token = JSON.parse(localStorage.getItem("token"));
    return token ? token.refresh : false;
  }

  static setRefreshToken(token) {
    const oldToken = JSON.parse(localStorage.getItem("token"));
    const refreshedToken = { access: token.access, refresh: oldToken.refresh };
    return localStorage.setItem("token", JSON.stringify(refreshedToken));
  }
}
