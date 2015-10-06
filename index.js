var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usernames = [];


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  io.emit('connection message', 'New user has entered.');

  socket.on('disconnect', function(){
    io.emit('connection message', 'User has exited.');
    if(!socket.username) return;
    usernames.splice(usernames.indexOf(socket.username), 1)
    updateUsernames()
  })

  function updateUsernames(){
    io.emit('usernames', usernames)
  }
  socket.on('new user', function(data, callback){
    if(usernames.indexOf(data) != -1){
      callback(false);
    } else{
      callback(true);
      socket.username = data;
      usernames.push(socket.username);
      updateUsernames();
    }
  });
  // socket.on('chat message', function(msg){
  //   io.emit('chat message', msg);
  // });

  socket.on('content', function(text){

    io.emit('content', text);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});