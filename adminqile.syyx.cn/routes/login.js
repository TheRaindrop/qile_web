
exports.index = function (req, res) {
    res.render("../../../common_views/login/main", {title:'尚游后台统一登录'})
}

exports.enter = function (req, res) {
    ms.log.info('login enter')
    var account  = req.body.nickname
    var password = req.body.password
    var tokenotp = req.body.tokenotp
    var site     = req.headers.host

    ms.log.info('login enter start : ', site, account, password, tokenotp)
    ms.admin_login.login(site, account, password, tokenotp, function(err, cookie1, cookie2) {
        if (err) {
            res.send({ok : 0, msg : err }); return
        }
        ms.u2.set_cookies(res, 'admin1', cookie1, { domain : '.syyx.cn', path : '/'})
        ms.u2.set_cookies(res, 'admintoken', cookie2, { domain : '.syyx.cn', path : '/'})
        res.send({ok : 1, operator : account, url: '/'})
    })
}

exports.offline = function(req, res) {
    var account = req.account_info.account
    ms.log.info('offline', account)
    res.header('P3P', 'CP="CAO PSA OUR"')            //跨域访问cookie
    var coo = ms.u2.set_cookies(res, "admin1","", { domain:".syyx.cn", path: '/' })
    var coo2 = ms.u2.set_cookies(res, "admintoken","", { domain:".syyx.cn", path: '/' })
    
    res.send({ok : 1})
}