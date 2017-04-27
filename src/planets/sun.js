import {
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  PointLight
} from 'three';

export default () => {
  const texture = new TextureLoader().load(`${process.env.PUBLIC_URL}/sun.jpg`);
  const sunMat = new MeshBasicMaterial({
    map: texture
  });
  const sun = new Mesh(new SphereGeometry(2300, 200, 200), sunMat);
  sun.planetName = 'sun';

  return sun;
};

export const initSunLight = () => {
  var light = new PointLight(0xffaa99, 1.4, 10000000);
  light.position.set(0, 0, 0);
  light.castShadow = true;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  return light;
};
