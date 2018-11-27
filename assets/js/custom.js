---
# Use for Jekyll processing
layout: clean
---
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
  var alert = `<div class="alert alert-` + severity + `">
  <div class="container">
  <div class="alert-icon">
  <i class="material-icons">check</i>
  </div>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true"><i class="material-icons">clear</i></span>
  </button>
  <b>` + severity + `:</b> ` + message +`.
  </div>
  </div>`;
  return alert;
}

function generateModal(title, message) {
  var modal = `<div class="modal" id="notification-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
  <div class="modal-content">
  <div class="modal-header">
  <h5 class="modal-title">` + title + `</h5>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
  <span aria-hidden="true">&times;</span>
  </button>
  </div>
  <div class="modal-body">
  <p>` + message + `</p>
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </div>
  </div>
  </div>
  </div>`;
  return modal;
}

function parseNotifications() {
  if (getUrlParam('notification')) {
    var param = getUrlParam('notification');
    var $target = $(".notification-target");
    $.getJSON( "/assets/json/notifications.json", function( data ) {
      $.each( data, function( key, notification ) {
        if(key == param) {
          var type = notification.type;
          var message = notification.message;
          var formattedMessage = message
          if( type == 'alert') {
            var severity = notification.severity;
            formattedMessage = generateAlert(message, severity);
            $target.prepend(formattedMessage);
          } else if( type == 'modal' ) {
            var title = notification.title;
            formattedMessage = generateModal(title, message);
            $target.after(formattedMessage);
            $('#notification-modal').modal();
          }
        }
      });
    });
  }
}

// Serialize form into JSON object
jQuery.fn.serializeFormJSON = function () {
  var o = {};
  var a = this.serializeArray();
  jQuery.each(a, function () {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

(function($){
  $(document).ready(function(){
    // Target your .container, .wrapper, .post, etc.
    $(".video-container").fitVids();

    // Parse URL params for notifications.
    parseNotifications();

    var $challengeForm = $("#challenge-form");
    $("input#timestamp", $challengeForm).val(Date.now());
    $challengeForm.attr("sheetsu-after-submit", window.location.href +"?notifcation=challenge");

  });
})(jQuery);
