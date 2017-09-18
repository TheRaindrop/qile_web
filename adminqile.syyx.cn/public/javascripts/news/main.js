//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 11:19:55 CST 2017
//----------------------------------------------------------------------

$(function () {
    $('aside>nav>ul>li.active').removeClass('active')
    $('aside>nav>ul>li:nth-child(5)').addClass('active')
    // newslist = []

    //news find and show
    var getdata = function (query) {
        $.get('/get_news_list', query, function (ret) {
            if (ret.ok==0&&ret.msg=='您还没有登录'){
                window.location='/login'
            } else {
                p.list = ret.msg
            }
        })
    }
    //update news status
    var news_upd = function (id, stat) {
        $.post('/post_news_status', {
            id: id,
            stat: stat
        }, function (ret) {
            if (ret.ok == 1) {
                alert('操作成功')
            }
        })
    }
    //add news or update news
    var news_aoru = function (item) {
        $.post('/post_news_aoru',{
            item: item
        }, function (ret) {
            if (ret.ok == 1) {
                alert('操作成功')
            }
        })
    }
    
   

    var query = {
        status: 1,
        id: null,
        author: null,
        title: null
    }

    var findForm = f = new Vue({
        el: '#find_form',
        data: {
            query: query
        },
        methods: {
            search: function () {
                getdata(this.query)
            },
            add: function () {
                modal_news.modal_data({}, 1)
            },
            refresh: function (){
                getdata(this.query)
            }
        }
    })
    findForm.search()


    var publish = p = new Vue({
        el: '#publish',
        data: {
            list: [],
            query: query
        },
        methods: {
            upd: function (index, stat) {
                // console.log(this.list[index].id)
                news_upd(this.list[index].id, stat)
                getdata(this.query)
            },
            show: function (stat, item) {
                // console.log('I will change contents here and ', item)
                if(stat != 1){
                    modal_news.modal_data(item, 0)
                }
            }
        }
    })

    var modal_news = m = new Vue({
        el: '#modal_news',
        data: {
            item: {}
        },
        methods: {
            modal_data: function (item, aoru) {
                if (aoru == 1) {
                    //add
                    console.log('here i will add a news')
                    this.item = item
                    _edit.editor.html('')
                    $('.lg').modal('show')
                } else if (aoru == 0) {
                    //update
                    console.log('here i will update a news')
                    this.item = item
                    _edit.editor.html(item.content)
                    $('.lg').modal('show')
                } else {
                    console.log('Neither add or update, please check your code')
                }
            },
            sub_news: function (item) {
                item.content = _edit.editor.html()
                console.log(item)
                if (item.id) {
                    console.log('update', item)
                    news_aoru(item)
                } else {
                    console.log('add a new one', item)
                    if(!(item.title&&item.author&&item.content)){
                        alert('标题、作者、内容不能为空')
                    }else{
                        news_aoru(item)
                        $('.lg').modal('hide')
                    }
                }
                
                console.log('here we are going to submit')
            }
        }

    })





    //--------------------------------编辑器---------------------------
    var editorOption = { 
        uploadJson : '/kind_editor_upload_img',
        items      : ['source', 'justifyleft', 'justifycenter', 'justifyright', 'fontsize', 
                      'forecolor', 'bold', 'underline', 'hilitecolor', 'table', 'image','link', 'unlink','undo'],
        filterMode : false,
        width      : '865px'
        // height     : '300px'
    };

    var _edit = {
        editor : '',
        set_editor: function() {
            var self = this          
            KindEditor.ready(function(K) {
                self.editor = K.create('#detail_content', editorOption)
            })
        }
    };
    _edit.set_editor()


})

