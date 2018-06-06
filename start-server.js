/*
 * This express server just sends back the index.html page so we can use HTML5 history from the SPA client
 */

const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

// used for localhost
const httpsOptions = {
  key: fs.readFileSync(__dirname + '/localhost/key.pem'),
  cert: fs.readFileSync(__dirname + '/localhost/cert.pem')
}

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + '/public'));
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

const server = https.createServer(httpsOptions, app).listen(port, () => {
  console.log('Server is ready at:');
  console.log('---------------------');
  console.log('https://localhost:' + port);
  console.log('---------------------\n');
  console.log('After an edit/save of a source file, please refresh your browser:\n');
});
