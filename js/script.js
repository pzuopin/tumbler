$(document).bind("touchmove",function(e){
    e.preventDefault();
});
// 旋转
var wrap = $(".box");
changeScene();
window.onresize = function(){
    changeScene();
};
function changeScene(){
    ww = $(window).width();
    wh = $(window).height();
    if(ww < wh){
        // 竖屏
        v();
    }else{
        // 横屏
        h();
    }
}
// 横屏
function h(){
    setTimeout(function(){
        ww = $(window).width();
        wh = $(window).height();

        wrap.css({
            'left':"50%",
            'top':'50%',
            'width':ww + 'px',
            'height':wh + 'px',
            'transform':'translate3d(-50%,-50%,0)',
            '-webkit-transform':'translate3d(-50%,-50%,0)'
        });
    },300);
}
// 竖屏
function v(){
    setTimeout(function(){
        ww = $(window).width();
        wh = $(window).height();
        wrap.css({
            'left':"50%",
            'top':'50%',
            'width':wh + 'px',
            'height':ww + 'px',
            'transform':'translate3d(-50%,-50%,0) rotate(90deg)',
            '-webkit-transform':'translate3d(-50%,-50%,0) rotate(90deg)'
        });
    },300);
}
var status;
var v = 0.5;
var a = 2;
var gameInit = false;

// 重新开始
$(".restart").on("click",function(){
    if(!gameInit){
        gameStart();
        gameInit = !gameInit;
        $(".restart").html("重新开始");
    }else{
        gameRestart();
    }
});

window.requestAnimationFrame(step);
function step(){
    if(status == "play"){
        v = v + a*0.1;
        $(".tumbler").css("-webkit-transform","rotate("+ v +"deg)");
        window.requestAnimationFrame(step);
        if(parseInt($(".tumbler").css("-webkit-transform").replace("rotate(","")) <= -50){
            $(".tumbler").removeClass("right").addClass("left");
            gameEnd();
        }
        if(parseInt($(".tumbler").css("-webkit-transform").replace("rotate(","")) >= 50){
            $(".tumbler").removeClass("left").addClass("right");
            gameEnd();
        }
    }else{
        window.requestAnimationFrame(step);
    }
}

// 游戏开始
function gameStart(){
    // 陀螺仪初始化
    o = new Orienter();
    o.onOrient = function(obj){
        $(".ori-text").html(
            // 'alpha:' + obj.a +
            '<br>' + 'beta:' + obj.b +
            // '<br>' + 'gamma:' + obj.g +
            // '<br>' + 'longitude:' + obj.lon +
            // '<br>' + 'latitude:' + obj.lat +
            // '<br>' + 'direction:' + obj.dir +
            '<br>'+ 'a:'+ a +
            '<br>'+ 'v:'+ v +
            '<br>'+ 'status:'+ status+
            '<br/>'+ 'rotate'+ parseInt($(".tumbler").css("-webkit-transform").replace("rotate(",""))
        );
        if(-50 < obj.b && obj.b < 50){
            a = a+((obj.b - 0)/100);
        }else{
            v = 0;
            a = 0;
        }
    };
    o.init();
    status = "play";
}
// 游戏结束
function gameEnd(){
    status = "stop";
    o.destroy();
}
// 重新开始
function gameRestart(){
    v = 0.5;
    a = 2;
    $(".tumbler").css("-webkit-transform","rotate(0)").removeClass("left").removeClass("right");
    status = "play";
    o.init();
}
