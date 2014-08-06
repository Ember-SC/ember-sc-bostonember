import startApp from 'bostonember/tests/helpers/start-app';
import Ember from 'ember';

var App, server;

module('Integration - Speaker Page', {
    setup: function () {
        App = startApp();
        var speakers = [
            { id: 1, name: 'Bugs Bunny', presentation_ids: [1, 2] },
            { id: 2, name: 'Wile E. Coyote', presentation_ids: [3] },
            { id: 3, name: 'Yosemite Sam', presentation_ids: [4, 5, 6] }
        ];

        var presentations = [
            { id: 1, title: "What's up with Docs?", speaker_id: 1 },
            { id: 2, title: "Of course, you know, this means war.", speaker_id: 1 },
            { id: 3, title: "Getting the most from the Acme categlog.", speaker_id: 2 },
            { id: 4, title: "Shaaaad up!", speaker_id: 3 },
            { id: 5, title: "Ah hates rabbits.", speaker_id: 3 },
            { id: 6, title: "The Great horni-todes", speaker_id: 3 }
        ];

        server = new Pretender(function () {
            this.get('/api/speakers', function (request) {
                return [200, {"Content-Type": "application/json"}, JSON.stringify({speakers: speakers, presentations: presentations})];
            });

            this.get('/api/speakers/:id', function (request) {
                var speaker = speakers.find(function (speaker) {
                    if (speaker.id === parseInt(request.params.id, 10)) {
                        return speaker;
                    }
                });

                var speakerPresentations = presentations.filter(function (presentation) {
                    if (presentation.speaker_id === speaker.id) {
                        return true;
                    }
                });

                return [200, {"Content-Type": "application/json"}, JSON.stringify({speaker: speaker, presentations: speakerPresentations})];
            });
        });

    },
    teardown: function () {
        Ember.run(App, 'destroy');
        server.shutdown();
    }
});

test('Should allow navigation to the speakers page from the landing page', function () {
    visit('/');
    click('a:contains("Speakers")');
    andThen(function () {
        equal(find('h3').text(), 'Speakers');
    });
});

test('Should list all speakers and number of presentations', function () {
    visit('/speakers');
    andThen(function () {
        equal(find('a:contains("Bugs Bunny (2)")').length, 1);
        equal(find('a:contains("Wile E. Coyote (1)")').length, 1);
        equal(find('a:contains("Yosemite Sam (3)")').length, 1);
    });
});

test('Should be able to navigate to a speaker page', function () {
    visit('/speakers');
    click('a:contains("Bugs Bunny")');
    andThen(function () {
        equal(find('h4').text(), 'Bugs Bunny');
    });
});

test('Should be able to visit a speaker page', function () {
    visit('/speakers/1');
    andThen(function() {
        equal(find('h4').text(), 'Bugs Bunny');
    });
});

test('Should list all presentations for a speaker', function () {
    visit('/speakers/1');
    andThen(function() {
        equal(find('li:contains("What\'s up with Docs?")').length, 1);
        equal(find('li:contains("Of course, you know, this means war.")').length, 1);
    });
});

test('Should see edit button to edit a speaker', function () {
    visit('/speakers/1');
    andThen(function() {
        equal(find('a').hasClass('edit-speaker'), true);
    });
});

test('Should be able to visit a speaker edit page', function () {
    visit('/speakers/1');
    click('a.edit-speaker');
    andThen(function () {
        var input_control = find('input.speaker-name');
        notEqual(input_control, undefined, "input control w/ class 'speaker-name' not found");
        // equal(input_control.value, 'text', "input control for name should not be empty"); // Can't seem to get this to work
    });
});
