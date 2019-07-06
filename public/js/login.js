

//java for login page.

$(document).ready(function () {
    var login = $("#login");
    var email = $("input#inputEmail");
    var password = $("input#inputPassword");

    login.on("submit", function (even) {
        event.preventDefault();
        var userData = {
            email: email.val().trim(),
            password: password.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        loginUser(userData.email, userData.password);
        email.val("");
        password.val("");

    });

    function loginUser(email, password) {
        $.post("/api/login", {
            username: email,
            password: password
        }).then(function (data) {
            console.log(data);
            window.location.replace("/profile/" + data.id + "/" + data.username);

        }).catch(function (err) {
            console.log(err);
        });
    };
    console.log(user)

});