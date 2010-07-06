

(function($) {

module("TimePicker options", {
    teardown: function() {
        $('#timepicker').timepicker().destroy();
    }
});

test('all callbacks', 2, function() {
    var first = false, timepicker = $('#timepicker').timepicker({
        change: function() {
            ok(true, 'change() callback executed');
        }
    });

    stop();

    timepicker.val('46');
    setTimeout(function() {
        timepicker.change();
        ok(false, 'TODO: add other callbacks');
        start();
    }, 50);
});



//$(function() { $('#fuck').timepicker(); });

})(jQuery);