const modelPath = "../image/vox1.glb"
var model
var cameraControls
var isMouseOverCamera
var scene, camera, renderer;
var modelContainer = document.getElementById("modelContainer")
function initScene() {
    
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(
        75,
        (window.innerWidth / 2) / (window.innerHeight / 2 ),
        0.1,
        1000
    );

    
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth / 4, window.innerHeight / 4);
    renderer.setClearColor(0x000000); // 设置背景色为白色
    modelContainer.appendChild(renderer.domElement);
    
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(5, 5, 5);
    scene.add(light);

    // 创建相机控制
    cameraControls = new OrbitControls(camera, renderer.domElement);
    cameraControls.addEventListener("change", render);
    
    animate();
}

function loadGLBModel(modelPath) {
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
        model = gltf.scene;
        scene.add(model);
        render();
    });
}

function animate() {
    requestAnimationFrame(animate);

    if (model && !isMouseOverCamera) {
        model.rotation.x += 0.1;
        model.rotation.y += 0.1;
    }

    render();
}

function render() {
    renderer.render(scene, camera);
}

function resizeCameraView() {
    const container = modelContainer;
    const originalWidth = window.innerWidth;
    const originalHeight = window.innerHeight;
    const newWidth = originalWidth / 2;
    const newHeight = originalHeight / 4;

    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    render();
}

function onMouseEnter() {
    isMouseOverCamera = true;
    cameraControls.enabled = true;
}

function onMouseLeave() {
    isMouseOverCamera = false;
    cameraControls.enabled = false;
}
// Initialize the scene and load the model
initScene();
loadGLBModel(modelPath);
resizeCameraView()
// Handle window resize
window.addEventListener('resize', resizeCameraView);
