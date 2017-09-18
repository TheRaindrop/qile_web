//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 10:43:03 CST 2017
//----------------------------------------------------------------------

'use strict'
var dbase = ms.db.mysql['admin_qile']
var sql = ''

exports.get_news_list = function (req, res) {
    sql = `select id,title, date_format(publish_at, "%Y-%m-%d %H:%i:%s") as publish_at from news where status=1 order by publish_at desc`
    ms.log.info('get news', sql)
    dbase.exec_sql(sql, (err, rows) => {
        res.send({ ok: 1, msg: rows })
    })
}
