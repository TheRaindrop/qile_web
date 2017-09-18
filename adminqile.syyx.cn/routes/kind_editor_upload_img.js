exports.action = function(req, res) {
    var up_config = {
        base_dir : '/r.syyx.com/public/_att/qile/imgs/',
        date_dir : 0
    }
    var file_config = {
        type_reg : /jpg|png|bmp|jpeg|gif|txt|rar|zip|7z/
    }

    ms.upload_files.upload(req, up_config, file_config, function(err, files) {
        if (err) {
            res.send({error: 1, msg: err.toString()}); return
        }
        console.log("----------",files)

        res.send(JSON.stringify({url: files.imgFile.url, error: 0}))
    })
}



/* var file_conf = {
    max_size : 3 * 1024 * 1024,
    type_reg : /jpg|png|gif|blob/
}
var upload_msg = {
    '-1' : '系统繁忙',
    '1' : '上传的文件为空',
    '2' : '只支持jpg,png,gif',
    '3' : '图片大小不能超过3M',
}


exports.upload = function (req, res) {   
    ms.upload_files.upload(req, upload_conf, file_conf, function (err, result) {
        if (err) {
            ms.log.error('upload err', err)
            res.send({ ret : rets.upload_err, msg : err }); return
        }

        var data = values(result)[0]

        model.resize_img(data, req.app.dir, function (e, new_url) {
            if (e) {
                ms.log.error(e)
                res.send({ ret : rets[e], msg : '不支持的文件类型' })
                return
            }
            
            data.url = new_url
            res.send(JSON.stringify({ ret : rets.success, data : data }))
        })
    })
} */