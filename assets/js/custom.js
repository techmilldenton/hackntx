// Custom.js file for rest of site.
$(document).ready(function(){
    // Target your .container, .wrapper, .post, etc.
    $(".video-container").fitVids();

    function getUrlParam ( prop ) {
    	var params = {};
    	var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
    	var definitions = search.split( '&' );

    	definitions.forEach( function( val, key ) {
    		var parts = val.split( '=', 2 );
    		params[ parts[ 0 ] ] = parts[ 1 ];
    	} );

    	return ( prop && prop in params ) ? params[ prop ] : null;
    };

    // submit contact form with ajax
    $('#contact-form').submit(function(e) {
      e.preventDefault();
      var actionUrl = '//formspree.io/sponsor@techmill.co'
      $.ajax({
        method: 'POST',
        url: actionUrl,
        data: $('#contact-form').serialize(),
        datatype: 'json',
        success: function() {
          $('.submit-success').addClass('fade-in');
        }
      });
      $(this).get(0).reset();
    });

});
