$(function() {

  window.addEventListener('keydown', function (event) {
    if(event.keyCode == 13) {
      $("#submit").click();
    }
  });


  $("#submit").on('click', function () {
    var userid = $("#userid").val();
    var email = $("#email").val();
    var passwd = $("#passwd").val();
    alert(userid + "---" + email + "---" + passwd);
    $("#regform").submit();
  });
});
