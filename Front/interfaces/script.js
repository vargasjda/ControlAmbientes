const username = document.getElementById('username');
const password = document.getElementById('password');
const button = document.getElementById('button');
const url = "http://localhost:8081/app/";
const novbloque = document.getElementById('novbloque')
const novambiente = document.getElementById('novambiente')
const novprograma = document.getElementById('novprograma')
const novnovedad = document.getElementById('novnovedad')

const objeto = document.getElementById('objeto')
const cantidad = document.getElementById('cantidad')
const datos = document.getElementById('datos')
const descripcion = document.getElementById('descripcion')
//const bloque = document.getElementById('bloque')
//const ambiente = document.getElementById('ambiente')

// crear usuarios 
$( "#formCreateUser" ).submit(function( event ) {
    event.preventDefault();
    var inputs = $('#formCreateUser :input');
    var values = {};
    inputs.each(function() {
        if(this.name != "") values[this.name] = $(this).val();
    });
    values.branchId = "1";
    
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


$( "#formCretenovedad" ).submit(function( event ) {
  event.preventDefault();
   
 var novedad = {

    "bloque": novbloque.value , 
    "ambiente": novambiente.value,
    "programa": novprograma.value,
    "novedad": novnovedad.value
    
  }
  const url = "http://localhost:8081/app/novedades";
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novedad)
  })
    .then(response => response.json())
    .then(data => console.log("novedad creada : ", data))
    .catch(error => console.error(error));
});


$( "#formCreateinventario" ).submit(function( event ) {
  event.preventDefault();
  alert("sumit en el formulario"); 
 var novedad = {
    
    "objeto": objeto.value , 
    "cantidad": cantidad.value,
    "datos": datos.value,
    "descripcion": descripcion.value

  }
  const url = "http://localhost:8081/app/inventarios";
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novedad)
  })
    .then(response => response.json())
    .then(data => console.log("inventario creada : ", data))
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
            sessionStorage.setItem("rol", data.user.rol);
            location.href = "http://127.0.0.1:5501/ControlAmbientes/Front/interfaces/home.html";
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
      console.log(sessionStorage.getItem("rol"));
      $("#user").text(user);
  }
  else{
      sessionStorage.clear();
      location.href = "http://127.0.0.1:5501/ControlAmbientes/Front/interfaces/login.html";
  }
}

function closeSession(){
  sessionStorage.clear();
  location.href = "http://127.0.0.1:5501/ControlAmbientes/Front/interfaces/login.html";
}

function getSession(){
  fetch(url + "users", {
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
