jQuery TimePicker plugin
========================

A jQuery plugin to enhance standard form input fields helpings users to select
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
    the menu items in the combobox. Available modifiers are:
    * h
    * hh
    * H
    * HH
    * m
    * mm
    * s
    * ss
    * p
- minTime: a Date object. Only the time parts (getHours, getMinutes) of the
    object are important. Time entries before minTime won't be displayed/allowed.
- minHour:
- minMinutes:
- maxTime: a Date object. Time entries after maxTime won't be displayed.
- maxHour:
- maxMinutes:
- starTime: a Date object. The time of the first item in the combobox when the
    input field is empty. If the input field is not empty the first item will be
    the next allowed time entry.
- startHour:
- startMinutes:
- interval: a number between 0 and 60. Time separation in minutes between each 
    time entry.
- change: a callback called when the value of the input field changes.

        function(time) { ... }