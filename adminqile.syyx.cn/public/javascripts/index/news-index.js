//----------------------------------------------------------------------
//-news-index.js
//-@author:xiatong
//-@date:###### Fri Sep 8 11:19:47 CST 2017
//----------------------------------------------------------------------

$(function(){
    $('aside>nav>ul>li.active').removeClass('active')
    $('aside>nav>ul>li:nth-child(1)').addClass('active')


    //-------------------find form table
    var getdata = function () {
        $.get('/get_news_list', {
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
            publish_id: 104
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
            publish_id: 104,
            title: item.title,
            // content: item.content,
            classify: 2,
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
            publish_id: 104,
            classify: 2,
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
                if (push.list.length >= 11) {
                    alert('aleardy full')
                } else {
                    pushitem(this.list[index])
                    console.log(this.list[index])
                    getpush()
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






})