var app = app || {};

app.todoCollection = Backbone.Collection.extend({
	model: app.todo,
	localStorage: new Backbone.LocalStorage("todos-backbone"),
	initialize: function(){
		
	},
	filterCompleted: function(){
		return this.filter(function(todo){
			return todo.get('completed') === true;
		});
	},
	filterRemaining: function(){
		return this.without.apply(this, this.filterCompleted());
		// without internally calls slice and unshift which expects variable list of arguments
		// apply is used for that reason and also for setting context of a method
		// proxy to an underscore method  _.without
		// i think _. is used like this _.object(_.map but when in collection or view we can use them like this this.map
	},
	sortInSequence: function(){

	},
	sortAsInsertion: function(){

	}
});
app.todos = new app.todoCollection();