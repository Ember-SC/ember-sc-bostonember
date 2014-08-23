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
}