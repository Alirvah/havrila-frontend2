export default class TokenStorage {
  static isAuthenticated() {
    return this.getToken() !== null;
  }

  static clear() {
    sessionStorage.removeItem("token");
  }

  static setToken(token) {
    return sessionStorage.setItem("token", JSON.stringify(token));
  }

  static getToken() {
    const token = sessionStorage.getItem("token");
    return token && token;
  }

  static getRefreshToken() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    return token ? token.refresh : false;
  }

  static setRefreshToken(token) {
    const oldToken = JSON.parse(sessionStorage.getItem("token"));
    const refreshedToken = { access: token.access, refresh: oldToken.refresh };
    return sessionStorage.setItem("token", JSON.stringify(refreshedToken));
  }
}
