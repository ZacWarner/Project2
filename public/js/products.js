/* eslint-disable indent */
/* eslint-disable prettier/prettier */

$("#filterSearch").submit(function (event) {
    event.preventDefault();
    let category = $("#category").val().trim();
    let priceRange = $("#pricerange").val().trim();

    if (category === "Choose Category" || priceRange === "Choose Price Range") {
        return;
    }

    let priceLimits = priceRange.split("-");

    $.get("/api/products/filter/" + category + "/" + priceLimits[0] + "/" + priceLimits[1], function (data) {
        $("html").html(data);
    });

});

