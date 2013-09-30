
//init on Dom ready function
jQuery(document).ready(function ($) {

  'use strict';

	// cache some variables
	var links = $('#main-nav').find('a#linkers'),
	slide = $('.slide'),
	button = $('.button'),
	mywindow = $(window),
  dataslide,
	htmlbody = $('html,body');

	//init homepage slider
	$('#slider-with-blocks-1').royalSlider({
		autoPlay: {
			enabled: true,
			pauseOnHover: true,
			delay: 2000,
		},
		arrowsNav: true,
		arrowsNavAutoHide: false,
		fadeinLoadedSlide: false,
		controlNavigationSpacing: 0,
		controlNavigation: false ,
		imageScaleMode: 'none',
		imageAlignCenter:false,
		blockLoop: true,
		loop: true,
		numImagesToPreload: 6,
		transitionType: 'fade',
		keyboardNavEnabled: true,
		allowCSS3: true,
		sliderTouch: true
	});

	// parallax these element's `background-image`
  slide.each(function() {
    // if the element has a `background-image`
    if ( $(this).css('background-image') !== 'none' ) {
      // and a `data-stellar-background-ratio` has not been defined
      if ( !( $(this).data('stellar-background-ratio') ) ) {
        // apply a default `data-stellar-background-ratio`
        $(this).attr('data-stellar-background-ratio', '0.5');
      }
    }

  });

  // init the grid for gallery
  Grid.init();

  // lazy load images in gallery
  $('img.lazy').lazyload({
    effect : 'fadeIn'
  });

  // init stellar.js
	$(window).stellar();

  // use waypoints to find current position on homepage
	slide.waypoint(function (event, direction) {
		dataslide = $(this).attr('data-slide');
		if (direction === 'down') {
			$('#main-nav a#linkers[data-slide="' + dataslide + '"]').addClass('active').prevAll().removeClass('active');
		}
		else {
			$('#main-nav a#linkers[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
			$('#main-nav a#linkers[data-slide="' + dataslide + '"]').next().removeClass('active');
		}
	});

	mywindow.scroll(function () {
		if  (mywindow.scrollTop() === 0) {
			$('#main-nav a#linkers[data-slide="1"]').addClass('active');
			$('#main-nav a#linkers[data-slide="2"]').removeClass('active');
		}
	});

  // goToByScroll function
  function goToByScroll(dataslide) {
    var currentPosition = -1*($('html').offset().top),
        clickedPosition = $('.slide[data-slide="' + dataslide + '"]').offset().top;
    if ( clickedPosition>currentPosition ) {
      htmlbody.stop().animate ( {
        scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
      }, 2000, 'easeInOutQuint');
    } else {
      console.log('up');
      htmlbody.animate ( {
        scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
      }, 2000, 'easeInOutQuint');
    }
  }

  // prevent default behavior when homepage links are clicked
	links.on('click', function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		goToByScroll(dataslide);
	});

	button.on('click', function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		goToByScroll(dataslide);
	});

});
