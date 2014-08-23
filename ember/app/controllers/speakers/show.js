export default Ember.ObjectController.extend({

    actions: {
        submit: function () {
            var my_model = this.controller.get('model');
            my_model.save();
            this.transitionTo('speakers.show', my_model);
        },

        delete: function () {
            var my_controller = this;
            my_controller.get('model').destroyRecord().then(function () {
                console.log('********** Destroy Success! ***********');
                my_controller.transitionToRoute('speakers.index');
            }, function (reason) {
                console.log(reason);
            });
        }
    }
});
