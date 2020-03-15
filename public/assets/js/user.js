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