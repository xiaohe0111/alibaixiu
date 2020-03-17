// 定义一个空数组
let cArr = []
// 完成分类的添加功能
$('#btnAdd').on('click', function () {
    // 获取分类的名称和内容
    let title = $('[name="title"]').val().trim()
    let className = $('[name="className"]').val().trim()
    // 然后对输入框输入的内容进行判断
    if (title.length == 0) return alert('请填写分类的名称')
    if (className.length == 0) return alert('请填类名')

    // 发送ajax请求
    $.ajax({
        type: 'post',
        url: '/categories',
        data: {
            title: title,
            className: className
        },
        success: function (res) {
            // 然后把这个对象push到cArr数组中
            cArr.push(res)
            render()
            // 数据添加成功后要把输入框里面的内容清空
            $('[name="title"]').val('')
            $('[name="className"]').val('')
        }
    })
})
// 定义一个render()方法方便调用
function render() {
    let html = template('cTpl', { data: cArr })
    $('tbody').html(html)
}
// 发送ajax请求
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        cArr = res
        render()
    }
})

// 编辑功能 
var id;
$('tbody').on('click', '.edit', function () {
    id = $(this).parent().attr("data-id");
    $('h2').text("编辑分类");
    let tr = $(this).parents('tr');
    $('[name="title"]').val(tr.children().eq(1).text());
    $('[name="className"]').val(tr.children().eq(2).text());

    $('#btnAdd').hide();
    $('#btnEdit').show();
});

$('#btnEdit').on('click', function () {
    // 发送ajax 
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: {
            title: $('[name="title"]').val().trim(),
            className: $('[name="className"]').val().trim(),
        },
        success: function (res) {
            let index = cArr.findIndex(item => item._id == res._id);
            cArr[index] = res;
            render();

            $('h2').text("添加分类");

            $('[name="title"]').val('');
            $('[name="className"]').val('');

            $('#btnAdd').show();
            $('#btnEdit').hide();
        }
    })
})


// 删除单个用户
$('tbody').on('click', '.del', function () {
    let id = $(this).parent().attr('data-id');
    if (confirm("你真的要删除吗?")) {
        $.ajax({
            type: "delete",
            url: '/categories/' + id,
            success: function (res) {
                let index = cArr.findIndex(item => item._id == res._id);
                cArr.splice(index, 1);
                render();
            }
        })
    }
});

// 全选功能 
$('thead input').on('click', function () {
    $('tbody input').prop('checked', $(this).prop('checked'));

    if ($(this).prop("checked")) {
        $('#allDel').show();
    } else {
        $('#allDel').hide();
    }
});

// 如果下面的复选框都打上勾了 上面的这个复选框也要跟着打勾 

$('tbody').on('click', '.check', function () {
    // 判断下面复选框的个数是否等于 被选中元素的个数  
    let length = $('.check').length;
    let checkLength = $('.check:checked').length;
    // 上面复选框是否选中 如果选中的个数与下面复选框的个数相等的话 
    $('thead input').prop('checked', length === checkLength);

    // 如果下面的复选框的选中个数大于1 就需要显示出来 
    if (checkLength > 1) {
        $('#allDel').show();
    } else {
        $('#allDel').hide();
    }
})


$('#allDel').on('click', function () {
    let arr = [];
    $('.check:checked').each(function (index, item) {
        arr.push($(this).parents('tr').children().eq(3).attr("data-id"));
    })

    if (confirm("你真的要删除吗?")) {
        $.ajax({
            type: "delete",
            url: '/categories/' + arr.join('-'),
            success: function (res) {
                res.forEach(item => {
                    let index = cArr.findIndex(ele => ele._id === item._id);
                    cArr.splice(index, 1);
                    render();
                })
            }
        })
    }

})