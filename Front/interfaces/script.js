const username = document.getElementById('username')
const password = document.getElementById('password')
const button = document.getElementById('button')


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