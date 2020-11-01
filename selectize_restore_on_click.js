/**
 * Custom Plugin: "restore_on_click" (selectize.js)
 */

Selectize.define('restore_on_click', function(options) {
    var self = this;

    options.text = options.text || function(option) {
        return option[this.settings.labelField];
    };

    // override the setup method to add an extra `click` editable  handler
    this.setup = (function() {

        var original = self.setup;

        return function() {

            original.apply(this, arguments);

            this.$control.on('click', 'div', function(e) {

                e.preventDefault();

                if (self.isLocked || e.target.className.indexOf("remove") !== -1) return;

                 var index, value, option;
                 self.isEditable = true;

                if (self.$control_input.val() === '' && self.$activeItems.length === 1) {

                    value =  e.currentTarget.getAttribute('data-value');
                    index = self.items.indexOf(value);

                    if (value) {
                        option = self.options[value];
                        if (self.deleteSelection(e)) {
                            self.setCaret(index);
                            self.setTextboxValue(options.text.apply(self, [option]));
                            self.refreshOptions(true);
                            self.isEditable = false;
                        }
                        return;
                    }
                }

            });

        };
    })();
});
