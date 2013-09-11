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
		next.setMinutes(30);
		next.setSeconds(0);
		if(next - (new Date()) >= 3600*24*7*1000) {
			next -= 3600*24*7*1000;
			next = new Date(next);
		}
		return next;
	};
};
