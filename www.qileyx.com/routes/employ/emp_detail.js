//----------------------------------------------------------------------
//-emp_detail.js
//-@author:xiatong
//-@date:###### Fri Sep 8 10:42:25 CST 2017
//----------------------------------------------------------------------

'use strict'
var dbase = ms.db.mysql['admin_qile']
var sql = ''

exports.emp_detail = function (req, res) {
    res.render('employ/emp_detail')
}

exports.get_emp_detail=function(req, res){
    let id=ms.sqlstr.escape(req.body.id)
    sql = 'select content from employ where id='+id
    ms.log.info('get employ detail', sql)
    dbase.exec_sql(sql, (err, rows) => {
        res.send({ ok: 1, msg: rows })
    })
}