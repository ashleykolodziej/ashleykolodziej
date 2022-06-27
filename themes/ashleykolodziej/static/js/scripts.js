var $scrollTop,
	 $document = $(document);

$document.ready(function () {

	var $body = document.body;
	var $footer = document.querySelector("#footer");

	document.querySelector('html').classList.add('has-js');

	var $navlinks = Array.from(document.querySelectorAll('.main-navigation-wrap li')),
		$filterlinks = Array.from(document.querySelectorAll('#all-tags a')),
		$mainNavWrap = document.querySelector('.main-navigation-wrap');

	for ( link of $navlinks ) {
		link.classList.add('nav-show');
	}

	function load_content(loadurl) {
		fetch(loadurl)
		.then(data => {

		})
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

	$body.addEventListener("click", function (e) {
		if (e.target.classList.contains('.load-link')) {
			$footer.removeClass('loadin');
			$('.active').removeClass("active");
			$(this).parent().addClass("active");

			load_content( this.href );

			return false;
		}
	});

	window.addEventListener('popstate', function(e) {
		$('#content').html(history.state);
		animate_in($('#content'));
	});

	var $tags = document.querySelector('#all-tags');

	$tags.addEventListener("click", function (e) {
		e.preventDefault();

		if (e.target.tagName === 'A') {
			var $this = e.target;
			var thisCat = $this.dataset.catFilter;
			var $icon = document.querySelector('.filter-icon');

			for ( link of $filterlinks ) {
				link.classList.remove('filter-active');
			}
			
			$this.classList.add('filter-active');

			if (thisCat === "all") {
				for ( link of $navlinks ) {
					link.classList.add('nav-show');
				}
				$icon.classList.remove('filter-active');
				
				var $filtered = Array.from(document.querySelectorAll('.has-filtered'));
				for ( item of $filtered ) {
					item.classList.remove('has-filtered');
				}

				$mainNavWrap.classList.remove('filter-on');
			} else {
				for ( link of $navlinks ) {
					link.classList.remove('nav-show');
				}
				$icon.classList.add('filter-active');

				var $filtered = Array.from(document.querySelectorAll('.has-filtered'));
				for ( item of $filtered ) {
					item.classList.remove('has-filtered');
				}

				for ( link of $navlinks ) {
					console.log(thisCat)
					console.log(link.dataset.category.includes(thisCat))
					if (link.dataset.category.includes(thisCat)) {
						link.classList.add('nav-show');
						link.parentElement.classList.add('has-filtered');
						link.parentElement.previousElementSibling.classList.add('has-filtered');
					}
				}

				$mainNavWrap.classList.add('filter-on');
			}
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

	$( '#content' ).children().addClass( "loadin" );
	$footer.classList.add("loadin");

	if (location.pathname !== '/') {
		var $activeLink = $("a[href*='" + location.pathname + "']").parent('li');

		$activeLink.addClass("active");

		if ( $activeLink.offset() ) {
			$('.main-navigation-wrap').scrollTop( $activeLink.offset().top - 100 );
		}
	}
});