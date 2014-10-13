export default DS.Model.extend({
  title: DS.attr('string'),
  speaker: DS.belongsTo('speaker', { async: true})
});
