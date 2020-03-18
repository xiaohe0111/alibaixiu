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

// 封装一个函数 这个函数 可以根据 参数来返回对应的值  如果有就返回 如果没有就返回 -1  

function getParams(key) {
    //  我们首先获取浏览器地址栏上面的数数组 从?后面开始截取 使用&将其分隔为数组 
    let params = location.search.substr(1).split('&');
    // 遍历数组 
    for (var i = 0; i < params.length; i++) {
        // 因为数组元素 key=value这种形式 所以我们就字符串转换为数组元素 
        let temp = params[i].split('=');

        // temp是数组  它的0下标 
        if (temp[0] === key) {
            return temp[1]
        }

    }

    return -1

}

// 接下来调用函数 

let id = getParams('id');

if (id != -1) {
    // 这里要执行就是编辑功能  
    // 要送ajax请求 根据 id的值 将这篇文章 的相关内容获取到 
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (res) {
            // console.log(res);
            $('h1').text('编辑文章');
            $('#title').val(res.title)
            $('#content').val(res.content);
            $('.thumbnail').show().attr('src', res.thumbnail);
            $('#hidden').val(res.thumbnail);
            // console.log(res.createAt.substr(0,16));
            $('#created').val(res.createAt.substr(0, 16));

            // 先获取 id=category 下面的所有的 option

            $('#category option').each(function (index, item) {
                // console.log($(item).attr('value'));
                if ($(item).attr('value') == res.category._id) {
                    $(item).prop('selected', true);
                }
            })

            $('#status option').each(function (index, item) {
                // console.log($(item).attr('value'));
                if ($(item).attr('value') == res.state) {
                    $(item).prop('selected', true);
                }
            })

            $('#btnAdd').hide()
            $('#btnEdit').show();
        }
    })
}


$('#btnEdit').on('click', function () {
    // 获取表单的数据  
    let data = $('form').serialize();
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: data,
        success: function (res) {
            location.href = 'posts.html';
        }
    })
});