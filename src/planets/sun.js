import { SphereGeometry, MeshBasicMaterial, Mesh, TextureLoader } from 'three';

export default () => {
  const texture = new TextureLoader().load('/sun.jpg');
  const sunMat = new MeshBasicMaterial({
    map: texture
  });
  const sun = new Mesh(new SphereGeometry(2300, 90, 90), sunMat);
  sun.planetName = 'sun';

  return sun;
};
