var HeaderView = function() {

	this.render = function(data) {
		var template = $("#header-template").html();
		var compiledTemplate = _.template(template, data);
		$("#header").html(compiledTemplate);
	};

};
