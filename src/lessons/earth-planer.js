import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer as Renderer,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader
} from 'three';

const width = window.innerWidth;
const height = window.innerHeight;
const proportion = width / height;

const initCamera = () => {
  const camera = new PerspectiveCamera(60, proportion, 1, 10000);
  camera.position.x = 0;
  camera.position.y = 20;
  camera.position.z = 8000;
  return camera;
};

const initScene = () => {
  return new Scene();
};

const initRenderer = () => {
  const renderer = new Renderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  return renderer;
};

const initSphere = () => {
  const sphereGeo = new SphereGeometry(900, 40, 40);
  const texture = new TextureLoader().load('earth.jpg');
  const sphereMat = new MeshBasicMaterial({
    map: texture
  });
  const sphere = new Mesh(sphereGeo, sphereMat);
  sphere.position.x = 0;
  sphere.position.y = 0;
  sphere.position.z = 0;
  return sphere;
};

const init = () => {
  var camera = initCamera();
  var scene = initScene();
  var renderer = initRenderer();
  var sphere = initSphere();
  scene.add(sphere);

  var angle = 0;
  function animation() {
    requestAnimationFrame(animation);
    sphere.rotation.y += 0.01;
    sphere.position.z += -30 * Math.sin(angle);
    sphere.position.y += 50 * Math.sin(angle);
    sphere.position.x += 50 * Math.cos(angle);
    angle += Math.PI / 180 * 2;
    renderer.render(scene, camera);
  }

  animation();
};

export default () => {
  init();
};
