import startApp from 'bostonember/tests/helpers/start-app';
import Ember from 'ember';
import initialSpeakers from 'bostonember/tests/helpers/fixture/initial_speakers';
import initialPresentations from 'bostonember/tests/helpers/fixture/initial_presentations';

var App, server;

module('Integration - Speaker Page', {
    setup: function () {
        App = startApp();
        var speakers = initialSpeakers();
        var presentations = initialPresentations();

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
                    return (presentation.speaker_id === speaker.id);
                });

                return [200, {"Content-Type": "application/json"}, JSON.stringify({speaker: speaker, presentations: speakerPresentations})];
            });

            this.delete('/api/speakers/:id', function(request) {
                var deletedSpeakerId = parseInt(request.params.id, 10);
                var deletedSpeaker = speakers.find(function (speaker) {
                    if (speaker.id === parseInt(request.params.id, 10)) {
                        return speaker;
                    }
                });

                var lessSpeakerPresentations = presentations.filter(function(presentation) {
                    return (presentation.speaker_id === deletedSpeakerId);
                });
                return [200, {"Content-Type": 'application/json'}, '{}'];
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
        ok(find('h3:contains(Speakers)'));
    });
});

test('Should list all speakers and number of presentations', function () {
    visit('/speakers').then(function () {
        ok(/>2</.test($('tr:contains(Bugs Bunny)').html()));
        ok(/>1</.test($('tr:contains(Wile E. Coyote)').html()));
        ok(/>3</.test($('tr:contains(Yosemite Sam)').html()));
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
    visit('/speakers/1').then(function() {
        equal(find('h4').text(), 'Bugs Bunny');
    });
});

test('Should list all presentations for a speaker', function () {
    visit('/speakers/1').then(function() {
        equal(find('li:contains("What\'s up with Docs?")').length, 1);
        equal(find('li:contains("Of course, you know, this means war.")').length, 1);
    });
});

test('Should see edit button to edit a speaker', function () {
    visit('/speakers/1').then(function() {
        ok(find('a').hasClass('edit-speaker'));
    });
});

test('Should be able to visit a speaker edit page', function () {
    expect(1);
    visit('/speakers/1');
    click('a.edit-speaker');
    andThen(function() {
        notEqual(find('input.speaker-name'), undefined);
    });
});

test("Should see a button or link to commit the edit change", function() {
    expect(1);
    visit('/speakers/1/edit');
    andThen(function() {
       ok(find('button').hasClass('commit-speaker-change'));
    });
});

test("Change the name of 'Bugs Bunny' to 'Silly Wabbit'", function() {
    expect(1);
    visit('/speakers/1/edit');
    andThen(function() {
        fillIn('input.speaker-name', 'Silly Wabbit');
        click(findWithAssert('button').hasClass('commit-speaker-change'));
        andThen(function() {
            equal(findWithAssert('input.speaker-name').val(), 'Silly Wabbit');
        });
    });
});

test("Can see a link to create a new speaker", function() {
    visit('/speakers');
    andThen(function() {
       ok(find('a').hasClass('create-speaker'));
    });
});

test("Can navigate to a page to create a speaker", function() {
   expect(1);
   visit('/speakers');
   click(find('a.create-speaker'));
   andThen(function() {
       var my_head = findWithAssert('button.commit-speaker-creation');
       ok(my_head !== undefined);
   });
});

test("Can see a button to delete an existing speaker", function() {
    visit('/speakers/1');
    andThen(function() {
        ok(find('button').hasClass('delete-speaker'));
    });
});

test("Can delete an existing speaker", function() {
    visit('/speakers/1');
    click(find('button.delete-speaker'));
    andThen(function() {
        equal(currentRouteName(), 'speakers.index');
    });
});
