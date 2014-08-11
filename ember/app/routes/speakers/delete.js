export default Ember.Route.extend({

    actions: {
        delete: function() {
            var my_model = this.controller.get('model');
            my_model.deleteRecord();
            my_model.save();
            this.transitionTo('speakers');
        }
    }
});
