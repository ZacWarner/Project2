/* eslint-disable prettier/prettier */
/* eslint-disable indent */

var sellerEmailId = "";

$.ajax({
    url: "api/sellers/6",
    type: "GET"
}).then(
    function (data) {
        console.log(data);
        sellerEmailId = data.email;
        $("#sellername").append(data.name);
        $("#sellerPh").append(data.phone);
        $("#sellerEmail").append(data.email);
        $("#sellerLoc").append(data.location);

        $("#modalname").append(data.name);
    }
);

$.ajax({
    url: "/api/products/seller/2",
    type: "GET"
}).then(
    function (data) {
        console.log(data);
        for (i in data) {
            console.log(data[i].picture);

            var productdiv = $("<div>");
            productdiv.addClass("card bg-info slide");

            var title = $("<div>");
            title.html(data[i].name);
            title.addClass("card-title");

            var img = $("<img>");
            img.addClass("card-img-top image");
            img.attr("src", data[i].picture);
            img.attr("width", "200");
            img.attr("height", "200");
            img.addClass("m-1");

            var purchase = $("<a>");
            purchase.addClass("card-body");
            purchase.html("<a href=\"#\">Show more details</a>"); //Redirect to product page

            productdiv.append(img, title, purchase);

            $(".product-images").append(productdiv);

            $(".product-images").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
            });
        }
    }
);

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
