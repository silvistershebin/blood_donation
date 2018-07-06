document.addEventListener('DOMContentLoaded', function() {
var elems = document.querySelectorAll('.sidenav');
var instances = M.Sidenav.init(elems, options);
});
$(".button-collapse").sideNav();
$(document).ready(function(){
$('.sidenav').sidenav();
});

firebase.auth()onAuthStateChanged(function(user)
{
  if(user){
    document.getElementById('logout').style.display = 'block';
    document.getElementById('login').style.display = 'none';

    var user = firebase.auth().currentUser;

    if(user !=null)
    {
      var email_id = user.email;
      var email_verified = user.emailVerified;
      document.getElementById('welcome_user').innerHTML = "Welcome User :" + email_id + "<br/>Verified :" + email_verified;
      if(email_verified)
      {
        document.getElementById('verify_btn').style.display = "none";
      }
      else{
              document.getElementById('verify_btn').style.display = "block";
      }
    }
  }
  else{
    document.getElementById('logout').style.display = 'none';
    document.getElementById('login').style.display = 'block';
  }
});

function login()
{

  var useremail = document.getElementById("mail").value;
  var userpassword = document.getElementById("pswd").value;


firebase.auth().signInWithEmailAndPassword(mail, pswd).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  window.alert('Error:' + errorMessage);
});
}
function logout()
{
  firebase.auth().signOut();

}
function create_donor()
{

  var useremail = document.getElementById("email").value;
  var userpassword = document.getElementById("password").value;

  var firebaseref = firebase.database().ref();
  firebaseref.child(usermail).set(userpassword);

  firebase.auth().createUserWithEmailAndPassword(mail, pswd).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    window.alert('Error:' + errorMessage);
  });
}
function send_verification()
{
  var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  window.alert('Verification mail sent');
  // Email sent.
}).catch(function(error) {
  window.alert('Error: ' + error.message);
  // An error happened.
});
}
