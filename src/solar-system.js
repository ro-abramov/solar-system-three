import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer as Renderer,
  Geometry,
  PointsMaterial,
  Vector3,
  Points,
  PointLight,
  Raycaster
} from 'three';
import OrbitControls from 'three-orbitcontrols';

import createSun from './planets/sun';
import {
  createPlanets,
  rotatePlanets,
  addPlanetsToScene,
  lookAtPlanet
} from './planets/planets';
import createStars from './planets/stars';

const width = window.innerWidth;
const height = window.innerHeight - 4;
const proportion = width / height;

const initCamera = () => {
  const camera = new PerspectiveCamera(45, proportion, 1, 10000000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 30000;
  camera.rotation.z = -Math.PI / 20;
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

export default () => {
  var camera = initCamera();
  var scene = (window.scene = initScene());
  var renderer = initRenderer();
  var stars = createStars(39000);
  var sun = createSun();

  var planets = createPlanets();

  var light = new PointLight(0xffffff, 1.4, 10000000);
  light.position.set(0, 0, 0);
  light.castShadow = true;
  light.shadowMapWidth = 2048;
  light.shadowMapHeight = 2048;
  scene.add(light);

  scene.add(sun);
  addPlanetsToScene(planets, scene);
  scene.add(stars);

  var controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  controls.enabled = true;

  var raycaster = new Raycaster();
  var planetToLookAt = null;
  var cameraPrevPosition;
  var mouseIsDown = false;

  window.addEventListener('mousedown', e => {
    if (mouseIsDown) return;
    var mouse = {
      x: event.clientX / renderer.domElement.clientWidth * 2 - 1,
      y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
    };
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length === 0) return;
    controls.enabled = false;
    var planet = intersects[0].object;
    if (planet.planetName === 'sun') return;
    cameraPrevPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    };
    planetToLookAt = planet;
    mouseIsDown = true;
  });

  window.addEventListener('keydown', e => {
    if (e.keyCode !== 27) return;
    planetToLookAt = null;
    camera.position.x = cameraPrevPosition.x;
    camera.position.y = cameraPrevPosition.y;
    camera.position.z = cameraPrevPosition.z;
    mouseIsDown = false;
  });

  function animation() {
    requestAnimationFrame(animation);
    sun.rotation.y += 0.001;
    rotatePlanets(planets);
    lookAtPlanet({ planet: planetToLookAt, camera, controls });
    renderer.render(scene, camera);
  }

  animation();
};
