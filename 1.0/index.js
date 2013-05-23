/**
 * @fileoverview 请修改组件描述
 * @author xijian.py<ensonfield@gmail.com>
 * @module sidebar
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 请修改组件描述
     * @class Sidebar
     * @constructor
     * @extends Base
     */
    function Sidebar(comConfig) {
        var self = this;
        //调用父类构造函数
        Sidebar.superclass.constructor.call(self, comConfig);
    }
    S.extend(Sidebar, Base, /** @lends Sidebar.prototype*/{

    }, {ATTRS : /** @lends Sidebar*/{

    }});
    return Sidebar;
}, {requires:['node', 'base']});



