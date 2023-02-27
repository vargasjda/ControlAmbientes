const username = document.getElementById('username');
const password = document.getElementById('password');
const button = document.getElementById('button');
const url = "http://localhost:8081/app/";


$( "#formCreateUser" ).submit(function( event ) {
    event.preventDefault();
    var inputs = $('#formCreateUser :input');
    var values = {};
    inputs.each(function() {
        if(this.name != "") values[this.name] = $(this).val();
    });
    values.branchId = "1";
    delete values.email;
    fetch(url + "users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
        .then(response => response.json())
        .then(data => {
          alert("Usuario Creado");
          console.log("Usuario Creado", data);
        })
        .catch(error => console.error(error));
});


$( "#formLogin" ).submit(function( event ) {
  event.preventDefault();
  var inputs = $('#formLogin :input');
  var values = {};
  inputs.each(function() {
      if(this.name != "") values[this.name] = $(this).val();
  });
  fetch(url + "login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => 
        {
          console.log(data)
          if(data.status){
            sessionStorage.setItem("name", data.user.userName);
            location.href = "http://localhost:8080/interfaces/home.html";
          }
          else{
            sessionStorage.setItem("name", null);
            alert("Error de autenticación!");
          }
        })
      .catch(error => console.error(error));
});

function validateSession(){
  let user = sessionStorage.getItem("name");
  if(user){
      console.log( "Welcome! " +  user);
      $("#user").text(user);
  }
  else{
      sessionStorage.clear();
      location.href = "http://localhost:8080/interfaces/login.html";
  }
}

function closeSession(){
  sessionStorage.clear();
  location.href = "http://localhost:8080/interfaces/login.html";
}

function getSession(){
  fetch(url + "getSession", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => 
      {
        console.log(data)
      })
    .catch(error => console.error(error));
}