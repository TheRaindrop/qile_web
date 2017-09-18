//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 11:18:38 CST 2017
//----------------------------------------------------------------------

$(function () {
    $('aside>nav>ul>li.active').removeClass('active')
    $('aside>nav>ul>li:nth-child(6)').addClass('active')
    // employlist = []

    //employ find and show
    var getdata = function (query) {
        $.get('/get_employ_list', query, function (ret) {
            if (ret.ok==0&&ret.msg=='您还没有登录'){
                window.location='/login'
            } else {
                p.list = ret.msg
            }
        })
    }
    //update employ status
    var employ_upd = function (id, stat) {
        $.post('/post_employ_status', {
            id: id,
            stat: stat
        }, function (ret) {
            if (ret.ok == 1) {
                alert('操作成功')
            }
        })
    }
    //add employ or update employ
    var employ_aoru = function (item) {
        $.post('/post_employ_aoru',{
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
                modal_employ.modal_data({}, 1)
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
                employ_upd(this.list[index].id, stat)
                getdata(this.query)
            },
            show: function (stat, item) {
                // console.log('I will change contents here and ', item)
                if(stat != 1){
                    modal_employ.modal_data(item, 0)
                }
            }
        }
    })

    var modal_employ = m = new Vue({
        el: '#modal_employ',
        data: {
            item: {}
        },
        methods: {
            modal_data: function (item, aoru) {
                if (aoru == 1) {
                    //add
                    console.log('here i will add a employ')
                    var s='<p class="title">职位信息</p><div class="hr"></div>'
                        +'<p class="content"></p><p class="title">岗位要求</p>'
                        +'<div class="hr"></div><p class="content"><br /></p>'
                        +'<p class="title">职位职责</p><div class="hr"></div>'
                        +'<p class="content"><br /></p>'
                    
                    this.item = item
                    _edit.editor.html(s)
                    $('.lg').modal('show')
                } else if (aoru == 0) {
                    //update
                    console.log('here i will update a employ')
                    this.item = item
                    _edit.editor.html(item.content?item.content:'')
                    $('.lg').modal('show')
                } else {
                    console.log('Neither add or update, please check your code')
                }
            },
            sub_employ: function (item) {
                item.content = _edit.editor.html()
                console.log(item)
                if (item.id) {
                    console.log('update', item)
                    employ_aoru(item)
                } else {
                    console.log('add a new one', item)
                    if(!(item.title&&item.type&&item.work_place&&item.content)){
                        alert('标题、作者、内容不能为空')
                    }else{
                        employ_aoru(item)
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











