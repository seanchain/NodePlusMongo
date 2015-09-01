$(function() {

	window.addEventListener('keydown', function(event) {
		if (event.keyCode == 13) $("#submit").click();
	});


	$("#submit").click(function() {
		var userid = $("#userid").val();
		var email = $("#email").val();
		var passwd = $("#passwd").val();
		console.log(userid + "---" + email + "---" + passwd);
		if (userid == '123') {
			console.log("got it");
			$.post('/checkValidation', {
				userid: userid
			}, function(res) {
				if (res == "success") window.location.href = "/";
				else alert("wrong!");
			});
		}
	});
});
