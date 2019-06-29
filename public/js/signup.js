

//java for signup page.

$(document).ready(function () {
    var signForm = $("#newUsr");
    var email = $("input#inputEmail4");
    var password = $("input#inputPassword4");

    signForm.on("submit", function (event) {
        event.preventDefault();
        var newUsr = {
            username: email.val().trim(),
            password: password.val().trim()
        };

        //makes sure we got the email and password
        if (!newUsr.username || !newUsr.password) {
            return;
        }

        createNewUsr(newUsr.username, newUsr.password);
        email.val("");
        password.val("");

    });

    function createNewUsr(email, password) {
        $.post("/api/signup", {
            username: email,
            password: password
        }).then(function (data) {
            window.location.replace("/");
            console.log("signed up");
        }).catch(handleLoginError);
    };

    function handleLoginError(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    };


});