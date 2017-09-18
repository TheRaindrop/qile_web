//----------------------------------------------------------------------
//-game_detail.js
//-@author:xiatong
//-@date:###### Fri Sep 8 10:43:12 CST 2017
//----------------------------------------------------------------------

'use strict'
var dbase = ms.db.mysql['admin_qile']
var sql = ''

exports.game_detail = function (req, res) {
    res.render('product/game_detail')
}

exports.get_game_detail=function(req, res){
    let id=ms.sqlstr.escape(req.body.id)
    sql = `select title, date_format(publish_at, "%Y-%m-%d %H:%i:%s") as publish_at,content from game where id=${id}`
    ms.log.info('get game detail', sql)
    dbase.exec_sql(sql, (err, rows) => {
        res.send({ ok: 1, msg: rows })
    })
}