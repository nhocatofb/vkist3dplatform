function showImages(area) {
    let rightSidebarContent = document.getElementById('right-sidebar-content');
    rightSidebarContent.innerHTML = '';

    let images = {
        'khuvuc1': [
            { src: '../images/catba5.jpg', caption: 'Ảnh 1 của khu vực 1' },
            { src: '../images/catba6.jpg', caption: 'Ảnh 2 của khu vực 1' }
        ],
        'khuvuc2': [
            { src: '../images/catba2.jpg', caption: 'Ảnh 1 của khu vực 2' },
            { src: '../images/catba4.jpg', caption: 'Ảnh 2 của khu vực 2' }
        ],
        'khuvuc3': [
            { src: 'path/to/khuvuc3_1.jpg', caption: 'Ảnh 1 của khu vực 3' },
            { src: 'path/to/khuvuc3_2.jpg', caption: 'Ảnh 2 của khu vực 3' }
        ]
    };

    images[area].forEach(function(image) {
        let imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.caption;
        imgElement.className = 'right-thumbnail'; 
        imgElement.onclick = function() { openImageModal(this); }; 

        let captionElement = document.createElement('p');
        captionElement.textContent = image.caption;

        rightSidebarContent.appendChild(imgElement);
        rightSidebarContent.appendChild(captionElement);
    });
}

function openImageModal(img) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    modal.style.display = "flex"; 
    modalImg.src = img.src; 
}

function closeImageModal() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none"; 
}
