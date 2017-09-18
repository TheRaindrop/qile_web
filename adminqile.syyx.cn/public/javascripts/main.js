//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 11:19:00 CST 2017
//----------------------------------------------------------------------

$(function () {
    console.log('outest main.js')
    $('.logout').click(function () {
        $.post('/offline', function (ret) {
            alert('您已退出登录')
            window.location='/login'
            console.log('ok')
        })

    })
})