function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
function isEmpty(obj){
    if (!obj
        || (Object.keys(obj).length === 0 && obj.constructor === Object)
        || obj.constructor !== Object) {
        return true;
    }
    else return false;
}
module.exports = {
    isLoggedIn: isLoggedIn,
    isEmpty: isEmpty
};
