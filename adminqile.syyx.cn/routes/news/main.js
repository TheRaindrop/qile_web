//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 11:21:05 CST 2017
//----------------------------------------------------------------------

'use strict'
var dbase = ms.db.mysql['admin_qile']
var sql = ''

exports.index = function(req, res) {
    res.render('news/main')
}

exports.get_news_list = function (req, res) {
    let list = req.body
    // ms.log.info('123',list)
    sql = `
    select id,title,author,content,
    date_format(create_at, "%Y-%m-%d %H:%i:%s") as create_at, 
    date_format(publish_at, "%Y-%m-%d %H:%i:%s") as publish_at 
    from news where 
    ${list.status ? 'status=' + list.status : ''} 
    ${list.id ? 'and id=' + list.id : ''} 
    ${list.author ? 'and author="' + list.author + '"' : ''} 
    ${list.title ? 'and title="' + list.title + '"' : ''} 
    order by create_at desc
    `
    ms.log.info('get news', sql)
    dbase.exec_sql(sql, function (err, rows) {
        // console.log(arguments)
        
        res.send({ ok: 1, msg: rows })
    })


}

exports.post_news_status = function (req, res) {
    let id = req.body.id
    let stat = req.body.stat
    console.log(req.body)
    if (stat == 1){
        sql = `
        update news set status=${stat}, publish_at=now() where id=${id}
    `
    } else {
        sql = `
        update news set status=${stat}, update_at=now() where id=${id}
    `
    }
    ms.log.info('update news', sql)
    dbase.exec_sql(sql, function (err) {
        // console.log(arguments)
        res.send({ ok: 1 })
    })

}

exports.post_news_aoru = function (req, res) {
    let item = req.body.item
    if (item.id) {
        console.log('update news')
        sql = `
            update news set title='${item.title}',
            author='${item.author}',
            content='${item.content}',
            update_at=now()
            where id=${item.id}
        `
        ms.log.info('update news', sql)
        dbase.exec_sql(sql, function (err) {
            res.send({ok: 1})
        })
    }else {
        console.log('add a new one')
        sql = `
            insert into news (title, author, content, create_at, status) 
            values ('${item.title}', '${item.author}', '${item.content}', now(), 0)
        `
        ms.log.info('add news', sql)
        dbase.exec_sql(sql, function (err) {
            res.send({ok: 1})
        })
    }
    console.log('prepare add or update', item)
}





































