exports.isLoggedIn = (req, res, next) => {
    const isAuth = req.isAuthenticated()

    if (isAuth) {
        next()
    } else {
        res.redirect('/login')
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    const isAuth = req.isAuthenticated()

    if (!isAuth) {
        next()
    } else {
        res.redirect('/')
    }
}
