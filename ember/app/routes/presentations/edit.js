export default Ember.Route.extend({

    actions: {
        submit: function() {
            var myModel = this.controller.get('model');
            myModel.save();
            this.transitionTo('speakers.show', myModel.get('speaker'));
        }
    }
});
