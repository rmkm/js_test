function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function createBackground() {
    var background = document.createElement("div");
    background.setAttribute("id", "background");
    return background;
}

function createContainer(name, id) {
    var container = document.createElement("div");
    var bar = document.createElement("div");
    container.setAttribute("class", "container");
    container.setAttribute("id", id);
    bar.setAttribute("class", "containerHeader");
    bar.innerHTML = name;
    container.appendChild(bar);
    return container;
}

function createGrid(name, id) {
    var grid = document.createElement("div");
    var header = createGridHeader(name);
    grid.setAttribute("class", "grid");
    grid.setAttribute("id", id);
    // Initialize
    var iso = new Isotope(grid, {
        // options
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        sortBy: 'eid',
        getSortData: {
            'eid': '.eid parseInt'
        }
    });
    iso.insert(header);
    return grid;
}

function createBlock(id) {
        //var container = document.getElementById(location);
        var newBlock = document.createElement("div");
        newBlock.setAttribute("class", "block");
        newBlock.setAttribute("id", id);
        newBlock.innerHTML = id;
        return newBlock;
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
        return newItem;
}

function insertBlock(block, location) {
    var container = document.getElementById(location);
    var blockList = container.children;
    for (var i = 0; i < blockList.length; i++) {
        if (Number(block.id) < Number(blockList[i].id)) {
            $(block).insertBefore(blockList[i]).hide().show(speed);
            return;
        }
    }
    $(block).appendTo(container).hide().show(500);
}

function insertItem(item, location) {
    var grid = document.getElementById(location);
    //var itemList = grid.children;
    //for (var i = 0; i < itemList.length; i++) {
    //    if (Number(item.id) < Number(itemList[i].id)) {
    //        $(item).insertBefore(itemList[i]).hide().show(speed);
    //        return;
    //    }
    //}
    $(grid).isotope('insert', item);
}

function setBlock(block, location) {
    var parentContainer = block.parentElement;
    if (parentContainer != null) {
        $(block).fadeOut(speed, function() {
            insertBlock(block, location);
        });
        //hideBlock(block);
    } else {
        insertBlock(block, location);
    }
}

function showBlock(block) {
    $(block).show(300);
}

function hideBlock(block) {
    $(block).hide(300);
}

//var $grid = $('.grid').isotope({
//    // options
//    itemSelector: '.grid-item',
//    layoutMode: 'fitRows',
//    sortBy: 'eid',
//    getSortData: {
//        'eid': '.eid parseInt'
//    }
//});

var speed = 400;
var locationList = [];
var colorList = [];
locationList.push("Backstock");
locationList.push("Salesfloor");

$(document).ready(function(){
    //$("#startButton").click(function(){
    //    var background = createBackground();
    //    console.log(background);
    //    var container = createContainer("BACK STOCK", "Backstock");
    //    background.appendChild(container);
    //    container = createContainer("SALES FLOOR", "Salesfloor");
    //    background.appendChild(container);
    //    document.body.appendChild(background);
    //});
    //$("#removeButton").click(function(){
    //    //$("#0005").hide('slow');
    //    var block = document.getElementById("4");
    //    hideBlock(block);
    //});
    //$("#addButton").click(function(){
    //    var id = getRandomInt(0, 100);
    //    var block = document.getElementById(id);
    //    if (block === null) {
    //        // New block
    //        var location;
    //        var i = getRandomInt(0, locationList.length-1);
    //        location = locationList[i];
    //        var newBlock = createBlock(id);
    //        setBlock(newBlock, location);
    //    } else {
    //        var parentContainer = block.parentElement;
    //        var location;
    //        if (parentContainer.id == "Backstock") {
    //            location = "Salesfloor";
    //        } else {
    //            location = "Backstock";
    //        }
    //        setBlock(block, location);
    //        // Found block
    //        // Switch
    //    }
    //});
    //$("#autoButton").click(function(){
    //    for (var num = 0; num < 20; num++) {

    //        var id = getRandomInt(0, 100);
    //        var block = document.getElementById(id);
    //        if (block === null) {
    //            // New block
    //            var location;
    //            var i = getRandomInt(0, locationList.length-1);
    //            location = locationList[i];
    //            var newBlock = createBlock(id);
    //            setBlock(newBlock, location);
    //        } else {
    //            var parentContainer = block.parentElement;
    //            var location;
    //            if (parentContainer.id == "Backstock") {
    //                location = "Salesfloor";
    //            } else {
    //                location = "Backstock";
    //            }
    //            setBlock(block, location);
    //            // Found block
    //            // Switch
    //        }

    //    }
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
            var i = getRandomInt(0, locationList.length-1);
            location = locationList[i];
            var newItem = createItem(id);
            var grid = document.querySelector('#'+location)
            console.log(grid);
            var iso = Isotope.data(grid);
            iso.insert(newItem);
        } else { // item found
            var parentGrid = item.parentElement;
            console.log(parentGrid);
            var location;
            if (parentGrid.id == "Backstock") {
                location = "Salesfloor";
            } else {
                location = "Backstock";
            }
            var grid = document.querySelector('#'+location)
            var curIso = Isotope.data(parentGrid);
            var anotherIso = Isotope.data(grid);
            //item.hide();
            curIso.on( 'removeComplete', function(item) {
                anotherIso.insert(item);
            });
            curIso.remove(item);
            curIso.layout();
            //anotherIso.insert(item);
            //parentGrid.isotope('insert', item);
            // Found block
            // Switch
        }
    });
    $("#autoButton").click(function(){
        for (var num = 0; num < 50; num++) {

            var id = getRandomInt(0, 100);
            var item = document.getElementById(id);
            if (item === null) {
                // New item 
                var location;
                var i = getRandomInt(0, locationList.length-1);
                location = locationList[i];
                var newItem = createItem(id);
                setBlock(newBlock, location);
            } else {
                var parentContainer = block.parentElement;
                var location;
                if (parentContainer.id == "Backstock") {
                    location = "Salesfloor";
                } else {
                    location = "Backstock";
                }
                setBlock(block, location);
                // Found block
                // Switch
            }

        }
    });

        //masonry: {
        //    columnWidth: '.grid-sizer'
        //    //columnWidth: '.grid-sizer'
        //}

    //var $gridContainer = $('.grid-container').isotope({
    //    // options
    //    itemSelector: '.grid-item',
    //    layoutMode: 'fitRows',
    //    sortBy: 'eid',
    //    getSortData: {
    //        'eid': '.eid parseInt'
    //    }
    //});

    $('#testButton').on( 'click', function() {
      // create new item elements
      var elems = [];
      for ( var i = 0; i < 3; i++ ) {
        var $elem = $('<div class="grid-item" />');
        // set number
        var num = Math.floor( Math.random() * 100 );
        $elem.append( '<p class="eid" >' + num + '</p>' );
        elems.push( $elem[0] );
      }
      // insert new elements
      //var newItem = createItem(id);
      var $grid = $('#Backstock');
      console.log($grid);
      $grid.isotope( 'insert', elems );
      //$grid.isotope( 'insert', newItem);
    });
});

