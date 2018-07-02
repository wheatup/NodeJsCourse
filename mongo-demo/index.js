const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
   .then(()=>{
      console.log('Connected to MongoDB');
   }).catch((err)=>{
      console.error('Can\'t connect to MongoDB', err);
   });

const courseSchema = new mongoose.Schema({
   name: String,
   author: String,
   tags: [String],
   date: {type: Date, default: Date.now },
   isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
   const course = new Course({
      name: 'Angular Course',
      author: 'Mosh',
      tags: ['angular', 'frontend'],
      isPublished: true
   });

   const result = await course.save();
   console.log(result);
}

async function getCourses(){
   // 比较符：
   // eq (equal to)                       ->等于
   // ne (not equal to)                   ->不等于
   // gt (greater than)                   ->大于
   // gte (greater than or equal to)      ->大于等于
   // lt (less than)                      ->小于
   // lte (less than or equal to)         ->小于等于
   // in                                  ->在...内
   // nin                                 ->不在...内
   //
   // 逻辑运算符
   // or                                  ->或
   // and                                 ->与


   // /api/courses?pageNumber=2&pageSize=10
   const pageNumber = 2;
   const pageSize = 10;


   const courses = await Course
      // 查找price >= 10 AND price <= 20
      //.find({ price: { $gte: 10, $lte: 20} })

      // 查找price IN [10, 50, 20]
      //.find({ price: {$in: [10, 50, 20]} })

      // 查找author = 'Mosh' OR/AND isPublished = true
      // .find()
      // .or([{author: 'Mosh'}, {isPublished: true}])
      // .and([{author: 'Mosh'}, {isPublished: true}])

      // 正则表达式
      //.find({author: /^Mosh/i})

      // 查找author = 'Mosh' AND isPublished = true
      .find({ author: 'Mosh', isPublished: true})
      // 分页
      .skip((pageNumber - 1) * pageSize)
      // 结果限制为10个以内
      .limit(pageSize)
      // 按名称排序（升序，降序为-1）
      .sort({name: 1})
      // 查找个数
      // .count();
      // 只导出所给的属性
      .select({name: 1, tags: 1});
   return courses;
}

async function run(){
   const courses = await getCourses();
   console.log(courses);
}

run();
