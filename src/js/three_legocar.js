// 💎 장면 정의: 조명 등 모든 3D개체 포함
const scene = new THREE.Scene();

// 💎 조명 설정: 주변 조명, 방향 조명
/* 
  ~Light(색상, 강도)
  * 색상: 16진수로 정의됨.
  * 강도: 0과 1 사이
*/

// ambientLight: 모든 방향에서 빛남. 지오메트리의 기본 색상 제공
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// directionalLight: 태양을 시뮬레이션함, 광선의 위치와 방향을 정의함
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
/* 
  position.set(X,Y,Z)
  @params Y : y축이 위쪽임. 가장 높은 좌표를 주는 쪽이 가장 많은 빛을 받아 가장 밝음
  @params X, Z : X축 Z축을 따라 빛이 얼마나 구부러지는지 정의함. 물체의 전면과 측면이 받는 빛의 양
*/
directionalLight.position.set(200, 500, 300);

// 💎 카메라 설정
/*
 * 투시카메라: 비디오게임
 * 직교카메라: 미니멀, 기하학적인 모양
 * 뷰 프러스텀(view frustum): 화면에 투영될 3D공간의 영역 - 직교카메라:상자
 */

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
  cameraWidth / -2, // left
  cameraWidth / 2, // right
  cameraHeight / 2, // top
  cameraHeight / -2, // bottom
  0, // near plane
  1000 // far plane
);

// 카메라의 위치 지정: 각 차원에서 카메라를 200단위 이동하였음
// 0,10,0 좌표를 바라보도록 설정함(거의 원점에 가깝지만, 차의 중심이 될 지면보다 약간 높은 지점)
camera.position.set(200, 200, 200);
camera.lookAt(0, 10, 0);

// 💎 렌더러 설정
// 캔버스의 크기 설정. 브라우저에 표시되는 방식을 설정-유일하게 px단위 크기 설정
const renderer = new THREE.WebGLRenderer({ antialias: true });
// 전체 브라우저창: 창 크기
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// 회전시키는 코드
renderer.setAnimationLoop(() => {
  car.rotation.y -= 0.007;
  renderer.render(scene, camera);
});

// 렌더링된 이미지를 HTML 문서에 추가함. HTML Canvas 요소를 만들고, DOM에 추가함
document.body.appendChild(renderer.domElement);

// 🎨 자동차 만들기 시작!
// Mesh: 지오메트리+재료의 조합 = 3D개체
function createWheels() {
  // 개체의 모양을 정의함
  const geometry = new THREE.BoxBufferGeometry(12, 12, 33);
  const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
  const wheel = new THREE.Mesh(geometry, material);
  return wheel;
}

function createCar() {
  const car = new THREE.Group();

  const backWheel = createWheels();
  backWheel.position.y = 6;
  backWheel.position.x = -18;
  car.add(backWheel);

  const frontWheel = createWheels();
  backWheel.position.y = 6;
  backWheel.position.x = -18;
  car.add(frontWheel);

  const main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 15, 30),
    new THREE.MeshLambertMaterial({ color: 0x78b14b })
  );
  main.position.y = 12;
  car.add(main);

  const carFrontTexture = getCarFrontTexture();
  const carBackTexture = getCarFrontTexture();
  const carRightSideTexture = getCarSideTexture();
  const carLeftSideTexture = getCarSideTexture();
  // 양쪽 맵핑 대칭으로 뒤집기(회전 중심이 중간이 되도록 설정, 텍스터 180도 회전, , 텍스처를 거꾸로 뒤집어 올바른 위치에 둠)
  carLeftSideTexture.center = new THREE.Vector2(0.5, 0.5);
  carLeftSideTexture.rotation = Math.PI;
  carLeftSideTexture.flipY = false;

  const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(33, 12, 24), [
    new THREE.MeshLambertMaterial({ map: carFrontTexture }),
    new THREE.MeshLambertMaterial({ map: carBackTexture }),
    new THREE.MeshLambertMaterial({ color: 0xffffff }),
    new THREE.MeshLambertMaterial({ color: 0xffffff }),
    new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
    new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
  ]);

  cabin.position.x = -6;
  cabin.position.y = 25.5;
  car.add(cabin);

  return car;
}

const car = createCar();
scene.add(car);
renderer.render(scene, camera);

function getCarFrontTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 64, 32);

  ctx.fillStyle = '#666666';
  ctx.fillRect(8, 8, 48, 24);

  return new THREE.CanvasTexture(canvas);
}

function getCarSideTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 128, 32);

  ctx.fillStyle = '#666666';
  ctx.fillRect(19, 8, 38, 24);
  ctx.fillRect(58, 8, 60, 24);

  return new THREE.CanvasTexture(canvas);
}
