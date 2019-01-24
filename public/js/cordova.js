document.addEventListener("deviceready"， onDeviceReady， false);
function onDeviceReady() {
pictureSource = navigator.camera.PictureSourceType;
destinationType = navigator.camera.DestinationType;
}
//相册
function fromCamera()
{
var source = pictureSource.PHOTOLIBRARY;
navigator.camera.getPicture(function (imageData) {
setimg(imageData);
}， function (message) {
if (source == pictureSource.CAMERA)
alert('加载照相机出错!' + message);
else
alert('加载相册出错!' + message);
}， {
quality: 50，
destinationType: destinationType.FILE_URI，
sourceType: source
});
}
//拍照
function EditImgPz()
{
navigator.camera.getPicture(function (imageData) {
setimg(imageData);
}， function (message) {
alert(message);
}， {
quality: 50，
destinationType: navigator.camera.DestinationType.FILE_URI，
sourceType: Camera.PictureSourceType.CAMERA，
allowEdit: true，
encodingType: Camera.EncodingType.JPEG，
popoverOptions: CameraPopoverOptions，
saveToPhotoAlbum: true
});
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