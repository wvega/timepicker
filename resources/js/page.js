if ( typeof jQuery !== 'undefined' ) {
    (function($) {
        $('.intro .timepicker-without-dropdown').timepicker({
            dropdown: false
        });

        $('.intro .timepicker-with-dropdown').timepicker({
        });

        $(function () {
            var $section = $('.jt-configuration-demo');

            if ( $section.length === 0 ) {
                return;
            }

            var $form = $section.find('.jt-configuration-demo-form');

            $form.find('[data-toggle="tooltip"]').tooltip({
                html: true,
                container: $form,
            });

            var $timepicker = $section.find('.timepicker'),
                $textfields = $(),
                $checkboxes = $(),
                options = {
                    timeFormat: 'h:mm p',
                    interval: 60,
                    defaultTime: '11',
                    startTime: '10:00',
                    minTime: '10',
                    maxTime: '6:00pm',
                    dynamic: false,
                    dropdown: true,
                    scrollbar: false
                };

            $textfields = $textfields.add($form.find('[name="timeFormat"]').val(options.timeFormat));
            $textfields = $textfields.add($form.find('[name="interval"]').val(options.interval));
            $textfields = $textfields.add($form.find('[name="defaultTime"]').val(options.defaultTime));
            $textfields = $textfields.add($form.find('[name="startTime"]').val(options.startTime));
            $textfields = $textfields.add($form.find('[name="minTime"]').val(options.minTime));
            $textfields = $textfields.add($form.find('[name="maxTime"]').val(options.maxTime));

            $textfields.each(function() {
                var $field = $(this);
                $field.val(options[ $field.attr('name') ]);
            }).change(function() {
                var $field = $(this);

                options[ $field.attr('name') ] = $field.val();

                updateTimepickerOptions();
            });

            $checkboxes = $checkboxes.add($form.find('[name="dynamic"]'));
            $checkboxes = $checkboxes.add($form.find('[name="dropdown"]'));
            $checkboxes = $checkboxes.add($form.find('[name="scrollbar"]'));

            $checkboxes.each(function() {
                var $field = $(this);
                $field.prop('checked', options[ $field.attr('name') ]);
            }).change(function() {
                var $field = $(this);

                options[ $field.attr('name') ] = $field.prop('checked');

                updateTimepickerOptions();
            });

            updateTimepickerOptions();

            function updateTimepickerOptions() {
                $timepicker.timepicker('destroy').timepicker(options);
                $section.find('.jt-configuration-demo-example-code-container code').html(formatOptions(options));
            }

            function formatOptions(options) {
                var code = '<span class="nx">$</span><span class="p">(</span><span class="s1">&#39;.timepicker&#39;</span><span class="p">).</span><span class="nx">timepicker</span><span class="p">({</span>' + "\n";

                if (options.timeFormat) {
                    code += formatStringOption('timeFormat', options.timeFormat) + ",\n";
                }

                if (options.interval) {
                    code += formatIntegerOption('interval', options.interval) + ",\n";
                }

                if (options.minTime) {
                    code += formatStringOption('minTime', options.minTime) + ",\n";
                }

                if (options.maxTime) {
                    code += formatStringOption('maxTime', options.maxTime) + ",\n";
                }

                if (options.defaultTime) {
                    code += formatStringOption('defaultTime', options.defaultTime) + ",\n";
                }

                if (options.startTime) {
                    code += formatStringOption('startTime', options.startTime) + ",\n";
                }

                code += formatBooleanOption('dynamic', options.dynamic) + ",\n";
                code += formatBooleanOption('dropdown', options.dropdown) + ",\n";
                code += formatBooleanOption('scrollbar', options.scrollbar) + "\n";

                return code + '<span class="p">});</span></code>';
            }

            function formatStringOption(name, value) {
                return "&nbsp;&nbsp;&nbsp;&nbsp;" + '<span class="nx">' + name + '</span><span class="o">:</span> <span class="s1">&#39;' + value + '&#39;</span><span class="p"></span>';
            }

            function formatIntegerOption(name, value) {
                return "&nbsp;&nbsp;&nbsp;&nbsp;" + '<span class="nx">' + name + '</span><span class="o">:</span> <span class="mi">' + value + '</span><span class="p"></span>';
            }

            function formatBooleanOption(name, value) {
                return "&nbsp;&nbsp;&nbsp;&nbsp;" + '<span class="nx">' + name + '</span><span class="o">:</span> <span class="kc">' + (value ? 'true' : 'false') + '</span>';
            }
        });
    })(jQuery);
}
