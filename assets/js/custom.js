// Custom.js file for rest of site.

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

function generateAlert(message, severity) {
  //TODO write the markup
  return message;
}

function generateModal(message) {
  //TODO write the markup
  return message;
}

function parseNotifications() {
  if (getUrlParam('notification').length) {
    var param = getUrlParam('notification');
    console.log(param);
    $.getJSON( "assets/json/notifications.json", function( data ) {
      $.each( data, function( key, notification ) {
        if(key == param) {
          var type = notification.type;
          var message = notification.message;
          var severity = notification.severity;

          var formattedMessage = message

          if( type == 'alert') {
            formattedMessage = generateAlert(message, severity);
          } else if( type == 'modal' ) {
            formattedMessage = generateModal(message);
          }
          $('#off-canvas').append(formattedMessage);
        }
      });
    });
  }
}

$(document).ready(function(){
    // Target your .container, .wrapper, .post, etc.
    $(".video-container").fitVids();

    parseNotifications();

});
