//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 10:42:33 CST 2017
//----------------------------------------------------------------------

'use strict'
var dbase = ms.db.mysql['admin_qile']
var sql = ''

exports.get_emp_list = function(req, res){
    sql = 'select id,title,type,work_place, date_format(publish_at, "%Y-%m-%d %H:%i:%s") as publish_at from employ where status=1'
    ms.log.info('get employ', sql)
    dbase.exec_sql(sql, (err, rows) => {
        res.send({ ok: 1, msg: rows })
    })
}