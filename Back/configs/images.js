// Acá Pega el Cliente ID y el API Key que creaste 
var CLIENT_ID = '936738113479-8mosbus9mm2uts6d2cr02h2e1u4aaa7j.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDd53-T0-avNDxos9u7KXln-gxAYUQ-beg';

// Cargamos el servicio Rest API de Google 
var DISCOVERY_DOCS = ["https://drive.google.com/drive/my-drive"];

// El servicio de Autenticación con una cuenta de Google 
var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}


function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        listFiles();
    }
}


function appendPre(message) {
    var pre = document.getElementById('root');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

// Acá listamos los archivos de nuestra cuenta de Google Drive, especificamos que datos de los archivos queremos mostrar 
function listFiles() {
    gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': "nextPageToken, files(id, name, mimeType, createdTime, size)"
    }).then(function(response) {

        var files = response.result.files;

    });
}


module.exports = {
    initClient
}