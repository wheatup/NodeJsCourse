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
// Debug
const debug = require('debug')('app:startup');

// 路由
const courses = require('./routes/courses');
const genres = require('./routes/genres');
const home = require('./routes/home');

// 自定义中间件
const logger = require('./middleware/logger');

// 创建app
const app = express();

// 获取环境变量的两种方式
//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);

// 模板组件
app.set('view engine', 'pug');
app.set('views', './views');

// 中间件(middleware)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/api/genres', genres);
app.use('/', home);

// 应用配置
console.log('Application name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));

if(app.get('env') === 'development'){
   app.use(morgan('tiny'));
   debug('Morgan enabled.');
}

// app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}...`));
