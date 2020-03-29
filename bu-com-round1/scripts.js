$(document).ready(function () {

	$('.waypoint').waypoint(function(direction) {
	  
		if (direction === "down") {
			var id = $(this).attr("data-section");
			$('#stories-start img').removeClass("active");
			$('#' + id).addClass("active");
		} else {
			var id = $(this).attr("data-section");
			$('#stories-start img').removeClass("active");
			$('#' + id).prev().addClass("active");
			if ( id === "stories-start-1") {
				$('#' + id).addClass("active");
			}
		}

	});

	$('#stories-start').waypoint(function(direction) {
	  
		if (direction === "up") {
			$(this).removeClass("fixed");
		} else {
			$(this).addClass("fixed");
		}

	} , { offset:100 });

	/*$('#end').waypoint(function(direction) {
	  
		if (direction === "down") {
			$('#stories-start').removeClass("fixed").addClass("done");
		}

	} , { offset:'100%' });

	$('#end').waypoint(function(direction) {
	  
		if (direction === "up") {
			$('#stories-start').addClass("fixed").removeClass("done");
		}

	} , { offset: '-100px' });*/

});