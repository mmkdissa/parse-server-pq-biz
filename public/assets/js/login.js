function Login(){
	
}

Login.init = function() {
	$("#signUpDiv").hide();
	$("#newSignUp").click(function() {		    
			console.log("clicked");
			$("#loginDiv").hide();
			$("#signUpDiv").show();
	});
	$("#newLogin").click(function() {				
			$("#signUpDiv").hide();
			$("#loginDiv").show();
	});

	$('#signInButton').click(Login.clickSignInButton);
    $('#signUpButton').click(Login.clickSignUpButton);
    $('#forgotPasswordLink').click(Login.clickForgotPasswordLink);

	//initialize parse
	Parse.initialize(Config.PARSE_APP_ID);
    Parse.serverURL = Config.PARSE_SERVER_URL;
	
	$('#signInForm').validator();
	$('#signUpForm').validator();
	
	$("#loader").css("display","none");
	$("#signUpLoader").css("display","none");
	
  $("#signUpMessage").css("color", "red");
  $("#signInMessage").css("color", "red");
	
}

Login.clickSignUpButton = function(){
	var email = $("#signUpEmail").val();
	var phone = $("#signUpPhone").val();
	var password = $("#signUpPassword").val();

    var user = new Parse.User();
    user.set("username", email);
    user.set("password", password);
    user.set("email", email);

    // other fields can be set just like with Parse.Object
    user.set("phone", phone);
	$("#signUpLoader").css("display","block");

    user.signUp(null, {
        success: function(user) {
    
        console.log("user successfully signed Up" + user.id); 
        $("#signUpMessage").css("color", "green");
		    $("#signUpMessage").text("Your account has been created. Please check your inbox and confirm the email address");
		$("#signUpLoader").css("display","none");
       
       
       },
       error: function(user, error) {
       $("#signUpLoader").css("display","none");
        $("#signUpMessage").css("color", "red");
       console.log("Error: " + error.code + " " + error.message);
       $("#signUpMessage").text(error.message);
       
       }
    });
}

Login.signIn = function() {
	window.location.href = "../User/Login";
}

Login.clickSignInButton = function(){    
    var email = $("#signInEmail").val();
	var password = $("#signInPassword").val();
	$("#loader").css("display","block");
    Parse.User.logIn(email, password, {
      success: function(user) {
		 $("#loader").css("display","none");
         console.log(JSON.stringify(user))
         if(user.emailVerified == true){
           window.location.href = "/dashboard";
         }else{
           $("#signInMessage").text("Please confirm your email before proceed.");
         }
         
		 
      },
      error: function(user, error) {
		$("#loader").css("display","none");
         console.log("Error: " + error.code + " " + error.message);
         if(error.code == 200){
            $("#signInMessage").text("Email is required.");  
         }else{
		$("#signInMessage").text(error.message);
         }
		           

      }
    });
	
	
}

Login.clickForgotPasswordLink = function(){    
    var email = $("#signUpEmail").val();
	Parse.User.requestPasswordReset(email, {
       success: function() {
        alert("success");
       },
        error: function(error) {
    // Show the error message somewhere
        alert("Error: " + error.code + " " + error.message);
       }
   });
	
	
}


