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

function loadContentScript(url, callback) {
	// adding the script element to the head as suggested before
	var content = document.querySelector('#content');
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	// then bind the event to the callback function 
	// there are several events for cross browser compatibility
	script.onreadystatechange = callback;
	script.onload = callback;

	// fire the loading
	content.appendChild(script);
}

var contentScriptCallback = function() {
	if (typeof webmentionScript === "function") {
		webmentionScript();
	}

	if (typeof window.__CPEmbed === "function") {
		window.__CPEmbed();
	}
	
	if (typeof runContentScripts === "function") {
		runContentScripts();
	}
};

function load_content(loadurl) {
	fetch(loadurl)
		.then(response => response.text())
		.then(function (data) {
			// Convert the HTML string into a document object
			var parser = new DOMParser();
			var html = parser.parseFromString(data, 'text/html');
			// This is the JSON from our response
			var newContent = html.querySelector('#content');
			var newHTML = newContent.innerHTML;
			var toAnimate = newContent.children;
			history.pushState(newHTML, null, loadurl);
			document.querySelector('#content').innerHTML = history.state;
			animate_in(document.querySelector('#content').children);

			var contentScript = document.querySelector('#content script');

			if ( contentScript ) {
				loadContentScript(contentScript.src, contentScriptCallback);
			}
		}).catch(function (err) {
			// There was an error
			console.warn('Something went wrong.', err);
		});
}

function animate_in(elements) {
	var toLoad = Array.from(elements);
	if ( window.innerWidth < 992 && $body.classList.contains('open') ) {
		$menuToggle.click();
	}
	
	window.scroll({
	  top: 0,
	  left: 0,
	});

	for (item of toLoad) {
		item.classList.add("loadin");
	}

  	$footer.classList.add("loadin");
}

$body.addEventListener("click", function (e) {
	var parent = event.target.closest('.load-link');
	if (parent) {
		e.preventDefault();
		$footer.classList.remove('loadin');
		
		if (document.querySelector('.active')) {
			document.querySelector('.active').classList.remove("active");
		}

		parent.classList.add("active");

		load_content( parent.href );

		return false;
	}
});

window.addEventListener('popstate', function(e) {
	document.querySelector('#content').innerHTML = history.state;
	animate_in(document.querySelector('#content').children);
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

	if (e.target.classList.contains('filter-icon')) {
		$this = e.target.parentElement;
	}

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

var $itemsToLoad = Array.from(document.querySelector('#content' ).children);

for ( item of $itemsToLoad ) {
	item.classList.add( "loadin" );
}

$footer.classList.add("loadin");

if ( location.pathname !== '/' ) {
	var $activeLink = document.querySelector("a[href*='" + location.pathname + "']").parentElement;

	$activeLink.classList.add("active");

	if ( $activeLink.offsetTop ) {
		$mainNavWrap.scrollTop = $activeLink.offsetTop - 100;
	}
}