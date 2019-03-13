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

 
var index = 0;
var fs=require('fs');
 
fs.readFile("index.txt",'utf-8',function(err,data){
	if(err){
		console.error(err);
	}
	else{
		console.log(data);
		index = parseInt(data);
	}
});

web.use(express.json({limit: '50mb'}));
web.post('/uploadbase64', function(req, res){
	
	index = index + 1;
	//console.log("服务端接收到了数据啦");	
	
    //接收前台POST过来的base64
    var imgData = req.body.base64;
	
	//console.log("服务端接收到了数据啦",imgData);
	
    //过滤掉前缀
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
	var timestamp = Date.parse(new Date());
    var dataBuffer =   Buffer.from(base64Data, 'base64');
	var name = index+".jpg"
	console.log(name);
    fs.writeFile("./public/images/"+name, dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
       //  res.send("保存成功！");
	   //console.log("服务端接收到了数据啦");
	   
					fs.writeFile('index.txt',index,{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
					     if(err){
					         console.log("文件写入失败")
					     }else{
					         console.log("文件写入成功");

					     }

					}) 

        }
    });
	
	
   
});
 

 
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
