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

function changePage(index) {

    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: index
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