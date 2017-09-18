//----------------------------------------------------------------------
//-detail.js
//-@author:xiatong
//-@date:###### Fri Sep 8 10:42:55 CST 2017
//----------------------------------------------------------------------

'use strict'
var dbase = ms.db.mysql['admin_qile']
var sql = ''

exports.detail = function (req, res) {
    res.render('news/detail')
}

exports.get_news_detail=function(req, res){
    let id=ms.sqlstr.escape(req.body.id)
    sql = `select title,author, date_format(publish_at, "%Y-%m-%d %H:%i:%s") as publish_at,content from news where id=${id}`
    ms.log.info('get news detail', sql)
    dbase.exec_sql(sql, (err, rows) => {
        res.send({ ok: 1, msg: rows })
    })
}