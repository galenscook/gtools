var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

/* POST add new doc to database */

router.post('/', function(req, res){
  var Document = req.Document
  var doc = new Document({title: req.body.title, content: ''});
  doc.save();
  res.redirect('/show/'+doc.title)
});

router.get('/show/:id', function(req, res) {
  res.render('show',  {title: req.params.id});
});

module.exports = router;


  // console.log(doc.id)
  // console.log(db)
  // var collection = db.get('doccollection') 
  // console.log(req.body)
  // var db = req.db
// var Document = require('Document')