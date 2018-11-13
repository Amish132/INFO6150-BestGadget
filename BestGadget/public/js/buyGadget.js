$(document).ready(function () {
	// executes when HTML-Document is loaded and DOM is ready
	// breakpoint and up  
	// when you hover a toggle show its dropdown menu
	faqTrigger = $('.cd-faq-trigger');
	faqTrigger.on('click', function (event) {
		event.preventDefault();
		//$(this).next('.cd-faq-content').slideToggle(200).end().parent('li').toggleClass('content-visible');
		$(this).next('.cd-faq-content').slideToggle(200).toggleClass('content-visible');

	});
	$(".navbar .dropdown-toggle").hover(function () {

		$(this).parent().toggleClass("show");
		$(this).parent().find(".dropdown-menu").toggleClass("show");
	});

	// hide the menu when the mouse leaves the dropdown
	$(".navbar .dropdown-menu").mouseleave(function () {
		$(this).removeClass("show");
	});

	function init_map() {
		var myOptions = {
			zoom: 14,
			center: new google.maps.LatLng(42.34335940191768, -71.08951502275391),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
		marker = new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(42.34335940191768, -71.08951502275391)
		});
		infowindow = new google.maps.InfoWindow({
			content: '<strong>BestGadget</strong><br>Northeastern University, Boston<br>'
		});
		google.maps.event.addListener(marker, 'click', function () {
			infowindow.open(map, marker);
		});
		infowindow.open(map, marker);
	}
	google.maps.event.addDomListener(window, 'load', init_map);

	$(function () {
		$(".scroll-div").slice(0, 1).show();
		$("#loadMore").on('click', function (e) {
			e.preventDefault();
			$(".scroll-div:hidden").slice(0, 1).slideDown();
			if ($(".scroll-div:hidden").length == 0) {
				$("#load").fadeOut('slow');
			}
		});
	});

	$('a[href=#top]').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 600);
		return false;
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('.totop a').fadeIn();
		} else {
			$('.totop a').fadeOut();
		}
	});

	$(function () {
		$(".scroll-div").slice(0, 2).show();
		$("#loadMore").on('click', function (e) {
			e.preventDefault();
			$(".scroll-div:hidden").slice(0, 2).slideDown();
			if ($(".scroll-div:hidden").length == 0) {
				$("#load").fadeOut('slow');
			}
		});
	});

	$('a[href=#top]').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 600);
		return false;
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('.totop a').fadeIn();
		} else {
			$('.totop a').fadeOut();
		}
	});


	// document ready  
});