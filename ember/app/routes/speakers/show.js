export default Ember.Route.extend({

    actions: {
        delete: function () {
            var my_controller = this.controller;
            my_controller.get('model').destroyRecord();
            this.transitionTo('speakers.index');
        }
    }
});
