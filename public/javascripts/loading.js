document.addEventListener('DOMContentLoaded', function() {
    var progressBar = document.querySelector('.loading-bar');

    // Lấy tham số file từ URL hiện tại
    var urlParams = new URLSearchParams(window.location.search);
    var fileParam = urlParams.get('file');

    // Giả định rằng loading đạt 100% sau 3 giây
    setTimeout(function() {
        if (fileParam.includes('nerf')) {
            window.location.href = 'https://' + encodeURIComponent(fileParam) + '.vkist-hub.com';
        } else {
            setTimeout(function() {
                window.location.href = '/modelview?file=' + encodeURIComponent(fileParam);
            }, 200); // Delay 200ms trước khi chuyển hướng
        }
    }, 3000); // Delay 3 giây trước khi kiểm tra và chuyển hướng
});
