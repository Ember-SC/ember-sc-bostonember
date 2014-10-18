import startApp from 'embersc/tests/helpers/start-app';
import Ember from 'ember';
import initialSpeakers from 'embersc/tests/helpers/fixture/initial_speakers';
import initialPresentations from 'embersc/tests/helpers/fixture/initial_presentations';
import fixtureServer from 'embersc/tests/helpers/fixture/fixture-server';
import testOnSameRow from 'embersc/tests/helpers/testOnSameRow';

var App, server;

module('Integration - Speaker Page', {
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

test('Should allow navigation to the speakers page from the landing page', function () {
    visit('/');
    click('a:contains("Speakers")');
    andThen(function () {
        ok(find('h3:contains(Speakers)'));
    });
});

test('Should list all speakers and number of presentations', function () {
    visit('/speakers').then(function () {
        testOnSameRow('Bugs Bunny', '2');
        testOnSameRow('Wile E. Coyote', '1');
        testOnSameRow('Yosemite Sam', '3');
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
   visit('/speakers').then(function() {
     click(find('a.create-speaker'));
     andThen(function() {
         var my_head = findWithAssert('button.commit-speaker-creation');
         ok(my_head !== undefined);
     });
   });
});

test("Can see a button to delete an existing speaker", function() {
    visit('/speakers/1');
    andThen(function() {
        ok(find('button').hasClass('delete-speaker'));
    });
});

test("Can delete an existing speaker", function() {
    expect(3);
    visit('/speakers/1').then(function() {
      click(find('button.delete-speaker'));
      andThen(function() {
        equal(currentRouteName(), 'speakers.index', "Should be on speakers.index page");
        var missingLinks = find('a:contains("Bugs Bunny")');
        equal(missingLinks.length, 0, "Should have no Bugs Bunny");
        visit ('/presentations');
        andThen(function() {
          //setTimeout(function() {
            equal(document.getElementsByClassName('presentationList')[0].rows.length, 4);
          //}, 2000);
        });
      });
    });
});
