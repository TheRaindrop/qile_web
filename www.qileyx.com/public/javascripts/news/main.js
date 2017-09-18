//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 10:40:04 CST 2017
//----------------------------------------------------------------------

$(function () {
    $('.head_nav .inav a.active').removeClass('active')
    $('.head_nav .inav a.news').addClass('active')
    //分页列表居中
    var pageCenter = function () {
        var width = $('.container> .pages> ul.page').width()
        $('.container> .pages> ul.page').css({
            'left': '50%',
            'margin-left': -(width / 2)
        })
    }

    //获取动态列表以及分页
    $.get('/get_news_list', function (ret) {
        var data = ret.msg
        var s = '',
            p = ''
        var len = data.length
        var pageSize = 10
        var pageCount = Math.ceil(len / pageSize)
        var currentPage = 1
        $('<li><a href="#" class="prev">上一页</a></li>').appendTo('.pages> ul.page')
        for (var i = 1; i <= pageCount; i++){
            // p+='<li><a href="#" class="index" pageNum="'+i+'"/a>'
            //     +'</li>'
            $('<li><a href=\"#\" class=\"index\" pageNum=\"' + i + '\"/a>' + i + '</li>').appendTo('.pages> ul.page')
        }
        $('<li><a href="#" class="next">下一页</a></li>').appendTo('.pages> ul.page')
        $('.pages> ul.page>li>a[pageNum="1"]').addClass('active')
        pageCenter()

        
        var showPage=function(n){
            s=''
            var whichPage=parseInt(n)
            $('.new-list> ul.news').html(s)
            var l=(whichPage==pageCount)?len:whichPage*pageSize
            for (var i = (whichPage-1)*pageSize; i < l; i++) {
                s += '<li class="mouse"><a news_id="' + data[i].id + '">'
                    + '<span class="title">' + data[i].title + '</span>'
                    + '<span class="date">' + data[i].publish_at + '</span>'
                    + '</a></li>'
            }
            $('.new-list> ul.news').html(s)
        }
        showPage(1)
        $('.pages> ul.page> li> a.index').click(function(){
            if($(this).hasClass('active'))return
            showPage($(this).attr('pageNum'))
            $('.pages> ul.page> li> a.active').removeClass('active')
            $(this).addClass('active')
        })
        $('.pages> ul.page> li> a.prev').click(function(){
            if($('.pages> ul.page> li> a.active').attr('pageNum')=='1')return
            var n=parseInt($('.pages> ul.page> li> a.active').attr('pageNum'))
            showPage(n-1)
            $('.pages> ul.page> li> a.active').removeClass('active')
            $('.pages> ul.page>li>a[pageNum="'+(n-1)+'"]').addClass('active')
        })
        $('.pages> ul.page> li> a.next').click(function(){
            if($('.pages> ul.page> li> a.active').attr('pageNum')==pageCount)return
            var n=parseInt($('.pages> ul.page> li> a.active').attr('pageNum'))
            showPage(n+1)
            $('.pages> ul.page> li> a.active').removeClass('active')
            $('.pages> ul.page>li>a[pageNum="'+(n+1)+'"]').addClass('active')
        })
        
    })

    //动态链接跳转
    $('.new-list>ul.news').on('click','a',function(e){
        var url='detail?id='+$(this).attr('news_id')   
        window.location.href=url
        
    })

    //======================执行函数

})