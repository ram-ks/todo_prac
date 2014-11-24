var app = app || {};

app.itemView = Backbone.View.extend({
    tagName: 'li',
    todotmpl: _.template($('#todo-template').html()),
    events:{
    	"click #destroy": "removeModel",
    	"click #todo-complete": "check"
    },
    initialize: function(){        
    	this.listenTo(this.model,'change',this.render);
        this.listenTo(this.model,'destroy',this.remove);
    },
    render: function(){        
        this.$el.html(this.todotmpl(this.model.toJSON()));
        return this;
    },
    attrChanged: function(){
		var val = (this.model.changed.completed === true) ? this : "";
		if(val){
			$clone = this.$el.clone();
			this.$el.remove();
			$("#completed-list").append($clone);
		}
	},
    removeModel:function(){
    	this.model.destroy();
    },
    check: function(){
    	this.model.toggle();
    }
});