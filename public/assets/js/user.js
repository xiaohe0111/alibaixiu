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