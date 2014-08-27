# [fit] I AM

---

# [fit] GROOT

---

# [fit] Okay, I'm not

---

![](http://www.e-telequote.com/wp-content/uploads/2014/06/Medicare-Card.jpg)
# Scott Smith

* Old Fart Developer
* Blog: blog.scottnelsonsmith.com
* Twitter: _ofd
* Email: scottnelsonsmith@gmail.com
* GitHub: oldfartdeveloper

---

![](http://reportergary.com/wp-content/uploads/2011/06/a253.jpg)
# [fit] SPOILED RAILS DEVELOPER

---

![](https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRJMXq64J_MZP1gMIFf-BDE4oq0TP-F0n9r9zmcTkcqByRc6bLUxg)
# which is why I was attracted to Ember-CLI

---

![](http://www.myinnerspaceblog.com/wp-content/uploads/2012/04/walking_meditation.jpg)
# Ember-CLI

* Ember.js command line utility
    * Broccoli-based pipeline
    * ES6 module syntax to facilitate many source files
    * Test file management
    * Dependency management

---

![](https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTgziOt0eNm-SxTYT717Zoar_wxgJXa0QKPZd1qPVZ-F9LZiYeN376V7Tk)

# [fit] this is how software
# [fit] is developed in
# [fit] the real world!

---

![150%](http://v1.memecaptain.com/6bb0ce.jpg)

---

![150%](http://sportsnetwork.wpengine.netdna-cdn.com/wp-content/uploads/2013/06/Pros-300x286.jpg)

* Really convenient once set up
* Efficient Broccoli asset refresh after every file save.
* Automatic test execution, including multiple browsers on Testem

---

![150%](/Users/SSmith/Pictures/iPhoto Library.photolibrary/Previews/2014/08/26/20140826-001936/T9+dZTMCRdOP2KXrEi3q5g/Cons-300x286.jpg)

* Pain to set up
    * Intellij must be told not to index temporary files
* Incomplete/incorrect documentation
* "stable" alpha
    * Rapidly changing software components/changing APIs

--- 

# [fit] Demo
# [fit] So run the damn app!

---

# [fit] Fixture for
# [fit] Integration Testing

---

# [fit] Speakers

```javascript
export default function initialSpeakers() {
    return [
        { id: 1, name: 'Bugs Bunny', presentation_ids: [1, 2] },
        { id: 2, name: 'Wile E. Coyote', presentation_ids: [3] },
        { id: 3, name: 'Yosemite Sam', presentation_ids: [4, 5, 6] }
    ];
}
```

---

# [fit] Presentations

```javascript
export default function initialPresentations() {
    return [
        { id: 1, title: "What's up with Docs?", speaker_id: 1 },
        { id: 2, title: "Of course, you know, this means war.", speaker_id: 1 },
        { id: 3, title: "Getting the most from the Acme catalog.", speaker_id: 2 },
        { id: 4, title: "Shaaaad up!", speaker_id: 3 },
        { id: 5, title: "Ah hates rabbits.", speaker_id: 3 },
        { id: 6, title: "The Great horni-todes", speaker_id: 3 }
    ];
}
```

---

# [fit] Server Simulation

```javascript
export default function fixtureServer(speakers, presentations) {
    return new Pretender(function () {
        this.get('/api/speakers', function (request) {
            return [200, {"Content-Type": "application/json"}, JSON.stringify({speakers: speakers, presentations: presentations})];
        });

        this.get('/api/speakers/:id', function (request) {
            // Do stuff
            return [200, {"Content-Type": "application/json"}, JSON.stringify({speaker: speaker, presentations: speakerPresentations})];
        });

        this.delete('/api/speakers/:id', function(request) {
            // Do stuff
            return [200, {"Content-Type": 'application/json'}, '{}'];
        });

        this.get('/api/presentations', function (request) {
            return [200, {"Content-Type": "application/json"}, JSON.stringify({speakers: speakers, presentations: presentations})];
        });

        this.get('/api/presentations/:id', function (request) {
            // Do stuff
            return [200, {"Content-Type": "application/json"}, JSON.stringify({speaker: presentationSpeaker, presentation: presentation})];
        });
    });
}
```

---

# [fit] Add a
# [fit] Test

---

![150%](/var/folders/sw/m892_x_95psc17blld4pn8sh0000gp/T/DMDFC54C669-122E-48E6-B68B-847A1D850DD9/Bostonember.png)

---

![150%](/var/folders/sw/m892_x_95psc17blld4pn8sh0000gp/T/DMDAA37F6F4-58BE-4B15-8458-3354A8F5F70D/Bostonember.png)

---

# [fit] Set up the test

```javascript
test('Should go to speaker\'s show page after submitting presentation edit', function() {
    expect(0);
});
```

---

# [fit] Set up the stimulus

```javascript
test('Should go to speaker\'s show page after submitting presentation edit', function() {
    expect(0);
    visit('/presentations/4/edit');
    var changed_text = 'Be Quiet!';
    fillIn('input.presentation-title', changed_text);
    click('button.commit-presentation-change');
    andThen(function() {
        // Gonna put assertions here.
    });
});
```

---

# [fit] Verify Response

```javascript
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
```



