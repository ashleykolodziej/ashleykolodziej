var $scrollTop,
	 $document = $(document);

$document.ready(function () {

	var $body = document.body;
	var $footer = document.querySelector("#footer");

	document.querySelector('html').classList.add('has-js');

	var $navlinks = Array.from(document.querySelectorAll('.main-navigation-wrap li')),
		$filterlinks = Array.from(document.querySelectorAll('#all-tags a')),
		$mainNav = document.querySelector('.main-navigation'),
		$mainNavWrap = document.querySelector('.main-navigation-wrap'),
		$contentContainer = Array.from(document.querySelectorAll('.content-container'));

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
	  	$footer.classList.add("loadin");
	}

	$body.addEventListener("click", function (e) {
		var parent = event.target.closest('.load-link');
		if (parent) {
			e.preventDefault();
			$footer.classList.remove('loadin');
			document.querySelector('.active').classList.remove("active");
			parent.classList.add("active");

			load_content( parent.href );

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

	var $filter = document.querySelector('#filter');

	$filter.addEventListener( 'click', function (e) {
		e.preventDefault();

		var $this = e.target;
		var $icon = $this.querySelector('.material-icons');
		$this.classList.toggle('open');
		$this.nextElementSibling.classList.toggle('open');
		$icon.innerHTML === "clear" ? $icon.innerHTML = 'sort' : $icon.innerHTML = 'clear';
	});

	var $menuToggle = document.querySelector('#menu');

	$menuToggle.addEventListener( 'click', function(e) {
		var $this = e.target;
		$this.innerHTML === "close" ? $this.innerHTML = 'menu' : $this.innerHTML = 'close';
		$this.classList.toggle('open');
		$body.classList.toggle('open');
		$mainNav.classList.toggle('open');

		for ( container of $contentContainer ) {
			container.classList.toggle('open');
		}
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