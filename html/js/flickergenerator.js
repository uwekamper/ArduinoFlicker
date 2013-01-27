var app = app || {};

var applicationRoute;

app.Color = Backbone.Model.extend({
	defaults: {
		red:   255,
		green: 255,
		blue:  255
	}
});

var state = true;
var clock_state = true	;
var transmitted = 0;
var current_data_bit = 0;
var data_bits = [true, false, true, false, false, true, true, true, false, false, true];

var xor = function (a,b) {
	return ( a || b ) && !( a && b );
}

var displayBit = function(bit) {
	if(bit == true) {
		$("#flickerDisplay").css("background", "#ffffff");
	}
	else {
		$("#flickerDisplay").css("background", "#000000");
	}
}

var showOneCode = function() {
	$("#transmitted").text(transmitted);
	$("#current_data_bit").text(current_data_bit);
	
	
	var displayed_bit = xor(data_bits[current_data_bit], clock_state);
	
	displayBit(displayed_bit);
	
	$("#bithistory").append( displayed_bit.toString() + ', ');
	console.log(displayed_bit);
	
	transmitted++;	
	clock_state = !this.clock_state;
	
	if (transmitted % 2 == 0) {
		current_data_bit++;
	}
	
	if(current_data_bit >= this.data_bits.length) {
		current_data_bit = 0;
		$("#bithistory").empty();
	}
	
	
}


app.AppView = Backbone.View.extend({
	el: '#flicker-generator',
	
	colorPickerTemplate: Handlebars.compile( $("#colorpicker-template").html() ),
	colorDisplayTemplate: Handlebars.compile( $("#colordisplay-template").html() ),
	
	initialize: function(options) {
		this.model = options.model;
		_.bindAll(this, 'render');
	},
	
	events: {
		"change #inputRed": "changeInInputRed",
		"change #inputGreen": "changeInInputGreen",
		"change #inputBlue": "changeInInputBlue",
		"click #submitButton": "submitButtonClicked"
	},
	
	changeInInputRed: function() {
		this.model.set('red', parseInt($("#inputRed").val()));
		this.renderColorDisplay();
	},
	
	changeInInputGreen: function() {
		this.model.set('green', parseInt($("#inputGreen").val()));
		this.renderColorDisplay();
	},
	
	changeInInputBlue: function() {
		this.model.set('blue', parseInt($("#inputBlue").val()));
		this.renderColorDisplay();	
	},
	
	submitButtonClicked: function() {
		applicationRoute.navigate("#showFlicker", true);
	},
	
	render: function() {
		var context = {
			red: this.model.get('red'), 
			green: this.model.get('green'), 
			blue: this.model.get('blue')
		};
		
		var html = this.colorPickerTemplate(context);
		this.$el.html(html);
		
		this.renderColorDisplay();
	},
	
	renderColorDisplay: function() {
		var context = {
			red: this.model.get('red'), 
			green: this.model.get('green'), 
			blue: this.model.get('blue')
		};
		
		var html = this.colorDisplayTemplate(context);
		$("#colordisplay-container").html(html);
	}
	
});

app.FlickerView = Backbone.View.extend({
	el: '#flicker-generator',
	
	flickerDisplayTemplate: Handlebars.compile( $("#flickerdisplay-template").html() ),
	
	events: {
		"click #backButton": "backButtonClicked"
	},
	
	interval: {},
	
	initialize: function(options) {
		this.model = options.model;
		_.bindAll(this, 'render');
		this.startTransmitting();
	},
	
	render: function() {
		var html = this.flickerDisplayTemplate({})
		this.$el.html(html);	
	},
	
	backButtonClicked: function() {
		this.startTransmitting();
		applicationRoute.navigate("#kickOff", true);
	},
	
	startTransmitting: function() {
		this.interval = window.setInterval(showOneCode, 1000);
	},
	
	stopTransmitting: function() {
		window.clearInterval(this.interval);
	}
	
	
});

app.AppRouter = Backbone.Router.extend({
	routes: {
		"": "kickOff",
		"kickOff": "kickOff",
		"showFlicker": "showFlicker"
	},
	
	initialize: function() {
		this.model = new app.Color();
	},
	
	kickOff: function() {
		// Kick things off by creating the **App**.
		console.log(this.model);
		var appView = new app.AppView({model: this.model});
		appView.render();
	},
	
	showFlicker: function() {
		var appView = new app.FlickerView({model: this.model});
		appView.render();
	}
});



$(document).ready(function() {
	applicationRoute = new app.AppRouter();
	
	Backbone.history.start();
});