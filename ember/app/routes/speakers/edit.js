export default Ember.Route.extend({

    actions: {
        submit: function() {
            var my_model = this.controller.get('model');
            console.log('***** my_model ' + my_model.get('name'));
            my_model.save();
//            var my_speaker = this.model;
//            console.log('***** my_speaker: "' + my_speaker + '"');
//            var name = this.controller.get('name');
//            my_speaker.set('name', name);
//            my_speaker.save();
//            console.log('***** Claimed to have saved value "' + name + '"');
        }
    }
});
