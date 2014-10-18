import Pretender from 'pretender';

export default function fixtureServer(speakers, presentations) {
    return new Pretender(function () {
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
              if (speaker.id === parseInt(deletedSpeakerId, 10)) {
                  return speaker;
              }
          });

          var lessSpeakerPresentations = presentations.filter(function(presentation) {
              return (presentation.speaker_id === deletedSpeakerId);
          });
          console.log("deleted presentation count should be 2; is " + lessSpeakerPresentations.length);
          for (var i = lessSpeakerPresentations.length - 1 ; i >= 0 ; i--) {
            var presentation = lessSpeakerPresentations.objectAt(i);
            var mainOffset = presentations.indexOf(presentation);
            presentations.splice(mainOffset, 1);
          }

          console.log("remaining presentation count should be 4; is " + presentations.length);

          var deletedSpeakerOffset = speakers.indexOf(deletedSpeaker);
          speakers.splice(deletedSpeakerOffset, 1);
          return [200, {"Content-Type": 'application/json'}, '{}'];
        });

        this.get('/api/presentations', function (request) {
          console.log("Presentations count in fixture is " + presentations.length);
          return [200, {"Content-Type": "application/json"}, JSON.stringify({speakers: speakers, presentations: presentations})];
        });

        this.get('/api/presentations/:id', function (request) {
            var presentation = presentations.find(function (presentation) {
                if (presentation.id === parseInt(request.params.id, 10)) {
                    return presentation;
                }
            });

            var presentationSpeaker = speakers.find(function (speaker) {
                if (speaker.presentation_ids.contains(presentation.id)) {
                    return speaker;
                }
            });

            return [200, {"Content-Type": "application/json"}, JSON.stringify({speaker: presentationSpeaker, presentation: presentation})];
        });
    });
}
