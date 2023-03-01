const username = document.getElementById('username')
const password = document.getElementById('password')
const button = document.getElementById('button')

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
    delete values.email;
    const url = "http://localhost:8081/app/users";
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
        .then(response => response.json())
        .then(data => console.log("usuario creado: ", data))
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
