/* eslint-disable prettier/prettier */
/* eslint-disable indent */

var sellerEmailId = "";

$.ajax({
    url: "api/sellers/1",
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
    url: "/api/products/seller/1",
    type: "GET"
}).then(
    function (data) {
        console.log(data);
        $(".product-images").empty();
        for (i in data) {
            console.log(data[i].picture);

            var productdiv = $("<div>");
            productdiv.addClass("card bg-info slide mx-2");

            var title = $("<div>");
            title.html(data[i].name + ", $" + data[i].price);
            title.addClass("card-title text-center");

            var img = $("<img>");
            img.addClass("card-img-top image");
            img.attr("src", data[i].picture);
            img.attr("width", "200");
            img.attr("height", "200");

            var purchase = $("<a>");
            // purchase.addClass("card-body text-center py-5");
            //Route to be updated 
            //Redirect to specific product page
            // purchase.html("<a href=\"/products\">Show more</a>");
            purchase.attr("href", "/products");
            purchase.append(img);

            // productdiv.append(title, img, purchase);
            productdiv.append(title, purchase);

            $(".product-images").append(productdiv);
        }

        // $(".product-images").slick("unslick");
        $(".product-images").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
        });
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
