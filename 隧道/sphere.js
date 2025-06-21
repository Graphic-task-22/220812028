 import * as THREE from 'three';

const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-100, 20, 90),
    new THREE.Vector3(-40, 80, 100),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(100, -40, 80),
    new THREE.Vector3(150, 60, 60)
]);

const loader = new THREE.TextureLoader();
const texture = loader.load('./src/textures/sen.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(8, 20); // 环向和轴向重复
texture.colorSpace = THREE.SRGBColorSpace;

// 更精细的几何体
const geometry = new THREE.TubeGeometry(path, 200, 3, 32, false);

const material = new THREE.MeshBasicMaterial({
    side: THREE.BackSide, // 从内部观看
    map: texture,
});

const mesh = new THREE.Mesh(geometry, material);
const tubePoints = path.getSpacedPoints(1000);
let i = 0;

function animate(camera) {
    if (i < tubePoints.length - 1) {
        camera.position.copy(tubePoints[i]);
        camera.lookAt(tubePoints[i + 1]);
        i += 1;
    } else {
        i = 0;
    }
}

// 按键控制速度
document.addEventListener('keydown', (e) => {
    if(e.code === 'ArrowDown') {
        i += 5;
    }
    if(e.code === 'ArrowUp') {
        i += 1;
    }
});

export default mesh;
export { animate };