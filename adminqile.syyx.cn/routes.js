//----------------------------------------------------------------------
//-routes.js
//-@author:xiatong
//-@date:###### Tue Aug 22 10:32:32 CST 2017
//----------------------------------------------------------------------
exports.routes = [

    //index
    { method: "get", url: "/", module: "index/main", action: "index", use_session: 0 },
    // { method: 'get', url: '/main', module: 'index/main', action: 'index', use_session: 0 },
    { method: 'get', url: '/get_bgdata', module: 'index/main', action: 'get_bgdata', use_session: 0 },
    { method: 'get', url: '/game-index', module: 'index/main', action: 'get_game', use_session: 0 },
    { method: 'get', url: '/hot-index', module: 'index/main', action: 'get_hot', use_session: 0 },
    { method: 'get', url: '/news-index', module: 'index/main', action: 'get_news', use_session: 0 },

    //push
    { method: 'get', url: '/get_pushed', module: 'index/push', action: 'get_pushed', use_session: 0 },
    { method: 'post', url: '/post_push', module: 'index/push', action: 'post_push', use_session: 0 },
    { method: 'post', url: '/post_unpush', module: 'index/push', action: 'post_unpush', use_session: 0 },


    //news
    { method: 'get', url: '/get_news_list', module: 'news/main', action: 'get_news_list', use_session: 0 },
    { method: 'post', url: '/post_news_status', module: 'news/main', action: 'post_news_status', use_session: 0 },
    { method: 'post', url: '/post_news_aoru', module: 'news/main', action: 'post_news_aoru', use_session: 0 },
    //product
    { method: 'get', url: '/get_product_list', module: 'product/main', action: 'get_product_list', use_session: 0 },
    { method: 'post', url: '/post_product_status', module: 'product/main', action: 'post_product_status', use_session: 0 },
    { method: 'post', url: '/post_product_aoru', module: 'product/main', action: 'post_product_aoru', use_session: 0 },

    //game
    { method: 'get', url: '/get_game_list', module: 'game/main', action: 'get_game_list', use_session: 0 },
    { method: 'post', url: '/post_game_status', module: 'game/main', action: 'post_game_status', use_session: 0 },
    { method: 'post', url: '/post_game_aoru', module: 'game/main', action: 'post_game_aoru', use_session: 0 },

    //employ
    { method: 'get', url: '/get_employ_list', module: 'employ/main', action: 'get_employ_list', use_session: 0 },
    { method: 'post', url: '/post_employ_status', module: 'employ/main', action: 'post_employ_status', use_session: 0 },
    { method: 'post', url: '/post_employ_aoru', module: 'employ/main', action: 'post_employ_aoru', use_session: 0 },


    //textarea
    { method: 'post', url: '/kind_editor_upload_img', module: 'kind_editor_upload_img', action: 'action', use_session: 0 },



    //登录页面
    { method: "get", url: "/login", module: "login", action: "index", use_session: 0 },
    //登录动作
    { method: "post", url: "/check_login", module: "login", action: "enter", use_session: 0 },
    //登出
    { method: "post", url: "/offline", module: "login", action: "offline", use_session: 0 },

    { method : 'get', url : '/employ',  module : 'employ/main',  action : 'index', use_session : 0},
    { method : 'get', url : '/game',    module : 'game/main',    action : 'index', use_session : 0},
    { method : 'get', url : '/index',   module : 'index/main',   action : 'index', use_session : 0},
    { method : 'get', url : '/news',    module : 'news/main',    action : 'index', use_session : 0},
    { method : 'get', url : '/product', module : 'product/main', action : 'index', use_session : 0}

]
