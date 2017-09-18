//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 10:43:22 CST 2017
//----------------------------------------------------------------------

'use strict'
var dbase = ms.db.mysql['admin_qile']
var sql = ''

exports.get_game_list = function(req, res){
    sql = `select id,title,pic_url,summary from game where status=1 order by publish_at desc`
    ms.log.info('get game', sql)
    dbase.exec_sql(sql, (err, rows) => {
        res.send({ ok: 1, msg: rows })
    })
}
