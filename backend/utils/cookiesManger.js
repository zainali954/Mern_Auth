const manageCookie = (res, name, value = '', options = {}) => {
    const defaultOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None': 'strict',// for cross origin
        path: '/',
        maxAge: value ? undefined : 0, // Clear cookie if no value is provided
    };

    const cookieOptions = { ...defaultOptions, ...options };

    res.cookie(name, value, cookieOptions);
};

const setCookies = (res, accessToken, refreshToken) => {
    manageCookie(res, 'accessToken', accessToken, { maxAge: 30 * 60 * 1000 }); // 30 minutes
    manageCookie(res, 'refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days
};

const clearCookies = (res) => {
    manageCookie(res, 'accessToken'); // Clear accessToken
    manageCookie(res, 'refreshToken'); // Clear refreshToken
};

export { setCookies, clearCookies };
