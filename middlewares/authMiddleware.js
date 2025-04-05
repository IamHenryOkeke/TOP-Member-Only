module.exports.isAuth = (req, res, next) => {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
        console.log("User is authenticated");
        // User is authenticated, proceed to the next middleware or route handler
      next();
    } else {
        // User is not authenticated, redirect to the login page
        res.redirect('/auth/login');
    }
}