/* eslint-disable prettier/prettier */
/* eslint-disable indent */
$(document).ready(function () {
    var sellerEmailId = "";
    console.log("Execution");
    let dataAttr = $("#tracker").attr("data-sellerid");
    let prodId = $("#tracker").attr("data-prodid");
    console.log("Seller id: " + dataAttr);

    $.get("/api/sellers/id/" + dataAttr, function (data) {
        console.log("Seller: ");
        console.log(data);
        sellerEmailId = data.email;

        $("#modalname").append(data.name);
    });

    $.get("/api/reviews/product/" + prodId, function (data) {
        console.log("Reviews");
        console.log(data);

        for (i in data) {
            let reviewcard = $("<div>");
            reviewcard.addClass("card product-card m-1");
            reviewcard.attr("data-reviewid", data[i].id);

            let title = $("<div>");
            title.html("<strong><i>" + data[i].reviewer_name + "</i></strong>");
            title.addClass("card-title mx-3");

            let review = $("<div>");
            review.html(data[i].review);
            review.addClass("card-body");

            reviewcard.append(title, review);

            $("#review-div").append(reviewcard);
        }

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