var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usernames = [];


//mongoose/mongodb  **NEED THIS IN ORDER FOR TEXT TO APPEAR ON PAGE OPEN**
var mongoose = require('mongoose')

// connect to mongoose
mongoose.connect('mongodb://localhost/gtools', function(error){
  if(error){
    console.log(error)
  } else {
    console.log("succcess")
  }
});

//set schema

var docSchema = mongoose.Schema({
  title: String,
  content: String,
  created: {type: Date, default: Date.now}
});

var Document = mongoose.model('Document', docSchema);


// Add in routes to create new documents
// On creation, create new Document with the title provided

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.get('/show', function(req, res){
  res.sendFile(__dirname + '/show.html');
})

io.on('connection', function(socket){
  //find by document name once route is set
  Document.find({}, function(error, docs){
    socket.emit('load current content', docs)
  });
  socket.on('disconnect', function(){
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

  socket.on('content', function(text){
    // change to Document.update({ title: doctitle }, {content: text})
    var docUpdate = new Document({content: text});
    docUpdate.save(function(error){
      if(error) throw error;
      io.emit('content', text);
    })
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});



// GRAVEYARD
  // socket.on('chat message', function(msg){
  //   io.emit('chat message', msg);
  // });
  // io.emit('connection message', 'New user has entered.');