//----------------------------------------------------------------------
//-main.js
//-@author:xiatong
//-@date:###### Fri Sep 8 10:40:04 CST 2017
//----------------------------------------------------------------------
$(window).load(function () {
    var wd_h=$(window).height()
    var ih_h=$('.ihead').height()
    var if_h=$('.ifooter').height()
    var ic_h=$('.icontainer').height()
    if (ic_h<wd_h-ih_h-if_h) {
        $('.container').css({
            'min-height': wd_h-ih_h-if_h
        })
        // ms.sqlstr.escape(str)
    }
})