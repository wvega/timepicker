(function($) {

module('$.timepicker.parseTime');

var now = new Date(), k;
function time(hours, minutes, seconds) {
    hours = hours || 0;minutes = minutes || 0;seconds = seconds || 0;
    var time = new Date();
    time.setTime(now.valueOf());
    time.setHours(hours, minutes, seconds, 0, 0);
    return time;
}

function parseTimeTest(value, expected) {
    test('parseTime(\'' + value + '\')', 1, function() {
        var t = $.fn.timepicker.parseTime(value),
            result = null, parsed = '', expectedMessage;

        result = t ? time(t.getHours(), t.getMinutes(), t.getSeconds()) : false;
        parsed = result ? result.toTimeString() : false;
        expectedMessage = expected ? expected.toTimeString() : 'false';

        ok(result >= expected && result <= expected, 'Parsed: ' + parsed + ' | Expected: ' + expectedMessage);
    });
}

 var input = ['1', time(1),
              '11', time(11),
              '111', time(1, 11),
              '1234', time(12, 34),
              '12345', time(1, 23, 45),
              '123456', time(12, 34, 56),
              '46', time(5),
              ':1', time(10),
              ':2', time(20),
              ':3', time(3),
              ':4', time(4),
              ':5', time(5),
              ':6', time(6),
              ':7', time(7),
              ':8', time(8),
              ':9', time(9),
              ':12', time(12),
              ':123', time(1, 23),
              ':1234', time(12, 34),
              ':12345', time(1, 23, 45),
              ':123456', time(12, 34, 56),
              ':1234567', time(12, 34, 56),
              ':61', time(6, 10),
              ':62', time(6, 20),
              ':1261', false,
              ':1271', false,
              '1:7', time(1, 7),
              '2:8', time(2, 8),
              '3:9', time(3, 9),
              '1:1', time(1, 10),
              '6:1', time(6, 10),
              '1:6', time(2),
              '7:1', time(7, 10),
              '8:60', time(9),
              '8:59', time(8, 59),
              '7:35', time(7, 35),
              '3:45', time(3, 45),
              '10:7', time(10, 7),
              '21:08', time(21, 8),
              '10:10', time(10, 10),
              '10:60', time(10, 60),
              '10:1', time(10, 10),
              '10:3', time(10, 30),
              '10:5', time(10, 50),
              '6:0660', time(6, 7),
              '6:032', time(6,3,20),
              '1:23', time(1, 23),
              '2:345', time(2, 34, 50),
              '3:4567', false,
              '4:56012', time(4, 56, 1),
              '123:4', time(1, 23, 4),
              '1234:5', time(12, 34, 5),
              '123:45', time(1, 23, 45),
              '1234:56', time(12, 34, 56),
              '1:2:3', time(1,2,3),
              '1:2:30', time(1,2,30),
              '10:2:30', time(10,2,30),
              '1:20:30', time(1,20,30),
              '11:15:03', time(11,15,3)];

for (k = 0; k < input.length; k = k+2) {
    parseTimeTest(input[k], input[k+1]);
}

})(jQuery);