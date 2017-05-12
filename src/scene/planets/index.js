import {
  Mesh,
  Geometry,
  Vector3,
  CylinderGeometry,
  MeshStandardMaterial,
  SphereGeometry,
  LineBasicMaterial,
  LineLoop,
  TextureLoader
} from 'three';

const textureLoader = new TextureLoader();

const createOrbit = radius => {
  var planetOrbitGeom = new Geometry();
  var planetOrbitMat = new LineBasicMaterial({
    color: 0x444444,
    linewidth: 1,
    linecap: 'round', //ignored by WebGLRenderer
    linejoin: 'round' //ignored by WebGLRenderer
  });

  for (let i = 0; i < 360; i++) {
    let vertex = new Vector3();
    vertex.x = Math.sin(Math.PI / 180 * i) * radius;
    vertex.y = Math.sin(Math.PI / 180 * i) * (radius - 300);
    vertex.z = Math.cos(Math.PI / 180 * i) * (radius - 200);
    planetOrbitGeom.vertices.push(vertex);
  }

  const orbit = new LineLoop(planetOrbitGeom, planetOrbitMat);
  orbit.castShadow = false;
  return orbit;
};

const createRings = diametr => {
  let ringsGeom = new CylinderGeometry(diametr + 600, diametr + 600, 1, 50);
  const texture = textureLoader.load(
    `${process.env.PUBLIC_URL}/saturn_ring.png`
  );
  let ringsMaterial = new MeshStandardMaterial({
    bumpMap: texture,
    map: texture,
    roughness: 1,
    alphaMap: textureLoader.load(
      `${process.env.PUBLIC_URL}/saturn_ring_alpha3.png`
    ),
    transparent: true,
    opacity: 1
  });
  const ring = new Mesh(ringsGeom, ringsMaterial);
  ring.castShadow = true;
  ring.rotation.z = Math.PI / 10;
  return ring;
};

export default ({ name, diametr, radius, rotation, withRing = false }) => {
  let ring, planet;
  const texture = textureLoader.load(`${process.env.PUBLIC_URL}/${name}.jpg`);

  planet = new Mesh(
    new SphereGeometry(diametr, 80, 80),
    new MeshStandardMaterial({
      bumpMap: texture,
      map: texture,
      roughness: 1
    })
  );

  planet.planetName = name;
  planet.castShadow = true;
  planet.isSelectable = true;
  planet.planetRotation = rotation;
  let t = Math.PI * Math.random() * 1000000 / 180;
  planet.position.x = Math.sin(t * rotation) * radius;
  planet.position.y = Math.sin(t * rotation) * (radius - 300);
  planet.position.z = Math.cos(t * rotation) * (radius - 200);
  if (withRing) {
    ring = createRings(diametr, textureLoader);
  }
  const rotate = () => {
    planet.position.x = Math.sin(t * rotation) * radius;
    planet.position.y = Math.sin(t * rotation) * (radius - 300);
    planet.position.z = Math.cos(t * rotation) * (radius - 200);
    planet.rotation.y += 0.01;
    if (withRing) {
      ring.position.x = planet.position.x;
      ring.position.y = planet.position.y;
      ring.position.z = planet.position.z;
      ring.rotation.y -= 0.008;
    }
    t += Math.PI / 180 * 2;
  };

  return {
    planet,
    ring,
    rotate,
    orbit: createOrbit(radius)
  };
};
