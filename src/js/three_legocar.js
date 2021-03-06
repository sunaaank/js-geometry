// ๐ ์ฅ๋ฉด ์ ์: ์กฐ๋ช ๋ฑ ๋ชจ๋  3D๊ฐ์ฒด ํฌํจ
const scene = new THREE.Scene();

// ๐ ์กฐ๋ช ์ค์ : ์ฃผ๋ณ ์กฐ๋ช, ๋ฐฉํฅ ์กฐ๋ช
/* 
  ~Light(์์, ๊ฐ๋)
  * ์์: 16์ง์๋ก ์ ์๋จ.
  * ๊ฐ๋: 0๊ณผ 1 ์ฌ์ด
*/

// ambientLight: ๋ชจ๋  ๋ฐฉํฅ์์ ๋น๋จ. ์ง์ค๋ฉํธ๋ฆฌ์ ๊ธฐ๋ณธ ์์ ์ ๊ณต
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// directionalLight: ํ์์ ์๋ฎฌ๋ ์ด์ํจ, ๊ด์ ์ ์์น์ ๋ฐฉํฅ์ ์ ์ํจ
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
/* 
  position.set(X,Y,Z)
  @params Y : y์ถ์ด ์์ชฝ์. ๊ฐ์ฅ ๋์ ์ขํ๋ฅผ ์ฃผ๋ ์ชฝ์ด ๊ฐ์ฅ ๋ง์ ๋น์ ๋ฐ์ ๊ฐ์ฅ ๋ฐ์
  @params X, Z : X์ถ Z์ถ์ ๋ฐ๋ผ ๋น์ด ์ผ๋ง๋ ๊ตฌ๋ถ๋ฌ์ง๋์ง ์ ์ํจ. ๋ฌผ์ฒด์ ์ ๋ฉด๊ณผ ์ธก๋ฉด์ด ๋ฐ๋ ๋น์ ์
*/
directionalLight.position.set(200, 500, 300);

// ๐ ์นด๋ฉ๋ผ ์ค์ 
/*
 * ํฌ์์นด๋ฉ๋ผ: ๋น๋์ค๊ฒ์
 * ์ง๊ต์นด๋ฉ๋ผ: ๋ฏธ๋๋ฉ, ๊ธฐํํ์ ์ธ ๋ชจ์
 * ๋ทฐ ํ๋ฌ์คํ(view frustum): ํ๋ฉด์ ํฌ์๋  3D๊ณต๊ฐ์ ์์ญ - ์ง๊ต์นด๋ฉ๋ผ:์์
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

// ์นด๋ฉ๋ผ์ ์์น ์ง์ : ๊ฐ ์ฐจ์์์ ์นด๋ฉ๋ผ๋ฅผ 200๋จ์ ์ด๋ํ์์
// 0,10,0 ์ขํ๋ฅผ ๋ฐ๋ผ๋ณด๋๋ก ์ค์ ํจ(๊ฑฐ์ ์์ ์ ๊ฐ๊น์ง๋ง, ์ฐจ์ ์ค์ฌ์ด ๋  ์ง๋ฉด๋ณด๋ค ์ฝ๊ฐ ๋์ ์ง์ )
camera.position.set(200, 200, 200);
camera.lookAt(0, 10, 0);

// ๐ ๋ ๋๋ฌ ์ค์ 
// ์บ๋ฒ์ค์ ํฌ๊ธฐ ์ค์ . ๋ธ๋ผ์ฐ์ ์ ํ์๋๋ ๋ฐฉ์์ ์ค์ -์ ์ผํ๊ฒ px๋จ์ ํฌ๊ธฐ ์ค์ 
const renderer = new THREE.WebGLRenderer({ antialias: true });
// ์ ์ฒด ๋ธ๋ผ์ฐ์ ์ฐฝ: ์ฐฝ ํฌ๊ธฐ
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// ํ์ ์ํค๋ ์ฝ๋
renderer.setAnimationLoop(() => {
  car.rotation.y -= 0.007;
  renderer.render(scene, camera);
});

// ๋ ๋๋ง๋ ์ด๋ฏธ์ง๋ฅผ HTML ๋ฌธ์์ ์ถ๊ฐํจ. HTML Canvas ์์๋ฅผ ๋ง๋ค๊ณ , DOM์ ์ถ๊ฐํจ
document.body.appendChild(renderer.domElement);

// ๐จ ์๋์ฐจ ๋ง๋ค๊ธฐ ์์!
// Mesh: ์ง์ค๋ฉํธ๋ฆฌ+์ฌ๋ฃ์ ์กฐํฉ = 3D๊ฐ์ฒด
function createWheels() {
  // ๊ฐ์ฒด์ ๋ชจ์์ ์ ์ํจ
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
  // ์์ชฝ ๋งตํ ๋์นญ์ผ๋ก ๋ค์ง๊ธฐ(ํ์  ์ค์ฌ์ด ์ค๊ฐ์ด ๋๋๋ก ์ค์ , ํ์คํฐ 180๋ ํ์ , , ํ์ค์ฒ๋ฅผ ๊ฑฐ๊พธ๋ก ๋ค์ง์ด ์ฌ๋ฐ๋ฅธ ์์น์ ๋ )
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
