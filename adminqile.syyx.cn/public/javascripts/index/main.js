//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 11:19:36 CST 2017
//----------------------------------------------------------------------

$(function(){
    $('aside>nav>ul>li.active').removeClass('active')
    $('aside>nav>ul>li:nth-child(1)').addClass('active')

      //-------------------find form table
    var getdata = function () {
        $.get('/get_game_list', {
            status: 1
        }, function (ret) {
            if (ret.ok==0&&ret.msg=='您还没有登录'){
                window.location='/login'
            } else {
                publish.list = ret.msg
            }
        })
    }
    getdata()

    var getpush = function () {
        $.get('/get_pushed', {
            publish_id: 101
        }, function (ret) {
            if (ret.ok==0&&ret.msg=='您还没有登录'){
                window.location='/login'
            } else {
                push.list = ret.msg
            }
        })
    }
    getpush()

    var pushitem = function (item) {
        $.post('/post_push', {
            publish_id: 101,
            title: item.title,
            img_src: item.pic_url,
            content: item.summary,
            classify: 1,
            item_id: item.id
        }, function (ret) {
            if (ret.ok == 1) {
                alert('推送成功')
            } else if (ret.ok == 0) {
                alert('推送已存在')
            }
        })
    }

    var unpushitem = function (item) {
        $.post('/post_unpush', {
            publish_id: 101,
            classify: 1,
            item_id: item.item_id
        }, function (ret) {
            if (ret.ok == 1) {
                alert('删除成功')
            }
        })
    }


    var publish = new Vue({
        el: '#publish',
        data: {
            list: []
        },
        methods: {
            push: function (index) {
                
                if (push.list.length >= 4) {
                    alert('aleardy full')
                } else {
                    // pushitem(this.list[index])
                    modal_game.modal_data(this.list[index])
                    console.log(this.list[index])
                }
                
            }
        }
    })


    var push = new Vue({
        el: '#push',
        data: {
            list: []
        },
        methods: {
            unpush: function (index) {
                unpushitem(this.list[index])
                console.log(this.list[index])
                getpush()
            }
        }
    })

    var modal_game = m = new Vue({
        el: '#modal_game',
        data: {
            item: {}
        },
        methods: {
            modal_data: function (item) {
                //push
                console.log('here i will push a game to the index page')
                this.item = item
                $('#modal_game input').val('')
                $('.mid').modal('show')
                item.pic_url = null
            },
            sub_page: function (item) {
                console.log(item)
                if(!item.pic_url){
                    alert('图片地址不能为空')
                    console.log(item)
                }else{
                    pushitem(item)
                    $('.mid').modal('hide')
                }
                getpush()
                console.log('here we are going to submit')
            },
            upload_img: function(item){
                $('.upload_pic').fileupload({
                    autoUpload          : false,
                    dataType            : 'html',
                    replaceFileInput    : false,
                    url                 : '/kind_editor_upload_img?type=story_collect',
                    add                 : function(e, data) {
                        if(data.originalFiles[0] && data.originalFiles[0]['size'] > 50000 * 1024) {
                            alert('文件太大，不能超过50MB。'); return
                        }
                        $('.upload_progress').show()
                        data.submit()
                    },
                    done                : function(e, data) {
                        $('.upload_progress').hide()
                        $('.upload_progress .progress').css('width', '0px')
                        
                        if (!data || !data.result) {
                            alert('图片上传失败，请重试！'); return
                        }
                        var result = JSON.parse(data.result)
        
                        if (result.error != 0) {
                            var msg = result.msg || '图片上传失败，请重试！'
                            alert(msg); return
                        }
                        $('input[name=img_src]').val(data.files[0].name)
                        // $('.preshow').attr('src',result.url)
                        item.pic_url = result.url
                    }
                }).bind('fileuploadprogress', function (e, data) { 
                    var progress  = parseInt(data.loaded / data.total * 100, 10)
                    $('.upload_progress').find('.progress').css('width', progress + '%') 
                })
            }
        }
    })






})