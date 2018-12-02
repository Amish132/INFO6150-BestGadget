$(document).ready(function(){
    var from, to, subject, text;
    //to = $("#to").val();
    to= "amish132@gmail.com";
    $("#message").text("Sending E-mail...Please wait");
    $.get("http://localhost:8080/orderConfirmation", { to: to }, function (data) {
        if (data == "orderConfirmation") {
            $("#message").empty().html("<p>Email is been sent at " + to + " . Please check inbox !</p>");
        }

    });
});
