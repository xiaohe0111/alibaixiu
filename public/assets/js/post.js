// 发送ajax 请求文章列表

// 获取分类 和状态 
var cid = $('#category').val();
var state = $('#state').val();
// $.ajax({
//     type: 'get',
//     url: '/posts',
//     data: {
//         page: 1
//     },
//     success: function (res) {
//         console.log(res);
//         let html = template('pTpl', { data: res.records });
//         $('tbody').html(html);
//         // 还要调用 template方法 
//         let pageHtml = template('pageTpl', res);
//         // console.log(pageHtml)
//         $('.pagination').html(pageHtml);
//     }
// })

// 分页 


// 封装了一个函数用于发送ajax 
/*
    cid  表示分类的id 
    state 状态 文章是草稿还是已发布 
    page 页码  
*/
function render(cid, state, page = 1) {
    // 我们最开始渲染页面时发送的ajax
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {

            page: page,
            category: cid,
            state: state
        },
        success: function (res) {
            console.log(res);
            let html = template('pTpl', { data: res.records });
            $('tbody').html(html);

            // 还要调用 template方法 
            let pageHtml = template('pageTpl', res);
            // console.log(pageHtml)
            $('.pagination').html(pageHtml);
        }
    })
}

render(cid, state);

// 分页 
function changePage(index) {
    render(cid, state, index)
}

// 获取所有的文章分类 
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        let html = template('cTpl', { data: res });
        console.log(html);
        $('#category').append(html);
    }
})
// 筛选功能
$('#search').on('click', function () {
    cid = $('#category').val();
    state = $('#state').val();
    // 向服务器发送ajax请求 
    // $.ajax({
    //     type: 'get',
    //     url: '/posts',
    //     data: {
    //         category: cid,
    //         state: state
    //     },
    //     success: function (res) {
    //         let html = template('pTpl', { data: res.records });
    //         $('tbody').html(html);
    //         // 还要调用 template方法 
    //         let pageHtml = template('pageTpl', res);
    // console.log(pageHtml)
    //         $('.pagination').html(pageHtml);
    //     }
    // })
    render(cid, state)
})
