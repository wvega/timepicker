$(function() {
    // activate tabs
    $('ul.nav').tabs('.tab-content > div', {
        current: 'active',
        history: true,
        onBeforeClick: function(event, index) {
            var tab = $(event.target.getCurrentTab());
            tab.closest('ul').find('li').removeClass('active').eq(index).addClass('active');
        }
    });
});