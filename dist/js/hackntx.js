// Custom.js file for rest of site.
function getUrlParam(prop) {
  var params = {};
  var search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1));
  var definitions = search.split('&');
  definitions.forEach(function (val, key) {
    var parts = val.split('=', 2);
    params[parts[0]] = parts[1];
  });
  return prop && prop in params ? params[prop] : null;
}

;

function generateAlert(message, severity) {
  var alert = "<div class=\"alert alert-" + severity + "\">\n  <div class=\"container\">\n  <div class=\"alert-icon\">\n  <i class=\"material-icons\">check</i>\n  </div>\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n  <span aria-hidden=\"true\"><i class=\"material-icons\">clear</i></span>\n  </button>\n  <b>" + severity + ":</b> " + message + ".\n  </div>\n  </div>";
  return alert;
}

function generateModal(title, message) {
  var modal = "<div class=\"modal\" id=\"notification-modal\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\" role=\"document\">\n  <div class=\"modal-content\">\n  <div class=\"modal-header\">\n  <h5 class=\"modal-title\">" + title + "</h5>\n  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n  <span aria-hidden=\"true\">&times;</span>\n  </button>\n  </div>\n  <div class=\"modal-body\">\n  <p>" + message + "</p>\n  </div>\n  <div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n  </div>\n  </div>\n  </div>\n  </div>";
  return modal;
}

function parseNotifications() {
  if (getUrlParam('notification')) {
    var param = getUrlParam('notification');
    var $target = $(".notification-target");
    $.getJSON("/assets/json/notifications.json", function (data) {
      $.each(data, function (key, notification) {
        if (key == param) {
          var type = notification.type;
          var message = notification.message;
          var formattedMessage = message;

          if (type == 'alert') {
            var severity = notification.severity;
            formattedMessage = generateAlert(message, severity);
            $target.prepend(formattedMessage);
          } else if (type == 'modal') {
            var title = notification.title;
            formattedMessage = generateModal(title, message);
            $target.after(formattedMessage);
            $('#notification-modal').modal();
          }
        }
      });
    });
  }
} // Serialize form into JSON object


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

(function ($) {
  $(document).ready(function () {
    // Target your .container, .wrapper, .post, etc.
    $(".video-container").fitVids(); // Parse URL params for notifications.

    parseNotifications(); // Sheetsu

    var $challengeForm = $("#challenge-form");
    $("input#timestamp", $challengeForm).val(Date.now());
    $challengeForm.attr("sheetsu-after-submit", window.location.href + "?notifcation=challenge"); // Category mapping object

    var categories = {
      "transportation": {
        "color": "warning",
        "icon": "bus"
      },
      "health": {
        "color": "danger",
        "icon": "heartbeat"
      },
      "utilities": {
        "color": "info",
        "icon": "lightbulb-o"
      },
      "safety": {
        "color": "warning",
        "icon": "exclamation-triangle"
      },
      "smart city": {
        "color": "success",
        "icon": "leaf"
      },
      "other": {
        "color": "danger",
        "icon": "cogs"
      }
    }; // Process challenge ideas

    var $challengeIdeas = $("#challenge-ideas");

    if ($challengeIdeas.length > 0) {
      let ideaTemplate = item => "\n      <div class=\"col-md-4\">\n        <div class=\"card bg-" + item["category-color"] + "\">\n            <div class=\"card-body\">\n              <h5 class=\"card-category card-category-social\">\n                <i class=\"fa fa-" + item["category-icon"] + "\"></i> " + item.Category + "\n              </h5>\n              <h4 class=\"card-title\">\n                \"" + item.Idea + "\"\n              </h4>\n            </div>\n            <div class=\"card-footer\">\n              <div class=\"author\">\n                <a href=\"https://twitter.com/" + item.Twitter + "\">\n                  <img src=\"https://avatars.io/twitter/" + item.Twitter + "\" alt=\"" + item.Twitter + " profile image\" class=\"avatar img-raised\">\n                  <span>" + item.Twitter + "</span>\n                </a>\n              </div>\n            </div>\n          </div>\n        </div>\n      ";

      fetch('https://sheetsu.com/apis/v1.0bu/6167299f6e6e').then(res => res.json()).then(json => {
        // JSON Schema

        /*
        Approved: ""
        Category: "smart city"
        Idea: "I'm submitting an idea."
        Timestamp: "1543338950703"
        Twitter: "danminshew"
        */
        json.forEach(item => {
          // Update JSON objects
          item["category-color"] = categories[item.Category].color;
          item["category-icon"] = categories[item.Category].icon;

          if (!item.Twitter) {
            item.Twitter = "twitter";
          } // Only add if post is approved.


          if (item.Approved) {
            $challengeIdeas.append(ideaTemplate(item));
          }
        });
      }).catch(e => console.log('error fetching ideas: ', e));
    }
  });
})(jQuery);