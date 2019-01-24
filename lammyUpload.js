var express = require('express')
// post 请求方式会将参数放到请求体昂中
// 所以需要引入解析请求体的模块body-parser
 
var bodyParser = require('body-parser')
 
var web = express()
 
web.use(express.static('public'))
// 设置对url进行编码 并且不允许url 进行扩展
// 如果设置为false 那么参数只能为数组或者字符串
// 如果设置为True 那么参数为任意类型
web.use(bodyParser.urlencoded({limit:'50mb',extended:true}))
 
 
// 存储注册成功以后的账号密码
var account = ''
var psw = ''
 
web.get('/regist',function(req,res){
    var password = req.query.psw 
 
    var password2 = req.query.pswa;
 
    var user = req.query.user
 
    if(user != account && password == password2 )
    {   
        account = user
        psw = password
        res.send('恭喜注册成功！账号是' + user + ',密码是' + password + ',请妥善保管')
    }
    else {
        res.send('注册失败，账号已经注册或者密码不一致')
    }
 
    console.log(password)
    console.log(password2)
})
 
web.post('/login',function(req,res){
    var name = req.body.user ;
    var password = req.body.password ;
 
    console.log(name,password)
 
    if(name == account && password == psw)
    {
        res.send('登录成功')
    }
    else
    {
        res.send('登录失败')
    }
})
 
 
 
// 上传base64 方法接口
var a = 0;
web.use(express.json({limit: '50mb'}));
web.post('/uploadbase64', function(req, res){
	a = a + 1;
	
	//console.log("服务端接收到了数据啦");	
	
    //接收前台POST过来的base64
    var imgData = req.body.base64;
	
	//console.log("服务端接收到了数据啦",imgData);
	
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
	var timestamp = Date.parse(new Date());
    var dataBuffer =   Buffer.from(base64Data, 'base64');
	var name = timestamp.toString()+a+".jpg"
	console.log(name);
    fs.writeFile("./public/uploadimages/"+name, dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
       //  res.send("保存成功！");
	   //console.log("服务端接收到了数据啦");
        }
    });
   
  
});
 
 
 
 // 提交表单上传接口
var multiparty = require('multiparty')
var router = express.Router();
var fs = require('fs');
web.post('/upload2',function(req,res){
	
	console.log("开始上传");
	//创建处理form表单的对象
    var form = new multiparty.Form({
        uploadDir: './public/uploadimages'
    })//文件上传的路径
    //通过form.parse生成服务器文件，注意这里生成的文件名字不是原来的名字，而是编码后的名字,里面的回调包含错误信息，字段信息，文件信息
    form.parse(req,function (err,fields,files) {
        if(err) {
			console.log("上传失败");
			throw err ;
        console.log(err)}
        else{
				console.log("上传成功");
				// res.send('上传图片成功')
				 
				 var html = fs.readFileSync('./public/successUpload.html')
 
				 //res.write(html);
				 res.send(html);
          //  res.send(JSON.stringify(files.pic[0]))
        }
  })
	

})
 

router.post('/upload3',function (req,res) {
	  console.log("开始上传");
//创建处理form表单的对象
    var form = new multiparty.Form({
        uploadDir: ''
    })//文件上传的路径
    //通过form.parse生成服务器文件，注意这里生成的文件名字不是原来的名字，而是编码后的名字,里面的回调包含错误信息，字段信息，文件信息
    form.parse(req,function (err,fields,files) {
        if(err) {throw err ;
        console.log(err)}
        else{
            res.send(JSON.stringify(files.pic[0]))
        }
    })
})
 
 
 
 
 
 
 
web.listen('8080',function(){
    console.log('服务器启动.....')
})
