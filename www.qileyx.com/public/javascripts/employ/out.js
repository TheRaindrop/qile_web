$(function(){$(".head_nav .inav a.active").removeClass("active");$(".head_nav .inav a.employ").addClass("active");var h=function(){var a=$(".container> .pages> ul.page").width();$(".container> .pages> ul.page").css({left:"50%","margin-left":-(a/2)})};$.get("/get_emp_list",function(a){var c=a.msg,d="",g=c.length,f=Math.ceil(g/8);$('<li><a href="#" class="prev">\u4e0a\u4e00\u9875</a></li>').appendTo(".pages> ul.page");for(a=1;a<=f;a++)$('<li><a href="#" class="index" pageNum="'+a+'"/a>'+a+"</li>").appendTo(".pages> ul.page");
$('<li><a href="#" class="next">\u4e0b\u4e00\u9875</a></li>').appendTo(".pages> ul.page");$('.pages> ul.page>li>a[pageNum="1"]').addClass("active");h();var e=function(a){d="";var b=parseInt(a);$(".new-list> ul.news").html(d);a=b==f?g:8*b;for(b=8*(b-1);b<a;b++)d+='<tr class="mouse" emp_id="'+c[b].id+'"><td><a>'+c[b].title+"</a></td><td>"+c[b].type+"</td><td>"+c[b].work_place+"</td><td>"+c[b].publish_at+"</td>";$(".post-list> table.post> tbody").html(d)};e(1);$(".pages> ul.page> li> a.index").click(function(){$(this).hasClass("active")||
(e($(this).attr("pageNum")),$(".pages> ul.page> li> a.active").removeClass("active"),$(this).addClass("active"))});$(".pages> ul.page> li> a.prev").click(function(){if("1"!=$(".pages> ul.page> li> a.active").attr("pageNum")){var a=parseInt($(".pages> ul.page> li> a.active").attr("pageNum"));e(a-1);$(".pages> ul.page> li> a.active").removeClass("active");$('.pages> ul.page>li>a[pageNum="'+(a-1)+'"]').addClass("active")}});$(".pages> ul.page> li> a.next").click(function(){if($(".pages> ul.page> li> a.active").attr("pageNum")!=
f){var a=parseInt($(".pages> ul.page> li> a.active").attr("pageNum"));e(a+1);$(".pages> ul.page> li> a.active").removeClass("active");$('.pages> ul.page>li>a[pageNum="'+(a+1)+'"]').addClass("active")}})});$(".post-list> table.post> tbody").on("click","tr",function(){var a="emp_detail?id="+$(this).attr("emp_id");window.location.href=a})});