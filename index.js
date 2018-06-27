const express = require('express');
const app = express();

var courses = [
   {id: 1, name: 'Basic'},
   {id: 2, name: 'Intermediate'},
   {id: 3, name: 'Advanced'}
];

app.get('/', (req, res)=>{
   res.send('Hello express world!');
});

app.get('/api/courses', (req, res)=>{
   res.send(courses);
});

app.get('/api/courses/:id', (req, res)=>{
   let course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course){
      res.status(404).send('Can\'t find the requested course!');
   }else{
      res.send(course);
   }
});

// app.get('/api/posts/:year/:month', (req, res)=>{
//    res.write(JSON.stringify(req.params));
//    res.write(JSON.stringify(req.query));
//    res.end();
// });

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}...`));
