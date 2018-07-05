const mongoose = require('mongoose');

// 连接mongodb
mongoose.connect('mongodb://localhost/playground')
   .then(()=>{
      console.log('Connected to MongoDB');
   }).catch((err)=>{
      console.error('Can\'t connect to MongoDB', err);
   });

// 创建schema
const courseSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 255
//      match: /pattern/
   },
   category: {
      type: String,
      required: true,
      enum: ['web', 'mobile', 'network']
   },
   author: String,
   // tags: [String],
   tags:{
      type: Array,
      validate: {
         // 异步验证
         isAsync: true,
         validator: function(v, cb){
            setTimeout(()=>{
               // 异步调用
               const result = v && v.length > 0;
               cb(result);
            }, 1000);
         },

         // // 同步验证
         // validator: function(v){
         //    return v && v.length > 0;
         // },
         message: 'A course should have at least one tag.'
      }
   },
   date: {type: Date, default: Date.now },
   isPublished: Boolean,
   price: {
      type: Number,
      required: function(){
         return this.isPublished;
      },
      min: 0,
      max: 65535
   }
});

// 创建model
const Course = mongoose.model('Course', courseSchema);

// CREATE
async function createCourse(name, author, category, tags, isPublished, price){
   var result;
   const course = new Course({
      name: name,
      category: category,
      author: author,
      tags: tags,
      isPublished: isPublished,
      price: price
   });

   try{
      result = await course.save();
   }catch(ex){
      for(field in ex.errors){
         console.error(ex.errors[field].message);
      }
   }
   return result;
}

// READ
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

// UPDATE
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
   return result;
};

// UPDATE
async function updateCourseDirectly(id){
   const result = await Course.update({_id: id}, {
      $set: {
         author: 'Mosh',
         isPublished: false
      }
   });
   // const course = await Course.findByIdAndUpdate(id, {
   //    $set: {
   //       author: 'Mosh',
   //       isPublished: false
   //    }
   // }, {new: true});
   return result;
};

// DELETE
async function removeCourse(id){
   const result = await Course.deleteOne({_id: id});
   return result;
};

async function run(){
   //const courses = await getCourses();
   // const result = await updateCourseDirectly('5b39bffa233171384c519da9');
   // const result = await removeCourse('5b39bffa233171384c519da9');
   const result = await createCourse('How to Basic', 'Hao Wu', '?', null, true, 0)
   console.log(result);


}

run();
