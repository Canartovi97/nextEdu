
$(document).ready(function () {

    setTimeout(function () {
        $(".inscipcion").animate({ "left": "3vw" }, 500)
        $(".img-side_intro").animate({ "left": "58vw" }, 500)
    }, 100)


});

$(function () {
    $(".btn").click(function () {
        $(".form-signin").toggleClass("form-signin-left");
        $(".form-signup").toggleClass("form-signup-left");
        $(".frame").toggleClass("frame-long");
        $(".signup-inactive").toggleClass("signup-active");
        $(".signin-active").toggleClass("signin-inactive");
        $(".forgot").toggleClass("forgot-left");
        $(this).removeClass("idle").addClass("active");
    });
});

$(function () {
    $(".btn-signup").click(function () {
        $(".nav").toggleClass("nav-up");
        $(".form-signup-left").toggleClass("form-signup-down");
        $(".success").toggleClass("success-left");
        $(".frame").toggleClass("frame-short");
    });
});

$(function () {

    $(".btn-signin").click(function () {
        var email = document.getElementById("userName").value;
        var pasword = document.getElementById("userPaswrod").value;
        /* alert(email + " "+ pasword) */
        if (email == "camilo") {
            $(".btn-animate").toggleClass("btn-animate-grow");
            $(".welcome").toggleClass("welcome-left");
            $(".cover-photo").toggleClass("cover-photo-down");
            /* $(".frame").toggleClass("frame-short"); */
            $(".profile-photo").toggleClass("profile-photo-down");
            $(".btn-goback").toggleClass("btn-goback-up");
            $(".forgot").toggleClass("forgot-fade");
            setTimeout(function () {                
                window.location.href = "../modules/menu.html";
            }, 1500)            
        } else {
            alert("Usuario no registrado")
        }
    });
});