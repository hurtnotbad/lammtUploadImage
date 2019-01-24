//选择图片，马上预览  

    function xmTanUploadImg(obj) {  

        var fl=obj.files.length;  
        for(var i=0;i<fl;i++){  
            var file=obj.files[i];  
            var reader = new FileReader();  
 
            //读取文件过程方法  
            reader.onload = function (e) {  
                var imgstr='<img  src="'+e.target.result+'"/>';  
                var oimgbox=$("#images");  
                oimgbox.append(imgstr);  
            }  
		
            reader.readAsDataURL(file);  
			
        }  

    }  

	function xmTanUploadImg2(obj) {  
	
	 	 
	  var fl=obj.files.length;  
        for(var i=0;i<fl;i++){  
		
		var oFile = obj.files[i],
		imgSize = oFile.size;
		
		if(imgSize < 1920){
			var reader = new FileReader(); 
			// console.log("小图，不用压缩哦");
			 reader.onload = function(e) {
			var base64Img= e.target.result;
				  
				
						   $.ajax({
							type: 'POST',
							url: '/uploadbase64',
							dataType: "json",
							data: {
								"base64":base64Img
							},
							success: function(data) {
							console.log(data);
							},
							error: function(error) {
								alert(JSON.stringify(error));
								}
							});
									

							// 显示压缩的图片
							//var imgstr = '<img src=""+resizeImgBase64 />'
							//var base64Data = resizeImgBase64.replace(/^data:image\/\w+;base64,/, "");
							//var imgstr = '<img src="data:image/png;base64,"+base64Data/>'
							
							var img = new Image();//创建img容器
							img.src=base64Img.toString();//给img容器引入base64的图片															 												
							var oimgbox=$("#images"); 											
							oimgbox.append(img);    
						
			 }
			 reader.readAsDataURL(oFile);

        } else {    // 图片压缩处理
		
            var reader   = new FileReader(),
                maxWidth = 1920,
                maxHeight= 1920,
                suffix = oFile.name.substring(oFile.name.lastIndexOf('.') + 1);

            if(imgSize > 2 * 1024 * 1024){
                maxWidth = 1920;
                maxHeight= 1920;   
            }
			console.log("maxWidth",maxWidth);
			console.log("maxHeight",maxHeight);
			//alert("hello,开始压缩"+imgSize);
            reader.onload = function(e) {
                var base64Img= e.target.result;
				//console.log("-----",base64Img);
                //--执行resize。
                var _ir=ImageResizer({
                    resizeMode:"auto",
                    dataSource:base64Img,
                    dataSourceType:"base64",
                    maxWidth:maxWidth, //允许的最大宽度
                    maxHeight:maxHeight, //允许的最大高度。
                    onTmpImgGenerate:function(img){
                    },
                    success:function(resizeImgBase64,canvas){
						console.log("base64",resizeImgBase64);
					 
						
						   $.ajax({
							type: 'POST',
							url: '/uploadbase64',
							dataType: "json",
							data: {
								"base64":resizeImgBase64
							},
							success: function(data) {
							console.log(data);
							},
							error: function(error) {
								//alert(JSON.stringify(error));
								}
							});
									

							// 显示压缩的图片
							//var imgstr = '<img src=""+resizeImgBase64 />'
							//var base64Data = resizeImgBase64.replace(/^data:image\/\w+;base64,/, "");
							//var imgstr = '<img src="data:image/png;base64,"+base64Data/>'
							
							var img = new Image();//创建img容器
							img.src=resizeImgBase64.toString();//给img容器引入base64的图片															 												
							var oimgbox=$("#images"); 											
							oimgbox.append(img);  
						
						
                    }
                });
            };
            reader.readAsDataURL(oFile);
			 // alert("hello,压缩成功");
        }    
		

		}
    }  
	
	
    // 提交 
    function uploadFile() {
        //看最后一个file类型的input是否有文件，没有则移除
        if($("input[type='file']:last").prop('files')){
            if($(":file").prop('files').length==0){
                $("input[type='file']:last").remove();
                if($("input[type='file']").length==0){
                    alert("请选择图片");
                }
            }

            var form = new FormData($("#uploadForm")[0]);
            $.ajax({
                type:"post",
                url:url,//根据自己项目的需要写请求地址
                data:form,
                processData:false,
                contentType:false,
                success:function(msg){
                    console.log(msg);
                },
                error:function(e){
                    console.log(e.responseText);
                }
            })
        }else{
            alert("请选择图片");
            }
    }  
//新增type="file"
function addinputFile2(){
    //检查最后一个type="file"有没有选择图片，没有则去使用，不再建新的
    var lastObj=$("input[type='file']:last");
    if(lastObj.prop('files')){
        if(lastObj.prop('files').length==0){
            lastObj.click();
        }else{
            $(".inputFiles").append("<input type='file' name='fileAttach'  multiple='multiple' accept='image/*' onChange='xmTanUploadImg2(this);' />");
            $("input[type='file']:last").click();  
            }
    }else{
        //第一个
        $(".inputFiles").append("<input type='file' name='fileAttach'  multiple='multiple' accept='image/*' onChange='xmTanUploadImg2(this);' />");
        $("input[type='file']:last").click();
        }
}
//新增type="file"
function addinputFile(){
    //检查最后一个type="file"有没有选择图片，没有则去使用，不再建新的
    var lastObj=$("input[type='file']:last");
    if(lastObj.prop('files')){
        if(lastObj.prop('files').length==0){
            lastObj.click();
        }else{
            $(".inputFiles").append("<input type='file' name='fileAttach'  multiple='multiple' accept='image/*' onChange='xmTanUploadImg(this);' />");
            $("input[type='file']:last").click();  
            }
    }else{
        //第一个
        $(".inputFiles").append("<input type='file' name='fileAttach'  multiple='multiple' accept='image/*' onChange='xmTanUploadImg(this);' />");
        $("input[type='file']:last").click();
        }
}
