//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 10:40:04 CST 2017
//----------------------------------------------------------------------
$(function () {
    $('.head_nav .inav a.active').removeClass('active')
    $('.head_nav .inav a.index').addClass('active')

    //幕布滚动  
    function scroll() {
        var wid = $(window).width()
        function auto() {
            var n = parseInt($('.carousel> .icons> .selected').attr('data-id'))
            if(n===4){
                $('.bg').css('left', -wid)
                $('.d' + 4).css('left', 0)
                $('.carousel> .icons> .selected').removeClass('selected')
                $('.carousel> .icons> .icon_1').addClass('selected')//
                $('.d' + 4).animate({
                    left: wid
                }, 'slow').hide(1)
                $('.d' + 1).animate({
                    left: 0
                }, 'slow').show()
                n=1
            }else if(n<4){
                $('.bg').css('left', wid)
                $('.d' + n).css('left', 0)
                $('.carousel> .icons> .selected').removeClass('selected')
                $('.d' + n).animate({
                    left: -wid
                }, 'slow').hide(1)
                n++
                $('.carousel> .icons> .icon_'+n).addClass('selected')
                $('.d' + n).animate({
                    left: 0
                }, 'slow').show()
            }else{
                console.log('err:out of range '+typeof n)
            }
        }
        $('.carousel> .icons> .icon').mouseenter(function () {
            if ($('.bg').is(':animated')) return
            if ($(this).hasClass('selected')) return
            if(change){
                clearInterval(change)
                change=null
            }

            $('.carousel> .icons> .icon').css('')
            var now = $('.carousel> .icons> .selected').attr('data-id')
            var fur = $(this).attr('data-id')


            if (fur > now) {
                $('.bg').css('left', wid)
                $('.d' + now).css('left', 0)
                $('.carousel> .icons> .selected').removeClass('selected')
                $(this).addClass('selected')
                $('.d' + now).animate({
                    left: -wid
                }, 'slow').hide(1)
                $('.d' + fur).animate({
                    left: 0
                }, 'slow').show()
            } else {
                $('.bg').css('left', -wid)
                $('.d' + now).css('left', 0)
                $('.carousel> .icons> .selected').removeClass('selected')
                $(this).addClass('selected')
                $('.d' + now).animate({
                    left: wid
                }, 'slow').hide(1)
                $('.d' + fur).animate({
                    left: 0
                }, 'slow').show()
            }
        })
        $('.carousel> .icons> .icon').mouseleave(function(){
            if(change){
                clearInterval(change)
                change=null
            }
            change=setInterval(auto,3000)
        })
        var change=setInterval(auto,3000)
    }
    //图片翻转
    function slide() {
        $('.game-list>ul.list').on('mouseenter', 'li', function (e) {
            $(this).children('.hide').slideDown('fast')
        })
        $('.game-list>ul.list').on('mouseleave', 'li', function (e) {
            $(this).children('.hide').slideUp('fast')
        })
    }
    

    //获取动态列表
    $.get('/get_data', function (ret) {
        var s = ''
        var data = ret.msg
        for (var i = 0; i < data.length; i++) {
            s += '<li class="mouse" item_id="'+data[i].item_id+'">'
                + '<a>' + data[i].title
                + '</a>'
                + '<span>' + data[i].push_at + '</span>'
                + '</li>'
        }
        $('ul.news-list').html(s)
    })
    //获取幕布
    $.get('/get_bg', function (ret) {
        var data = ret.msg
        var s
        for (var i = 0; i < data.length; i++) {
            s=''
            var u = 'url("' + data[i].img_src + '")'
            $('.d' + (i + 1)).css({
                'background-image': u
            }).attr({
                'classify':data[i].classify,
                'item_id':data[i].item_id
            })
            s='<div class="text">'
                +'<p class="title">'+data[i].title+'</p>'
                +'<p class="summary">'+data[i].content+'</p>'
                +'<button>了解更多</button>'
                +'</div>'
            $('.d' + (i + 1)).html(s)
        }
    })

    //游戏列表
    $.get('/get_gameList', function (ret) {
        var data = ret.msg
        var s = ''
        for (var i = 0; i < data.length; i++) {
            s += '<li class="game"><a href="#">'
                + '<img src="' + data[i].img_src + '">'
                + '</a>'
                + '<div class="hide"><strong>' + data[i].title + '</strong>'
                + '<hr/><img src="' + data[i].content + '">'
                + '<span>扫码下载</span></div>'
                + '</li>'
        }
        $('.game-list>ul.list').html(s)
    })


    //最热游戏
    $.get('/get_gameHot', function (ret) {
        var data = ret.msg
        var s = '<div class="pic" item_id="'+data[0].item_id+'">'
            +'<img src="' + data[0].img_src + '"></div>'
            + '<div class="text">'
            + '<p class="title">' + data[0].title + '</p>'
            + '<p class="data">' + data[0].push_at + '</p><hr/>'
            + '<p class="content">' + data[0].content + '</p>'
            + '</div>'
        $('.new-s>.hottest').html(s)
    })

    //动态跳转
    $('.new-s>.news>ul.news-list').on('click','li',function(){
        var url='detail?id='+$(this).attr('item_id')
        window.location.href=url
    })
    //幕布跳转
    $('body').on('click','a.bg',function(){
        var w=parseInt($(this).attr('classify'))
        var url
        switch(w){
            case 1:
                url='game_detail?id='+$(this).attr('item_id')
                break
            case 2:
                url='detail?id='+$(this).attr('item_id')
                break
            // case 3:
            default:
                console.log('no match')
        }
        window.location.href=url
    })
    //最热游戏跳转
    $('.new-s>.hottest').on('click','.pic',function(){
        var url='game_detail?id='+$(this).attr('item_id')
        window.location.href=url
    })


    scroll()
    slide()
})