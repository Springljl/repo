const vue = new Vue({
    el: '#app',
    data: {
        username: "张三",
        leftMenus: [
            { name: '功能1', url: "#", child: [{ name: '功能11', url: "1.html" }] },
            { name: '功能2', url: "#", child: [{ name: '功能21', url: "2.html" }] }
        ]
    },
    created: function () {
        axios.get("//n").then(function (res) {
            console.log(res.data)
        })
    },
    methods: {
        clearBg() {
            $(".leftMenu .layui-nav-child").children().removeClass("layui-this")
        }
    }
})
$(function () {
    var timer;
    window.onresize = function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            $("iframe").css({ width: '100%', height: $(window).height() - $("#mbx").height() - $(".layui-footer").height() - $(".layui-header").height() })
        }, 500);
    }
    $("iframe").css({ width: '100%', height: $(window).height() - $("#mbx").height() - $(".layui-footer").height() - $(".layui-header").height() })
    layui.use('element');
    $(".menu").click(function () {
        if ($('li[lay-id="' + $(this).attr("href") + '"]').length == 0) {//说明原面包屑中没有该菜单项，需要往面包屑添加
            $("#mbx>li").removeClass("layui-this")
            $("#mbx").append('<li lay-id="' + $(this).attr("href") + '" class="layui-this"><span>' + $(this).html() + '</span><i class="mbx_close layui-icon layui-icon-unselect layui-tab-close">ဆ</i></li>')
        } else {//说明原面包屑中没有该菜单项，只需要将该项对应的面包屑设为选中，并跳转到对应页面即可
            $("#mbx>li").removeClass("layui-this")
            $('li[lay-id="' + $(this).attr("href") + '"]').addClass("layui-this")
            window.open($(this).attr("href"), "body")
        }
    })
    $(document).on("click", "#mbx>li", function () {
        vue.clearBg();
        window.open($(this).attr("lay-id"), "body")
        for (let i = 0; i < $(".leftMenu .layui-nav-child").children().length; i++) {
            let t = $($(".leftMenu .layui-nav-child").children()[i])
            if (t.children().eq(0).attr("href") == $(this).attr("lay-id")) {
                t.addClass("layui-this")
            }
        }
    })
    $(document).on("click", ".mbx_close", function () {
        if ($(this).parent().next().length == 0 && $(this).parent().prev().length == 0) {
            //当所有页面都关闭后，显示默认页面
            window.open("aa.html", "body")
        }
        //当点击面包屑右侧删除图标的时候，如果该项在点击之前是选中状态，如果其后面还有标签，则直接跳转到后面一个标签，如果后面没有标签，则跳转到前面一个标签
        if ($(this).parent().hasClass("layui-this")) {
            vue.clearBg();
            let href;
            $("#mbx>li").removeClass("layui-this")
            if ($(this).parent().next().length == 0) {//说明该标签是最后一个标签
                $(this).parent().prev().addClass("layui-this")
                window.open($(this).parent().prev().attr("lay-id"), "body")
                href = $(this).parent().prev().attr("lay-id");
            } else {//说明该标签不是最后一个标签
                $(this).parent().next().addClass("layui-this")
                window.open($(this).parent().next().attr("lay-id"), "body")
                href = $(this).parent().next().attr("lay-id");
            }
            for (let i = 0; i < $(".leftMenu .layui-nav-child").children().length; i++) {
                let t = $($(".leftMenu .layui-nav-child").children()[i])
                if (t.children().eq(0).attr("href") == href) {
                    t.addClass("layui-this")
                }
            }
        }
        $(this).parent().remove();
        return false;//阻止事件冒泡
    });
})