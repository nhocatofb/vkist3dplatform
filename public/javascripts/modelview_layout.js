function showImages(area) {
    let rightSidebarContent = document.getElementById('right-sidebar-content');
    rightSidebarContent.innerHTML = ''; // Xóa nội dung hiện tại

    // Dữ liệu ảnh thuộc từng khu vực
    let images = {
        'khuvuc1': [
            { src: '../images/pantry.JPG', caption: 'Ảnh 1 của khu vực 1' },
            { src: '../images/pantry.JPG', caption: 'Ảnh 2 của khu vực 1' }
        ],
        'khuvuc2': [
            { src: '../images/vkist.jpg', caption: 'Ảnh 1 của khu vực 2' },
            { src: '../images/vkist.jpg', caption: 'Ảnh 2 của khu vực 2' }
        ],
        'khuvuc3': [
            { src: 'path/to/khuvuc3_1.jpg', caption: 'Ảnh 1 của khu vực 3' },
            { src: 'path/to/khuvuc3_2.jpg', caption: 'Ảnh 2 của khu vực 3' }
        ]
    };

    // Hiển thị các ảnh thuộc khu vực đã chọn
    images[area].forEach(function(image) {
        // Tạo phần tử hình ảnh
        let imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.caption;
        imgElement.className = 'right-thumbnail';  // Thêm class cho ảnh để hỗ trợ CSS và hành vi
        imgElement.onclick = function() { openImageModal(this); }; // Gắn sự kiện onclick để phóng to ảnh

        // Tạo phần tử caption
        let captionElement = document.createElement('p');
        captionElement.textContent = image.caption;

        // Thêm ảnh và caption vào sidebar
        rightSidebarContent.appendChild(imgElement);
        rightSidebarContent.appendChild(captionElement);
    });
}

// Hàm mở modal khi nhấp vào ảnh
function openImageModal(img) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    modal.style.display = "flex"; // Hiển thị modal
    modalImg.src = img.src; // Đặt hình ảnh của modal giống với ảnh đã nhấp vào
}

// Hàm đóng modal khi nhấp vào nút "Đóng" hoặc modal
function closeImageModal() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none"; // Ẩn modal
}
