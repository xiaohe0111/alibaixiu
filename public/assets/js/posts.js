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
    }
})