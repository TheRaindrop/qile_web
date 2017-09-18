//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 11:20:39 CST 2017
//----------------------------------------------------------------------

'use strict'
var dbase = ms.db.mysql['admin_qile']
var sql = ''

exports.index = function(req, res) {
    res.render('employ/main')
}

exports.get_employ_list = function (req, res) {
    let list = req.body
    // ms.log.info('123',list)
    sql = `
    select id,title,type,work_place,content,
    date_format(create_at, "%Y-%m-%d %H:%i:%s") as create_at, 
    date_format(publish_at, "%Y-%m-%d %H:%i:%s") as publish_at 
    from employ where 
    ${list.status ? 'status=' + list.status : ''} 
    ${list.id ? 'and id=' + list.id : ''} 
    ${list.title ? 'and title="' + list.title + '"' : ''} 
    ${list.type ? 'and type="' + list.type + '"' : ''} 
    ${list.work_place ? 'and work_place="' + list.work_place + '"' : ''} 
    order by create_at desc
    `
    ms.log.info('get employ', sql)
    dbase.exec_sql(sql, function (err, rows) {
        // console.log(arguments)
        res.send({ ok: 1, msg: rows })
    })
}

exports.post_employ_status = function (req, res) {
    let id = req.body.id
    let stat = req.body.stat
    console.log(req.body)
    if (stat == 1){
        sql = `
        update employ set status=${stat}, publish_at=now() where id=${id}
    `
    } else {
        sql = `
        update employ set status=${stat}, update_at=now() where id=${id}
    `
    }
    ms.log.info('update employ', sql)
    dbase.exec_sql(sql, function (err) {
        // console.log(arguments)
        res.send({ ok: 1 })
    })

}

exports.post_employ_aoru = function (req, res) {
    let item = req.body.item
    if (item.id) {
        console.log('update employ')
        sql = `
            update employ set title='${item.title}',
            type='${item.type}',
            work_place='${item.work_place}',
            content='${item.content}',
            update_at=now()
            where id=${item.id}
        `
        ms.log.info('update employ', sql)
        dbase.exec_sql(sql, function (err) {
            res.send({ok: 1})
        })
    }else {
        console.log('add a new one')
        sql = `
            insert into employ (title, type, work_place, content, create_at, status) 
            values ('${item.title}', '${item.type}', '${item.work_place}', '${item.content}', now(), 0)
        `
        ms.log.info('add employ', sql)
        dbase.exec_sql(sql, function (err) {
            res.send({ok: 1})
        })
    }
    console.log('prepare add or update', item)
}



