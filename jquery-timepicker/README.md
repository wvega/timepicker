jQuery TimePicker plugin
========================

A jQuery plugin to enhance standard form input fields helping users to select
(or type) times.

Usage
-----

    # Include jquery.timepicker.js file.
    # Include jquery.timepicker.css file.
    # Initialize the plugin when the DOM is ready:

        $(document).ready(function(){
            $('input.timepicker').timepicker({});
        });

Options
-------

- timeFormat: this is the format of time string displayed in the input field and
    the menu items in the combobox. Available modifiers are: h, hh, H, HH, m, mm, s, ss, p
- minTime: a Date object. Only the time parts (getHours, getMinutes) of the
    object are important. Time entries before minTime won't be displayed/allowed.
- minHour: int. Ignored if minTime is set.
- minMinutes: int. Ignored if minTime is set.
- maxTime: a Date object. Time entries after maxTime won't be displayed.
- maxHour: int. Ignored if maxTime is set.
- maxMinutes: int. Ignored if maxTime is set.
- starTime: a Date object. The time of the first item in the combobox when the
    input field is empty. If the input field is not empty the first item will be
    the next allowed time entry.
- startHour: int. Ignored if startTime is set.
- startMinutes: int. Ignored if startTime is set.
- interval: int. Time separation in minutes between each time entry.
- zindex: the zindex for the dropdown menu. If not present, uses the offsetParent's zindex.
- change: a function called when the value of the input field changes. A Date
    object with the selected time is passed to the callback.

        function(time) { ... }
