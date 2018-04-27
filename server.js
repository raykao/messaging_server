const socketServer = require('socket.io')(3000);
var jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET || "secret";


socketServer.set('origins', 'http://localhost:8080');

socketServer.use(function(socket, next){
  jwt.verify(socket.request.headers.token, tokenSecret, (err, decodedToken) => {
    if(err) {
      next(new Error("Unauthorized"));
    } else {
      next();
    }
  });
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