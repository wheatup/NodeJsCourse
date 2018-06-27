// 验证数据
const Joi = require('joi');
// 框架
const express = require('express');
// HTTP header
const helmet = require('helmet');
// 记录请求
const morgan = require('morgan');
// 配置文件
const config = require('config');

//const logger = require('./logger');
const app = express();

// 获取环境变量的两种方式
//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);

// 中间件(middleware)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());


// 应用配置
console.log('Application name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));

if(app.get('env') === 'development'){
   app.use(morgan('tiny'));
   console.log('Morgan enabled.');
}


// app.use(logger);

var courses = [
   {id: 1, name: 'Basic'},
   {id: 2, name: 'Intermediate'},
   {id: 3, name: 'Advanced'}
];

// 首页
app.get('/', (req, res) => {
   res.send('Hello express world!');
});

// 课程页面
app.get('/api/courses', (req, res) => {
   res.send(courses);
});

// 获取单个课程
app.get('/api/courses/:id', (req, res) => {
   let course = getCourse(req.params.id);
   if(!course){
      res.status(404).send('Can\'t find the requested course!');
      return;
   }else{
      res.send(course);
   }
});

// POST请求
app.post('/api/courses', (req, res) => {
   let {error} = validateCourse(req.body);
   if(error){
      res.status(400).send(error.details[0].message);
      return;
   }

   const course = {
      id: courses.length + 1,
      name: req.body.name
   };

   courses.push(course);
   res.send(course);
});

// 更新请求
app.put('/api/courses/:id', (req, res) => {
   let course = getCourse(req.params.id);
   if(!course){
      res.status(404).send('Can\'t find the requested course!');
      return;
   }

   let {error} = validateCourse(req.body);
   if(error){
      res.status(400).send(error.details[0].message);
      return;
   }

   course.name = req.body.name;
   res.send(course);
});

// 删除请求
app.delete('/api/courses/:id', (req, res) => {
   let course = getCourse(req.params.id);
   if(!course){
      res.status(404).send('Can\'t find the requested course!');
      return;
   }

   let index = courses.indexOf(course);
   courses.splice(index, 1);

   res.send(course);
});

// 获得Course
const getCourse = (id) => {
   return courses.find(c => c.id === parseInt(id));
};

// 验证参数
const validateCourse = (course) => {
   return Joi.validate(course, {name: Joi.string().min(3).required()});
};

// 多项参数 localhost:3000/api/posts/2018/6?sortBy=name
// app.get('/api/posts/:year/:month', (req, res)=>{
//    res.write(JSON.stringify(req.params));
//    res.write(JSON.stringify(req.query));
//    res.end();
// });

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}...`));
