/* eslint-disable prettier/prettier */
/* eslint-disable indent */
$(document).ready(function () {
    var sellerEmailId = "";
    console.log("Execution");
    let dataAttr = $("#sellername").attr("data-sellerid");
    console.log("Seller id: " + dataAttr);
    console.log("/api/sellers/id/" + dataAttr);
    console.log("/api/products/seller/" + dataAttr);

    $.ajax({
        url: "/api/products/seller/" + dataAttr,
        type: "GET"
    }).then(
        function (data) {
            console.log("Products");
            console.log(data);
            $(".product-images").empty();
            for (i in data) {
                console.log(data[i].picture);

                let productdiv = $("<div>");
                productdiv.addClass("card product-card slide mx-2");

                let title = $("<div>");
                title.html(data[i].name + ", $" + data[i].price);
                title.addClass("card-title text-center");

                let img = $("<img>");
                img.addClass("card-img-top image");
                img.attr("src", data[i].picture);
                img.attr("width", "200");
                img.attr("height", "200");

                let purchase = $("<a>");
                purchase.attr("href", "/api/products/" + data[i].id);
                purchase.append(img);

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

    $.get("/api/sellers/id/" + dataAttr, function (data) {
        console.log("Seller");
        console.log(data);
        sellerEmailId = data.email;
        $("#sellername").prepend(data.name);
        $("#sellerPh").append(data.phone);
        $("#sellerEmail").append(data.email);
        $("#sellerLoc").append(data.location);

        $("#modalname").append(data.name);
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


    $("#dropEmail").on("click", function (event) {
        event.preventDefault();
        $("#emailmodal").modal("show");
    });

    $("#sendemail").on("click", function () {
        let usrEmail = $("#inputUserEmail").val().trim();
        let msg = $("#inputMessage").val().trim();

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

    $("#addreview").on("click", function (event) {
        event.preventDefault();
        $("#reviewmodal").modal("show");
    });

    $("#postreview").on("click", function () {
        let reviewerName = $("#inputReviewerName").val().trim();
        let review = $("#inputReview").val().trim();
        let prodId = $("#inputProdId").val().trim();

        $.post("/api/reviews/newreview", {
            reviewer_name: reviewerName,
            review: review,
            product_id: prodId,
            sellerid: dataAttr
        }).then(function (data) {
            console.log("New comment added!");
        });
    });
});