$('#logout').on('click', function () {
    var isConfirm = confirm('确认退出吗?')
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function () {
                location.href = '/admin/login.html'
            },
            error: function () {
                alert('退出失败')
            }
        })
    }
})

$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function (res) {
        // console.log(res);
        $('.profile img').attr('src', res.avatar);
        $('.profile h3').text(res.nickName);
    }
})