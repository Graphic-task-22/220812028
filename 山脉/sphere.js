 import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

const noise2D = createNoise2D();
const geometry = new THREE.PlaneGeometry(300, 300, 100, 100);

// 顶点着色器和片段着色器用于渐变颜色
const material = new THREE.ShaderMaterial({
  vertexShader: `
    varying float vHeight;
    void main() {
      vHeight = position.z;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying float vHeight;
    void main() {
      float colorMix = (vHeight + 50.0) / 100.0;
      vec3 lightRed = vec3(1.0, 0.7, 0.7);   // 浅红色
      vec3 lightGreen = vec3(0.7, 1.0, 0.7); // 浅绿色
      gl_FragColor = vec4(mix(lightRed, lightGreen, colorMix), 1.0);
    }
  `,
  // 建议关闭线框以显示真实颜色
  wireframe: false,
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(Math.PI / 2); // 朝上

export default mesh;

export function updatePosition() {
  const positions = geometry.attributes.position;
  const time = Date.now() * 0.001;
  
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    
    // 多重噪声
    const noise1 = noise2D(x / 150 + time * 0.2, y / 150 + time * 0.3) * 30;
    const noise2 = noise2D(x / 80 + time * 0.1, y / 80 - time * 0.15) * 15;
    const noise3 = noise2D(x / 40 + time * 0.4, y / 40 + time * 0.2) * 8;

    // 波浪滚动效果
    const wave1 = Math.sin(time * 2 + x * 0.02 + y * 0.01) * 24;
    const wave2 = Math.cos(time * 1.5 + y * 0.03 - x * 0.015) * 16;
    
    const finalHeight = noise1 + noise2 + noise3 + wave1 + wave2;
    positions.setZ(i, finalHeight);
  }

  positions.needsUpdate = true;
}
