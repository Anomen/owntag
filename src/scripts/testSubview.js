define(function(){
	return Backbone.Marionette.ItemView.extend({
		template: _.template('<h1>SubView</h1>'),
		onRender: function(){
			console.log('subview rendered');
		},
		onClose: function(){
			console.log('subview closed');
		}
	});
});