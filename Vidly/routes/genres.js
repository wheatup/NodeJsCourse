const express = require('express');
const router = express.Router();

const genres = [
   {id: 1, name: 'Action'},
   {id: 2, name: 'Horror'},
   {id: 3, name: 'Scifi'},
   {id: 4, name: 'Romance'}
];


router.get('/', (req, res) => {
   res.send(genres);
});

router.get('/:id', (req, res) => {
   let genre = getGenre(req.params.id);
   if(!genre){
      res.status(404).send('Can\'t find the requested genre!');
      return;
   }else{
      res.send(genre);
   }
});

router.post('/', (req, res) => {
   let {error} = validateGenre(req.body);
   if(error){
      res.status(400).send(error.details[0].message);
      return;
   }

   const genre = {
      id: genres.length + 1,
      name: req.body.name
   };

   genres.push(genre);
   res.send(genre);
});

router.put('/:id', (req, res) => {
   let genre = getGenre(req.params.id);
   if(!genre){
      res.status(404).send('Can\'t find the requested genre!');
      return;
   }

   let {error} = validateGenre(req.body);
   if(error){
      res.status(400).send(error.details[0].message);
      return;
   }

   genre.name = req.body.name;
   res.send(genre);
});

router.delete('/:id', (req, res) => {
   let genre = getGenre(req.params.id);
   if(!genre){
      res.status(404).send('Can\'t find the requested genre!');
      return;
   }

   let index = genres.indexOf(genre);
   genres.splice(index, 1);

   res.send(genre);
});

const getGenre = (id) => {
   return genres.find(c => c.id === parseInt(id));
};

const validateGenre = (genre) => {
   return Joi.validate(genre, {name: Joi.string().min(3).required()});
};

module.exports = router;
