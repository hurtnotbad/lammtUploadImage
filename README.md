# lammtUploadImage

本项目利用node.js实现图片的压缩、上传、以及base64的上传和接受。主要是2种提交方式：表单提交源文件；和自定义压缩上传；
具体请参考博客：https://blog.csdn.net/zhangpengzp/article/details/86629097


# 使用

将下载的解压出来，执行node lammtUploadImage.js

浏览器输入：http://10.5.11.136:8080/lammyUploadImage.html（第一种提交方式）

http://10.5.11.136:8080/lammyUploadbase64Image.html（第二种有压缩的提交方式）

压缩工具是compress.js，toUpload.js是动态添加<input>、<img>代码和调用压缩算法的方法文件