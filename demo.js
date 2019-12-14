function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function createBackground() {
    var background = document.createElement("div");
    background.setAttribute("id", "background");
    document.body.appendChild(background);
    return background;
}

function createContainer(name, id) {
    var container = document.createElement("div");
    var bar = document.createElement("div");
    container.setAttribute("class", "container");
    container.setAttribute("id", id);
    bar.setAttribute("class", "backgroundHeader");
    bar.innerHTML = name;
    container.appendChild(bar);
    return container;
}

function createBlock(id) {
        //var container = document.getElementById(location);
        var newBlock = document.createElement("div");
        newBlock.setAttribute("class", "block");
        newBlock.setAttribute("id", id);
        newBlock.innerHTML = id;
        return newBlock;
}

function insertBlock(block, location) {
    var container = document.getElementById(location);
    var blockList = container.children;
    for (var i = 0; i < blockList.length; i++) {
        if (Number(block.id) < Number(blockList[i].id)) {
            $(block).insertBefore(blockList[i]).hide().show(300);
            return;
        }
    }
    $(block).appendTo(container).hide().show(300);
}

function showBlock(block) {
    $(block).show(300);
}

function hideBlock(block) {
    $(block).hide(300);
}

var locationList = [];
locationList.push("Backstock");
locationList.push("Salesfloor");

$(document).ready(function(){
    $("#startButton").click(function(){
        console.log("Hello");
        var background = createBackground();
        console.log(background);
        var container = createContainer("BACK STOCK", "Backstock");
        background.appendChild(container);
        container = createContainer("SALES FLOOR", "Salesfloor");
        background.appendChild(container);
        document.body.appendChild(background);
    });
    $("#removeButton").click(function(){
        //$("#0005").hide('slow');
        var block = document.getElementById("4");
        hideBlock(block);
    });
    $("#addButton").click(function(){
        var id = getRandomInt(0, 100);
        var block = document.getElementById(id);
        if (block === null) {
            // New block
            var location;
            var i = getRandomInt(0, locationList.length-1);
            console.log(i);
            location = locationList[i];
            var newBlock = createBlock(id);
            insertBlock(newBlock, location);
        } else {
            var parentContainer = block.parentElement;
            var location;
            if (parentContainer.id == "Backstock") {
                location = "Salesfloor";
            } else {
                location = "Backstock";
            }
            hideBlock(block);
            //insertBlock(block, location);
            // Found block
            // Switch
        }
    });
});
