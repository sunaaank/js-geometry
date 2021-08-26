const scene = new THREE.Scene();
/* 
  @params field of view
  @params aspect ratio: window.innerWidth / window.innerHeight,
  @params near
  @params far
*/

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//  꼭짓점 points (vertices) and 면 fill (faces)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// 화면을 새로 고칠 때마다 렌더러가 장면을 그리도록 하는 루프를 생성
const animate = function () {
  requestAnimationFrame(animate);

  // 회전 애니메이션
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
