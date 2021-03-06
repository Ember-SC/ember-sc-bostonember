import startApp from 'embersc/tests/helpers/start-app';
import Ember from 'ember';
import initialSpeakers from 'embersc/tests/helpers/fixture/initial_speakers';
import initialPresentations from 'embersc/tests/helpers/fixture/initial_presentations';
import fixtureServer from 'embersc/tests/helpers/fixture/fixture-server';
import testOnSameRow from 'embersc/tests/helpers/testOnSameRow';

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

test('Should allow navigation to a list of presentations page from the landing page', function () {
    visit('/');
    click("a:contains('Presentations')");
    andThen(function () {
        equal(find('h3').text(), 'Presentations');
    });
});

test('Should list all presentations and the speaker for each presentation', function () {
    visit('/presentations').then(function () {
        testOnSameRow('What\'s up with Docs?', 'Bugs Bunny');
        testOnSameRow('Of course, you know, this means war.', 'Bugs Bunny');
        testOnSameRow('Getting the most from the Acme catalog.', 'Wile E. Coyote');
        testOnSameRow('Shaaaad up!', 'Yosemite Sam');
        testOnSameRow('Ah hates rabbits.', 'Yosemite Sam');
        testOnSameRow('The Great horni-todes', 'Yosemite Sam');
    });
});

test('Should allow navigation to an edit page for the presentation from the presenation list', function() {
    expect(2);
    visit('/presentations');
    click("a:contains('Shaaaad up!')");
    andThen(function() {
        equal(currentURL(), '/presentations/4/edit');
        equal(find('input.presentation-title').val(), 'Shaaaad up!');
    });
});

test('Should go to speaker\'s show page after submitting presentation edit', function() {
    expect(3);
    visit('/presentations/4/edit');
    var changed_text = 'Be Quiet!';
    fillIn('input.presentation-title', changed_text);
    click('button.commit-presentation-change');
    andThen(function() {
        equal(currentURL(), '/speakers/3');
        ok("h4:contains('Yosemite Sam')");
        ok("li:contains('" + changed_text + "')");
    });
});

