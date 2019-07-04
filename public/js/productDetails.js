/* eslint-disable prettier/prettier */
/* eslint-disable indent */
$(document).ready(function () {
    var sellerEmailId = "";
    console.log("Execution");
    let dataAttr = $("#trackseller").attr("data-sellerid");
    console.log("Seller id: " + dataAttr);

    $.get("/api/sellers/id/" + dataAttr, function (data) {
        console.log("Seller: ");
        console.log(data);
        sellerEmailId = data.email;

        $("#modalname").append(data.name);
    });


    $("#dropEmail").on("click", function (event) {
        event.preventDefault();
        $("#emailmodal").modal("show");
    });

    $("#sendemail").on("click", function () {
        var usrEmail = $("#inputUserEmail").val().trim();
        var msg = $("#inputMessage").val().trim();

        $.post("/api/sellers/sendemail", {
            to: sellerEmailId,
            from: usrEmail,
            message: msg
        }).then(function (res) {
            console.log(res);
        }).catch(function (err) {
            console.log(err);
        });
    });

});