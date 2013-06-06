/**
 * @fileoverview 请修改组件描述
 * @author xijian.py<ensonfield@gmail.com>
 * @module sidebar
 **/
KISSY.add(function (S, Node,Base,Mask) {

    "use strict";

    var EMPTY = '',
        $ = Node.all,
        ios = S.UA.ios,
        webkit = S.UA.webkit,
        BODY   = $(document.body),
        WIN    = $(window),
        DOC    = $(document);
    /**
     * sidebar构造函数
     * @class Sidebar
     * @constructor
     * @extends Base
     */
    function Sidebar(comConfig) {
        Sidebar.superclass.constructor.call(this, comConfig);
        this.init();
    }
    S.extend(Sidebar, Base, /** @lends Sidebar.prototype*/{
        /**
         * 初始化
         * @method init
         * @public
         */
        init: function(){
            var that = this;
            that.id = that.get('id');
            that.zIndex = that.get('zIndex');
            that.duration = that.get('duration');
            that.className = that.get('className');
            that.container = that.get('container');
            that.modalOpacity = that.get('modalOpacity');
            that.modalFade = that.get('modalFade');
            that.con = S.Node('<div id="'+that.id+'" class="'+that.className+'"></div>');
            that.con.css({
                display:'none'
            }).appendTo('body');
            that.initMask();
        },

        initMask: function(){
            var that = this;
            that.mask = new Mask({
                opacity:that.modalOpacity,
                fade:that.modalFade
            });
        },
        destroy:function(){

        },
        doAnimIn:function(container){
            var that = this;
            var width = container.width();
            var con = that.con;
            con.css({
                display:'block',
                width:width + 'px',
                height:window.innerHeight + 'px',
                position:'fixed',
                'z-index':that.zIndex,
                top:0+'px',
                right:window.innerWidth + 'px'
            });
            container.css({
                height:window.innerHeight + 'px',
                display:'block'
            });
            S.Anim(con,{
                right:(window.innerWidth - width) + 'px'
            },that.duration,'easeIn',function(){
                that.fire('boxShow',{
                    container:container
                });
            }).run();
        },
        doAnimOut: function(){
            var that = this;
            var con = that.con;
            S.Anim(con,{
                right:window.innerWidth + 'px'
            },that.duration,'none',function(){
                that.fire('boxHide',{
                    container:that.container
                });
                con.css({
                    display:'none'
                });
                that.container.css({
                    display:'none'
                });
            }).run();
        },
        hide: function(){
            var that = this;
            var con = that.con;
            that.doAnimOut();
            if(that.mask.masked()){
                that.mask.removeMask();
            }
        },
        show: function(container){
            var that = this;
            var con = that.con;
            if(that.isShow()){
                return;
            }
            if(S.isUndefined(container)){
                if(S.isUndefined(that.container)){
                    throw("容器未定义,请传入参数:show(container)");
                    return;
                }
                container = that.container;
            }
            container = S.one(container);

            if(S.isUndefined(that.container) || S.isNull(that.container)){
                that.container = container;
            } else if(that.container === container){

            } else {
                that.container.css({
                    display:'none'
                }).appendTo('body');
                that.container = container;
            }

            if(container.parent() !== con){
                con.append(container);
            }
            that.doAnimIn(container);
            that.mask.addMask();
            that.mask.getMask().on(S.UA.mobile?'click':'click',function(){
                that.hide();
                that.mask.removeMask();
            });
        },
        isShow: function(){
            var that = this;
            var con = that.con;
            if(con.css('display') == 'block'){
                return true;
            } else {
                return false;
            }
        }

    }, {ATTRS : /** @lends Sidebar*/{
        id:{
            value:'SB-Wrapper-'+S.now()
        },
        zIndex:{
            value: 1000
        },
        duration:{
            value: 0.2
        },
        container:{
            setter:function(s){
                return S.one(s);
            },
            value:null
        },
        className:{
            value:''
        },
        modalOpacity: {
            value: 0.6
        },
        modalFade:{
            value: true
        }
    }});
    return Sidebar;
}, {requires:['node', 'base','mobile/simple-mask/1.0/']});



