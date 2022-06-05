	let status = 'draw'; // holds current state in relation to draw, erase, fill tools.
	let col;
	let row;
	let isMouseDown = false;
	let color;
	const MAX_ALLOWED_HEIGHT = 30;
	const MAX_ALLOWED_WIDTH = 30;

	// makeGrid function to create pixel art grid
	function makeGrid() {
		row = $('#input_height').val();
		col = $('#input_width').val();

		$('#pixel_canvas').append(function() {
			let newHtml = '';
			row = Number(row);
			col = Number(col);
			for(let i = 0; i < row; i++){
				newHtml += '<tr>';
					for(let j = 0; j < col; j++){
						newHtml += '<td></td>';		
					}
				newHtml += '</tr>';
			}
			return newHtml;
		});
	};

	// button event to create new grid
	$('#size_picker').on('submit', function(e) {
		e.preventDefault();
		$('#pixel_canvas').empty();
		makeGrid();
	});

	// click event to add / erase / get colour to/from grid elements,
	// and also allowing to drag across multiple cells
	$('#pixel_canvas').on('mousedown', 'td', function(e) {
    e.preventDefault();
		isMouseDown = true;

 		// *** this is starter code that can be uncommented and used when dropper 'getColour' function is added
		// if(status === 'getColour'){
		// 	let tempColour = $(this).css('background-color');
		// 	$('input#color_picker').val(rgbToHex(tempColour));	
		// }
    
		color = $('input#color_picker').val(); // ***May need to change this when colour palettes added

		if(status === 'draw'){
			$(this).css({ 'background-color': color });
		} else if (status === 'erase'){
			$(this).removeAttr('style');
		} else if (status === 'fill'){
			$('td').css({ 'background-color': color });
		}	
	}).on('mouseover', 'td', function() {
		if(isMouseDown && status === 'draw') {
			$(this).css({ 'background-color': color });
		} else if (isMouseDown && status === 'erase'){
			$(this).removeAttr('style');
		}
	});	
	$(document).mouseup(function() {
          isMouseDown = false;
    });

	// shortcut right-click event to remove colour from grid element
	$('#pixel_canvas').on('contextmenu', 'td', function(e) {
		e.preventDefault(); // stops context menu popping up on right-click
		$(this).removeAttr('style');
	});

	// click border toggle button to toggle borders on the grid
	$('.borderToggleBtn').on('click', function(){
		$('tr, td').toggleClass('transparentBorder');
	});

	// function to clear the content of the canvas grid
	$('.clearGrid').on('click', function(){
		$('td').removeAttr('style');
	});

	// add Column to grid
	$('.addCol').on('click', function(){
		if(col < MAX_ALLOWED_WIDTH){
			$('tr').append('<td></td>');
			col++;
		}
	});

	// remove Column from grid
	$('.removeCol').on('click', function(){
		if(col > 0){
			$('tr td:last-child').remove();
			col--;
		}
	});

	// add Row to grid
	$('.addRow').on('click', function(){
		if(row < MAX_ALLOWED_HEIGHT){
			row++;
			let temp;
			for (let k = 0; k < col; k++) {
				temp += '<td></td>';
			}
			$('table').append('<tr>' + temp + '</tr>');
		}
	});

	// remove Row from grid
	$('.removeRow').on('click', function(){
		if(row > 0){
			$('tr:last-child').remove();
			row--;
		}
	});

	// Status button functions
	$('.draw').click(function(){
		status = 'draw';
	});

	$('.fill').click(function(){
		status = 'fill';
	});

	$('.erase').click(function(){
		status = 'erase';
	});

	// Function to handle Active tool styling
	$('.tools').click(function(){
		$('.tools').removeClass('active');
		$(this).addClass('active');
	});

	// Export button function to save table canvas as .PNG file
	$('.save').click(function(){
		html2canvas($("#pixel_canvas").get(0), {
			onrendered: function (canvas) {
				var a = document.createElement('a');
				a.href = canvas.toDataURL("image/png");
				a.download = 'MyPixelArt.png';
				a.click();
			}
		});
	});

	// TODO - add dropper function to get colour from a cell
	// TODO - add colour palettes in right-hand column
	// TODO - feature to share image on social media ???
	
	// 'getColour' function
	// $('.getColour').click(function(){
	// 	status = 'getColour';
	//	...
	// });

	// function to convert RGB colour value to Hex so it can be inserted
	// as a value to the colour input
	//function rgbToHex(){};
