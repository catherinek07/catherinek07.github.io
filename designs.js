	let status = 'draw'; 
	let col;
	let row;
	let isMouseDown = false;
	let color;
	const MAX_ALLOWED_HEIGHT = 30;
	const MAX_ALLOWED_WIDTH = 30;
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

	$('#size_picker').on('submit', function(e) {
		e.preventDefault();
		$('#pixel_canvas').empty();
		makeGrid();
	});

	$('#pixel_canvas').on('mousedown', 'td', function(e) {
    e.preventDefault();
		isMouseDown = true;
    
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

	$('#pixel_canvas').on('contextmenu', 'td', function(e) {
		e.preventDefault(); // stops context menu popping up on right-click
		$(this).removeAttr('style');
	});

	$('.borderToggleBtn').on('click', function(){
		$('tr, td').toggleClass('transparentBorder');
	});

	$('.clearGrid').on('click', function(){
		$('td').removeAttr('style');
	});

	$('.addCol').on('click', function(){
		if(col < MAX_ALLOWED_WIDTH){
			$('tr').append('<td></td>');
			col++;
		}
	});
	$('.removeCol').on('click', function(){
		if(col > 0){
			$('tr td:last-child').remove();
			col--;
		}
	});

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

	$('.draw').click(function(){
		status = 'draw';
	});

	$('.fill').click(function(){
		status = 'fill';
	});

	$('.erase').click(function(){
		status = 'erase';
	});

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
    // Future: NFTs?
