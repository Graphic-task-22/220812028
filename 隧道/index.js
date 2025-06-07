 import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mesh, { animate } from './mesh/sphere.js';

const scene = new THREE.Scene();
scene.add(mesh);

const width = window.innerWidth;
const height = window.innerHeight;

// 更大的FOV增强沉浸感
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);

let useOrbitControls = false;

function render() {
    if (!useOrbitControls) {
        animate(camera);
    }
    
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

// 可切换的轨道控制
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

// 切换控制模式
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        useOrbitControls = !useOrbitControls;
        controls.enabled = useOrbitControls;
        if (useOrbitControls) {
            camera.position.set(0, 0, 100);
            camera.lookAt(0, 0, 0);
        }
    }
});