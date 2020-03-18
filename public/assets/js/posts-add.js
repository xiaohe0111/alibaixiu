// 获取分类 
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        // console.log(res)
        let html = template('cTpl', { data: res });
        console.log(html);
        $('#category').html(html);
    }
})

// 搞定文件上传功能 
$('#feature').on('change', function () {
    let formData = new FormData();
    formData.append('img', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 只要是通过jquery中的ajax来实现文件上传的功能 就需要设置下面两个属性
        processData: false,
        contentType: false,
        success: function (res) {
            //  console.log(res); 预览图片
            $('.thumbnail').show().attr('src', res[0].img);
            // 添加一个隐藏域保存上传图片后的地址
            $('#hidden').val(res[0].img);
        }
    })
})

// 完成文章添加功能 
$('#btnAdd').on('click', function () {
    let data = $("form").serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: data,
        success: function (res) {
            location.href = 'posts.html';
        }
    })
})