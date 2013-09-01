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
