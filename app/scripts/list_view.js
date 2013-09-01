var ListView = function() {

	this.render = function(data) {
		var template = $("#list-template").html();
		var compiledTemplate = _.template(template, data);
		$("#list").html(compiledTemplate);
	};

};
