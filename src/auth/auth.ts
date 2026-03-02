export function getToken() {
    return localStorage.getItem("token");
}

export function setToken(token: string) {
    localStorage.setItem("token", token);
}

export function isAuthenticated() {
    return Boolean(getToken());
}

export function removeToken() {
    localStorage.removeItem("token");
}