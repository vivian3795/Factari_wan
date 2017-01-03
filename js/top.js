// ===== Scroll to Top ==== 
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {    // If page is scrolled more than 50px
        $('#top').fadeIn("fast");       // Fade in the arrow
    } else {
        $('#top').fadeOut("fast");      // Else fade out the arrow
    }
});
$('#top').click(function() {            // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                   // Scroll to top of body
    }, 500);
});

$('#add_a').click(function() {            // When add_a is clicked
    var viewportHeight = $(window).height();
    $('body,html').animate({
        scrollTop : viewportHeight                  // Scroll down body
    }, 750);
});

$('#add_star').click(function() {            // When add_star is clicked
    var viewportHeight = $(window).height();
    $('body,html').animate({
        scrollTop : viewportHeight                   // Scroll down body
    }, 750);
});

$('#add_info').click(function() {            // When add_info is clicked
    var viewportHeight = $(window).height();
    $('body,html').animate({
        scrollTop : viewportHeight                  // Scroll down body
    }, 750);
});

$('#postWrite').click(function() {            // When postWrite is clicked
    var viewportHeight = $(window).height();
    $('body,html').animate({
        scrollTop : viewportHeight                  // Scroll down body
    }, 500);
});