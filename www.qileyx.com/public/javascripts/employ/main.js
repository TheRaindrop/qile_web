//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 10:40:04 CST 2017
//----------------------------------------------------------------------
$(function(){
    $('.head_nav .inav a.active').removeClass('active')
    $('.head_nav .inav a.employ').addClass('active')

    //分页列表居中
    var pageCenter = function () {
        var width = $('.container> .pages> ul.page').width()
        $('.container> .pages> ul.page').css({
            'left': '50%',
            'margin-left': -(width / 2)
        })
    }
    //获取职位列表以及分页
    $.get('/get_emp_list', function (ret) {
        var data = ret.msg
        var s = ''
        var len = data.length
        var pageSize = 8
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
                s += '<tr class="mouse" emp_id="'+data[i].id+'"><td><a>'+data[i].title+'</a></td>'
                    +'<td>'+data[i].type+'</td>'
                    +'<td>'+data[i].work_place+'</td>'
                    +'<td>'+data[i].publish_at+'</td>'
            }
            $('.post-list> table.post> tbody').html(s)
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
    $('.post-list> table.post> tbody').on('click','tr',function(e){
        var url='emp_detail?id='+$(this).attr('emp_id')   
        window.location.href=url
    })



})