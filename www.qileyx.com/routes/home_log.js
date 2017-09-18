/**
 * @author zhixing
 * @date   2017-04-06
 */
var home_log = require('home_log')

exports.index = function(req, res) {
    home_log(ms.db.mysql['qile_home_log'], req, res)
}