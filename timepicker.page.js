$(function() {
    // activate tabs
    $('ul.nav').tabs('.tab-content > div', {
        current: 'active',
        history: true,
        onBeforeClick: function(event, index) {
            var tab = this.getCurrentTab();
            tab.closest('ul').find('li').removeClass('active').eq(index).addClass('active');
        }
    });

    // activate timepickers

    $('#options-time-format').timepicker({ timeFormat: 'h:mm:ss p' });

    $('#options-time-constraints').timepicker({
    	timeFormat: "HH:mm:ss",
    	minTime: "11:45:00",
    	maxHour: 20,
    	maxMinutes: 30,
    	startTime: "12p",
    	interval: 15
    });

    $('#options-change-event').timepicker({
    	change: function(time) {
            // the input field
            var element = $(this), text;
            // get access to this TimePicker instance
            var timepicker = element.data('timepicker');
            text = 'Selected time is: ' + timepicker.format(time);
            element.siblings('span.help-line').text(text);
        }
    });
});