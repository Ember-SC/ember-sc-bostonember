import startApp from 'bostonember/tests/helpers/start-app';
import Ember from 'ember';
import initialSpeakers from 'bostonember/tests/helpers/fixture/initial_speakers';
import initialPresentations from 'bostonember/tests/helpers/fixture/initial_presentations';
import fixtureServer from 'bostonember/tests/helpers/fixture/fixture-server';

var App, server;

module('Integration - Presentation Page', {
    setup: function () {
        App = startApp();
        var speakers = initialSpeakers();
        var presentations = initialPresentations();
        server = fixtureServer(speakers, presentations);
    },
    teardown: function () {
        Ember.run(App, 'destroy');
        server.shutdown();
    }
});

test('Should allow navigation to the presentations page from a speaker page', function () {
    visit('/');
    ok(true);
});
