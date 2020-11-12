/*$(function() {
    $("#nav a").click(function() {
        $("#nav a").css({
            "color": "#c81417",
            "borderBottom": "5px solid #c81417"
        })
        $("#nav a").hover()
    })
})

// nav
var nav1 = document.querySelector(".nav1");
var aNavs = nav1.children;

for (var i in aNavs) {
    aNavs[i].onclick = function() {
        aNavs.style.color = " #c81417";
        aNavs.style.borderBottom = "5px solid #c81417"


    }
}*/
// right右边栏
$(function() {
    $("#right-guide li").click(function() {
        $("#right").animate({
            "right": "-3px"
        })
    })
})