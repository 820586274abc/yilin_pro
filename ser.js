const express = require('express');
const app = express();
const mysql = require('mysql');
//配置好session
const session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
//这里是数据库连接
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'node10'
})
//bodyparser获取post数据
var bodyParser = require('body-parser')
app.use('/node_modules',express.static('./node_modules'));
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine','ejs');
app.set('views','./public')

app.get('/',(req,res)=>{
    res.render('index',{user:req.session.user,islogin:req.session.islogin});
})

app.get('/login',(req,res)=>{
    res.render('./user/login.ejs',{})
})

app.post('/login',(req,res)=>{
    conn.query('select *from blog_users where username=? and password=?',[req.body.username,req.body.password],(err,result)=>{
        if(err) return res.send(err.message);
        if(result.length==0){return res.send('用户名或密码不匹配')};
        if(result.length!==1){return res.send('登陆失败')}
        req.session.user = result[0];
        req.session.islogin = true;
        res.send({status:200,data:result})
    })
})

app.listen(3000,()=>{
    console.log('开始了')
})