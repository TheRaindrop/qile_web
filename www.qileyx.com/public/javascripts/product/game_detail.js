//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 10:40:04 CST 2017
//----------------------------------------------------------------------
$(function(){
    $('.head_nav .inav a.active').removeClass('active')
    $('.head_nav .inav a.product').addClass('active')
    
    var GetRequest=function() {   
        var url = location.search; //获取url中"?"符后的字串   
        var theRequest = new Object();   
        if (url.indexOf("?") != -1) {   
           var str = url.substr(1);   
           strs = str.split("&");   
           for(var i = 0; i < strs.length; i ++) {   
              theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
           }   
        }   
        return theRequest;   
    }
    var Request=new Object()
    Request=GetRequest()
    // var id=Request['id']
    $.get('/get_game_detail',{
        id:Request['id']
    },function(ret){
        var data=ret.msg
        var s='<p class="title">'+data[0].title+'</p>'
            +'<p class="date">日期: '+data[0].publish_at+'</p>'
            +'<div class="hr"></div>'
            +'<p class="content">'+data[0].content+'</p>'
        $('.article').html(s)
    })




})