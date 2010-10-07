(function($) {

var system = $({}), timeout = 50;



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



module("TimePicker exposed methods");

test('selected()', 3, function() {
    var selected = false,
        timepicker = $('#timepicker').timepicker(),
        instance = timepicker.timepicker();

    stop();

    system.queue('test', []);
    system.queue('test', function(next) {
        selected = instance.selected();
        ok(selected === null, 'No item is selected at the beginning!.');
        timepicker.simulate('keydown', {keyCode: instance.keyCode.DOWN});
        next();
    });

    system.delay(timeout, 'test');
    system.queue('test', function(next) {
        selected = instance.selected();
        ok(selected !== null, 'An element is selected after the DOWN key is pressed.');
        ok(selected !== null && selected.prevAll().length === 0, 'That element is the first element.');
//        $('html').click();
        next();
    });

    system.queue('test', function(next) { start(); }).dequeue('test');
});



module('TimePicker event handlers.');

test('open/close', function() {
    var timepicker = $('#timepicker').timepicker(),
        instance = timepicker.timepicker(),
        selected = null;

    stop();

    system.queue('test', []);
    system.queue('test', function(next) {
        ok(instance.closed, 'TimePicker starts closed.');
        timepicker.focus();
        next();
    });

    system.delay(timeout, 'test');
    system.queue('test', function(next) {
        ok(!instance.closed, 'TimePicker opens when input field gains focus.');
        timepicker.simulate('keydown', {keyCode: 65});
        next();
    });

    system.delay(timeout, 'test');
    system.queue('test', function(next) {
        ok(instance.closed, 'TimePicker is closed after the \'a\' key is pressed.');
        timepicker.simulate('keydown', {keyCode: instance.keyCode.DOWN});
        next();
    });

    system.delay(timeout, 'test');
    system.queue('test', function(next) {
        ok(!instance.closed, 'TimePicker opens when DOWN key is pressed.');
        selected = instance.selected();
        timepicker.simulate('keydown', {keyCode: instance.keyCode.ENTER});
        next();
    });

    system.delay(timeout, 'test');
    system.queue('test', function(next) {
        ok(instance.closed, 'TimePicker is closed after an item has been selected pressing ENTER key.');
        ok(selected !== null, 'An element is selected after the DOWN key is pressed.');
        ok(selected ? timepicker.val() == selected.text() : false, 'The value in the input field is the text of the selected item.'); 
        next();
    }, 50);

    system.queue('test', function(next) { start(); }).dequeue('test');
});

})(jQuery);