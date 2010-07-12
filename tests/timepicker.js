

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



module("TimePicker exposed methods");

test('selected()', 3, function() {
    var selected = false, 
        timepicker = $('#timepicker').timepicker(),
        instance = timepicker.timepicker();

    stop();

    selected = instance.selected();
    ok(selected === null, 'No item is selected at the beginning!');
    
    timepicker.simulate('keypress', { keyCode: instance.keyCode.DOWN });
    setTimeout(function() {
        selected = instance.selected();
        ok(selected !== null, 'An element is selected after the DOWN key is pressed.');
        ok(selected.prevAll().length === 0, 'That element is the first element.');
        $('html').click();
        start();
    }, 50);
})

//$(function() { $('#fuck').timepicker(); });

})(jQuery);