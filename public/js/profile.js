/* eslint-disable prettier/prettier */
/* eslint-disable indent */
$(document).ready(function () {
    let dataAttr = $("#sellername").attr("data-sellerid");
    let dataEmail = $("#sellername").attr("data-selleremail");
    let sellerIdLocal = "", prodIdUpdate = "";
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

            let updateme = $("<button>");
            updateme.addClass("updateMe btn btn-info m-0");
            updateme.attr("data-name", data[i].name);
            updateme.attr("data-price", data[i].price);
            updateme.attr("data-id", data[i].id);
            updateme.text("update");

            let del = $("<button>");
            del.addClass("deleteProd btn btn-danger m-0 ml-2");
            del.attr("data-id", data[i].id);
            del.text("delete");

            let body = $("<div>");
            body.addClass("card-body product-card");
            body.append(title, prodPrice, txt, updateme, del);

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
        sellerIdLocal = data.id;

        $("#inputMyName").attr("value", data.name);
        $("#inputMyPh").attr("value", data.phone);
        $("#inputMyLoc").attr("value", data.location);
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

    $("#editInfo").on("click", function (event) {
        event.preventDefault();
        $("#infoEditModal").modal("show");
    });

    $("#updateInfo").on("click", function (event) {
        let name = $("#inputMyName").val().trim();
        let ph = $("#inputMyPh").val().trim();
        let loc = $("#inputMyLoc").val().trim();

        let newInfo = {
            name: name,
            email: dataEmail,
            phone: ph,
            location: loc,
            photo: "link",
            id: dataAttr
        };

        $.ajax({
            method: "PUT",
            url: "/api/sellers/editseller/" + sellerIdLocal,
            data: newInfo
        }).then(function (data, err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Updated!");
            }
        });
    });

    $(document).on("click", ".updateMe", function (event) {
        event.preventDefault();
        prodIdUpdate = $(this).attr("data-id");

        $("#inputProdName").attr("value", $(this).attr("data-name"));
        $("#inputProdPrice").attr("value", $(this).attr("data-price"));

        console.log("prod id: " + prodIdUpdate);
        $("#prodEditModal").modal("show");
    });

    $("#updateProd").on("click", function (event) {
        let prodName = $("#inputProdName").val().trim();
        let prodPrice = $("#inputProdPrice").val();
        let prodDesc = $("#inputProdDesc").val().trim();
        console.log("prod id:: " + prodIdUpdate);
        let newInfo = {
            name: prodName,
            price: prodPrice,
            description: prodDesc,
            id: dataAttr
        };

        $.ajax({
            method: "PUT",
            url: "/api/products/editproduct/" + prodIdUpdate,
            data: newInfo
        }).then(function (data, err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Updated!");
            }
        });
    });

    $(document).on("click", ".deleteProd", function (event) {
        let prodIdDel = $(this).attr("data-id");
        $.ajax({
            method: "DELETE",
            url: "/api/products/deleteproduct/" + dataAttr + "/" + prodIdDel
        }).then(function (data, err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Deleted!");
            }
            location.reload();
        });
    });

    $("#postProd").on("click", function (event) {

        let prodName = $("#prodName").val().trim();
        let prodPrice = $("#prodPrice").val();
        let prodDesc = $("#prodDesc").val().trim();
        let prodCategory = $("#prodCategory").val().trim();
        let prodImg = "https://meenakrs.s3-us-west-1.amazonaws.com/smile.jpg";

        console.log(prodName + ", " + prodPrice + ", " + prodDesc + ", " + prodCategory + ", " + prodImg);
        $.post("/api/products/newproduct", {
            name: prodName,
            price: prodPrice,
            category: prodCategory,
            picture: prodImg,
            description: prodDesc,
            id: dataAttr
        }).then(function (data) {
            console.log("New product added!");
            location.reload();
        });
    });

    // Code File Upload

    /*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
    function uploadFile(file, signedRequest, url) {
        console.log("Upload File");
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    document.getElementById('preview').src = url;
                    document.getElementById('avatar-url').value = url;
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    }
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    function getSignedRequest(file) {
        console.log("Upload Signed");
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    uploadFile(file, response.signedRequest, response.url);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    }
    /*
     Function called when file input updated. If there is a file selected, then
     start upload procedure by asking for a signed request from the app.
    */
    function initUpload() {
        console.log("Upload Init");
        const files = document.getElementById("file-input").files;
        const file = files[0];
        if (file === null) {
            return alert("No file selected.");
        }
        getSignedRequest(file);
    }
    /*
     Bind listeners when the page loads.
    */
    (() => {
        document.getElementById("prodImg").onchange = initUpload;
    })();

});