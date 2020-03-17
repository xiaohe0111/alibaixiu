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
// 完成编辑功能 
$('#btnEdit').on('click', function () {
    // console.log(userId);
    // 收集表单数据  
    let data = $('form').serialize();
    // 发送ajax 
    $.ajax({
        type: 'PUT',
        url: '/users/' + userId,
        data: data,
        success: function (res) {
            // console.log(res);
            // 实现无刷新  只要我们编辑完成了 服务器就响应回来一个对象 这个对象里面就是这个用户的相关信息 
            // 我们显示页面上面的所有的数据 是保存到userArr这个数组中了  
            // 从数组中将这个元素的索引找到 
            let index = userArr.findIndex(item => res._id == item._id);
            // console.log(index);
            userArr[index] = res;
            // 重新渲染页面 
            render();
            // 只我们编辑完成了 之前的那个表单要变成添加用户的表单 
            $('h2').text('添加新用户');

            $('#previewImg').attr("src", '../assets/img/default.png');
            $('#hidden').val('');
            // 表示将这个输入框 设置为启用
            $('input[name="email"]').prop('disabled', false).val('');
            $('input[name="nickName"]').val('');
            // 表示将这个输入框 设置为启用
            $('input[name="password"]').prop('disabled', false);

            $('#status0').prop('checked', false)
            $('#status1').prop('checked', false)
            $('#admin').prop('checked', false)
            $('#normal').prop('checked', false)

            $('#btnAdd').show();
            $('#btnEdit').hide();
        },
        error: function (err) {
            console.log(err);
        }
    })
})
// 5,完成用户删除功能
// 同样的利用事件委托的方法给del添加点击事件然后都数据进行删除
$('tbody').on('click', '.del', function () {
    // alert('ok')
    // 获取到当前被点击元素的id
    let id = $(this).attr('data-id')
    // 然后判断是否进行删除
    if (confirm('您真的要删除吗?')) {
        // 那么就发送ajax请求
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (res) {
                // console.log(res)
                // 通过索引号将要删除的元素从书中中找出来
                let index = userArr.findIndex(item => item._id === res._id)
                // 找到了之后调用数组的splice方法将这个数组元素删除
                userArr.splice(index, 1)
                // 再次调用render
                render()
            }
        })
    }
})
// 6,完成用户批量删除的功能
// 给thead里面的input添加点击事件
$('thead input').on('click', function () {
    // alert('ok')
    // 如果thead的input复选框被点击,那么tbody里面的所以复选框都要被选中
    $('tbody input').prop('checked', $(this).prop('checked'))
})
// 第二步,如果tbody里面的input复选框都被选中的话,那么thead里面的input也要被勾选
// 因为thead里面的input复选框是动态生成的,所以我们要用到事件委托的方法给他的父元素添加点击事件
$('tbody').on('click', '.check', function () {
    // alert('ok')
    // 然后我们要判断复选框的总个数等于被选中的复选框的个数?
    // 获取复选框的个数
    let length = $('.check').length
    // console.log(length)
    // 获取被选中复选框的个数
    let checkedLength = $('.check:checked').length
    // console.log(checkedLength)
    // 然后对复选框的个数和被选中的个数进行对比
    if (checkedLength > 1) {
        //    如果别选中的复选框的个数大于1 就让批量删除的按钮显示
        $('#allDel').show()
    } else {
        // 如果选中的个数不大于1就让批量删除的按钮继续隐藏
        $('#allDel').hide()
    }
})
// 第三步,给批量删除的按钮allDel添加点击事件
$('#allDel').on('click', function () {
    // alert('ok')
    // 声明一个空数组
    let arr = []
    // 我们需要获取到被选中的元素的ID值,但是这个ID值是在编辑按钮的身上,所以我们要获取到
    $('.check:checked').each(function (index, item) {
        // 然后获取到被选中元素的ID然后把它push到这个数组中
        // console.log($(item).parents('tr').attr('data-id'))
        arr.push($(item).parents('tr').attr('data-id'))
    })
    if (confirm('你确定要删除?')) {
        // 发送ajax请求
        $.ajax({
            type: 'delete',
            url: `/users` + arr.join('-'),
            success: function (res) {
                // console.log(res)
                res.forEach(item => {
                    // item 表示数组里面的每一个元素就是对象 我们从userArr中把对象的用户的ID找出来并将其删除,然后再调用render()方法
                    let index = userArr.findIndex(ele._id === item._id)
                    userArr.splice(index, 1)
                    render()
                })
            }
        })
    }
})