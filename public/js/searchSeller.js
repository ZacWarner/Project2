$(document).ready(function () {
    var search = $("#sellerSearch");

    $(document).on("click", "#sellerSubmit", function (event) {
        event.preventDefault();

        var sellerName = search.val().trim();

        $.get("/api/sellers/name/" + sellerName).then(function (data) {
            let seller = data;

            window.location.replace("/api/sellers/id/" + seller.LoginId);

        });
    })






});