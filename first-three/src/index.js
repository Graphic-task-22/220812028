import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
//import cube from './mesh/cube';
import sphere from './mesh/sphere';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let renderer, camera, scene; // 全局变量 场景、相机、渲染器
function init() {
  // Create a scene
  scene = new THREE.Scene();
  //console.log('cube', cube);
  // Add the cube to the scene
  //scene.add(cube);
  // Add the sphere to the scene
  scene.add(sphere);

  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  // Create a camera
  // fov?: number, aspect?: number, near?: number, far?: number
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(400, 400, 400);
  // 设置相机看向的位置
  camera.lookAt(0, 0, 0);
  // Create a renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  // Add the canvas element created by the renderer to document body
  // domElement(canvas)
  document.body.appendChild(renderer.domElement);
}

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  if (!renderer) return;
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  //没有动画的时候需要重新render
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
};

function initHelper(params) {
  // 辅助坐标轴
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
  }); //监听鼠标、键盘事件

  // 添加一个辅助网格地面 网格地面辅助观察GridHelper
  const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
  scene.add(gridHelper);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // 立方体旋转
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}

function initStats(params) {
  const stats = new Stats();
  //stats.domElement:web页面上输出计算结果,一个div元素，
  document.body.appendChild(stats.domElement);
  // 渲染函数
  function render() {
    //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
    stats.update();
    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  }
  render();
}

init();
initHelper();
initStats();
// animate();

const gui = new GUI();
console.log('gui', gui);
// 执行方法
const settings = {
  clear() {
    gui.children[0].reset(); // 重置
  },
  setDefault() {
    cube.position.set(0, 0, 0);
  },
  resetLight() {
    ambientLight.intensity = 0;
  },
  x: 0,
};
gui.add(settings, 'clear'); //0
gui.add(settings, 'setDefault'); // 重置到默认值
gui.add(settings, 'resetLight'); // 重置环境光强度
gui.add(settings, 'x', -100, 100); // 重置环境光强度
gui.add(settings, 'startAnimate'); // 重置环境光强度
gui.add(settings, 'stopAnimate'); // 重置环境光强度