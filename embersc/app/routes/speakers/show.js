export default Ember.Route.extend({

    actions: {
        delete: function () {
          var that = this;
            this.controller.get('model').destroyRecord().then(function() {
              that.transitionTo('speakers.index');
            });
        }
    }
});
