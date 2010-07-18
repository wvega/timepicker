

(function($) {

module("TimePicker options", {
    teardown: function() {
        $('#timepicker').timepicker().destroy();
    }
});

// TODO: add other callbacks tests
test('all callbacks', 1, function() {
    var first = false, timepicker = $('#timepicker').timepicker({
        change: function() {
            ok(true, 'change() callback executed.');
            start();
        }
    });

    stop();

    timepicker.val('46').change();
});



module('TimePicker event handlers.');

test('open/close', function() {
    var timepicker = $('#timepicker').timepicker(),
        instance = timepicker.timepicker(),
        selected = null;

    stop();

    ok(instance.closed, 'TimePicker starts closed.');

    timepicker.focus();
    ok(!instance.closed, 'TimePicker opens when input field gains focus.');

    timepicker.simulate('keydown', { keyCode: 65 });
    ok(instance.closed, 'TimePicker is closed after the \'a\' key is pressed.');

    timepicker.simulate('keydown', { keyCode: instance.keyCode.DOWN });
    ok(!instance.closed, 'TimePicker opens when DOWN key is pressed.');

    selected = instance.selected();
    timepicker.simulate('keydown', { keyCode: instance.keyCode.ENTER });
    setTimeout(function() {
        ok(instance.closed, 'TimePicker is closed after an item has been selected pressing ENTRE key.');
        ok(timepicker.val() == selected.text(), 'The value in the input field is the text of the selected item.');
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
    ok(selected === null, 'No item is selected at the beginning!.');
    
    timepicker.simulate('keydown', { keyCode: instance.keyCode.DOWN });
    setTimeout(function() {
        selected = instance.selected();
        ok(selected !== null, 'An element is selected after the DOWN key is pressed.');
        ok(selected !== null && selected.prevAll().length === 0, 'That element is the first element.');
        $('html').click();
        start();
    }, 50);
})

//$(function() { $('#fuck').timepicker(); });

})(jQuery);