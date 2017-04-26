import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer as Renderer,
  Mesh,
  SpotLight as Light,
  PlaneGeometry,
  CubeGeometry,
  MeshLambertMaterial
} from 'three';

const width = window.innerWidth;
const height = window.innerHeight;
const proportion = width / height;

const initCamera = () => {
  const camera = new PerspectiveCamera(45, proportion, 1, 10000);
  camera.position.x = 0;
  camera.position.y = 10;
  camera.position.z = 400;
  return camera;
};

const initScene = () => {
  return new Scene();
};

const initRenderer = () => {
  const renderer = new Renderer({ alpha: true });
  renderer.shadowMap.enabled = true;
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  return renderer;
};

const initLight = () => {
  const light = new Light();
  light.position.set(-200, 200, 0);
  light.castShadow = true;
  return light;
};

const createCube = () => {
  const cube = new Mesh(
    new CubeGeometry(60, 60, 60, 10, 10, 10),
    new MeshLambertMaterial({ color: 0x42aaff })
  );
  cube.position.y = -60;
  cube.castShadow = true;
  cube.receiveShadow = true;
  return cube;
};

const createPane = () => {
  const pane = new Mesh(
    new PlaneGeometry(400, 200, 100, 100),
    new MeshLambertMaterial({ color: 0xff0000 })
  );

  pane.position.y = -85;
  pane.receiveShadow = true;
  pane.rotation.x = -Math.PI / 2;

  return pane;
};

const init = () => {
  var camera = initCamera();
  var scene = initScene();
  var renderer = initRenderer();
  var light = initLight();
  var pane = createPane();
  var cube = createCube();

  scene.add(light);
  scene.add(pane);
  scene.add(cube);

  function animation() {
    requestAnimationFrame(animation);
    cube.rotation.y += 0.03;
    renderer.render(scene, camera);
  }

  animation();
};

export default init;
