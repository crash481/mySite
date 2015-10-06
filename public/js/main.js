

$(".menu_button").hover(
    function(){
        $(this).stop().animate({height:"75px",backgroundColor:"rgb(84,61,48)",color:"white", borderBottomRightRadius:"10px",borderBottomLeftRadius:"10px"},300);
    },
    function(){
        $(this).stop().animate({height:"60px", backgroundColor: "transparent",color:"rgb(84,61,48)",borderRadius:"0px"},300);
    }
);




$(function() {
    $('.slides').slidesjs({
        width: 1250,
        height: 430,

        play: {
            auto: true,
            interval: 3000
        }
    });
});



$(".tailImg").click(function(){														//реализация просмотра фото
    var width = $(window).width() * 0.7;
    $(".background1").css({"display":"block"});
    $(this).css({ "width": width ,"height":"auto","position":"fixed", "z-index":"100",
        "overflow": "auto","margin": "auto","top": "0", "left": "0", "bottom": "0", "right": "0" });
    $(this).closest(".tail").append("<img src='img/icon_close.svg' class='closeImg'>");
    var height = $(this).height();
    $(this).closest(".tail").children(".closeImg").css({ "right": "12%" ,"top": ($(window).height()-height)/2-40 });
});

$(".zoomImg").click(function(){														//реализация просмотра фото
    $(this).siblings(".tailImg").click();
});


$(".tail").on("click", ".closeImg", function() { 					// реализация выхода из режима просмотра
    $(this).closest(".tail").children(".tailImg").removeAttr("style");
    $(this).closest(".tail").children(".tailImg").css({"width": "220px", "height": "140px"});
    $(".closeImg").remove();
    $('.background1').hide();
});

if ("ontouchstart" in window || navigator.msMaxTouchPoints)
{
    $('*').unbind('mouseenter').unbind('mouseleave');
}