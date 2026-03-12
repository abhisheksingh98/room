import cookie from 'js-cookie'

export const setCookie = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

export const removeCookie = (key: string) => {
    if (typeof window !== 'undefined') {
        cookie.remove(key);
    }
};

export const getCookie = (key: string) => {
    if (typeof window !== 'undefined') {
        return cookie.get(key);
    }
};

export const setLocalStorage = (key: string, value: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

export const authenticate = (response: any, next: () => void) => {
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

export const signout = (next: () => void) => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};

export const isAuth = () => {
    if (typeof window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            const user = localStorage.getItem('user');
            if (user) {
                return JSON.parse(user);
            }
        }
    }
    return false;
};

export const updateUser = (response: any, next: () => void) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    next();
};
