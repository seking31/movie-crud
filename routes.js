const express = require('express');
const router = express.Router();
const low = require('lowdb');
const fileAsync = require('lowdb/lib/storages/file-async');
const db = low('db.json', {
  storage: fileAsync
});

function getNextId(){
  var counter = db.get('idCounter').value() || 4;
  db.set('idCounter', ++counter).write();
  return "" + counter;
}

router.get('/', (req, res) => {
  console.log('get');
    const movies = db.get('movies');
    res.send(movies);
});


router.get('/:id', (req, res) => {
    const movieID = req.params.id
    const singleMovie = db.get('movies').find({id:movieID});
    res.send(singleMovie);
});

///movies/:id the ':' denotes the parameter 'id'

router.post('/', (req, res) => {

   var body = req.body;
   body.id = getNextId();
   console.log(body);
   db.get('movies')
   .push(body)
   .write()
   .then(newMovie => {
     res.status(201)
     .send(newMovie);
   })
  .catch(err => {
    console.log('error');
  })
});

router.put('/:id', function (req, res) {
  const id = req.params.id;
  db.get('movies')
    .find({id: id})
    .assign(req.body)
    .write()
    .then(update => {
      res.send(update);
    }).catch(err => {
      console.log(err);
    });
});

router.delete('/:id', function (req, res) {
  const id = req.params.id;

  db.get('movies')
    .remove({id: id})
    .write()
    .then(deleted => {
      res.status(204).send();
    }).catch(err => {
      console.log(err);
    });
});


module.exports = router;
