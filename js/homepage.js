$(function () {

    function carousel() {
        var $prev = $(".prev");
        var $next = $(".next");
        var count  = 1; //count记录当前是哪张图片
        var $ul = $("ul");
        var $lis = $("ul li");
        var $items = $(".item");
        var $containerBox = $(".container");
        var containerWidth = $containerBox.width();
        var changeImgTime = 1000; //切换图片所需时间为1000ms
        var carouselInterval = 3000; //轮播图的时间间隔为3000ms
        var liLen = $lis.length;

        //初始化图片列表的尺寸
        $ul.css({
            "width" : (liLen * containerWidth) + "px",
            "left" : (-1 * containerWidth) + "px"
        });

        $lis.each(function () {
            $(this).width(containerWidth + "px");
        });

        //因为在收尾各加了一张假图，故li个数比图片个数多2
        var imgCount = liLen -2;

        //更换底部小圆点的高亮状态
        function lightDot() {
            $items.each(function () {
                if($(this).index() == (count - 1) % liLen) {
                    $(this).addClass("active");
                } else {
                    $(this).removeClass("active");
                }
            });
        }

        function slide(direction) {
            if(direction == "left") {
                //让整个页面向左运动一个图片宽度，故应使left值减800
                $ul.animate({left: "-="+containerWidth}, changeImgTime);
                /*若原本是图片6，整个页面往左移动后count变为7，显示的是图片1（因为在html中在图片6后面
                 还放了一个图片1），再往后就没有图片了，所以应该把整个页面重新拉回上一个图片1，这个变化
                 不应该被用户察觉，故应把时间设置得尽可能短*/
                if(count == imgCount + 1) {
                    count = 1;
                    lightDot();
                    $ul.animate({left: -1 * containerWidth + ""}, 0.5);
                }
            } else if(direction == "right") {
                //让整个页面向右运动一个图片宽度，故应使left值加800
                $ul.animate({left: "+=" + containerWidth}, changeImgTime);
                /*若原本是图片1，整个页面往左移动后count变为0，显示的是图片6（因为在html中在图片1前面
                 还放了一个图片6），再往前就没有图片了，所以应该把整个页面重新拉回下一个图片6，这个变化
                 不应该被用户察觉，故应把时间设置得尽可能短*/
                if(count == 0) {
                    count = imgCount;
                    lightDot();
                    $ul.animate({left: -1 * imgCount * containerWidth + ""}, 0.5);
                }
            }
        }


        //给向前的按钮增加点击事件
        $prev.click(function() {
            if(! $ul.is(":animated")) {
                count++; //假设原本是图片1，按向前的按钮，就会变为图片2，故count值应该加一
                //更换底部小圆点的高亮状态
                lightDot();
                //图片移动
                slide("left");
            }
        });

        //给向后的按钮增加点击事件，道理跟向前的按钮一样
        $next.click(function () {
            if(! $ul.is(":animated")) {
                count--;
                //更换底部小圆点的高亮状态
                lightDot();
                //图片移动
                slide("right");
            }
        });

        //给小圆点增加点击事件
        $items.each(function () {
            $(this).click(function () {
                count = $(this).index() + 1;
                //改变底部小圆点状态
                lightDot();
                var left = -containerWidth * count;
                $ul.css("left", left);
            });
        });


        //自动轮播
        //自动轮播时整个页面往左移动
        var timer = null;
        autoPlay();

        function autoPlay() {
            count++;
            lightDot();
            slide("left");
            timer = setTimeout(autoPlay, carouselInterval);
        }

        //鼠标移入container时，停止自动轮播
        $containerBox.mouseover(function () {
            clearTimeout(timer);
            timer = null;
        });

        //鼠标移出container时，继续自动轮播
        $containerBox.mouseout(function () {
            timer = setTimeout(autoPlay, carouselInterval);
        });

        /*
        //当轮播图不在视图内时停止轮播,在视图内时开始轮播

        //获取屏幕可视窗口高度
        var viewportHeight = document.documentElement.clientHeight;
        //获取元素相对于文档顶部的距离
        var offsetTop = $containerBox.offsetHeight;
        //取浏览器窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离
        var scrollTop = document.documentElement.scrollTop;

        $(window).on("scroll", function () {
           if(offsetTop - scrollTop > viewportHeight) {
               clearTimeout(timer);
               timer = null;
           } else if(timer) {
               timer = setTimeout(autoPlay, carouselInterval);
           }
        });
        */
    }

    /*调用轮播图*/
    carousel();


    /*鼠标移动到具体的服务图片上时，上方显示说明文字*/
    $("#data").css("display", "block");
    $(".service").each(function () {
        $(this).on("mouseover", function () {
            var i = $(this).index();
            $(".textContent div").each(function () {
                $(this).css("display", "none");
            });

            $($(".textContent div")[i]).css("display", "block");
        });
    });

    /*点击各个选项进入静态页面*/
    $("#dataBox").on("click", function () {
        window.open("homePageData.html");
    });

    $("#mobileBox").on("click", function () {
        window.open("homePageMobile.html");
    });

    $("#locationBox").on("click", function () {
        window.open("homePageLocation.html");
    });

    //图片懒加载

    //判断图片是否在视口内
    function isInSight(el) {
        const bound = el.getBoundingClientRect();
        const clientHeight = window.innerHeight;
        //如果只考虑向下滚动加载
        //const clientWidth = window.innerWeight;
        return bound.top <= clientHeight + 100;
    }

    function checkImgs() {
        const imgs = document.getElementsByClassName('pic');
        Array.from(imgs).forEach(function (el) {
            if(isInSight(el)) {
                el.src = el.dataset.src;
            }
        });
    }


    //节流函数
    /*function throttle(fn, mustRun) {
        const timer = null;
        let previous = null;
        return function () {
            const now = new Date();
            const context = this;
            const args = arguments;
            if (!previous) {
                previous = now;
            }

            const remaining = now - previous;
            if (mustRun && remaining >= mustRun) {
                fn.apply(context, args);
                previous = now;
            }
        }
    }
    */

    var previous = null;
    var now = null;

    //监听滚轮事件
    $(window).on('scroll', function () {
        now = new Date();

        if(!previous || now - previous >= 500) {
            checkImgs();
            previous = now;
        }
    });

});
