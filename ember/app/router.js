var Router = Ember.Router.extend({
  location: BostonemberENV.locationType
});

Router.map(function() {
  this.route('about');
  this.resource('speakers', function() {
    this.route('show', {path: ':speaker_id'});
    this.route('edit', {path: ':speaker_id/edit'});
    this.route('delete', {path: ':speaker_id/delete'});
    this.route('create', {path: 'create'});
  });
});

export default Router;
