
//----------------------------------------------------------------------
//-routes.js
//-@author:xiatong
//-@date:###### Mon Aug 21 18:02:49 CST 2017
//----------------------------------------------------------------------

exports.routes = [
    //---------------------------------------------------------------------------------------------------------index
    { method: 'get', url: '/get_data', module: 'index/main', action: 'get_data', use_session: 0 },
    { method: 'get', url: '/get_bg', module: 'index/main', action: 'get_bg', use_session: 0 },
    { method: 'get', url: '/get_gameList', module: 'index/main', action: 'get_gameList', use_session: 0 },
    { method: 'get', url: '/get_gameHot', module: 'index/main', action: 'get_gameHot', use_session: 0 },


    //----------------------------------------------------------------------------------------------------------news
    // { method : 'get',   url : '/news',          module : 'news/main',   action : 'news',        use_session　: 0},
    { method: 'get', url: '/get_news_list', module: 'news/main', action: 'get_news_list', use_session: 0 },
    { method: 'get', url: '/detail', module: 'news/detail', action: 'detail', use_session: 0 },
    { method: 'get', url: '/get_news_detail', module: 'news/detail', action: 'get_news_detail', use_session: 0 },
    
    
    
    
    //-----------------------------------------------------------------------------------------------------------product
    // { method : 'get',   url : '/product',       module : 'product/main',   action : 'product',     use_session　: 0},
    { method: 'get', url: '/get_game_list', module: 'product/main', action: 'get_game_list', usesession: 0 },
    { method: 'get', url: '/game_detail', module: 'product/game_detail', action: 'game_detail', use_session: 0 },
    { method: 'get', url: '/get_game_detail', module: 'product/game_detail', action: 'get_game_detail', use_session: 0 },
    





    //-----------------------------------------------------------------------------------------------------------employ
    // { method : 'get',   url : '/employ',        module : 'employ/main',   action : 'employ',      use_session　: 0},
    { method: 'get', url: '/get_emp_list', module: 'employ/main', action: 'get_emp_list', usesession: 0 },
    { method: 'get', url: '/emp_detail', module: 'employ/emp_detail', action: 'emp_detail', use_session: 0 },
    { method: 'get', url: '/get_emp_detail', module: 'employ/emp_detail', action: 'get_emp_detail', use_session: 0 },


    
    //----------------------------------------------------------------------------------------------------------- 访问日志
    { method: 'get', url: '/home_log', module: 'home_log', action: 'index', use_session: 0 }
]
