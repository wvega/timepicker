//
// jQuery 1.4 queue - needed when testing with previos versions of jQuery
// XXX: I think the tests can be rewritten to avoid using jQuery's queue
//

if (jQuery.fn.jquery < '1.4') {
(function( jQuery ) {
    
    jQuery.extend({
        queue: function( elem, type, data ) {
            if ( !elem ) {
                return;
            }

            type = (type || "fx") + "queue";
            var q = jQuery.data( elem, type );

            // Speed up dequeue by getting out quickly if this is just a lookup
            if ( !data ) {
                return q || [];
            }

            if ( !q || jQuery.isArray(data) ) {
                q = jQuery.data( elem, type, jQuery.makeArray(data) );

            } else {
                q.push( data );
            }

            return q;
        },

        dequeue: function( elem, type ) {
            type = type || "fx";

            var queue = jQuery.queue( elem, type ), fn = queue.shift();

            // If the fx queue is dequeued, always remove the progress sentinel
            if ( fn === "inprogress" ) {
                fn = queue.shift();
            }

            if ( fn ) {
                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if ( type === "fx" ) {
                    queue.unshift("inprogress");
                }

                fn.call(elem, function() {
                    jQuery.dequeue(elem, type);
                });
            }
        }
    });

    jQuery.fn.extend({
        queue: function( type, data ) {
            if ( typeof type !== "string" ) {
                data = type;
                type = "fx";
            }

            if ( data === undefined ) {
                return jQuery.queue( this[0], type );
            }
            return this.each(function( i ) {
                var queue = jQuery.queue( this, type, data );

                if ( type === "fx" && queue[0] !== "inprogress" ) {
                    jQuery.dequeue( this, type );
                }
            });
        },
        dequeue: function( type ) {
            return this.each(function() {
                jQuery.dequeue( this, type );
            });
        },

        // Based off of the plugin by Clint Helfers, with permission.
        // http://blindsignals.com/index.php/2009/07/jquery-delay/
        delay: function( time, type ) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";

            return this.queue( type, function() {
                var elem = this;
                setTimeout(function() {
                    jQuery.dequeue( elem, type );
                }, time );
            });
        },

        clearQueue: function( type ) {
            return this.queue( type || "fx", [] );
        }
    });

})( jQuery );
}

//
// actual tests
//

(function($) {

var system = $({}), timeout = 100;



module("TimePicker options", {
    teardown: function() {
        $('#timepicker').timepicker().destroy();
    }
});

// TODO: add other callbacks tests
test('all callbacks', function() {
    var first = false, expected = 1, timepicker = $('#timepicker').timepicker({
        change: function() {
            ok(true, 'change() callback executed.');
            start();
        }
    });

    expect(expected); stop(timeout * expected);

    timepicker.val('46').change();
});



module("TimePicker exposed methods", {
    teardown: function() {
        $('#timepicker').timepicker().destroy();
    }
});

test('selected, first, last', function() {
    var selected = false,
        timepicker = $('#timepicker').timepicker(),
        instance = timepicker.timepicker(),
        expected = 5;

    expect(expected); stop(timeout * expected);

    system.queue('test', []);
    system.queue('test', function(next) {
        selected = instance.selected();
        ok(selected === null, 'No item is selected at the beginning!.');
        timepicker.simulate('keydown', {keyCode: $.TimePicker.prototype.keyCode.DOWN});
        next();
    });

    system.delay(timeout, 'test');
    system.queue('test', function(next) {
        selected = instance.selected();
        ok(selected !== null, 'An element is selected after the DOWN key is pressed.');
        ok(instance.first(), 'That element is the first element.');
        timepicker.simulate('keydown', {keyCode: $.TimePicker.prototype.keyCode.UP});
        next();
    });

    system.delay(timeout, 'test');
    system.queue('test', function(next) {
        selected = instance.selected();
        ok(selected !== null, 'Another element is selected after the UP key is pressed.');
        ok(instance.last(), 'That element is the last element.');
        next();
    });

    system.queue('test', function(next) {start();}).dequeue('test');
});



module('TimePicker event handlers.');

test('open/close', function() {
    var timepicker = $('#timepicker').timepicker(),
        instance = timepicker.timepicker(),
        selected = null,
        expected = 8;

    expect(expected); stop(timeout * expected);

    system.queue('test', []);
    system.queue('test', function(next) {
        ok(instance.closed(), 'TimePicker starts closed.');
        timepicker.focus();
        next();
    });

    system.delay(timeout, 'test');
    system.queue('test', function(next) {
        ok(!instance.closed(), 'TimePicker opens when input field gains focus.');
        timepicker.simulate('keydown', {keyCode: 65});
        next();
    });

    system.delay(timeout, 'test');
    system.queue('test', function(next) {
        ok(instance.closed(), 'TimePicker is closed after the \'a\' key is pressed.');
        timepicker.simulate('keydown', {keyCode: $.TimePicker.prototype.keyCode.DOWN});
        next();
    });

    system.delay(timeout, 'test');
    system.queue('test', function(next) {
        ok(!instance.closed(), 'TimePicker opens when DOWN key is pressed.');
        selected = instance.selected();
        timepicker.simulate('keydown', {keyCode: 65});
        timepicker.simulate('keydown', {keyCode: $.TimePicker.prototype.keyCode.UP});
        next();
    });

    system.delay(timeout, 'test');
    system.queue('test', function(next) {
        ok(!instance.closed(), 'TimePicker opens when UP key is pressed.');
        selected = instance.selected();
        timepicker.simulate('keydown', {keyCode: $.TimePicker.prototype.keyCode.ENTER});
        next();
    });

    system.delay(timeout, 'test');
    system.queue('test', function(next) {
        ok(instance.closed(), 'TimePicker is closed after an item has been selected pressing ENTER key.');
        ok(selected !== null, 'An element is selected after the DOWN key is pressed.');
        ok(selected ? timepicker.val() == selected.text() : false, 'The value in the input field is the text of the selected item.');
        next();
    }, 50);

    system.queue('test', function(next) {start();}).dequeue('test');
});

})(jQuery);