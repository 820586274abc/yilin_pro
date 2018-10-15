const express = require('express');
const app = express();
const session = require('express-session');

const mysql = require('mysql');
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'node10'
})

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.get('/',(req,res)=>{
    conn.query('select *from blog_users where username=? and password=?',['ls','123'],(err,result)=>{
        console.log(result);//用户信息查询出来
        req.session.user = result[0];//用户信息放到session里面
        res.send('ok')
    })
})

app.get('/index',(req,res)=>{
    app.use('/node_modules',express.static('./node_modules'))
    app.set('view engine','ejs');
    app.set('views','./public');
    res.render('index',{user:req.session.user,islogin:true})
})

app.listen(4000,()=>{
    console.log('session is runing..')
})