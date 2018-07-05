const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises').then(()=>{
   console.log('Connected to MongoDB');
}).catch((err)=>{
   console.error('Can\'t connect to MongoDB', err);
});

var courseSchema = new mongoose.Schema({
   tags: [String],
   date: {type: Date, default: Date.now},
   name: String,
   author: String,
   isPublished: Boolean,
   price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses(){
   var courses = await Course
      .find({isPublished: true, tags: 'backend'})
      .sort({name: 1})
      .select({name: 1, author: 1});
   return courses;
};

async function updateCourse(id){
   const course = await Course.findById(id);
   if(!course){
      return 'can\'t find course!';
   }
   course.isPublished = true;
   course.author = 'Someone else';

   // course.set({
   //    isPublished: true,
   //    author: 'Someone else'
   // });

   const result = await course.save();
};

async function run(){
   const result = await updateCourse('5a68fdd7bee8ea64649c2777');
   console.log(result);
}

run();
