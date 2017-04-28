import {
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  TextureLoader,
  PointLight
} from 'three';

export default () => {
  const texture = new TextureLoader().load(`${process.env.PUBLIC_URL}/sun.jpg`);
  const sunMat = new MeshStandardMaterial({
    emissiveMap: texture,
    emissive: 0xFF6666,
    emissiveIntensity: 10
  });
  const sun = new Mesh(new SphereGeometry(2300, 200, 200), sunMat);
  sun.planetName = 'sun';

  return sun;
};

export const initSunLight = () => {
  var light = new PointLight(0xffaa99, 1.4, 10000000);
  light.position.set(0, 0, 0);
  light.castShadow = true;
  light.shadow.mapSize.width = 256;
  light.shadow.mapSize.height = 256;
  return light;
};
