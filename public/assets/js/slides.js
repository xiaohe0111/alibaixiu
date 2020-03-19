// 定义一个数组 
let slideArr = [];

$.ajax({
    type: 'get',
    url: '/slides',
    success: function (res) {
        console.log(res);
        slideArr = res;
        render();
    }
})


function render() {
    let html = template('sTpl', { data: slideArr });
    $('tbody').html(html);
}

// 删除功能 
$('tbody').on('click', '.del', function () {
    let id = $(this).attr("data-id");
    if (confirm("你真的删除吗?")) {
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function (res) {
                let index = slideArr.findIndex(item => item._id === res._id);
                slideArr.splice(index, 1);
                render();
            }
        })
    }
})


// 第一步：先完成图片上传的功能
$('#image').on('change', function () {
    let formData = new FormData();
    formData.append('img', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            // console.log(res);
            $('.thumbnail').show().attr('src', res[0].img);
            $('#hidden').val(res[0].img);
        }
    })
})

// 实现轮播图的添加功能 
$('#btn').on('click', function () {
    let data = $('form').serialize();
    $.ajax({
        type: 'post',
        url: '/slides',
        data: data,
        success: function (res) {
            slideArr.push(res);
            render();
            // 把对应的数据清空
            $('.thumbnail').hide().attr('src', '');
            $('#hidden').val('');
            $('input[name="title"]').val('');
            $('input[name="link"]').val('');
        }
    })
})