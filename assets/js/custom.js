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

    // Show thank you on form submission.
    if (getUrlParam("thankyou") !== null) {
    	var thankYouContact = `<div class="alert alert-success">
    	<div class="container">
    	<div class="alert-icon">
    	<i class="material-icons">check</i>
    	</div>
    	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    	<span aria-hidden="true"><i class="material-icons">clear</i></span>
    	</button>
    	<b>Success:</b> Thank you for your email! We'll get back to you shortly.
    	</div>
    	</div>`;
    	$("main.main").prepend(thankYouContact);
    }
});
