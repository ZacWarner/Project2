/* eslint-disable prettier/prettier */
/* eslint-disable indent */
$(document).ready(function () {
    let dataAttr = $("#sellername").attr("data-sellerid");
    console.log("sellerId: " + dataAttr);
    $.get("/api/products/seller/" + dataAttr, function (data) {
        console.log("Products");
        console.log(data);
        $("#prodList").empty();
        for (i in data) {
            console.log(data[i].picture);

            let productdiv = $("<div>");
            productdiv.addClass("card product-card m-2");

            let title = $("<div>");
            title.html(data[i].name);
            title.addClass("card-title");

            let img = $("<img>");
            img.addClass("card-img-top thumbnail image");
            img.attr("src", data[i].picture);
            img.attr("width", "200");
            img.attr("height", "200");

            let purchase = $("<a>");
            purchase.attr("href", "/api/products/" + data[i].id);
            purchase.append(img);

            let prodPrice = $("<div>");
            prodPrice.addClass("productPrice");
            let price = $("<p>");
            price.html("Price: $" + data[i].price);
            prodPrice.append(price);

            let txt = $("<p>");
            txt.addClass("card-text");
            txt.html(data[i].description);

            let body = $("<div>");
            body.addClass("card-body product-card");
            body.append(title, prodPrice, txt);

            productdiv.append(purchase, body);

            $("#prodList").append(productdiv);
        }
    });

    $.get("/api/sellers/id/" + dataAttr, function (data) {
        console.log("Seller");
        console.log(data);
        $("#sellername").prepend(data.name);
        $("#sellerPh").append(data.phone);
        $("#sellerEmail").append(data.email);
        $("#sellerLoc").append(data.location);
    });

    $.get("/api/reviews/seller/" + dataAttr, function (data) {
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
});