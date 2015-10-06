var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var usernames = [];
var routes = require('./routes/index');

//mongoose/mongodb  **NEED THIS IN ORDER FOR TEXT TO APPEAR ON PAGE OPEN**
var mongoose = require('mongoose')

// connect to mongoose
var db = mongoose.connect('mongodb://localhost/gtools', function(error){
  if(error){
    console.log(error)
  } else {
    console.log("succcess")
  }
});



// var db = monk('localhost:27017/gtools');
//set schema

var docSchema = mongoose.Schema({
  title: String,
  content: String,
  // users: Array,
  created: {type: Date, default: Date.now}
});

var Document = mongoose.model('Document', docSchema);


// Add in routes to create new documents
// On creation, create new Document with the title provided

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });


// app.get('/show', function(req, res){
//   res.sendFile(__dirname + '/show.html');
// })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req,res,next){
    req.db = db;
    req.Document = Document
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

io.on('connection', function(socket){
  //find by document name once route is set
  var docName = socket.handshake.query.name
  Document.findOne({title: docName}, function(error, doc){
    socket.emit('load current content', doc)
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
    var updatedDocName = socket.handshake.query.name
    // console.log(updatedDocName)
    Document.findOne({title: docName}, function(error, doc){
      doc.title = updatedDocName;
      doc.content = text;
      doc.save();
      // doc.update({content: text}, function(error){
      // if(error) throw error;
      io.emit('content', {text: text, title: updatedDocName});
    // })
    });
    // change to Document.update({ title: doctitle }, {content: text})
    // var docUpdate = new Document({content: text});
    // Document.update({title: updatedDocName}, {content: text}, function(error){
    //   if(error) throw error;
    //   io.emit('content', text);
    // })
    // docUpdate.save(function(error){
    //   if(error) throw error;
    //   io.emit('content', text);
    // })
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

module.exports = app;

// GRAVEYARD
  // socket.on('chat message', function(msg){
  //   io.emit('chat message', msg);
  // });
  // io.emit('connection message', 'New user has entered.');