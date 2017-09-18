//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 10:42:42 CST 2017
//----------------------------------------------------------------------

'use strict'
var dbase = ms.db.mysql['admin_qile']
var sql = ''


exports.get_bg = function (req, res) {
    sql =  `select title,img_src,content,classify,item_id from publish_item where publish_id = 101 order by push_at desc`
    ms.log.info('get background image', sql)
    dbase.exec_sql(sql, (err, rows) => {
        res.send({ ok: 1, msg: rows })
    })
}


exports.get_gameList = function (req, res) {
    sql = `select img_src,title,content from publish_item where publish_id = 102 order by push_at desc`
    ms.log.info('get gamelist', sql)
    dbase.exec_sql(sql, (err, rows) => {
        res.send({ ok: 1, msg: rows })
    })
}

exports.get_gameHot = function (req, res) {
    sql = `select title,item_id, 
    date_format(push_at, "%Y-%m-%d %H:%i:%s") as push_at,content,img_src from 
    publish_item where publish_id = 103 order by push_at desc`
    ms.log.info('get hot game', sql)
    dbase.exec_sql(sql, (err, rows) => {
        res.send({ ok: 1, msg: rows })
    })
}

exports.get_data = function (req, res) {
    sql = `select title,item_id,
    date_format(push_at, "%Y-%m-%d %H:%i:%s") as 
    push_at from publish_item where publish_id=104 order by push_at desc`
    ms.log.info('get new list', sql)
    ms.log.info('get news list', sql)
    dbase.exec_sql(sql, (err, rows) => {
        res.send({ ok: 1, msg: rows })
    })
}