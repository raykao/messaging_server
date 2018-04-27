const socketServer = require('socket.io')(3000);

socketServer.set('origins', 'http://localhost:8080');

socketServer.use(function(socket, next){
  // const userId = JSON.parse(atob(socket.request.headers.token));
  console.log(socket.request.headers.token);
  next();
});

socketServer.on('connection', function(session){
  console.log('connected');

  session.on('chat message', function(data){
    console.log(data.message);
    socketServer.emit('chat message', data.message);
  });  
});

function atob(base64encodedString){
  return Buffer.from(base64encodedString, 'base64').toString();
}

function decodedJWT(jwt) {

}