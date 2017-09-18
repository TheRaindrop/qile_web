//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 11:21:14 CST 2017
//----------------------------------------------------------------------

'use strict'
var dbase = ms.db.mysql['admin_qile']
var sql = ''
var esc = ms.sqlstr.escape

exports.index = function(req, res) {
    res.render('game/main')
}

exports.get_game_list = function (req, res) {
    let list = req.body
    // ms.log.info('123',list)
    sql = `
    select id, title, bg_pic, bg_sum, pic_url, qrcode, news_pic, news_sum, intro_link, news_link
    from game where 
    ${list.status ? 'status=' + list.status : ''} 
    ${list.id ? 'and id=' + list.id : ''} 
    ${list.title ? 'and title="' + list.title + '"' : ''} 
    order by create_at desc
    `
    ms.log.info('get game', sql)
    dbase.exec_sql(sql, function (err, rows) {
        res.send({ ok: 1, msg: rows })
    })


}

exports.post_game_status = function (req, res) {
    let id = req.body.id
    let stat = req.body.stat
    console.log(req.body)
    if (stat == 1){
        sql = `
        update game set status=${stat}, publish_at=now() where id=${id}
    `
    } else {
        sql = `
        update game set status=${stat}, update_at=now() where id=${id}
    `
    }
    ms.log.info('update game', sql)
    dbase.exec_sql(sql, function (err) {
        res.send({ ok: 1 })
    })

}

exports.post_game_aoru = function (req, res) {
    let item = req.body.item
    if (item.id) {
        console.log('update game')
        sql = `
            update game set title=${esc(item.title)},
            bg_pic = ${esc(item.bg_pic)},
            bg_sum = ${esc(item.bg_sum)},
            pic_url = ${esc(item.pic_url)},
            qrcode = ${esc(item.qrcode)},
            news_pic = ${esc(item.news_pic)},
            news_sum = ${esc(item.news_sum)},
            intro_link = ${esc(item.intro_link)},
            news_link = ${esc(item.news_link)},
            update_at=now()
            where id=${item.id}
        `
        ms.log.info('update game', sql)
        dbase.exec_sql(sql, function (err) {
            res.send({ok: 1})
        })
    }else {
        console.log('add a new one')
        sql = `
            insert into game (title, bg_pic, bg_sum, pic_url, qrcode, news_pic, news_sum, intro_link, news_link, create_at, status) 
            values (${esc(item.title)}, ${esc(item.bg_pic)}, ${esc(item.bg_sum)}, ${esc(item.pic_url)}, ${esc(item.qrcode)}, ${esc(item.news_pic)},
            ${esc(item.news_sum)}, ${esc(item.intro_link)}, ${esc(item.news_link)}, now(), 0)
        `
        ms.log.info('add game', sql)
        dbase.exec_sql(sql, function (err) {
            res.send({ok: 1})
        })
    }
    console.log('prepare add or update', item)
}












