//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 11:20:49 CST 2017
//----------------------------------------------------------------------

'use strict'
var dbase=ms.db.mysql['admin_qile']
var sql=''
// module.exports=function(){
//     console.log('hello world')
// }

exports.index=function(req,res){
    res.render('index/main')
}

exports.get_game=function(req,res){
    res.render('index/game-index')
}

exports.get_hot=function(req,res){
    res.render('index/hot-index')
}

exports.get_news=function(req,res){
    res.render('index/news-index')
}
const is_null = (v) => v === null || v === undefined

//return bgdata
exports.get_bgdata=function(req,res){
    let cl = req.body.classify?parseInt(req.body.classify, 10):0
    ms.log.info('123',cl)
    sql=`
    select title, classify, item_id, 
    date_format(publish_at, "%Y-%m-%d %H:%i:%s") as publish_at, 
    date_format(publish_at, "%Y-%m-%d %H:%i:%s") as created_at,
    date_format(publish_at, "%Y-%m-%d %H:%i:%s") as update_at 
    from publish_item where status=1 and publish_id=101 ${cl?'and classify='+cl:''} 
    `
    ms.log.info('幕布查询',sql)
    dbase.exec_sql(sql, (err,rows)=>{
        res.send({ok:1, msg:rows})
    })
}
