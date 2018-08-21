module.exports.isLoggedIn = 
(req,res,next)=>{
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
} 

module.exports.isLoggedInRF =

(req,res,next)=>{
    if (req.isAuthenticated()) {
        req.isLoggedInRF = true
    } else { req.isLoggedInRF = false;
    }
    return next();

}