// min ... max - 1
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function createBackground() {
    var background = document.createElement("div");
    background.setAttribute("id", "background");
    return background;
}

function createGrid(name, id) {
    var grid = document.createElement("div");
    var header = createGridHeader(name);
    grid.setAttribute("class", "grid");
    grid.setAttribute("id", id);
    // Initialize
    var $grid = $('#'+id).isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        sortBy: 'eid',
        getSortData: {
            'eid': '.eid parseInt',
            'category': '[category]' 
        }
    });
    $grid.isotope('insert', header);
    //var iso = new Isotope(grid, {
    //    // options
    //    itemSelector: '.grid-item',
    //    layoutMode: 'fitRows',
    //    //sortBy: 'eid',
    //    getSortData: {
    //        'eid': '.eid parseInt',
    //        'category': '[category]' 
    //    }
    //});
    //iso.insert(header);
    return grid;
}

function createGridHeader(name) {
        var header = document.createElement("div");
        header.setAttribute("class", "grid-item grid-header");
        header.innerHTML = name;
        return header;
}

function createItem(id) {
        //var container = document.getElementById(location);
        var newItem= document.createElement("div");
        newItem.setAttribute("class", "grid-item");
        newItem.setAttribute("id", id);

        var eid= document.createElement("p");
        eid.setAttribute("class", "eid");
        eid.innerHTML = id;
        newItem.appendChild(eid);

        var i = getRandomInt(0, iconList.length);
        var img= document.createElement("img");
        img.setAttribute("src", iconList[i]);
        img.setAttribute("class", "item-icon");
        newItem.setAttribute("category", categoryList[i]);
        //img.setAttribute("id", iconList[i]);
        newItem.appendChild(img);

        return newItem;
}

var colorList = [];

var locationList = [];
locationList.push("Backstock");
locationList.push("Salesfloor");

var iconList = [];
iconList.push("images/glasses.svg");
iconList.push("images/heels.svg");
iconList.push("images/outercoats.svg");
iconList.push("images/shirts.svg");
iconList.push("images/skirts.svg");
iconList.push("images/sneakers.svg");
iconList.push("images/trousers.svg");
iconList.push("images/watches.svg");

var categoryList = [];
categoryList.push("glasses");
categoryList.push("heels");
categoryList.push("outercoats");
categoryList.push("shirts");
categoryList.push("skirts");
categoryList.push("sneakers");
categoryList.push("trousers");
categoryList.push("watches");

var gridList = [];

$(document).ready(function(){

    $("#startButton").click(function(){
        var background = createBackground();
        var grid = createGrid("BACK STOCK", "Backstock");
        background.appendChild(grid);
        grid = createGrid("SALES FLOOR", "Salesfloor");
        background.appendChild(grid);
        document.body.appendChild(background);
    });
    $("#removeButton").click(function(){
        //$("#0005").hide('slow');
        //var block = document.getElementById("4");
        //hideBlock(block);
    });
    $("#addButton").click(function(){
        var id = getRandomInt(0, 99);
        var item = document.getElementById(id);
        if (item === null) {
            // New block
            var location;
            var i = getRandomInt(0, locationList.length);
            location = locationList[i];
            var newItem = createItem(id);

            //var $grid = $('#'+location).isotope();
            //$grid.isotope( 'insert', newItem );

            var grid = document.querySelector('#'+location)
            var iso = Isotope.data(grid);
            iso.insert(newItem);
        } else { // item found
            var parentGrid = item.parentElement;
            var location;
            if (parentGrid.id == "Backstock") {
                location = "Salesfloor";
            } else {
                location = "Backstock";
            }
            var grid = document.querySelector('#'+location)
            var curIso = Isotope.data(parentGrid);
            var anotherIso = Isotope.data(grid);
            var cloneItem = item.cloneNode(true);
            curIso.remove(item);
            curIso.layout();
            anotherIso.insert(cloneItem);
        }
    });
    $("#autoButton").click(function(){
        for (var num = 0; num < 50; num++) {
            var id = getRandomInt(0, 100);
            var item = document.getElementById(id);
            if (item !== null) { // item found
                var parentGrid = item.parentElement;
                var location;
                if (parentGrid.id == "Backstock") {
                    location = "Salesfloor";
                } else {
                    location = "Backstock";
                }
                //var grid = document.querySelector('#'+location)
                var grid = document.getElementById('#'+location);
                var curIso = Isotope.data(parentGrid);
                var anotherIso = Isotope.data(grid);
                var cloneItem = item.cloneNode(true);
                curIso.remove(item);
                curIso.layout();
                anotherIso.insert(cloneItem);
                item.parentNode.removeChild(item);
            } else { // New item
                var location;
                var i = getRandomInt(0, locationList.length);
                location = locationList[i];
                var newItem = createItem(id);
                //var grid = document.querySelector('#'+location)
                var grid = document.getElementById('#'+location);
                var iso = Isotope.data(grid);
                iso.insert(newItem);
            }
        }
    });

    $('#sorts').on( 'click', 'button', function() {
        var sortByValue = $(this).attr('data-sort-by');
        console.log(sortByValue);
            var grid = document.getElementById('#Backstock');
            var iso = Isotope.data(grid);
            iso.sortBy('eid');
            //iso.sortBy(sortByValue);
        for (var i = 0; i < locationList.lengh; i++) {
            console.log(locationList[i]);
            var grid = document.getElementById('#'+locationList[i]);
            console.log(grid);
            var iso = Isotope.data(grid);
            iso.sortBy(sortByValue);
        }
        //$grid.isotope({ sortBy: sortByValue });
    });

    //$('#testButton').on( 'click', function() {
    //  // create new item elements
    //  var elems = [];
    //  for ( var i = 0; i < 3; i++ ) {
    //    var $elem = $('<div class="grid-item" />');
    //    // set number
    //    var num = Math.floor( Math.random() * 100 );
    //    $elem.append( '<p class="eid" >' + num + '</p>' );
    //    elems.push( $elem[0] );
    //  }
    //  // insert new elements
    //  //var newItem = createItem(id);
    //  var $grid = $('#Backstock');
    //  console.log($grid);
    //  $grid.isotope( 'insert', elems );
    //  //$grid.isotope( 'insert', newItem);
    //});

});

