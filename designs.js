$(document).ready(function() {

    $('#sizePicker').submit(function(event) {
        clearGrid();
        //        clearGridOnWhile()                       // clearing a grid with while loop
        makeGrid();
        registerMouseHandlers();
        event.preventDefault();
    });
});


function makeGrid() {
    let inputH = $('#input_height').val();
    let inputW = $('#input_width').val();
    let table = $('#pixel_canvas');

    for (let r = 1; r <= inputH; r++) {
        // create row
        let row = $('<tr></tr>').appendTo(table);
        for (let c = 1; c <= inputW; c++) {
            // create table cells (columns)
            row.append('<td></td>');
        }
    }
}

// Clearing a grid //
function clearGrid() {
    $('#pixel_canvas').children().remove();
}

// alternative function to clear grid using a while loop in accordance to project specification //

//function clearGridOnWhile() {
//    var tables = document.getElementsByTagName('table');
//    var table = tables.item(0);
//    var i = table.rows.length - 1;
//    while (i >= 0) {
//        table.deleteRow(0);
//        i--;
//    }    
//}

// adding color to multiple cells by moving a mouse over them //

function registerMouseHandlers() {
    
    let mouseIsDown = false;

    $('td').on('mousemove', function() {
        if (mouseIsDown) {
            let color = $('#colorPicker').val();
            $(this).css('backgroundColor', color);
        }
    });

    $('td').on('mousedown', function() {
        mouseIsDown = true;
    });

    $('td').on('mouseup', function() {
        mouseIsDown = false;
    });

    // adding color to single cell //
    $('td').on('click', function() {
        let color = $('#colorPicker').val();
        $(this).css('backgroundColor', color);
    });

    // removing color from the cell //      
    $('td').on('dblclick', function() {
        $(this).css('background', 'none');
    })
}

// TODO Disable right click menu for better handle or missclicks on canvas

// Clearing cells by clicking and moving the mouse over them

// Adding color to the whole table

// Adding and removing rows from each side
