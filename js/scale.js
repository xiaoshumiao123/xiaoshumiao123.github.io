// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

// 加载3D模型
const loader = new THREE.GLTFLoader();
loader.load('your-model.gltf', (gltf) => {
    const model = gltf.scene;
    scene.add(model);
});

// 创建动画循环
const animate = () => {
    requestAnimationFrame(animate);

    // 你可以在这里添加模型的动画或交互效果

    renderer.render(scene, camera);
};

animate();
