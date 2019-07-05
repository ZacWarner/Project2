/* eslint-disable indent */
/* eslint-disable prettier/prettier */

var categoriesDistinct = [];

// To filter distinct values from an array of elements
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// Load categories into drop down options
function populateCategory() {
    console.log("populating");
    for (let i = 0; i < categoriesDistinct.length; i++) {
        var newOption = $("<option>");
        newOption.text(categoriesDistinct[i]);
        $("#category").append(newOption);
    }
}

function grabCategories() {
    // Fetch categories from product table
    $.get("/api/products", function (data) {
        let categories = [];
        for (i in data) {
            categories.push(data[i].category);
        }
        console.log(categories);
        categoriesDistinct = categories.filter(onlyUnique);
        console.log(categoriesDistinct);
        populateCategory();
    });
}
grabCategories();

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

