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