---
---

"use strict";

/* ==============================
 * Google Sheets interface
 * ==============================
 */

function getPages(callback) {
  //console.log($('#sheetrock').html());
  //console.log("starting getPages");
    // The spreadsheet must be either "visible to anyone with the link", or "public on the web".


    var sheetURL = "{{site.google-sheet-url}}"
    // "https://docs.google.com/spreadsheets/d/13BgIRglusuQZhuSrMzYztKpE_tW5H9dWrM5oFxST1IA/edit?usp=sharing#gid=0"
    var pages = [];
    $('#sheetrock').sheetrock({
        url: sheetURL,
        query: "select *",
        fetchSize: 0,
        reset: true,
        target: document.getElementById("sheetrock"),
        rowTemplate: function(row) {
            //console.log(row);
            var m = row.cellsArray;
            m.title = m[0];
            m.filename = m[1];
            m.description = m[2];
            m.image = m[3];
            m.fulltext = m[4];
            //m.categories = m[4].split(",");
            //console.log(m.contentPages);
            pages.push(m);
            console.log("Row " + row.num + " is OK. Title: " + m.title);
            return $('<span></span>'); // appease the sheetrock table handler
        },
        callback: function (error, options, response) {
            //console.log("Retrieved " + pages.length + " rows.");
            //console.log(error, options, response);

            // when data is done loading, execute supplied callback function
            callback(pages);
        }
    });
}

function createCard(page,rowString) {

  //loop through supplied slugs to retrieve page title and subtitle
  //console.log("about to create card.");

    var filename = page.filename + '.html';

    console.log("processing " + filename);



    if (page.filename) {
      rowString += '<a href="sites/'+filename+'">';
      rowString += '<div class="col-sm-12 featured-card">';
      rowString += '<div style="color:#fff; height:500px; background-size:100% 100%; background-image: linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, .5)), url(\'{{base-url}}/sites/images/' + page.image + '\')">';
      //rowString += '<img src="sites/images/' + page.image + '" alt="Essay image">';
      //rowString += '</div>';
      rowString += '<div class="card-block" style="position:absolute;bottom:0;">';
      rowString += '<h4 class="card-title">' + page.title + '</h4>';
      rowString += '<p class="card-text">' + page.description + '</p>';
      rowString += '</div></div>';
      rowString += '</a>';
    }
    else {
      rowString += '<div class="col-sm-4">';
      rowString += '<div class="card">';
      rowString += '<img class="card-img-top" src="{{base-url}}/sites/images/' + page.image + '" alt="Essay image">';
      rowString += '<div class="card-block">';
      rowString += '<h4 class="card-title">' + page.title + '</h4>';
      rowString += '<p class="card-text">' + page.description + '</p>';
      rowString += '</div></div></div>';
    }

    return rowString;
}
