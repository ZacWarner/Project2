/* eslint-disable prettier/prettier */
/* eslint-disable indent */
$.ajax({
    url: "api/sellers/2",
    type: "GET"
}).then(
    function (data) {
        console.log(data);
        $("#sellerPh").append(data.phone);
        $("#sellerEmail").append(data.email);
        $("#sellerLoc").append(data.location);
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
            var products = $("<img>");
            products.attr("src", data[i].picture);
            products.attr("width", "200");
            products.attr("height", "200");
            products.addClass("m-1");
            $(".product-images").append(products);
        }
    }
);