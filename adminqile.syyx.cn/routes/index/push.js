//----------------------------------------------------------------------
//-push.js
//-@author:xiatong
//-@date:###### Fri Sep 8 11:20:56 CST 2017
//----------------------------------------------------------------------

'use strict'
var dbase = ms.db.mysql['admin_qile']
var sql = ''


exports.get_pushed = function (req, res) {
    let id = req.body.publish_id

    sql = `
        select title,img_src,content,classify,item_id,
        date_format(push_at, '%Y-%m-%d %H:%i:%s') as push_at
        from publish_item where publish_id=${id} order by push_at desc`

    ms.log.info('get publish game', sql)
    dbase.exec_sql(sql, (err, rows) => {
        res.send({ ok: 1, msg: rows })
    })

}

exports.post_push = function (req, res) {
    let list = req.body
    let jud = `
        select id from publish_item where
        publish_id=${list.publish_id} and classify=${list.classify} and item_id=${list.item_id}`
    dbase.exec_sql(jud, (err, rows) => {
       
        
        if (rows[0]) {
            res.send({ ok: 0} )
        } else {
            sql = `
                insert into publish_item 
                (publish_id,title,img_src,content,classify,item_id,push_at) values
                (${list.publish_id}, '${list.title}', '${list.img_src}', "${list.content}", ${list.classify}, ${list.item_id}, now())`
            ms.log.info('post game', sql)
            dbase.exec_sql(sql, (err, rows) => {
                res.send({ ok: 1})
            })
        }
    })
    
}

exports.post_unpush = function (req, res) {
    let list = req.body
    sql = `
        delete from publish_item where publish_id=${list.publish_id} and 
        classify=${list.classify} and item_id=${list.item_id}`
    ms.log.info('post game', sql)
    dbase.exec_sql(sql, (err, rows) => {
        res.send({ ok: 1 })
    })
}