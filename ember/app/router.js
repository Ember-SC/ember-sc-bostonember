import Ember from 'ember';

var Router = Ember.Router.extend({
  location: BostonemberENV.locationType
});

Router.map(function() {
    this.route('about');
    this.resource('speakers', function () {
        this.route('show', {path: ':speaker_id'});
        this.route('edit', {path: ':speaker_id/edit'});
        this.route('create', {path: 'create'});
    });
    this.resource('presentations', function () {
        this.route('show', {path: ':presentation_id'});
        this.route('edit', {path: ':presentation_id/edit'});
    });
});

export default Router;
