var express = require('express');
var router = express.Router();
// var Document = require('Document')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

/* POST add new doc to database */

router.post('/', function(req, res){
  // var db = req.db
  var Document = req.Document
  // console.log(db)
  // var collection = db.get('doccollection') 
  // console.log(req.body)
  var doc = new Document({title: req.body.title, content: ''});
  doc.save();
  // console.log(doc.id)
  res.redirect('/show/'+doc.title)
});

router.get('/show/:id', function(req, res) {
  res.render('show',  {title: req.params.id});
});

module.exports = router;