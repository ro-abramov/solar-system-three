import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer as Renderer,
  Geometry,
  PointsMaterial,
  Vector3,
  Points
} from 'three';

const width = window.innerWidth;
const height = window.innerHeight;
const proportion = width / height;

const initCamera = () => {
  const camera = new PerspectiveCamera(45, proportion, 1, 10000000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 1;
  return camera;
};

const initScene = () => {
  return new Scene();
};

const initRenderer = () => {
  const renderer = new Renderer({ alpha: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1);
  document.body.appendChild(renderer.domElement);
  return renderer;
};

const initStars = () => {
  const starsGeometry = new Geometry();
  const starsMaterial = new PointsMaterial({
    size: 1,
    sizeAttenuation: false
  });
  let stars;
  for (let i = 0; i < 5000; i++) {
    let vertex = new Vector3();
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    starsGeometry.vertices.push(vertex);
  }
  stars = new Points(starsGeometry, starsMaterial);
  return stars;
};

const init = () => {
  var camera = initCamera();
  var scene = initScene();
  var renderer = initRenderer();
  var stars = initStars();

  scene.add(stars);

  function animation() {
    requestAnimationFrame(animation);
    renderer.render(scene, camera);
  }

  animation();
};

export default init;
