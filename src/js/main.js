(function main() {
    "use strict";
    // make project section visible by default when using smaller device
    var windowWidth = $(window).width();
    if(windowWidth < 1000) {
        $(".project-section").css({ opacity : "1"});
    }

    // when user resize broswer width to less than 1000px, make project section visible
    $(window).on("resize", function(event){
        var windowWidth = $(window).width();
        if(windowWidth < 1000) {
            $(".project-section").css({ opacity : "1"});
        }
    });

    // when projects menu item is clicked on the navigator bar, move scroll down to project section
    $(".projects-menu").click(function() {$("html,body").animate({scrollTop: $(".project-section").offset().top},"slow");});

    // when scroll down to near project section make it visible
    $(window).scroll(function() {
        if ($(window).scrollTop() >= $(".project-section").offset().top-500) {
            $(".project-section").animate({"opacity":"1"},800);
        }
    });
})();