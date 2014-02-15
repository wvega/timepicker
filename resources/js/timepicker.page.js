/*global _gaq*/
$(function() {

    /* activate timepickers */

    $('#options-time-format').timepicker({ timeFormat: 'h:mm:ss p' });

    $('#options-time-constraints').timepicker({
        timeFormat: 'HH:mm:ss',
        minTime: '11:45:00',
        maxHour: 20,
        maxMinutes: 30,
        startTime: new Date(0,0,0,15,0,0),
        interval: 15
    });

    $('#options-change-event').timepicker({
        change: function(time) {
            // the input field
            var element = $(this), text;
            // get access to this TimePicker instance
            var timepicker = element.timepicker();
            text = 'Selected time is: ' + timepicker.format(time);
            element.siblings('span.help-line').text(text);
        }
    });

    /* track Google Analytics events */

    var trackOutboundLinks = function(href, category, action) {
        try {
            _gaq.push(['_trackEvent', category, action]);
        } catch (err) {
            // pass
        }

        setTimeout(function() {
            document.location.href = href;
        }, 100);
    };

    $('#download-button').click(function(e) {
        e.preventDefault();

        var href = $(this).attr('href');

        trackOutboundLinks(href, 'Outbound Links', href);
    });
});
