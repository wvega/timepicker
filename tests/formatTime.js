(function($){

module('$.timepicker.parseTime');

function formatTimeTest(time, format, expected) {
    test('timeFormat(\'' + format + '\')', 1, function() {
        var result = $.fn.timepicker.formatTime(format, time);
        ok(result == expected, time.toTimeString() + ' | ' + result);
    });
}

var time = new Date(1988, 8, 24, 19, 30, 0),
    formats = [['hh:mm:ss p', '07:30:00 PM'], ['HH:mm:ss', '19:30:00'],
               ['h:m:s p', '7:30:0 PM'], ['H:m:s', '19:30:0']];

for (var k in formats) {
    formatTimeTest(time, formats[k][0], formats[k][1]);
}

})(jQuery);