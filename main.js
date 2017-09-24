
// Setup constants
const API = 'http://api.cchange.ga/';

// Run functions on document.ready
$(document).ready(function () {
	setupInviteUser();
});

var setupInviteUser = function () {
	$("#inviteUser").on('submit', function (event) {

		// Prevent default action
		event.preventDefault();

		// Get variables
		var form = $(this);
		var email = $(form.find("#email")).val();
		var password = $(form.find("#password")).val();

		// Setup request
		var data = {
			'email': email,
			'adminPassword': password,
		};

		// Make request
		makeRequest(this, 'charityToken.create', data);
	});
};

var makeRequest = function (formElement, address, data) {

	// Initialize elements
	var form = $(formElement);
	var submit = form.find('#submit');
	var message = form.find('#message');

	// Get old button text
	var oldSubmitValue = submit.val();

	// Set loading text
	const loading = 'Loading...';
	if (submit.val() == loading) return;
	submit.val(loading);

	// Setup AJAX Request
	var request = {
		type: "POST",
		url: API + address,
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: "json",

		// Success functionality
		success: function (data, status) {
			submit.val(oldSubmitValue);
			message.html(data.message);
			form.trigger("reset");
		},

		// Error functionality
		error: function (xhr, status, error) {
			var data = JSON.parse(xhr.responseText);
			submit.val(oldSubmitValue);
			message.html(data.message);
			form.trigger("reset");
		},
	};

	// Make AJAX Request
	$.ajax(request);
};

