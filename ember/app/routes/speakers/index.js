export default Ember.Route.extend({
  model: function() {
    return this.store.find('speaker');
  },

  actions: {
      create: function() {
          var model = this.store.createRecord('speaker', function () {
              name: ''
          });
      }
  }
});
