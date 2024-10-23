var scene = new THREE.Scene();
scene.background = new THREE.Color(0x888888);
var light = new THREE.PointLight(0xffffff, 0.2); 
light.position.set(-5, 10, 20);
light.castShadow = true;
//scene.add(light);

scene.fog = new THREE.Fog(0xaaaaaa, 10, 50);

/*
var sky = new THREE.Sky();
sky.scale.setScalar(10000);
scene.add(sky);

var sun = new THREE.Vector3();
const phi = THREE.MathUtils.degToRad(89);  // Độ cao của mặt trời (gần đường chân trời)
const theta = THREE.MathUtils.degToRad(180);   // Vị trí theo phương ngang của mặt trời
sun.setFromSphericalCoords(1, phi, theta);

// Cập nhật vị trí mặt trời trong Sky Shader
sky.material.uniforms['sunPosition'].value.copy(sun);

// Điều chỉnh ánh sáng để tạo hiệu ứng ánh sáng mặt trời
var sun_light = new THREE.DirectionalLight(0xffffff, 1);
sun_light.position.set(sun.x, sun.y, sun.z);
sun_light.intensity = 0.1;
scene.add(sun_light);
*/

var loader = new THREE.TextureLoader();
loader.load('../images/catba.jpg', function(texture) {
    scene.background = texture;
});

var ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);


var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;
camera.position.y = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var mesh;

var loader = new THREE.PLYLoader();

var textureLoader = new THREE.TextureLoader();

var objLoader = new THREE.OBJLoader();
var mtlLoader = new THREE.MTLLoader();
var vkist;

document.addEventListener('DOMContentLoaded', function() {
    var urlParams = new URLSearchParams(window.location.search);
    var fileParam = urlParams.get('file');
    mtlLoader.load('../models/' + fileParam + '/' + fileParam + '.mtl', function(materials) {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load('../models/' + fileParam + '/' + fileParam + '.obj', function(object) {
            scene.add(object);
            vkist = object;
            vkist.rotation.z -= 0;
            vkist.rotation.y -= 3.14/2;
            vkist.position.y -= 2;
        });
    });
});

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var clickableDots = [];

function createCustomDot(x, y, z) {
    var group = new THREE.Group();  
    
    for (let i = 1; i <= 2; i++) {
        var geometry = new THREE.CircleGeometry(i * 0.1, 32);
        var positions = geometry.attributes.position.array;

        var bufferGeometry = new THREE.BufferGeometry();
        var positionArray = [];

        for (let j = 0; j < positions.length; j += 3) {
            positionArray.push(new THREE.Vector3(positions[j], positions[j + 1], positions[j + 2]));
        }

        bufferGeometry.setFromPoints(positionArray);

        var material = new THREE.LineBasicMaterial({ color: 0xffffff });
        var circle = new THREE.Line(bufferGeometry, material);
        group.add(circle);
    }
    
    for (let i = 3; i <= 4; i++) {
        var geometry = new THREE.CircleGeometry(i * 0.1, 32);
        var positions = geometry.attributes.position.array;

        var bufferGeometry = new THREE.BufferGeometry();
        var positionArray = [];

        for (let j = 0; j < positions.length; j += 3) {
            positionArray.push(new THREE.Vector3(positions[j], positions[j + 1], positions[j + 2]));
        }

        bufferGeometry.setFromPoints(positionArray);

        var materialDashed = new THREE.LineDashedMaterial({
            color: 0xffffff,
            dashSize: 0.05,
            gapSize: 0.05
        });
        var dashedCircle = new THREE.Line(bufferGeometry, materialDashed);
        dashedCircle.computeLineDistances();
        group.add(dashedCircle);
    }
    
    group.position.set(x, y, z);
    scene.add(group);

    clickableDots.push(group);  // Thêm group vào mảng các đối tượng có thể click vào

    return group;
}

function createEdge(start, end, dir, dis, imageUrl, linkUrl) {
    var material = new THREE.LineBasicMaterial({ color: 0xffffff });
    
    var points = [];
    points.push(start);
    points.push(end);
    
    var secondEnd = new THREE.Vector3().copy(end);  
    
    switch (dir) {
        case 'u':  
            secondEnd.y += dis;
            break;
        case 'd':  
            secondEnd.y -= dis;
            break;
        case 'l':  
            secondEnd.x -= dis;
            break;
        case 'r': 
            secondEnd.x += dis;
            break;
        default:
            console.error('Invalid direction! Use u (up), d (down), l (left), or r (right).');
            return;
    }

    points.push(secondEnd);
    
    var geometry = new THREE.BufferGeometry().setFromPoints(points);
    
    var line = new THREE.Line(geometry, material);
    scene.add(line);

    // Tạo sprite cho hình ảnh tại vị trí secondEnd
    var textureLoader = new THREE.TextureLoader();
    var spriteMaterial = new THREE.SpriteMaterial({
        map: textureLoader.load(imageUrl),
        color: 0xffffff
    });

    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(1, 1, 1);  
    sprite.position.copy(secondEnd);
    scene.add(sprite);  // Thêm sprite vào scene

    // Tạo box vô hình để nhận sự kiện click
    var invisibleBoxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);  // Kích thước lớn hơn sprite một chút
    var invisibleBoxMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });  // Vật liệu trong suốt
    var invisibleBox = new THREE.Mesh(invisibleBoxGeometry, invisibleBoxMaterial);
    invisibleBox.position.copy(secondEnd);  // Đặt vị trí của box vô hình tại cùng vị trí với sprite

    // Gắn sự kiện click vào box vô hình
    invisibleBox.userData = { link: linkUrl }; 
    invisibleBox.onClick = function() {
        window.open(this.userData.link, "_blank");  // Mở URL trong tab mới khi click vào box
    };
    
    scene.add(invisibleBox);  // Thêm box vô hình vào scene
}

var controls = new THREE.OrbitControls(camera, renderer.domElement);

window.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(clickableDots, true);
    if (intersects.length > 0) {
        if (intersects[0].object.onClick) {
            intersects[0].object.onClick(); 
        }
        var clickedDot = intersects[0].object.parent; 
        showEdges(clickedDot);
    }

    var intersects2 = raycaster.intersectObjects(scene.children, true);
    if (intersects2.length > 0) {
        console.log(intersects2[0].object)
        if (intersects2[0].object.onClick) {
            intersects2[0].object.onClick(); 
        }
    }
}

function showEdges(dot) {
    if (dot === dot1) {
        createEdge(dot1.position, new THREE.Vector3(-5, 4, 1), 'l', 2, '../images/xyz.jpg', 'https://nerf-hp01.vkist-hub.com/');
    } else if (dot === dot2) {
        createEdge(dot2.position, new THREE.Vector3(4, 7, 0), 'r', 2, '../images/xyz.jpg', 'https://nerf-hp01.vkist-hub.com/');
    }
}

dot1 = createCustomDot(-2, 0, 1);
dot2 = createCustomDot(1.4, 3, -0.4);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    //vkist.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
