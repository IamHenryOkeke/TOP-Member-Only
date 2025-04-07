module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        // If authenticated and trying to access auth routes, redirect to home
        if ((req.url.includes('login') || req.url.includes('sign-up')) && !req.url.includes('logout')) {
            res.redirect('/');
        } else {
            // If authenticated and accessing other routes, proceed
            next();
        }
    } else {
        if (req.url.includes('login') || req.url.includes('sign-up')) {
            next();
        }else {
            res.redirect('/auth/login');
        }
    }
};

module.exports.isMember = (req, res, next) => {
    if (req.user.membership_status !== 'regular') {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports.isAdmin = (req, res, next) => {
    if (req.user.membership_status === 'admin') {
        next();
    } else {
        res.redirect('/');
    }
};
