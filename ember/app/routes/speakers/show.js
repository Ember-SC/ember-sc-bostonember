export default Ember.Route.extend({

    actions: {
        delete: function () {
            this.controller.get('model').destroyRecord();
            this.transitionTo('speakers.index');
        }
    }
});
