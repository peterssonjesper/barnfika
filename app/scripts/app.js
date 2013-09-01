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
