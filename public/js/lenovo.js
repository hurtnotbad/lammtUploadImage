//图片显示
       function showPics(url,name){    	   
    	 //根据路径读取到文件 
           plus.io.resolveLocalFileSystemURL(url,function(entry){
        	   entry.file( function(file){
        		   var fileReader = new plus.io.FileReader();
        		   fileReader.readAsDataURL(file);
                   	   fileReader.onloadend = function(e) {
                	       var picUrl = e.target.result.toString();
                	       var picIndex = $("#picIndex").val();
	               		var nowIndex = parseInt(picIndex)+1;
	               		$("#picIndex").val(nowIndex);
	               		var html = '';
	               		html += '<div class="image-item " id="item'+nowIndex+'">';
	               		html += '<div class="image-close" onclick="delPic('+nowIndex+')">X</div>';
	               		html += '<div><img src="'+picUrl+'" class="upload_img" style="width:100%;height:100%;"/></div>';
	               		html += '</div>';
	               		html += $("#image-list").html();
	               		$("#image-list").html(html); 
                   	}
        	   });
          }); 
       }
     	//压缩图片  
       function compressImage(url,filename){  
           var name="_doc/upload/"+filename;
           plus.zip.compressImage({  
                   src:url,//src: (String 类型 )压缩转换原始图片的路径  
                   dst:name,//压缩转换目标图片的路径  
                   quality:40,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100  
                   overwrite:true//overwrite: (Boolean 类型 )覆盖生成新文件  
               },  
               function(zip) {
            	   //页面显示图片
            	   showPics(zip.target,name);
               },function(error) {  
                   plus.nativeUI.toast("压缩图片失败，请稍候再试");  
           });  
       } 
      
     	//调用手机摄像头并拍照
       function getImage() {  
           var cmr = plus.camera.getCamera();  
           cmr.captureImage(function(p) {  
               plus.io.resolveLocalFileSystemURL(p, function(entry) {  
                   compressImage(entry.toLocalURL(),entry.name);  
               }, function(e) {  
                   plus.nativeUI.toast("读取拍照文件错误：" + e.message);  
               });  
           }, function(e) {  
           }, {  
               filter: 'image' 
           });  
       }
       //从相册选择照片
       function galleryImgs() {  
    	    plus.gallery.pick(function(e) {  
    	    	var name = e.substr(e.lastIndexOf('/') + 1);
    	       compressImage(e,name);
    	    }, function(e) {  
    	    }, {  
    	        filter: "image"  
    	    });  
    	}
       
       //点击事件，弹出选择摄像头和相册的选项
    	function showActionSheet() {  
    	    var bts = [{  
    	        title: "拍照"  
    	    }, {  
    	        title: "从相册选择"  
    	    }];  
    	    plus.nativeUI.actionSheet({  
    	            cancel: "取消",  
    	            buttons: bts  
    	        },  
    	        function(e) {  
    	            if (e.index == 1) {  
    	                getImage();  
    	            } else if (e.index == 2) {  
    	                galleryImgs();  
    	            }  
    	        }  
    	    );  
    	}

		//获取用户所选的文件
var capture = $("#capture").files[0];
var capture = $("#fileSelect");
//在change事件发生时读取所选择的文件
/*上传照片*/
var fileReader; //
var fileName;
var _img = new Image();
var fileSelect = $("#fileSelect");
var capture = $('#capture');
fileSelect.click(function () { //在点击a标签时，触发capture的点击
    if (capture) {
        capture.click();
    }
})
var fileURI,formData,fileName,file ;
$('#capture').change(function () {  //change事件发生时，读取文件
    fileReader = new FileReader();
    if( typeof  fileReader == 'undefine'){
        tip("您的浏览器不支持fileReader！");
    }
    file = $(this)[0].files[0];//获取用户所选的文件
    //alert(file[0]);
    if(file){
        fileReader.onload = function () {  //显示用户所选的缩略图          
            _img.src = this.result;
            if( _img.style.width  > _img.style.height){
                _img.style.width = '100%';
                _img.style.height = 'auto';
            }else{
                _img.style.height = '100%';
                _img.style.width = 'auto';
            }
            $('#pushPhoto').append(_img);          
        }
        fileReader.readAsDataURL(file); //获取api异步读取的文件数据
        formData = new FormData();    
        formData.append("file", file);
        fileSelect[0].style.display = 'none';
    
    }
})

//将文件上传到服务器
$.ajax({
    url: fileURI, //文件上传到服务器的url地址
    data:  formData, //保存的文件数据
    processData: false,
    contentType: false,
    type: 'POST',
    async: false,
    dataType: "json",
    success: function(data) {
            //此处要获取到文件名字(省略了)           
    }
});