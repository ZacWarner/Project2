/* eslint-disable prettier/prettier */
/* eslint-disable indent */


//java for signup page.

$(document).ready(function () {
    var signForm = $("#newUsr");
    var email = $("input#inputEmail4");
    var password = $("input#inputPassword4");
    var name = $("input#inputName");
    var phone = $("input#inputPhone");
    var city = $("input#inputCity");
    var state = $("#inputState");

    var stateList = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MH", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "PW", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];

    function populateState() {
        for (let i = 0; i < stateList.length; i++) {
            var newOption = $("<option>");
            newOption.text(stateList[i]);
            $("#inputState").append(newOption);
        }
    };

    populateState();


    signForm.on("submit", function (event) {
        event.preventDefault();
        var newUsr = {
            username: email.val().trim(),
            password: password.val().trim()
        };

        var newSel = {
            name: name.val().trim(),
            email: email.val().trim(),
            phone: phone.val().trim(),
            city: city.val().trim(),
            state: state.val(),
        }
        //makes sure we got the email and password
        if (!newUsr.username || !newUsr.password) {
            return;
        }

        // let queryUrl = "http://apilayer.net/api/check?access_key=" + (process.env.EMAIL_VALIDATION_KEY) + "&email=" + newUsr.username;
        let queryUrl = "http://apilayer.net/api/check?access_key=13dfe254ebf93650d6bf38984d929d97&email=" + newUsr.username;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            if (response.smtp_check == true) {
                createNewUsr(newUsr.username, newUsr.password);
            } else {
                $("#alert .msg").text("Invalid username");
                $("#alert").fadeIn(500);
            }
            email.val("");
            password.val("");

        });
    });

    function createNewUsr(email, password) {
        $.post("/api/signup", {
            username: email,
            password: password
        }).then(function (data) {

            var newSel = {
                name: name.val().trim(),
                email: email,
                phone: phone.val().trim(),
                city: city.val().trim(),
                state: state.val(),
            }

            console.log("signed up");
            createNewSeller(newSel.name, newSel.phone, newSel.city, newSel.state, newSel.email);

            name.val("");
            phone.val("");
            city.val("");
        }).catch(handleLoginError);
    };

    function handleLoginError(err) {
        $("#alert .msg").text("User name already exists");
        $("#alert").fadeIn(500);
    };

    //this will update the seller info, and attach the user id to it.
    function createNewSeller(name, phone, city, state, email) {
        var loc = city + ", " + state;
        $.post("/api/sellers/newseller", {
            name: name,
            email: email,
            phone: phone,
            location: loc,
        }).then(function (data) {
            window.location.replace("/");
            console.log("created new seller");
        });
    };


});