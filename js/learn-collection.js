$(function(){
	var song = Backbone.Model.extend({
		defaults:{
			artist: "Palash Sen",
			song: "Maeri"
		},
		initialize: function(){
			console.log("Song is the answer");
		}
	});	

	var Album = Backbone.Collection.extend({
		model: song
	});

	var song1 = new song({artist: "Ajay-Atul",song:"Changbhala"});
	var song2 = new song({artist: "Goldspot",song:"Friday"});
	var song3 = new song({artist: "K'Naan",song:"Wavin Flag"});

	var new_album = new Album([song1,song2,song3]);
	// console.log(new_album.models);
});