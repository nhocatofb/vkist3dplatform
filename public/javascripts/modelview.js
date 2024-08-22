// Tạo một scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x888888);
var light = new THREE.PointLight(0xffffff, 0.7); 
light.position.set(-5, 10, 20);
light.castShadow = true;
scene.add(light);

// Tạo một camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.y = 1;

// Tạo một renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var mesh;

// Tạo một loader cho file PLY
var loader = new THREE.PLYLoader();

// Tạo một loader cho texture
var textureLoader = new THREE.TextureLoader();

var objLoader = new THREE.OBJLoader();
var mtlLoader = new THREE.MTLLoader();
var vkist;

/*
mtlLoader.load('../plymodel/0/refined/vkist-quad-refined.mtl', function(materials) {
    materials.preload();
    objLoader.setMaterials(materials);
    objLoader.load('../plymodel/0/refined/vkist-quad-refined.obj', function(object) {
        scene.add(object);
        vkist = object;
    });
});
*/

document.addEventListener('DOMContentLoaded', function() {
    // Lấy tham số file từ URL hiện tại
    var urlParams = new URLSearchParams(window.location.search);
    var fileParam = urlParams.get('file');

    // Load file .mtl tương ứng
    mtlLoader.load('../models/' + fileParam + '/' + fileParam + '.mtl', function(materials) {
        materials.preload();
        objLoader.setMaterials(materials);
        // Load file .obj tương ứng
        objLoader.load('../models/' + fileParam + '/' + fileParam + '.obj', function(object) {
            scene.add(object);
            vkist = object;
        });
    });
});



/*
// Load file PLY
loader.load(
    // Đường dẫn đến file PLY
    '../plymodel/0/dense_texture.ply',
    // Callback function khi load thành công
    function(geometry) {
        // Load texture từ file hình ảnh
        textureLoader.load(
            '../plymodel/0/dense_texture0.png', // Đường dẫn đến file hình ảnh của texture
            function(texture) {
                // Tạo một vật liệu cho mesh từ texture
                var material = new THREE.MeshStandardMaterial({color: 0x00ff00, wireframe: true});

                // Tạo một mesh từ geometry và vật liệu
                mesh = new THREE.Mesh(geometry, material);

                // Thêm mesh vào scene
                //scene.add(mesh);
            },
            // Callback function khi xảy ra lỗi
            function(xhr) {
                console.error('An error occurred while loading the texture:', xhr);
            }
        );
    },
    // Callback function khi xảy ra lỗi
    function(xhr) {
        console.error('An error occurred while loading the PLY file:', xhr);
    },
    // Callback function khi tiến trình thay đổi
    function(event) {
        console.log('Loading PLY file:', (event.loaded / event.total * 100) + '%');
    }
);
*/

// Vòng lặp render
function animate() {
    requestAnimationFrame(animate);
    // Xoay vật thể liên tục
    //mesh.rotation.y += 0.01;
    vkist.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
