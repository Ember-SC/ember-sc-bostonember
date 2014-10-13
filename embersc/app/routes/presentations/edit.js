export default Ember.Route.extend({

    actions: {
        submit: function() {
            var myPresentation = this.controller.get('model');
            var mySpeaker = myPresentation.get('speaker');
            myPresentation.save();
            this.transitionTo('speakers.show', mySpeaker);
        }
    }
});
