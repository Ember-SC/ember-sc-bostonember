export default Ember.Route.extend({

    actions: {
        submit: function() {
            var my_model = this.controller.get('model');
            my_model.save();
            this.transitionTo('speakers.show', my_model);
        }
    }
});
