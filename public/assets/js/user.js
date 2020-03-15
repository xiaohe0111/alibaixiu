// 1,完成用户显示功能
// 定义一个数组
let userArr = []
// 发送ajax请求
$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {
        userArr = res
        console.log(userArr)
        render()
    }
})
// 封装一个render方法  用于渲染页面
function render() {
    let html = template('userTpl', { data: userArr })
    $('tbody').html(html)
}
// 2,完成图片的上传功能
// 给ID名为avatar的input添加change事件
$('#avatar').on('change', function () {
    let formData = new FormData()
    console.log(this.files[0])
    formData.append('avatar', this.files[0])
    // 发送ajax请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            console.log(res);
            $('#previewImg').attr('src', res[0].avatar)
            // 将图片的地址保存在表单控件中
            $('#hidden').val(res[0].avatar)
        }
    })
})
// 3,完成用户添加功能
// 给btn添加点击事件 
$('.btn').on('click', function () {
    // 要获取到用户输入的内容
    let data = $('form').serialize()
    // 发送ajax请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: data,
        success: function (res) {
            console.log(res)
            // 把输入的内容推送到数组中
            userArr.push(res)
            render()
            // 将数据显示到页面中后, 要清空表单里面的内容
            $('input[type="email"]').val('');//清空邮箱框
            $('input[name="nickName"]').val('')//清空昵称框
            $('input[name="password"]').val('')//清空密码框
            $('#status0').prop('checked', false)//
            $('#status1').prop('checked', false)//
            $('admin').prop('checked', false)
            $('normal').prop('checked', false)
            $('hidden').val('')
            $('#previewImg').attr('src', '../assets/img/default.png')//把头像图片改为原来默认的样子
        },
        error: function (err) {
            console.log(err)
        }
    })
})
// 4,完成用户编辑功能
var userId;
// 给btnEdit添加点击事件对数据进行编辑 因为没一个tr是动态添加的所以我们需要用到事件委托进行处理
$('tbody').on('click', '.edit', function () {
    // alert('ok')
    userId = $(this).attr('data-id');
    console.log(userId);
    // 修改相关内容
    $('h2').html('编辑用户')
    // 然后获取到当前被点击这一行数据的对应的头像邮箱昵称密码和是否激活和状态
    let tr = $(this).parents('tr')
    $('#previewImg').attr('src', tr.find('img').attr('src'))//获取到当前头像的地址
    $('#hidden').val(tr.find('img').attr('src'))//获取到当前的头像
    $('input[type="email"]').val(tr.children().eq(2).text());//获取到编辑用户数据的email
    // 将这个输入框 设置为禁用
    // $('input[name="email"]').prop('disabled', true).val(tr.children().eq(2).text());
    $('input[name="nickName"]').val(tr.children().eq(3).text())//获取到编辑用户数据的昵称
    // 将这个输入框 设置为禁用
    // $('input[name="password"]').prop('disabled', true);
    // 对status和role进行判断
    if (tr.children().eq(4).text() == '激活') {
        $('#status1').prop('checked', true)
    } else {
        $('#status0').prop('checked', true)
    }
    if (tr.children().eq(5).text() == '超级管理员') {
        $('#admin').prop('checked', true)
    } else {
        $('#normal').prop('checked', true)
    }
    // 然后同时将添加按钮隐藏将编辑按钮显示
    $('#btnAdd').hide()
    $('#btnEdit').show()
})