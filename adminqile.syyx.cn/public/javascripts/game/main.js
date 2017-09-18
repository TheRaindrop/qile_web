//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 11:20:04 CST 2017
//----------------------------------------------------------------------

$(function () {
    $('aside>nav>ul>li.active').removeClass('active')
    $('aside>nav>ul>li:nth-child(3)').addClass('active')

    var getnews = function (arr, i) {
        switch (i) {
            case 1:
                if (arr) {
                    let news = []
                    for (let i = 0; i < arr.length; i++) {
                        $.get('/get_news_list', {
                            status: 1,
                            id: arr[i]
                        }, function (ret) {
                            news.push(ret.msg[0])
                        })
                    }
                    return news
                } else {
                    return null
                }
                break
            case 2:
                $.get('/get_news_list', {
                    status: 1
                }, function (ret) {
                    modal_game.news_list = ret.msg
                })
                break
            default:
                alert('something wrong')
        }


    }

    //game find and show
    var getdata = function (query) {
        $.get('/get_game_list', query, function (ret) {
            if (ret.ok == 0 && ret.msg == '您还没有登录') {
                window.location = '/login'
            } else {
                p.list = ret.msg
            }
        })
    }
    //update game status
    var game_upd = function (id, stat) {
        $.post('/post_game_status', {
            id: id,
            stat: stat
        }, function (ret) {
            if (ret.ok == 1) {
                alert('操作成功')
            }
        })
    }
    //add game or update game
    var game_aoru = function (item) {
        $.post('/post_game_aoru', {
            item: item
        }, function (ret) {
            if (ret.ok == 1) {
                alert('操作成功')
            }
        })
    }



    var query = {
        status: 0,
        id: null,
        // author: null,
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
                modal_game.modal_data({}, 1)
            },
            refresh: function () {
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
                game_upd(this.list[index].id, stat)
                getdata(this.query)
            },
            show: function (stat, item) {
                // console.log('I will change contents here and ', item)
                if (stat != 1) {
                    modal_game.modal_data(item, 0)
                }
            }
        }
    })

    var modal_game = m = new Vue({
        el: '#modal_game',
        data: {
            item: {},
            intro_link: [],
            news_link: [],
            intro_list: [],
            news_list: [],
        },
        methods: {
            modal_data: function (item, aoru) {
                if (aoru == 1) {
                    //add
                    console.log('here i will add a game')
                    this.item = item
                    $('#modal_game input').val('')
                    $('.lg').modal('show')
                } else if (aoru == 0) {
                    //update
                    this.intro_link = item.intro_link ? item.intro_link.split(',') : null

                    this.news_link = getnews(item.news_link ? item.news_link.split(',') : null, 1)
                    this.news_list = getnews(null, 2)



                    console.log('here i will update a game')
                    this.item = item
                    $('#modal_game input[name=imgFile]').val('')
                    $('.lg').modal('show')
                } else {
                    console.log('Neither add or update, please check your code')
                }
            },
            sub_game: function (item) {
                console.log(item)
                item.news_link = []
                console.log(this.news_link)
                for (var i = 0; i < this.news_link.length; i++) {
                    item.news_link.push(this.news_link[i].id)
                }
                item.news_link = item.news_link.join(',')
                console.log('arr', item.news_link)
                if (item.id) {
                    game_aoru(item)
                    $('.lg').modal('hide')
                } else {
                    if (!item.title) {
                        alert('标题不能为空')
                    } else {
                        game_aoru(item)
                        $('.lg').modal('hide')
                    }
                }
            },
            del_item: function (index) {
                this.news_link.splice(index, 1)
            },
            upload_img: function (item, pic) {
                $('.upload_pic').fileupload({
                    autoUpload: false,
                    dataType: 'html',
                    replaceFileInput: false,
                    url: '/kind_editor_upload_img?type=story_collect',
                    add: function (e, data) {
                        if (data.originalFiles[0] && data.originalFiles[0]['size'] > 5000 * 1024) {
                            alert('文件太大，不能超过5M。'); return
                        }
                        $('.upload_progress').show()
                        data.submit()
                    },
                    done: function (e, data) {
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
                        // $('input[name=img_src]').val(data.files[0].name)
                        // $('.preshow').attr('src',result.url)
                        switch (pic) {
                            case 1:
                                item.bg_pic = result.url
                                $('.bg_pic').attr('src', result.url)
                                break
                            case 2:
                                item.pic_url = result.url
                                $('.pic_url').attr('src', result.url)
                                break
                            case 3:
                                item.qrcode = result.url
                                $('.qrcode').attr('src', result.url)
                                break
                            case 4:
                                item.news_pic = result.url
                                $('.news_pic').attr('src', result.url)
                                break
                            default:
                                alert('wtf')
                        }
                    }
                }).bind('fileuploadprogress', function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10)
                    $('.upload_progress').find('.progress').css('width', progress + '%')
                })
            }
        }

    })





    //--------------------------------编辑器---------------------------
    var editorOption = {
        uploadJson: '/kind_editor_upload_img',
        items: ['source', 'justifyleft', 'justifycenter', 'justifyright', 'fontsize',
            'forecolor', 'bold', 'underline', 'hilitecolor', 'table', 'image', 'link', 'unlink', 'undo'],
        filterMode: false,
        width: '865px'
        // height     : '300px'
    };

    var _edit = {
        editor: '',
        set_editor: function () {
            var self = this
            KindEditor.ready(function (K) {
                self.editor = K.create('#detail_content', editorOption)
            })
        }
    };
    _edit.set_editor()


})


















