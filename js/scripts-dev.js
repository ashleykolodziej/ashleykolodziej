var $scrollTop,
	 $document = $(document);

function runPackery() {
	// init Masonry
	var $grid = $('#gallery').masonry({
	  itemSelector: '.gallery-item',
	});
	// layout Masonry after each image loads
	$grid.imagesLoaded().progress( function() {
	  $grid.masonry('layout');
	});
}

var keyboardSlideControls = {
	prev: function(e){
		if (e.keyCode == 37) {
			slidesPrev();
			e.preventDefault();
		}
	},
	next: function(e){
		if (e.keyCode == 39) {
			slidesNext();
			e.preventDefault();
		}
	},
	close: function(e){
		if (e.keyCode == 27) {
			slidesClose(e);
		}
	}
};
function slidesPrev(e) {
	var $current = $('.current');
	var $newCurrent = $current.prev();
	$current.removeClass( "current" );
	$newCurrent.addClass( "current" );

	if ( $newCurrent.is( ':first-child' ) ) {
		$('#slides-prev').hide();
		$document.unbind("keydown", keyboardSlideControls.prev);
		$document.bind("keydown", keyboardSlideControls.next);
	} else {
		$('#slides-prev').show();
		$('#slides-next').show();
	}
}
function slidesNext(e) {
	var $current = $('.current');
	var $newCurrent = $current.next();
	$current.removeClass( "current" );
	$newCurrent.addClass( "current" );
	if ( $newCurrent.is( ':last-child' ) ) {
		$('#slides-next').hide();
		$document.unbind("keydown", keyboardSlideControls.next);
		$document.bind("keydown", keyboardSlideControls.prev);
	} else {
		$('#slides-prev').show();
		$('#slides-next').show();
	}
}
function slidesClose(e) {
	e.preventDefault();

	$document.unbind("keydown", keyboardSlideControls.close);
	$document.unbind("keydown", keyboardSlideControls.prev);
	$document.unbind("keydown", keyboardSlideControls.next);

	$('#overlay').removeClass( "animateIn" );
	$('body').removeClass("overlay-visible");

	window.setTimeout( function() {
		$('.gallery-img').removeClass( "current" );
		$('#overlay').remove();
	}, 500);

	$document.scrollTop( $scrollTop );
}

$document.ready(function () {

	var $body = document.body;
	var $footer = $("#footer");

	$('html').addClass('has-js');

	var $navlinks = $('.main-navigation-wrap li'),
		 $filterlinks = $('#all-tags a'),
		 $body = $('body');

	$navlinks.addClass('nav-show');

	function load_content(loadurl) {
		$.get( loadurl, function (data) {
		    data = $(data).find("#content").html();
		    history.pushState(data, null, loadurl);
		    $('#content').html(history.state);
		    animate_in($('#content'));
		});
	}

	function animate_in(elements) {
		if ( $(window).width() < 768 && $('body').hasClass('open') ) {
			$('#menu').click();
		}
		$(window).scrollTop(0);
	  	elements.children().addClass("loadin");
	  	$footer.addClass("loadin");
	  	runPackery();
	}

	$body.on("click", '.load-link', function (e) {
		$footer.removeClass('loadin');
		$('.active').removeClass("active");
		$(this).parent().addClass("active");

		load_content( this.href );

		return false;
	});

	window.addEventListener('popstate', function(e) {
		$('#content').html(history.state);
		animate_in($('#content'));
	});

	var slideWrapOpen = '<div id="overlay"><i id="slides-close" class="material-icons">close</i>';
		 slideWrapOpen += '<i id="slides-prev" class="material-icons">chevron_left</i><i id="slides-next" class="material-icons">chevron_right</i>';
		 slideWrapOpen += '<div class="slide-container">';
	var slideWrapClose = '</div></div>';

	$body.on("click", '.gallery-item', function (e) {
		e.preventDefault();

		$document.bind("keydown", keyboardSlideControls.close);
		$document.bind("keydown", keyboardSlideControls.prev);
		$document.bind("keydown", keyboardSlideControls.next);

		$(this).children( "img" ).addClass( "current" );
		$img = $( '.gallery-img' );
		var slides = '';
		$tallimg = $img.first();
		tallheight = $tallimg.height();
		$img.each(function () {
			if ( $(this).height() > tallheight ) {
				$tallimg.removeClass('tallest');
				$tallimg = $(this);
				tallheight = $tallimg.height();
				$tallimg.addClass('tallest');
			}
			slides += $(this)[0].outerHTML;
		});

		$('#content-container').append( slideWrapOpen + slides + slideWrapClose );

		$thisItem = $( '#overlay' ).find( '.current' );

		if ( $thisItem.is( ':first-child' ) ) {
			$('#slides-prev').hide();
			$document.unbind("keydown", keyboardSlideControls.prev);
		}
		if ( $thisItem.is( ':last-child' ) ) {
			$('#slides-next').hide();
			$document.unbind("keydown", keyboardSlideControls.next);
		}

		$scrollTop = $body.scrollTop();

		$body.css('top', -( $scrollTop ) + 'px')
			  .addClass("overlay-visible");

		window.setTimeout( function() {
			$('#overlay').addClass( "animateIn" );
		}, 10);
	});

	$body.on("click", '#slides-prev', slidesPrev);
	$body.on("click", '#slides-next', slidesNext);
	$body.on("click", '#slides-close', slidesClose);

	$('#all-tags').on("click", 'a', function (e) {
		e.preventDefault();

		var $this = $(this);
		var thisCat = $this.data("cat-filter");
		var $icon = $('#filter').children('.material-icons');

		$filterlinks.removeClass('filter-active');
		$this.addClass('filter-active');

		if (thisCat === "all") {
			$navlinks.addClass('nav-show');
			$icon.removeClass('filter-active');
			$('.has-filtered').removeClass('has-filtered');
			$('.main-navigation-wrap').removeClass('filter-on');
		} else {
			$icon.addClass('filter-active');
			$navlinks.removeClass('nav-show');
			$('.has-filtered').removeClass('has-filtered');
			$navlinks.filter('[data-category="' + thisCat + '"]').addClass('nav-show').parent('ul').addClass('has-filtered').prev('h3').addClass('has-filtered');
			$('.main-navigation-wrap').addClass('filter-on');
		}
	});
	$('#filter').click( function (e) {
		e.preventDefault();

		var $this = $(this);
		var $icon = $this.children('.material-icons');
		$this.toggleClass('open');
		$this.next('ul').toggleClass('open');
		$icon.html() == "clear" ? $icon.html('sort') : $icon.html('clear');
	});

	$('#menu').click( function() {
		var $this = $(this);
		$this.html() == "close" ? $this.html('menu') : $this.html('close');
		$this.toggleClass('open');

		$('.main-navigation, .content-container, body').toggleClass('open');
	});

	runPackery();

	$( '#content' ).children().addClass( "loadin" );
	$footer.addClass("loadin");

	if (location.pathname !== '/') {
		var $activeLink = $("a[href*='" + location.pathname + "']").parent('li');

		$activeLink.addClass("active");

		if ( $activeLink.offset() ) {
			$('.main-navigation-wrap').scrollTop( $activeLink.offset().top - 100 );
		}
	}
});