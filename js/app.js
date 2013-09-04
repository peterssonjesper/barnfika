var PERSON_LIST = [
	"Fanny",
	"Björn",
	"Emil",
	"Per",
	"Martin",
	"Erik",
	"Malin",
	"Ali",
	"Nina",
	"Matilda",
	"Jesper",
	"Petter",
	"Fredrik"
];

var INIT_DATE = new Date("2 jan 2013 14:00");
var MISSED_OCCATIONS = 2;

var Person = function() {
	this.name = "";
	this.order = 0;
	
	this.active = function() {
		var now = new Date();
		weeksAgo = Math.floor((now - INIT_DATE)/3600/24/1000/7);
		weeksAgo -= MISSED_OCCATIONS;
		return weeksAgo % PERSON_LIST.length === this.order;
	};
};

var ListView = function() {

	this.render = function(data) {
		var template = $("#list-template");
		var compiledTemplate = $.jqote(template, data);
		$("#list").html(compiledTemplate);
	};

};

var HeaderView = function() {

	this.render = function(data) {
		var template = $("#header-template");
		var compiledTemplate = $.jqote(template, data);
		$("#header").html(compiledTemplate);
	};

};

var DateHelper = function() {

	this.getDaysLeft = function() {
		var now = new Date();
		return Math.floor((this.getNextDate()-now) / 24 / 3600 / 1000);
	};

	this.getHoursLeft = function() {
		var now = new Date();
		return Math.floor((this.getNextDate() - now - this.getDaysLeft()*1000*24*3600) / 1000 / 3600);
	};

	this.getMinutesLeft = function() {
		var now = new Date();
		return Math.floor((this.getNextDate() - now - this.getDaysLeft()*1000*24*3600 - this.getHoursLeft()*1000*3600) / 1000 / 60);
	};

	this.getSecondsLeft = function() {
		var now = new Date();
		return Math.floor((this.getNextDate() - now - this.getDaysLeft()*1000*24*3600 - this.getHoursLeft()*1000*3600 - this.getMinutesLeft()*1000 * 60) / 1000);
	};

	this.getNextDate = function() {
		var next = new Date().next().wednesday();
		next.setHours(15);
		next.setMinutes(0);
		next.setSeconds(0);
		if(next - (new Date()) >= 3600*24*7*1000) {
			next -= 3600*24*7*1000;
			next = new Date(next);
		}
		return next;
	};
};

var App = function() {

	var listView = new ListView();
	var headerView = new HeaderView();
	var dateHelper = new DateHelper();

	this.init = function() {
		var self = this;
		setInterval(function() {
			self.renderViews();
		}, 1000);

		this.renderViews();
	};

	this.renderViews = function() {
		listView.render({
			persons: this.getPersons()
		});

		headerView.render({
			daysLeft: dateHelper.getDaysLeft(),
			hoursLeft: dateHelper.getHoursLeft(),
			minutesLeft: dateHelper.getMinutesLeft(),
			secondsLeft: dateHelper.getSecondsLeft()
		});
	};

	this.getPersons = function() {
		return PERSON_LIST.map(function(name, order) {
			var person = new Person();
			person.name = name;
			person.order = order;
			return person;
		});
	};

};

var app = new App();
app.init();
