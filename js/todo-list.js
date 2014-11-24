var app = app || {};

app.listView = Backbone.View.extend({
	el: '#todo-container',
	stats_tmpl: _.template($('#stats-template').html()),
	events:{
		"keypress #enter-todo": "createOnEnter",
		"click #clear-completed": "removeCompleted"
	},
	initialize: function(){
		this.$input = $("#enter-todo");
		this.$completed_list = $("#completed-list");
		this.allCheckbox = $('#toggle-all')[0];
		this.listenTo(app.todos,'add',this.addOne);
		this.listenTo(app.todos,'reset',this.addAll);
		this.listenTo(app.todos,'change:completed',this.render);
		this.listenTo(app.todos,'all',this.render);
		app.todos.fetch();
	},
	render: function(){
		var completed = app.todos.filterCompleted().length;
		var remaining = app.todos.filterRemaining().length;
		var remainCon = app.todos.filterRemaining();
		this.$completed_list.html(this.stats_tmpl({
			completed: completed,
			remaining: remaining
		}));
		this.allCheckbox.checked = !remaining;
	},
	createOnEnter: function(event){
		var keycode = (event.keycode ? event.keycode : event.which);

		if(keycode === 13){
			var input_val = this.$input.val();
			var todoModel = new app.todo({ title: input_val });
			app.todos.create(todoModel);
			this.$input.val("");
		}
	},
	removeCompleted: function(){
		var completed_todos = app.todos.filterCompleted();
		_.invoke(completed_todos,'destroy');
	},
	addOne: function(model){
		app.todoLi = new app.itemView({ model: model });
		$('#todo-list').append(app.todoLi.render().el);
	},
	addAll: function(){
		app.todos.each(this.addOne, this);
	}
});