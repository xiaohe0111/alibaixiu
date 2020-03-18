// 获取分类 和状态 
var cid = $('#category').val();
var state = $('#state').val();

// 发送ajax 请求文章列表
$.ajax({
    type: 'get',
    url: '/posts',
    data: {
        page: 1
    },
    success: function (res) {
        console.log(res);
        let html = template('pTpl', { data: res.records });
        console.log(html)
        $('tbody').html(html);

        // 还要调用 template方法 
        let pageHtml = template('pageTpl', res);
        // console.log(pageHtml)
        $('.pagination').html(pageHtml);
    }
})

// 分页功能
function changePage(index) {

    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: index,
            category: cid,
            state: state
        },
        success: function (res) {
            let html = template('pTpl', { data: res.records });
            $('tbody').html(html);

            let pageHtml = template('pageTpl', res);
            // console.log(pageHtml)
            $('.pagination').html(pageHtml);
        }
    })

}

// 获取所有的文章分类 
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        let html = template('cTpl', { data: res });
        // console.log(html);
        $('#category').append(html);
    }
})

// 筛选功能

$('#search').on('click', function () {
    // 获取分类 和状态 
    cid = $('#category').val();
    state = $('#state').val();
    // 向服务器发送ajax请求 
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            category: cid,
            state: state
        },
        success: function (res) {
            let html = template('pTpl', { data: res.records });
            $('tbody').html(html);
            // 还要调用 template方法 
            let pageHtml = template('pageTpl', res);
            // console.log(pageHtml)
            $('.pagination').html(pageHtml);
        }
    })
});